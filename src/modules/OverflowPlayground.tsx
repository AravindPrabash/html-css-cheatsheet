import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { Slider } from '../components/ui/Slider'
import { Toggle } from '../components/ui/Toggle'
import { cn } from '../lib/classNames'

export type OverflowPlaygroundProps = {
  showGuides: boolean
}

type OverflowMode = 'visible' | 'hidden' | 'auto' | 'scroll' | 'clip'

type ContentType = 'text' | 'image' | 'nested'

const overflowOptions: { label: OverflowMode; value: OverflowMode }[] = [
  { label: 'visible', value: 'visible' },
  { label: 'hidden', value: 'hidden' },
  { label: 'auto', value: 'auto' },
  { label: 'scroll', value: 'scroll' },
  { label: 'clip', value: 'clip' },
]

const contentOptions: { label: string; value: ContentType }[] = [
  { label: 'Long text', value: 'text' },
  { label: 'Big image', value: 'image' },
  { label: 'Nested scroll', value: 'nested' },
]

export function OverflowPlayground({ showGuides }: OverflowPlaygroundProps) {
  const [overflow, setOverflow] = useState<OverflowMode>('auto')
  const [overflowX, setOverflowX] = useState<OverflowMode>('auto')
  const [overflowY, setOverflowY] = useState<OverflowMode>('auto')
  const [contentType, setContentType] = useState<ContentType>('text')
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(180)
  const [showScrollHint, setShowScrollHint] = useState(true)

  const reset = () => {
    setOverflow('auto')
    setOverflowX('auto')
    setOverflowY('auto')
    setContentType('text')
    setWidth(320)
    setHeight(180)
    setShowScrollHint(true)
  }

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    overflow,
    overflowX,
    overflowY,
  } as const

  const cssRules = useMemo(() => {
    return `overflow: ${overflow};\noverflow-x: ${overflowX};\noverflow-y: ${overflowY};\nwidth: ${width}px;\nheight: ${height}px;`
  }, [height, overflow, overflowX, overflowY, width])

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
          <Field label="overflow">
            <Select
              value={overflow}
              onChange={(event) => setOverflow(event.target.value as OverflowMode)}
            >
              {overflowOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="overflow-x">
            <Select
              value={overflowX}
              onChange={(event) => setOverflowX(event.target.value as OverflowMode)}
            >
              {overflowOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="overflow-y">
            <Select
              value={overflowY}
              onChange={(event) => setOverflowY(event.target.value as OverflowMode)}
            >
              {overflowOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Content type">
            <Select
              value={contentType}
              onChange={(event) => setContentType(event.target.value as ContentType)}
            >
              {contentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={`Container width: ${width}px`}>
            <Slider
              min={200}
              max={420}
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
            />
          </Field>
          <Field label={`Container height: ${height}px`}>
            <Slider
              min={120}
              max={260}
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </Field>
          {showGuides && (
            <Field label="Show scroll hint overlay">
              <Toggle
                pressed={showScrollHint}
                label={showScrollHint ? 'Overlay on' : 'Overlay off'}
                onChange={setShowScrollHint}
              />
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
            'relative min-h-[240px] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          <div
            className="relative rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3"
            style={containerStyle}
          >
            {contentType === 'text' && (
              <p className="text-xs leading-relaxed text-slate-600">
                Overflow lets content spill or clip when it grows larger than the
                container. Resize this box or switch overflow values to see when
                scrollbars appear and when content is hidden from view. This
                paragraph is intentionally long to create overflow in both
                directions.
              </p>
            )}
            {contentType === 'image' && (
              <div className="h-64 w-96 rounded-md border border-slate-300 bg-slate-200 text-xs text-slate-500">
                <div className="flex h-full items-center justify-center">
                  Oversized media block
                </div>
              </div>
            )}
            {contentType === 'nested' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500">
                  Outer container
                </div>
                <div className="h-28 rounded-md border border-slate-300 bg-white p-2">
                  <div className="mb-2 text-[10px] text-slate-400">Inner scroll</div>
                  <div className="h-16 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 text-[10px] text-slate-500">
                    <p>
                      Nested scroll areas can trap scrolling. Try switching overflow
                      modes or resizing to see how scrollbars stack.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {showGuides && showScrollHint && (overflow === 'auto' || overflow === 'scroll') && (
              <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm">
                Scroll to explore
              </div>
            )}
            {showGuides && showScrollHint && overflow === 'hidden' && (
              <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm">
                Content is clipped
              </div>
            )}
          </div>
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <div className="space-y-3 text-sm text-slate-600">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">CSS rules</p>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <code>{cssRules}</code>
            </pre>
          </div>
          <ul className="list-disc space-y-2 pl-5">
            <li>overflow: hidden clips content and can hide focus rings or shadows.</li>
            <li>auto shows scrollbars only when content exceeds the box.</li>
            <li>Nested scroll containers can trap scrolling on touchpads.</li>
          </ul>
        </div>
      </Panel>
    </div>
  )
}
