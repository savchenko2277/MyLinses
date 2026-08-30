import type { Lens } from '../types'
import { uid } from './lens'

const STORAGE_KEY = 'mylinses.lenses.v1'

function daysAgo(n: number): string {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export function createSeed(): Lens[] {
  return [
    {
      id: uid(),
      name: 'Acuvue Oasys',
      type: 'monthly',
      wearPeriodDays: 30,
      openedAt: daysAgo(12),
      note: 'Правая −2.50, левая −2.75',
      color: '#22d3ee',
      archived: false,
    },
    {
      id: uid(),
      name: 'Biofinity Toric',
      type: 'biweekly',
      wearPeriodDays: 14,
      openedAt: daysAgo(13),
      note: 'Торические, cyl −1.75',
      color: '#fbbf24',
      archived: false,
    },
    { id: uid(), name: 'Biofinity Toric', type: 'biweekly', wearPeriodDays: 14, openedAt: daysAgo(20), archivedAt: daysAgo(6), color: '#fbbf24', archived: true },
    { id: uid(), name: 'PureVision 2', type: 'monthly', wearPeriodDays: 30, openedAt: daysAgo(45), archivedAt: daysAgo(16), color: '#a78bfa', archived: true },
    { id: uid(), name: 'Acuvue Oasys', type: 'monthly', wearPeriodDays: 30, openedAt: daysAgo(60), archivedAt: daysAgo(31), color: '#22d3ee', archived: true },
    { id: uid(), name: 'Air Optix Aqua', type: 'monthly', wearPeriodDays: 30, openedAt: daysAgo(92), archivedAt: daysAgo(64), color: '#34d399', archived: true },
    { id: uid(), name: 'Biofinity', type: 'biweekly', wearPeriodDays: 14, openedAt: daysAgo(35), archivedAt: daysAgo(21), color: '#60a5fa', archived: true },
    { id: uid(), name: 'Acuvue Vita', type: 'monthly', wearPeriodDays: 30, openedAt: daysAgo(100), archivedAt: daysAgo(71), color: '#f472b6', archived: true },
    { id: uid(), name: 'Acuvue Oasys', type: 'monthly', wearPeriodDays: 30, openedAt: daysAgo(121), archivedAt: daysAgo(92), color: '#22d3ee', archived: true },
    { id: uid(), name: 'Air Optix Aqua', type: 'monthly', wearPeriodDays: 30, openedAt: daysAgo(150), archivedAt: daysAgo(121), color: '#34d399', archived: true },
  ]
}

export function loadLenses(): Lens[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createSeed()
    const parsed = JSON.parse(raw) as Lens[]
    if (!Array.isArray(parsed)) return createSeed()
    return parsed
  } catch {
    return createSeed()
  }
}

export function saveLenses(lenses: Lens[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lenses))
  } catch {
    // хранилище недоступно — игнорируем
  }
}
