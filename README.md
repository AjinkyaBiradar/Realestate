# LAKE HOUSE · AIST Village

A luxury, high-conversion architectural real estate landing page built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Three.js / WebGL**, and **Lenis Smooth Scroll**. Faithfully modeled after the award-winning [AIST Lab Lake House](https://lake.aistlab.online) design concept.

---

## 🌟 Highlights & Features

### 1. Interactive 3D Hero Scroll-Scrub
- **177 High-Resolution Frames**: Pre-rendered 2560×1440 WebP rotation sequence synchronized seamlessly to the page scroll depth.
- **Ambient Idle Yoyo Drift**: The camera gently floats with natural motion before the user begins scrolling.
- **Optimized Scrub Depth (`280svh`)**: Tuned time-constant damping (`TAU = 0.16`) for immediate, responsive frame scrub without sluggish lag.
- **Subpixel Fidelity**: High-DPR scaling (`Math.min(Math.max(dpr, 1.5), 2.5)`) and bicubic interpolation (`imageSmoothingQuality = 'high'`) for razor-sharp timber slats and lake reflections.

### 2. Translucent Liquid-Glass Navigation
- **Frosted Glassmorphism**: Translucent pill navbar (`rgba(255, 255, 255, 0.24)`) with `24px` backdrop blur, subtle top specular highlight, and soft shadow.
- **Compact & Clean**: Snug `min(860px, 90vw)` geometry with balanced spacing and smooth anchor transitions.

### 3. Live 3D Configurator Studio (`#studio`)
- **Real 3D Geometry**: Procedural WebGL architectural rendering powered by Three.js.
- **Exterior & Interior Modes**:
  - **Outside**: 360° orbital camera control with 6 preset viewpoints.
  - **Inside**: Walk-through perspective across the fireplace, kitchen, terrace, and master suite.
- **Customization Options**:
  - **Finishes**: *Warm white*, *Graphite*, *Natural oak*.
  - **Layout**: 2, 4, or 5 bedroom configurations.
  - **Features**: Spa & soaking tub (*None*, *Snow-white*, *Warm stone*) and terrace pool options.
  - **Dynamic Pricing**: Instant real-time area and turnkey price calculation.
- **Non-Blocking Scroll**: Mouse wheel zoom trapping removed so users can glide past the 3D scene effortlessly without getting stuck.

### 4. Vector Floor Plan Permutations (`#plan`)
- **48 Permutations**: Detailed vector SVG floor plans for Level 1 and Level 2 across all bedroom and spa variations.
- **Room Schedule**: Interactive area breakdowns for every room and cantilevered deck.
- **Fullscreen Inspection**: Detailed blueprint view with auto-synchronized scroll lock.

### 5. Architecture & Surroundings Bento Grid
- High-definition photography covering the private pier, pine forest environment, approach road, and integrated smart home infrastructure.

### 6. Silky Smooth Momentum Scrolling (Lenis)
- Integrated **Lenis** momentum scrolling with exponential easing (`duration: 0.9s`, `wheelMultiplier: 1.15`).
- Automatic synchronization with modals and full-screen blueprint overlays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components + Client Islands)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom Luxury CSS Design System
- **3D & Graphics**:
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://r3f.docs.pmnd.rs/) & [@react-three/drei](https://github.com/pmndrs/drei)
  - Custom 2D Canvas Scrub Engine
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Onest & Golos Text (custom self-hosted WOFF2 web fonts)

---

## 📁 Project Structure

```text
realestate/
├── public/
│   ├── assets/
│   │   ├── hero/                  # 177 desktop & mobile 3D WebP frames (0000-0176)
│   │   │   ├── m/                 # Mobile-optimized frame set
│   │   │   ├── manifest.*.json    # Frame timing and position metadata
│   │   │   └── poster.jpg         # High-resolution 2.5K fallback poster
│   │   ├── fonts/                 # Self-hosted Golos & Onest WOFF2 fonts
│   │   ├── img/                   # High-res architecture and interior photography
│   │   ├── plans/                 # SVG floor plans & room schedule data
│   │   ├── av3d.*.js              # Three.js 3D WebGL configurator engine
│   │   └── site.*.js              # Client interactivity & state controller
│   └── site.css                   # Synced public stylesheet
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts   # Lead capture booking endpoint
│   │   ├── globals.css            # Tailwind base directives
│   │   ├── layout.tsx             # Root layout with fonts, metadata & scripts
│   │   ├── page.tsx               # Main landing page component
│   │   └── site.css               # Core design tokens, liquid-glass & hero styles
│   └── components/
│       ├── hero/
│       │   └── HeroCanvasScrub.tsx # Native React 3D hero scrub component
│       └── ui/
│           └── SmoothScroll.tsx    # Lenis smooth scroll provider & modal observer
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚡ Performance Optimizations

1. **Elimination of Scroll Traps**: OrbitControls and camera wheel events on `#stageCanvas` no longer cancel default page scrolling (`e.preventDefault()`), ensuring unobstructed scrolling past 3D canvases.
2. **Preventing Layout Thrashing**: Canvas bounding rect queries are cached and only recalculated on window resize events rather than inside per-frame animation loops.
3. **Decoupled Main Thread**: 3D scene loading is deferred via `IntersectionObserver` until the user scrolls within proximity of the `#studio` section.
4. **Adaptive Preloading**: Initial 24 frames load eagerly with priority, followed by a throttled background pump to keep bandwidth free for smooth initial render.

---
