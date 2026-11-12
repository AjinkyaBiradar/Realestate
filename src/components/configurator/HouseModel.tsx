"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { FinishType, BedroomCount, TimeOfDay } from "@/types";

interface HouseModelProps {
  finish: FinishType;
  bedrooms: BedroomCount;
  timeOfDay: TimeOfDay;
}

export default function HouseModel({
  finish,
  bedrooms,
  timeOfDay,
}: HouseModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Subtle water animation
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = -0.05 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    }
  });

  // Material Colors based on Finish
  const finishPalette = {
    white: {
      primary: "#f4f4f6",
      accent: "#1c1c1e",
      terrace: "#d1d1d6",
      frames: "#2c2c2e",
      roughness: 0.35,
      metalness: 0.1,
    },
    dark: {
      primary: "#141416",
      accent: "#28282e",
      terrace: "#1f1f23",
      frames: "#09090b",
      roughness: 0.7,
      metalness: 0.2,
    },
    wood: {
      primary: "#966544",
      accent: "#3a2517",
      terrace: "#70482e",
      frames: "#1a130f",
      roughness: 0.8,
      metalness: 0.05,
    },
    concrete: {
      primary: "#7a7d84",
      accent: "#3e4249",
      terrace: "#5b5e65",
      frames: "#1e2024",
      roughness: 0.9,
      metalness: 0.1,
    },
  }[finish];

  // Glass Material properties
  const glassColor =
    timeOfDay === "night"
      ? "#ffdfa0" // Warm interior glow
      : timeOfDay === "dusk"
      ? "#fca311"
      : "#d8eeff";

  const glassOpacity = timeOfDay === "night" ? 0.75 : 0.4;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. Lake Water Surface Plane */}
      <mesh
        ref={waterRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.15, 0]}
        receiveShadow
      >
        <planeGeometry args={[26, 26, 32, 32]} />
        <meshStandardMaterial
          color={
            timeOfDay === "night"
              ? "#060d17"
              : timeOfDay === "dusk"
              ? "#1d2b3a"
              : "#0c2b45"
          }
          roughness={0.12}
          metalness={0.85}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 2. Concrete Lakeside Shoreline / Ground Slab */}
      <mesh position={[-1.2, 0.05, -0.8]} receiveShadow castShadow>
        <boxGeometry args={[8.5, 0.35, 7.5]} />
        <meshStandardMaterial
          color={finishPalette.terrace}
          roughness={finishPalette.roughness}
        />
      </mesh>

      {/* 3. Floating Teak Wooden Pier / Deck extending into water */}
      <mesh position={[2.5, 0.12, 1.8]} receiveShadow castShadow>
        <boxGeometry args={[3.2, 0.15, 4.2]} />
        <meshStandardMaterial color="#6a4932" roughness={0.7} />
      </mesh>

      {/* Pier pilings dipping into water */}
      <mesh position={[3.8, -0.25, 3.6]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.8, 12]} />
        <meshStandardMaterial color="#2d2d30" />
      </mesh>
      <mesh position={[1.4, -0.25, 3.6]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.8, 12]} />
        <meshStandardMaterial color="#2d2d30" />
      </mesh>

      {/* 4. Negative-Edge Reflection Pool on Terrace */}
      <mesh position={[-2.4, 0.23, 1.6]} receiveShadow>
        <boxGeometry args={[3.2, 0.05, 1.6]} />
        <meshStandardMaterial
          color="#00a896"
          roughness={0.08}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Pool Coping border */}
      <mesh position={[-2.4, 0.22, 1.6]}>
        <boxGeometry args={[3.4, 0.04, 1.8]} />
        <meshStandardMaterial color="#1f2421" roughness={0.5} />
      </mesh>

      {/* 5. Ground Floor Living Pavilion (Glass & Columns) */}
      <group position={[-0.8, 1.0, -0.6]}>
        {/* Living Room Volume Interior & Roof Slab */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 1.5, 3.8]} />
          <meshStandardMaterial
            color={glassColor}
            roughness={0.15}
            transparent
            opacity={glassOpacity}
          />
        </mesh>

        {/* Minimalist Structural Columns */}
        <mesh position={[-2.4, 0, -1.7]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 12]} />
          <meshStandardMaterial color={finishPalette.frames} />
        </mesh>
        <mesh position={[2.4, 0, -1.7]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 12]} />
          <meshStandardMaterial color={finishPalette.frames} />
        </mesh>
        <mesh position={[-2.4, 0, 1.7]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 12]} />
          <meshStandardMaterial color={finishPalette.frames} />
        </mesh>
        <mesh position={[2.4, 0, 1.7]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 12]} />
          <meshStandardMaterial color={finishPalette.frames} />
        </mesh>

        {/* Ground Floor Interior Feature Wall / Fireplace Core */}
        <mesh position={[0, 0, -0.6]} castShadow>
          <boxGeometry args={[1.6, 1.48, 1.8]} />
          <meshStandardMaterial
            color={finishPalette.accent}
            roughness={finishPalette.roughness}
          />
        </mesh>
      </group>

      {/* 6. Cantilevered Upper Master Volume (Main Arch Box) */}
      <group position={[0.2, 2.3, -0.4]}>
        {/* Upper architectural cantilever box */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.8, 1.4, 3.4]} />
          <meshStandardMaterial
            color={finishPalette.primary}
            roughness={finishPalette.roughness}
            metalness={finishPalette.metalness}
          />
        </mesh>

        {/* Panoramic Master Glass Window Ribbon */}
        <mesh position={[0.3, 0.05, 1.72]}>
          <boxGeometry args={[4.4, 0.95, 0.06]} />
          <meshStandardMaterial
            color={glassColor}
            roughness={0.15}
            transparent
            opacity={glassOpacity}
          />
        </mesh>

        {/* Window Mullions / Architectural Louvers */}
        {[-1.5, -0.5, 0.5, 1.5].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.05, 1.74]}>
            <boxGeometry args={[0.05, 0.95, 0.08]} />
            <meshStandardMaterial color={finishPalette.frames} />
          </mesh>
        ))}

        {/* Upper Balcony Glass Railing */}
        <mesh position={[0.3, -0.2, 2.1]}>
          <boxGeometry args={[4.6, 0.45, 0.04]} />
          <meshStandardMaterial
            color="#cce5ff"
            roughness={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* 7. Modular Bedroom Wings (dynamically configured by `bedrooms`) */}
      {/* Wing for 4 & 5 Bedrooms: Cantilevered West Guest Suite */}
      {bedrooms >= 4 && (
        <group position={[-3.3, 1.85, -0.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.3, 2.8]} />
            <meshStandardMaterial
              color={finishPalette.primary}
              roughness={finishPalette.roughness}
              metalness={finishPalette.metalness}
            />
          </mesh>
          <mesh position={[0, 0, 1.42]}>
            <boxGeometry args={[1.8, 0.8, 0.04]} />
            <meshStandardMaterial
              color={glassColor}
              roughness={0.15}
              transparent
              opacity={glassOpacity}
            />
          </mesh>
        </group>
      )}

      {/* Extra Penthouse Wing for 5 Bedrooms */}
      {bedrooms === 5 && (
        <group position={[0.6, 3.4, -0.6]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.2, 1.1, 2.4]} />
            <meshStandardMaterial
              color={finishPalette.primary}
              roughness={finishPalette.roughness}
              metalness={finishPalette.metalness}
            />
          </mesh>
          {/* Glass Skyview Terrace */}
          <mesh position={[0, 0, 1.22]}>
            <boxGeometry args={[2.8, 0.7, 0.04]} />
            <meshStandardMaterial
              color={glassColor}
              roughness={0.1}
              transparent
              opacity={glassOpacity}
            />
          </mesh>
        </group>
      )}

      {/* 8. Minimalist Sculptural Evergreen Pine Trees on shoreline */}
      {[
        { pos: [-4.6, 0.9, -3.2] as [number, number, number], scale: 1.2 },
        { pos: [-4.9, 0.7, -1.8] as [number, number, number], scale: 0.9 },
        { pos: [3.8, 0.8, -2.6] as [number, number, number], scale: 1.1 },
      ].map((tree, i) => (
        <group key={i} position={tree.pos} scale={tree.scale}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
            <meshStandardMaterial color="#2d1e18" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <coneGeometry args={[0.7, 1.4, 8]} />
            <meshStandardMaterial color="#1b2e23" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.7, 0]} castShadow>
            <coneGeometry args={[0.5, 1.1, 8]} />
            <meshStandardMaterial color="#233a2d" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Warm Interior Spotlights */}
      <pointLight
        position={[-0.8, 1.2, -0.6]}
        intensity={timeOfDay === "night" ? 5 : 2}
        distance={6}
        color="#ffcc77"
      />
      <pointLight
        position={[0.2, 2.3, 0.4]}
        intensity={timeOfDay === "night" ? 4 : 1.5}
        distance={5}
        color="#ffe0a3"
      />
    </group>
  );
}

