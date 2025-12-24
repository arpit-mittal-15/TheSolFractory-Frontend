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

const paperColorMap: Record<PaperType, string> = {
  unbleached: "#8B6F47",
  hemp: "#A8E6CF",
  bleached: "#F9FAFB",
  colored: "#F97316",
};

// Darker and more varied filter palette
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

function useOptionalTexture(url?: string | null) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!url) {
      setTexture((prevTex) => {
        if (prevTex) {
          prevTex.dispose();
        }
        return null;
      });
      return;
    }

    const loader = new THREE.TextureLoader();
    let cancelled = false;

    loader.load(
      url,
      (tex) => {
        if (!cancelled) {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(1, 1);
          tex.needsUpdate = true;
          setTexture((prevTex) => {
            if (prevTex) {
              prevTex.dispose();
            }
            return tex;
          });
        }
      },
      undefined,
      (error) => {
        console.error("Failed to load texture:", error);
        if (!cancelled) {
          setTexture((prevTex) => {
            if (prevTex) {
              prevTex.dispose();
            }
            return null;
          });
        }
      }
    );

    return () => {
      cancelled = true;
      setTexture((prevTex) => {
        if (prevTex) {
          prevTex.dispose();
        }
        return null;
      });
    };
  }, [url]);

  return texture;
}

const ConeMesh: React.FC<ConeViewerProps> = ({ state, focusStep }) => {
  const paperTexture = useOptionalTexture(state.paperTextureUrl ?? null);
  const filterTexture = useOptionalTexture(state.filterTextureUrl ?? null);

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

  return (
    <group scale={1.15}>
      {/* Pre-roll body: tapered tube with slight lip at the open end */}
      <mesh position={[0, 0.28 * sizeScale, 0]} castShadow>
        <cylinderGeometry
          args={[0.32 * sizeScale, 0.12 * sizeScale, 1.9 * sizeScale, 80, 1, true]}
        />
        <meshStandardMaterial
          color={paperColor}
          roughness={paperTexture ? 0.55 : 0.62}
          metalness={0}
          map={paperTexture ?? null}
          emissive={paperColor}
          emissiveIntensity={highlightEmissive}
        />
      </mesh>

      {/* Filter / crutch */}
      <mesh position={[0, -0.95 * sizeScale, 0]} castShadow>
        <cylinderGeometry
          args={[0.14 * sizeScale, 0.14 * sizeScale, 0.36 * sizeScale, 48]}
        />
        <meshStandardMaterial
          color={filterColor}
          roughness={filterTexture ? 0.28 : 0.32}
          metalness={0.12}
          map={filterTexture ?? null}
          emissive={focusStep === "filter" ? filterColor : "#000000"}
          emissiveIntensity={focusStep === "filter" ? 0.35 : 0.04}
        />
      </mesh>

      {/* Simple ground */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
        <circleGeometry args={[1.25, 64]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh> */}
    </group>
  );
};

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


