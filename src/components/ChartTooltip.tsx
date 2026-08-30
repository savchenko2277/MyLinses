interface Entry {
  name?: string
  value?: number
  color?: string
  fill?: string
}

interface Props {
  active?: boolean
  payload?: Entry[]
  label?: string
}

export function ChartTooltip({ active, payload, label }: Props) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/95 px-3 py-2 shadow-xl backdrop-blur">
      {label && <p className="mb-1 text-xs font-medium text-zinc-400">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2 text-sm text-zinc-200">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: entry.color ?? entry.fill ?? '#22d3ee' }}
          />
          {entry.name && <span>{entry.name}:</span>}
          <span className="font-semibold text-white">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}
