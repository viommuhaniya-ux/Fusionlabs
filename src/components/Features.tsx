import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

// ─── Tilt card ────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x: ((e.clientY - r.top - r.height / 2) / r.height) * 5, y: -((e.clientX - r.left - r.width / 2) / r.width) * 5 })
  }
  const onLeave = () => setTilt({ x: 0, y: 0 })
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={className}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: tilt.x === 0 ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.07s ease', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '', started }: { to: number; suffix?: string; started: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let raf: number
    const start = performance.now()
    const dur = 1400
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(e * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, to])
  return <>{val}{suffix}</>
}


// ─── Mockup: Multi-AI ─────────────────────────────────────────────────────────
function MultiAIVisual({ started }: { started: boolean }) {
  const models = [
    { name: 'GPT-4', sub: 'Logic & reasoning', delay: 0 },
    { name: 'Claude', sub: 'Writing & nuance', delay: 80 },
    { name: 'Gemini', sub: 'Vision & search', delay: 160 },
    { name: 'Llama', sub: 'Speed & privacy', delay: 240 },
  ]
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1f]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-2 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">Active Models</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'pulse-dot 2s infinite' }} />
          <span className="text-[11px] text-white/30">Orchestrating</span>
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        {models.map((m, i) => (
          <div key={m.name}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/[0.05]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              opacity: started ? 1 : 0,
              transform: started ? 'translateX(0)' : 'translateX(-16px)',
              transition: `opacity 0.5s ease ${m.delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${m.delay}ms`,
            }}
          >
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-white/60">{m.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white/80">{m.name}</div>
              <div className="text-[10px] text-white/30 mt-0.5">{m.sub}</div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-1 rounded-full bg-white/20"
                  style={{ height: `${8 + Math.sin(i * 2 + j) * 6}px`, animation: started ? `pulse-dot ${0.8 + j * 0.2}s ease-in-out infinite ${j * 100}ms` : 'none' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-white/25">Parallel execution</span>
          <span className="text-[10px] font-semibold text-white/40">
            <Counter to={4} suffix=" models" started={started} />
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: App Generator ────────────────────────────────────────────────────
function AppGenVisual({ started }: { started: boolean }) {
  const lines = [
    { w: '72%', delay: 0 }, { w: '55%', delay: 60 }, { w: '85%', delay: 120 },
    { w: '40%', delay: 180 }, { w: '65%', delay: 240 }, { w: '50%', delay: 300 },
  ]
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1f]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="flex-1 mx-3">
          <div className="h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center px-2.5 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-[10px] text-white/25">fusion.ai/generate</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4 px-3.5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="text-[10px] text-white/25 mb-2 uppercase tracking-widest">Prompt</div>
          <div className="text-[12px] text-white/60 leading-relaxed">
            "Build a SaaS dashboard with dark mode..."
            <span className="inline-block w-0.5 h-3.5 bg-white/40 ml-0.5 align-middle" style={{ animation: 'pulse-dot 1s infinite' }} />
          </div>
        </div>
        <div className="space-y-2">
          {lines.map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[9px] text-white/15 w-4 font-mono">{i + 1}</span>
              <div className="h-2 rounded-full bg-white/[0.08]"
                style={{ width: started ? l.w : '0%', transition: `width 0.6s cubic-bezier(0.16,1,0.3,1) ${l.delay + 200}ms` }} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center px-3 gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'pulse-dot 1.5s infinite' }} />
            <span className="text-[10px] text-white/40">Generating components...</span>
          </div>
          <div className="text-[11px] font-semibold text-white/30">
            <Counter to={94} suffix="%" started={started} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Image System ─────────────────────────────────────────────────────
function ImageVisual({ started }: { started: boolean }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1f]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">Image Studio</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[0, 1, 2].map((i) => (
            <div key={i}
              className="aspect-square rounded-xl border border-white/[0.08] overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, rgba(255,255,255,${0.04 + i * 0.02}) 0%, rgba(255,255,255,0.01) 100%)` }}
            >
              {i === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg border-2 border-white/30 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="1" width="10" height="10" rx="2" stroke="white" strokeWidth="1" opacity="0.5" />
                      <circle cx="4" cy="4" r="1" fill="white" opacity="0.5" />
                      <path d="M1 8l3-3 2 2 1.5-1.5L10 9" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 border-2 border-white/40 rounded-xl"
                    style={{ opacity: started ? 1 : 0, transition: 'opacity 0.4s ease 0.3s' }} />
                </div>
              )}
              {i === 1 && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" style={{ opacity: started ? 1 : 0, transition: 'opacity 0.5s ease 0.4s' }} />}
              {i === 2 && <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" style={{ opacity: started ? 1 : 0, transition: 'opacity 0.5s ease 0.5s' }} />}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          {['Replace', 'Enhance', 'Re-prompt'].map((btn, i) => (
            <button key={btn}
              className="flex-1 py-2 rounded-lg border border-white/[0.08] text-[10px] font-semibold text-white/40 hover:text-white/70 hover:border-white/20 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.02)', opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(8px)', transition: `opacity 0.4s ease ${0.3 + i * 0.06}s, transform 0.4s ease ${0.3 + i * 0.06}s, color 0.2s, border-color 0.2s` }}>
              {btn}
            </button>
          ))}
        </div>
        <div className="px-3.5 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'pulse-dot 2s infinite' }} />
          <span className="text-[10px] text-white/35">Context-aware generation active</span>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Version Control ──────────────────────────────────────────────────
