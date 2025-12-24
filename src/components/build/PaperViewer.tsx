"use client";

import React, { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { PaperType } from "./types";

interface PaperViewerProps {
  paperType: PaperType | null;
  paperColorHex?: string | null;
  paperTextureUrl?: string | null;
}

const defaultPaperColors: Record<PaperType, string> = {
  unbleached: "#8B6F47",
  hemp: "#9FAF8A",
  bleached: "#F9FAFB",
  colored: "#F97316",
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

const AnimatedPaper: React.FC<PaperViewerProps> = ({
  paperType,
  paperColorHex,
  paperTextureUrl,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const paperRef = useRef<THREE.Mesh>(null);
  const [scaleY, setScaleY] = useState(0.1);

  const texture = useOptionalTexture(paperTextureUrl || undefined);

  const baseColor = useMemo(() => {
    const effectiveType = paperType ?? "hemp";
    return paperColorHex || defaultPaperColors[effectiveType];
  }, [paperType, paperColorHex]);

  useEffect(() => {
    setScaleY(0.1); // reset open animation
  }, [paperType, paperColorHex, paperTextureUrl]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = -0.4 + Math.sin(t * 0.4) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.03;
    }

    setScaleY((prev) => {
      const target = 1;
      const next = prev + (target - prev) * Math.min(1, delta * 6);
      return next > 0.99 ? 1 : next;
    });

    if (paperRef.current) {
      paperRef.current.scale.y = scaleY;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={paperRef} rotation={[-Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[2.6, 1.6, 48, 6]} />
        <meshStandardMaterial
          key={paperTextureUrl || baseColor}
          color={baseColor}
          roughness={0.85}
          metalness={0.03}
          map={texture ?? null}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const PaperViewer: React.FC<PaperViewerProps> = (props) => {
  return (
    <div className="relative w-full h-[320px] md:h-[380px] rounded-xl border border-blue-400/40 bg-gradient-to-b from-slate-950 via-black to-slate-950 shadow-[0_0_25px_rgba(15,23,42,0.9)] overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0.8, 0.8, 3], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -4]} intensity={0.3} />

        <Suspense fallback={null}>
          <AnimatedPaper {...props} />
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

export default PaperViewer;
