import { useRef, useEffect, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  threshold?: number
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const hidden: Record<string, string> = {
    up:    'opacity:0;transform:translateY(36px)',
    down:  'opacity:0;transform:translateY(-24px)',
    left:  'opacity:0;transform:translateX(36px)',
    right: 'opacity:0;transform:translateX(-36px)',
    scale: 'opacity:0;transform:scale(0.94)',
    none:  'opacity:0',
  }

  const show: Record<string, string> = {
    up:    'opacity:1;transform:translateY(0)',
    down:  'opacity:1;transform:translateY(0)',
    left:  'opacity:1;transform:translateX(0)',
    right: 'opacity:1;transform:translateX(0)',
    scale: 'opacity:1;transform:scale(1)',
    none:  'opacity:1',
  }

  const styleStr = visible ? show[direction] : hidden[direction]
  const styleObj = Object.fromEntries(
    styleStr.split(';').filter(Boolean).map(s => {
      const [k, v] = s.split(':')
      return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v.trim()]
    })
  )

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...styleObj,
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
