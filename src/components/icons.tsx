import type { ReactNode } from 'react'

interface IconProps {
  className?: string
}

function Svg({ children, className = 'h-5 w-5' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const HomeIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M3 9.5 12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-4V14h-7v7.5h-4A1.5 1.5 0 0 1 3 20z" />
  </Svg>
)

export const LensIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
  </Svg>
)

export const HistoryIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3.5 2" />
  </Svg>
)

export const ChartIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M3 3v18h18" />
    <path d="M8 17v-6" />
    <path d="M13 17V8" />
    <path d="M18 17v-3" />
  </Svg>
)

export const PlusIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Svg>
)

export const PencilIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
  </Svg>
)

export const TrashIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </Svg>
)

export const XIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </Svg>
)

export const RefreshIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" />
    <path d="M21 3v5h-5" />
  </Svg>
)

export const RestoreIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </Svg>
)

export const CalendarIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M3 10h18" />
  </Svg>
)

export const AlertIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </Svg>
)

export const SparklesIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />
    <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
  </Svg>
)
