'use client';

import { ReactNode } from 'react'
import EnergyBadge from './EnergyBadge'
interface TaskCardProps {
  title: string
  description?: string
  duration: string
  subject?: string
  energyLevel: 'low' | 'med' | 'high'
  showCheckbox?: boolean
  showEditButton?: boolean
  onEdit?: () => void
  rightButton?: ReactNode
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
  isSelected?: boolean
}

export default function TaskCard({
  title,
  description,
  duration,
  subject,
  energyLevel,
  showCheckbox = false,
  showEditButton = false,
  onEdit,
  rightButton,
  checked = false,
  onCheckChange,
  isSelected = false,
}: TaskCardProps) {
  return (
    <div className={`bg-white border-[3px] rounded-[24px] p-5  ${
      isSelected ? 'border-[#AA78CD]' : 'border-black'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-black mb-2 leading-tight">{title}</h3>
          {description && (
            <p className="text-gray-500 text-sm mb-3 leading-relaxed">{description}</p>
          )}
          <p className="text-gray-500 text-sm mb-3">
            {duration} {subject && `| ${subject}`}
          </p>
          <div className="flex items-center gap-2">
            <EnergyBadge level={energyLevel} />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          {showCheckbox && (
            <button
              onClick={() => onCheckChange?.(!checked)}
              className={`w-8 h-8 border-[3px] border-black rounded-lg flex items-center justify-center transition-colors ${
                checked ? 'bg-black' : 'bg-white'
              }`}
              aria-label={checked ? 'Uncheck task' : 'Check task'}
            >
              {checked && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )}
          
          {showEditButton && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-[#39BAD1] text-black text-sm font-bold rounded-full border-[2px] border-black flex items-center gap-1.5 hover:bg-[#2da3ba] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10 1l3 3-8 8H2v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              EDIT
            </button>
          )}
          
          {rightButton}
        </div>
      </div>
    </div>
  )
}
