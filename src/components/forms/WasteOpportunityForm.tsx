import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

const fieldClass = 'rounded-xl border border-coal/20 bg-white px-4 py-3 text-carbon shadow-sm transition placeholder:text-coal/45 focus:border-sunshine dark:border-white/10 dark:bg-black/45 dark:text-white dark:placeholder:text-white/35';
const labelClass = 'grid gap-2 text-sm font-black text-carbon dark:text-white';

export function WasteOpportunityForm() {
  const categories = ['Plastics', 'Paper and cardboard', 'Metals', 'E-waste', 'Organics', 'Industrial by-products', 'Construction materials', 'Other recoverable resources'];
  const frequencies = ['One-time', 'Weekly', 'Monthly', 'Quarterly', 'Continuous', 'Unknown'];

  return (
    <form className="grid gap-5 rounded-[2rem] border border-coal/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5" action="/api/waste" method="post">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-coal/60 dark:text-sunshine">Structured intake</p>
        <h2 className="mt-3 text-2xl font-black text-carbon dark:text-white">Waste opportunity form</h2>
        <p className="mt-2 text-sm leading-6 text-coal dark:text-white/68">Use non-confidential information only. EterSolis review is required before any next step.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>Company name<input name="companyName" required minLength={2} maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Contact name<input name="contactName" required minLength={2} maxLength={100} className={fieldClass} /></label>
        <label className={labelClass}>Email<input name="email" type="email" required className={fieldClass} /></label>
        <label className={labelClass}>Phone / WhatsApp<input name="phone" maxLength={50} className={fieldClass} /></label>
        <label className={labelClass}>Country<input name="country" required minLength={2} maxLength={80} className={fieldClass} /></label>
        <label className={labelClass}>Region / city / site<input name="region" required maxLength={120} className={fieldClass} /></label>
        <label className={labelClass}>Material category<select name="materialCategory" required className={fieldClass}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className={labelClass}>Frequency<select name="frequency" required className={fieldClass}>{frequencies.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className={labelClass}>Quantity<input name="quantity" type="number" step="any" min="0" className={fieldClass} /></label>
        <label className={labelClass}>Unit<select name="quantityUnit" className={fieldClass}><option>kg</option><option>tonnes</option><option>m3</option><option>pallets</option><option>containers</option><option>other</option></select></label>
      </div>
      <label className={labelClass}>Material description<textarea name="materialDescription" required minLength={10} maxLength={2000} rows={5} className={fieldClass} placeholder="Use a non-confidential description only." /></label>
      <label className={labelClass}>Current handling route<textarea name="currentHandlingRoute" rows={3} className={fieldClass} /></label>
      <label className={labelClass}>Contamination notes<textarea name="contaminationNotes" rows={3} className={fieldClass} /></label>
      <div className="grid gap-4 rounded-2xl border border-coal/10 bg-cool p-5 text-sm text-carbon dark:border-white/10 dark:bg-black/45 dark:text-white/82">
        <label className="flex gap-3"><input name="hazardFlag" type="checkbox" /> Hazardous, regulated, biological, chemical, medical, radioactive or unknown material flag</label>
        <label className="flex gap-3"><input name="safetyDocumentsAvailable" type="checkbox" /> Safety documents are available</label>
        <label className="grid gap-2 font-black">Confidentiality level<select name="confidentialityLevel" required className={fieldClass}><option>Public</option><option>Potential confidential</option><option>NDA required</option></select></label>
        <label className="flex gap-3 font-black"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this submission.</label>
      </div>
      <TurnstileWidget />
      <p className="rounded-2xl border border-sunshine/70 bg-sunshine/10 p-4 text-sm font-bold leading-7 text-carbon dark:text-white">Submitting a waste opportunity is non-binding. Do not send physical samples unless EterSolis provides written intake instructions.</p>
      <button className="rounded-full bg-sunshine px-7 py-4 font-black text-black shadow-soft transition hover:-translate-y-0.5" type="submit">Submit Waste Opportunity</button>
    </form>
  );
}
