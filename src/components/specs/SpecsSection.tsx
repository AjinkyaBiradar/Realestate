import SectionHeading from "../ui/SectionHeading";
import { ShieldCheck, Zap, Thermometer, Box, Radio, Anchor } from "lucide-react";

export default function SpecsSection() {
  const specCategories = [
    {
      number: "01",
      title: "Security & Perimeter",
      icon: ShieldCheck,
      summary: "Autonomous defense and encrypted access control.",
      items: [
        { label: "Biometric Access", value: "Iris and capacitive fingerprint entry at all portals" },
        { label: "Perimeter Radar", value: "Thermal shoreline and roadway intrusion sensors" },
        { label: "Surveillance", value: "Encrypted 4K optical & infrared camera array" },
        { label: "Safe Room", value: "Reinforced concrete core with independent air & comms" },
      ],
    },
    {
      number: "02",
      title: "Utilities & Sustainability",
      icon: Zap,
      summary: "Self-sustaining infrastructure with zero-carbon footprint.",
      items: [
        { label: "Geothermal Power", value: "45 kW closed-loop deep bedrock heat pump" },
        { label: "Solar Integration", value: "BIPV frameless photovoltaic roof tiles (32 kWp)" },
        { label: "Storage Capacity", value: "Dual 30 kWh commercial-grade battery storage" },
        { label: "Water Filtration", value: "Private deep artesian well with reverse osmosis" },
      ],
    },
    {
      number: "03",
      title: "Heating & Climate",
      icon: Thermometer,
      summary: "Precision microclimate control across all independent zones.",
      items: [
        { label: "Glazing Spec", value: "Triple-glazed acoustic argon (U-value 0.58 W/m²K)" },
        { label: "Radiant Slabs", value: "Hydronic underfloor heating & passive summer cooling" },
        { label: "Ventilation", value: "Zoned Zehnder ERV with medical-grade HEPA-14" },
        { label: "Humidity", value: "Automated indoor ultrasonic humidity balancing" },
      ],
    },
    {
      number: "04",
      title: "Materials & Provenance",
      icon: Box,
      summary: "Tactile elements sourced from heritage alpine quarries.",
      items: [
        { label: "Natural Stone", value: "Hand-split Vals quartzite and honed Italian travertine" },
        { label: "Structural Timber", value: "PEFC-certified Austrian spruce & blackened cedar" },
        { label: "Metal Finishes", value: "Brushed champagne bronze & blackened hot-rolled steel" },
        { label: "Millwork", value: "Bespoke integrated smoked oak joinery throughout" },
      ],
    },
    {
      number: "05",
      title: "Smart Home & Sound",
      icon: Radio,
      summary: "Invisible technology operating harmoniously in the background.",
      items: [
        { label: "Control Backbone", value: "Industrial-grade KNX bus system with Savant UI" },
        { label: "Architectural Audio", value: "Acoustically tuned Bang & Olufsen concealed speakers" },
        { label: "Shading", value: "Lutron Palladiom silent motorized solar drop shades" },
        { label: "Connectivity", value: "Dual redundant Gigabit fiber plus Starlink terminal" },
      ],
    },
    {
      number: "06",
      title: "Waterfront & Marina",
      icon: Anchor,
      summary: "Engineered specifically for maritime access and navigation.",
      items: [
        { label: "Boat Slip", value: "Enclosed hydraulic dry slip accommodating up to 40 ft" },
        { label: "Pier Decking", value: "Sustainable Burmese teak with concealed brass fasteners" },
        { label: "Shore Power", value: "Dual 63A rapid charging pedestals at dockside" },
        { label: "Water Depth", value: "Direct deep-water mooring draft of 4.2 meters" },
      ],
    },
  ];

  return (
    <section id="specifications" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          tag="ENGINEERING STANDARDS"
          title="Specifications & Infrastructure"
          description="Every component has been selected without compromise. Engineered to withstand harsh alpine winters and humid lakeside summers for centuries."
        />

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.number}
                className="bg-[#0b0b0e] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                      {cat.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mb-6">
                    {cat.summary}
                  </p>

                  <div className="space-y-3 border-t border-white/5 pt-4">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                          {item.label}
                        </div>
                        <div className="text-xs text-neutral-200 font-light leading-relaxed">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

