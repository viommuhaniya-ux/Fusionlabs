const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9h12M9 3v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: 'Drag & Drop Placement',
    description: 'Move any element anywhere on the canvas with pixel-perfect precision. Snap to grid or freeform — your choice.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 1v3M9 14v3M1 9h3M14 9h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M3.2 3.2l2.1 2.1M12.7 12.7l2.1 2.1M3.2 14.8l2.1-2.1M12.7 5.3l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Live Preview Changes',
    description: 'Every edit reflects instantly. No refresh, no compile step — see your changes in real time as you make them.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 14l4-4 3 3 5-6 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: 'Fine Control Sliders',
    description: 'Adjust spacing, font size, opacity, border radius, and more with precise numerical controls or intuitive sliders.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 6h10M4 9h7M4 12h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: 'Inline Text Editing',
    description: 'Click any text element to edit it directly on the canvas. No sidebar, no modal — just direct manipulation.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3L3 9l6 6 6-6-6-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'Component Swap',
    description: 'Replace any section or component with an AI-generated alternative. Iterate through options without losing your work.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: 'Version History',
    description: 'Every state is saved automatically. Step back through your edit history or restore any previous version instantly.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="7" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" fill="white" />
      </svg>
    ),
    title: 'Multi-layer Canvas',
    description: 'Work with layered elements like a pro. Reorder, group, lock, and hide layers with a familiar panel interface.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C4.6 1 1 4.6 1 9s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 5v4l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Real-time Collaboration',
    description: 'Invite teammates to edit simultaneously. See live cursors, leave comments, and ship together without conflicts.',
  },
]

export default function EditingFeatures() {
  return (
    <section id="features" className="py-32 px-6 bg-white border-t border-[#e8e8e8]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#999] mb-4">Editing</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-black mb-4">
            Manual control,
            <br />
            <span className="italic font-light">zero friction.</span>
          </h2>
          <p className="text-[16px] text-[#6b6b6b] font-light leading-relaxed">
            AI builds the foundation. You refine the details. Every tool you need is exactly where you expect it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e8e8] border border-[#e8e8e8] rounded-2xl overflow-hidden">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-row bg-white p-6 cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center text-black mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-[14px] text-black mb-2">{f.title}</h3>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
