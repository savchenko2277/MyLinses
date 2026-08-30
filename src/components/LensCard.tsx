import { motion } from 'framer-motion'
import type { Lens } from '../types'
import { daysLabel, daysRemaining, daysSince, formatDate, progressOf, statusOf } from '../lib/lens'
import { ProgressRing } from './ProgressRing'
import { StatusBadge } from './StatusBadge'
import { PencilIcon, RefreshIcon } from './icons'

interface Props {
  lens: Lens
  index: number
  onEdit: (lens: Lens) => void
  onReplace: (lens: Lens) => void
}

export function LensCard({ lens, index, onEdit, onReplace }: Props) {
  const left = daysRemaining(lens)
  const status = statusOf(lens)
  const used = daysSince(lens.openedAt)
  const ringColor = status === 'overdue' ? '#fb7185' : status === 'warning' ? '#fbbf24' : lens.color

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 120, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: lens.color }}
      />
      <div className="flex items-start gap-4">
        <ProgressRing value={progressOf(lens)} color={ringColor} size={88} stroke={7}>
          <div className="text-center">
            <div className="text-xl font-bold text-white">{left < 0 ? '0' : left}</div>
            <div className="text-[10px] uppercase tracking-wide text-zinc-500">осталось</div>
          </div>
        </ProgressRing>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-white">{lens.name}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Открыты {formatDate(lens.openedAt)} · {used} {daysLabel(used)} носки
          </p>
          {lens.note && <p className="mt-1 truncate text-xs text-zinc-500">{lens.note}</p>}

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onReplace(lens)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <RefreshIcon className="h-3.5 w-3.5" />
              Заменить
            </button>
            <button
              onClick={() => onEdit(lens)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              title="Изменить"
            >
              <PencilIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
