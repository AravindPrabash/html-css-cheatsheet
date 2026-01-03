import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { RadioGroup } from '../components/ui/RadioGroup'
import { Select } from '../components/ui/Select'
import { Slider } from '../components/ui/Slider'
import { cn } from '../lib/classNames'

export type PseudoElementsPlaygroundProps = {
  showGuides: boolean
}

type PseudoElement =
  | 'before'
  | 'after'
  | 'first-letter'
  | 'first-line'
  | 'selection'
  | 'marker'
  | 'placeholder'

type BadgePosition = 'left' | 'right'

type MarkerStyle = 'disc' | 'decimal' | 'custom'

type SelectionTone = 'soft' | 'medium' | 'strong'

const pseudoOptions: { label: string; value: PseudoElement }[] = [
  { label: '::before', value: 'before' },
  { label: '::after', value: 'after' },
  { label: '::first-letter', value: 'first-letter' },
  { label: '::first-line', value: 'first-line' },
  { label: '::selection', value: 'selection' },
  { label: '::marker', value: 'marker' },
  { label: '::placeholder', value: 'placeholder' },
]

const markerOptions: { label: string; value: MarkerStyle }[] = [
  { label: 'disc', value: 'disc' },
  { label: 'decimal', value: 'decimal' },
  { label: 'custom', value: 'custom' },
]

const selectionOptions: { label: string; value: SelectionTone }[] = [
  { label: 'Soft highlight', value: 'soft' },
  { label: 'Medium highlight', value: 'medium' },
  { label: 'Strong highlight', value: 'strong' },
]

const badgeDisplayOptions = [
  { label: 'Inline badge', value: 'inline' },
  { label: 'Block badge', value: 'block' },
]

const badgePositionOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
]

const notesByElement: Record<PseudoElement, string[]> = {
  before: ['::before adds content before an element.', 'Requires content to render.'],
  after: ['::after adds content after an element.', 'Requires content to render.'],
  'first-letter': ['Targets the first letter of a block.', 'Useful for drop caps.'],
  'first-line': ['Targets the first line of text.', 'Depends on container width.'],
  selection: ['Styles selected text.', 'Browser support varies for some properties.'],
  marker: ['Styles list markers.', 'Only certain properties apply.'],
  placeholder: ['Styles input placeholder text.', 'Not all browsers allow full styling.'],
}

const gotchasByElement: Record<PseudoElement, string> = {
  before: 'Pseudo-elements are part of rendering, not real DOM nodes.',
  after: 'Pseudo-elements are part of rendering, not real DOM nodes.',
  'first-letter': 'Only works on block containers, not inline spans.',
  'first-line': 'Line breaks and width changes affect the target.',
  selection: 'Use vendor prefixes when you need wider support.',
  marker: 'You cannot style every property on ::marker.',
  placeholder: 'Placeholder text is not a replacement for labels.',
}

const selectionTones: Record<SelectionTone, { bg: string; fg: string }> = {
  soft: { bg: '#fde68a', fg: '#92400e' },
  medium: { bg: '#fbbf24', fg: '#78350f' },
  strong: { bg: '#f59e0b', fg: '#451a03' },
}

