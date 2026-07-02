import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { apiError, apiOk, enforceOperationalRateLimit, rateLimitPolicies, requestContext } from '@/lib/api';
import { createCrmLead } from '@/lib/crm';
import { getPool, recordServiceAuditEvent } from '@/lib/db';
import { enqueueOutboundEvent } from '@/lib/deliveryQueue';
import { sendServiceRequestNotifications } from '@/lib/email';
import { determineCommercialPathway, paymentStatusForPathway } from '@/lib/operations/commercialRules';
import { scoreDataQuality } from '@/lib/operations/dataQuality';
import type { ServiceRequestType } from '@/lib/operations/enums';
import { scoreRisk } from '@/lib/operations/riskRules';
import { serviceRequestSubmitSchema, type ServiceRequestSubmitInput } from '@/lib/operations/schemas';
import { departmentLabel, routeEmailForDepartment } from '@/lib/operations/taxonomy';
import { enforceRateLimit, getClientIp, hashClientIp, verifyBotProtection } from '@/lib/security';

function isSupportedContentType(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  return contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data') || contentType.includes('application/json');
}

function publicError(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

function serviceError(status: number, error: string, requestId?: string, apiMode: 'legacy' | 'v1' = 'legacy') {
  if (apiMode === 'v1') {
    const code = status === 415 ? 'UNSUPPORTED_MEDIA_TYPE'
      : status === 429 ? 'RATE_LIMITED'
        : status === 403 ? 'FORBIDDEN'
          : status === 400 ? 'VALIDATION_FAILED'
            : 'BAD_REQUEST';
    return apiError(code, error, status, requestId);
  }
  return publicError(status, error);
}

function token() {
  return randomBytes(24).toString('base64url');
}

function reference() {
  const now = new Date();
  const compact = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`;
  return `ES-SR-${compact}-${randomBytes(3).toString('hex').toUpperCase()}`;
}

async function bodyForRequest(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) return request.json();
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

function dateOrNull(value?: string) {
  if (!value) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

function schedulingComplete(data: ServiceRequestSubmitInput) {
  if (data.requestType === 'pickup') return Boolean(data.preferredPickupDate || data.pickupUrgency);
  if (data.requestType === 'delivery') return Boolean(data.preferredDeliveryDate || data.vehicleType);
  return true;
}

function statusForRequestType(requestType: ServiceRequestType) {
  if (requestType === 'pickup') return 'pickup_requested';
  if (requestType === 'delivery') return 'delivery_requested';
  if (requestType === 'certificate') return 'certificate_pending';
  return 'submitted';
}

function summary(data: ServiceRequestSubmitInput, computed: { publicReference: string; commercialPathway: string; riskLevel: string; dataQualityScore: number }) {
  return [
    `Company: ${data.companyName}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Country/region: ${data.country}${data.region ? ` / ${data.region}` : ''}`,
    `Request type: ${data.requestType}`,
    `Department: ${departmentLabel(data.department)}`,
    `Material: ${data.materialName || 'Not named'}`,
    `Quantity: ${data.quantity ?? 'Not provided'} ${data.quantityUnit}`,
    `Frequency: ${data.frequency}`,
    `Risk level: ${computed.riskLevel}`,
    `Commercial pathway: ${computed.commercialPathway}`,
    `Data quality: ${computed.dataQualityScore}/100`,
    `Reference: ${computed.publicReference}`
  ].join('\n');
}

export async function createServiceRequestFromData(data: ServiceRequestSubmitInput, ipHash = 'unknown') {
  const risk = scoreRisk(data);
  const commercialPathway = determineCommercialPathway({
    requestType: data.requestType,
    riskLevel: risk.riskLevel,
    unknownMaterialFlag: data.unknownMaterialFlag,
    restrictedFlag: risk.restrictedFlag,
    quantity: data.quantity
  });
  const paymentStatus = paymentStatusForPathway(commercialPathway);
  const dataQualityScore = scoreDataQuality({
    materialDescription: data.materialDescription,
    quantity: data.quantity,
    photosPresent: data.photosPresent,
    documentsPresent: data.documentsPresent,
    siteAddress: data.siteAddress,
    safetyAnswered: true,
    department: data.department,
    requestType: data.requestType,
    schedulingComplete: schedulingComplete(data)
  });

  const publicReference = reference();
  const publicToken = token();
  const id = crypto.randomUUID();
  const customerId = crypto.randomUUID();
  const contactId = crypto.randomUUID();
  const siteId = crypto.randomUUID();
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('begin');
    await client.query(
      `insert into customers (id, company_name, billing_entity, country, region, city)
       values ($1,$2,$3,$4,$5,$6)`,
      [customerId, data.companyName, data.billingEntity ?? null, data.country, data.region ?? null, data.city ?? null]
    );
    await client.query(
      `insert into customer_contacts (id, customer_id, contact_name, email, phone, consent_to_contact)
       values ($1,$2,$3,$4,$5,true)`,
      [contactId, customerId, data.contactName, data.email, data.phone ?? null]
    );
    await client.query(
      `insert into customer_sites (id, customer_id, site_address, gps_link, access_notes, site_restrictions, operating_hours, loading_equipment)
       values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [siteId, customerId, data.siteAddress, data.gpsLink ?? null, data.accessNotes ?? null, data.siteRestrictions ?? null, data.operatingHours ?? null, data.loadingEquipment ?? null]
    );
    await client.query(
      `insert into service_requests (
        id, public_reference, public_token, customer_id, contact_id, site_id, request_type, department,
        department_confidence, department_source, commercial_pathway, status, risk_level, payment_status,
        pickup_status, delivery_status, certificate_status, assigned_team, data_quality_score, payload,
        submitted_at
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20::jsonb,now())`,
      [
        id,
        publicReference,
        publicToken,
        customerId,
        contactId,
        siteId,
        data.requestType,
        data.department,
        1,
        'user_selected',
        commercialPathway,
        statusForRequestType(data.requestType),
        risk.riskLevel,
        paymentStatus,
        data.requestType === 'pickup' ? 'pickup_requested' : null,
        data.requestType === 'delivery' ? 'delivery_requested' : null,
        data.requestType === 'certificate' ? 'certificate_pending' : null,
        data.department,
        dataQualityScore,
        JSON.stringify({ ipHash, source: 'get_started', ...data })
      ]
    );
    await client.query(
      `insert into material_profiles (
        service_request_id, department, material_name, material_description, physical_state, quantity, quantity_unit,
        container_type, container_count, frequency, contamination_status, odor_status, moisture_status, photos_present, documents_present
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
      [
        id,
        data.department,
        data.materialName ?? null,
        data.materialDescription,
        data.physicalState,
        data.quantity ?? null,
        data.quantityUnit,
        data.containerType ?? null,
        data.containerCount ?? null,
        data.frequency,
        data.contaminationStatus ?? null,
        data.odorStatus ?? null,
        data.moistureStatus ?? null,
        data.photosPresent,
        data.documentsPresent
      ]
    );
    await client.query(
      `insert into risk_assessments (
        service_request_id, hazard_flag, unknown_material_flag, sds_available, lab_analysis_available, flammable_flag,
        corrosive_flag, toxic_flag, biohazard_flag, pathogen_flag, hydrocarbon_flag, sharp_object_flag, pressurized_flag,
        radioactive_flag, asbestos_flag, spill_flag, restricted_flag, manual_review_required, risk_score, risk_level
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
      [
        id,
        data.hazardFlag,
        data.unknownMaterialFlag,
        data.sdsAvailable,
        data.labAnalysisAvailable,
        data.flammableFlag,
        data.corrosiveFlag,
        data.toxicFlag,
        data.biohazardFlag,
        data.pathogenFlag,
        data.hydrocarbonFlag,
        data.sharpObjectFlag,
        data.pressurizedFlag,
        data.radioactiveFlag,
        data.asbestosFlag,
        data.spillFlag,
        risk.restrictedFlag,
        risk.manualReviewRequired,
        risk.riskScore,
        risk.riskLevel
      ]
    );
    if (data.requestType === 'pickup') {
      await client.query(
        `insert into pickup_requests (service_request_id, requested_date, requested_window, alternative_date, site_access_notes, loading_method, vehicle_requirement, status)
         values ($1,$2,$3,$4,$5,$6,$7,'pickup_requested')`,
        [id, dateOrNull(data.preferredPickupDate), data.preferredPickupWindow ?? null, dateOrNull(data.alternativePickupDate), data.accessNotes ?? null, data.loadingMethod ?? null, data.vehicleAccess ?? null]
      );
    }
    if (data.requestType === 'delivery') {
      await client.query(
        `insert into delivery_requests (service_request_id, requested_delivery_date, requested_delivery_window, vehicle_type, driver_name, driver_phone, vehicle_registration, delivery_reference, status)
         values ($1,$2,$3,$4,$5,$6,$7,$8,'delivery_requested')`,
        [id, dateOrNull(data.preferredDeliveryDate), data.preferredDeliveryWindow ?? null, data.vehicleType ?? null, data.driverName ?? null, data.driverPhone ?? null, data.vehicleRegistration ?? null, `${publicReference}-DEL`]
      );
    }
    await client.query(
      `insert into payments (service_request_id, payment_reference, provider, payment_type, status, currency, metadata)
       values ($1,$2,'manual','manual_invoice',$3,'ZAR',$4::jsonb)`,
      [id, `${publicReference}-PAY`, paymentStatus, JSON.stringify({ commercialPathway })]
    );
    await client.query(
      `insert into analytics_events (service_request_id, event_name, event_area, payload)
       values ($1,'submission_completed','get_started',$2::jsonb)`,
      [id, JSON.stringify({ publicReference, requestType: data.requestType, department: data.department, commercialPathway, riskLevel: risk.riskLevel, dataQualityScore })]
    );
    await client.query(
      `insert into admin_actions (service_request_id, action_type, actor, metadata)
       values ($1,'service_request_submitted','system',$2::jsonb)`,
      [id, JSON.stringify({ publicReference })]
    );
    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }

  return {
    id,
    publicReference,
    publicToken,
    publicStatusPath: `/status/${publicToken}`,
    requestType: data.requestType,
    department: data.department,
    departmentLabel: departmentLabel(data.department),
    commercialPathway,
    riskLevel: risk.riskLevel,
    paymentStatus,
    dataQualityScore,
    nextAction: risk.manualReviewRequired
      ? 'Manual review is required before payment, pickup, delivery or receiving instructions.'
      : 'EterSolis will confirm payment or service instructions before material movement.'
  };
}

