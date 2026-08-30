import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Lens } from '../types'
import { LENS_PRESETS, daysBetween, monthKey, monthLabel } from '../lib/lens'
import { ChartTooltip } from '../components/ChartTooltip'
import { EmptyState } from '../components/EmptyState'
import { ChartIcon } from '../components/icons'

const TYPE_COLORS: Record<string, string> = {
  'Однодневные': '#22d3ee',
  'Двухнедельные': '#60a5fa',
  'Месячные': '#a78bfa',
  'Квартальные': '#fbbf24',
  'Свой срок': '#f472b6',
}

interface Props {
  archived: Lens[]
}

function ChartCard({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className={`rounded-2xl border border-white/10 bg-white/[0.02] p-5 ${className}`}
    >
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </motion.div>
  )
}

export function Statistics({ archived }: Props) {
  const wearData = useMemo(
    () =>
      archived
        .slice(0, 8)
        .map((l) => ({
          name: l.name,
          days: Math.max(0, daysBetween(l.openedAt, l.archivedAt ?? '')),
          color: l.color,
        }))
        .reverse(),
    [archived],
  )

  const monthData = useMemo(() => {
    const counts = new Map<string, number>()
    archived.forEach((l) => {
      if (l.archivedAt) {
        const k = monthKey(l.archivedAt)
        counts.set(k, (counts.get(k) ?? 0) + 1)
      }
    })
    const keys = [...counts.keys()].sort()
    let cum = 0
    return keys.map((k) => {
      cum += counts.get(k) ?? 0
      return { month: monthLabel(k), count: counts.get(k) ?? 0, total: cum }
    })
  }, [archived])

  const typeData = useMemo(() => {
    const counts = new Map<string, number>()
    archived.forEach((l) => {
      const label = LENS_PRESETS.find((p) => p.type === l.type)?.label ?? 'Свой срок'
      counts.set(label, (counts.get(label) ?? 0) + 1)
    })
    return [...counts.entries()].map(([name, value]) => ({
      name,
      value,
      color: TYPE_COLORS[name] ?? '#22d3ee',
    }))
  }, [archived])

  if (archived.length === 0) {
    return (
      <EmptyState
        icon={<ChartIcon className="h-7 w-7" />}
        title="Нет данных для статистики"
        description="Завершите хотя бы одну пару линз, чтобы увидеть графики."
      />
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Замены по месяцам" subtitle="Накопительно и за месяц" className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthData} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="total" name="Всего" stroke="#22d3ee" strokeWidth={2.5} fill="url(#gradTotal)" />
            <Area
              type="monotone"
              dataKey="count"
              name="За месяц"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="none"
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Срок носки по парам" subtitle="Дней фактического ношения">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={wearData} layout="vertical" margin={{ top: 0, right: 12, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
            <XAxis type="number" allowDecimals={false} tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={110} tick={{ fill: '#d4d4d8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="days" name="Дней" radius={[0, 8, 8, 0]} barSize={18}>
              {wearData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Типы линз" subtitle="Распределение по архиву">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={typeData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3} strokeWidth={0}>
              {typeData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {typeData.map((t) => (
            <span key={t.name} className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
              {t.name} · {t.value}
            </span>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
