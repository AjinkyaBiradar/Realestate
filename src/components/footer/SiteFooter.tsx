import LeadCaptureForm from "./LeadCaptureForm";
import { Compass, PhoneCall, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer id="contact" className="relative bg-[#020202] text-white pt-24 sm:pt-32 pb-16 border-t border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Lead & Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <span>06</span>
            <span>•</span>
            <span>PRIVATE ACCESS & INQUIRIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white">
            Leave your number — we&apos;ll show you around on a day that suits.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Personalized tours hosted by the architectural team. Private boat transfers depart from Lucerne Marina or Zurich Heliport.
          </p>
        </div>

        {/* Lead Capture Form */}
        <div className="mb-24">
          <LeadCaptureForm />
        </div>

        {/* Studio & Project Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-16 border-t border-white/10 text-neutral-400 text-xs font-mono">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-sans text-base font-bold tracking-tight">
              <Compass className="w-4 h-4" />
              <span>LAKE HOUSE</span>
            </div>
            <p className="font-light leading-relaxed text-neutral-400">
              A private digital twin showcase by AIST Lab in collaboration with Atelier Nord Architecture.
            </p>
            <div className="text-[11px] text-neutral-400">
              Project Code: AL-LH-2026
            </div>
          </div>

          {/* Col 2: Coordinates & Location */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Geographic Location
            </div>
            <div>Lake Lucerne Peninsula</div>
            <div>Canton of Lucerne, Switzerland</div>
            <div className="text-neutral-300 font-mono">47°00&apos;14&quot;N 8°26&apos;42&quot;E</div>
            <div className="text-neutral-400">Mooring: Private North Berth</div>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" /> Direct Desk
            </div>
            <div>Concierge: +41 41 890 22 10</div>
            <div>Direct: +41 79 320 44 88</div>
            <div className="text-white hover:underline cursor-pointer">
              lakehouse@aistlab.online
            </div>
            <div>Hours: Mon — Sun, 08:00 — 20:00 CET</div>
          </div>

          {/* Col 4: Quick Navigation & Top */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-semibold">
              Sections
            </div>
            <div>
              <a href="#hero" className="hover:text-white transition-colors">
                ↑ Top of Page
              </a>
            </div>
            <div>
              <a href="#perspectives" className="hover:text-white transition-colors">
                Perspectives Gallery
              </a>
            </div>
            <div>
              <a href="#configurator" className="hover:text-white transition-colors">
                3D Configurator
              </a>
            </div>
            <div>
              <a href="#floorplan" className="hover:text-white transition-colors">
                Exploded Floor Plans
              </a>
            </div>
            <div>
              <a href="#specifications" className="hover:text-white transition-colors">
                Technical Specifications
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
          <div>
            © 2026 AIST Lab & Atelier Nord. All architectural designs & 3D assets reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Viewing</span>
            <span className="hover:text-white cursor-pointer transition-colors">Imprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

