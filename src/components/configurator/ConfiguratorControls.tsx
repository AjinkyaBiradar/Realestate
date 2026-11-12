"use client";

import { FinishType, BedroomCount, TimeOfDay } from "@/types";
import { Sun, Sunset, Moon, Check, ArrowRight, SlidersHorizontal } from "lucide-react";

interface ConfiguratorControlsProps {
  finish: FinishType;
  onChangeFinish: (f: FinishType) => void;
  bedrooms: BedroomCount;
  onChangeBedrooms: (b: BedroomCount) => void;
  timeOfDay: TimeOfDay;
  onChangeTimeOfDay: (t: TimeOfDay) => void;
  onRequestViewingWithConfig: () => void;
}

export default function ConfiguratorControls({
  finish,
  onChangeFinish,
  bedrooms,
  onChangeBedrooms,
  timeOfDay,
  onChangeTimeOfDay,
  onRequestViewingWithConfig,
}: ConfiguratorControlsProps) {
  // Dynamically calculate metrics based on bedroom count
  const metrics = {
    3: {
      area: "520 m²",
      suites: "3 Master Suites",
      baths: "4 Bathrooms",
      price: "$3,850,000",
      dossierCode: "LH-MOD-3S",
    },
    4: {
      area: "620 m²",
      suites: "4 Master Suites",
      baths: "5 Bathrooms",
      price: "$4,250,000",
      dossierCode: "LH-MOD-4S",
    },
    5: {
      area: "740 m²",
      suites: "5 Master Suites + Penthouse",
      baths: "6 Bathrooms",
      price: "$4,790,000",
      dossierCode: "LH-MOD-5S",
    },
  }[bedrooms];

  const finishes: { id: FinishType; label: string; desc: string; previewColor: string }[] = [
    {
      id: "white",
      label: "White Stucco",
      desc: "Pure off-white alpine plaster with dark bronze mullions",
      previewColor: "#f3f3f3",
    },
    {
      id: "dark",
      label: "Charred Shou Sugi Ban",
      desc: "Blackened Japanese flame-treated cedar with deep grain",
      previewColor: "#17171a",
    },
    {
      id: "wood",
      label: "Natural Nordic Cedar",
      desc: "Sustainably harvested horizontal thermal timber slats",
      previewColor: "#8e5b3b",
    },
    {
      id: "concrete",
      label: "Architectural Concrete",
      desc: "Smooth tie-rod cast concrete with raw tactile patina",
      previewColor: "#73757a",
    },
  ];

  const bedroomOptions: BedroomCount[] = [3, 4, 5];

  const timesOfDay: { id: TimeOfDay; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "day", label: "Daylight", icon: Sun },
    { id: "dusk", label: "Sunset", icon: Sunset },
    { id: "night", label: "Midnight", icon: Moon },
  ];

  return (
    <div className="flex flex-col justify-between h-full space-y-8 bg-[#0b0b0e] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
      <div className="space-y-8">
        {/* Module Header */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Architectural Parameter Controller</span>
            </span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase">
              {metrics.dossierCode}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Custom Specification
          </h3>
        </div>

        {/* 1. Finish Selection */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            Exterior Facade Finish
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {finishes.map((f) => {
              const active = finish === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onChangeFinish(f.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    active
                      ? "bg-white/10 border-white text-white shadow-lg shadow-black/50"
                      : "bg-[#141418] border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: f.previewColor }}
                    />
                    {active && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-tight text-white">
                      {f.label}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-light mt-0.5 line-clamp-1">
                      {f.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Bedrooms Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400">
              Bedroom Modules & Wings
            </label>
            <span className="text-xs font-mono text-neutral-300">
              {metrics.suites}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {bedroomOptions.map((count) => {
              const active = bedrooms === count;
              return (
                <button
                  key={count}
                  onClick={() => onChangeBedrooms(count)}
                  className={`py-3.5 px-3 rounded-xl border text-center transition-all ${
                    active
                      ? "bg-white text-black font-bold border-white shadow-md"
                      : "bg-[#141418] text-neutral-300 border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  <div className="text-lg font-bold tracking-tight">
                    {count}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                    Bedrooms
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Time of Day / Ambient Light */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            Solar Orientation & Ambience
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timesOfDay.map((t) => {
              const Icon = t.icon;
              const active = timeOfDay === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onChangeTimeOfDay(t.id)}
                  className={`py-2.5 px-2 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                    active
                      ? "bg-white/15 border-white/40 text-white font-medium"
                      : "bg-[#141418] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Architectural Metrics Box */}
        <div className="bg-[#121216] border border-white/10 rounded-xl p-4.5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
            <span className="text-neutral-400">Total Enclosed Area</span>
            <span className="text-white font-semibold">{metrics.area}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
            <span className="text-neutral-400">Master Suites</span>
            <span className="text-white font-semibold">{metrics.suites}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
            <span className="text-neutral-400">Estimated Turnkey Cost</span>
            <span className="text-white font-bold">{metrics.price}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-neutral-500">
            <span>Includes 210 m² dock & pool</span>
            <span className="text-emerald-400">Permit Approved</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2">
        <button
          onClick={onRequestViewingWithConfig}
          className="w-full py-4 px-6 rounded-xl bg-white text-black font-semibold text-sm tracking-wide uppercase hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2 group"
        >
          <span>Save Configuration & Book Tour</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

