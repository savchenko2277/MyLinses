import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

interface Props {
  value: number
  decimals?: number
}

export function AnimatedNumber({ value, decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return <span ref={ref}>{(0).toFixed(decimals)}</span>
}
