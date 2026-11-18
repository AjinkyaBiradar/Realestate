"use client";

import { useState } from "react";

export default function CarbonEnergyTracker() {
  const [activeMetric, setActiveMetric] = useState<string>("carbon");

  return (
    <div className="sustainability-tracker" aria-label="Sustainable Architecture & Carbon Performance">
      <div className="sustainability-tracker__header">
        <div>
          <span className="sustainability-badge">Certified Net-Zero Architecture</span>
          <h3 className="sustainability-title">Ecological &amp; Energy Intelligence</h3>
        </div>
        <div className="sustainability-standards">
          <span className="standard-chip">LEED Platinum</span>
          <span className="standard-chip">Nordic Swan</span>
          <span className="standard-chip">Passive House</span>
        </div>
      </div>

      <div className="sustainability-grid">
        {/* Metric 1: Carbon Negative */}
        <button
          type="button"
          onClick={() => setActiveMetric("carbon")}
          className={`sustainability-card ${activeMetric === "carbon" ? "sustainability-card--active" : ""}`}
        >
          <div className="sustainability-card__val text-emerald-400">−42.8 t</div>
          <div className="sustainability-card__label">Embodied Carbon</div>
          <p className="sustainability-card__sub">Mass timber CLT &amp; Shou Sugi Ban sequester more carbon than emitted</p>
        </button>

        {/* Metric 2: Solar Energy Surplus */}
        <button
          type="button"
          onClick={() => setActiveMetric("solar")}
          className={`sustainability-card ${activeMetric === "solar" ? "sustainability-card--active" : ""}`}
        >
          <div className="sustainability-card__val text-amber-400">14.6 MWh</div>
          <div className="sustainability-card__label">Annual Clean Solar Yield</div>
          <p className="sustainability-card__sub">Integrated BIPV crystalline glass roof with Powerwall reserves</p>
        </button>

        {/* Metric 3: Geothermal Performance */}
        <button
          type="button"
          onClick={() => setActiveMetric("geothermal")}
          className={`sustainability-card ${activeMetric === "geothermal" ? "sustainability-card--active" : ""}`}
        >
          <div className="sustainability-card__val text-sky-400">4.85 COP</div>
          <div className="sustainability-card__label">Geothermal Efficiency</div>
          <p className="sustainability-card__sub">Subterranean closed-loop boreholes providing 100% radiant heating &amp; cooling</p>
        </button>

        {/* Metric 4: Thermal & Acoustic Envelope */}
        <button
          type="button"
          onClick={() => setActiveMetric("envelope")}
          className={`sustainability-card ${activeMetric === "envelope" ? "sustainability-card--active" : ""}`}
        >
          <div className="sustainability-card__val text-indigo-300">0.54 ACH</div>
          <div className="sustainability-card__label">Airtight Envelope</div>
          <p className="sustainability-card__sub">Triple-glazed argon low-iron glass achieving 48 dB acoustic stillness</p>
        </button>
      </div>
    </div>
  );
}
