import { AnimatePresence, motion } from 'framer-motion'
import type { Lens } from '../types'
import { daysBetween, daysLabel, formatDate } from '../lib/lens'
import { LensCard } from '../components/LensCard'
import { EmptyState } from '../components/EmptyState'
import { HistoryIcon, LensIcon, PlusIcon, RestoreIcon, TrashIcon } from '../components/icons'

interface Props {
  active: Lens[]
  archived: Lens[]
  onAdd: () => void
  onEdit: (lens: Lens) => void
  onReplace: (lens: Lens) => void
  onDelete: (lens: Lens) => void
  onRestore: (id: string) => void
}

export function Lenses({ active, archived, onAdd, onEdit, onReplace, onDelete, onRestore }: Props) {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Активные</h2>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            <PlusIcon className="h-4 w-4" />
            Добавить
          </button>
        </div>

        {active.length === 0 ? (
          <EmptyState
            icon={<LensIcon className="h-7 w-7" />}
            title="Нет активных линз"
            description="Нажмите «Добавить», чтобы завести новую пару."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence initial={false}>
              {active.map((lens, i) => (
                <LensCard key={lens.id} lens={lens} index={i} onEdit={onEdit} onReplace={onReplace} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Архив</h2>
          <span className="text-xs text-zinc-500">{archived.length} пар</span>
        </div>

        {archived.length === 0 ? (
          <EmptyState
            icon={<HistoryIcon className="h-7 w-7" />}
            title="Архив пуст"
            description="Завершённые пары появятся здесь."
          />
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {archived.map((lens, i) => {
                const worn = Math.max(0, daysBetween(lens.openedAt, lens.archivedAt ?? ''))
                return (
                  <motion.div
                    key={lens.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: lens.color }} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-zinc-100">{lens.name}</div>
                      <div className="text-xs text-zinc-500">
                        {formatDate(lens.openedAt)} → {lens.archivedAt ? formatDate(lens.archivedAt) : '—'} ·{' '}
                        {worn} {daysLabel(worn)}
                      </div>
                    </div>
                    <button
                      onClick={() => onRestore(lens.id)}
                      title="Вернуть в активные"
                      className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-cyan-300"
                    >
                      <RestoreIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(lens)}
                      title="Удалить"
                      className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  )
}
