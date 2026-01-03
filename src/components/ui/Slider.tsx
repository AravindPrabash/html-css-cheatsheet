import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/classNames'

type SliderProps = InputHTMLAttributes<HTMLInputElement>

export function Slider({ className, ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={cn(
        'h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300',
        className,
      )}
      {...props}
    />
  )
}
