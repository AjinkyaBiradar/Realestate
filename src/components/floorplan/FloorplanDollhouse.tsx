"use client";

import { useState } from "react";

interface SpatialRoom {
  id: string;
  name: string;
  level: 1 | 2;
  area: string;
  ceiling: string;
  finish: string;
  orientation: string;
  image: string;
  description: string;
  features: string[];
}

const SPATIAL_ROOMS: SpatialRoom[] = [
  // Level 1
  {
    id: "deck",
    name: "Cantilevered Lake Deck",
    level: 1,
    area: "96 m²",
    ceiling: "Open Sky",
    finish: "Nordic Kebony & Flamed Granite Pylons",
    orientation: "West · Lakefront Sunset",
    image: "/assets/img/hero_terrace.dc94d0c7.webp",
    description:
      "Hovering directly above the waterline with an infinity sheet of mirror lake water cascading off the outer rim into the quiet lake.",
    features: ["Direct water access pier", "Infinity plunge cascade", "Concealed perimeter LED lighting"],
  },
  {
    id: "greatroom",
    name: "Double-Height Great Room",
    level: 1,
    area: "88 m²",
    ceiling: "6.4 m Double Height",
    finish: "Smoked European Oak & Blackened Steel Hearth",
    orientation: "South-West · Water & Pine Panorama",
    image: "/assets/img/int_living.1dc7ddf2.webp",
    description:
      "Monolithic suspended hearth, acoustic clay plaster walls with hidden flush acoustics, and 12-meter motorized low-iron sliding glass.",
    features: ["Suspended steel hearth", "12m motorized glass sliding wall", "Hidden acoustic ceiling baffles"],
  },
  {
    id: "kitchen",
    name: "Quartzite Island Kitchen & Dining",
    level: 1,
    area: "42 m²",
    ceiling: "3.2 m Clear",
    finish: "Flamed Basalt, Quartzite & Smoked Oak",
    orientation: "East · Morning Forest Glade",
    image: "/assets/img/int_kitchen.e1d4b5ae.webp",
    description:
      "Single-block 4.2m island with integrated Gaggenau induction, hidden scullery pantry, and sommelier wine preservation.",
    features: ["4.2m single-block island", "Concealed scullery pantry", "Integrated sommelier cellar"],
  },
  // Level 2
  {
    id: "master",
    name: "Master Penthouse Suite",
    level: 2,
    area: "64 m²",
    ceiling: "3.4 m Sloped",
    finish: "Natural Larch & Concealed Dressing Suite",
    orientation: "East · Lake Mist & Sunrise",
    image: "/assets/img/int_bedroom.49f50a91.webp",
    description:
      "Elevated above the pine tree canopy with 180° panoramic water views, acoustic timber louvres, and private sunrise contemplation terrace.",
    features: ["180° canopy water views", "Private contemplation balcony", "Concealed walk-through wardrobe"],
  },
  {
    id: "sauna",
    name: "Hydrotherapy Spa & Finnish Sauna",
    level: 2,
    area: "32 m²",
    ceiling: "3.0 m",
    finish: "Thermo-Aspen & Honed Granite",
    orientation: "North-West · Pine Forest Solitude",
    image: "/assets/img/int_spa.3f81d5b0.webp",
    description:
      "Traditional wood-burning Finnish sauna heater, sunken cold plunge bath, and frameless floor-to-ceiling glass overlooking the forest mist.",
    features: ["Wood-fired Finnish sauna", "Sunken cold plunge bath", "Aromatherapy steam system"],
  },
  {
    id: "stair",
    name: "Floating Arrival Gallery & Staircase",
    level: 2,
    area: "28 m²",
    ceiling: "Double Height Void",
    finish: "Cantilevered Oak & Low-Iron Glass",
    orientation: "Central Architectural Axis",
    image: "/assets/img/int_stair.a4b81c30.webp",
    description:
      "A weightless transition between pavilions with concealed perimeter step lighting and continuous sightlines through the old-growth pines.",
    features: ["Cantilevered oak treads", "Frameless glass balustrade", "Double-height vertical sightlines"],
  },
];

