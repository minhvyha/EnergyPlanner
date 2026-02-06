"use client";

import { ReactNode } from "react";
import EnergyBadge from "./EnergyBadge";
import { SquarePen } from "lucide-react";
interface TaskCardProps {
  title: string;
  description?: string;
  duration: string;
  subject?: string;
  energyLevel: "low" | "med" | "high";
  showCheckbox?: boolean;
  showEditButton?: boolean;
  onEdit?: () => void;
  rightButton?: ReactNode;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  isSelected?: boolean;
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
    <div
      className={`bg-white border-[3px] rounded-2xl p-5  ${
        isSelected ? "border-[#AA78CD]" : "border-black"
      }`}
    >
      <div className="flex flex-col items-start justify-between gap-2">
        <div className="flex-1 w-full">
          <h3 className="text-lg font-bold text-black mb-2 leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-[#909090]  mb-2 leading-relaxed">
              {description}
            </p>
          )}
          <p className="text-[#909090] font-bold mb-2">
            {duration} {subject && `| ${subject}`}
          </p>
        </div>

        <div className="flex flex-row justify-between flex-1 w-full gap-2 items-end">
          <div className="flex items-center gap-2">
            <EnergyBadge level={energyLevel} />
          </div>
          {showCheckbox && (
            <button
              onClick={() => onCheckChange?.(!checked)}
              className={`w-8 h-8 border-[3px] border-black rounded-lg flex items-center justify-center transition-colors ${
                checked ? "bg-black" : "bg-white"
              }`}
              aria-label={checked ? "Uncheck task" : "Check task"}
            >
              {checked && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8l3 3 7-7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}

          {showEditButton && (
            <button
              onClick={onEdit}
              className="px-2 py-1.5 border-[#39BAD1] bg-[#D3F8FF] text-[#39BAD1]  font-bold rounded-full border-[3px]  flex items-center gap-1.5 hover:bg-[#2da3ba] transition-colors"
            >
              <SquarePen color="#39BAD1" strokeWidth={3} size={16} />
              EDIT
            </button>
          )}

          {rightButton}
        </div>
      </div>
    </div>
  );
}
