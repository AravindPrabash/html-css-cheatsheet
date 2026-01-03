import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { Panel } from '../components/ui/Panel'
import { Select } from '../components/ui/Select'
import { Slider } from '../components/ui/Slider'
import { Toggle } from '../components/ui/Toggle'
import { cn } from '../lib/classNames'

export type SizingPlaygroundProps = {
  showGuides: boolean
}

type Unit = 'px' | '%' | 'rem'

type ToggleValue = {
  enabled: boolean
  value: number
}

const unitOptions: { label: Unit; value: Unit }[] = [
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'rem', value: 'rem' },
]

function formatUnit(value: number, unit: Unit) {
  if (unit === '%') {
    return `${value}%`
  }
  if (unit === 'rem') {
    return `${value}rem`
  }
  return `${value}px`
}

export function SizingPlayground({ showGuides }: SizingPlaygroundProps) {
  const [unit, setUnit] = useState<Unit>('px')
  const [widthBase, setWidthBase] = useState(320)
  const [heightBase, setHeightBase] = useState(160)
  const [minWidth, setMinWidth] = useState<ToggleValue>({ enabled: true, value: 220 })
  const [maxWidth, setMaxWidth] = useState<ToggleValue>({ enabled: true, value: 480 })
  const [minHeight, setMinHeight] = useState<ToggleValue>({ enabled: false, value: 120 })
  const [maxHeight, setMaxHeight] = useState<ToggleValue>({ enabled: false, value: 240 })
  const [useClamp, setUseClamp] = useState(false)
  const [clampMin, setClampMin] = useState(220)
  const [clampPreferred, setClampPreferred] = useState(320)
  const [clampMax, setClampMax] = useState(520)
  const [parentWidth, setParentWidth] = useState(520)

  const reset = () => {
    setUnit('px')
    setWidthBase(320)
    setHeightBase(160)
    setMinWidth({ enabled: true, value: 220 })
    setMaxWidth({ enabled: true, value: 480 })
    setMinHeight({ enabled: false, value: 120 })
    setMaxHeight({ enabled: false, value: 240 })
    setUseClamp(false)
    setClampMin(220)
    setClampPreferred(320)
    setClampMax(520)
    setParentWidth(520)
  }

  const widthRule = useMemo(() => {
    if (useClamp) {
      return `clamp(${formatUnit(clampMin, unit)}, ${formatUnit(clampPreferred, unit)}, ${formatUnit(clampMax, unit)})`
    }
    return formatUnit(widthBase, unit)
  }, [clampMax, clampMin, clampPreferred, unit, useClamp, widthBase])

  const heightRule = useMemo(() => formatUnit(heightBase, unit), [heightBase, unit])

  const cssRules = useMemo(() => {
    const rules = [`width: ${widthRule};`, `height: ${heightRule};`]

    if (!useClamp && minWidth.enabled) {
      rules.push(`min-width: ${formatUnit(minWidth.value, unit)};`)
    }
    if (!useClamp && maxWidth.enabled) {
      rules.push(`max-width: ${formatUnit(maxWidth.value, unit)};`)
    }
    if (minHeight.enabled) {
      rules.push(`min-height: ${formatUnit(minHeight.value, unit)};`)
    }
    if (maxHeight.enabled) {
      rules.push(`max-height: ${formatUnit(maxHeight.value, unit)};`)
    }

    return rules.join('\n')
  }, [
    heightRule,
    maxHeight.enabled,
    maxHeight.value,
    maxWidth.enabled,
    maxWidth.value,
    minHeight.enabled,
    minHeight.value,
    minWidth.enabled,
    minWidth.value,
    unit,
    useClamp,
    widthRule,
  ])

  const intentBadge = useMemo(() => {
    if (useClamp) {
      return `width: clamp(${formatUnit(clampMin, unit)}, ${formatUnit(
        clampPreferred,
        unit,
      )}, ${formatUnit(clampMax, unit)})`
    }

    const parts = [`width: ${formatUnit(widthBase, unit)}`]
    if (minWidth.enabled) {
      parts.push(`min: ${formatUnit(minWidth.value, unit)}`)
    }
    if (maxWidth.enabled) {
      parts.push(`max: ${formatUnit(maxWidth.value, unit)}`)
    }
    return parts.join(' | ')
  }, [
    clampMax,
    clampMin,
    clampPreferred,
    maxWidth.enabled,
    maxWidth.value,
    minWidth.enabled,
    minWidth.value,
    unit,
    useClamp,
    widthBase,
  ])

  const cardStyle = {
    width: widthRule,
    height: heightRule,
    minWidth: !useClamp && minWidth.enabled ? formatUnit(minWidth.value, unit) : undefined,
    maxWidth: !useClamp && maxWidth.enabled ? formatUnit(maxWidth.value, unit) : undefined,
    minHeight: minHeight.enabled ? formatUnit(minHeight.value, unit) : undefined,
    maxHeight: maxHeight.enabled ? formatUnit(maxHeight.value, unit) : undefined,
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
          <Field label="Unit">
            <Select value={unit} onChange={(event) => setUnit(event.target.value as Unit)}>
              {unitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={`Base width: ${formatUnit(widthBase, unit)}`}>
            <Slider
              min={10}
              max={unit === '%' ? 100 : 600}
              value={widthBase}
              onChange={(event) => setWidthBase(Number(event.target.value))}
            />
          </Field>
          <Field label="min-width">
            <div className="flex items-center gap-3">
              <Toggle
                pressed={minWidth.enabled}
                label={minWidth.enabled ? 'On' : 'Off'}
                onChange={(value) => setMinWidth({ ...minWidth, enabled: value })}
              />
              <Slider
                min={10}
                max={unit === '%' ? 100 : 600}
                value={minWidth.value}
                onChange={(event) =>
                  setMinWidth({ ...minWidth, value: Number(event.target.value) })
                }
              />
            </div>
          </Field>
          <Field label="max-width">
            <div className="flex items-center gap-3">
              <Toggle
                pressed={maxWidth.enabled}
                label={maxWidth.enabled ? 'On' : 'Off'}
                onChange={(value) => setMaxWidth({ ...maxWidth, enabled: value })}
              />
              <Slider
                min={10}
                max={unit === '%' ? 100 : 600}
                value={maxWidth.value}
                onChange={(event) =>
                  setMaxWidth({ ...maxWidth, value: Number(event.target.value) })
                }
              />
            </div>
          </Field>
          <Field label={`Base height: ${formatUnit(heightBase, unit)}`}>
            <Slider
              min={10}
              max={unit === '%' ? 100 : 360}
              value={heightBase}
              onChange={(event) => setHeightBase(Number(event.target.value))}
            />
          </Field>
          <Field label="min-height">
            <div className="flex items-center gap-3">
              <Toggle
                pressed={minHeight.enabled}
                label={minHeight.enabled ? 'On' : 'Off'}
                onChange={(value) => setMinHeight({ ...minHeight, enabled: value })}
              />
              <Slider
                min={10}
                max={unit === '%' ? 100 : 360}
                value={minHeight.value}
                onChange={(event) =>
                  setMinHeight({ ...minHeight, value: Number(event.target.value) })
                }
              />
            </div>
          </Field>
          <Field label="max-height">
            <div className="flex items-center gap-3">
              <Toggle
                pressed={maxHeight.enabled}
                label={maxHeight.enabled ? 'On' : 'Off'}
                onChange={(value) => setMaxHeight({ ...maxHeight, enabled: value })}
              />
              <Slider
                min={10}
                max={unit === '%' ? 100 : 360}
                value={maxHeight.value}
                onChange={(event) =>
                  setMaxHeight({ ...maxHeight, value: Number(event.target.value) })
                }
              />
            </div>
          </Field>
          <Field label="Use clamp() for width">
            <Toggle pressed={useClamp} label={useClamp ? 'Clamp on' : 'Clamp off'} onChange={setUseClamp} />
          </Field>
          {useClamp && (
            <>
              <Field label={`Clamp min: ${formatUnit(clampMin, unit)}`}>
                <Slider
                  min={10}
                  max={unit === '%' ? 100 : 600}
                  value={clampMin}
                  onChange={(event) => setClampMin(Number(event.target.value))}
                />
              </Field>
              <Field label={`Clamp preferred: ${formatUnit(clampPreferred, unit)}`}>
                <Slider
                  min={10}
                  max={unit === '%' ? 100 : 600}
                  value={clampPreferred}
                  onChange={(event) => setClampPreferred(Number(event.target.value))}
                />
              </Field>
              <Field label={`Clamp max: ${formatUnit(clampMax, unit)}`}>
                <Slider
                  min={10}
                  max={unit === '%' ? 100 : 600}
                  value={clampMax}
                  onChange={(event) => setClampMax(Number(event.target.value))}
                />
              </Field>
            </>
          )}
        </div>
      </Panel>

      <Panel title="Live Stage" className="min-h-75">
        <p className="mb-2 text-xs text-slate-500">
          This area simulates how elements behave in a real webpage.
        </p>
        <div
          className={cn(
            'relative min-h-60 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600',
            showGuides && 'stage-guides',
          )}
        >
          <div className="mb-3 text-xs text-slate-500">
            Parent width: {parentWidth}px
          </div>
          <Slider
            min={260}
            max={720}
            value={parentWidth}
            onChange={(event) => setParentWidth(Number(event.target.value))}
          />
          <div
            className="mt-4 flex items-start justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4"
            style={{ width: `${parentWidth}px` }}
          >
            <div
              className="relative rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm"
              style={cardStyle}
            >
              <div className="absolute -top-3 right-3 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-500">
                {intentBadge}
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Sizing demo card
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Resize the parent or adjust min/max to see how the card responds.
              </p>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Notes" className="bg-slate-50/70">
        <div className="space-y-3 text-sm text-slate-600">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">CSS snippet</p>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <code>{cssRules}</code>
            </pre>
          </div>
          <ul className="list-disc space-y-2 pl-5">
            <li>min prevents shrinking too far.</li>
            <li>max prevents growing too large.</li>
            <li>clamp lets you set a preferred size within bounds.</li>
            <li>% is relative to the parent width or height.</li>
            <li>rem scales with the root font-size.</li>
          </ul>
        </div>
      </Panel>
    </div>
  )
}
