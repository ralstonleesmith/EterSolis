'use client';

import { FormEvent, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import { useDraftedForm } from '@/components/forms/useDraftedForm';

const fieldClass = 'rounded-lg border border-coal/20 bg-white px-4 py-3 text-carbon shadow-sm transition placeholder:text-coal/45 focus:border-sunshine dark:border-white/10 dark:bg-black/45 dark:text-white dark:placeholder:text-white/35';
const labelClass = 'grid gap-2 text-sm font-black text-carbon dark:text-white';

const categories = ['Plastics', 'Paper and cardboard', 'Metals', 'E-waste', 'Organics', 'Industrial by-products', 'Water and wastewater treatment residuals', 'Construction materials', 'Other recoverable resources'];
const frequencies = ['One-time', 'Weekly', 'Monthly', 'Quarterly', 'Continuous', 'Unknown'];
const steps = ['Organization', 'Material', 'Safety'];

export function WasteOpportunityForm() {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { clearDraft, persistDraft, valueFor } = useDraftedForm('etersolis-waste-draft', formRef);
  const progress = Math.round(((step + 1) / steps.length) * 100);

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

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(event.currentTarget.action, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' }
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(payload.error || 'Submission failed.');

      clearDraft();
      event.currentTarget.reset();
      setStep(0);
      setSubmitState('success');
      setSubmitMessage(payload.message || 'Submission received for non-binding EterSolis review.');
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Submission failed. Please try again or use the waste email route.');
    }
  }

  if (submitState === 'success') {
    return (
      <div className="rounded-lg border border-sunshine/70 bg-white p-7 shadow-soft dark:bg-white/5">
        <CheckCircle2 className="h-10 w-10 text-sunshine" />
        <p className="mt-5 text-xs font-black uppercase tracking-normal text-coal dark:text-sunshine">Waste submission routed</p>
        <h2 className="mt-3 text-3xl font-black text-carbon dark:text-white">Your opportunity is queued for controlled review.</h2>
        <p className="mt-4 leading-7 text-coal dark:text-white/72">{submitMessage}</p>
        <button type="button" className="mt-6 rounded-full bg-sunshine px-6 py-3 font-black text-black" onClick={() => setSubmitState('idle')}>
          Submit another opportunity
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      className="grid gap-6 rounded-lg border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5"
      action="/api/waste"
      method="post"
      onChange={persistDraft}
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-xs font-black uppercase tracking-normal text-coal dark:text-sunshine">Structured intake</p>
        <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">Waste opportunity review</h2>
        <p className="mt-2 text-sm leading-6 text-coal dark:text-white/68">Submit non-confidential material data for controlled EterSolis review.</p>
        <p className="mt-2 text-xs font-bold text-coal dark:text-white/45">Drafts save locally in this browser until submitted or cleared.</p>
      </div>

      <div className="grid gap-3">
        <div className="h-2 overflow-hidden rounded-full bg-cool dark:bg-white/10">
          <div className="h-full rounded-full bg-sunshine transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => (index <= step ? setStep(index) : null)}
              className={`rounded-lg border px-3 py-3 text-left text-xs font-black uppercase tracking-normal transition ${
                index === step
                  ? 'border-sunshine bg-sunshine text-black'
                  : index < step
                    ? 'border-coal/10 bg-cool text-carbon dark:border-white/10 dark:bg-white/10 dark:text-white'
                    : 'border-coal/10 bg-white text-coal/55 dark:border-white/10 dark:bg-black/20 dark:text-white/45'
              }`}
              aria-current={index === step ? 'step' : undefined}
            >
              <span className="flex items-center gap-2">
                {index < step ? <CheckCircle2 className="h-4 w-4" /> : null}
                {index + 1}. {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <section data-form-step="0" className={step === 0 ? 'grid gap-5 md:grid-cols-2' : 'hidden'}>
        <label className={labelClass}>Company name<input name="companyName" required minLength={2} maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Contact name<input name="contactName" required minLength={2} maxLength={100} className={fieldClass} /></label>
        <label className={labelClass}>Email<input name="email" type="email" required className={fieldClass} /></label>
        <label className={labelClass}>Phone / WhatsApp<input name="phone" maxLength={50} className={fieldClass} /></label>
        <label className={labelClass}>Country<input name="country" required minLength={2} maxLength={80} className={fieldClass} /></label>
        <label className={labelClass}>Region / city / site<input name="region" maxLength={120} className={fieldClass} /></label>
      </section>

      <section data-form-step="1" className={step === 1 ? 'grid gap-5' : 'hidden'}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClass}>Material category<select name="materialCategory" required className={fieldClass}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={labelClass}>Frequency<select name="frequency" required className={fieldClass}>{frequencies.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={labelClass}>Quantity<input name="quantity" type="number" step="any" min="0" className={fieldClass} /></label>
          <label className={labelClass}>Unit<select name="quantityUnit" className={fieldClass}><option>kg</option><option>tonnes</option><option>m3</option><option>pallets</option><option>containers</option><option>other</option></select></label>
        </div>
        <label className={labelClass}>Material description<textarea name="materialDescription" required minLength={10} maxLength={2000} rows={6} className={fieldClass} placeholder="Describe the material, current handling, contamination risks and any review context without confidential details." /></label>
      </section>

      <section data-form-step="2" className={step === 2 ? 'grid gap-5' : 'hidden'}>
        <div className="grid gap-3 rounded-lg border border-coal/10 bg-cool p-5 text-sm dark:border-white/10 dark:bg-black/45">
          <p className="font-black text-carbon dark:text-white">Review opportunity before submitting</p>
          <div className="grid gap-2 text-coal dark:text-white/72 sm:grid-cols-2">
            <span><b>Company:</b> {valueFor('companyName')}</span>
            <span><b>Contact:</b> {valueFor('contactName')}</span>
            <span><b>Location:</b> {valueFor('country')} / {valueFor('region')}</span>
            <span><b>Material:</b> {valueFor('materialCategory')}</span>
            <span><b>Frequency:</b> {valueFor('frequency')}</span>
            <span><b>Quantity:</b> {valueFor('quantity')} {valueFor('quantityUnit')}</span>
          </div>
        </div>
        <div className="grid gap-4 rounded-lg border border-coal/10 bg-cool p-5 text-sm text-carbon dark:border-white/10 dark:bg-black/45 dark:text-white/82">
          <label className="flex gap-3"><input name="hazardFlag" type="checkbox" /> Hazardous, regulated, biological, chemical, medical, radioactive or unknown material flag</label>
          <label className="flex gap-3"><input name="safetyDocumentsAvailable" type="checkbox" /> Safety documents are available</label>
          <label className="grid gap-2 font-black">Confidentiality level<select name="confidentialityLevel" required className={fieldClass}><option>Public</option><option>Potential confidential</option><option>NDA required</option></select></label>
          <label className="flex gap-3 font-black"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this submission.</label>
        </div>
        <TurnstileWidget />
        <p className="rounded-lg border border-sunshine/70 bg-sunshine/10 p-4 text-sm font-bold leading-7 text-carbon dark:text-white">
          Submitting a waste opportunity is non-binding. Do not send physical samples unless EterSolis provides written intake instructions.
        </p>
      </section>

      {submitState === 'error' ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold text-red-700 dark:text-red-200">
          {submitMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-full border border-coal/20 px-6 py-3 font-black text-carbon transition hover:border-sunshine dark:border-white/15 dark:text-white"
          type="button"
          onClick={() => setStep((current) => Math.max(current - 1, 0))}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < steps.length - 1 ? (
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-7 py-4 font-black text-black shadow-soft transition hover:-translate-y-0.5" type="button" onClick={nextStep}>
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine px-7 py-4 font-black text-black shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={submitState === 'submitting'}>
            <ShieldCheck className="h-4 w-4" /> {submitState === 'submitting' ? 'Submitting...' : 'Submit Waste Opportunity'}
          </button>
        )}
      </div>
    </form>
  );
}
