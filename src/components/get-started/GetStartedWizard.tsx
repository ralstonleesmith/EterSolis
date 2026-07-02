'use client';

import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, ShieldAlert } from 'lucide-react';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import { useDraftedForm } from '@/components/forms/useDraftedForm';
import { departments, frequencies, physicalStates, quantityUnits, serviceRequestTypes } from '@/lib/operations/enums';
import { departmentTaxonomy } from '@/lib/operations/taxonomy';

const fieldClass = 'ui-field rounded-lg px-4 py-3 shadow-sm transition focus:border-sunshine';
const labelClass = 'grid gap-2 text-sm font-black text-body';
const steps = ['Intent', 'Department', 'Material', 'Site', 'Schedule', 'Safety', 'Commercial', 'Review'];

const requestTypeLabels: Record<typeof serviceRequestTypes[number], string> = {
  pickup: 'Request pickup',
  delivery: 'Schedule delivery',
  assessment: 'Request assessment',
  certificate: 'Request certificate',
  recurring_service: 'Request recurring service',
  repurpose_review: 'Request repurpose pathway review',
  destruction_service: 'Request destruction service',
  purchase_eligibility_review: 'Selected material purchase eligibility review',
  guided: 'I am not sure - guide me'
};

function titleCase(value: string) {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function GetStartedWizard({ defaultRequestType = 'pickup' }: { defaultRequestType?: typeof serviceRequestTypes[number] }) {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [result, setResult] = useState<{ publicReference: string; statusUrl: string; departmentLabel: string; commercialPathway: string; paymentStatus: string; nextAction: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { clearDraft, draft, persistDraft, valueFor } = useDraftedForm('etersolis-service-request-draft', formRef);
  const progress = Math.round(((step + 1) / steps.length) * 100);
  const draftRequestType = typeof draft.requestType === 'string' && serviceRequestTypes.includes(draft.requestType as typeof serviceRequestTypes[number])
    ? draft.requestType as typeof serviceRequestTypes[number]
    : defaultRequestType;
  const currentRequestType = draftRequestType;
  const currentDepartment = typeof draft.department === 'string' && draft.department in departmentTaxonomy
    ? draft.department as keyof typeof departmentTaxonomy
    : 'industrial';
  const highRiskSelected = ['hazardFlag', 'unknownMaterialFlag', 'biohazardFlag', 'flammableFlag', 'corrosiveFlag', 'toxicFlag', 'radioactiveFlag', 'asbestosFlag', 'spillFlag'].some((name) => draft[name] === true);

  function validateStep() {
    const section = formRef.current?.querySelector(`[data-form-step="${step}"]`);
    const controls = Array.from(section?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea') ?? []);
    return controls.every((control) => control.reportValidity());
  }

  function nextStep() {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep()) return;

    const form = event.currentTarget;
    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Service request submission failed.');

      clearDraft();
      form.reset();
      setStep(0);
      setResult(payload);
      setSubmitState('success');
      setSubmitMessage(payload.message || 'Service request received for controlled EterSolis review.');
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Submission failed. Please try again or contact service@etersolis.com.');
    }
  }

  if (submitState === 'success' && result) {
    return (
      <div className="ui-surface rounded-lg border-sunshine/70 p-7 shadow-soft">
        <CheckCircle2 className="h-10 w-10 text-sunshine" />
        <p className="mt-5 text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">Service request routed</p>
        <h2 className="mt-3 text-3xl font-black text-body">{result.publicReference}</h2>
        <p className="mt-4 leading-7 text-muted">{submitMessage}</p>
        <div className="mt-5 grid gap-3 text-sm font-bold text-body sm:grid-cols-2">
          <span>Department: {result.departmentLabel}</span>
          <span>Commercial pathway: {titleCase(result.commercialPathway)}</span>
          <span>Payment: {titleCase(result.paymentStatus)}</span>
          <span>Next action: {result.nextAction}</span>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={result.statusUrl || '#'} className="inline-flex items-center justify-center rounded-full bg-sunshine px-6 py-3 font-black text-black">
            View Status
          </Link>
          <button type="button" className="ui-control rounded-full px-6 py-3 font-black" onClick={() => setSubmitState('idle')}>
            Start Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      className="ui-surface grid gap-6 rounded-lg p-6 shadow-soft"
      action="/api/service-requests/submit"
      method="post"
      onChange={persistDraft}
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-xs font-black uppercase tracking-normal text-body dark:text-white">Controlled service request</p>
        <h2 className="mt-3 text-2xl font-black text-body">Get Started with EterSolis</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-body">Most EterSolis pathways are customer-paid services. Selected material purchase, rebate or partnership review is available only after controlled eligibility review.</p>
        <p className="mt-2 text-xs font-bold text-body">Drafts save locally in this browser until submitted or cleared.</p>
      </div>

      <div className="grid gap-3">
        <div className="h-2 overflow-hidden rounded-full bg-cool dark:bg-white/10">
          <div className="h-full rounded-full bg-sunshine transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => (index <= step ? setStep(index) : null)}
              className={`rounded-lg border px-3 py-3 text-left text-xs font-black uppercase tracking-normal transition ${
                index === step
                  ? 'border-carbon bg-carbon text-white dark:border-sunshine dark:bg-sunshine dark:text-black'
                  : index < step
                    ? 'ui-surface-muted text-body'
                    : 'ui-surface text-body'
              }`}
              aria-current={index === step ? 'step' : undefined}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <section data-form-step="0" className={step === 0 ? 'grid gap-4 sm:grid-cols-2' : 'hidden'}>
        {serviceRequestTypes.map((type) => (
          <label key={type} className="ui-surface-muted flex cursor-pointer gap-3 rounded-lg border border-[--line] p-4 text-sm font-black text-body">
            <input type="radio" name="requestType" value={type} required defaultChecked={type === defaultRequestType} />
            {requestTypeLabels[type]}
          </label>
        ))}
      </section>

      <section data-form-step="1" className={step === 1 ? 'grid gap-4' : 'hidden'}>
        {departments.map((department) => (
          <label key={department} className="ui-surface-muted flex cursor-pointer gap-3 rounded-lg border border-[--line] p-4 text-sm text-body">
            <input type="radio" name="department" value={department} required defaultChecked={department === 'industrial'} />
            <span>
              <span className="block font-black">{departmentTaxonomy[department].label}</span>
              <span className="mt-1 block leading-6 text-muted">{departmentTaxonomy[department].publicDescription}</span>
            </span>
          </label>
        ))}
      </section>

      <section data-form-step="2" className={step === 2 ? 'grid gap-5' : 'hidden'}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClass}>Material name<input name="materialName" maxLength={160} className={fieldClass} /></label>
          <label className={labelClass}>Physical state<select name="physicalState" required className={fieldClass}>{physicalStates.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}</select></label>
          <label className={labelClass}>Quantity<input name="quantity" type="number" step="any" min="0" className={fieldClass} /></label>
          <label className={labelClass}>Unit<select name="quantityUnit" required className={fieldClass}>{quantityUnits.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className={labelClass}>Frequency<select name="frequency" required className={fieldClass}>{frequencies.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}</select></label>
          <label className={labelClass}>Container type<input name="containerType" maxLength={120} className={fieldClass} /></label>
          <label className={labelClass}>Container count<input name="containerCount" type="number" step="any" min="0" className={fieldClass} /></label>
          <label className={labelClass}>Contamination status<input name="contaminationStatus" maxLength={300} className={fieldClass} /></label>
          <label className={labelClass}>Odor status<input name="odorStatus" maxLength={300} className={fieldClass} /></label>
          <label className={labelClass}>Moisture status<input name="moistureStatus" maxLength={300} className={fieldClass} /></label>
        </div>
        <label className={labelClass}>Material description<textarea name="materialDescription" required minLength={10} maxLength={2500} rows={6} className={fieldClass} placeholder="Describe the material, current handling, contamination risks, source process, documentation and operational context." /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex gap-3 text-sm font-bold text-body"><input name="photosPresent" type="checkbox" /> Photos are available</label>
          <label className="flex gap-3 text-sm font-bold text-body"><input name="documentsPresent" type="checkbox" /> Documents are available</label>
        </div>
      </section>

      <section data-form-step="3" className={step === 3 ? 'grid gap-5 md:grid-cols-2' : 'hidden'}>
        <label className={labelClass}>Company name<input name="companyName" required minLength={2} maxLength={160} className={fieldClass} /></label>
        <label className={labelClass}>Contact name<input name="contactName" required minLength={2} maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Email<input name="email" type="email" required className={fieldClass} /></label>
        <label className={labelClass}>Phone / WhatsApp<input name="phone" maxLength={60} className={fieldClass} /></label>
        <label className={labelClass}>Billing entity<input name="billingEntity" maxLength={160} className={fieldClass} /></label>
        <label className={labelClass}>Country<input name="country" required minLength={2} maxLength={80} className={fieldClass} /></label>
        <label className={labelClass}>Province / region<input name="region" maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>City<input name="city" maxLength={120} className={fieldClass} /></label>
        <label className={`${labelClass} md:col-span-2`}>Site address<textarea name="siteAddress" required minLength={4} maxLength={500} rows={3} className={fieldClass} /></label>
        <label className={labelClass}>GPS / map link<input name="gpsLink" maxLength={500} className={fieldClass} /></label>
        <label className={labelClass}>Operating hours<input name="operatingHours" maxLength={300} className={fieldClass} /></label>
        <label className={labelClass}>Access notes<textarea name="accessNotes" maxLength={1000} rows={3} className={fieldClass} /></label>
        <label className={labelClass}>Site restrictions<textarea name="siteRestrictions" maxLength={1000} rows={3} className={fieldClass} /></label>
        <label className={`${labelClass} md:col-span-2`}>Loading equipment available<input name="loadingEquipment" maxLength={300} className={fieldClass} /></label>
      </section>

      <section data-form-step="4" className={step === 4 ? 'grid gap-6' : 'hidden'}>
        <div className={currentRequestType === 'pickup' || currentRequestType === 'guided' ? 'grid gap-5 md:grid-cols-2' : 'hidden'}>
          <label className={labelClass}>Preferred pickup date<input name="preferredPickupDate" type="date" className={fieldClass} /></label>
          <label className={labelClass}>Preferred pickup window<input name="preferredPickupWindow" maxLength={80} className={fieldClass} /></label>
          <label className={labelClass}>Alternative pickup date<input name="alternativePickupDate" type="date" className={fieldClass} /></label>
          <label className={labelClass}>Pickup urgency<input name="pickupUrgency" maxLength={80} className={fieldClass} /></label>
          <label className={labelClass}>Loading method<input name="loadingMethod" maxLength={160} className={fieldClass} /></label>
          <label className={labelClass}>Vehicle access<input name="vehicleAccess" maxLength={300} className={fieldClass} /></label>
          <label className={labelClass}>Material packaging<input name="materialPackaging" maxLength={300} className={fieldClass} /></label>
          <label className={labelClass}>On-site contact<input name="onsiteContact" maxLength={160} className={fieldClass} /></label>
          <label className={`${labelClass} md:col-span-2`}>Special handling<textarea name="specialHandling" maxLength={1000} rows={3} className={fieldClass} /></label>
        </div>
        <div className={currentRequestType === 'delivery' ? 'grid gap-5 md:grid-cols-2' : 'hidden'}>
          <label className={labelClass}>Preferred delivery date<input name="preferredDeliveryDate" type="date" className={fieldClass} /></label>
          <label className={labelClass}>Preferred delivery window<input name="preferredDeliveryWindow" maxLength={80} className={fieldClass} /></label>
          <label className={labelClass}>Vehicle type<input name="vehicleType" maxLength={120} className={fieldClass} /></label>
          <label className={labelClass}>Vehicle registration<input name="vehicleRegistration" maxLength={80} className={fieldClass} /></label>
          <label className={labelClass}>Driver name<input name="driverName" maxLength={120} className={fieldClass} /></label>
          <label className={labelClass}>Driver phone<input name="driverPhone" maxLength={60} className={fieldClass} /></label>
          <label className={labelClass}>Receiving site requested<input name="receivingSiteRequested" maxLength={200} className={fieldClass} /></label>
          <label className={labelClass}>Packaging / container condition<input name="deliveryPackagingCondition" maxLength={300} className={fieldClass} /></label>
          <label className="flex gap-3 text-sm font-bold text-body md:col-span-2"><input name="appointmentInstructionsRequired" type="checkbox" /> Appointment instructions required before dispatch</label>
        </div>
        <p className="rounded-lg border border-sunshine/70 bg-sunshine/10 p-4 text-sm font-bold leading-7 text-body">
          Do not deliver material until EterSolis confirms a delivery appointment and provides written receiving instructions.
        </p>
      </section>

      <section data-form-step="5" className={step === 5 ? 'grid gap-5' : 'hidden'}>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['hazardFlag', 'Hazardous or regulated material'],
            ['unknownMaterialFlag', 'Unknown material or unknown composition'],
            ['sdsAvailable', 'SDS available'],
            ['labAnalysisAvailable', 'Lab analysis available'],
            ['biohazardFlag', 'Biohazard concern'],
            ['hydrocarbonFlag', 'Hydrocarbon material'],
            ['flammableFlag', 'Flammable concern'],
            ['corrosiveFlag', 'Corrosive concern'],
            ['toxicFlag', 'Toxic concern'],
            ['pathogenFlag', 'Pathogen concern'],
            ['sharpObjectFlag', 'Sharp object concern'],
            ['pressurizedFlag', 'Pressurized container concern'],
            ['radioactiveFlag', 'Radioactive concern'],
            ['asbestosFlag', 'Asbestos concern'],
            ['spillFlag', 'Spill or emergency concern']
          ].map(([name, label]) => (
            <label key={name} className="flex gap-3 text-sm font-bold text-body"><input name={name} type="checkbox" /> {label}</label>
          ))}
        </div>
        <label className={labelClass}>Confidentiality level<select name="confidentialityLevel" required className={fieldClass}><option value="public">Public</option><option value="potential_confidential">Potential confidential</option><option value="nda_required">NDA required</option></select></label>
        <label className="flex gap-3 font-black text-body"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this service request.</label>
        <TurnstileWidget />
      </section>

      <section data-form-step="6" className={step === 6 ? 'grid gap-4' : 'hidden'}>
        <div className="ui-surface-muted rounded-lg p-5">
          <FileCheck2 className="h-7 w-7 text-sunshine" />
          <h3 className="mt-3 text-xl font-black text-body">Manual invoice and controlled review</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            MVP payment mode is manual invoice. Low-risk service requests can proceed to payment instructions after review. High-risk, unknown, restricted, large or complex materials route to manual quote before payment.
          </p>
        </div>
        {highRiskSelected ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold leading-7 text-red-700 dark:text-red-200">
            <ShieldAlert className="mb-2 h-5 w-5" />
            Your safety selections require controlled review before payment, pickup, delivery, receiving or certificate actions.
          </div>
        ) : null}
      </section>

      <section data-form-step="7" className={step === 7 ? 'grid gap-5' : 'hidden'}>
        <div className="ui-surface-muted grid gap-3 rounded-lg p-5 text-sm">
          <p className="font-black text-body">Review before submitting</p>
          <div className="grid gap-2 text-muted sm:grid-cols-2">
            <span><b>Company:</b> {valueFor('companyName')}</span>
            <span><b>Contact:</b> {valueFor('contactName')}</span>
            <span><b>Request:</b> {requestTypeLabels[currentRequestType]}</span>
            <span><b>Department:</b> {departmentTaxonomy[currentDepartment].label}</span>
            <span><b>Material:</b> {valueFor('materialName') || 'Not named'}</span>
            <span><b>Quantity:</b> {valueFor('quantity')} {valueFor('quantityUnit')}</span>
          </div>
        </div>
        <p className="rounded-lg border border-sunshine/70 bg-sunshine/10 p-4 text-sm font-bold leading-7 text-body">
          Submission does not guarantee acceptance, purchase, transport approval, certificate issuance or compliance outcome. Do not send or deliver material unless EterSolis provides written instructions.
        </p>
      </section>

      {submitState === 'error' ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold text-red-700 dark:text-red-200">
          {submitMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="ui-control inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-black transition disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => setStep((current) => Math.max(current - 1, 0))}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < steps.length - 1 ? (
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-7 py-4 font-black text-white shadow-soft transition hover:-translate-y-0.5 dark:bg-sunshine dark:text-black" type="button" onClick={nextStep}>
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-7 py-4 font-black text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sunshine dark:text-black" type="submit" disabled={submitState === 'submitting'}>
            {submitState === 'submitting' ? 'Submitting...' : 'Submit Service Request'}
          </button>
        )}
      </div>
    </form>
  );
}
