
import { useInView } from '../hooks/useInView'

const AVATARS = [
  { initials: 'JD', color: '#6366f1' },
  { initials: 'MK', color: '#f59e0b' },
  { initials: 'AL', color: '#10b981' },
  { initials: 'RB', color: '#ef4444' },
  { initials: 'SC', color: '#8b5cf6' },
]

export default function SocialProof() {
  const { ref, inView } = useInView(0.2)

  return (
    <section className="py-8 px-6" style={{ background: '#f2f2f3' }}>
      <div className="max-w-5xl mx-auto">
        {/* Social proof row */}
        <div
          ref={ref}
          className="flex items-center justify-center gap-8 mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#f2f2f3] flex items-center justify-center text-white text-[11px] font-bold"
                  style={{
                    background: a.color,
                    zIndex: AVATARS.length - i,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: `transform 0.3s ease ${i * 60}ms`,
                    transform: inView ? 'scale(1)' : 'scale(0)',
                  }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#09090b]">12,000+ builders</div>
              <div className="text-[11px] text-[#a1a1aa]">trust Fusion AI</div>
            </div>
          </div>
          <div className="w-px h-8 bg-[#d4d4d8]" />
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="15" height="15" viewBox="0 0 15 15" fill="#f59e0b"
                  style={{ transform: inView ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-30deg)', transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1) ${300 + i * 60}ms` }}
                >
                  <path d="M7.5 1l1.7 4.9H14L9.8 8.6l1.6 5L7.5 11l-3.9 2.6 1.6-5L1 5.9h4.8z" />
                </svg>
              ))}
            </div>
            <span className="text-[14px] font-bold text-[#09090b]">4.9</span>
            <span className="text-[13px] text-[#a1a1aa]">rating</span>
          </div>
        </div>


      </div>
    </section>
  )
}