function escapeCssContent(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export function PseudoElementsPlayground({ showGuides }: PseudoElementsPlaygroundProps) {
  const [pseudo, setPseudo] = useState<PseudoElement>('before')
  const [contentText, setContentText] = useState('NEW')
  const [badgeDisplay, setBadgeDisplay] = useState<'inline' | 'block'>('inline')
  const [badgeSize, setBadgeSize] = useState(12)
  const [badgePosition, setBadgePosition] = useState<BadgePosition>('left')
  const [markerStyle, setMarkerStyle] = useState<MarkerStyle>('disc')
  const [selectionTone, setSelectionTone] = useState<SelectionTone>('soft')

  const reset = () => {
    setPseudo('before')
    setContentText('NEW')
    setBadgeDisplay('inline')
    setBadgeSize(12)
    setBadgePosition('left')
    setMarkerStyle('disc')
    setSelectionTone('soft')
  }

  const selectionColors = selectionTones[selectionTone]

  const stageStyle = useMemo(() => {
    const badgeContent = escapeCssContent(contentText || 'NEW')
    const badgeMargin = badgePosition === 'left' ? '0 0.4rem 0 0' : '0 0 0 0.4rem'
    const markerContent = markerStyle === 'custom' ? '" >> "' : '""'

    return `
      .pe-stage[data-pseudo="before"] .pe-title::before {
        content: "${badgeContent}";
        display: ${badgeDisplay};
        font-size: ${badgeSize}px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        background: #e2e8f0;
        border: 1px solid #cbd5f5;
        border-radius: 999px;
        padding: 0.2rem 0.5rem;
        margin: ${badgeMargin};
      }
      .pe-stage[data-pseudo="after"] .pe-title::after {
        content: "${badgeContent}";
        display: ${badgeDisplay};
        font-size: ${badgeSize}px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        background: #e2e8f0;
        border: 1px solid #cbd5f5;
        border-radius: 999px;
        padding: 0.2rem 0.5rem;
        margin: ${badgeMargin};
      }
      .pe-stage[data-pseudo="first-letter"] .pe-body::first-letter {
        font-size: ${badgeSize + 8}px;
        font-weight: 700;
        color: #1e293b;
      }
      .pe-stage[data-pseudo="first-line"] .pe-body::first-line {
        font-weight: 600;
        color: #475569;
      }
      .pe-stage[data-pseudo="selection"] ::selection {
        background: ${selectionColors.bg};
        color: ${selectionColors.fg};
      }
      .pe-stage[data-pseudo="marker"] .pe-list {
        list-style: ${markerStyle === 'decimal' ? 'decimal' : 'disc'};
      }
      .pe-stage[data-pseudo="marker"] .pe-list li::marker {
        color: #0f172a;
        font-weight: 600;
        content: ${markerContent};
      }
      .pe-stage[data-pseudo="placeholder"] .pe-input::placeholder {
        color: #94a3b8;
        font-style: italic;
      }
    `
  }, [
    badgeDisplay,
    badgePosition,
    badgeSize,
    contentText,
    markerStyle,
    selectionColors.bg,
    selectionColors.fg,
  ])

  const cssRules = useMemo(() => {
    const badgeContent = escapeCssContent(contentText || 'NEW')
    const badgeMargin = badgePosition === 'left' ? '0 0.4rem 0 0' : '0 0 0 0.4rem'
    const markerContent = markerStyle === 'custom' ? '" >> "' : '""'

    if (pseudo === 'before') {
      return `.pe-title::before {\n  content: \"${badgeContent}\";\n  display: ${badgeDisplay};\n  font-size: ${badgeSize}px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #475569;\n  background: #e2e8f0;\n  border: 1px solid #cbd5f5;\n  border-radius: 999px;\n  padding: 0.2rem 0.5rem;\n  margin: ${badgeMargin};\n}`
    }

    if (pseudo === 'after') {
      return `.pe-title::after {\n  content: \"${badgeContent}\";\n  display: ${badgeDisplay};\n  font-size: ${badgeSize}px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #475569;\n  background: #e2e8f0;\n  border: 1px solid #cbd5f5;\n  border-radius: 999px;\n  padding: 0.2rem 0.5rem;\n  margin: ${badgeMargin};\n}`
    }

    if (pseudo === 'first-letter') {
      return `.pe-body::first-letter {\n  font-size: ${badgeSize + 8}px;\n  font-weight: 700;\n  color: #1e293b;\n}`
    }

    if (pseudo === 'first-line') {
      return `.pe-body::first-line {\n  font-weight: 600;\n  color: #475569;\n}`
    }

    if (pseudo === 'selection') {
      return `::selection {\n  background: ${selectionColors.bg};\n  color: ${selectionColors.fg};\n}`
    }

    if (pseudo === 'marker') {
      return `.pe-list {\n  list-style: ${markerStyle === 'decimal' ? 'decimal' : 'disc'};\n}\n\n.pe-list li::marker {\n  color: #0f172a;\n  font-weight: 600;\n  content: ${markerContent};\n}`
    }

    return `.pe-input::placeholder {\n  color: #94a3b8;\n  font-style: italic;\n}`
  }, [
    badgeDisplay,
    badgePosition,
    badgeSize,
    contentText,
    markerStyle,
    pseudo,
    selectionColors.bg,
    selectionColors.fg,
  ])

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_280px]">
      <Panel
        title="Controls"
        action={
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        }
        className="bg-slate-50/70"
      >
        <p className="mb-3 text-xs text-slate-500">
          Adjust these settings to see how elements behave in real time.
        </p>
        <div className="space-y-4">
          <Field label="Pseudo-element">
            <Select value={pseudo} onChange={(event) => setPseudo(event.target.value as PseudoElement)}>
              {pseudoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          {(pseudo === 'before' || pseudo === 'after') && (
            <>
              <Field label="Badge content">
                <input
                  className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200"
                  value={contentText}
                  onChange={(event) => setContentText(event.target.value)}
                  placeholder="Text for ::before/::after"
                />
              </Field>
              <Field label="Badge style">
                <RadioGroup
                  name="badge-display"
                  value={badgeDisplay}
                  options={badgeDisplayOptions}
                  onChange={(value) => setBadgeDisplay(value as 'inline' | 'block')}
                />
              </Field>
              <Field label={`Badge size: ${badgeSize}px`}>
                <Slider
                  min={10}
                  max={20}
                  value={badgeSize}
                  onChange={(event) => setBadgeSize(Number(event.target.value))}
                />
              </Field>
              <Field label="Badge position">
                <RadioGroup
                  name="badge-position"
                  value={badgePosition}
                  options={badgePositionOptions}
                  onChange={(value) => setBadgePosition(value as BadgePosition)}
                />
              </Field>
            </>
          )}
          {(pseudo === 'first-letter' || pseudo === 'first-line') && (
            <Field label={`Type size: ${badgeSize + 8}px`}>
              <Slider
                min={12}
                max={24}
                value={badgeSize + 8}
                onChange={(event) => setBadgeSize(Number(event.target.value) - 8)}
              />
            </Field>
          )}
          {pseudo === 'marker' && (
            <Field label="Marker style">
              <Select
                value={markerStyle}
                onChange={(event) => setMarkerStyle(event.target.value as MarkerStyle)}
              >
                {markerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          {pseudo === 'selection' && (
            <Field label="Selection intensity">
              <Select
                value={selectionTone}
                onChange={(event) => setSelectionTone(event.target.value as SelectionTone)}
              >
                {selectionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
          )}
        </div>
      </Panel>

      <Panel title="Live Stage" className="min-h-[300px]">
        <p className="mb-2 text-xs text-slate-500">
          This area simulates how elements behave in a real webpage.
        </p>
        <div
          className={cn(
            'pe-stage relative min-h-[240px] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
          data-pseudo={pseudo}
        >
          <style>{stageStyle}</style>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="pe-title text-sm font-semibold text-slate-800">
                CSS Cheat Sheet Card
              </h3>
              <p className="pe-body mt-2 text-xs text-slate-600">
                Pseudo-elements let you decorate content without adding extra
                markup. They are perfect for badges, drop caps, and selective
                highlights.
              </p>
            </div>
            <ul className="pe-list ml-4 list-disc space-y-2 text-xs text-slate-600">
              <li>Item one with marker</li>
              <li>Item two with marker</li>
              <li>Item three with marker</li>
            </ul>
            <input
              className="pe-input w-full rounded-md border border-slate-300 px-3 py-2 text-xs"
              placeholder="Placeholder text shows ::placeholder"
            />
          </div>
          {showGuides && pseudo === 'selection' && (
            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
              Select some text in the card to see ::selection.
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <div className="space-y-3 text-sm text-slate-600">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              CSS rules in this demo
            </p>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <code>{cssRules}</code>
            </pre>
          </div>
          <ul className="list-disc space-y-2 pl-5">
            {notesByElement[pseudo].map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">Gotcha: {gotchasByElement[pseudo]}</p>
        </div>
      </Panel>
    </div>
  )
}
