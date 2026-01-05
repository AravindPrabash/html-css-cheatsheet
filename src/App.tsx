import { useMemo, useState } from 'react'
import { Tabs } from './components/ui/Tabs'
import { Toggle } from './components/ui/Toggle'
import { BoxModelPlayground } from './modules/BoxModelPlayground'
import { CssDebuggerPlayground } from './modules/CssDebuggerPlayground'
import { DisplayPlayground } from './modules/DisplayPlayground'
import { FlexboxPlayground } from './modules/FlexboxPlayground'
import { PositionPlayground } from './modules/PositionPlayground'
import { PseudoClassesPlayground } from './modules/PseudoClassesPlayground'
import { PseudoElementsPlayground } from './modules/PseudoElementsPlayground'
import { QuickNotes } from './modules/QuickNotes'
import { SelectorsPlayground } from './modules/SelectorsPlayground'
import { OverflowPlayground } from './modules/OverflowPlayground'
import { SizingPlayground } from './modules/SizingPlayground'

function App() {
  const tabs = useMemo(
    () => [
      { id: 'display', label: 'Display' },
      { id: 'box-model', label: 'Box Model' },
      { id: 'sizing', label: 'Sizing' },
      { id: 'position', label: 'Position' },
      { id: 'overflow', label: 'Overflow' },
      { id: 'selectors', label: 'Selectors' },
      { id: 'pseudo-classes', label: 'Pseudo Classes' },
      { id: 'pseudo-elements', label: 'Pseudo Elements' },
      { id: 'debugger', label: 'CSS Debugger' },
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
      case 'debugger':
        return <CssDebuggerPlayground showGuides={showGuides} />
      case 'overflow':
        return <OverflowPlayground showGuides={showGuides} />
      case 'sizing':
        return <SizingPlayground showGuides={showGuides} />
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
    <div className="min-h-screen bg-transparent text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <header className="glass-panel animate-fade-in flex flex-col gap-6 rounded-3xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                HTML/CSS Cheatsheet
              </p>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
              Visual recall for <span className="text-indigo-600">layout rules</span>
            </h1>
            <p className="mt-3 max-w-xl text-zinc-500 md:text-lg">
              Interact with the controls, watch the live stage, and verify your understanding of core CSS concepts.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-zinc-50/50 p-2 ring-1 ring-zinc-200/50">
            <span className="pl-2 text-sm font-medium text-zinc-500">Guides</span>
            <Toggle
              pressed={showGuides}
              label={showGuides ? 'On' : 'Off'}
              onChange={setShowGuides}
            />
          </div>
        </header>

        <section className="glass-panel animate-fade-in overflow-hidden rounded-3xl" style={{ animationDelay: '0.1s' }}>
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 pt-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500">
                Interactive Playground
              </p>
            </div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="bg-white/40 p-6 md:p-8">{content}</div>
        </section>

        <footer className="animate-fade-in mt-4 text-center text-sm text-zinc-400" style={{ animationDelay: '0.2s' }}>
          <p>
            Made with <span className="text-indigo-400">♥</span> by{' '}
            <a
              href="https://www.linkedin.com/in/aravindprabash/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-indigo-600 hover:underline"
            >
              Aravind
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
