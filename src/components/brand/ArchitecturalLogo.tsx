interface ArchitecturalLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function ArchitecturalLogo({
  className = "",
  size = 28,
  animated = true,
}: ArchitecturalLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`arch-logo ${animated ? "arch-logo--animated" : ""} ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Futuristic Gold / Amber Gradient */}
        <linearGradient id="logoAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Titanium / Carbon Edge Gradient */}
        <linearGradient id="logoMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>

        {/* Glass Glow Filter */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Futuristic Architectural Pavilion Monogram */}
      {/* Lower Cantilever Ground Slab (Waterfront Terrace) */}
      <polygon
        points="12,68 62,68 76,82 26,82"
        fill="url(#logoMetalGrad)"
        opacity="0.35"
      />
      <line
        x1="12"
        y1="68"
        x2="62"
        y2="68"
        stroke="url(#logoMetalGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Structural Glass Column / Core */}
      <line
        x1="38"
        y1="68"
        x2="38"
        y2="36"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        opacity="0.5"
      />
      <line
        x1="58"
        y1="68"
        x2="58"
        y2="36"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        opacity="0.5"
      />

      {/* Upper Floating Cantilever Roof (Aerodynamic Shifted Volume) */}
      <polygon
        points="24,36 88,36 74,22 10,22"
        fill="url(#logoMetalGrad)"
        opacity="0.85"
      />
      <line
        x1="10"
        y1="22"
        x2="74"
        y2="22"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="36"
        x2="88"
        y2="36"
        stroke="url(#logoAmberGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Vertical Intersecting Cantilever Pylon */}
      <polyline
        points="74,22 88,36 88,52"
        stroke="url(#logoAmberGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Illuminated Hearth / Sanctuary Core (Pulsing Amber Beacon) */}
      <circle
        cx="48"
        cy="52"
        r="4.5"
        fill="url(#logoAmberGrad)"
        filter="url(#logoGlow)"
        className="arch-logo__hearth"
      />
      <circle
        cx="48"
        cy="52"
        r="9"
        stroke="#f59e0b"
        strokeWidth="1"
        opacity="0.4"
        className="arch-logo__pulse"
      />
    </svg>
  );
}