export async function handleServiceRequestSubmission(request: Request, options: { apiMode?: 'legacy' | 'v1' } = {}) {
  const apiMode = options.apiMode ?? 'legacy';
  const context = requestContext(request);
  if (!isSupportedContentType(request)) return serviceError(415, 'Unsupported submission format.', context.requestId, apiMode);

  const ip = getClientIp(request);
  const rateLimit = apiMode === 'v1'
    ? await enforceOperationalRateLimit(context.ipHash, rateLimitPolicies.publicService)
    : await enforceRateLimit(ip);
  if (!rateLimit.ok) return serviceError(429, 'Too many requests.', context.requestId, apiMode);

  const raw = await bodyForRequest(request);
  const botCheck = await verifyBotProtection(String(raw.turnstileToken ?? raw['cf-turnstile-response'] ?? ''), ip);
  if (!botCheck.ok) return serviceError(403, 'Verification failed.', context.requestId, apiMode);

  const parsed = serviceRequestSubmitSchema.safeParse(raw);
  if (!parsed.success) return serviceError(400, 'Invalid service request submission.', context.requestId, apiMode);

  const result = await createServiceRequestFromData(parsed.data, hashClientIp(ip));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://etersolis.com';
  const statusUrl = new URL(result.publicStatusPath, siteUrl).toString();
  const route = routeEmailForDepartment(parsed.data.department);
  const notificationSummary = summary(parsed.data, result);

  await Promise.all([
    enqueueOutboundEvent({
      requestId: context.requestId,
      eventType: 'service_request_crm_delivery',
      destination: process.env.CRM_WEBHOOK_URL ? 'configured-crm-webhook' : 'not-configured',
      serviceRequestId: result.id,
      payload: { leadType: 'service_request', serviceRequestId: result.id, publicReference: result.publicReference, ...parsed.data }
    }),
    enqueueOutboundEvent({
      requestId: context.requestId,
      eventType: 'service_request_email_delivery',
      destination: route,
      serviceRequestId: result.id,
      payload: {
        publicReference: result.publicReference,
        subjectPrefix: `[EterSolis ${departmentLabel(parsed.data.department)}]`,
        submitterEmail: parsed.data.email,
        summary: notificationSummary,
        statusUrl,
        commercialPathway: result.commercialPathway,
        riskLevel: result.riskLevel
      }
    })
  ]).catch(() => undefined);

  const deliveries = [
    {
      provider: 'crm',
      eventType: 'service_request_crm_delivery_failed',
      destination: process.env.CRM_WEBHOOK_URL ? 'configured-crm-webhook' : 'not-configured',
      run: () => createCrmLead({ leadType: 'service_request', serviceRequestId: result.id, publicReference: result.publicReference, ...parsed.data })
    },
    {
      provider: 'email',
      eventType: 'service_request_email_delivery_failed',
      destination: route,
      run: () => sendServiceRequestNotifications({
        publicReference: result.publicReference,
        route,
        subjectPrefix: `[EterSolis ${departmentLabel(parsed.data.department)}]`,
        submitterEmail: parsed.data.email,
        summary: notificationSummary,
        statusUrl,
        commercialPathway: result.commercialPathway,
        riskLevel: result.riskLevel
      })
    }
  ] as const;

  const deliveryResults = await Promise.allSettled(deliveries.map((delivery) => delivery.run()));
  await Promise.all(deliveryResults.map((deliveryResult, index) => {
    if (deliveryResult.status === 'fulfilled') return undefined;
    const delivery = deliveries[index];
    return recordServiceAuditEvent(delivery.eventType, {
      serviceRequestId: result.id,
      publicReference: result.publicReference,
      provider: delivery.provider,
      destination: delivery.destination,
      error: deliveryResult.reason instanceof Error ? deliveryResult.reason.message : 'Unknown delivery failure'
    }, result.id).catch(() => undefined);
  }));

  await recordServiceAuditEvent('service_request_submitted', { publicReference: result.publicReference }, result.id).catch(() => undefined);
  const data = { ...result, statusUrl, message: 'Service request received for controlled EterSolis review.' };
  if (apiMode === 'v1') return apiOk(data, context.requestId);
  return NextResponse.json({ ok: true, ...data });
}

