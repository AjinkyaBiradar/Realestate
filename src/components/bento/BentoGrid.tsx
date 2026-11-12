"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { BentoItem } from "@/types";

const bentoItems: BentoItem[] = [
  {
    id: "cantilever",
    title: "Cantilevered Living Pavilion",
    subtitle: "Ground Floor • Lake Edge",
    tag: "Architecture",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    aspectClass: "h-[380px] sm:h-[460px]",
    colSpanClass: "lg:col-span-8",
    description:
      "A monumental 6-meter cantilevered concrete and glass structure floating effortlessly over the water. Triple-insulated thermal glass panels slide into concealed wall pockets, removing all barriers between the salon and the lake.",
    specs: ["180 m² open salon", "3.4m ceiling height", "Automated pocket sliding glass"],
  },
  {
    id: "dock",
    title: "Private Pier & Boathouse",
    subtitle: "Lakeside • North Berth",
    tag: "Waterfront",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    aspectClass: "h-[380px] sm:h-[460px]",
    colSpanClass: "lg:col-span-4",
    description:
      "Custom sustainable teak dock accommodating craft up to 40 feet. Includes submerged hydraulic boat lift, concealed electrical charging pedestals, and atmospheric low-level LED guide lighting.",
    specs: ["40 ft craft berth", "Hydraulic lift system", "Shore power integration"],
  },
  {
    id: "master",
    title: "Primary Master Sanctuary",
    subtitle: "Upper Level • South Vista",
    tag: "Interior",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    aspectClass: "h-[360px] sm:h-[400px]",
    colSpanClass: "lg:col-span-4",
    description:
      "A peaceful upper retreat oriented directly toward morning alpine sunlight. Features an acoustically decoupled ceiling, walk-in dressing suite, and an open freestanding soaking tub facing the water.",
    specs: ["85 m² suite footprint", "Acoustically isolated", "Travertine ensuite bath"],
  },
  {
    id: "sauna",
    title: "Nordic Cedar Sauna & Spa",
    subtitle: "Sub-Level • Shoreline",
    tag: "Wellness",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80",
    aspectClass: "h-[360px] sm:h-[400px]",
    colSpanClass: "lg:col-span-4",
    description:
      "Custom thermo-treated Nordic aspen and cedar sauna with glass wall opening directly to private lake steps. Features an automated Finnish stone heater and adjacent ice cold plunge bath.",
    specs: ["Thermo-treated cedar", "Direct cold plunge", "Integrated aromatherapy"],
  },
  {
    id: "pool",
    title: "Lakeside Infinity Mirror Pool",
    subtitle: "Exterior Deck • West",
    tag: "Terrace",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80",
    aspectClass: "h-[360px] sm:h-[400px]",
    colSpanClass: "lg:col-span-4",
    description:
      "A 20-meter heated negative-edge pool tiled in dark Vals quartzite. The pool's surface aligns flush with the lake's horizon, creating a seamless visual reflection of the sky and water.",
    specs: ["20m heated lap length", "Vals quartzite stone", "Saltwater ionization"],
  },
  {
    id: "lounge",
    title: "Sunken Blackened Steel Fire Lounge",
    subtitle: "Central Salon • Hearth",
    tag: "Interior",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    aspectClass: "h-[380px] sm:h-[440px]",
    colSpanClass: "lg:col-span-8",
    description:
      "An intimate conversation pit centered around a custom dual-sided Austrian blackened steel suspended fireplace. Flanked by floor-to-ceiling brushed oak bookshelves and concealed wine storage.",
    specs: ["Dual-sided fireplace", "Integrated wine vault", "Brushed oak millwork"],
  },
];

export default function BentoGrid() {
  const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterCategories = ["All", "Architecture", "Interior", "Waterfront", "Wellness"];

  const filteredItems =
    activeFilter === "All"
      ? bentoItems
      : bentoItems.filter((item) => item.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="perspectives" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            number="01"
            tag="PERSPECTIVES"
            title="The house from every side"
            description="A harmonious dialogue between heavy granite podiums, lightweight floating timber volumes, and floor-to-ceiling glass pavilions."
          />

          {/* Minimal Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  activeFilter === cat
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d10] cursor-pointer transition-all duration-300 hover:border-white/30 hover:shadow-[0_10px_35px_rgba(0,0,0,0.7)] ${item.colSpanClass} ${item.aspectClass}`}
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Gradient Vignettes for clean readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity group-hover:via-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

              {/* Top Tag & Enlarge Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  {item.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Clean Readable Text Overlaid at Bottom Left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1">
                  {item.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300/80 font-light line-clamp-2 max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
              onClick={() => setSelectedItem(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0f0f12] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full md:w-3/5 h-64 md:h-auto min-h-[300px]">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    <span>{selectedItem.tag}</span>
                    <span>•</span>
                    <span>{selectedItem.subtitle}</span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {selectedItem.title}
                  </h3>

                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {selectedItem.specs && (
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                        Architectural Highlights
                      </span>
                      {selectedItem.specs.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-2 text-xs text-neutral-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-2.5 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

