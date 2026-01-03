import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { Slider } from '../components/ui/Slider'
import { Toggle } from '../components/ui/Toggle'
import { cn } from '../lib/classNames'

export type PositionPlaygroundProps = {
  showGuides: boolean
}

type PositionMode = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

const positionOptions: PositionMode[] = [
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',
]

export function PositionPlayground({ showGuides }: PositionPlaygroundProps) {
  const [position, setPosition] = useState<PositionMode>('relative')
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [marginTop, setMarginTop] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)
  const [parentRelative, setParentRelative] = useState(true)
  const [scrollEnabled, setScrollEnabled] = useState(false)

  const reset = () => {
    setPosition('relative')
    setTop(0)
    setLeft(0)
    setMarginTop(0)
    setMarginLeft(0)
    setParentRelative(true)
    setScrollEnabled(false)
  }

  const useScroll = scrollEnabled || position === 'sticky'
  const isOverlay = position === 'fixed' || (position === 'absolute' && !parentRelative)

  const activePositionStyles = useMemo(() => {
    if (position === 'static') {
      return {}
    }
    return { top: `${top}px`, left: `${left}px` }
  }, [position, top, left])

  const activeMarginStyles = useMemo(
    () => ({ marginTop: `${marginTop}px`, marginLeft: `${marginLeft}px` }),
    [marginLeft, marginTop],
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
          <Field label="position">
            <Select value={position} onChange={(event) => setPosition(event.target.value as PositionMode)}>
              {positionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={`top: ${top}px`}>
            <Slider
              min={-80}
              max={80}
              value={top}
              onChange={(event) => setTop(Number(event.target.value))}
            />
          </Field>
          <Field label={`left: ${left}px`}>
            <Slider
              min={-80}
              max={80}
              value={left}
              onChange={(event) => setLeft(Number(event.target.value))}
            />
          </Field>
          <Field label={`margin-top: ${marginTop}px`}>
            <Slider
              min={0}
              max={40}
              value={marginTop}
              onChange={(event) => setMarginTop(Number(event.target.value))}
            />
          </Field>
          <Field label={`margin-left: ${marginLeft}px`}>
            <Slider
              min={0}
              max={40}
              value={marginLeft}
              onChange={(event) => setMarginLeft(Number(event.target.value))}
            />
          </Field>
          <Field label="Parent is position: relative">
            <Toggle
              pressed={parentRelative}
              label={parentRelative ? 'Relative parent on' : 'Relative parent off'}
              onChange={setParentRelative}
            />
          </Field>
          <Field label="Enable scroll container">
            <Toggle
              pressed={scrollEnabled}
              label={scrollEnabled ? 'Scroll enabled' : 'Scroll disabled'}
              onChange={setScrollEnabled}
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
            'relative h-72 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          {isOverlay && (
            <div
              className="absolute left-4 top-4 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
              style={{
                top: `${top + 16}px`,
                left: `${left + 16}px`,
                position: position === 'fixed' ? 'absolute' : 'absolute',
                ...activeMarginStyles,
              }}
            >
              active ({position})
            </div>
          )}
          <div
            className={cn(
              'h-full rounded-md border border-dashed border-slate-300 bg-slate-50 p-3',
              parentRelative && 'relative',
            )}
          >
            <div className={cn('h-full', useScroll ? 'overflow-y-auto pr-2' : 'overflow-hidden')}>
              <div className="min-h-[280px] space-y-4">
                <div className="flex gap-3">
                  <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs">
                    sibling 1
                  </div>
                  {!isOverlay && (
                    <div
                      className={cn(
                        'rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-white',
                      )}
                      style={{
                        ...activePositionStyles,
                        position,
                        ...activeMarginStyles,
                      }}
                    >
                      active ({position})
                    </div>
                  )}
                  <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs">
                    sibling 2
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-md border border-slate-200 bg-white/80" />
                  <div className="h-12 rounded-md border border-slate-200 bg-white/80" />
                  <div className="h-12 rounded-md border border-slate-200 bg-white/80" />
                </div>
              </div>
            </div>
          </div>
          {position === 'sticky' && (
            <div className="mt-2 text-[10px] text-slate-400">
              Sticky sticks to top of the scroll container.
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Static is normal flow; top/left ignored.</li>
          <li>Relative shifts from its spot while keeping space.</li>
          <li>Absolute/fixed are out of flow; they don&apos;t keep space.</li>
          <li>Fixed pins to viewport; sticky toggles between relative and fixed.</li>
        </ul>
      </Panel>
    </div>
  )
}
