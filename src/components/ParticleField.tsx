import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  baseR: number
  opacity: number
  hue: number
  life: number
  maxLife: number
  pulse: number
  pulseSpeed: number
  type: 'dot' | 'ring' | 'cross'
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let W = 0, H = 0
    let mouseX = -9999, mouseY = -9999
    let mouseVX = 0, mouseVY = 0
    let t = 0

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      initParticles()
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx = e.clientX - rect.left
      const ny = e.clientY - rect.top
      mouseVX = nx - mouseX
      mouseVY = ny - mouseY
      mouseX = nx
      mouseY = ny
    }
    window.addEventListener('mousemove', onMove)

    // Color palette — subtle indigo/violet/slate
    const COLORS = [
      [99, 102, 241],   // indigo
      [139, 92, 246],   // violet
      [59, 130, 246],   // blue
      [9, 9, 11],       // near-black
      [100, 116, 139],  // slate
    ]

    const N = 90
    let particles: Particle[] = []
    const sparks: Spark[] = []

    const initParticles = () => {
      particles = Array.from({ length: N }, () => {
        const col = COLORS[Math.floor(Math.random() * COLORS.length)]
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 0.8,
          baseR: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.5 + 0.15,
          hue: col[0],
          life: Math.random() * 1000,
          maxLife: 800 + Math.random() * 600,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          type: Math.random() < 0.75 ? 'dot' : Math.random() < 0.5 ? 'ring' : 'cross',
        }
      })
    }

    const spawnSparks = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1
        const col = COLORS[Math.floor(Math.random() * COLORS.length)]
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 20 + Math.random() * 20,
          color: `rgba(${col[0]},${col[1]},${col[2]}`,
        })
      }
    }

    // Draw a glowing dot
    const drawGlowDot = (x: number, y: number, r: number, color: number[], alpha: number) => {
      const [cr, cg, cb] = color
      // Outer glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
      grd.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.4})`)
      grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
      ctx.beginPath()
      ctx.arc(x, y, r * 4, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()
      // Core
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
      ctx.fill()
    }

    const drawRing = (x: number, y: number, r: number, color: number[], alpha: number) => {
      const [cr, cg, cb] = color
      ctx.beginPath()
      ctx.arc(x, y, r * 1.8, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.6})`
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 0.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
      ctx.fill()
    }

    const drawCross = (x: number, y: number, r: number, color: number[], alpha: number) => {
      const [cr, cg, cb] = color
      const size = r * 2.5
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.7})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(x - size, y)
      ctx.lineTo(x + size, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x, y + size)
      ctx.stroke()
    }

    // Animated gradient connection
    const drawConnection = (
      p1: Particle, p2: Particle, dist: number, maxDist: number
    ) => {
      const alpha = (1 - dist / maxDist) * 0.18
      const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
      const c1 = COLORS[Math.floor(p1.hue / 100) % COLORS.length]
      const c2 = COLORS[Math.floor(p2.hue / 100) % COLORS.length]
      grd.addColorStop(0, `rgba(${c1[0]},${c1[1]},${c1[2]},${alpha})`)
      grd.addColorStop(1, `rgba(${c2[0]},${c2[1]},${c2[2]},${alpha})`)
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = grd
      ctx.lineWidth = (1 - dist / maxDist) * 1.2
      ctx.stroke()
    }

    // Mouse trail glow
    const drawMouseGlow = () => {
      if (mouseX < 0 || mouseX > W) return
      const speed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY)
      const intensity = Math.min(speed / 20, 1)
      if (intensity < 0.01) return

      const grd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80 + intensity * 40)
      grd.addColorStop(0, `rgba(99,102,241,${0.06 * intensity})`)
      grd.addColorStop(0.5, `rgba(139,92,246,${0.03 * intensity})`)
      grd.addColorStop(1, 'rgba(99,102,241,0)')
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 80 + intensity * 40, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()
    }

    const draw = () => {
      t++
      ctx.clearRect(0, 0, W, H)

      // Dampen mouse velocity
      mouseVX *= 0.85
      mouseVY *= 0.85

      // Mouse glow
      drawMouseGlow()

      // Spawn sparks on fast mouse move
      const speed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY)
      if (speed > 8 && Math.random() < 0.4) {
        spawnSparks(mouseX, mouseY, 2)
      }

      // Update + draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.92
        s.vy *= 0.92
        s.life++
        const alpha = (1 - s.life / s.maxLife) * 0.7
        if (alpha <= 0) { sparks.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color},${alpha})`
        ctx.fill()
      }

      // Update + draw particles
      const MAX_DIST = 140

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Pulse size
        p.pulse += p.pulseSpeed
        p.r = p.baseR + Math.sin(p.pulse) * 0.4

        // Mouse repulsion with swirl
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 150

        if (dist < repelRadius && dist > 0) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 2) * 0.8
          // Add slight perpendicular swirl
          const nx = dx / dist
          const ny = dy / dist
          const tx = -ny
          const ty = nx
          p.vx += nx * force + tx * force * 0.3
          p.vy += ny * force + ty * force * 0.3
        }

        // Gentle drift toward center (avoid clustering at edges)
        p.vx += (W / 2 - p.x) * 0.00005
        p.vy += (H / 2 - p.y) * 0.00005

        // Dampen
        p.vx *= 0.975
        p.vy *= 0.975

        // Max speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 3) { p.vx = (p.vx / spd) * 3; p.vy = (p.vy / spd) * 3 }

        p.x += p.vx
        p.y += p.vy

        // Soft wrap with fade
        const margin = 40
        if (p.x < -margin) p.x = W + margin
        if (p.x > W + margin) p.x = -margin
        if (p.y < -margin) p.y = H + margin
        if (p.y > H + margin) p.y = -margin

        // Life cycle — fade in/out
        p.life++
        if (p.life > p.maxLife) {
          p.life = 0
          p.x = Math.random() * W
          p.y = Math.random() * H
        }
        const lifeAlpha = p.life < 60
          ? p.life / 60
          : p.life > p.maxLife - 60
          ? (p.maxLife - p.life) / 60
          : 1

        const alpha = p.opacity * lifeAlpha

        // Draw connections first
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx2 = p.x - q.x
          const dy2 = p.y - q.y
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (d2 < MAX_DIST) {
            drawConnection(p, q, d2, MAX_DIST)
          }
        }

        // Draw particle
        const col = COLORS[i % COLORS.length]
        if (p.type === 'ring') {
          drawRing(p.x, p.y, p.r, col, alpha)
        } else if (p.type === 'cross') {
          drawCross(p.x, p.y, p.r, col, alpha)
        } else {
          drawGlowDot(p.x, p.y, p.r, col, alpha)
        }
      }

      // Floating orbs — large blurry background circles
      const orbCount = 3
      for (let i = 0; i < orbCount; i++) {
        const ox = W * (0.2 + i * 0.3) + Math.sin(t * 0.003 + i * 2) * 60
        const oy = H * 0.5 + Math.cos(t * 0.002 + i * 1.5) * 80
        const or = 120 + i * 40
        const grd = ctx.createRadialGradient(ox, oy, 0, ox, oy, or)
        const col = COLORS[i % COLORS.length]
        grd.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.025)`)
        grd.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`)
        ctx.beginPath()
        ctx.arc(ox, oy, or, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}
