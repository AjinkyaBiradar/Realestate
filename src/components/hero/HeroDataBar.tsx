"use client";

import { useViewingModal } from "@/context/ViewingModalContext";

export default function HeroDataBar() {
  const { openViewingModal } = useViewingModal();

  const stats = [
    {
      value: "from $800K",
      label: "turnkey",
    },
    {
      value: "420 m²",
      label: "two levels",
    },
    {
      value: "4 bedrooms",
      label: "2 · 4 · 5 to choose from",
    },
    {
      value: "40 minutes",
      label: "to the business district",
    },
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row xl:items-end justify-between gap-6 sm:gap-8 pt-2">
      {/* Stats and CTA Row */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-12">
        {/* 4 Stats */}
        {stats.map((stat) => (
          <div key={stat.value} className="flex flex-col">
            <span className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold tracking-tight text-white leading-tight font-sans">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5 tracking-normal">
              {stat.label}
            </span>
          </div>
        ))}

        {/* Stark White Button "Book a viewing" */}
        <div className="pt-2 sm:pt-0">
          <button
            onClick={() => openViewingModal()}
            className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] active:scale-95 shrink-0"
          >
            Book a viewing
          </button>
        </div>
      </div>

      {/* Far Right: SCROLL · THE HOUSE TURNS */}
      <div className="hidden xl:flex items-center gap-3 text-xs tracking-widest text-neutral-300 uppercase font-mono pb-2">
        <span>SCROLL · THE HOUSE TURNS</span>
        <span className="inline-block w-px h-5 bg-white/40" />
      </div>
    </div>
  );
}
