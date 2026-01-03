import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { RadioGroup } from '../components/ui/RadioGroup'
import { Select } from '../components/ui/Select'
import { cn } from '../lib/classNames'

export type PseudoClassesPlaygroundProps = {
  showGuides: boolean
}

type PseudoState =
  | 'hover'
  | 'active'
  | 'focus'
  | 'focus-visible'
  | 'disabled'
  | 'checked'
  | 'first-child'
  | 'last-child'
  | 'nth-child(odd)'
  | 'not(.selected)'

type Dataset = 'controls' | 'choices' | 'list'

const pseudoOptions: { label: string; value: PseudoState }[] = [
  { label: ':hover', value: 'hover' },
  { label: ':active', value: 'active' },
  { label: ':focus', value: 'focus' },
  { label: ':focus-visible', value: 'focus-visible' },
  { label: ':disabled', value: 'disabled' },
  { label: ':checked', value: 'checked' },
  { label: ':first-child', value: 'first-child' },
  { label: ':last-child', value: 'last-child' },
  { label: ':nth-child(odd)', value: 'nth-child(odd)' },
  { label: ':not(.selected)', value: 'not(.selected)' },
]

const datasetOptions = [
  { label: 'Buttons + inputs', value: 'controls' },
  { label: 'Checkbox / radio', value: 'choices' },
  { label: 'List items', value: 'list' },
]

const hintByState: Partial<Record<PseudoState, string>> = {
  hover: 'Hover the button to see :hover in action.',
  active: 'Click and hold to see :active.',
  focus: 'Tab into the input to see :focus.',
  'focus-visible': 'Tab into the input to see :focus-visible.',
  disabled: 'Disabled controls show automatically.',
  checked: 'Checked inputs show automatically.',
}

const notesByState: Record<
  PseudoState,
  { snippet: string; description: string; gotcha: string }
> = {
  hover: {
    snippet: '.btn:hover { background: #e0f2fe; }',
    description: 'Applies when the pointer is over an element.',
    gotcha: 'Hover does not exist on touch-only devices.',
  },
  active: {
    snippet: '.btn:active { transform: scale(0.98); }',
    description: 'Applies while the element is being pressed.',
    gotcha: 'Active ends when the press ends.',
  },
  focus: {
    snippet: 'input:focus { outline: 2px solid #94a3b8; }',
    description: 'Applies when an element receives focus.',
    gotcha: 'Focus stays until you move away.',
  },
  'focus-visible': {
    snippet: 'button:focus-visible { outline: 2px solid #38bdf8; }',
    description: 'Applies when focus should be visible (keyboard).',
    gotcha: 'Mouse clicks often trigger :focus but not :focus-visible.',
  },
  disabled: {
    snippet: 'button:disabled { opacity: 0.5; }',
    description: 'Targets disabled controls.',
    gotcha: 'Disabled elements do not receive focus.',
  },
  checked: {
    snippet: 'input:checked + label { font-weight: 600; }',
    description: 'Targets checked radio/checkbox inputs.',
    gotcha: 'Works only on checkable inputs.',
  },
  'first-child': {
    snippet: 'li:first-child { font-weight: 600; }',
    description: 'Targets the first element inside its parent.',
    gotcha: 'Only counts element nodes, not text.',
  },
  'last-child': {
    snippet: 'li:last-child { font-weight: 600; }',
    description: 'Targets the last element inside its parent.',
    gotcha: 'Only matches if it is the last element.',
  },
  'nth-child(odd)': {
    snippet: 'li:nth-child(odd) { background: #f1f5f9; }',
    description: 'Targets odd-positioned elements.',
    gotcha: 'Counting starts at 1, not 0.',
  },
  'not(.selected)': {
    snippet: 'li:not(.selected) { opacity: 0.6; }',
    description: 'Excludes elements that match the selector.',
    gotcha: ':not() is still part of specificity rules.',
  },
}

const defaultDatasetByState: Record<PseudoState, Dataset> = {
  hover: 'controls',
  active: 'controls',
  focus: 'controls',
  'focus-visible': 'controls',
  disabled: 'controls',
  checked: 'choices',
  'first-child': 'list',
  'last-child': 'list',
  'nth-child(odd)': 'list',
  'not(.selected)': 'list',
}

