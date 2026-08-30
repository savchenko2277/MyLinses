import { useId } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  value: number
  size?: number
  stroke?: number
  color?: string
  children?: ReactNode
}

export function ProgressRing({ value, size = 96, stroke = 8, color = '#22d3ee', children }: Props) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(1, Math.max(0, value))

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity={0.45} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped) }}
          transition={{ type: 'spring', stiffness: 55, damping: 18, delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
