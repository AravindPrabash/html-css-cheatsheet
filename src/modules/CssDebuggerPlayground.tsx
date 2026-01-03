import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { Toggle } from '../components/ui/Toggle'
import { cn } from '../lib/classNames'

export type CssDebuggerPlaygroundProps = {
  showGuides: boolean
}

type ScenarioId =
  | 'center'
  | 'z-index'
  | 'image-gap'
  | 'width-ignored'
  | 'spacing'
  | 'height-100'

type Scenario = {
  id: ScenarioId
  label: string
  description: string
  checklist: string[]
  snippet: string
  hint: string
}

const scenarios: Scenario[] = [
  {
    id: 'center',
    label: 'Why won’t this center?',
    description: 'Inline elements ignore width and auto margins.',
    checklist: [
      'Is the element block or inline-block?',
      'Does it have a set width?',
      'Is the parent wide enough?',
    ],
    snippet: `.card {\n  display: block;\n  width: 180px;\n  margin: 0 auto;\n}`,
    hint: 'This is inline, so width is ignored.',
  },
  {
    id: 'z-index',
    label: 'Why doesn’t z-index work?',
    description: 'A lower stacking context can keep an element underneath.',
    checklist: [
      'Is the element positioned (relative/absolute)?',
      'Is a parent creating a stacking context?',
      'Are siblings in a higher stacking context?',
    ],
    snippet: `.panel {\n  position: relative;\n  z-index: 3;\n}`,
    hint: 'Parent stacking context keeps it underneath.',
  },
  {
    id: 'image-gap',
    label: 'Why does my image have a gap under it?',
    description: 'Inline images sit on the text baseline.',
    checklist: [
      'Is the image inline by default?',
      'Is there a baseline gap?',
      'Should it be display: block?',
    ],
    snippet: `img {\n  display: block;\n  vertical-align: middle;\n}`,
    hint: 'Baseline gap under inline images.',
  },
  {
    id: 'width-ignored',
    label: 'Why doesn’t width apply?',
    description: 'Inline elements ignore width and height.',
    checklist: [
      'Is the element inline?',
      'Should it be inline-block or block?',
      'Is it being sized by content?',
    ],
    snippet: `.tag {\n  display: inline-block;\n  width: 140px;\n}`,
    hint: 'Inline elements ignore width.',
  },
  {
    id: 'spacing',
    label: 'Why is there unexpected spacing?',
    description: 'Browsers add default margins to body, p, ul, and h tags.',
    checklist: [
      'Are default margins applied?',
      'Is there a CSS reset?',
      'Are list styles adding padding?',
    ],
    snippet: `body, p, ul {\n  margin: 0;\n  padding: 0;\n}`,
    hint: 'Default margins on text and lists.',
  },
  {
    id: 'height-100',
    label: 'Why is my height: 100% not working?',
    description: 'Percent heights need a parent with an explicit height.',
    checklist: [
      'Does html, body have height: 100%?',
      'Is the parent given a height?',
      'Is the child height based on a parent?',
    ],
    snippet: `html, body {\n  height: 100%;\n}\n.container {\n  height: 100%;\n}`,
    hint: 'Parent needs an explicit height.',
  },
]

export function CssDebuggerPlayground({ showGuides }: CssDebuggerPlaygroundProps) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('center')
  const [applyFix, setApplyFix] = useState(false)

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0],
    [scenarioId],
  )

  const reset = () => {
    setScenarioId('center')
    setApplyFix(false)
  }

  const renderStage = () => {
    switch (scenarioId) {
      case 'center':
        return (
          <div className="space-y-3">
            <div className="text-xs text-slate-500">Parent container</div>
            <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
              <span
                className={cn(
                  'rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600',
                )}
                style={{
                  display: applyFix ? 'block' : 'inline',
                  width: '180px',
                  margin: '0 auto',
                }}
              >
                Center me
              </span>
            </div>
          </div>
        )
      case 'z-index':
        return (
          <div className="relative h-36">
            <div
              className="absolute left-4 top-6"
              style={{ zIndex: applyFix ? 3 : 1 }}
            >
              <div className="rounded-md border border-blue-300 bg-blue-100 px-4 py-3 text-xs text-blue-800 shadow-sm">
                Blue panel (z-index: 10)
              </div>
            </div>
            <div className="absolute left-12 top-10" style={{ zIndex: 2 }}>
              <div className="rounded-md border border-rose-300 bg-rose-100 px-4 py-3 text-xs text-rose-800 shadow-sm">
                Red panel (z-index: 2)
              </div>
            </div>
            <div className="absolute right-3 top-3 text-[10px] text-slate-400">
              parent stacking contexts
            </div>
          </div>
        )
      case 'image-gap':
        return (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Inline image in text flow</div>
            <div className="mt-3 rounded-md bg-white p-2">
              <span className="text-xs text-slate-600">Caption</span>
              <div
                className="mt-2 inline-block h-16 w-32 rounded bg-slate-200 text-[10px] text-slate-500"
                style={{
                  display: applyFix ? 'block' : 'inline-block',
                  verticalAlign: applyFix ? 'middle' : 'baseline',
                }}
              >
                Image
              </div>
            </div>
          </div>
        )
      case 'width-ignored':
        return (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Inline tag</div>
            <span
              className="mt-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600"
              style={{
                display: applyFix ? 'inline-block' : 'inline',
                width: '140px',
              }}
            >
              Width target
            </span>
          </div>
        )
      case 'spacing':
        return (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
              <p style={{ margin: applyFix ? 0 : '0 0 12px' }}>Default paragraph</p>
              <ul style={{ margin: applyFix ? 0 : '0 0 0 16px', padding: 0 }}>
                <li>List item</li>
                <li>List item</li>
              </ul>
            </div>
          </div>
        )
      case 'height-100':
        return (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Outer container</div>
            <div
              className="mt-2 rounded-md border border-slate-300 bg-white p-2"
              style={{ height: '140px' }}
            >
              <div
                className="rounded-md border border-slate-200 bg-slate-100 p-2"
                style={{ height: applyFix ? '100%' : 'auto' }}
              >
                <div
                  className="rounded-md bg-slate-300 text-[10px] text-slate-600"
                  style={{ height: '100%' }}
                >
                  Child 100% height
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
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
          <Field label="Scenario">
            <Select
              value={scenarioId}
              onChange={(event) => {
                const value = event.target.value as ScenarioId
                setScenarioId(value)
                setApplyFix(false)
              }}
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Apply fix">
            <Toggle
              pressed={applyFix}
              label={applyFix ? 'Fix applied' : 'Fix not applied'}
              onChange={setApplyFix}
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Live Stage"
        action={
          <Toggle
            pressed={applyFix}
            label={applyFix ? 'Fix applied' : 'Apply fix'}
            onChange={setApplyFix}
          />
        }
        className="min-h-[300px]"
      >
        <p className="mb-2 text-xs text-slate-500">
          This area simulates how elements behave in a real webpage.
        </p>
        <div
          className={cn(
            'relative min-h-[240px] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          {renderStage()}
          {showGuides && !applyFix && (
            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
              {scenario.hint}
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <div className="space-y-3 text-sm text-slate-600">
          <p>{scenario.description}</p>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Checklist
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {scenario.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Correct snippet
            </p>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <code>{scenario.snippet}</code>
            </pre>
          </div>
        </div>
      </Panel>
    </div>
  )
}
