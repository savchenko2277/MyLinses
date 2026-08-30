import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Lens } from '../types'
import { createSeed, loadLenses, saveLenses } from '../lib/storage'
import { uid } from '../lib/lens'

export type NewLens = Omit<Lens, 'id' | 'archived' | 'archivedAt'>

export function useLenses() {
  const [lenses, setLenses] = useState<Lens[]>(() => loadLenses())

  useEffect(() => {
    saveLenses(lenses)
  }, [lenses])

  const activeLenses = useMemo(
    () => lenses.filter((l) => !l.archived).sort((a, b) => a.openedAt.localeCompare(b.openedAt)),
    [lenses],
  )

  const archivedLenses = useMemo(
    () =>
      lenses
        .filter((l) => l.archived)
        .sort((a, b) => (b.archivedAt ?? '').localeCompare(a.archivedAt ?? '')),
    [lenses],
  )

  const addLens = useCallback((data: NewLens) => {
    setLenses((prev) => [...prev, { ...data, id: uid(), archived: false }])
  }, [])

  const updateLens = useCallback((id: string, patch: Partial<Lens>) => {
    setLenses((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }, [])

  const replaceLens = useCallback((id: string, startNew = false) => {
    setLenses((prev) => {
      const target = prev.find((l) => l.id === id)
      if (!target) return prev
      const archived: Lens = { ...target, archived: true, archivedAt: new Date().toISOString() }
      const next = prev.map((l) => (l.id === id ? archived : l))
      if (startNew) {
        next.push({
          ...target,
          id: uid(),
          openedAt: new Date().toISOString(),
          archived: false,
          archivedAt: undefined,
        })
      }
      return next
    })
  }, [])

  const restoreLens = useCallback((id: string) => {
    setLenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, archived: false, archivedAt: undefined } : l)),
    )
  }, [])

  const deleteLens = useCallback((id: string) => {
    setLenses((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const resetToDemo = useCallback(() => {
    setLenses(createSeed())
  }, [])

  const clearArchived = useCallback(() => {
    setLenses((prev) => prev.filter((l) => !l.archived))
  }, [])

  return {
    lenses,
    activeLenses,
    archivedLenses,
    addLens,
    updateLens,
    replaceLens,
    restoreLens,
    deleteLens,
    resetToDemo,
    clearArchived,
  }
}
