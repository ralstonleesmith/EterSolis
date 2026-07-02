export function CommercialTable({ title, eyebrow, rows, columns, note }: { title: string; eyebrow: string; rows: string[][]; columns: string[]; note: string }) {
  return (
    <main className="section-padding bg-[var(--surface-muted)] dark:bg-black">
      <div className="container-shell">
        <p className="text-xs font-black uppercase tracking-normal text-subtle dark:text-sunshine">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black text-carbon dark:text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl leading-8 text-coal dark:text-on-dark-muted">{note}</p>
        <div className="mt-10 overflow-x-auto rounded-lg border border-coal/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-coal/10 text-xs font-black uppercase text-subtle dark:border-white/10 dark:text-sunshine">
              <tr>{columns.map((column) => <th key={column} className="px-4 py-3">{column}</th>)}</tr>
            </thead>
            <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-coal/10 last:border-0 dark:border-white/10">{row.map((cell) => <td key={cell} className="px-4 py-4 font-bold text-body">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