export async function getServiceRequestByToken(publicToken: string) {
  const result = await getPool().query(
    `select sr.id, sr.public_reference, sr.public_token, sr.request_type, sr.department, sr.commercial_pathway,
            sr.status, sr.risk_level, sr.payment_status, sr.pickup_status, sr.delivery_status,
            sr.certificate_status, sr.data_quality_score, sr.created_at, sr.updated_at,
            c.company_name, cc.contact_name, cc.email, cs.site_address, mp.material_name, mp.material_description,
            mp.quantity, mp.quantity_unit, mp.frequency
       from service_requests sr
       left join customers c on c.id = sr.customer_id
       left join customer_contacts cc on cc.id = sr.contact_id
       left join customer_sites cs on cs.id = sr.site_id
       left join material_profiles mp on mp.service_request_id = sr.id
      where sr.public_token = $1
      limit 1`,
    [publicToken]
  );
  return result.rows[0] ?? null;
}

export async function listServiceRequests(limit = 50) {
  const result = await getPool().query(
    `select sr.id, sr.public_reference, sr.request_type, sr.department, sr.commercial_pathway,
            sr.status, sr.risk_level, sr.payment_status, sr.pickup_status, sr.delivery_status,
            sr.certificate_status, sr.data_quality_score, sr.created_at, c.company_name, cc.email,
            mp.material_name, mp.quantity, mp.quantity_unit
       from service_requests sr
       left join customers c on c.id = sr.customer_id
       left join customer_contacts cc on cc.id = sr.contact_id
       left join material_profiles mp on mp.service_request_id = sr.id
      order by sr.created_at desc
      limit $1`,
    [limit]
  );
  return result.rows;
}
