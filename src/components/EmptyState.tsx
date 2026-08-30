import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-zinc-400">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-400">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
