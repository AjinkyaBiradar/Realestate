"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Compass, Check } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { FloorPlanLevel } from "@/types";

const levels: FloorPlanLevel[] = [
  {
    id: "lower",
    name: "Lower Level",
    tagline: "Waterfront Living & Boathouse Integration",
    area: "340 m² Total Enclosure (plus 210 m² Dock)",
    elevation: "±0.00m Lake Water Level",
    description:
      "Engineered flush with the lake waterline. Features an expansive open-plan living pavilion with pocketing glass walls, sunken conversation hearth, professional Boffi kitchen, temperature-controlled subterranean wine room, and an enclosed dry boat slip with automated hydraulic lift.",
    rooms: [
      "Open Salon & Dining (135 m²)",
      "Boffi Kitchen & Back Scullery (48 m²)",
      "Subterranean Wine Cellar (22 m²)",
      "Enclosed Boathouse & Hydraulic Slip (65 m²)",
      "Lakeside Guest Suite with Ensuite (42 m²)",
      "Covered Exterior Dining & Barbeque Terrace (70 m²)",
    ],
    features: [
      "Floor-to-ceiling minimal frame sliding glass",
      "Seamless indoor-to-outdoor basalt flooring",
      "Direct water access from terrace steps",
      "Ceiling height: 3.40 meters clear",
    ],
  },
  {
    id: "upper",
    name: "Upper Level",
    tagline: "Cantilevered Master Sanctuary & Suites",
    area: "280 m² Total Enclosure",
    elevation: "+3.60m Elevated Vista",
    description:
      "A floating architectural volume projecting 6 meters past the lower facade toward the lake. Houses the primary master suite with private sunrise balcony, two guest suites with custom oak wardrobes, a skylit cantilevered library, and a family media salon.",
    rooms: [
      "Primary Master Suite (85 m²)",
      "Master Ensuite with Freestanding Tub (28 m²)",
      "Dual Walk-in Dressing Galleries (26 m²)",
      "Guest Suite II & III with Ensuites (72 m²)",
      "Cantilevered Library & Study (34 m²)",
      "Private Sunrise Balcony (35 m²)",
    ],
    features: [
      "Motorized external cedar privacy louvers",
      "Acoustically decoupled wall and ceiling construction",
      "Frameless skylights over primary corridors",
      "Ceiling height: 3.10 meters clear",
    ],
  },
  {
    id: "spa",
    name: "Spa & Wellness Pavilion",
    tagline: "Nordic Sauna & Shoreline Cold Plunge",
    area: "120 m² Dedicated Wellness",
    elevation: "-0.80m Shoreline Level",
    description:
      "A dedicated sanctuary carved into the granite rock face adjacent to the shoreline. Features an authentic Nordic dry cedar sauna overlooking the lake, a stone eucalyptus steam bath, an integrated ice cold plunge pool, relaxation lounge, and a fitness studio with private outdoor workout deck.",
    rooms: [
      "Nordic Dry Cedar Sauna (24 m²)",
      "Eucalyptus Steam Bath (16 m²)",
      "Sunken Granite Cold Plunge (12 m²)",
      "Lakeside Fitness & Yoga Studio (45 m²)",
      "Rainfall Treatment Showers & Changing (23 m²)",
    ],
    features: [
      "Direct transition from sauna to private lake plunge",
      "Integrated Finnish Harvia stone vaporizers",
      "Acoustic pine paneling and ambient chromotherapy",
      "Underfloor radiant warming throughout",
    ],
  },
];

