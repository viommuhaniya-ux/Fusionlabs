import { useEffect, useRef, useState } from 'react'
import MagneticButton from './MagneticButton'
import ParticleField from './ParticleField'

const TYPED_PHRASES = [
  'a SaaS landing page',
  'an e-commerce store',
  'a portfolio website',
  'a mobile app UI',
  'a dashboard interface',
]

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const phrase = TYPED_PHRASES[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 58)
    } else if (!isDeleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
    } else {
      setIsDeleting(false)
      setPhraseIdx((i) => (i + 1) % TYPED_PHRASES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIdx])

  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    setTiltX(((e.clientY - rect.top - rect.height / 2) / rect.height) * 8)
    setTiltY(-((e.clientX - rect.left - rect.width / 2) / rect.width) * 8)
  }
  const onMouseLeave = () => { setTiltX(0); setTiltY(0) }

  return (
    <section className="relative pt-[130px] pb-16 px-6 text-center overflow-hidden" style={{ background: '#f2f2f3' }}>
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)', filter: 'blur(60px)', animation: 'float-y2 12s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)', filter: 'blur(60px)', animation: 'float-y 10s ease-in-out infinite 2s' }} />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Badge */}
        <div className="animate-fade-up" style={{ animationFillMode: 'both' }}>
          <div className="inline-flex items-center gap-2 border border-[#d4d4d8] bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-10"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"
                style={{ animation: 'pulse-ring 1.8s ease-out infinite' }} />
              <span className="relative w-2 h-2 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-[13px] font-semibold text-[#09090b] tracking-tight">Multi-AI is here</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4.5L10.5 7 8 9.5" stroke="#09090b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-6">
          <span className="block font-black text-[clamp(3.2rem,7.5vw,6rem)] leading-[1.0] tracking-[-0.04em] text-[#09090b] animate-fade-up delay-100"
            style={{ animationFillMode: 'both' }}>
            Build websites with
          </span>
          <span className="block text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[1.1] tracking-[-0.02em] text-[#a1a1aa] italic font-light mt-1 animate-fade-up delay-200"
            style={{ fontFamily: "'Playfair Display', serif", animationFillMode: 'both' }}>
            collective intelligence
          </span>
        </h1>

        {/* Typewriter */}
        <div className="animate-fade-up delay-300" style={{ animationFillMode: 'both' }}>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#e4e4e7] rounded-2xl px-5 py-3 mb-6"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L4.5 5.5H1L4.5 8.5 3 13 7 10.5 11 13 9.5 8.5 13 5.5H9.5z" fill="#09090b" opacity="0.5" />
            </svg>
            <span className="text-[14px] text-[#52525b]">
              <span className="text-[#09090b] font-semibold">Build me </span>
              <span className="text-[#09090b] font-semibold">{displayed}</span>
              <span className="inline-block w-[2px] h-4 bg-[#09090b] ml-0.5 align-middle opacity-70"
                style={{ animation: 'pulse-dot 0.9s ease-in-out infinite' }} />
            </span>
          </div>
        </div>

        {/* Subtext */}
        <p className="text-[clamp(0.95rem,1.6vw,1.1rem)] text-[#71717a] max-w-lg mx-auto leading-relaxed animate-fade-up delay-400"
          style={{ animationFillMode: 'both' }}>
          Four AI models working in harmony. Describe what you want, get
          production-ready code in seconds. No setup, no complexity.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 mb-6 animate-fade-up delay-500"
          style={{ animationFillMode: 'both' }}>
          <MagneticButton href="#" strength={0.1}
            className="flex items-center gap-2.5 bg-[#09090b] text-white font-bold text-[14px] px-7 py-3.5 rounded-full btn-press"
          >
            <span>Start Building Free</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4.5L10.5 7 8 9.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#" strength={0.1}
            className="flex items-center gap-3 border border-[#d4d4d8] bg-white text-[#09090b] font-semibold text-[14px] px-7 py-3.5 rounded-full btn-press"
          >
            <div className="w-7 h-7 rounded-full bg-[#09090b] flex items-center justify-center flex-shrink-0">
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                <path d="M2 1.5l6 4-6 4V1.5z" fill="white" />
              </svg>
            </div>
            Watch Demo
          </MagneticButton>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-14 animate-fade-up delay-600"
          style={{ animationFillMode: 'both' }}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                { initials: 'JD', color: '#6366f1' },
                { initials: 'MK', color: '#f59e0b' },
                { initials: 'AL', color: '#10b981' },
                { initials: 'RB', color: '#ef4444' },
                { initials: 'SC', color: '#8b5cf6' },
              ].map((a, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#f2f2f3] flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: a.color, zIndex: 5 - i, boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>
                  {a.initials}
                </div>
              ))}
            </div>
            <span className="text-[13px] font-semibold text-[#09090b]">12,000+ builders</span>
          </div>
          <div className="w-px h-5 bg-[#d4d4d8]" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 15 15" fill="#f59e0b">
                  <path d="M7.5 1l1.7 4.9H14L9.8 8.6l1.6 5L7.5 11l-3.9 2.6 1.6-5L1 5.9h4.8z" />
                </svg>
              ))}
            </div>
            <span className="text-[13px] font-bold text-[#09090b]">4.9</span>
            <span className="text-[12px] text-[#a1a1aa]">rating</span>
          </div>
        </div>

        {/* 3D Dashboard */}
        <div ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
          className="animate-scale-up delay-700" style={{ animationFillMode: 'both', perspective: '1200px' }}>
          <div className="relative rounded-2xl border border-[#d4d4d8] bg-white overflow-hidden"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transition: tiltX === 0 ? 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' : 'transform 0.08s ease',
              transformStyle: 'preserve-3d',
              boxShadow: '0 32px 80px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.04)',
            }}>
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#fafafa] border-b border-[#e4e4e7]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-white border border-[#e4e4e7] rounded-lg px-3 py-1.5 text-[11px] text-[#a1a1aa] max-w-[220px] w-full justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  fusion.ai/workspace
                </div>
              </div>
              <div className="w-16" />
            </div>

            <div className="flex" style={{ minHeight: '260px' }}>
              {/* Sidebar */}
              <div className="w-44 border-r border-[#e4e4e7] bg-[#fafafa] p-4 flex flex-col gap-2 flex-shrink-0">
                <div className="text-[10px] font-bold text-[#a1a1aa] tracking-widest uppercase mb-1">Workspace</div>
                {['Dashboard', 'Projects', 'Deploy', 'Analytics'].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 hover:bg-white ${
                    i === 0 ? 'bg-[#09090b] text-white' : 'text-[#71717a]'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-[#d4d4d8]'}`} />
                    {item}
                  </div>
                ))}
                <div className="mt-auto">
                  <div className="bg-[#09090b] rounded-xl p-3 text-white">
                    <div className="text-[10px] font-bold mb-1">AI Working</div>
                    <div className="text-[10px] opacity-50">4 models active</div>
                    <div className="mt-2 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-1 h-1 rounded-full bg-white/30"
                          style={{ animation: `pulse-dot ${0.8 + i * 0.25}s ease-in-out infinite ${i * 120}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-[15px] text-[#09090b]">My Projects</div>
                    <div className="text-[11px] text-[#a1a1aa] mt-0.5">3 active · 12 deployed</div>
                  </div>
                  <div className="bg-[#09090b] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">+ New</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'E-commerce', status: 'Live', color: '#22c55e', bg: 'from-[#f0fdf4] to-[#dcfce7]' },
                    { name: 'Portfolio', status: 'Building', color: '#f59e0b', bg: 'from-[#fffbeb] to-[#fef3c7]' },
                    { name: 'SaaS App', status: 'Live', color: '#22c55e', bg: 'from-[#eff6ff] to-[#dbeafe]' },
                  ].map((p) => (
                    <div key={p.name} className="border border-[#e4e4e7] rounded-xl overflow-hidden hover:border-[#a1a1aa] hover:-translate-y-0.5 transition-all duration-200">
                      <div className={`h-20 bg-gradient-to-br ${p.bg}`} />
                      <div className="p-2.5">
                        <div className="text-[11px] font-semibold text-[#09090b]">{p.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                          <span className="text-[10px] text-[#71717a]">{p.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 bg-white border border-[#e4e4e7] rounded-xl px-3 py-2 flex items-center gap-2 animate-float"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#09090b]">Deployed!</div>
                <div className="text-[10px] text-[#71717a]">2.4s · Global CDN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
