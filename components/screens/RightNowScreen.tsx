"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import EnergyUpdateModal from "@/components/modals/EnergyUpdateModal";
import { storage, type Task } from "@/lib/storage";
import { BatteryLow, BatteryMedium, BatteryFull } from "lucide-react";

const ENERGY_MAP = { LOW: "low", MED: "med", HIGH: "high" } as const;
type EnergyState = "LOW" | "MED" | "HIGH";

export default function RightNowScreen() {
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<EnergyState>("LOW");
  const [suggestedTasks, setSuggestedTasks] = useState<Task[]>([]);

  // Load energy level once on mount and normalize value from storage
  useEffect(() => {
    const stored = storage.getEnergyLevels();
    if (stored) {
      // Normalize stored.level to uppercase if needed
      const raw = (stored.level ?? stored).toString();
      const normalized = raw.toUpperCase();
      if (
        normalized === "LOW" ||
        normalized === "MED" ||
        normalized === "HIGH"
      ) {
        setEnergyLevel(normalized as EnergyState);
      } else {
        // fallback if storage uses lowercase strings 'low','med','high'
        if (raw === "low" || raw === "med" || raw === "high") {
          setEnergyLevel(raw.toUpperCase() as EnergyState);
        }
      }
    }
  }, []); // run only once

  // Recompute suggested tasks whenever energyLevel changes
  useEffect(() => {
    const allTasks = storage.getTasks();
    const filtered = allTasks.filter(
      (task) => task.energyLevel === ENERGY_MAP[energyLevel] && !task.inFocus,
    );
    setSuggestedTasks(filtered.slice(0, 5));
  }, [energyLevel]);

  return (
    <>
      <div>
        <Header />
        <div className="px-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-black">Right Now</h2>
          </div>

          {/* Energy Level Card */}
          <div className="bg-white border-[3px] border-black rounded-[24px] p-5 mb-6 ">
            <p className="text-[#909090]  font-medium mb-2">
              Current Energy Level
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-3xl font-bold text-black">
                    {energyLevel}
                  </h3>
                  {energyLevel === "LOW" && (
                    <BatteryLow className="text-[#FF5A7C]" size={28} />
                  )}
                  {energyLevel === "MED" && (
                    <BatteryMedium className="text-[#FDE047]" size={28} />
                  )}
                  {energyLevel === "HIGH" && (
                    <BatteryFull className="text-[#95E9C1]" size={28} />
                  )}
                </div>
                <p className="text-[#909090] ">Take it easy today</p>
              </div>
              <button
                onClick={() => setShowEnergyModal(true)}
                className="flex items-center gap-2 text-black font-bold hover:opacity-70 transition-opacity"
              >
                <span className="">
                  Tap to <br />
                  update
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Focus Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-2">
              Focus for this energy:
            </h3>
            <p className="text-gray-600 text-lg">Light review and admin</p>
          </div>

          {/* Suggested Tasks */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">
              Suggested Tasks
            </h3>
            {suggestedTasks.length === 0 ? (
              <p className="text-gray-500 text-center ">
                No tasks available. Create tasks in the Task Library to see
                suggestions here.
              </p>
            ) : (
              <div className="space-y-4">
                {suggestedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border-[3px] border-black rounded-[24px] p-5 "
                  >
                    <h4 className="text-lg font-bold text-black mb-2">
                      {task.title}
                    </h4>
                    <p className="text-gray-500 text-sm mb-3">
                      {task.duration} {task.subject && `| ${task.subject}`}
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${
                          task.energyLevel === "low"
                            ? "bg-[#95E9C1]"
                            : task.energyLevel === "med"
                              ? "bg-[#FDE047]"
                              : "bg-[#FF5A7C]"
                        } border-[2px] border-black rounded-full`}
                      >
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 12 14"
                          fill="none"
                        >
                          <path
                            d="M6.5 1L1 8h5l-.5 5 5.5-7H6l.5-5z"
                            fill="currentColor"
                            className={
                              task.energyLevel === "low"
                                ? "text-[#95E9C1]"
                                : task.energyLevel === "med"
                                  ? "text-[#FDE047]"
                                  : "text-[#FF5A7C]"
                            }
                          />
                        </svg>
                        <span className="text-xs font-bold text-black tracking-wide">
                          {task.energyLevel.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          storage.updateTask(task.id, { inFocus: true });
                          setSuggestedTasks(
                            suggestedTasks.filter((t) => t.id !== task.id),
                          );
                        }}
                        className="px-4 py-2 bg-[#AA78CD] text-white text-sm font-bold rounded-full border-[2px] border-black hover:bg-[#9966bb] transition-colors"
                      >
                        + Add to My Focus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {showEnergyModal && (
        <EnergyUpdateModal
          onClose={() => setShowEnergyModal(false)}
          onUpdate={(level) => {
            // just update energy level; suggested tasks are handled by the effect above
            setEnergyLevel(level);
            setShowEnergyModal(false);
          }}
        />
      )}
    </>
  );
}
