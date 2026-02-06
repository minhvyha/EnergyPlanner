import { Zap } from "lucide-react"

interface EnergyBadgeProps {
  level: 'low' | 'med' | 'high'
}

export default function EnergyBadge({ level }: EnergyBadgeProps) {
  const config = {
    low: {
      bg: 'bg-[#E0FFF0]',
      text: 'text-[#95E9C1]',
      label: 'LOW',
    },
    med: {
      bg: 'bg-[#FFF8D3]',
      text: 'text-[#FDE047]',
      label: 'MED',
    },
    high: {
      bg: 'bg-[#FFE2E8]',
      text: 'text-[#FF5A7C]',
      label: 'HIGH',
    },
  }

  const { bg, text, label } = config[level]

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${bg} border-[2px] border-black rounded-full`}
    >
      <Zap size={16} className={text} />
      <span className={`font-bold ${text} tracking-wide`} >{label}</span>
    </div>
  )
}
