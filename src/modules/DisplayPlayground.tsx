import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { RadioGroup } from '../components/ui/RadioGroup'
import { Slider } from '../components/ui/Slider'
import { cn } from '../lib/classNames'

export type DisplayPlaygroundProps = {
  showGuides: boolean
}

type DisplayMode = 'block' | 'inline' | 'inline-block' | 'none'

type DatasetMode = 'inline' | 'block'

const displayOptions = [
  {
    label: 'block',
    value: 'block',
    hint: 'Starts on a new line and fills the available width.',
  },
  {
    label: 'inline',
    value: 'inline',
    hint: 'Flows with text and ignores width & height.',
  },
  {
    label: 'inline-block',
    value: 'inline-block',
    hint: 'Stays inline but respects width & height.',
  },
  {
    label: 'none',
    value: 'none',
    hint: 'Removes the element from the layout entirely.',
  },
]

const datasetOptions = [
  { label: 'Inline elements', value: 'inline' },
  { label: 'Block elements', value: 'block' },
]

const inlineTokens = [
  { label: 'span', tone: 'bg-amber-50 border-amber-200 text-amber-700' },
  { label: 'a', tone: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { label: 'strong', tone: 'bg-sky-50 border-sky-200 text-sky-700' },
  { label: 'em', tone: 'bg-pink-50 border-pink-200 text-pink-700' },
  { label: 'img', tone: 'bg-slate-100 border-slate-300 text-slate-600' },
]

const blockTokens = [
  { label: 'div', tone: 'bg-violet-50 border-violet-200 text-violet-700' },
  { label: 'p', tone: 'bg-amber-50 border-amber-200 text-amber-700' },
  { label: 'section', tone: 'bg-sky-50 border-sky-200 text-sky-700' },
  { label: 'ul', tone: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { label: 'li', tone: 'bg-rose-50 border-rose-200 text-rose-700' },
]

export function DisplayPlayground({ showGuides }: DisplayPlaygroundProps) {
  const [display, setDisplay] = useState<DisplayMode>('inline-block')
  const [width, setWidth] = useState(160)
  const [height, setHeight] = useState(56)
  const [dataset, setDataset] = useState<DatasetMode>('inline')

  const sizeStyle = {
    width: width > 0 ? `${width}px` : undefined,
    height: height > 0 ? `${height}px` : undefined,
  }

  const reset = () => {
    setDisplay('inline-block')
    setWidth(160)
    setHeight(56)
    setDataset('inline')
  }

  const tokens = dataset === 'inline' ? inlineTokens : blockTokens
  const displayTone: Record<DisplayMode, string> = {
    block: 'border-sky-200 bg-sky-100 text-sky-700',
    inline: 'border-emerald-200 bg-emerald-100 text-emerald-700',
    'inline-block': 'border-violet-200 bg-violet-100 text-violet-700',
    none: 'border-rose-200 bg-rose-100 text-rose-700',
  }

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
          <Field label="display">
            <RadioGroup
              name="display"
              value={display}
              options={displayOptions}
              onChange={(value) => setDisplay(value as DisplayMode)}
            />
          </Field>
          <Field
            label={`width: ${width === 0 ? 'auto' : `${width}px`}`}
            hint="0 = auto. Try changing this while switching display values."
          >
            <Slider
              min={0}
              max={320}
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
            />
          </Field>
          <Field
            label={`height: ${height === 0 ? 'auto' : `${height}px`}`}
            hint="0 = auto. Try changing this while switching display values."
          >
            <Slider
              min={0}
              max={200}
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </Field>
          <Field
            label="Element set"
            hint="Switch between commonly inline and block-level elements."
          >
            <RadioGroup
              name="dataset"
              value={dataset}
              options={datasetOptions}
              onChange={(value) => setDataset(value as DatasetMode)}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Live Stage" className="min-h-75">
        <p className="mb-2 text-xs text-slate-500">
          This area simulates how elements behave in a real webpage.
        </p>
        <div
          className={cn(
            'relative min-h-55 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Elements flow
            </div>
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase',
                displayTone[display],
              )}
            >
              {display}
            </span>
          </div>
          {dataset === 'inline' ? (
            <div className="mt-3 text-sm">
              <span className="text-slate-500">The</span>{' '}
              {tokens.map((token) => (
                <span
                  key={token.label}
                  style={{
                    display,
                    ...(display === 'inline' ? undefined : sizeStyle),
                  }}
                  className={cn(
                    'rounded-md border px-2 py-1 text-xs font-semibold',
                    token.tone,
                  )}
                >
                  {token.label === 'img' && display !== 'inline' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-4 rounded bg-slate-300" />
                      img
                    </span>
                  ) : (
                    token.label
                  )}
                </span>
              ))}{' '}
              <span className="text-slate-500">
                watch how the elements reflow as display switches.
              </span>
            </div>
          ) : (
            <div className="mt-3 rounded-md border border-dashed border-slate-200 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                block container
              </div>
              <div className="mt-2">
                {tokens.map((token) => (
                  <span
                    key={token.label}
                    style={{
                      display,
                      ...(display === 'inline' ? undefined : sizeStyle),
                    }}
                    className={cn(
                      'rounded-md border px-2 py-1 text-xs font-semibold',
                      token.tone,
                    )}
                  >
                    {token.label}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 text-xs text-slate-400">
            Watch how elements reflow as you change the display property.
          </div>
          {display === 'none' && (
            <div className="mt-2 text-xs text-rose-500">
              Elements with display: none don&apos;t take up space in the layout.
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <div className="space-y-3 text-sm text-slate-600">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Defaults
            </p>
            <p className="mt-1">Inline: span, a, strong, em, img</p>
            <p>Block: div, p, section, ul, li</p>
          </div>
          <ul className="list-disc space-y-2 pl-5">
            <li>Inline ignores width/height and flows with text.</li>
            <li>Inline-block respects width/height but stays in line.</li>
            <li>Block starts on a new line and fills the row.</li>
          </ul>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
            <code>display: inline | block | inline-block | none</code>
          </div>
        </div>
      </Panel>
    </div>
  )
}
