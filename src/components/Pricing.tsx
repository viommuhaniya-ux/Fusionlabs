const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for exploring what Synth can do.',
    cta: 'Get started',
    ctaStyle: 'border',
    features: [
      '5 builds per month',
      'All 4 AI agents',
      'Basic editing tools',
      'Synth subdomain',
      'Community support',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For individuals and small teams building seriously.',
    cta: 'Start free trial',
    ctaStyle: 'filled',
    features: [
      'Unlimited builds',
      'All 4 AI agents',
      'Full editing suite',
      'Custom domains',
      'Version history (30 days)',
      'Priority support',
      'Analytics dashboard',
    ],
    highlight: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: '/mo',
    description: 'Collaboration and scale for growing teams.',
    cta: 'Start free trial',
    ctaStyle: 'border',
    features: [
      'Everything in Pro',
      'Real-time collaboration',
      'Unlimited teammates',
      'Version history (unlimited)',
      'SSO & admin controls',
      'SLA & dedicated support',
    ],
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 bg-white border-t border-[#e8e8e8]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#999] mb-4">Pricing</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-black mb-4">
            Simple pricing.
            <br />
            <span className="italic font-light">No surprises.</span>
          </h2>
          <p className="text-[16px] text-[#6b6b6b] font-light">
            Start free. Upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlight
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#e8e8e8]'
              }`}
            >
              <div className="mb-6">
                <h3
                  className={`font-semibold text-[14px] mb-1 ${
                    plan.highlight ? 'text-white/60' : 'text-[#999]'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-[40px] font-semibold tracking-tight ${
                      plan.highlight ? 'text-white' : 'text-black'
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlight ? 'text-white/50 text-[14px]' : 'text-[#999] text-[14px]'}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[13px] mt-2 leading-relaxed ${
                    plan.highlight ? 'text-white/60' : 'text-[#6b6b6b]'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <a
                href="#"
                className={`block text-center text-[14px] font-medium py-3 rounded-full mb-7 transition-all duration-200 ${
                  plan.ctaStyle === 'filled'
                    ? 'bg-white text-black hover:bg-white/90'
                    : plan.highlight
                    ? 'border border-white/30 text-white hover:bg-white/10'
                    : 'border border-[#e0e0e0] text-black hover:bg-[#fafafa] hover:border-[#bbb]'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <path
                        d="M2.5 7l3.5 3.5 5.5-6"
                        stroke={plan.highlight ? 'rgba(255,255,255,0.7)' : '#000'}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={plan.highlight ? 'text-white/70' : 'text-[#555]'}>{f}</span>
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
