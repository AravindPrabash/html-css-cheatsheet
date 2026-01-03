import { Panel } from '../components/ui/Panel'

export function QuickNotes() {
  const cards = [
    {
      title: 'CSS specificity (fast rule)',
      body:
        'Priority order: inline styles > #id selectors > .class / [attr] / :pseudo-class > element / ::pseudo-element. Later rules win only when specificity is equal.',
    },
    {
      title: 'Units quick reference',
      body:
        'px = fixed pixels. rem = relative to root font-size. em = relative to parent font-size. % = relative to parent size. vh/vw = viewport height/width.',
    },
    {
      title: 'Box model reminder',
      body:
        'Actual size = content + padding + border. Margin adds space outside. box-sizing: border-box makes width/height include padding & border.',
    },
    {
      title: 'Display vs visibility',
      body:
        'display: none removes the element from layout. visibility: hidden keeps space but hides the element.',
    },
    {
      title: 'Positioning basics',
      body:
        'static = default. relative = offset without leaving flow. absolute = positioned relative to nearest positioned ancestor. fixed = relative to viewport. sticky = hybrid of relative & fixed.',
    },
    {
      title: 'Inline vs inline-block',
      body:
        'inline ignores width/height and vertical margin. inline-block respects width/height while staying in the text flow.',
    },
    {
      title: 'Flexbox mental model',
      body:
        'Flexbox is one-dimensional (row OR column). Main axis = flex-direction. Cross axis is perpendicular. justify-content aligns main axis, align-items aligns cross axis.',
    },
    {
      title: 'Centering shortcuts',
      body:
        'Horizontal: margin: 0 auto (block). Vertical & horizontal: display: flex + align-items + justify-content OR grid place-items: center.',
    },
    {
      title: 'Overflow gotchas',
      body:
        'overflow: hidden clips content. auto adds scrollbars only when needed. Hidden overflow can block box-shadow and focus outlines.',
    },
    {
      title: 'Z-index rules',
      body:
        'z-index works only on positioned elements. Higher value wins within the same stacking context.',
    },
    {
      title: 'Common layout bugs',
      body:
        'Unexpected spacing often comes from default margins on body, p, ul. Images are inline by default and add baseline gaps.',
    },
    {
      title: 'When things don’t align',
      body:
        'Check: display type, box-sizing, default margins, line-height, and parent constraints before adding hacks.',
    },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      {/* <Panel title="Controls" className="bg-slate-50/70">
        <p className="mb-3 text-xs text-slate-500">
          These cards are static reminders for fast review.
        </p>
        <div className="text-sm text-slate-500">No controls for quick notes.</div>
      </Panel> */}
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
