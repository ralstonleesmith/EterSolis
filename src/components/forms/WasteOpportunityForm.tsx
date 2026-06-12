export function WasteOpportunityForm() {
  const categories = ['Plastics', 'Paper and cardboard', 'Metals', 'E-waste', 'Organics', 'Industrial by-products', 'Construction materials', 'Other recoverable resources'];
  const frequencies = ['One-time', 'Weekly', 'Monthly', 'Quarterly', 'Continuous', 'Unknown'];

  return (
    <form className="grid gap-5 rounded-[2rem] border border-cool bg-white p-6 shadow-soft" action="/api/waste" method="post">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-carbon">Company name<input name="companyName" required minLength={2} maxLength={120} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Contact name<input name="contactName" required minLength={2} maxLength={100} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Email<input name="email" type="email" required className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Phone / WhatsApp<input name="phone" maxLength={50} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Country<input name="country" required minLength={2} maxLength={80} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Region / city / site<input name="region" required maxLength={120} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Material category<select name="materialCategory" required className="rounded-xl border border-coal/20 px-4 py-3">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Frequency<select name="frequency" required className="rounded-xl border border-coal/20 px-4 py-3">{frequencies.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Quantity<input name="quantity" type="number" step="any" min="0" className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Unit<select name="quantityUnit" className="rounded-xl border border-coal/20 px-4 py-3"><option>kg</option><option>tonnes</option><option>m3</option><option>pallets</option><option>containers</option><option>other</option></select></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-carbon">Material description<textarea name="materialDescription" required minLength={10} maxLength={2000} rows={5} className="rounded-xl border border-coal/20 px-4 py-3" placeholder="Use a non-confidential description only." /></label>
      <label className="grid gap-2 text-sm font-semibold text-carbon">Current handling route<textarea name="currentHandlingRoute" rows={3} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
      <label className="grid gap-2 text-sm font-semibold text-carbon">Contamination notes<textarea name="contaminationNotes" rows={3} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
      <div className="grid gap-4 rounded-2xl bg-cool p-5 text-sm text-carbon">
        <label className="flex gap-3"><input name="hazardFlag" type="checkbox" /> Hazardous, regulated, biological, chemical, medical, radioactive or unknown material flag</label>
        <label className="flex gap-3"><input name="safetyDocumentsAvailable" type="checkbox" /> Safety documents are available</label>
        <label className="grid gap-2 font-semibold">Confidentiality level<select name="confidentialityLevel" required className="rounded-xl border border-coal/20 px-4 py-3"><option>Public</option><option>Potential confidential</option><option>NDA required</option></select></label>
        <label className="flex gap-3 font-semibold"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this submission.</label>
      </div>
      <p className="text-sm font-semibold text-carbon">Submitting a waste opportunity is non-binding. Do not send physical samples unless EterSolis provides written intake instructions.</p>
      <button className="rounded-full bg-sunshine px-7 py-4 font-bold text-carbon" type="submit">Submit Waste Opportunity</button>
    </form>
  );
}
