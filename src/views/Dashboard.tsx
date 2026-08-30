import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Lens } from '../types'
import { daysBetween, daysLabel, statusOf } from '../lib/lens'
import { StatCard } from '../components/StatCard'
import { LensCard } from '../components/LensCard'
import { EmptyState } from '../components/EmptyState'
import { AlertIcon, CalendarIcon, HistoryIcon, LensIcon, PlusIcon } from '../components/icons'

interface Props {
  active: Lens[]
  archived: Lens[]
  onAdd: () => void
  onEdit: (lens: Lens) => void
  onReplace: (lens: Lens) => void
}

export function Dashboard({ active, archived, onAdd, onEdit, onReplace }: Props) {
  const overdue = useMemo(() => active.filter((l) => statusOf(l) === 'overdue').length, [active])

  const avgDays = useMemo(() => {
    if (!archived.length) return 0
    const total = archived.reduce(
      (s, l) => s + Math.max(0, daysBetween(l.openedAt, l.archivedAt ?? '')),
      0,
    )
    return Math.round((total / archived.length) * 10) / 10
  }, [archived])

  const recent = archived.slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard index={0} label="Активные пары" value={active.length} suffix="шт." icon={<LensIcon />} accent="#22d3ee" />
        <StatCard index={1} label="Требуют замены" value={overdue} suffix="шт." icon={<AlertIcon />} accent={overdue ? '#fb7185' : '#34d399'} />
        <StatCard index={2} label="Всего замен" value={archived.length} suffix="раз" icon={<HistoryIcon />} accent="#a78bfa" />
        <StatCard index={3} label="Средний срок" value={avgDays} suffix={daysLabel(avgDays)} decimals={1} icon={<CalendarIcon />} accent="#fbbf24" />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Текущие линзы</h2>
          <span className="text-xs text-zinc-500">{active.length} активных</span>
        </div>

        {active.length === 0 ? (
          <EmptyState
            icon={<LensIcon className="h-7 w-7" />}
            title="Нет активных линз"
            description="Добавьте новую пару, чтобы начать отслеживать срок её ношения."
            action={
              <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                <PlusIcon className="h-4 w-4" />
                Добавить линзы
              </button>
            }
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

      {recent.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Последние замены</h2>
          <div className="space-y-2">
            {recent.map((lens, i) => {
              const worn = Math.max(0, daysBetween(lens.openedAt, lens.archivedAt ?? ''))
              return (
                <motion.div
                  key={lens.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: lens.color }} />
                  <span className="flex-1 truncate text-sm text-zinc-200">{lens.name}</span>
                  <span className="text-xs text-zinc-500">
                    {worn} {daysLabel(worn)}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
