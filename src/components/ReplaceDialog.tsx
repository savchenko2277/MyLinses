import type { Lens } from '../types'
import { daysBetween, daysLabel, daysRemaining, formatDate } from '../lib/lens'
import { Modal } from './Modal'

interface Props {
  lens: Lens | null
  onClose: () => void
  onReplace: (id: string, startNew: boolean) => void
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium text-zinc-100">{value}</span>
    </div>
  )
}

export function ReplaceDialog({ lens, onClose, onReplace }: Props) {
  const open = !!lens
  const now = new Date().toISOString()

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      {lens && (
        <div>
          <h2 className="text-lg font-semibold text-white">Завершить ношение?</h2>
          <p className="mt-1 text-sm text-zinc-400">Пара будет перемещена в архив.</p>

          <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
            <Row label="Название" value={lens.name} />
            <Row label="Открыты" value={formatDate(lens.openedAt)} />
            <Row
              label="Дней носки"
              value={`${daysBetween(lens.openedAt, now)} ${daysLabel(daysBetween(lens.openedAt, now))}`}
            />
            <Row label="Срок" value={`${lens.wearPeriodDays} ${daysLabel(lens.wearPeriodDays)}`} />
            {daysRemaining(lens) < 0 && (
              <p className="text-xs text-rose-300">
                Просрочено на {Math.abs(daysRemaining(lens))} {daysLabel(Math.abs(daysRemaining(lens)))}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => onReplace(lens.id, false)}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
            >
              Просто завершить
            </button>
            <button
              onClick={() => onReplace(lens.id, true)}
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
            >
              Завершить и открыть новые
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
