const AGENTS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="14.5" cy="14.5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13.5 14.5h2M14.5 13.5v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    name: 'Image Agent',
    tagline: 'Generates & curates visuals',
    description:
      'Understands visual context and generates or sources perfectly matched images, illustrations, and graphics — optimized for your brand and layout.',
    capabilities: ['AI image generation', 'Style matching', 'Auto-placement', 'Format optimization'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 6h12M4 10h8M4 14h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="15" cy="14" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13.9 14h2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15 12.9v2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    name: 'Design Agent',
    tagline: 'Crafts visual identity',
    description:
      'Applies design principles to create cohesive color palettes, typography systems, spacing, and visual hierarchy — producing interfaces that feel crafted by hand.',
    capabilities: ['Color systems', 'Typography pairing', 'Spacing & rhythm', 'Visual hierarchy'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="2" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="10" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 13.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5.5 15.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    name: 'Structure Agent',
    tagline: 'Architects layouts',
    description:
      'Plans and builds semantic page architecture — sections, grids, navigation, and information flow — ensuring every layout is both logical and conversion-optimized.',
    capabilities: ['Layout planning', 'Grid systems', 'Navigation flow', 'SEO structure'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5 4l-3 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    name: 'Code Agent',
    tagline: 'Writes production-ready code',
    description:
      'Generates clean, semantic, and accessible HTML, CSS, and JavaScript — or your framework of choice — with best practices baked in from the start.',
    capabilities: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'Accessibility'],
  },
]

export default function AgentsSection() {
  return (
    <section id="agents" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#999] mb-4">The Team</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-black mb-4">
            Four agents.
            <br />
            <span className="italic font-light">One vision.</span>
          </h2>
          <p className="text-[16px] text-[#6b6b6b] font-light leading-relaxed">
            Each agent is a specialist. Together, they form a complete creative and engineering team that works faster than any human team ever could.
          </p>
        </div>

        {/* Agent grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              className="agent-card border border-[#e8e8e8] rounded-2xl p-6 bg-white"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#f5f5f5] flex items-center justify-center text-black mb-5">
                {agent.icon}
              </div>
              <h3 className="font-semibold text-[15px] text-black mb-1">{agent.name}</h3>
              <p className="text-[12px] text-[#999] mb-4 font-medium">{agent.tagline}</p>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-5">{agent.description}</p>
              <ul className="flex flex-col gap-1.5">
                {agent.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-2 text-[12px] text-[#555]">
                    <span className="w-1 h-1 rounded-full bg-black flex-shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
