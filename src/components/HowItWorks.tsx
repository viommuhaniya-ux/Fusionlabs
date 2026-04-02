import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

// ── Tilt card (same as Features) ─────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x: ((e.clientY - r.top - r.height / 2) / r.height) * 5, y: -((e.clientX - r.left - r.width / 2) / r.width) * 5 })
  }
  const onLeave = () => setTilt({ x: 0, y: 0 })
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={className}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: tilt.x === 0 ? 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' : 'transform 0.07s ease', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string, started: boolean, speed = 28) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    if (!started) return
    let i = 0
    setShown('')
    const iv = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(iv)
    }, speed)
    return () => clearInterval(iv)
  }, [started, text, speed])
  return shown
}

// ── Step 1 Visual: Describe ───────────────────────────────────────────────────
function DescribeVisual({ started }: { started: boolean }) {
  const typed = useTypewriter('Build me a modern SaaS landing page with dark mode, pricing tables, and testimonials', started, 22)

  return (
    <div className="rounded-2xl overflow-hidden border border-[#1c1c20]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center px-2.5 gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ opacity: started ? 1 : 0.3, transition: 'opacity 0.5s' }} />
          <span className="text-[10px] text-white/20">fusion.ai/new</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-white/20 mb-3">Your Prompt</p>

        {/* Prompt box */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-4 mb-4 min-h-[76px]">
          <p className="text-[13px] text-white/55 leading-relaxed">
            {typed}
            {started && typed.length < 84 && (
              <span className="inline-block w-[2px] h-[13px] bg-white/40 ml-0.5 align-middle" style={{ animation: 'pulse-dot 0.9s ease-in-out infinite' }} />
            )}
          </p>
        </div>

        {/* Quick suggestions */}
        <p className="text-[10px] text-white/18 uppercase tracking-widest mb-2.5">Quick starts</p>
        <div className="flex flex-wrap gap-2">
          {['E-commerce', 'Portfolio', 'Mobile app', 'Dashboard'].map((s, i) => (
            <span key={s}
              className="px-3 py-1.5 rounded-lg border border-white/[0.07] text-[11px] text-white/30 hover:text-white/55 hover:border-white/15 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.018)', opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(6px)', transition: `opacity 0.4s ease ${0.5 + i * 0.07}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.07}s, color 0.2s, border-color 0.2s` }}>
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.07] border border-white/[0.09] text-[12px] font-semibold text-white/50"
            style={{ opacity: started ? 1 : 0, transition: 'opacity 0.4s ease 0.7s' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
            Generate
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Step 2 Visual: Generate ───────────────────────────────────────────────────
function GenerateVisual({ started }: { started: boolean }) {
  const models = [
    { name: 'GPT-4',  role: 'Logic & structure',  progress: 92, delay: 0 },
    { name: 'Claude', role: 'Copy & tone',         progress: 78, delay: 110 },
    { name: 'Gemini', role: 'Design & vision',     progress: 85, delay: 220 },
    { name: 'Llama',  role: 'Speed & consistency', progress: 100, delay: 330 },
  ]
  return (
    <div className="rounded-2xl overflow-hidden border border-[#1c1c20]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.05] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/25 tracking-widest uppercase">Generating</span>
        <div className="flex items-center gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/35"
              style={{ animation: started ? `pulse-dot 1s ease-in-out infinite ${i * 180}ms` : 'none' }} />
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {models.map((m) => (
          <div key={m.name}
            style={{ opacity: started ? 1 : 0, transform: started ? 'translateX(0)' : 'translateX(-14px)', transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${m.delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${m.delay}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
                  <span className="text-[9px] font-black text-white/45">{m.name[0]}</span>
                </div>
                <div>
                  <span className="text-[12px] font-semibold text-white/65">{m.name}</span>
                  <span className="text-[10px] text-white/22 ml-2">{m.role}</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-white/30">{m.progress}%</span>
            </div>
            <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full"
                style={{
                  width: started ? `${m.progress}%` : '0%',
                  background: m.progress === 100 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)',
                  transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${m.delay + 200}ms`,
                }} />
            </div>
          </div>
        ))}

        {/* Preview skeleton */}
        <div className="mt-1 rounded-xl border border-white/[0.06] bg-white/[0.018] p-3.5"
          style={{ opacity: started ? 1 : 0, transition: 'opacity 0.6s ease 0.9s' }}>
          <p className="text-[10px] text-white/18 uppercase tracking-widest mb-2.5">Preview</p>
          <div className="space-y-2">
            {['75%','55%','88%','42%'].map((w, i) => (
              <div key={i} className="h-[5px] rounded-full bg-white/[0.07]"
                style={{ width: started ? w : '0%', transition: `width 0.7s cubic-bezier(0.22,1,0.36,1) ${1.1 + i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Step 3 Visual: Deploy ─────────────────────────────────────────────────────
function DeployVisual({ started }: { started: boolean }) {
  const steps = ['Build', 'Bundle', 'Deploy', 'Live']
  return (
    <div className="rounded-2xl overflow-hidden border border-[#1c1c20]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.05] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/25 tracking-widest uppercase">Deploy Pipeline</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"
            style={{ animation: started ? 'pulse-dot 2s ease-in-out infinite' : 'none' }} />
          <span className="text-[10px] text-white/25">Live</span>
        </div>
      </div>

      <div className="p-5">
        {/* Pipeline track */}
        <div className="relative mb-7">
          <div className="absolute top-[14px] left-[14px] right-[14px] h-px bg-white/[0.07]" />
          <div className="absolute top-[14px] left-[14px] h-px bg-white/20"
            style={{ width: started ? 'calc(100% - 28px)' : '0%', transition: 'width 1.3s cubic-bezier(0.22,1,0.36,1) 0.3s' }} />
          <div className="relative flex justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 rounded-full border z-10 flex items-center justify-center"
                  style={{
                    background: started ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.03)',
                    borderColor: started ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.06)',
                    transition: `background 0.35s ease ${0.3 + i * 0.25}s, border-color 0.35s ease ${0.3 + i * 0.25}s`,
                  }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                      style={{ opacity: started ? 0.55 : 0.15, transition: `opacity 0.3s ease ${0.4 + i * 0.25}s` }} />
                  </svg>
                </div>
                <span className="text-[9px] font-semibold text-white/25">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live card */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
          style={{ opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.55s ease 1.5s, transform 0.55s cubic-bezier(0.22,1,0.36,1) 1.5s' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1" opacity="0.35" />
                <path d="M4 7c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white/55">Deployed successfully</p>
              <p className="text-[10px] text-white/22 font-mono">your-app.fusion.ai</p>
            </div>
            <span className="ml-auto text-[15px] font-black text-white/35">2.4s</span>
          </div>
          <div className="flex gap-2">
            {['SSL ✓','CDN ✓','IPv6 ✓'].map(t => (
              <span key={t} className="text-[9px] font-semibold text-white/28 border border-white/[0.07] px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Steps data ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01', title: 'Describe', sub: 'Tell us what you want',
    body: 'Use plain language to describe your vision. As brief or detailed as you like — our AI understands context, tone, and intent without any setup.',
    detail: '"Build me a modern SaaS landing page with pricing tables, testimonials, and a dark mode toggle"',
    Visual: DescribeVisual,
  },
  {
    num: '02', title: 'Generate', sub: 'AI builds it for you',
    body: 'Four AI models collaborate in real-time. Design, code, and optimization happen simultaneously — producing results no single model could match.',
    detail: 'GPT-4 handles logic, Claude refines copy, Gemini optimizes design, Llama ensures consistency.',
    Visual: GenerateVisual,
  },
  {
    num: '03', title: 'Deploy', sub: 'Go live instantly',
    body: 'One click publishes everything. SSL, global CDN, preview URLs, and instant rollbacks are all handled automatically — zero configuration.',
    detail: 'Average deploy time: 2.4 seconds. Zero configuration required.',
    Visual: DeployVisual,
  },
]

// ── Step row ──────────────────────────────────────────────────────────────────
function StepRow({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const { ref, inView } = useInView(0.18)
  const isEven = index % 2 === 0
  const { Visual } = step

  const slideDir = isEven ? 'translateX(-28px)' : 'translateX(28px)'
  const slideVisual = isEven ? 'translateX(28px)' : 'translateX(-28px)'

  return (
    <div ref={ref}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>

      {/* Text */}
      <div className="flex-1 max-w-[440px]">
        {/* Ghost number */}
        <div className="font-black leading-none select-none mb-1"
          style={{
            fontSize: 'clamp(5rem,11vw,7.5rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(9,9,11,0.08)',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.05s',
          }}>
          {step.num}
        </div>

        {/* Tag */}
        <div className="flex items-center gap-2 mb-3"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : slideDir, transition: 'opacity 0.65s ease 0.1s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#71717a]">{step.sub}</span>
        </div>

        {/* Title */}
        <h3 className="font-black tracking-[-0.03em] text-[#09090b] leading-[1.05] mb-4"
          style={{
            fontSize: 'clamp(2.2rem,4vw,3rem)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : slideDir,
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s',
          }}>
          {step.title}
        </h3>

        {/* Animated rule */}
        <div className="h-px bg-[#e4e4e7] mb-5"
          style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: isEven ? 'left' : 'right', transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.22s' }} />

        {/* Body */}
        <p className="text-[15px] text-[#71717a] leading-[1.72] mb-6"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.7s ease 0.28s, transform 0.7s ease 0.28s' }}>
          {step.body}
        </p>

        {/* Quote pill */}
        <div className="bg-white border border-[#e4e4e7] rounded-2xl px-5 py-4"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.65s ease 0.38s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.38s',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}>
          <p className="text-[12.5px] text-[#71717a] italic leading-relaxed">{step.detail}</p>
        </div>
      </div>

      {/* Visual */}
      <div className="flex-1 w-full max-w-[500px]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : slideVisual,
          transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s',
        }}>
        <TiltCard>
          <Visual started={inView} />
        </TiltCard>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="how-it-works" className="py-28 px-6" style={{ background: '#f2f2f3' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="mb-24">
          <div className="flex items-center gap-2 mb-5"
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#a1a1aa]">How it Works</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-black tracking-[-0.03em] leading-[1.0] text-[#09090b]"
              style={{
                fontSize: 'clamp(2.8rem,5.5vw,4.5rem)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
              }}>
              Three steps<br />
              <span style={{ color: '#c4c4c8' }}>to launch.</span>
            </h2>
            <p className="text-[15px] text-[#71717a] max-w-xs leading-relaxed lg:text-right"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}>
              From a single sentence to a live product — no setup, no DevOps, no compromise.
            </p>
          </div>

          <div className="mt-8 h-px bg-[#e4e4e7]"
            style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s' }} />
        </div>

        {/* Steps */}
        <div className="space-y-32">
          {STEPS.map((step, i) => <StepRow key={step.num} step={step} index={i} />)}
        </div>

        {/* Bottom CTA */}
        <BottomCTA />
      </div>
    </section>
  )
}

function BottomCTA() {
  const { ref, inView } = useInView(0.3)
  return (
    <div ref={ref} className="mt-28 rounded-2xl border border-[#e4e4e7] bg-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.04)',
      }}>
      <div>
        <p className="font-black text-[1.4rem] tracking-tight text-[#09090b] mb-1">Ready to try it?</p>
        <p className="text-[14px] text-[#71717a]">No credit card required. Free tier forever.</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <a href="#"
          className="flex items-center gap-2 bg-[#09090b] text-white text-[13px] font-bold px-6 py-3 rounded-full btn-press"
          style={{ boxShadow: '0 4px 16px rgba(9,9,11,0.15)' }}>
          Start for free
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a href="#" className="text-[13px] font-medium text-[#71717a] hover:text-[#09090b] transition-colors link-underline">
          See examples →
        </a>
      </div>
    </div>
  )
}
