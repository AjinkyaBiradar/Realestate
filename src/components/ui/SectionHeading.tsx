interface SectionHeadingProps {
  number: string;
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  lightMode?: boolean;
}

export default function SectionHeading({
  number,
  tag,
  title,
  description,
  align = "left",
  lightMode = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-4xl"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
          {number}
        </span>
        <span className="h-px w-6 bg-neutral-700" />
        <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
          {tag}
        </span>
      </div>
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] ${
          lightMode ? "text-neutral-900" : "text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

