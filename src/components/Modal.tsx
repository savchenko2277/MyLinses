import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export function Modal({ open, onClose, children, maxWidth = 'max-w-md' }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className={`relative max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
