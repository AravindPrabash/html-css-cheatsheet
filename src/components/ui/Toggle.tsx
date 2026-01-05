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
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20',
        pressed
          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
          : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-white',
      )}
    >
      <span
        className={cn(
          'h-2.5 w-2.5 rounded-full transition-colors duration-200',
          pressed ? 'bg-white shadow-sm' : 'bg-zinc-400',
        )}
      />
      {label}
    </button>
  )
}
