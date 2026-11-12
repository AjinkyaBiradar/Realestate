"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Subtle ambient 3D geometry floating in dark space
function AmbientHeroScene() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.15) % 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-8, 6, -5]} intensity={1.5} color="#5e81ac" />
      <pointLight position={[8, 3, 4]} intensity={1.2} color="#eceff4" />

      {/* Modern architectural floating volume / wireframe */}
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
        <group position={[3.5, 0.5, -2]}>
          {/* Main cantilever glass pavilion placeholder */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4.2, 1.4, 2.8]} />
            <meshStandardMaterial
              color="#1a1c23"
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(4.2, 1.4, 2.8)]} />
            <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
          </lineSegments>

          {/* Upper cantilever floor */}
          <mesh position={[-0.8, 1.3, 0.4]}>
            <boxGeometry args={[4.8, 1.2, 2.4]} />
            <meshStandardMaterial
              color="#0d0e12"
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>
          <lineSegments position={[-0.8, 1.3, 0.4]}>
            <edgesGeometry args={[new THREE.BoxGeometry(4.8, 1.2, 2.4)]} />
            <lineBasicMaterial color="#ffffff" opacity={0.4} transparent />
          </lineSegments>
        </group>
      </Float>

      {/* Infinite Horizon Architectural Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#050505"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Subtle architectural perspective grid on ground */}
      <gridHelper
        ref={gridRef}
        args={[50, 40, "#333333", "#171717"]}
        position={[0, -2.48, 0]}
      />
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none bg-[#050505]">
      {/* 3D WebGL Canvas Layer (No static image) */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.5, 9], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full pointer-events-none"
        >
          <AmbientHeroScene />
        </Canvas>
      </div>

      {/* Architectural Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#050505]/40 to-[#050505] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />

      {/* Viewport Placeholder Status Indicator */}
      <div className="absolute top-28 right-8 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-neutral-400 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Interactive 3D Canvas Viewport</span>
      </div>
    </div>
  );
}
