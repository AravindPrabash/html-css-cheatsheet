import { cn } from '../../lib/classNames'

type Tab = {
  id: string
  label: string
}

type TabsProps = {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-t-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300',
            activeTab === tab.id
              ? 'border-slate-200 border-b-white bg-white text-slate-900 shadow-sm -mb-px'
              : 'border-transparent bg-transparent text-slate-500 hover:border-slate-200 hover:bg-white/70 hover:text-slate-800',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
