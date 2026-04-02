import { useInView } from '../hooks/useInView'
import { useSmoothCount } from '../hooks/useSmoothCount'

const STATS = [
  { value: 3000, suffix: '+', label: 'Websites Generated', sub: 'Production-ready sites', decimals: 0 },
  { value: 0.2,  suffix: 's', label: 'Avg Deploy Time',    sub: 'From prompt to live',   decimals: 1 },
  { value: 99.7, suffix: '%', label: 'Uptime Guarantee',   sub: 'Enterprise reliability', decimals: 1 },
  { value: 4,    suffix: '',  label: 'AI Models',          sub: 'Working in harmony',     decimals: 0 },
]

function StatItem({ stat, started, index }: { stat: typeof STATS[0]; started: boolean; index: number }) {
  const val = useSmoothCount(stat.value, started, 1800, stat.decimals)
  return (
    <div className="text-center md:text-left"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}>
      <div className="text-[clamp(2.8rem,5vw,4rem)] font-black text-[#09090b] tracking-tight leading-none"
        style={{ fontVariantNumeric: 'tabular-nums' }}>
        {val.toFixed(stat.decimals)}{stat.suffix}
      </div>
      <div className="mt-2 text-[14px] font-bold text-[#09090b]">{stat.label}</div>
      <div className="mt-0.5 text-[12px] text-[#a1a1aa]">{stat.sub}</div>
    </div>
  )
}

export default function Stats() {
  const { ref, inView } = useInView(0.3)
  return (
    <section className="py-24 px-6" style={{ background: '#f2f2f3' }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} started={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
