import { Pool } from 'pg';

let pool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured. Set it on the EterSolis server before enabling public form submissions.');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000
    });
  }

  return pool;
}

export async function storeLeadSubmission(payload: Record<string, unknown>) {
  const id = crypto.randomUUID();
  const leadType = String(payload.leadType ?? 'lead');
  const client = await getPool().connect();

  try {
    await client.query('begin');
    await client.query(
      `insert into lead_submissions (id, lead_type, payload, created_at)
       values ($1, $2, $3::jsonb, now())`,
      [id, leadType, JSON.stringify(payload)]
    );

    if (leadType === 'waste') {
      await client.query(
        `insert into waste_opportunities (
          id, lead_submission_id, company_name, contact_name, email, country, region,
          material_category, material_description, quantity, quantity_unit, frequency,
          hazard_flag, safety_documents_available, confidentiality_level, created_at
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,now())`,
        [
          crypto.randomUUID(),
          id,
          payload.companyName ?? null,
          payload.contactName ?? null,
          payload.email ?? null,
          payload.country ?? null,
          payload.region ?? null,
          payload.materialCategory ?? null,
          payload.materialDescription ?? null,
          payload.quantity ?? null,
          payload.quantityUnit ?? null,
          payload.frequency ?? null,
          payload.hazardFlag ?? false,
          payload.safetyDocumentsAvailable ?? false,
          payload.confidentialityLevel ?? null
        ]
      );
    }

    await client.query('commit');
    return { id, createdAt: new Date().toISOString(), payloadType: leadType };
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
}
