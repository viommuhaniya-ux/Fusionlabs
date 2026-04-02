import MagneticButton from './MagneticButton'
import AnimatedSection from './AnimatedSection'

export default function Footer() {
  const cols = [
    { heading: 'Product',   links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API'] },
    { heading: 'Resources', links: ['Documentation', 'Guides', 'Examples', 'Templates', 'Blog'] },
    { heading: 'Company',   links: ['About', 'Careers', 'Press', 'Contact'], badges: { Careers: 'Hiring' } },
    { heading: 'Legal',     links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ]

  return (
    <footer className="bg-white border-t border-[#e4e4e7]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Brand */}
          <AnimatedSection direction="up" delay={0} className="max-w-xs flex-shrink-0">
            <MagneticButton href="#" strength={0.08}
              className="flex items-center gap-2.5 font-black text-[18px] text-[#09090b] mb-4">
              <div className="w-8 h-8 bg-[#09090b] rounded-xl flex items-center justify-center"
                style={{ boxShadow: '0 2px 12px rgba(9,9,11,0.2)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5L5 6.5h3L4 14.5l9-8H9l3-5H8z" fill="white" />
                </svg>
              </div>
              Nexus
            </MagneticButton>
            <p className="text-[13px] text-[#71717a] leading-relaxed mb-5">
              Build anything with collective AI. Four models, one vision, infinite possibilities.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email"
                className="flex-1 border border-[#e4e4e7] rounded-xl px-3 py-2 text-[13px] text-[#09090b] placeholder-[#a1a1aa] bg-white focus:outline-none focus:border-[#09090b] transition-colors duration-200" />
              <button className="bg-[#09090b] text-white text-[13px] font-bold px-4 py-2 rounded-xl hover:bg-[#27272a] transition-colors flex-shrink-0 btn-press">
                →
              </button>
            </div>
          </AnimatedSection>

          {/* Links */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col, ci) => (
              <AnimatedSection key={col.heading} direction="up" delay={ci * 60}>
                <h4 className="text-[11px] font-bold text-[#09090b] mb-4 tracking-[0.1em] uppercase">{col.heading}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link} className="flex items-center gap-2">
                      <a href="#" className="text-[13px] text-[#71717a] hover:text-[#09090b] transition-colors duration-150 link-underline">
                        {link}
                      </a>
                      {col.badges && col.badges[link as keyof typeof col.badges] && (
                        <span className="bg-[#f0fdf4] text-[#16a34a] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-[#bbf7d0]">
                          {col.badges[link as keyof typeof col.badges]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection direction="up" delay={200}>
          <div className="mt-12 pt-6 border-t border-[#e4e4e7] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-[#a1a1aa]">© 2025 Nexus AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="text-[12px] text-[#a1a1aa] hover:text-[#09090b] transition-colors duration-150 link-underline">{s}</a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}
