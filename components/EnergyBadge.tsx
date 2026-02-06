import BoltIcon from '@mui/icons-material/Bolt';
interface EnergyBadgeProps {
  level: 'low' | 'med' | 'high'
}

export default function EnergyBadge({ level }: EnergyBadgeProps) {
  const config = {
    low: {
      bg: 'bg-[#E0FFF0]',
      text: 'text-[#95E9C1]',
      iconColor: '#95E9C1',
      label: 'LOW',
    },
    med: {
      bg: 'bg-[#FFF8D3]',
      text: 'text-[#FDE047]',
      iconColor: '#FDE047',
      label: 'MED',
    },
    high: {
      bg: 'bg-[#FFE2E8]',
      text: 'text-[#FF5A7C]',
      iconColor: '#FF5A7C',
      label: 'HIGH',
    },
  }

  const { bg, text, label } = config[level]

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${bg} border-3 rounded-full`}
      style={{ borderColor: config[level].iconColor }}
    >
      <BoltIcon style={{ color: config[level].iconColor }} fontSize="small" />
      <span className={`font-bold ${text} tracking-wide`} >{label}</span>
    </div>
  )
}
