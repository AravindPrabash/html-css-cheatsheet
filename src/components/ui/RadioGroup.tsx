import { cn } from '../../lib/classNames'

type RadioOption = {
  label: string
  value: string
  hint?: string
}

type RadioGroupProps = {
  name: string
  value: string
  options: RadioOption[]
  onChange: (value: string) => void
}

export function RadioGroup({ name, value, options, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex cursor-pointer items-start gap-2 rounded-md border px-3 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-slate-200',
            value === option.value
              ? 'border-slate-800 bg-slate-900 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
          )}
        >
          <input
            type="radio"
            className="mt-1"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>
            <span className="font-medium">{option.label}</span>
            {option.hint && (
              <span className="mt-1 block text-xs text-slate-400">{option.hint}</span>
            )}
          </span>
        </label>
      ))}
    </div>
  )
}
