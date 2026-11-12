"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import HouseModel from "./HouseModel";
import { FinishType, BedroomCount, TimeOfDay } from "@/types";
import { RotateCcw, Play, Pause, Move3d } from "lucide-react";

interface HouseCanvasProps {
  finish: FinishType;
  bedrooms: BedroomCount;
  timeOfDay: TimeOfDay;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090b] text-white z-10">
      <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
      <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
        Initializing 3D Geometry...
      </span>
    </div>
  );
}

function LightingRig({ timeOfDay }: { timeOfDay: TimeOfDay }) {
  if (timeOfDay === "night") {
    return (
      <>
        <ambientLight intensity={0.25} color="#152238" />
        <directionalLight
          position={[10, 15, 8]}
          intensity={0.4}
          color="#8ca5d1"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <hemisphereLight
          args={["#1b2838", "#080b10", 0.3]}
        />
      </>
    );
  }

  if (timeOfDay === "dusk") {
    return (
      <>
        <ambientLight intensity={0.6} color="#d48c66" />
        <directionalLight
          position={[12, 6, 8]}
          intensity={2.2}
          color="#ff7b39"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-8, 4, -8]}
          intensity={0.6}
          color="#4361ee"
        />
        <hemisphereLight
          args={["#f7a072", "#1f2937", 0.5]}
        />
      </>
    );
  }

  // Daylight (Default)
  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight
        position={[10, 18, 12]}
        intensity={1.8}
        color="#fffaf0"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight
        position={[-10, 8, -6]}
        intensity={0.4}
        color="#90b4ce"
      />
      <hemisphereLight
        args={["#d9e2ec", "#102a43", 0.5]}
      />
    </>
  );
}

export default function HouseCanvas({
  finish,
  bedrooms,
  timeOfDay,
  autoRotate,
  onToggleAutoRotate,
}: HouseCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#09090c] to-[#040405] border border-white/10 shadow-2xl">
      {/* 3D Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <PerspectiveCamera makeDefault position={[10, 7, 11]} fov={38} />

          <LightingRig timeOfDay={timeOfDay} />

          <HouseModel
            finish={finish}
            bedrooms={bedrooms}
            timeOfDay={timeOfDay}
          />

          <ContactShadows
            position={[0, -0.65, 0]}
            opacity={0.75}
            scale={24}
            blur={2.4}
            far={10}
            color="#000000"
          />

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={7}
            maxDistance={22}
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going underneath the water plane
            minPolarAngle={0.2}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </Suspense>

      {/* Top Left Status Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-neutral-300 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>R3F Real-Time Geometry</span>
      </div>

      {/* Bottom Center Interaction Guide */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-neutral-400 pointer-events-none">
        <Move3d className="w-3.5 h-3.5 text-white" />
        <span>Drag to orbit • Scroll to zoom • Right-click to pan</span>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={onToggleAutoRotate}
          title={autoRotate ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
          className="p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white hover:bg-white hover:text-black transition-all"
        >
          {autoRotate ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={handleResetCamera}
          title="Reset Camera View"
          className="p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white hover:bg-white hover:text-black transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

