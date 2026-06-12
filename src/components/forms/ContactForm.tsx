export function ContactForm() {
  const topics = ['Consultation / Assessment', 'Partnership', 'Executive', 'Scientific / CSO', 'Careers / Associate', 'Privacy', 'General'];

  return (
    <form className="grid gap-5 rounded-[2rem] border border-cool bg-white p-6 shadow-soft" action="/api/leads" method="post">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-carbon">Name<input name="name" required minLength={2} maxLength={120} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Company<input name="company" maxLength={120} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Email<input name="email" type="email" required className="rounded-xl border border-coal/20 px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold text-carbon">Topic<select name="topic" required className="rounded-xl border border-coal/20 px-4 py-3">{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-carbon">Message<textarea name="message" required minLength={10} maxLength={2000} rows={6} className="rounded-xl border border-coal/20 px-4 py-3" /></label>
      <label className="flex gap-3 rounded-2xl bg-cool p-5 text-sm font-semibold text-carbon"><input name="consentToContact" type="checkbox" required /> I consent to EterSolis contacting me about this inquiry.</label>
      <button className="rounded-full bg-sunshine px-7 py-4 font-bold text-carbon" type="submit">Submit Inquiry</button>
    </form>
  );
}
