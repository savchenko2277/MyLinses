export type LensType = 'daily' | 'biweekly' | 'monthly' | 'quarterly' | 'custom'

export interface Lens {
  id: string
  name: string
  type: LensType
  wearPeriodDays: number
  openedAt: string
  note?: string
  color: string
  archived: boolean
  archivedAt?: string
}

export type View = 'dashboard' | 'lenses' | 'history' | 'statistics'
