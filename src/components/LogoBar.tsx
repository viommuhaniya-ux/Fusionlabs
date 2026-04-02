import AnimatedSection from './AnimatedSection'

const LOGOS = [
  { name: 'Vercel',   icon: <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor"><path d="M8 0L16 14H0L8 0z" /></svg> },
  { name: 'Stripe',   icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm.8 11.5c-1.7 0-3-.9-3.5-2.2l1.3-.5c.3.8 1 1.3 2.2 1.3 1 0 1.6-.4 1.6-1 0-.5-.3-.8-1.5-1.1l-.7-.2C8.7 9.4 8 8.7 8 7.7c0-1.3 1.1-2.2 2.7-2.2 1.4 0 2.5.7 3 1.8l-1.2.5c-.3-.7-.9-1-1.8-1-.9 0-1.4.4-1.4.9 0 .5.3.7 1.3 1l.7.2c1.6.4 2.4 1.1 2.4 2.2 0 1.4-1.1 2.4-2.9 2.4z" /></svg> },
  { name: 'Linear',   icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M1 11.5L6.5 17l.5-.5L2 11l-.5.5zM1 8L10 17l.5-.5L1.5 7.5 1 8zM2.5 5L13 15.5l.5-.5L3 4.5 2.5 5zM5 2.5L15.5 13l.5-.5L5.5 2 5 2.5zM8 1l9 9-.5.5L7.5 1.5 8 1z" /></svg> },
  { name: 'Notion',   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4 4h5l3 3v5H4V4z" /></svg> },
  { name: 'Figma',    icon: <svg width="13" height="18" viewBox="0 0 14 18" fill="none"><rect x="0.5" y="0.5" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8" /><rect x="7.5" y="0.5" width="6" height="6" rx="3" fill="currentColor" opacity="0.6" /><rect x="0.5" y="7.5" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" /><rect x="0.5" y="14.5" width="6" height="3" rx="1.5" fill="currentColor" opacity="0.3" /><circle cx="10.5" cy="10.5" r="3" fill="currentColor" opacity="0.5" /></svg> },
  { name: 'Supabase', icon: <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor"><path d="M9 0v10l6-10H9zM7 18V8L1 18h6z" /></svg> },
  { name: 'Vercel',   icon: <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor"><path d="M8 0L16 14H0L8 0z" /></svg> },
  { name: 'Stripe',   icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm.8 11.5c-1.7 0-3-.9-3.5-2.2l1.3-.5c.3.8 1 1.3 2.2 1.3 1 0 1.6-.4 1.6-1 0-.5-.3-.8-1.5-1.1l-.7-.2C8.7 9.4 8 8.7 8 7.7c0-1.3 1.1-2.2 2.7-2.2 1.4 0 2.5.7 3 1.8l-1.2.5c-.3-.7-.9-1-1.8-1-.9 0-1.4.4-1.4.9 0 .5.3.7 1.3 1l.7.2c1.6.4 2.4 1.1 2.4 2.2 0 1.4-1.1 2.4-2.9 2.4z" /></svg> },
  { name: 'Linear',   icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M1 11.5L6.5 17l.5-.5L2 11l-.5.5zM1 8L10 17l.5-.5L1.5 7.5 1 8zM2.5 5L13 15.5l.5-.5L3 4.5 2.5 5zM5 2.5L15.5 13l.5-.5L5.5 2 5 2.5zM8 1l9 9-.5.5L7.5 1.5 8 1z" /></svg> },
  { name: 'Notion',   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4 4h5l3 3v5H4V4z" /></svg> },
]

export default function LogoBar() {
  return (
    <section className="py-14 overflow-hidden" style={{ background: '#f2f2f3' }}>
      <AnimatedSection className="text-center mb-8">
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#c4c4c8] uppercase">
          Powering the next generation of builders
        </p>
      </AnimatedSection>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f2f2f3, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f2f2f3, transparent)' }} />

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {LOGOS.map((logo, i) => (
            <div key={i}
              className="flex items-center gap-2.5 text-[#c4c4c8] mx-10 hover:text-[#71717a] transition-colors duration-300"
            >
              {logo.icon}
              <span className="text-[13px] font-semibold whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
