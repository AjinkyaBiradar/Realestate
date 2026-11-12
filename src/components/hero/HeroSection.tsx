import HeroBackground from "./HeroBackground";
import HeroDataBar from "./HeroDataBar";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[720px] max-h-[1100px] flex flex-col justify-end overflow-hidden pb-12 sm:pb-16"
    >
      {/* 3D WebGL Canvas Viewport (No static image) */}
      <HeroBackground />

      {/* Main unified block in the lower section of hero */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-5xl mb-8 sm:mb-10">
          {/* Over-headline tag */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-white/90 uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            LAKESIDE · PINE FOREST · 12 RESIDENCES
          </p>

          {/* 2-line Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.2rem] font-bold tracking-[-0.03em] leading-[0.95] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] select-none">
            A house you&apos;ll never <br />
            want to leave
          </h1>
        </div>

        {/* Attached Stats Bar & CTA Button */}
        <HeroDataBar />
      </div>
    </section>
  );
}
