import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const TESTIMONIALS = [
  { initials: 'SC', name: 'Sarah Chen',    role: 'Head of Product, Stripe',       quote: 'Nexus completely transformed how we prototype. What used to take weeks now takes hours. The multi-AI approach produces results that often go straight to production.' },
  { initials: 'MJ', name: 'Marcus Johnson', role: 'Founder & CEO, Stealth Startup', quote: "The Reference Builder alone is worth it. I paste a competitor's site, describe the changes, and get a unique version in minutes. Like having a senior dev on call 24/7." },
  { initials: 'ER', name: 'Emily Rodriguez', role: 'CTO, Notion',                  quote: "We've tried every AI tool out there. Nexus is the first that actually delivers production-ready code. Our engineering team was genuinely impressed — and they're hard to impress." },
  { initials: 'DP', name: 'David Park',     role: 'VP Engineering, Linear',        quote: "From idea to deployed MVP in under an hour. That's not marketing speak — that's what we actually achieved. Nexus is the future of how software gets built." },
  { initials: 'LW', name: 'Lisa Wang',      role: 'Design Lead, Figma',            quote: 'The Focus Editing mode is pure magic. Draw a box around what you want changed, describe it, done. No more context-switching between design and code.' },
  { initials: 'JM', name: 'James Miller',   role: 'Product Manager, Vercel',       quote: 'We migrated our entire prototyping workflow to Nexus. Integrated hosting and database means we go from concept to user testing in a single afternoon.' },
]

export default function Testimonials() {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-[#111113] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/25">Testimonials</span>
          </div>
          <h2 className="font-black tracking-[-0.03em] leading-[1.0]" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            <span className="text-white">Loved by builders</span><br />
            <span className="text-white/20">worldwide.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill="#f59e0b"
                  style={{ transform: inView ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-20deg)', transition: `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${300 + i * 55}ms` }}>
                  <path d="M7.5 1l1.7 4.9H14L9.8 8.6l1.6 5L7.5 11l-3.9 2.6 1.6-5L1 5.9h4.8z" />
                </svg>
              ))}
            </div>
            <span className="text-[14px] font-bold text-white/70">4.9/5</span>
            <span className="text-[13px] text-white/25">from 2,000+ reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name}
              className="relative bg-[#18181b] border border-white/[0.06] rounded-2xl p-6 overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.96)',
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 75}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 75}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                borderColor: hovered === i ? 'rgba(255,255,255,0.12)' : undefined,
                boxShadow: hovered === i ? '0 8px 40px rgba(0,0,0,0.4)' : undefined,
              }}>
              {/* Hover glow */}
              <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.3s' }} />

              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                    <path d="M6 1l1.3 3.8H11L8.1 6.9l1.2 3.8L6 8.8l-3.3 1.9 1.2-3.8L1 4.8h3.7z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-[13.5px] text-white/40 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</blockquote>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-white/50">{t.initials}</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white/70">{t.name}</p>
                  <p className="text-[11px] text-white/25">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