function VersionVisual({ started }: { started: boolean }) {
  const versions = [
    { v: 'v0.4', label: 'Current', time: 'Just now', active: true },
    { v: 'v0.3', label: '', time: '2 hours ago', active: false },
    { v: 'v0.2', label: '', time: 'Yesterday', active: false },
    { v: 'v0.1', label: '', time: '3 days ago', active: false },
  ]
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1f]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
        <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">Version History</span>
      </div>
      <div className="p-4 space-y-2">
        {versions.map((item, i) => (
          <div key={item.v}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all duration-300"
            style={{
              background: item.active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
              borderColor: item.active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
              opacity: started ? 1 : 0,
              transform: started ? 'translateX(0)' : 'translateX(16px)',
              transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, background 0.3s, border-color 0.3s`,
            }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-7 h-7 rounded-lg border border-white/[0.1] flex items-center justify-center"
                style={{ background: item.active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)' }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="white" strokeWidth="1" opacity={item.active ? 0.7 : 0.3} />
                  <path d="M5.5 3v2.5l1.5 1.5" stroke="white" strokeWidth="1" strokeLinecap="round" opacity={item.active ? 0.7 : 0.3} />
                </svg>
              </div>
              {i < versions.length - 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-2 bg-white/10" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-semibold text-white/70">{item.v}</span>
              <span className="text-[10px] text-white/25 ml-2">{item.time}</span>
            </div>
            {item.active
              ? <span className="text-[9px] font-bold text-white/50 bg-white/10 border border-white/[0.1] px-2 py-0.5 rounded-full">Active</span>
              : <span className="text-[9px] text-white/20 hover:text-white/50 transition-colors cursor-pointer">Restore</span>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mockup: AI Agents ────────────────────────────────────────────────────────
function AgentsVisual({ started }: { started: boolean }) {
  const agents = [
    { name: 'UI Agent', sub: 'Interface design', icon: 'UI', progress: 88 },
    { name: 'Backend', sub: 'Server logic', icon: 'BE', progress: 72 },
    { name: 'Debug', sub: 'Error detection', icon: 'DB', progress: 95 },
    { name: 'Optimize', sub: 'Performance', icon: 'OP', progress: 61 },
  ]
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1f]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">Agent Network</span>
        <span className="text-[10px] text-white/25">
          <Counter to={4} suffix=" active" started={started} />
        </span>
      </div>
      <div className="p-4 space-y-3">
        {agents.map((a, i) => (
          <div key={a.name}
            style={{ opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(12px)', transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-7 h-7 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-black text-white/50">{a.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white/70">{a.name}</span>
                  <span className="text-[10px] text-white/30">{a.progress}%</span>
                </div>
                <div className="text-[9px] text-white/25">{a.sub}</div>
              </div>
            </div>
            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden ml-10">
              <div className="h-full rounded-full bg-white/30"
                style={{ width: started ? `${a.progress}%` : '0%', transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.1}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mockup: Deploy ───────────────────────────────────────────────────────────
function DeployVisual({ started }: { started: boolean }) {
  const steps = [
    { label: 'Build', done: true, time: '1.2s' },
    { label: 'Optimize', done: true, time: '0.4s' },
    { label: 'Deploy', done: true, time: '0.8s' },
    { label: 'Live', done: true, time: '—' },
  ]
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1f]" style={{ background: 'linear-gradient(160deg,#111114 0%,#0a0a0d 100%)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">Deploy Pipeline</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'pulse-dot 2s infinite' }} />
          <span className="text-[10px] text-white/30">Live</span>
        </div>
      </div>
      <div className="p-5">
        <div className="relative flex items-center justify-between mb-6">
          <div className="absolute top-3.5 left-0 right-0 h-px bg-white/[0.08]" />
          <div className="absolute top-3.5 left-0 h-px bg-white/30"
            style={{ width: started ? '100%' : '0%', transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />
          {steps.map((s, i) => (
            <div key={s.label} className="relative flex flex-col items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-white/[0.1] flex items-center justify-center z-10"
                style={{
                  background: started ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                  borderColor: started ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                  transition: `background 0.3s ease ${0.2 + i * 0.2}s, border-color 0.3s ease ${0.2 + i * 0.2}s`,
                }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ opacity: started ? 0.7 : 0.2, transition: `opacity 0.3s ease ${0.3 + i * 0.2}s` }} />
                </svg>
              </div>
              <span className="text-[9px] font-semibold text-white/30">{s.label}</span>
              <span className="text-[9px] text-white/20">{s.time}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-white/[0.08] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="0.8" opacity="0.5" />
                <path d="M3 5l1.5 1.5 2.5-3" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-white/60">Deployed successfully</span>
          </div>
          <div className="text-[10px] text-white/25 font-mono">your-app.fusion.ai</div>
          <div className="flex gap-2 mt-2.5">
            {['SSL', 'CDN', 'IPv6'].map((tag) => (
              <span key={tag} className="text-[9px] font-semibold text-white/30 border border-white/[0.08] px-2 py-0.5 rounded-full">{tag} ✓</span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <span className="text-[10px] text-white/20">Total deploy time</span>
          <span className="text-[13px] font-black text-white/50">
            <Counter to={24} suffix="s" started={started} />
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 'multi-ai',
    tag: 'Multi-AI Brain',
    headline: ['Four models.', 'One mind.'],
    body: 'Our orchestration layer runs GPT-4, Claude, Gemini, and Llama in parallel. Each model contributes its unique strength — creativity, logic, vision, and speed — producing results no single model can match.',
    checks: ['Automatic model selection per task', 'Real-time cross-model collaboration', 'Self-correcting output validation', 'Continuous learning from results'],
    imageRight: true,
    Visual: MultiAIVisual,
  },
  {
    id: 'app-gen',
    tag: 'App Generator',
    headline: ['Describe it.', 'Watch it build.'],
    body: 'Plain language becomes production-ready code. No templates, no drag-and-drop compromises. React, Next.js, TypeScript — clean and maintainable from the first line.',
    checks: ['React, Vue, Next.js output', 'Responsive by default', 'TypeScript & accessibility', 'Clean, maintainable code'],
    imageRight: false,
    Visual: AppGenVisual,
  },
  {
    id: 'image',
    tag: 'Smart Image System',
    headline: ['Context-aware', 'visuals.'],
    body: 'AI that understands where images go, not just what they look like. It generates, places, and optimizes visuals that belong in your design — and hands you full control to iterate.',
    checks: ['Contextual image generation', 'Live placement preview', 'Replace or re-prompt anytime', 'Automatic optimization'],
    imageRight: true,
    Visual: ImageVisual,
  },
  {
    id: 'version',
    tag: 'Version Control',
    headline: ['Every state.', 'Always safe.'],
    body: 'Every prompt, every change — automatically versioned. Restore any iteration in one click. Experiment freely knowing nothing is ever lost.',
    checks: ['Auto-versioning on every change', 'One-click restore', 'Prompts linked to versions', 'Visual diff comparison'],
    imageRight: false,
    Visual: VersionVisual,
  },
  {
    id: 'agents',
    tag: 'AI Agent System',
    headline: ['Specialists.', 'In sync.'],
    body: 'Four dedicated agents — UI, Backend, Debug, Optimize — work simultaneously on different layers of your project. Faster, deeper, better than a generalist ever could be.',
    checks: ['UI Agent for design', 'Backend Agent for logic', 'Debug Agent for errors', 'Optimize Agent for performance'],
    imageRight: true,
    Visual: AgentsVisual,
  },
  {
    id: 'deploy',
    tag: 'Instant Deploy',
    headline: ['Idea to live.', 'In 2.4 seconds.'],
    body: 'One click. SSL, CDN, preview URLs, rollbacks — all automatic. Your product reaches users the moment you\'re ready, not after an afternoon of DevOps.',
    checks: ['Sub-3s deploy time', 'Automatic SSL & global CDN', 'Preview URLs per branch', 'Instant rollbacks'],
    imageRight: false,
    Visual: DeployVisual,
  },
]

// ─── Check icon ───────────────────────────────────────────────────────────────
function Check({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="w-[18px] h-[18px] rounded-full border border-[#d4d4d8] flex items-center justify-center flex-shrink-0"
      style={{
        background: inView ? '#09090b' : 'transparent',
        borderColor: inView ? '#09090b' : '#d4d4d8',
        transition: `background 0.3s ease ${delay}ms, border-color 0.3s ease ${delay}ms`,
      }}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M1.5 4l1.5 1.5 3.5-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: inView ? 1 : 0, transition: `opacity 0.2s ease ${delay + 100}ms` }} />
      </svg>
    </div>
  )
}

// ─── Feature row ──────────────────────────────────────────────────────────────
function FeatureRow({ feature }: { feature: typeof FEATURES[0] }) {
  const { ref, inView } = useInView(0.15)
  const { Visual } = feature

  return (
    <div ref={ref}
      className={`flex flex-col ${feature.imageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {/* ── Text side ── */}
      <div className="flex-1 max-w-[480px]">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-6"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#71717a]">{feature.tag}</span>
        </div>

        {/* Headline */}
        <h3 className="font-black text-[clamp(2.2rem,4vw,3rem)] tracking-[-0.03em] text-[#09090b] leading-[1.05] mb-5"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.6s ease 0.15s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s' }}>
          {feature.headline.map((line, i) => (
            <span key={i} className={`block ${i === 1 ? 'text-[#a1a1aa]' : ''}`}>{line}</span>
          ))}
        </h3>

        {/* Body */}
        <p className="text-[15px] text-[#71717a] leading-[1.7] mb-8"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease 0.22s, transform 0.6s ease 0.22s' }}>
          {feature.body}
        </p>

        {/* Divider */}
        <div className="h-px bg-[#e4e4e7] mb-6"
          style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />

        {/* Checklist */}
        <ul className="space-y-3.5">
          {feature.checks.map((check, i) => (
            <li key={check} className="flex items-center gap-3"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-10px)', transition: `opacity 0.5s ease ${0.35 + i * 0.07}s, transform 0.5s ease ${0.35 + i * 0.07}s` }}>
              <Check inView={inView} delay={350 + i * 70} />
              <span className="text-[13.5px] text-[#52525b]">{check}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Visual side ── */}
      <TiltCard className="flex-1 w-full max-w-[520px]">
        <Visual started={inView} />
      </TiltCard>
    </div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────
export default function Features() {
  const { ref, inView } = useInView(0.2)

  return (
    <section id="features" className="py-28 px-6" style={{ background: '#f2f2f3' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="mb-24">
          <div className="flex items-center gap-2 mb-5"
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#a1a1aa]">Capabilities</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-black text-[clamp(2.8rem,5.5vw,4.5rem)] tracking-[-0.03em] leading-[1.0] text-[#09090b]"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}>
              Everything you need.<br />
              <span className="text-[#c4c4c8]">Nothing you don't.</span>
            </h2>
            <p className="text-[15px] text-[#71717a] max-w-xs leading-relaxed lg:text-right"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
              A complete platform to build, deploy, and scale — without the complexity.
            </p>
          </div>
          {/* Animated underline */}
          <div className="mt-8 h-px bg-[#e4e4e7]"
            style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />
        </div>

        {/* Rows */}
        <div className="space-y-32">
          {FEATURES.map((feature) => (
            <FeatureRow key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
