"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { FilterType, ConeSize } from "./types";

interface FilterViewerProps {
  filterType: FilterType | null;
  filterColorHex?: string | null;
  filterTextureUrl?: string | null;
  coneSize?: ConeSize | null;
}

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

const sizeScaleMap: Record<ConeSize, number> = {
  "70mm": 0.8,
  "84mm": 0.95,
  "98mm": 1.1,
  "109mm": 1.25,
};

const AnimatedFilterPaper: React.FC<FilterViewerProps> = ({
  filterType,
  filterColorHex,
  filterTextureUrl,
  coneSize,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [foldProgress, setFoldProgress] = useState(0.0);
  const texture = useOptionalTexture(filterTextureUrl || undefined);

  const baseColor = useMemo(() => {
    if (filterColorHex) return filterColorHex;

    switch (filterType) {
      case "spiral":
        return "#0EA5E9";
      case "ceramic":
        return "#F9FAFB";
      case "glass":
        return "#A5F3FC";
      case "folded":
      default:
        return "#CBD5F5";
    }
  }, [filterType, filterColorHex]);

  const sizeScale = coneSize ? sizeScaleMap[coneSize] : 1;

  // Reset and animate "roll" progress when type or texture changes
  useEffect(() => {
    setFoldProgress(0);
  }, [filterType, filterColorHex, filterTextureUrl, coneSize]);

  useFrame((stateFrame, delta) => {
    const t = stateFrame.clock.getElapsedTime();

    // Slow auto rotation of the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.6;
    }

    // Roll-up animation progress
    setFoldProgress((prev) => {
      const target = 1;
      const next = prev + (target - prev) * Math.min(1, delta * 2.5);
      return next > 0.99 ? 1 : next;
    });
  });

  const roughness = filterTextureUrl ? 0.45 : 0.6;

  const commonMaterial = useMemo(
    () => (
      <meshStandardMaterial
        key={`filter-material-${filterTextureUrl || filterType || 'default'}-${filterColorHex || 'default'}`}
        color={baseColor}
        roughness={roughness}
        metalness={filterType === "glass" ? 0.6 : 0.18}
        transparent={filterType === "glass"}
        opacity={filterType === "glass" ? 0.65 : 1}
        envMapIntensity={filterType === "glass" ? 1.2 : 0.4}
        map={texture ?? null}
        side={THREE.DoubleSide}
      />
    ),
    [baseColor, roughness, filterType, texture, filterTextureUrl, filterColorHex]
  );

  return (
    <group ref={groupRef} scale={sizeScale}>
      {/* Folded: thick multi-layer toilet-paper style roll */}
      {filterType === "folded" && (
        <group>
          {/* Thick cylindrical roll made from multiple shells */}
          {Array.from({ length: 5 }).map((_, i) => {
            const layerRatio = i / 5;
            const radius = 0.28 + layerRatio * 0.2 * foldProgress; // grows as it rolls
            const height = 0.55 + layerRatio * 0.1;
            return (
              <mesh
                key={i}
                position={[0.7, 0.1, 0]}
                rotation={[-Math.PI / 2.1, 0, 0]}
              >
                <cylinderGeometry
                  args={[radius, radius, height, 72, 1, true]}
                />
                {commonMaterial}
              </mesh>
            );
          })}
        </group>
      )}

      {/* Spiral: similar thick roll plus zig-zag sheets between layers */}
      {filterType === "spiral" && (
        <group>
          {/* Main spiral-style roll built from multiple cylindrical shells */}
          {Array.from({ length: 6 }).map((_, i) => {
            const layerRatio = i / 6;
            const radius = 0.22 + layerRatio * 0.22 * foldProgress;
            const height = 0.95 + layerRatio * 0.1;
            const twist = layerRatio * Math.PI * 0.3 * foldProgress;
            return (
              <mesh
                key={i}
                position={[0.4, 0.05, 0]}
                rotation={[-Math.PI / 2.1, twist, 0]}
              >
                <cylinderGeometry
                  args={[radius, radius, height, 100, 1, true]}
                />
                {commonMaterial}
              </mesh>
            );
          })}

          {/* Zig-zag strips running across the hollow inner gap of the roll */}
          {Array.from({ length: 6 }).map((_, i) => {
            const ratio = i / 5;
            const angle = ratio * Math.PI * 2 + Math.PI * 0.4 * foldProgress;
            const innerR = 0.06; // well inside hollow core (roll starts around 0.22)
            const cx = 0.4; // roll center x-position
            const cz = 0;
            const x = cx + Math.cos(angle) * innerR;
            const z = cz + Math.sin(angle) * innerR;
            const tilt = (i % 2 === 0 ? 1 : -1) * 0.35;

            return (
              <mesh
                key={`zig-inner-${i}`}
                position={[x, 0.06, z]}
                rotation={[-Math.PI / 2.1, angle + tilt * 0.2, 0]}
              >
                {/* Small strip so it clearly stays inside hole */}
                <planeGeometry args={[0.16, 0.06, 6, 1]} />
                {commonMaterial}
              </mesh>
            );
          })}
        </group>
      )}

      {filterType === "ceramic" && (
        <group>
          <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
            <cylinderGeometry
              args={[0.3 * foldProgress, 0.3 * foldProgress, 0.7, 64, 1, true]}
            />
            <meshStandardMaterial
              color={baseColor}
              roughness={0.25}
              metalness={0.65}
              map={texture ?? null}
            />
          </mesh>
        </group>
      )}

      {filterType === "glass" && (
        <group>
          <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
            <cylinderGeometry
              args={[0.28 * foldProgress, 0.28 * foldProgress, 0.7, 64, 1, true]}
            />
            {commonMaterial}
          </mesh>
        </group>
      )}

      {/* Fallback simple strip if nothing selected yet */}
      {!filterType && (
        <mesh rotation={[-Math.PI / 2.3, 0, 0]}>
          <planeGeometry args={[2.2, 0.6, 1, 1]} />
          {commonMaterial}
        </mesh>
      )}

      {/* Ground */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <circleGeometry args={[3, 48]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh> */}
    </group>
  );
};

const FilterViewer: React.FC<FilterViewerProps> = (props) => {
  return (
    <div className="relative w-full h-[320px] md:h-[380px] rounded-xl border border-blue-400/40 bg-gradient-to-b from-slate-950 via-black to-slate-950 shadow-[0_0_25px_rgba(15,23,42,0.9)] overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [1.5, 1.3, 3.2], fov: 45 }}
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
          <AnimatedFilterPaper {...props} />
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

export default FilterViewer;


