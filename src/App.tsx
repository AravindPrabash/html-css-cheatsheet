import { useMemo, useState } from 'react'
import { Tabs } from './components/ui/Tabs'
import { Toggle } from './components/ui/Toggle'
import { BoxModelPlayground } from './modules/BoxModelPlayground'
import { DisplayPlayground } from './modules/DisplayPlayground'
import { FlexboxPlayground } from './modules/FlexboxPlayground'
import { PositionPlayground } from './modules/PositionPlayground'
import { PseudoClassesPlayground } from './modules/PseudoClassesPlayground'
import { PseudoElementsPlayground } from './modules/PseudoElementsPlayground'
import { QuickNotes } from './modules/QuickNotes'
import { SelectorsPlayground } from './modules/SelectorsPlayground'
import { OverflowPlayground } from './modules/OverflowPlayground'

function App() {
  const tabs = useMemo(
    () => [
      { id: 'display', label: 'Display' },
      { id: 'selectors', label: 'Selectors' },
      { id: 'pseudo-classes', label: 'Pseudo Classes' },
      { id: 'pseudo-elements', label: 'Pseudo Elements' },
      { id: 'position', label: 'Position' },
      { id: 'box-model', label: 'Box Model' },
      { id: 'overflow', label: 'Overflow' },
      { id: 'flexbox', label: 'Flexbox' },
      { id: 'quick-notes', label: 'Quick Notes' },
    ],
    [],
  )

  const [activeTab, setActiveTab] = useState('display')
  const [showGuides, setShowGuides] = useState(true)

  const content = useMemo(() => {
    switch (activeTab) {
      case 'display':
        return <DisplayPlayground showGuides={showGuides} />
      case 'selectors':
        return <SelectorsPlayground showGuides={showGuides} />
      case 'pseudo-classes':
        return <PseudoClassesPlayground showGuides={showGuides} />
      case 'pseudo-elements':
        return <PseudoElementsPlayground showGuides={showGuides} />
      case 'overflow':
        return <OverflowPlayground showGuides={showGuides} />
      case 'box-model':
        return <BoxModelPlayground showGuides={showGuides} />
      case 'position':
        return <PositionPlayground showGuides={showGuides} />
      case 'flexbox':
        return <FlexboxPlayground showGuides={showGuides} />
      case 'quick-notes':
        return <QuickNotes />
      default:
        return null
    }
  }, [activeTab, showGuides])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              HTML/CSS Cheatsheet
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              Visual recall for core layout rules
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Tweak the controls, watch the live stage, then reset when you want a
              clean slate.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Guides</span>
            <Toggle
              pressed={showGuides}
              label={showGuides ? 'On' : 'Off'}
              onChange={setShowGuides}
            />
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
          <div className="rounded-t-2xl border-b border-slate-200 bg-slate-100/70 px-4 pt-3">
            <p className="mt-1 pb-4 text-sm text-slate-500">
              Learn core CSS concepts through interactive examples.
            </p>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="p-4">{content}</div>
        </section>
      </div>
    </div>
  )
}

export default App
