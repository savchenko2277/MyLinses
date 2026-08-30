import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AnimatedNumber } from './AnimatedNumber'

interface Props {
  label: string
  value: number
  suffix?: string
  icon: ReactNode
  accent?: string
  decimals?: number
  index?: number
}

export function StatCard({ label, value, suffix, icon, accent = '#22d3ee', decimals = 0, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 120, damping: 16 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">{label}</span>
        <span
          className="grid h-9 w-9 place-items-center rounded-xl"
          style={{ background: `${accent}1f`, color: accent }}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-white">
          <AnimatedNumber value={value} decimals={decimals} />
        </span>
        {suffix && <span className="text-sm text-zinc-400">{suffix}</span>}
      </div>
    </motion.div>
  )
}
