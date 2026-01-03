import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { Slider } from '../components/ui/Slider'
import { cn } from '../lib/classNames'

export type FlexboxPlaygroundProps = {
  showGuides: boolean
}

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

type AlignItems = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline'

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

const items = [
  { id: 1, size: 'h-10 w-16' },
  { id: 2, size: 'h-8 w-12' },
  { id: 3, size: 'h-12 w-14' },
  { id: 4, size: 'h-9 w-10' },
  { id: 5, size: 'h-11 w-20' },
  { id: 6, size: 'h-8 w-12' },
]

export function FlexboxPlayground({ showGuides }: FlexboxPlaygroundProps) {
  const [direction, setDirection] = useState<FlexDirection>('row')
  const [justify, setJustify] = useState<JustifyContent>('flex-start')
  const [align, setAlign] = useState<AlignItems>('stretch')
  const [wrap, setWrap] = useState<FlexWrap>('nowrap')
  const [gap, setGap] = useState(12)
  const [grow1, setGrow1] = useState(0)

  const reset = () => {
    setDirection('row')
    setJustify('flex-start')
    setAlign('stretch')
    setWrap('nowrap')
    setGap(12)
    setGrow1(0)
  }

  const isRow = direction.startsWith('row')

  const axisClasses = useMemo(() => {
    return {
      main: isRow
        ? 'left-4 right-4 top-5 h-0.5'
        : 'top-4 bottom-4 left-5 w-0.5',
      cross: isRow
        ? 'top-4 bottom-4 left-6 w-0.5'
        : 'left-4 right-4 top-6 h-0.5',
    }
  }, [isRow])

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
          <Field label="flex-direction">
            <Select value={direction} onChange={(event) => setDirection(event.target.value as FlexDirection)}>
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </Select>
          </Field>
          <Field label="justify-content">
            <Select value={justify} onChange={(event) => setJustify(event.target.value as JustifyContent)}>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </Select>
          </Field>
          <Field label="align-items">
            <Select value={align} onChange={(event) => setAlign(event.target.value as AlignItems)}>
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="baseline">baseline</option>
            </Select>
          </Field>
          <Field label="flex-wrap">
            <Select value={wrap} onChange={(event) => setWrap(event.target.value as FlexWrap)}>
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </Select>
          </Field>
          <Field label={`gap: ${gap}px`}>
            <Slider
              min={0}
              max={32}
              value={gap}
              onChange={(event) => setGap(Number(event.target.value))}
            />
          </Field>
          <Field label={`item 1 grow: ${grow1}`}>
            <Slider
              min={0}
              max={3}
              step={1}
              value={grow1}
              onChange={(event) => setGrow1(Number(event.target.value))}
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
            'relative min-h-[240px] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className={cn('absolute bg-amber-400', axisClasses.main)} />
            <div className={cn('absolute bg-sky-400', axisClasses.cross)} />
            <div className="absolute right-4 top-2 text-[10px] text-amber-500">main</div>
            <div className="absolute left-2 bottom-2 text-[10px] text-sky-500">cross</div>
          </div>
          <div
            className="relative flex h-full rounded-md border border-dashed border-slate-300 bg-white/80 p-3"
            style={{
              flexDirection: direction,
              justifyContent: justify,
              alignItems: align,
              flexWrap: wrap,
              gap: `${gap}px`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center justify-center rounded-md border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600',
                  item.size,
                )}
                style={item.id === 1 ? { flexGrow: grow1 } : undefined}
              >
                {item.id}
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>justify-content controls main axis distribution.</li>
          <li>align-items controls cross axis alignment.</li>
          <li>Direction swaps which axis is main.</li>
        </ul>
      </Panel>
    </div>
  )
}
