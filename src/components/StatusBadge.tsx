import type { LensStatus } from '../lib/lens'

const MAP: Record<LensStatus, { label: string; dot: string; className: string }> = {
  ok: {
    label: 'В норме',
    dot: 'bg-emerald-400',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
  },
  warning: {
    label: 'Скоро замена',
    dot: 'bg-amber-400',
    className: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
  },
  overdue: {
    label: 'Просрочено',
    dot: 'bg-rose-400',
    className: 'bg-rose-500/15 text-rose-300 border-rose-400/20',
  },
}

export function StatusBadge({ status }: { status: LensStatus }) {
  const { label, dot, className } = MAP[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
