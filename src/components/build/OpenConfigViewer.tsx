"use client";

import React, { Suspense, useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CustomizationState, ConeSize, PaperType, FilterType } from "./types";

interface OpenConfigViewerProps {
  state: CustomizationState;
}

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

  const paperTexture = useOptionalTexture(state.paperTextureUrl ?? null);
  const filterTexture = useOptionalTexture(state.filterTextureUrl ?? null);

  // Wind-like zig-zag motion for paper sheet
  useFrame((stateFrame) => {
    const t = stateFrame.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t * 1.4) * 0.25;
      groupRef.current.rotation.z = Math.sin(t * 1.9) * 0.12;
    }
    if (paperRef.current) {
      // subtle flutter on one edge
      paperRef.current.rotation.y = Math.sin(t * 2.5) * 0.1;
    }
  });

  return (
    <group scale={sizeScale} ref={groupRef}>
      {/* Paper sheet with optional image texture */}
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.05, 0]} ref={paperRef}>
        <planeGeometry args={[3.1, 2.0, 24, 4]} />
        <meshStandardMaterial
          color={paperColor}
          roughness={paperTexture ? 0.6 : 0.75}
          metalness={0.03}
          map={paperTexture ?? null}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Filter in cylindrical "rolled" form with image texture */}
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.15, 0.95]}>
        <cylinderGeometry
          args={[0.22, 0.22, 2.6, 64, 1, true]} // open cylinder to look like rolled strip
        />
        <meshStandardMaterial
          color={filterColor}
          roughness={filterTexture ? 0.45 : 0.55}
          metalness={0.15}
          map={filterTexture ?? null}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ground shadow */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <circleGeometry args={[3.5, 64]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh> */}
    </group>
  );
};

const OpenConfigViewer: React.FC<OpenConfigViewerProps> = ({ state }) => {
  return (
    <div className="relative w-full h-[320px] md:h-[380px] rounded-xl border border-blue-400/40 bg-gradient-to-b from-slate-950 via-black to-slate-950 shadow-[0_0_25px_rgba(15,23,42,0.9)] overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [1.7, 1.6, 3.7], fov: 45 }}
        className="w-full h-full"
      >
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


