import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { cn } from '../lib/classNames'

export type SelectorsPlaygroundProps = {
  showGuides: boolean
}

type Preset = {
  id: string
  label: string
  meaning: string
  matches: string[]
}

const presets: Preset[] = [
  {
    id: 'descendant',
    label: '.card .btn',
    meaning: 'Any .btn inside .card (any depth).',
    matches: ['btnPrimary1', 'btnGhost1', 'btnPrimary2', 'btnGhost2'],
  },
  {
    id: 'child',
    label: '.card > .actions',
    meaning: 'Direct child .actions of .card.',
    matches: ['actions1', 'actions2'],
  },
  {
    id: 'multiclass',
    label: '.btn.primary',
    meaning: 'Same element has both classes.',
    matches: ['btnPrimary1', 'btnPrimary2'],
  },
  {
    id: 'adjacent',
    label: '.title + .meta',
    meaning: 'The .meta immediately after .title.',
    matches: ['meta1', 'meta2'],
  },
  {
    id: 'sibling',
    label: '.title ~ .actions',
    meaning: 'Any .actions after .title (same parent).',
    matches: ['actions1', 'actions2'],
  },
]

const elementBase =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700'

const matchedStyle =
  'border-amber-400 bg-amber-100 text-amber-900 shadow-sm'

export function SelectorsPlayground({ showGuides }: SelectorsPlaygroundProps) {
  const [presetId, setPresetId] = useState('descendant')

  const preset = presets.find((item) => item.id === presetId) ?? presets[0]
  const matched = new Set(preset.matches)

  const reset = () => setPresetId('descendant')

  const renderElement = (id: string, label: string, className?: string) => (
    <div
      className={cn(
        elementBase,
        matched.has(id) ? matchedStyle : 'opacity-50',
        className,
      )}
    >
      {label}
    </div>
  )

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
          <Field label="Preset selector">
            <Select value={presetId} onChange={(event) => setPresetId(event.target.value)}>
              {presets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Meaning:</span> {preset.meaning}
          </div>
        </div>
      </Panel>

      <Panel title="Live Stage" className="min-h-[300px]">
        <p className="mb-2 text-xs text-slate-500">
          This area simulates how elements behave in a real webpage.
        </p>
        <div
          className={cn(
            'relative min-h-[240px] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          <div className="flex items-start gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-slate-400">card</div>
              {renderElement('title1', '.title')}
              {renderElement('meta1', '.meta')}
              {renderElement('actions1', '.actions')}
              <div className="ml-3 flex gap-2">
                {renderElement('btnPrimary1', '.btn.primary')}
                {renderElement('btnGhost1', '.btn.ghost')}
              </div>
            </div>
            <div className="flex items-center">
              {renderElement('separator', 'separator', 'bg-slate-50 px-4 py-6')}
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-slate-400">card</div>
              {renderElement('title2', '.title')}
              {renderElement('meta2', '.meta')}
              {renderElement('actions2', '.actions')}
              <div className="ml-3 flex gap-2">
                {renderElement('btnPrimary2', '.btn.primary')}
                {renderElement('btnGhost2', '.btn.ghost')}
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Matches: <span className="font-semibold">{preset.matches.length}</span>
          </div>
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Space: descendant anywhere under parent.</li>
          <li>&gt; direct child only.</li>
          <li>+ adjacent next sibling.</li>
          <li>~ any later sibling.</li>
          <li>.a.b same element with both classes.</li>
        </ul>
      </Panel>
    </div>
  )
}
