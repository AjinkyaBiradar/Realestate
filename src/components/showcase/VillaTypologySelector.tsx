/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface VillaTypology {
  id: string;
  name: string;
  subtitle: string;
  area: string;
  cantilever: string;
  price: string;
  img: string;
  tag: string;
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
}

const VILLA_TYPOLOGIES: VillaTypology[] = [
  {
    id: "aero",
    name: "AERO · Cantilevered Biophilic Villa",
    subtitle: "Aerodynamic Twin Cantilevers & Frameless Curved Water Panorama",
    area: "480 m²",
    cantilever: "18.4 m Clear Span",
    price: "From $1.45M",
    img: "/assets/img/futuristic_villa_hero.webp",
    tag: "Flagship Modern Typology",
    description:
      "A radical leap in lakeside architecture. Razor-thin blackened matte titanium rooflines hover weightlessly over the water surface, anchored by concealed geothermal granite pylons and wrapped in triple-glazed low-iron panoramic glass.",
    specs: [
      { label: "Gross Usable Area", value: "480 m² across 2 levels" },
      { label: "Structural Cantilever", value: "18.4 m hovering over lake" },
      { label: "Glazing Spec", value: "Triple Low-Iron Curved Structural" },
      { label: "Energy Balance", value: "Net-Positive (+16.2 MWh/yr)" },
      { label: "Suites", value: "4 En-suite + Master Sky Suite" },
    ],
  },
  {
    id: "interior",
    name: "THE GREAT PAVILION · Interior Sanctum",
    subtitle: "Double-Height 6.5m Glass Volume & Suspended Sculptural Hearth",
    area: "142 m² Living Core",
    cantilever: "Seamless Indoor-Outdoor Flow",
    price: "Included in Turnkey",
    img: "/assets/img/futuristic_villa_interior.webp",
    tag: "Acoustic Stillness & Warmth",
    description:
      "Sculpted interior volume bathed in tranquil Nordic daylight. Features a suspended blackened steel conical hearth, acoustic smoked European oak ceiling slats, flamed heated basalt floor slabs, and Italian low-profile modular seating.",
    specs: [
      { label: "Ceiling Height", value: "6.5 m Double Height Void" },
      { label: "Fireplace", value: "Concealed Flue Blackened Hearth" },
      { label: "Flooring", value: "Radiant Flamed Nordic Basalt" },
      { label: "Acoustics", value: "Clay Plaster & Perforated Oak" },
      { label: "Automation", value: "Lutron Palladiom & Motorized Glass" },
    ],
  },
  {
    id: "monolith",
    name: "MONOLITH · Obsidian & Basalt Sanctuary",
    subtitle: "Volcanic Basalt Massing, Private Hydrotherapy Spa & Courtyard",
    area: "540 m²",
    cantilever: "21.2 m Cantilevered Pier",
    price: "From $1.68M",
    img: "/assets/img/futuristic_villa_aerial.webp",
    tag: "Private Enclave Estate",
    description:
      "Monolithic geometric massing engineered with volcanic basalt and charred larch. Features an integrated subterranean wine cellar, sunken hydrotherapy spa with Finnish wood-burning sauna, and an infinity plunge pool extending out into the lake.",
    specs: [
      { label: "Gross Usable Area", value: "540 m² with Spa Suite" },
      { label: "Spa Facilities", value: "Finnish Sauna, Cold Plunge, Onsen" },
      { label: "Pool", value: "12m Heated Infinity Water Rim" },
      { label: "Privacy", value: "Dense Scots Pine Buffer Zone" },
      { label: "Waterfront", value: "Private 40m Deep-Draft Pier" },
    ],
  },
];

export default function VillaTypologySelector() {
  const [selectedId, setSelectedId] = useState<string>("aero");
  const current = VILLA_TYPOLOGIES.find((v) => v.id === selectedId) || VILLA_TYPOLOGIES[0];

  return (
    <div className="typology-showcase" aria-label="Futuristic Modern Villa Typologies">
      {/* Section Header */}
      <div className="typology-showcase__head">
        <div>
          <span className="typology-badge">Next-Generation Architecture</span>
          <h2 className="typology-title">Contemporary Villa Typologies</h2>
          <p className="typology-desc">
            Redefining luxury through radical structural cantilevers, aerodynamic forms, and biophilic mass timber engineering.
          </p>
        </div>

        {/* Typology Tabs */}
        <div className="typology-tabs" role="tablist" aria-label="Villa Typologies">
          {VILLA_TYPOLOGIES.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={selectedId === v.id}
              onClick={() => setSelectedId(v.id)}
              className={`typology-tab ${selectedId === v.id ? "typology-tab--active" : ""}`}
            >
              <span className="typology-tab__name">{v.name.split(" · ")[0]}</span>
              <span className="typology-tab__sub">{v.area}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="typology-body">
        {/* Visual Showcase Card */}
        <div className="typology-visual">
          <img
            src={current.img}
            alt={current.name}
            className="typology-img"
            loading="lazy"
            onError={(e) => {
              // Fallback to hero image if 3rd aerial is still processing
              (e.target as HTMLImageElement).src = "/assets/img/futuristic_villa_hero.webp";
            }}
          />
          <div className="typology-visual__overlay">
            <span className="typology-visual__tag">{current.tag}</span>
            <span className="typology-visual__price">{current.price}</span>
          </div>
        </div>

        {/* Architectural Intelligence Panel */}
        <div className="typology-details">
          <div className="typology-details__top">
            <h3 className="typology-details__title">{current.name}</h3>
            <p className="typology-details__subtitle">{current.subtitle}</p>
            <p className="typology-details__desc">{current.description}</p>
          </div>

          {/* Specifications Table */}
          <div className="typology-specs">
            {current.specs.map((s, idx) => (
              <div key={idx} className="typology-spec-row">
                <span className="typology-spec-label">{s.label}</span>
                <span className="typology-spec-val">{s.value}</span>
              </div>
            ))}
          </div>

          {/* CTA Actions */}
          <div className="typology-actions">
            <a href="#zayavka" className="btn typology-cta">
              Request Villa Blueprint &amp; Pricing Brief
            </a>
            <a href="#plan" className="btn btn--ghost typology-ghost">
              Explore 3D Cutaway
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
