import { Modal } from './Modal'

interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
  danger,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal open={open} onClose={onCancel} maxWidth="max-w-sm">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-zinc-400">{message}</p>
      <div className="mt-5 flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
            danger ? 'bg-rose-500 hover:bg-rose-400' : 'bg-gradient-to-r from-cyan-500 to-violet-500'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
