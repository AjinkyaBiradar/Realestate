export default function PhilosophySection() {
  const features = [
    {
      title: "The lake is yours, not shared",
      description:
        "A private waterfront and pier. Swim or paddle out right from your doorstep — no neighbours on the shore.",
    },
    {
      title: "The house stands right over the water",
      description:
        "The lower deck cantilevers over the lake on piers, and a thin sheet of water slides off its edge back into the lake. Life by the water below, the quiet of the bedrooms above.",
    },
    {
      title: "A smart home without a single remote",
      description:
        "Light and music follow the rhythm of your day on their own. The speakers and sensors are built into the walls.",
    },
    {
      title: "80% of the plot is untouched forest",
      description:
        "The house never shows off: two horizontal volumes hide below the tree crowns, and the pine forest stays all around.",
    },
  ];

  return (
    <section className="relative w-full bg-white text-neutral-900 py-16 sm:py-24 transition-colors">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Uppercase Header Tag matching screenshot */}
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 mb-8 sm:mb-10 font-medium">
          WHY THIS ISN&apos;T &ldquo;JUST ANOTHER DEVELOPMENT&rdquo;
        </p>

        {/* 4 Columns Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

