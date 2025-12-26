"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";
import type { CustomizationState, PaperType, ConeSize, FilterType } from "./types";
import { CONE_DIMENSIONS } from "./types";

// Add this import at the top of ConeViewer.tsx
import { getProceduralTexture } from "./PaperViewer";
import { preloadTexture, getCachedTexture } from "@/src/utils/textureCache";

interface ConeViewerProps {
  state: CustomizationState;
  focusStep?: "paper" | "filter" | "size" | "lot";
}

/* -------------------------
   Config / lookups
   ------------------------- */
const paperColorMap: Record<PaperType, string> = {
  unbleached: "#8B6F47",
  hemp: "#A8E6CF",
  bleached: "#F9FAFB",
  colored: "#F97316",
  rice: "#F5F5F0",
  bamboo: "#D4C4A8",
};

const filterColorMap: Record<FilterType, string> = {
  folded: "#CBD5F5",
  spiral: "#0EA5E9",
  ceramic: "#E5E7EB",
  glass: "#A5F3FC",
};

const sizeScaleMap: Record<ConeSize, number> = {
  "70mm": 0.8,
  "84mm": 0.95,
  "98mm": 1.1,
  "109mm": 1.25,
};

function getPaperRoughness(paperType: PaperType | null): number {
  if (!paperType) return 0.62;
  switch (paperType) {
    case "unbleached": return 0.9;
    case "hemp": return 0.85;
    case "bleached": return 0.7;
    case "colored": return 0.72;
    case "rice": return 0.6;
    case "bamboo": return 0.88;
    default: return 0.62;
  }
}

function getPaperMetalness(paperType: PaperType | null): number {
  if (!paperType) return 0;
  switch (paperType) {
    case "rice": return 0.08;
    case "bleached": return 0.05;
    case "colored": return 0.04;
    case "hemp": return 0.03;
    case "unbleached":
    case "bamboo": return 0.02;
    default: return 0;
  }
}

/* -------------------------
   Module-level texture cache + promise map
   ------------------------- */
const textureCache = new Map<string, THREE.Texture>();
const texturePromises = new Map<string, Promise<THREE.Texture>>();

export function clearTextureCache() {
  textureCache.forEach((t) => t.dispose());
  textureCache.clear();
  texturePromises.clear();
}

/* -------------------------
   Hook: load texture with caching
   ------------------------- */
function useOptionalTexture(url?: string | null) {
  const [texture, setTexture] = useState<THREE.Texture | null>(() => {
    if (url) {
      const cached = getCachedTexture(url);
      if (cached) return cached;
    }
    return null;
  });

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }

    const cached = getCachedTexture(url);
    if (cached) {
      setTexture(cached);
      return;
    }

    preloadTexture(url)
      .then((tex) => setTexture(tex))
      .catch((error) => {
        console.error("Failed to load texture:", error);
        setTexture(null);
      });
  }, [url]);

  return texture;
}

/* -------------------------
   ConeMesh component
   ------------------------- */

// Then update the ConeMesh component texture handling:

