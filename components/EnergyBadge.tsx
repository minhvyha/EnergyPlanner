interface EnergyBadgeProps {
  level: 'low' | 'med' | 'high'
}

export default function EnergyBadge({ level }: EnergyBadgeProps) {
  const config = {
    low: {
      bg: 'bg-[#95E9C1]',
      text: 'text-[#95E9C1]',
      label: 'LOW',
    },
    med: {
      bg: 'bg-[#FDE047]',
      text: 'text-[#FDE047]',
      label: 'MED',
    },
    high: {
      bg: 'bg-[#FF5A7C]',
      text: 'text-[#FF5A7C]',
      label: 'HIGH',
    },
  }

  const { bg, text, label } = config[level]

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${bg} border-[2px] border-black rounded-full`}
    >
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
        <path d="M6.5 1L1 8h5l-.5 5 5.5-7H6l.5-5z" fill="currentColor" className={text} />
      </svg>
      <span className="text-xs font-bold text-black tracking-wide">{label}</span>
    </div>
  )
}
