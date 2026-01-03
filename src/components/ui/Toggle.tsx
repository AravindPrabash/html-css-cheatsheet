import { cn } from '../../lib/classNames'

type ToggleProps = {
  pressed: boolean
  label: string
  onChange: (value: boolean) => void
}

export function Toggle({ pressed, label, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!pressed)}
      aria-pressed={pressed}
      className={cn(
        'inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors',
        pressed
          ? 'border-slate-800 bg-slate-900 text-white'
          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
      )}
    >
      <span
        className={cn(
          'h-2.5 w-2.5 rounded-full',
          pressed ? 'bg-white' : 'bg-slate-300',
        )}
      />
      {label}
    </button>
  )
}