export function PseudoClassesPlayground({ showGuides }: PseudoClassesPlaygroundProps) {
  const [pseudo, setPseudo] = useState<PseudoState>('hover')
  const [dataset, setDataset] = useState<Dataset>('controls')

  const reset = () => {
    setPseudo('hover')
    setDataset('controls')
  }

  const notes = notesByState[pseudo]

  const stageStyle = useMemo(() => {
    return `
      .pc-stage[data-state="hover"] .pc-btn:hover,
      .pc-stage[data-state="hover"] .pc-input:hover {
        background: #e0f2fe;
        border-color: #7dd3fc;
      }
      .pc-stage[data-state="active"] .pc-btn:active {
        transform: scale(0.98);
        background: #dbeafe;
        border-color: #93c5fd;
      }
      .pc-stage[data-state="focus"] .pc-input:focus {
        outline: 2px solid #94a3b8;
        outline-offset: 2px;
      }
      .pc-stage[data-state="focus-visible"] .pc-input:focus-visible {
        outline: 2px solid #38bdf8;
        outline-offset: 2px;
      }
      .pc-stage[data-state="disabled"] .pc-control:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .pc-stage[data-state="checked"] .pc-choice:checked + label {
        color: #0f172a;
        font-weight: 600;
      }
      .pc-stage[data-state="first-child"] .pc-list li:first-child,
      .pc-stage[data-state="last-child"] .pc-list li:last-child,
      .pc-stage[data-state="nth-child(odd)"] .pc-list li:nth-child(odd),
      .pc-stage[data-state="not(.selected)"] .pc-list li:not(.selected) {
        background: #fef3c7;
        border-color: #fcd34d;
        color: #92400e;
        font-weight: 600;
      }
    `
  }, [])

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
          <Field label="State">
            <Select
              value={pseudo}
              onChange={(event) => {
                const value = event.target.value as PseudoState
                setPseudo(value)
                setDataset(defaultDatasetByState[value])
              }}
            >
              {pseudoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Example set">
            <RadioGroup
              name="pseudo-dataset"
              value={dataset}
              options={datasetOptions}
              onChange={(value) => setDataset(value as Dataset)}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Live Stage" className="min-h-[300px]">
        <p className="mb-2 text-xs text-slate-500">
          This area simulates how elements behave in a real webpage.
        </p>
        <div
          className={cn(
            'pc-stage relative min-h-[240px] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
          data-state={pseudo}
        >
          <style>{stageStyle}</style>
          {dataset === 'controls' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="pc-btn rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Primary button
                </button>
                <button
                  type="button"
                  className="pc-btn pc-control rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                  disabled={pseudo === 'disabled'}
                >
                  Disabled button
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <input
                  className="pc-input pc-control rounded-md border border-slate-300 px-3 py-2 text-xs"
                  placeholder="Focusable input"
                  disabled={pseudo === 'disabled'}
                />
                <input
                  className="pc-input pc-control rounded-md border border-slate-300 px-3 py-2 text-xs"
                  placeholder="Secondary input"
                />
              </div>
            </div>
          )}
          {dataset === 'choices' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  id="pc-check"
                  type="checkbox"
                  className="pc-choice"
                  defaultChecked={pseudo === 'checked'}
                />
                <label htmlFor="pc-check" className="text-xs text-slate-600">
                  Email updates
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="pc-radio"
                  type="radio"
                  name="pc-radio"
                  className="pc-choice"
                  defaultChecked={pseudo === 'checked'}
                />
                <label htmlFor="pc-radio" className="text-xs text-slate-600">
                  Daily summary
                </label>
              </div>
            </div>
          )}
          {dataset === 'list' && (
            <ul className="pc-list space-y-2">
              {['Intro', 'Layout', 'Typography', 'Responsive', 'Utilities'].map(
                (item, index) => (
                  <li
                    key={item}
                    className={cn(
                      'rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600',
                      index === 2 && 'selected border-slate-300 bg-white font-semibold',
                    )}
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          )}
          {showGuides && hintByState[pseudo] && (
            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
              {hintByState[pseudo]}
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <div className="space-y-3 text-sm text-slate-600">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Example
            </p>
            <div className="mt-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <code>{notes.snippet}</code>
            </div>
          </div>
          <p>{notes.description}</p>
          <p className="text-xs text-slate-500">Gotcha: {notes.gotcha}</p>
        </div>
      </Panel>
    </div>
  )
}
