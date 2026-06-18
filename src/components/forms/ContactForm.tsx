'use client';

import { FormEvent, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import { useDraftedForm } from '@/components/forms/useDraftedForm';
import { contactTopics } from '@/lib/siteContent';

type ContactTopic = (typeof contactTopics)[number];

const fieldClass = 'rounded-lg border border-coal/20 bg-white px-4 py-3 text-carbon shadow-sm transition placeholder:text-coal/45 focus:border-sunshine dark:border-white/10 dark:bg-black/45 dark:text-white dark:placeholder:text-white/35';
const labelClass = 'grid gap-2 text-sm font-black text-carbon dark:text-white';
const steps = ['Route', 'Identity', 'Message'];

export function ContactForm({ defaultTopic }: { defaultTopic?: ContactTopic } = {}) {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { clearDraft, persistDraft, valueFor } = useDraftedForm('etersolis-contact-draft', formRef);
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
      setSubmitMessage(payload.message || 'Inquiry received for EterSolis review.');
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Submission failed. Please try again or use the email route.');
    }
  }

  if (submitState === 'success') {
    return (
      <div className="rounded-lg border border-sunshine/70 bg-white p-7 shadow-soft dark:bg-white/5">
        <CheckCircle2 className="h-10 w-10 text-sunshine" />
        <p className="mt-5 text-xs font-black uppercase tracking-normal text-coal/60 dark:text-sunshine">Inquiry submitted</p>
        <h2 className="mt-3 text-3xl font-black text-carbon dark:text-white">Your inquiry has been routed for review.</h2>
        <p className="mt-4 leading-7 text-coal dark:text-white/72">{submitMessage}</p>
        <button type="button" className="mt-6 rounded-full bg-sunshine px-6 py-3 font-black text-black" onClick={() => setSubmitState('idle')}>
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      className="grid gap-6 rounded-lg border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5"
      action="/api/leads"
      method="post"
      onChange={persistDraft}
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-xs font-black uppercase tracking-normal text-coal/60 dark:text-sunshine">Controlled contact</p>
        <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">Route your inquiry</h2>
        <p className="mt-2 text-sm leading-6 text-coal dark:text-white/68">Choose the right path, then submit a concise non-confidential summary.</p>
        <p className="mt-2 text-xs font-bold text-coal/60 dark:text-white/45">Drafts save locally in this browser until submitted or cleared.</p>
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
              {index + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <section data-form-step="0" className={step === 0 ? 'grid gap-5' : 'hidden'}>
        <label className={labelClass}>Topic<select name="topic" required className={fieldClass} defaultValue={defaultTopic}>{contactTopics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
      </section>

      <section data-form-step="1" className={step === 1 ? 'grid gap-5 md:grid-cols-2' : 'hidden'}>
        <label className={labelClass}>Name<input name="name" required minLength={2} maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Company<input name="company" maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Email<input name="email" type="email" required className={fieldClass} /></label>
      </section>

      <section data-form-step="2" className={step === 2 ? 'grid gap-5' : 'hidden'}>
        <div className="grid gap-3 rounded-lg border border-coal/10 bg-cool p-5 text-sm dark:border-white/10 dark:bg-black/45">
          <p className="font-black text-carbon dark:text-white">Review route before submitting</p>
          <div className="grid gap-2 text-coal dark:text-white/72 sm:grid-cols-2">
            <span><b>Topic:</b> {valueFor('topic')}</span>
            <span><b>Name:</b> {valueFor('name')}</span>
            <span><b>Company:</b> {valueFor('company')}</span>
            <span><b>Email:</b> {valueFor('email')}</span>
          </div>
        </div>
        <label className={labelClass}>Message<textarea name="message" required minLength={10} maxLength={2000} rows={6} className={fieldClass} placeholder="Use a clear, non-confidential summary." /></label>
        <label className="flex gap-3 rounded-lg border border-coal/10 bg-cool p-5 text-sm font-black text-carbon dark:border-white/10 dark:bg-black/45 dark:text-white/82"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this inquiry.</label>
        <TurnstileWidget />
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
            <Send className="h-4 w-4" /> {submitState === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        )}
      </div>
    </form>
  );
}
