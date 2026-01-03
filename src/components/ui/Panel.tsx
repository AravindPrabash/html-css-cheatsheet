import type { ReactNode } from 'react'
import { cn } from '../../lib/classNames'

type PanelProps = {
  title?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export function Panel({ title, action, className, children }: PanelProps) {
  return (
    <section
      className={cn(
        'rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm',
        className,
      )}
    >
      {(title || action) && (
        <header className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
