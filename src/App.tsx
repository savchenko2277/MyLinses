import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Lens, View } from './types'
import { useLenses } from './hooks/useLenses'
import type { LensFormData } from './components/LensFormModal'
import { LensFormModal } from './components/LensFormModal'
import { ReplaceDialog } from './components/ReplaceDialog'
import { ConfirmDialog } from './components/ConfirmDialog'
import { ChartIcon, HistoryIcon, HomeIcon, LensIcon, PlusIcon } from './components/icons'
import { Dashboard } from './views/Dashboard'
import { Lenses } from './views/Lenses'
import { History } from './views/History'
import { Statistics } from './views/Statistics'

const NAV: { id: View; label: string; icon: typeof HomeIcon }[] = [
  { id: 'dashboard', label: 'Главная', icon: HomeIcon },
  { id: 'lenses', label: 'Линзы', icon: LensIcon },
  { id: 'history', label: 'История', icon: HistoryIcon },
  { id: 'statistics', label: 'Статистика', icon: ChartIcon },
]

const TITLES: Record<View, { title: string; subtitle: string }> = {
  dashboard: { title: 'Обзор', subtitle: 'Контроль срока ношения ваших линз' },
  lenses: { title: 'Мои линзы', subtitle: 'Активные и архивные пары' },
  history: { title: 'История', subtitle: 'Все замены и сроки носки' },
  statistics: { title: 'Статистика', subtitle: 'Аналитика по срокам ношения' },
}

export default function App() {
  const {
    activeLenses,
    archivedLenses,
    addLens,
    updateLens,
    replaceLens,
    deleteLens,
    restoreLens,
    resetToDemo,
    clearArchived,
  } = useLenses()

  const [view, setView] = useState<View>('dashboard')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Lens | null>(null)
  const [replaceTarget, setReplaceTarget] = useState<Lens | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Lens | null>(null)

  const openAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (lens: Lens) => {
    setEditing(lens)
    setFormOpen(true)
  }

  const handleSave = (data: LensFormData) => {
    if (editing) updateLens(editing.id, data)
    else addLens(data)
    setFormOpen(false)
    setEditing(null)
  }

  const { title, subtitle } = TITLES[view]

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-fuchsia-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/5 p-5 md:flex">
          <div className="flex items-center gap-2.5 px-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
              <LensIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-white">MyLinses</div>
              <div className="text-[11px] text-zinc-500">трекер линз</div>
            </div>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = view === item.id
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-sm font-semibold text-white">Совет</div>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              Меняйте линзы вовремя, чтобы сохранить здоровье глаз.
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/5 bg-zinc-950/70 px-4 py-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white md:hidden">
                  <LensIcon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h1>
                  <p className="hidden text-xs text-zinc-400 sm:block">{subtitle}</p>
                </div>
              </div>
              <button
                onClick={openAdd}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.03] active:scale-95"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Добавить линзы</span>
                <span className="sm:hidden">Добавить</span>
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {view === 'dashboard' && (
                  <Dashboard
                    active={activeLenses}
                    archived={archivedLenses}
                    onAdd={openAdd}
                    onEdit={openEdit}
                    onReplace={setReplaceTarget}
                  />
                )}
                {view === 'lenses' && (
                  <Lenses
                    active={activeLenses}
                    archived={archivedLenses}
                    onAdd={openAdd}
                    onEdit={openEdit}
                    onReplace={setReplaceTarget}
                    onDelete={setDeleteTarget}
                    onRestore={restoreLens}
                  />
                )}
                {view === 'history' && (
                  <History
                    archived={archivedLenses}
                    onRestore={restoreLens}
                    onDelete={setDeleteTarget}
                    onReset={resetToDemo}
                    onClear={clearArchived}
                  />
                )}
                {view === 'statistics' && <Statistics archived={archivedLenses} />}
              </motion.div>
            </AnimatePresence>
          </main>

          <nav className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl md:hidden">
            {NAV.map((item) => {
              const active = view === item.id
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex flex-col items-center gap-1 py-3 text-[11px] font-medium ${
                    active ? 'text-cyan-300' : 'text-zinc-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      <LensFormModal
        open={formOpen}
        initial={editing}
        onClose={() => {
          setFormOpen(false)
          setEditing(null)
        }}
        onSave={handleSave}
      />
      <ReplaceDialog
        lens={replaceTarget}
        onClose={() => setReplaceTarget(null)}
        onReplace={(id, startNew) => {
          replaceLens(id, startNew)
          setReplaceTarget(null)
        }}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Удалить линзы?"
        message={deleteTarget ? `Пара «${deleteTarget.name}» будет удалена безвозвратно.` : ''}
        confirmLabel="Удалить"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteLens(deleteTarget.id)
          setDeleteTarget(null)
        }}
      />
    </div>
  )
}
