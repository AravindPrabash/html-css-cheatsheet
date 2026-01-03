import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { Slider } from '../components/ui/Slider'
import { cn } from '../lib/classNames'

export type BoxModelPlaygroundProps = {
  showGuides: boolean
}

type BoxSizing = 'content-box' | 'border-box'

export function BoxModelPlayground({ showGuides }: BoxModelPlaygroundProps) {
  const [padding, setPadding] = useState(16)
  const [margin, setMargin] = useState(16)
  const [borderWidth, setBorderWidth] = useState(2)
  const [boxSizing, setBoxSizing] = useState<BoxSizing>('border-box')

  const reset = () => {
    setPadding(16)
    setMargin(16)
    setBorderWidth(2)
    setBoxSizing('border-box')
  }

  const boxStyle = {
    padding: `${padding}px`,
    borderWidth: `${borderWidth}px`,
    boxSizing,
  } as const

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
          <Field label={`padding: ${padding}px`}>
            <Slider
              min={0}
              max={48}
              value={padding}
              onChange={(event) => setPadding(Number(event.target.value))}
            />
          </Field>
          <Field label={`margin: ${margin}px`}>
            <Slider
              min={0}
              max={48}
              value={margin}
              onChange={(event) => setMargin(Number(event.target.value))}
            />
          </Field>
          <Field label={`border width: ${borderWidth}px`}>
            <Slider
              min={0}
              max={12}
              value={borderWidth}
              onChange={(event) => setBorderWidth(Number(event.target.value))}
            />
          </Field>
          <Field label="box-sizing">
            <Select
              value={boxSizing}
              onChange={(event) => setBoxSizing(event.target.value as BoxSizing)}
            >
              <option value="content-box">content-box</option>
              <option value="border-box">border-box</option>
            </Select>
          </Field>
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
          <div className="flex items-end gap-6">
            <div className="relative" style={{ marginRight: `${margin}px` }}>
              <div
                className="relative rounded-md border border-dashed border-slate-300 bg-transparent"
                style={{ padding: `${margin}px` }}
              >
                <span className="absolute -top-3 left-2 bg-white px-1 text-[10px] text-slate-400">
                  margin
                </span>
                <div
                  className="relative rounded-md border border-slate-400 bg-white"
                  style={boxStyle}
                >
                  <span className="absolute -top-3 left-2 bg-white px-1 text-[10px] text-slate-400">
                    border
                  </span>
                  <div className="relative rounded bg-slate-100">
                    <span className="absolute -top-3 left-2 bg-white px-1 text-[10px] text-slate-400">
                      padding
                    </span>
                    <div className="rounded bg-slate-50 px-3 py-2 text-xs text-slate-500">
                      content
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="h-20 w-24 rounded-md border border-slate-300 bg-slate-100" />
              <span className="absolute -bottom-5 left-0 text-[10px] text-slate-400">
                neighbor
              </span>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Margin sits outside the border and separates elements.</li>
          <li>Padding lives inside the border and grows the box.</li>
          <li>Border-box keeps the total size fixed when padding/border change.</li>
        </ul>
      </Panel>
    </div>
  )
}
