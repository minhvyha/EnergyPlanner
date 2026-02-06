"use client";

import { useState } from "react";

interface SortModalProps {
  onClose: () => void;
}

export default function SortModal({ onClose }: SortModalProps) {
  const [sortBy, setSortBy] = useState<"date" | "energy" | "duration">("date");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black rounded-2xl p-6 w-full max-w-sm ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Sort By</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${
                sortBy === "date" ? "bg-[#95E9C1]" : "bg-white"
              }`}
            ></div>
            <span className="text-xl font-bold text-black">Date Added</span>
            <input
              type="radio"
              name="sortBy"
              value="date"
              checked={sortBy === "date"}
              onChange={(e) => setSortBy(e.target.value as "date")}
              className="sr-only"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${
                sortBy === "energy" ? "bg-[#95E9C1]" : "bg-white"
              }`}
            ></div>
            <span className="text-xl font-bold text-black">Energy Level</span>
            <input
              type="radio"
              name="sortBy"
              value="energy"
              checked={sortBy === "energy"}
              onChange={(e) => setSortBy(e.target.value as "energy")}
              className="sr-only"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${
                sortBy === "duration" ? "bg-[#95E9C1]" : "bg-white"
              }`}
            ></div>
            <span className="text-xl font-bold text-black">Task Duration</span>
            <input
              type="radio"
              name="sortBy"
              value="duration"
              checked={sortBy === "duration"}
              onChange={(e) => setSortBy(e.target.value as "duration")}
              className="sr-only"
            />
          </label>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setOrder("asc")}
            className={`flex-1 py-2.5 px-4 rounded-[10px] border-[3px] border-black font-bold  ${
              order === "asc"
                ? "bg-[#95E9C1] text-black"
                : "bg-white text-black "
            }`}
          >
            Ascending
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`flex-1 py-2.5 px-4 rounded-[10px] border-[3px] border-black font-bold  ${
              order === "desc"
                ? "bg-[#95E9C1] text-black"
                : "bg-white text-black "
            }`}
          >
            Descending
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#FFF8D3] text-lg text-black font-bold py-3.5 px-6 rounded-[10px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
