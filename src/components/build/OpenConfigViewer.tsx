"use client";

import React, { Suspense, useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CustomizationState, ConeSize, PaperType, FilterType } from "./types";
import { getProceduralTexture } from "./PaperViewer";
import { preloadTexture, getCachedTexture } from "@/src/utils/textureCache";

interface OpenConfigViewerProps {
  state: CustomizationState;
}

/* -------------------------
   lookups
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

/* -------------------------
   Module-level cache & promise map
   ------------------------- */
const textureCache = new Map<string, THREE.Texture>();
const texturePromises = new Map<string, Promise<THREE.Texture>>();

export function clearTextureCache() {
  textureCache.forEach((t) => t.dispose());
  textureCache.clear();
  texturePromises.clear();
}

/* -------------------------
   Hook: cached loader
   - returns cached base texture or loads+cache it
   - does not dispose cached texture (persist until clearTextureCache)
   ------------------------- */
function useOptionalTextureCached(url?: string | null) {
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
      .then((tex) => {
        setTexture(tex);
      })
      .catch((error) => {
        console.error("Failed to load texture:", error);
        setTexture(null);
      });
  }, [url]);

  return texture;
}

function getPaperRoughness(paperType: PaperType | null): number {
  if (!paperType) return 0.75;
  switch (paperType) {
    case "unbleached": return 0.9;
    case "hemp": return 0.85;
    case "bleached": return 0.7;
    case "colored": return 0.72;
    case "rice": return 0.6;
    case "bamboo": return 0.88;
    default: return 0.75;
  }
}

function getPaperMetalness(paperType: PaperType | null): number {
  if (!paperType) return 0.03;
  switch (paperType) {
    case "rice": return 0.08;
    case "bleached": return 0.05;
    case "colored": return 0.04;
    case "hemp": return 0.03;
    case "unbleached":
    case "bamboo": return 0.02;
    default: return 0.03;
  }
}

/* -------------------------
   Mesh (uses per-mesh clones of base textures)
   ------------------------- */
const OpenConfigMesh: React.FC<OpenConfigViewerProps> = ({ state }) => {
  const groupRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Mesh>(null);

  const sizeScale = useMemo(
    () => (state.coneSize ? sizeScaleMap[state.coneSize] : 1),
    [state.coneSize]
  );

  const paperColor = useMemo(
    () => state.paperColorHex || paperColorMap[state.paperType ?? "hemp"],
    [state.paperType, state.paperColorHex]
  );

  const filterColor = useMemo(
    () => state.filterColorHex || (state.filterType ? filterColorMap[state.filterType] : "#CBD5F5"),
    [state.filterType, state.filterColorHex]
  );

  // base cached textures (may be null)
  const basePaperTexture = useOptionalTextureCached(state.paperTextureUrl ?? null);
  const baseFilterTexture = useOptionalTextureCached(state.filterTextureUrl ?? null);

  // FIXED: Add procedural texture support
  const proceduralPaperTexture = useMemo(() => {
    if (!state.paperTextureUrl) {
      return getProceduralTexture(state.paperType);
    }
    return null;
  }, [state.paperType, state.paperTextureUrl]);

  // If both urls equal, prefer shared base to reduce memory and keep cache consistent
  const sameTextureUrl =
    state.paperTextureUrl &&
    state.filterTextureUrl &&
    state.paperTextureUrl === state.filterTextureUrl;
  const baseShared = sameTextureUrl ? basePaperTexture ?? baseFilterTexture : null;

  // per-mesh clones so we can set different repeat/wrapping
  const [paperMap, setPaperMap] = useState<THREE.Texture | null>(null);
  const [filterMap, setFilterMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // FIXED: Use custom texture OR procedural texture
    const paperSource = baseShared ?? basePaperTexture ?? proceduralPaperTexture;
    const filterSource = baseShared ?? baseFilterTexture;

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
    baseShared,
    proceduralPaperTexture,
    state.paperTextureUrl,
    state.filterTextureUrl,
  ]);

  // Wind-like motion
  useFrame((stateFrame) => {
    const t = stateFrame.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t * 1.4) * 0.25;
      groupRef.current.rotation.z = Math.sin(t * 1.9) * 0.12;
    }
    if (paperRef.current) {
      paperRef.current.rotation.y = Math.sin(t * 2.5) * 0.1;
    }
  });

  return (
    <group scale={sizeScale} ref={groupRef}>
      {/* Paper sheet with optional image texture */}
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.05, 0]} ref={paperRef}>
        <planeGeometry args={[3.1, 2.0, 24, 4]} />
        <meshStandardMaterial
          key={`paper-material-${state.paperTextureUrl || "default"}-${paperColor}-${state.paperType}`}
          color={paperColor}
          roughness={paperMap ? 0.6 : getPaperRoughness(state.paperType)}
          metalness={getPaperMetalness(state.paperType)}
          map={paperMap ?? null}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Filter in cylindrical "rolled" form with image texture */}
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.15, 0.95]}>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 64, 1, true]} />
        {state.filterType === "ceramic" ? (
          <>
            <meshPhysicalMaterial
              key={`filter-ceramic-${state.filterTextureUrl || "default"}`}
              color="#f7f7f5"
              roughness={0.55}
              metalness={0}
              clearcoat={0.35}
              clearcoatRoughness={0.25}
              side={THREE.DoubleSide}
            />
            {/* 4 black dots on top - NO TEXTURE for ceramic */}
            {Array.from({ length: 4 }).map((_, i) => {
              const angle = (i / 4) * Math.PI * 2;
              const ringRadius = 0.11;
              const x = Math.cos(angle) * ringRadius;
              const z = Math.sin(angle) * ringRadius;
              return (
                <mesh key={i} position={[x, 1.3, z]}>
                  <cylinderGeometry args={[0.025, 0.025, 0.08, 24]} />
                  <meshStandardMaterial color="#000000" />
                </mesh>
              );
            })}
          </>
        ) : state.filterType === "glass" ? (
          <meshStandardMaterial
            key={`filter-glass-${state.filterTextureUrl || "default"}-${filterColor}`}
            color={filterColor}
            roughness={filterMap ? 0.15 : 0.2}
            metalness={0.6}
            transparent={true}
            opacity={0.7}
            map={filterMap ?? null}
            envMapIntensity={1.2}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial
            key={`filter-material-${state.filterTextureUrl || "default"}-${filterColor}`}
            color={filterColor}
            roughness={filterMap ? 0.45 : 0.55}
            metalness={0.15}
            map={filterMap ?? null}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
    </group>
  );
};

/* -------------------------
   Viewer wrapper
   ------------------------- */
const OpenConfigViewer: React.FC<OpenConfigViewerProps> = ({ state }) => {
  return (
    <div className="relative w-full h-[320px] md:h-[380px] rounded-xl border border-blue-400/40 bg-gradient-to-b from-slate-950 via-black to-slate-950 shadow-[0_0_25px_rgba(15,23,42,0.9)] overflow-hidden">
      <Canvas shadows camera={{ position: [1.7, 1.6, 3.7], fov: 45 }} className="w-full h-full">
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[4, 5, 3]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 2, -3]} intensity={0.4} />

        <Suspense fallback={null}>
          <OpenConfigMesh state={state} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.12}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI - 0.3}
        />
      </Canvas>
    </div>
  );
};

export default OpenConfigViewer;
