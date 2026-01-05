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
            'group relative rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20',
            activeTab === tab.id
              ? 'border-indigo-500/10 bg-indigo-50 text-indigo-700 shadow-sm'
              : 'border-transparent bg-transparent text-zinc-500 hover:border-zinc-200 hover:bg-white hover:text-zinc-900',
          )}
        >
          {activeTab === tab.id && (
            <span className="absolute inset-0 -z-10 scale-95 rounded-full bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
