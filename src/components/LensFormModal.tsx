import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import type { Lens, LensType } from '../types'
import { LENS_PRESETS, PALETTE, isoFromInput } from '../lib/lens'
import { Modal } from './Modal'
import { XIcon } from './icons'

export interface LensFormData {
  name: string
  type: LensType
  wearPeriodDays: number
  openedAt: string
  note?: string
  color: string
}

interface Props {
  open: boolean
  initial: Lens | null
  onClose: () => void
  onSave: (data: LensFormData) => void
}

function toInputDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function LensFormModal({ open, initial, onClose, onSave }: Props) {
  const [name, setName] = useState('Мои линзы')
  const [type, setType] = useState<LensType>('monthly')
  const [days, setDays] = useState(30)
  const [openedAt, setOpenedAt] = useState(() => toInputDate(new Date()))
  const [note, setNote] = useState('')
  const [color, setColor] = useState(PALETTE[0])
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? 'Мои линзы')
      setType(initial?.type ?? 'monthly')
      setDays(initial?.wearPeriodDays ?? 30)
      setOpenedAt(initial ? toInputDate(new Date(initial.openedAt)) : toInputDate(new Date()))
      setNote(initial?.note ?? '')
      setColor(initial?.color ?? PALETTE[0])
      setError('')
    }
  }, [open, initial])

  const preset = useMemo(() => LENS_PRESETS.find((p) => p.type === type), [type])

  const selectType = (t: LensType) => {
    setType(t)
    const p = LENS_PRESETS.find((x) => x.type === t)
    if (p && t !== 'custom') setDays(p.days)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Введите название')
      return
    }
    if (!days || days < 1) {
      setError('Укажите срок ношения (дней)')
      return
    }
    if (!openedAt) {
      setError('Укажите дату открытия')
      return
    }
    onSave({
      name: name.trim(),
      type,
      wearPeriodDays: Number(days),
      openedAt: isoFromInput(openedAt),
      note: note.trim() || undefined,
      color,
    })
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {initial ? 'Изменить линзы' : 'Новая пара линз'}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">Укажите параметры ношения</p>
        </div>
        <button
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">Название</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например, Acuvue Oasys"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">Тип линз</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {LENS_PRESETS.map((p) => (
              <button
                key={p.type}
                type="button"
                onClick={() => selectType(p.type)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                  type === p.type
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-white'
                    : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
                }`}
              >
                <span>{p.emoji}</span>
                <span className="truncate">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">Срок ношения (дней)</label>
            <input
              type="number"
              min={1}
              max={365}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className={inputClass}
            />
            {preset && type !== 'custom' && (
              <p className="mt-1 text-[11px] text-zinc-500">По умолчанию: {preset.days} дн.</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">Дата открытия</label>
            <input
              type="date"
              value={openedAt}
              max={toInputDate(new Date())}
              onChange={(e) => setOpenedAt(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">Заметка (необязательно)</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Диоптрии, цилиндр…"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">Цвет</label>
          <div className="flex flex-wrap gap-2">
            {PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`h-8 w-8 rounded-full transition ${
                  color === c
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                    : 'hover:scale-110'
                }`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            Отмена
          </button>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
          >
            {initial ? 'Сохранить' : 'Добавить'}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
