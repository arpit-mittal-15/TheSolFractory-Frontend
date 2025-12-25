"use client";

import React, { Suspense, useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CustomizationState, ConeSize, PaperType, FilterType } from "./types";

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
    if (url && textureCache.has(url)) return textureCache.get(url)!;
    return null;
  });

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }

    if (textureCache.has(url)) {
      setTexture(textureCache.get(url)!);
      return;
    }

    if (texturePromises.has(url)) {
      texturePromises
        .get(url)!
        .then((tex) => setTexture(tex))
        .catch(() => setTexture(null));
      return;
    }

    const loader = new THREE.TextureLoader();
    const promise = new Promise<THREE.Texture>((resolve, reject) => {
      loader.load(
        url,
        (tex) => {
          try {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(1, 1);
            (tex as any).encoding = (THREE as any).sRGBEncoding //?? THREE.LinearEncoding;
            tex.needsUpdate = true;
            textureCache.set(url, tex);
            resolve(tex);
          } catch (e) {
            console.error("Texture prepare error:", e);
            textureCache.set(url, tex);
            resolve(tex);
          }
        },
        undefined,
        (err) => {
          console.error("TextureLoader failed for", url, err);
          reject(err);
        }
      );
    });

    texturePromises.set(url, promise);

    promise
      .then((tex) => setTexture(tex))
      .catch(() => setTexture(null))
      .finally(() => texturePromises.delete(url));

    return () => {
      // keep base texture cached; do not dispose here
    };
  }, [url]);

  return texture;
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

  // If both urls equal, prefer shared base to reduce memory and keep cache consistent
  const sameTextureUrl =
    state.paperTextureUrl &&
    state.filterTextureUrl &&
    state.paperTextureUrl === state.filterTextureUrl;
  const baseShared = sameTextureUrl ? basePaperTexture ?? baseFilterTexture : null;

  // per-mesh clones so we can set different repeat/wrapping
  const [paperMap, setPaperMap] = useState<THREE.Texture | null>(null);
  const [filterMap, setFilterMap] = useState<THREE.Texture | null>(null);

  // v-repeat heuristics
  const paperVRepeat = Math.max(1, Math.round(2.0 * sizeScale));
  const filterVRepeat = Math.max(1, Math.round(2.6 * sizeScale));

  useEffect(() => {
    // dispose any existing clones
    setPaperMap((prev) => {
      if (prev) prev.dispose();
      return null;
    });
    setFilterMap((prev) => {
      if (prev) prev.dispose();
      return null;
    });

    const paperSource = baseShared ?? basePaperTexture;
    const filterSource = baseShared ?? baseFilterTexture;

    if (paperSource) {
      const clone = paperSource.clone();
      clone.wrapS = clone.wrapT = THREE.RepeatWrapping;
      clone.repeat.set(1, paperVRepeat);
      clone.needsUpdate = true;
      setPaperMap(clone);
    } else {
      setPaperMap(null);
    }

    if (filterSource) {
      const clone = filterSource.clone();
      clone.wrapS = clone.wrapT = THREE.RepeatWrapping;
      clone.repeat.set(1, filterVRepeat);
      clone.needsUpdate = true;
      setFilterMap(clone);
    } else {
      setFilterMap(null);
    }

    return () => {
      setPaperMap((prev) => {
        if (prev) prev.dispose();
        return null;
      });
      setFilterMap((prev) => {
        if (prev) prev.dispose();
        return null;
      });
    };
  }, [
    basePaperTexture,
    baseFilterTexture,
    baseShared,
    paperVRepeat,
    filterVRepeat,
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
          key={`paper-material-${state.paperTextureUrl || "default"}-${paperColor}`}
          color={paperColor}
          roughness={paperMap ? 0.6 : 0.75}
          metalness={0.03}
          map={paperMap ?? null}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Filter in cylindrical "rolled" form with image texture */}
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.15, 0.95]}>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 64, 1, true]} />
        <meshStandardMaterial
          key={`filter-material-${state.filterTextureUrl || "default"}-${filterColor}`}
          color={filterColor}
          roughness={filterMap ? 0.45 : 0.55}
          metalness={0.15}
          map={filterMap ?? null}
          side={THREE.DoubleSide}
        />
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
