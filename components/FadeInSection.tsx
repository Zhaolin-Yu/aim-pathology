'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 与视口相交多少时触发（0~1），默认 0.15 */
  threshold?: number
  /** 根 margin，默认上下各缩 60px，让元素进入更多才触发 */
  rootMargin?: string
  className?: string
}

export default function FadeInSection({
  children,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
