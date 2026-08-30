import type { Lens, LensType } from '../types'

export interface LensPreset {
  type: LensType
  label: string
  days: number
  emoji: string
}

export const LENS_PRESETS: LensPreset[] = [
  { type: 'daily', label: 'Однодневные', days: 1, emoji: '☀️' },
  { type: 'biweekly', label: 'Двухнедельные', days: 14, emoji: '🌗' },
  { type: 'monthly', label: 'Месячные', days: 30, emoji: '🌙' },
  { type: 'quarterly', label: 'Квартальные', days: 90, emoji: '🗓️' },
  { type: 'custom', label: 'Свой срок', days: 30, emoji: '⚙️' },
]

export const PALETTE = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#fb7185']

const MS_PER_DAY = 86_400_000

export function startOfDay(input: string | Date): Date {
  const d = new Date(input)
  d.setHours(0, 0, 0, 0)
  return d
}

export function daysBetween(from: string, to: string | Date): number {
  const a = startOfDay(from)
  const b = startOfDay(to)
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY)
}

export function daysSince(iso: string): number {
  return Math.max(0, daysBetween(iso, new Date()))
}

export function daysRemaining(lens: Lens): number {
  return lens.wearPeriodDays - daysSince(lens.openedAt)
}

export function progressOf(lens: Lens): number {
  const p = daysSince(lens.openedAt) / lens.wearPeriodDays
  return Math.min(1, Math.max(0, p))
}

export type LensStatus = 'ok' | 'warning' | 'overdue'

export function statusOf(lens: Lens): LensStatus {
  const left = daysRemaining(lens)
  if (left < 0) return 'overdue'
  if (lens.wearPeriodDays > 2 && left <= 3) return 'warning'
  return 'ok'
}

export function plural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(Math.round(n))
  const mod10 = abs % 10
  const mod100 = abs % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export function daysLabel(n: number): string {
  return plural(n, 'день', 'дня', 'дней')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function monthKey(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function monthLabel(key: string): string {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('ru-RU', { month: 'short', year: '2-digit' })
}

export function isoFromInput(value: string): string {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0).toISOString()
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