export default function FloorplanDollhouse() {
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1);
  const [activeRoomId, setActiveRoomId] = useState<string>("deck");

  const levelRooms = SPATIAL_ROOMS.filter((r) => r.level === activeLevel);
  const currentRoom =
    SPATIAL_ROOMS.find((r) => r.id === activeRoomId) || levelRooms[0];

  const handleLevelChange = (lvl: 1 | 2) => {
    setActiveLevel(lvl);
    const firstRoomOfLevel = SPATIAL_ROOMS.find((r) => r.level === lvl);
    if (firstRoomOfLevel) {
      setActiveRoomId(firstRoomOfLevel.id);
    }
  };

  return (
    <div className="dollhouse" aria-label="Interactive Spatial Architecture Visualizer">
      {/* Level Selector & Telemetry Bar */}
      <div className="dollhouse__bar">
        <div className="dollhouse__tabs" role="tablist" aria-label="Select architectural level">
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === 1}
            onClick={() => handleLevelChange(1)}
            className={`dollhouse__tab ${activeLevel === 1 ? "dollhouse__tab--active" : ""}`}
          >
            Level 1 · Ground Pavilion (219 m²)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeLevel === 2}
            onClick={() => handleLevelChange(2)}
            className={`dollhouse__tab ${activeLevel === 2 ? "dollhouse__tab--active" : ""}`}
          >
            Level 2 · Sky Pavilion (201 m²)
          </button>
        </div>

        <div className="dollhouse__badge">
          <span className="dollhouse__badge-dot" />
          <span>Interactive Spatial Room Visualizer · 4K Photorealistic Architecture</span>
        </div>
      </div>

      <div className="dollhouse__stage">
        {/* Photorealistic Architectural Room Viewport */}
        <div className="dollhouse__viewport">
          {/* Main Visual Render with smooth overlay */}
          <div className="dollhouse__image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentRoom.id}
              src={currentRoom.image}
              alt={currentRoom.name}
              className="dollhouse__photo"
              loading="lazy"
            />
            <div className="dollhouse__overlay" />

            {/* Viewfinder Telemetry Overlay */}
            <div className="dollhouse__telemetry-top">
              <span className="dollhouse__chip">
                LEVEL {currentRoom.level} · {currentRoom.area}
              </span>
              <span className="dollhouse__chip dollhouse__chip--gold">
                🧭 {currentRoom.orientation}
              </span>
            </div>
          </div>

          {/* Room Selector Strip inside viewport */}
          <div className="dollhouse__room-strip" role="tablist" aria-label="Select room view">
            {levelRooms.map((room) => {
              const isSelected = room.id === currentRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setActiveRoomId(room.id)}
                  className={`dollhouse__room-btn ${
                    isSelected ? "dollhouse__room-btn--active" : ""
                  }`}
                >
                  <span className="dollhouse__room-dot" />
                  <span>{room.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Room Architectural Spec Sheet */}
        <div className="dollhouse__card" role="region" aria-live="polite">
          <div className="dollhouse__card-level">
            LEVEL {currentRoom.level} · {currentRoom.area} · CEILING {currentRoom.ceiling}
          </div>
          <h3 className="dollhouse__card-title">{currentRoom.name}</h3>
          <p className="dollhouse__card-desc">{currentRoom.description}</p>

          <div className="dollhouse__features">
            <span className="dollhouse__feat-title">Architectural Features</span>
            <ul className="dollhouse__feat-list">
              {currentRoom.features.map((feat, idx) => (
                <li key={idx} className="dollhouse__feat-item">
                  <span className="dollhouse__feat-icon">✦</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dollhouse__card-specs">
            <div>
              <span className="dollhouse__spec-label">Ceiling Height</span>
              <span className="dollhouse__spec-val">{currentRoom.ceiling}</span>
            </div>
            <div>
              <span className="dollhouse__spec-label">Finish Materials</span>
              <span className="dollhouse__spec-val">{currentRoom.finish}</span>
            </div>
            <div>
              <span className="dollhouse__spec-label">View Orientation</span>
              <span className="dollhouse__spec-val">{currentRoom.orientation}</span>
            </div>
          </div>

          <a
            href="#studio"
            className="btn btn--ghost"
            style={{ marginTop: "16px", justifyContent: "center", fontSize: "13px", padding: "10px 18px" }}
          >
            <span>Explore in 3D Pavilion Studio ↑</span>
          </a>
        </div>
      </div>
    </div>
  );
}
