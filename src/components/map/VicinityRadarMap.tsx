"use client";

import { useState } from "react";

export type LocationCategory = "all" | "aviation" | "wellness" | "dining" | "civic";

interface Hotspot {
  id: string;
  name: string;
  category: "aviation" | "wellness" | "dining" | "civic";
  driveTime: string;
  flightTime?: string;
  distance: string;
  x: number; // percentage in radar 0-100
  y: number; // percentage in radar 0-100
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "heliport",
    name: "Archipelago Private Heliport & Seaplanes",
    category: "aviation",
    driveTime: "12 min",
    flightTime: "3 min flight",
    distance: "14 km",
    x: 68,
    y: 32,
    description: "Dedicated tarmac with helicopter charter, seaplane dock, and executive lounge.",
  },
  {
    id: "pier",
    name: "KAIROS Deep-Water Marine Pier",
    category: "aviation",
    driveTime: "0 min",
    distance: "0 m",
    x: 50,
    y: 50,
    description: "Private 120-meter deep-water cedar pier with yacht moorings and electric boat charging.",
  },
  {
    id: "hotsprings",
    name: "Geothermal Mineral Hot Springs",
    category: "wellness",
    driveTime: "8 min",
    distance: "7 km",
    x: 36,
    y: 62,
    description: "Natural thermal pools, traditional wood-fired smoke saunas, and hydrotherapy.",
  },
  {
    id: "yachtclub",
    name: "Archipelago Yacht & Country Club",
    category: "wellness",
    driveTime: "15 min",
    flightTime: "5 min flight",
    distance: "18 km",
    x: 28,
    y: 28,
    description: "18-hole championship pine-lined links and full-service private marina.",
  },
  {
    id: "michelin",
    name: "Restaurant Solsken (3★ Michelin)",
    category: "dining",
    driveTime: "22 min",
    distance: "26 km",
    x: 74,
    y: 68,
    description: "World-renowned hyper-local Nordic foraging and culinary tasting experiences.",
  },
  {
    id: "vineyard",
    name: "Nordic Heritage Organic Estate",
    category: "dining",
    driveTime: "18 min",
    distance: "21 km",
    x: 82,
    y: 44,
    description: "Cold-climate organic viticulture, biodynamic cider press, and private cellar club.",
  },
  {
    id: "cbd",
    name: "Capital Financial & Tech District",
    category: "civic",
    driveTime: "35 min",
    flightTime: "11 min flight",
    distance: "42 km",
    x: 18,
    y: 78,
    description: "Rapid direct highway transit to international embassies and corporate headquarters.",
  },
  {
    id: "medical",
    name: "Private Specialty Medical Center",
    category: "civic",
    driveTime: "14 min",
    distance: "16 km",
    x: 42,
    y: 22,
    description: "Comprehensive 24/7 private concierge medical care and emergency heli-evac facility.",
  },
];

export default function VicinityRadarMap() {
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory>("all");
  const [activeSpot, setActiveSpot] = useState<Hotspot>(HOTSPOTS[0]);

  const filteredSpots =
    selectedCategory === "all"
      ? HOTSPOTS
      : HOTSPOTS.filter((h) => h.category === selectedCategory);

  return (
    <div className="radar-map" aria-label="Interactive Vicinity Radar Map">
      {/* Category Filter Chips */}
      <div className="radar-map__filters" role="group" aria-label="Filter locations by type">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`radar-filter ${selectedCategory === "all" ? "radar-filter--active" : ""}`}
        >
          All Points ({HOTSPOTS.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("aviation")}
          className={`radar-filter ${selectedCategory === "aviation" ? "radar-filter--active" : ""}`}
        >
          Aviation &amp; Marine
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("wellness")}
          className={`radar-filter ${selectedCategory === "wellness" ? "radar-filter--active" : ""}`}
        >
          Wellness &amp; Sport
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("dining")}
          className={`radar-filter ${selectedCategory === "dining" ? "radar-filter--active" : ""}`}
        >
          Gastronomy
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("civic")}
          className={`radar-filter ${selectedCategory === "civic" ? "radar-filter--active" : ""}`}
        >
          Business &amp; Health
        </button>
      </div>

      <div className="radar-map__body">
        {/* Radar Graphic Viewport */}
        <div className="radar-viewport">
          <svg
            className="radar-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Concentric distance range rings */}
            <circle cx="50" cy="50" r="15" className="radar-ring" />
            <circle cx="50" cy="50" r="28" className="radar-ring" />
            <circle cx="50" cy="50" r="42" className="radar-ring" />

            {/* Crosshairs */}
            <line x1="50" y1="5" x2="50" y2="95" className="radar-axis" />
            <line x1="5" y1="50" x2="95" y2="50" className="radar-axis" />

            {/* Sweep Beam Scanner */}
            <line x1="50" y1="50" x2="95" y2="25" className="radar-sweep" />

            {/* Range markers */}
            <text x="51" y="36" className="radar-label">15 KM</text>
            <text x="51" y="23" className="radar-label">30 KM</text>
            <text x="51" y="9" className="radar-label">45 KM</text>
          </svg>

          {/* Center Origin: KAIROS */}
          <div
            className="radar-origin"
            style={{ left: "50%", top: "50%" }}
            title="KAIROS · Lakeside Sanctuary (Origin)"
          >
            <span className="radar-origin__ping" />
            <span className="radar-origin__dot" />
            <span className="radar-origin__tag">KAIROS (You Are Here)</span>
          </div>

          {/* Interactive Hotspot Markers */}
          {filteredSpots.map((spot) => {
            const isSelected = activeSpot.id === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveSpot(spot)}
                className={`radar-pin ${isSelected ? "radar-pin--selected" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                aria-label={`${spot.name} (${spot.driveTime} drive)`}
              >
                <span className="radar-pin__beacon" />
                <span className="radar-pin__core" />
                <span className="radar-pin__title">{spot.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Location Telemetry Card */}
        <div className="radar-card" role="region" aria-live="polite">
          <div className="radar-card__category">
            {activeSpot.category.toUpperCase()} · RANGE {activeSpot.distance}
          </div>
          <h3 className="radar-card__name">{activeSpot.name}</h3>
          <p className="radar-card__desc">{activeSpot.description}</p>

          <div className="radar-card__metrics">
            <div className="radar-metric">
              <span className="radar-metric__label">Drive Time</span>
              <span className="radar-metric__val">{activeSpot.driveTime}</span>
            </div>
            {activeSpot.flightTime && (
              <div className="radar-metric">
                <span className="radar-metric__label">Helicopter Transit</span>
                <span className="radar-metric__val">{activeSpot.flightTime}</span>
              </div>
            )}
            <div className="radar-metric">
              <span className="radar-metric__label">Radial Distance</span>
              <span className="radar-metric__val">{activeSpot.distance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
