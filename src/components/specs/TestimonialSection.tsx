import { Quote, Award } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "We did not design a house to sit upon the lake. We sculpted a continuous threshold between liquid and stone. You do not inhabit rooms here—you inhabit the horizon itself.",
      author: "Elias Lindqvist",
      title: "Lead Architect & Partner",
      affiliation: "Atelier Nord, Zurich",
    },
    {
      quote:
        "A masterclass in alpine restraint. Every millimeter where glass meets charred timber has been resolved with obsessive precision. It is the benchmark of modern waterfront living.",
      author: "Hélène de Saint-Germain",
      title: "Senior Architectural Critic",
      affiliation: "Design Monocle & ArchReview",
    },
    {
      quote:
        "The light during sunset transforms the salon into a floating lantern on the water. It provides absolute sanctuary from the pace of modern finance.",
      author: "Dr. Alexander V.",
      title: "Private Commission Client",
      affiliation: "Lucerne Peninsula",
    },
  ];

  const awards = [
    { name: "ArchDaily Villa of the Year", category: "Finalist, Residential Design" },
    { name: "Swiss Architecture Gold Award", category: "Winner, Waterfront Category" },
    { name: "Mies Crown Hall Americas Prize", category: "Nominee, Sustainable Horizon" },
    { name: "Passive House Institute", category: "Certified Net-Zero Benchmark" },
  ];

  return (
    <section className="relative py-24 sm:py-36 bg-[#08080a] border-t border-b border-white/10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
            05
          </span>
          <span className="h-px w-6 bg-neutral-700" />
          <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
            ARCHITECTURAL VOICES & CRITIQUE
          </span>
        </div>

        {/* Massive Hero Quote */}
        <div className="mb-20 max-w-5xl">
          <Quote className="w-10 h-10 text-white/30 mb-6" />
          <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-5.5xl font-light tracking-tight leading-[1.2] text-white">
            &ldquo;We did not design a house to sit upon the lake. We sculpted a continuous threshold between liquid and stone. You do not inhabit rooms here—you inhabit the horizon itself.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white text-black font-bold font-mono flex items-center justify-center text-sm">
              EL
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-wide">
                Elias Lindqvist
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Lead Architect & Partner, Atelier Nord
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/10">
          {testimonials.slice(1).map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e12] border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
            >
              <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center justify-center">
                  0{idx + 2}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.author}</div>
                  <div className="text-xs font-mono text-neutral-400">
                    {t.title} • {t.affiliation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accolades & Honours Bar */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <Award className="w-4 h-4 text-white" />
            <span>Honors & Architectural Distinctions</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awards.map((award, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div className="text-sm font-semibold text-white tracking-tight">
                  {award.name}
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">
                  {award.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

