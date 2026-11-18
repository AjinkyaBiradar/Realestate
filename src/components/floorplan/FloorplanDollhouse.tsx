"use client";

import { useState } from "react";

interface Hotspot {
  id: string;
  name: string;
  level: 1 | 2;
  area: string;
  ceiling: string;
  finish: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
}

const DOLLHOUSE_HOTSPOTS: Hotspot[] = [
  {
    id: "deck",
    name: "Cantilevered Lake Deck",
    level: 1,
    area: "96 m²",
    ceiling: "Open Sky",
    finish: "Nordic Kebony & Concealed Granite Pylons",
    x: 28,
    y: 72,
    description: "Hovering directly above the waterline with an infinity sheet of mirror lake water cascading off the outer rim.",
  },
  {
    id: "greatroom",
    name: "Double-Height Great Room",
    level: 1,
    area: "88 m²",
    ceiling: "6.4 m Double Height",
    finish: "Smoked European Oak & Blackened Steel Hearth",
    x: 48,
    y: 54,
    description: "Monolithic hearth, acoustic clay plaster walls with hidden flush speakers, and 12-meter motorized low-iron sliding glass.",
  },
  {
    id: "kitchen",
    name: "Quartzite Island Kitchen",
    level: 1,
    area: "42 m²",
    ceiling: "3.2 m Clear",
    finish: "Flamed Basalt & Matte Smoked Oak",
    x: 68,
    y: 42,
    description: "Single-block 4.2m island with integrated Gaggenau induction, hidden scullery pantry, and wine cellar refrigeration.",
  },
  {
    id: "master",
    name: "Master Penthouse Suite",
    level: 2,
    area: "64 m²",
    ceiling: "3.4 m Sloped",
    finish: "Natural Larch, Concealed Dressing Suite",
    x: 52,
    y: 30,
    description: "Elevated above the pine tree canopy with 180° panoramic water views and morning sunrise orientation.",
  },
  {
    id: "sauna",
    name: "Hydrotherapy Spa & Finnish Sauna",
    level: 2,
    area: "32 m²",
    ceiling: "3.0 m",
    finish: "Thermo-Aspen & Honed Granite",
    x: 74,
    y: 26,
    description: "Traditional wood-burning Finnish sauna heater, cold plunge pool, and frameless glass overlooking the lake mist.",
  },
];

export default function FloorplanDollhouse() {
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(DOLLHOUSE_HOTSPOTS[0]);

  const levelSpots = DOLLHOUSE_HOTSPOTS.filter((h) => h.level === activeLevel);

  return (
    <div className="dollhouse" aria-label="3D Isometric Dollhouse Floorplan">
      {/* Level Selector & Telemetry Bar */}
      <div className="dollhouse__bar">
        <div className="dollhouse__tabs" role="tablist" aria-label="Select architectural level">
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === 1}
            onClick={() => {
              setActiveLevel(1);
              setActiveHotspot(DOLLHOUSE_HOTSPOTS[0]);
            }}
            className={`dollhouse__tab ${activeLevel === 1 ? "dollhouse__tab--active" : ""}`}
          >
            Level 1 · Ground Pavilion (219 m²)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === 2}
            onClick={() => {
              setActiveLevel(2);
              setActiveHotspot(DOLLHOUSE_HOTSPOTS[3]);
            }}
            className={`dollhouse__tab ${activeLevel === 2 ? "dollhouse__tab--active" : ""}`}
          >
            Level 2 · Sky Pavilion (201 m²)
          </button>
        </div>

        <div className="dollhouse__badge">
          <span className="dollhouse__badge-dot" />
          <span>3D Isometric Spatial Cutaway</span>
        </div>
      </div>

      <div className="dollhouse__stage">
        {/* Stylized Architectural Cutaway Visualizer */}
        <div className="dollhouse__isometric">
          <svg
            className="dollhouse__svg"
            viewBox="0 0 800 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e222a" />
                <stop offset="100%" stopColor="#12151b" />
              </linearGradient>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.25)" />
                <stop offset="100%" stopColor="rgba(96, 165, 250, 0.05)" />
              </linearGradient>
              <linearGradient id="timberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2c2722" />
                <stop offset="100%" stopColor="#1c1916" />
              </linearGradient>
            </defs>

            {/* Isometric Ground Base / Water Surface */}
            <polygon points="400,80 720,240 400,400 80,240" fill="url(#groundGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <polygon points="400,400 720,240 720,260 400,420" fill="#0d0f14" />
            <polygon points="400,400 80,240 80,260 400,420" fill="#090a0d" />

            {/* Level 1 Pavilion Structure */}
            {activeLevel === 1 && (
              <g className="iso-level-1">
                {/* Cantilever Deck extension over water */}
                <polygon points="280,260 440,340 360,380 200,300" fill="#3a342c" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                {/* Great Room Volume */}
                <polygon points="360,180 560,280 440,340 240,240" fill="url(#timberGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* Frameless Glass Wall Indicator */}
                <polygon points="360,180 560,280 560,210 360,110" fill="url(#glassGrad)" stroke="rgba(96, 165, 250, 0.5)" strokeWidth="1" />
                {/* Kitchen / Gallery Core */}
                <polygon points="480,180 640,260 560,300 400,220" fill="#242220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                {/* Monolithic Quartzite Island Marker */}
                <polygon points="500,230 550,255 530,265 480,240" fill="#c8a877" />
              </g>
            )}

            {/* Level 2 Sky Pavilion Structure */}
            {activeLevel === 2 && (
              <g className="iso-level-2">
                {/* Elevated Shifted Cantilever Volume */}
                <polygon points="380,130 620,250 500,310 260,190" fill="url(#timberGrad)" stroke="#f59e0b" strokeWidth="1" />
                {/* Penthouse Glass Panorama */}
                <polygon points="380,130 620,250 620,180 380,60" fill="url(#glassGrad)" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="1" />
                {/* Finnish Sauna & Stone Spa Pod */}
                <polygon points="520,200 620,250 580,270 480,220" fill="#4a3e35" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* Master Bed Platform */}
                <polygon points="360,170 420,200 390,215 330,185" fill="#f59e0b" opacity="0.8" />
              </g>
            )}
          </svg>

          {/* Interactive Hotspot Pins */}
          {levelSpots.map((spot) => {
            const isSelected = activeHotspot.id === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveHotspot(spot)}
                className={`dollhouse-pin ${isSelected ? "dollhouse-pin--active" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                aria-label={`Select ${spot.name}`}
              >
                <span className="dollhouse-pin__core" />
                <span className="dollhouse-pin__label">{spot.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Room Architectural Spec Sheet */}
        <div className="dollhouse__card" role="region" aria-live="polite">
          <div className="dollhouse__card-level">
            LEVEL {activeHotspot.level} · {activeHotspot.area}
          </div>
          <h3 className="dollhouse__card-title">{activeHotspot.name}</h3>
          <p className="dollhouse__card-desc">{activeHotspot.description}</p>

          <div className="dollhouse__card-specs">
            <div>
              <span className="dollhouse__spec-label">Ceiling Height</span>
              <span className="dollhouse__spec-val">{activeHotspot.ceiling}</span>
            </div>
            <div>
              <span className="dollhouse__spec-label">Architectural Material</span>
              <span className="dollhouse__spec-val">{activeHotspot.finish}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
