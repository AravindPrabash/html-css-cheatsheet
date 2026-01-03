import { Panel } from '../components/ui/Panel'

export function QuickNotes() {
  const cards = [
    {
      title: 'Specificity mini rule',
      body: 'Inline styles > #id > .class > element selector.',
    },
    {
      title: 'Units quick reference',
      body: 'px = pixels, rem = root font size, % = relative, vh/vw = viewport.',
    },
    {
      title: 'Common gotchas',
      body: 'Margin collapse, default box-sizing, overflow hiding content.',
    },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_280px]">
      <Panel title="Controls" className="bg-slate-50/70">
        <p className="mb-3 text-xs text-slate-500">
          These cards are static reminders for fast review.
        </p>
        <div className="text-sm text-slate-500">No controls for quick notes.</div>
      </Panel>
      <Panel title="Quick Notes" className="min-h-[300px]">
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm"
            >
              <div className="text-xs font-semibold uppercase text-slate-400">
                {card.title}
              </div>
              <p className="mt-2 text-sm text-slate-700">{card.body}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Notes" className="bg-slate-50/70">
        <div className="text-sm text-slate-500">
          Use these as quick recall cards before interviews or quizzes.
        </div>
      </Panel>
    </div>
  )
}
