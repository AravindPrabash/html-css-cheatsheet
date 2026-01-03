import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/classNames'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
