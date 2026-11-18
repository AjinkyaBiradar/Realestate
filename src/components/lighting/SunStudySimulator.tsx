"use client";

import { useState, useEffect } from "react";

export type TimeOfDayPhase = "dawn" | "midday" | "golden" | "night";

interface SolarPhaseData {
  id: TimeOfDayPhase;
  label: string;
  time: string;
  azimuth: string;
  elevation: string;
  generation: string;
  description: string;
}

const PHASES: SolarPhaseData[] = [
  {
    id: "dawn",
    label: "Dawn",
    time: "06:15",
    azimuth: "68° ENE",
    elevation: "9°",
    generation: "2.8 kW",
    description: "Soft rose & violet horizon, morning lake mist",
  },
  {
    id: "midday",
    label: "Midday",
    time: "12:30",
    azimuth: "180° S",
    elevation: "52°",
    generation: "11.6 kW",
    description: "Full neutral Nordic sunlight, mirror water clarity",
  },
  {
    id: "golden",
    label: "Golden Hour",
    time: "18:45",
    azimuth: "264° WSW",
    elevation: "14°",
    generation: "7.4 kW",
    description: "Warm amber timber reflections & elongated shadows",
  },
  {
    id: "night",
    label: "Nocturne",
    time: "22:45",
    azimuth: "342° NNW",
    elevation: "-18°",
    generation: "Geothermal",
    description: "Deep obsidian night, warm illuminated hearths",
  },
];

export default function SunStudySimulator() {
  const [activePhase, setActivePhase] = useState<TimeOfDayPhase>("golden");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    // Apply data attribute for CSS filter blending
    heroEl.setAttribute("data-solar-phase", activePhase);
  }, [activePhase]);

  const currentData = PHASES.find((p) => p.id === activePhase) || PHASES[2];

  return (
    <div className="sun-study" aria-label="Interactive Solar & Daylight Study">
      <div className="sun-study__bar">
        <div className="sun-study__header">
          <span className="sun-study__indicator" aria-hidden="true" />
          <span className="sun-study__title">Solar Light Study</span>
          <span className="sun-study__time">{currentData.time}</span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sun-study__expand-btn"
            aria-expanded={isExpanded}
            aria-label="Toggle solar telemetry panel"
          >
            {isExpanded ? "Close" : "Metrics"}
          </button>
        </div>

        {/* Phase Selectors */}
        <div className="sun-study__tabs" role="group" aria-label="Select daylight phase">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => setActivePhase(phase.id)}
              className={`sun-study__tab ${activePhase === phase.id ? "sun-study__tab--active" : ""}`}
              aria-pressed={activePhase === phase.id}
            >
              {phase.label}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Telemetry Card */}
      {isExpanded && (
        <div className="sun-study__telemetry" role="region" aria-live="polite">
          <div className="sun-study__grid">
            <div>
              <span className="sun-study__label">Sun Azimuth</span>
              <span className="sun-study__val">{currentData.azimuth}</span>
            </div>
            <div>
              <span className="sun-study__label">Elevation</span>
              <span className="sun-study__val">{currentData.elevation}</span>
            </div>
            <div>
              <span className="sun-study__label">Solar / BIPV Yield</span>
              <span className="sun-study__val">{currentData.generation}</span>
            </div>
          </div>
          <p className="sun-study__desc">{currentData.description}</p>
        </div>
      )}
    </div>
  );
}