export default function FloorPlanSection() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>("lower");
  const [isExploded, setIsExploded] = useState<boolean>(true);

  const currentLevel = levels.find((l) => l.id === selectedLevelId) || levels[0];

  return (
    <section id="floorplan" className="relative py-24 sm:py-32 bg-[#08080a] border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            number="03"
            tag="ARCHITECTURAL BREAKDOWN"
            title="Exploded Isometric Floor Plan"
            description="Inspect the spatial arrangement across three synchronized levels. Built to maximize thermal insulation, acoustic tranquility, and seamless waterfront transitions."
          />

          {/* Explode / Stack Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExploded(!isExploded)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-xs font-mono uppercase tracking-wider text-white transition-all shadow-sm"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? "Collapse Levels" : "Explode Levels"}</span>
            </button>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b border-white/10 pb-4">
          {levels.map((level) => {
            const active = level.id === selectedLevelId;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedLevelId(level.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-sm transition-all ${
                  active
                    ? "bg-white text-black font-semibold border-white shadow-lg"
                    : "bg-[#101014] text-neutral-400 border-white/10 hover:text-white hover:border-white/25"
                }`}
              >
                <span className="font-mono text-xs">{level.name}</span>
                <span className={`text-xs ${active ? "text-neutral-700" : "text-neutral-500"}`}>
                  {level.area.split(" ")[0]} m²
                </span>
              </button>
            );
          })}
        </div>

        {/* Split Layout: Level Details Left, Interactive Exploded Graphic Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Bulleted Text & Room Breakdown */}
          <div className="lg:col-span-5 space-y-6 bg-[#0f0f13] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>{currentLevel.elevation}</span>
                <span className="text-white font-semibold">{currentLevel.area}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentLevel.name}
              </h3>
              <p className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                {currentLevel.tagline}
              </p>
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              {currentLevel.description}
            </p>

            {/* Room Breakdown Bullets */}
            <div className="border-t border-white/10 pt-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Programmatic Layout
              </h4>
              <ul className="space-y-2">
                {currentLevel.rooms.map((room, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                    <span>{room}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Specs Bullets */}
            <div className="border-t border-white/10 pt-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Engineering & Finish Features
              </h4>
              <ul className="space-y-2">
                {currentLevel.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-neutral-300"
                  >
                    <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Exploded Isometric Graphic */}
          <div className="lg:col-span-7 relative bg-[#09090c] border border-white/10 rounded-2xl p-6 sm:p-10 flex flex-col justify-between min-h-[580px] overflow-hidden">
            {/* Architectural Grid & Compass */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
                <Compass className="w-4 h-4 text-white" />
                <span>North Elevation View • Scale 1:100</span>
              </div>
              <span className="font-mono text-[11px] text-neutral-500 uppercase">
                {isExploded ? "Exploded Isometric State" : "Stacked Architectural State"}
              </span>
            </div>

            {/* Isometric Graphic Canvas / SVG Stack */}
            <div className="relative z-10 my-8 flex items-center justify-center min-h-[380px]">
              <div className="relative w-full max-w-lg aspect-[4/3] flex flex-col justify-center items-center">
                {/* Level 3: Upper Level */}
                <motion.div
                  animate={{
                    y: isExploded ? -75 : 0,
                    opacity: selectedLevelId === "upper" || isExploded ? 1 : 0.45,
                    scale: selectedLevelId === "upper" ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setSelectedLevelId("upper")}
                  className={`w-full max-w-sm rounded-xl p-5 border cursor-pointer transition-colors shadow-2xl ${
                    selectedLevelId === "upper"
                      ? "bg-[#18181f] border-white text-white ring-1 ring-white"
                      : "bg-[#111116] border-white/15 text-neutral-400 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      Level 02: Upper Cantilevered Sanctuary
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                      280 m²
                    </span>
                  </div>
                  {/* Schematic Isometric Floor Plate Wireframe */}
                  <div className="h-20 w-full rounded border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-around px-2 text-[10px] font-mono">
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Master Suite
                    </div>
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Skylit Library
                    </div>
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Guest Wings
                    </div>
                  </div>
                </motion.div>

                {/* Level 2: Lower Level */}
                <motion.div
                  animate={{
                    y: isExploded ? 0 : 0,
                    opacity: selectedLevelId === "lower" || isExploded ? 1 : 0.45,
                    scale: selectedLevelId === "lower" ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setSelectedLevelId("lower")}
                  className={`w-full max-w-sm rounded-xl p-5 border cursor-pointer transition-colors shadow-2xl my-2 ${
                    selectedLevelId === "lower"
                      ? "bg-[#18181f] border-white text-white ring-1 ring-white"
                      : "bg-[#111116] border-white/15 text-neutral-400 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      Level 01: Living Pavilion & Boathouse
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                      340 m²
                    </span>
                  </div>
                  <div className="h-20 w-full rounded border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-around px-2 text-[10px] font-mono">
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Open Salon
                    </div>
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Boffi Kitchen
                    </div>
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Boathouse Slip
                    </div>
                  </div>
                </motion.div>

                {/* Level 1: Spa & Shoreline Deck */}
                <motion.div
                  animate={{
                    y: isExploded ? 75 : 0,
                    opacity: selectedLevelId === "spa" || isExploded ? 1 : 0.45,
                    scale: selectedLevelId === "spa" ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setSelectedLevelId("spa")}
                  className={`w-full max-w-sm rounded-xl p-5 border cursor-pointer transition-colors shadow-2xl ${
                    selectedLevelId === "spa"
                      ? "bg-[#18181f] border-white text-white ring-1 ring-white"
                      : "bg-[#111116] border-white/15 text-neutral-400 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      Sub-Level: Nordic Spa & Wellness Deck
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                      120 m²
                    </span>
                  </div>
                  <div className="h-20 w-full rounded border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-around px-2 text-[10px] font-mono">
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Cedar Sauna
                    </div>
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Cold Plunge
                    </div>
                    <div className="text-center p-1 border border-white/10 rounded bg-white/5">
                      Lakeside Pier
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-neutral-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Selected: {currentLevel.name}</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                Click any layer above to inspect specifications
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