const ConeMesh: React.FC<ConeViewerProps> = ({ state, focusStep }) => {
  // load base textures
  const basePaperTexture = useOptionalTexture(state.paperTextureUrl ?? null);
  const baseFilterTexture = useOptionalTexture(state.filterTextureUrl ?? null);

  const sameTextureUrl =
    state.paperTextureUrl &&
    state.filterTextureUrl &&
    state.paperTextureUrl === state.filterTextureUrl;
  const baseSharedTexture = sameTextureUrl ? basePaperTexture ?? baseFilterTexture : null;

  // FIXED: Add procedural texture support like PaperViewer
  const proceduralPaperTexture = useMemo(() => {
    if (!state.paperTextureUrl) {
      return getProceduralTexture(state.paperType);
    }
    return null;
  }, [state.paperType, state.paperTextureUrl]);

  // colors - FIXED: Apply dimming factor to make cone darker
  const paperColor = useMemo(() => {
    const baseColor = state.paperColorHex || paperColorMap[state.paperType ?? "hemp"];
    // Darken the color by 40%
    const color = new THREE.Color(baseColor);
    color.multiplyScalar(0.6); // 0.6 = 40% darker
    return '#' + color.getHexString();
  }, [state.paperType, state.paperColorHex]);

  const filterColor = useMemo(() => {
    const baseColor = state.filterColorHex || (state.filterType ? filterColorMap[state.filterType] : "#E5E7EB");
    // Darken the color by 40%
    const color = new THREE.Color(baseColor);
    color.multiplyScalar(0.6); // 0.6 = 40% darker
    return '#' + color.getHexString();
  }, [state.filterType, state.filterColorHex]);

  // cone dimensions (keep fixed as per previous requirement)
  const coneDimensions = useMemo(() => {
    return {
      topRadius: 0.22,
      bottomRadius: 0.12,
      height: 2.4,
    };
  }, []);

  const highlightEmissive = focusStep === "paper" ? 0.35 : 0.08;

  const paperTopRadius = coneDimensions.topRadius;
  const paperBottomRadius = coneDimensions.bottomRadius;
  const paperHeight = coneDimensions.height;
  const paperCenterY = paperHeight / 2 + 0.1;

  const filterTopRadius = paperBottomRadius;
  const filterBottomRadius = 0.14;
  const filterHeight = 0.6;
  const paperBottomY = paperCenterY - paperHeight / 2;
  const filterCenterY = paperBottomY - filterHeight / 2;

  // texture clones
  const [paperMap, setPaperMap] = useState<THREE.Texture | null>(null);
  const [filterMap, setFilterMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // FIXED: Use custom texture OR procedural texture
    const paperSource = baseSharedTexture ?? basePaperTexture ?? proceduralPaperTexture;
    const filterSource = baseSharedTexture ?? baseFilterTexture;

    let newPaperMap: THREE.Texture | null = null;
    let newFilterMap: THREE.Texture | null = null;

    if (paperSource) {
      const clone = paperSource.clone();
      clone.wrapS = clone.wrapT = THREE.RepeatWrapping;
      clone.repeat.set(1, 1);
      clone.needsUpdate = true;
      newPaperMap = clone;
    }

    if (filterSource) {
      const clone = filterSource.clone();
      clone.wrapS = clone.wrapT = THREE.RepeatWrapping;
      clone.repeat.set(1, 1);
      clone.needsUpdate = true;
      newFilterMap = clone;
    }

    setPaperMap((prev) => {
      if (prev && prev !== proceduralPaperTexture) prev.dispose();
      return newPaperMap;
    });

    setFilterMap((prev) => {
      if (prev) prev.dispose();
      return newFilterMap;
    });

    return () => {
      if (newPaperMap && newPaperMap !== proceduralPaperTexture) newPaperMap.dispose();
      if (newFilterMap) newFilterMap.dispose();
    };
  }, [
    basePaperTexture,
    baseFilterTexture,
    baseSharedTexture,
    proceduralPaperTexture,
    state.paperTextureUrl,
    state.filterTextureUrl,
  ]);

  return (
    <group scale={1.15}>
      {/* Paper */}
      <mesh position={[0, paperCenterY, 0]} castShadow>
        <cylinderGeometry
          args={[paperTopRadius, paperBottomRadius, paperHeight, 80, 1, true]}
        />
        <meshStandardMaterial
          key={`cone-paper-material-${state.paperTextureUrl || "default"}-${paperColor}-${state.paperType}`}
          color={paperColor}
          roughness={paperMap ? 0.85 : getPaperRoughness(state.paperType)}
          metalness={0}
          map={paperMap ?? null}
          emissive="#000000"
          emissiveIntensity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Filter */}
      <mesh position={[0, filterCenterY, 0]} castShadow>
        <cylinderGeometry args={[filterTopRadius, filterBottomRadius, filterHeight, 48]} />
        {state.filterType === "ceramic" ? (
          <>
            <meshPhysicalMaterial
              key={`cone-filter-ceramic-${state.filterTextureUrl || "default"}`}
              color="#f7f7f5"
              roughness={0.55}
              metalness={0}
              clearcoat={0.35}
              clearcoatRoughness={0.25}
              emissive="#000000"
              emissiveIntensity={0}
              side={THREE.DoubleSide}
            />
            {Array.from({ length: 4 }).map((_, i) => {
              const angle = (i / 4) * Math.PI * 2;
              const ringRadius = filterTopRadius * 0.4;
              const x = Math.cos(angle) * ringRadius;
              const z = Math.sin(angle) * ringRadius;
              return (
                <mesh key={i} position={[x, filterHeight / 2, z]}>
                  <cylinderGeometry args={[0.008, 0.008, 0.02, 16]} />
                  <meshStandardMaterial color="#000000" />
                </mesh>
              );
            })}
          </>
        ) : state.filterType === "glass" ? (
          <meshStandardMaterial
            key={`cone-filter-glass-${state.filterTextureUrl || "default"}-${filterColor}`}
            color={filterColor}
            roughness={filterMap ? 0.3 : 0.35}
            metalness={0.6}
            transparent
            opacity={0.7}
            map={filterMap ?? null}
            emissive="#000000"
            emissiveIntensity={0}
            envMapIntensity={1.2}
            side={THREE.DoubleSide}
          />
        ) : (
                      <meshStandardMaterial
            key={`cone-filter-material-${state.filterTextureUrl || "default"}-${filterColor}`}
            color={filterColor}
            roughness={filterMap ? 0.7 : 0.75}
            metalness={0}
            map={filterMap ?? null}
            emissive="#000000"
            emissiveIntensity={0}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
    </group>
  );
};

/* -------------------------
   ConeViewer wrapper
   ------------------------- */
// Replace the Canvas section in ConeViewer.tsx wrapper component

const ConeViewer: React.FC<ConeViewerProps> = ({ state, focusStep }) => {
  return (
    <div className="w-full h-[320px] md:h-[390px] rounded-xl border border-blue-400/40 bg-gradient-to-b from-slate-900 via-slate-950 to-black shadow-[0_0_25px_rgba(15,23,42,0.9)] overflow-hidden">
      <Canvas shadows camera={{ position: [2.2, 1.4, 2.2], fov: 40 }} className="w-full h-full">
        <color attach="background" args={["#020617"]} />
        {/* FIXED: Reduced ambient light intensity */}
        <ambientLight intensity={0.25} />
        {/* FIXED: Reduced directional light intensity */}
        <directionalLight
          position={[4, 6, 3]}
          intensity={0.7}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* FIXED: Reduced point light intensity */}
        <pointLight position={[-4, 3, -4]} intensity={0.25} />

        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="studio" adjustCamera={false} shadows="contact">
            <ConeMesh state={state} focusStep={focusStep} />
          </Stage>
        </Suspense>

        <OrbitControls enablePan={false} enableDamping dampingFactor={0.12} minPolarAngle={0} maxPolarAngle={Math.PI} />
      </Canvas>
    </div>
  );
};

export default ConeViewer;
