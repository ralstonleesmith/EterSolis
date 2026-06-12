import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

const fieldClass = 'rounded-xl border border-coal/20 bg-white px-4 py-3 text-carbon shadow-sm transition placeholder:text-coal/45 focus:border-sunshine dark:border-white/10 dark:bg-black/45 dark:text-white dark:placeholder:text-white/35';
const labelClass = 'grid gap-2 text-sm font-black text-carbon dark:text-white';

export function ContactForm() {
  const topics = ['Consultation / Assessment', 'Partnership', 'Executive', 'Scientific / CSO', 'Careers / Associate', 'Privacy', 'General'];

  return (
    <form className="grid gap-5 rounded-[2rem] border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5" action="/api/leads" method="post">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-coal/60 dark:text-sunshine">Controlled contact</p>
        <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">Submit an inquiry</h2>
        <p className="mt-2 text-sm leading-6 text-coal dark:text-white/68">Your inquiry will be routed to the correct EterSolis review path. Do not submit restricted confidential information through this public form.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>Name<input name="name" required minLength={2} maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Company<input name="company" maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Email<input name="email" type="email" required className={fieldClass} /></label>
        <label className={labelClass}>Topic<select name="topic" required className={fieldClass}>{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
      </div>
      <label className={labelClass}>Message<textarea name="message" required minLength={10} maxLength={2000} rows={6} className={fieldClass} placeholder="Use a clear, non-confidential summary." /></label>
      <label className="flex gap-3 rounded-2xl border border-coal/10 bg-cool p-5 text-sm font-black text-carbon dark:border-white/10 dark:bg-black/45 dark:text-white/82"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this inquiry.</label>
      <TurnstileWidget />
      <button className="rounded-full bg-sunshine px-7 py-4 font-black text-black shadow-soft transition hover:-translate-y-0.5" type="submit">Submit Inquiry</button>
    </form>
  );
}
