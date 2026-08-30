import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Lens } from '../types'
import { daysBetween, daysLabel, formatDate } from '../lib/lens'
import { EmptyState } from '../components/EmptyState'
import { HistoryIcon, RestoreIcon, TrashIcon } from '../components/icons'

interface Props {
  archived: Lens[]
  onRestore: (id: string) => void
  onDelete: (lens: Lens) => void
  onReset: () => void
  onClear: () => void
}

export function History({ archived, onRestore, onDelete, onReset, onClear }: Props) {
  const [confirmClear, setConfirmClear] = useState(false)

  if (archived.length === 0) {
    return (
      <EmptyState
        icon={<HistoryIcon className="h-7 w-7" />}
        title="История пуста"
        description="Когда вы завершите ношение пары линз, она появится здесь со сроками."
        action={
          <button
            onClick={onReset}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            Загрузить демо-данные
          </button>
        }
      />
    )
  }

  const handleClear = () => {
    if (confirmClear) {
      onClear()
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative space-y-4">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-white/5" />
        <AnimatePresence initial={false}>
          {archived.map((lens, i) => {
            const worn = Math.max(0, daysBetween(lens.openedAt, lens.archivedAt ?? ''))
            return (
              <motion.div
                key={lens.id}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ delay: Math.min(i * 0.04, 0.4), type: 'spring', stiffness: 120, damping: 18 }}
                className="relative flex gap-4 pl-10"
              >
                <span className="absolute left-[9px] top-1.5">
                  <span className="block h-3.5 w-3.5 rounded-full ring-4 ring-zinc-950" style={{ background: lens.color }} />
                </span>
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-zinc-100">{lens.name}</div>
                    <div className="text-xs text-zinc-500">
                      {formatDate(lens.openedAt)} → {lens.archivedAt ? formatDate(lens.archivedAt) : '—'}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-200">
                    {worn} {daysLabel(worn)}
                  </span>
                  <button
                    onClick={() => onRestore(lens.id)}
                    title="Вернуть"
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
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/5 pt-5">
        <button
          onClick={onReset}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10"
        >
          Загрузить демо-данные
        </button>
        <button
          onClick={handleClear}
          className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
            confirmClear
              ? 'border-rose-400/30 bg-rose-500/15 text-rose-300'
              : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
          }`}
        >
          {confirmClear ? 'Точно удалить историю?' : 'Очистить историю'}
        </button>
      </div>
    </div>
  )
}
