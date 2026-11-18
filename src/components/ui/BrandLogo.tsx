export default function BrandLogo({
  size = 28,
  className = "",
  showText = false,
}: {
  size?: number;
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`brand-mark ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0, borderRadius: `${size * 0.25}px` }}
      >
        <defs>
          <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2129" />
            <stop offset="100%" stopColor="#0d0e12" />
          </linearGradient>
          <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="logo-steel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Precision Squircle Shield Base */}
        <rect width="120" height="120" rx="30" fill="url(#logo-bg)" />
        <rect
          x="1"
          y="1"
          width="118"
          height="118"
          rx="29"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.5"
        />

        {/* Minimalist Architectural Monogram 'K' */}
        {/* Structural Pylon */}
        <rect x="34" y="28" width="11" height="64" rx="5.5" fill="url(#logo-steel)" />

        {/* Upper Cantilever Wing */}
        <path
          d="M51 54 L76 29 C78.5 26.5 83 28.5 83 32 L83 40 C83 42.5 81.5 44.5 79.5 46 L59 62 Z"
          fill="url(#logo-steel)"
        />

        {/* Lower Cantilever Terrace */}
        <path
          d="M51 66 L79.5 83 C81.5 84.5 83 86.5 83 89 L83 93 C83 96.5 78.5 98.5 76 96 L51 74 Z"
          fill="url(#logo-steel)"
          opacity="0.9"
        />

        {/* Golden Sun of Kairos */}
        <circle cx="86" cy="40" r="7" fill="url(#logo-gold)" filter="url(#logo-glow)" />
        <circle
          cx="86"
          cy="40"
          r="13"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.45"
        />
      </svg>

      {showText && (
        <span className="brand-mark__text">
          <strong>KAIROS</strong> <span>· Lakeside Sanctuary</span>
        </span>
      )}
    </div>
  );
}
