import { useState } from 'react'
import MagneticButton from './MagneticButton'
import { useInView } from '../hooks/useInView'

export default function CTASection() {
  const { ref, inView } = useInView(0.3)
  const [hovered, setHovered] = useState(false)

  return (
    <section className="py-24 px-6" style={{ background: '#f2f2f3' }}>
      <div className="max-w-3xl mx-auto">
        <div ref={ref}
          className="relative bg-white border border-[#e4e4e7] rounded-3xl p-12 text-center overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.97)',
            transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
            boxShadow: hovered ? '0 32px 80px rgba(0,0,0,0.09)' : '0 8px 40px rgba(0,0,0,0.05)',
          }}>
          {/* Subtle corner blobs */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(9,9,11,0.04) 0%, transparent 70%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }} />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(9,9,11,0.03) 0%, transparent 70%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }} />

          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#09090b] mb-6 relative"
              style={{ boxShadow: '0 4px 20px rgba(9,9,11,0.2)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M13 3L4 14h7v7l9-11h-7V3z" fill="white" />
              </svg>
              {/* Spinning ring */}
              <div className="absolute -inset-2 rounded-3xl border border-[#09090b]/15 animate-spin-slow" />
            </div>

            <div className="inline-flex items-center gap-2 border border-[#e4e4e7] rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b]" />
              <span className="text-[13px] font-semibold text-[#09090b]">Start building for free</span>
            </div>

            <h2 className="font-black tracking-[-0.03em] text-[#09090b] leading-[1.05] mb-2"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
              Ready to build
            </h2>
            <h2 className="text-[#a1a1aa] leading-[1.1] mb-6 italic font-light"
              style={{ fontSize: 'clamp(1.8rem,4.5vw,3.2rem)', fontFamily: "'Playfair Display', serif" }}>
              something amazing?
            </h2>

            <p className="text-[15px] text-[#71717a] max-w-md mx-auto leading-relaxed mb-8">
              Join 12,000+ creators, developers, and teams building the future with collective AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <MagneticButton href="#"
                className="flex items-center gap-2 bg-[#09090b] text-white font-bold text-[14px] px-8 py-4 rounded-full btn-press"
                data-cursor="Free" strength={0.1}>
                Get Started — It's Free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4.5L10.5 7 8 9.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#"
                className="flex items-center gap-2 border border-[#e4e4e7] text-[#09090b] font-semibold text-[14px] px-8 py-4 rounded-full btn-press"
                data-cursor="Demo" strength={0.1}>
                Schedule a Demo
              </MagneticButton>
            </div>

            <p className="text-[12px] text-[#a1a1aa]">No credit card required · Free tier forever · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
