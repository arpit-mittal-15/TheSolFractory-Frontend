"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";
import type { CustomizationState, PaperType, ConeSize, FilterType } from "./types";

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
   Module-level texture cache + promise map
   Keeps textures alive while SPA is running -> instant reload when returning to step
   ------------------------- */
const textureCache = new Map<string, THREE.Texture>();
const texturePromises = new Map<string, Promise<THREE.Texture>>();

export function clearTextureCache() {
  // useful in dev: clear and dispose all cached textures
  textureCache.forEach((t) => t.dispose());
  textureCache.clear();
  texturePromises.clear();
}

/* -------------------------
   Hook: load texture with caching
   - returns cached texture immediately if available
   - otherwise loads and caches it
   - DOES NOT dispose cached textures (they persist until clearTextureCache called)
   ------------------------- */
function useOptionalTexture(url?: string | null) {
  const [texture, setTexture] = useState<THREE.Texture | null>(() => {
    if (url && textureCache.has(url)) return textureCache.get(url)!;
    return null;
  });

  useEffect(() => {
    if (!url) {
      setTexture((prev) => {
        // do NOT dispose cached textures here; clones will be cleaned up elsewhere
        return null;
      });
      return;
    }

    // if cached, return it synchronously
    if (textureCache.has(url)) {
      setTexture(textureCache.get(url)!);
      return;
    }

    // if already loading, hook into that promise
    if (texturePromises.has(url)) {
      texturePromises.get(url)!.then((tex) => {
        setTexture(tex);
      }).catch(() => {
        setTexture(null);
      });
      return;
    }

    // else create loader promise and store it in texturePromises
    const loader = new THREE.TextureLoader();
    const promise = new Promise<THREE.Texture>((resolve, reject) => {
      loader.load(
        url,
        (tex) => {
          try {
            // prepare texture for general use
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(1, 1);
            // cast to any so TypeScript build won't fail (encoding may not be on type)
            (tex as any).encoding = (THREE as any).sRGBEncoding // ?? THREE.LinearEncoding;
            tex.needsUpdate = true;

            // cache the base texture so future calls reuse it
            textureCache.set(url, tex);

            resolve(tex);
          } catch (e) {
            // if something weird occurs, still resolve with tex but log
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
      .then((tex) => {
        // set local state
        setTexture(tex);
      })
      .catch(() => {
        setTexture(null);
      })
      .finally(() => {
        // once resolved or rejected, remove the promise holder (cache stays if loaded)
        texturePromises.delete(url);
      });

    // no disposal of the cached base texture here: we want it to persist across component unmounts
    return () => {
      // no-op
    };
  }, [url]);

  return texture;
}

/* -------------------------
   ConeMesh: uses cached base textures and creates per-mesh clones
   so each mesh can set repeat independently.
   Clones are disposed on change/unmount to avoid leaks.
   ------------------------- */
const ConeMesh: React.FC<ConeViewerProps> = ({ state, focusStep }) => {
  // load base textures (these are cached across the SPA lifecycle)
  const basePaperTexture = useOptionalTexture(state.paperTextureUrl ?? null);
  const baseFilterTexture = useOptionalTexture(state.filterTextureUrl ?? null);

  // if both URLs are identical, prefer the shared base texture
  const sameTextureUrl =
    state.paperTextureUrl &&
    state.filterTextureUrl &&
    state.paperTextureUrl === state.filterTextureUrl;

  const baseSharedTexture = sameTextureUrl ? basePaperTexture ?? baseFilterTexture : null;

  // colors and scale
  const paperColor = useMemo(() => {
    if (state.paperColorHex) return state.paperColorHex;
    return paperColorMap[state.paperType ?? "hemp"];
  }, [state.paperType, state.paperColorHex]);

  const filterColor = useMemo(() => {
    if (state.filterColorHex) return state.filterColorHex;
    return state.filterType ? filterColorMap[state.filterType] : "#E5E7EB";
  }, [state.filterType, state.filterColorHex]);

  const sizeScale = useMemo(
    () => (state.coneSize ? sizeScaleMap[state.coneSize] : 1),
    [state.coneSize]
  );

  const highlightEmissive = focusStep === "paper" ? 0.35 : 0.08;

  // geometry params (adjusted per your requests)
  const paperTopRadius = 0.22 * sizeScale;
  const paperBottomRadius = 0.12 * sizeScale;
  const paperHeight = 2.4 * sizeScale;
  const paperCenterY = 0.6 * sizeScale;

  const filterTopRadius = paperBottomRadius;
  const filterBottomRadius = 0.14 * sizeScale;
  const filterHeight = 0.60 * sizeScale;

  const paperBottomY = paperCenterY - paperHeight / 2;
  const filterCenterY = paperBottomY - filterHeight / 2;

  // per-mesh clones so we can freely set repeat per mesh
  const [paperMap, setPaperMap] = useState<THREE.Texture | null>(null);
  const [filterMap, setFilterMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // cleanup old clones
    setPaperMap((prev) => {
      if (prev) prev.dispose();
      return null;
    });
    setFilterMap((prev) => {
      if (prev) prev.dispose();
      return null;
    });

    // choose base sources (shared or per-type)
    const paperSource = baseSharedTexture ?? basePaperTexture;
    const filterSource = baseSharedTexture ?? baseFilterTexture;

    // create paper clone if source available
    if (paperSource) {
      const clone = paperSource.clone();
      clone.wrapS = clone.wrapT = THREE.RepeatWrapping;
      // a heuristic repeat that makes texture stretch reasonably along height
      const vRepeat = Math.max(1, Math.round(paperHeight));
      clone.repeat.set(1, vRepeat);
      clone.needsUpdate = true;
      setPaperMap(clone);
    } else {
      setPaperMap(null);
    }

    // create filter clone if source available
    if (filterSource) {
      const clone = filterSource.clone();
      clone.wrapS = clone.wrapT = THREE.RepeatWrapping;
      const vRepeat = Math.max(1, Math.round(filterHeight * 1.5));
      clone.repeat.set(1, vRepeat);
      clone.needsUpdate = true;
      setFilterMap(clone);
    } else {
      setFilterMap(null);
    }

    // dispose clones on unmount / param change
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    basePaperTexture,
    baseFilterTexture,
    baseSharedTexture,
    paperHeight,
    filterHeight,
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
          key={`cone-paper-material-${state.paperTextureUrl || "default"}-${paperColor}`}
          color={paperColor}
          roughness={paperMap ? 0.55 : 0.62}
          metalness={0}
          map={paperMap ?? null}
          emissive={paperColor}
          emissiveIntensity={highlightEmissive}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Filter */}
      <mesh position={[0, filterCenterY, 0]} castShadow>
        <cylinderGeometry
          args={[filterTopRadius, filterBottomRadius, filterHeight, 48]}
        />
        <meshStandardMaterial
          key={`cone-filter-material-${state.filterTextureUrl || "default"}-${filterColor}`}
          color={filterColor}
          roughness={filterMap ? 0.28 : 0.32}
          metalness={0.12}
          map={filterMap ?? null}
          emissive={focusStep === "filter" ? filterColor : "#000000"}
          emissiveIntensity={focusStep === "filter" ? 0.35 : 0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

/* -------------------------
   Viewer wrapper
   ------------------------- */
const ConeViewer: React.FC<ConeViewerProps> = ({ state, focusStep }) => {
  return (
    <div className="w-full h-[320px] md:h-[390px] rounded-xl border border-blue-400/40 bg-gradient-to-b from-slate-900 via-slate-950 to-black shadow-[0_0_25px_rgba(15,23,42,0.9)] overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [2.2, 1.4, 2.2], fov: 40 }}
        className="w-full h-full"
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 3, -4]} intensity={0.4} />

        <Suspense fallback={null}>
          <Stage
            intensity={0.8}
            environment="studio"
            adjustCamera={false}
            shadows="contact"
          >
            <ConeMesh state={state} focusStep={focusStep} />
          </Stage>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.12}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
};

export default ConeViewer;
