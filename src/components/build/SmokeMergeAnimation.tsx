"use client";

import React, { Suspense, useMemo, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/sampledata/products";

// Wood texture generator
function generateWoodTexture(): THREE.DataTexture {
  const size = 512;
  const data = new Uint8Array(size * size * 4);
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i * size + j) * 4;
      const x = (i / size) * 20;
      const y = (j / size) * 20;
      
      const grain = Math.sin(y * 0.5) * 0.3 + Math.sin(y * 2) * 0.1;
      const rings = Math.sin(x * 0.3) * 0.2;
      const noise1 = Math.sin(x * 3 + y * 0.5) * 0.1;
      const noise2 = Math.sin(x * 7 + y * 1.2) * 0.05;
      
      let r = 200 + grain * 30 + rings * 20 + noise1 * 15 + noise2 * 10;
      let g = 168 + grain * 25 + rings * 15 + noise1 * 12 + noise2 * 8;
      let b = 118 + grain * 20 + rings * 12 + noise1 * 10 + noise2 * 6;
      
      const darkGrain = Math.abs(Math.sin(y * 0.5)) < 0.1 ? 0.7 : 1.0;
      r *= darkGrain;
      g *= darkGrain;
      b *= darkGrain;
      
      data[index] = Math.max(0, Math.min(255, r));
      data[index + 1] = Math.max(0, Math.min(255, g));
      data[index + 2] = Math.max(0, Math.min(255, b));
      data[index + 3] = 255;
    }
  }
  
  const texture = new THREE.DataTexture(data, size, size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 3);
  texture.needsUpdate = true;
  return texture;
}

let woodTextureCache: THREE.DataTexture | null = null;
function getWoodTexture(): THREE.DataTexture {
  if (!woodTextureCache) {
    woodTextureCache = generateWoodTexture();
  }
  return woodTextureCache;
}

// Easing functions
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

// Main animation scene - simplified for smoke section
interface SmokeMergingSceneProps {
  isAnimating: boolean;
  settleProgress: number;
  onAnimationComplete?: () => void;
}

const SmokeMergingScene: React.FC<SmokeMergingSceneProps> = ({ 
  isAnimating, 
  settleProgress,
  onAnimationComplete 
}) => {
  const paperRef = useRef<THREE.Mesh>(null);
  const filterRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [animProgress, setAnimProgress] = React.useState(0);
  const animationCompleteRef = useRef(false);

  // Skin-tone paper color
  const paperColor = useMemo(() => {
    const color = new THREE.Color("#F5D5B8");
    return '#' + color.getHexString();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      setAnimProgress(0);
      animationCompleteRef.current = false;
    }
  }, [isAnimating]);

  useFrame((_, delta) => {
    if (isAnimating && animProgress < 1) {
      const newProgress = Math.min(1, animProgress + delta * 0.35);
      setAnimProgress(newProgress);

      if (newProgress >= 1 && !animationCompleteRef.current) {
        animationCompleteRef.current = true;
        setTimeout(() => {
          onAnimationComplete?.();
        }, 300);
      }
    }

    // Animation logic
    if (paperRef.current && filterRef.current && groupRef.current) {
      if (!isAnimating) {
        // Show rolls horizontally
        const t = Date.now() * 0.001;
        const floatY = Math.sin(t) * 0.1;
        
        // Paper roll on RIGHT (larger size)
        paperRef.current.position.set(2.5, floatY, 0);
        paperRef.current.rotation.set(-Math.PI / 2, 0, 0);
        paperRef.current.scale.set(1, 1, 1);

        // Filter roll on LEFT (larger size)
        filterRef.current.position.set(-2.5, floatY, 0);
        filterRef.current.rotation.set(-Math.PI / 2, 0, 0);
        filterRef.current.scale.set(1, 1, 1);

        groupRef.current.rotation.set(0, 0, 0);

        // Reset geometries to initial roll state (larger sizes)
        if (paperRef.current.geometry) {
          paperRef.current.geometry.dispose();
          (paperRef.current.geometry as THREE.CylinderGeometry) = new THREE.CylinderGeometry(
            0.28, 0.50, 5.5, 32
          );
        }
        if (filterRef.current.geometry) {
          filterRef.current.geometry.dispose();
          (filterRef.current.geometry as THREE.CylinderGeometry) = new THREE.CylinderGeometry(
            0.25, 0.40, 1.6, 64
          );
        }
      } else {
        // Animation phases
        const phase1 = Math.min(1, animProgress * 2.5); // Move together (0-0.4)
        const phase2 = Math.max(0, Math.min(1, (animProgress - 0.4) * 2)); // Rotate vertical (0.4-0.9)
        const phase3 = Math.max(0, Math.min(1, (animProgress - 0.7) * 3.33)); // Form cone (0.7-1.0)

        // Phase 1: Move toward center
        const moveEase = easeInOutCubic(phase1);
        const paperX = 2.5 - moveEase * 2.5;
        const filterX = -2.5 + moveEase * 2.5;

        // Phase 2: Rotate to vertical
        const rotateEase = easeOutQuart(phase2);
        const rotationAngle = -Math.PI / 2 + rotateEase * (Math.PI / 2);

        // Phase 3: Transform into cone (larger sizes)
        const coneEase = easeInOutCubic(phase3);
        
        // Paper transforms into cone body (larger)
        const paperTopRadius = 0.28 + coneEase * (0.25 - 0.28);
        const paperBottomRadius = 0.50 - coneEase * (0.50 - 0.17);
        const paperHeight = 5.5 - coneEase * (5.5 - 3.8);
        const paperY = coneEase * 2.0;

        // Filter transforms into cone tip (larger)
        const filterTopRadius = 0.50 - coneEase * (0.50 - 0.17); //0.25 - coneEase * (0.25 - 0.17);
        const filterBottomRadius = 0.40 - coneEase * (0.40 - 0.20);
        const filterHeight = 1.6 - coneEase * (1.6 - 0.8);
        const filterY = paperY - (paperHeight / 2) - (filterHeight / 2) * coneEase;

        // Apply transformations
        paperRef.current.position.set(paperX * (1 - phase2), paperY, 0);
        paperRef.current.rotation.set(rotationAngle, 0, 0);
        paperRef.current.scale.set(1, 1, 1);

        filterRef.current.position.set(filterX * (1 - phase2), filterY, 0);
        filterRef.current.rotation.set(rotationAngle, 0, 0);
        filterRef.current.scale.set(1, 1, 1);

        // Update geometries
        if (phase3 > 0) {
          if (paperRef.current.geometry) {
            paperRef.current.geometry.dispose();
            (paperRef.current.geometry as THREE.CylinderGeometry) = new THREE.CylinderGeometry(
              paperTopRadius,
              paperBottomRadius,
              paperHeight,
              80,
              1,
              true
            );
          }

          if (filterRef.current.geometry) {
            filterRef.current.geometry.dispose();
            (filterRef.current.geometry as THREE.CylinderGeometry) = new THREE.CylinderGeometry(
              filterTopRadius, //* 0.64,
              filterBottomRadius,
              filterHeight,
              48
            );
          }
        }

        // Rotate and settle scene for better view and final horizontal presentation
        const baseY = phase2 * Math.PI * 0.3;
        const horizontalBlend = settleProgress; // 0 -> stay vertical, 1 -> lay horizontal
        // Final pose: parallel to top border, cone tip to the right, filter to the left
        const targetX = 0; // no pitch, stay level
        const targetY = 0; // face forward
        const targetZ = Math.PI * 0.5; // rotate so cone points right, filter left
        const currentX = THREE.MathUtils.lerp(rotationAngle, targetX, horizontalBlend);
        const currentY = THREE.MathUtils.lerp(baseY, targetY, horizontalBlend);
        const currentZ = THREE.MathUtils.lerp(0, targetZ, horizontalBlend);
        groupRef.current.rotation.set(currentX, currentY, currentZ);

        // Subtle lift when settled
        groupRef.current.position.y = THREE.MathUtils.lerp(0, 0.25, horizontalBlend);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Paper Roll - Skin tone */}
      <mesh ref={paperRef} castShadow>
        <cylinderGeometry args={[0.28, 0.50, 5.5, 32]} />
        <meshStandardMaterial
          color={paperColor}
          roughness={0.82}
          metalness={0.05}
          emissive={"#F5E5D5"}
          emissiveIntensity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Filter Roll - Light brown */}
      <mesh ref={filterRef} castShadow>
        <cylinderGeometry args={[0.25, 0.40, 1.6, 64]} />
        <meshStandardMaterial
          color="#D4AF85"
          roughness={0.78}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Viewer component for smoke section
interface SmokeMergeAnimationViewerProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export const SmokeMergeAnimationViewer: React.FC<SmokeMergeAnimationViewerProps> = ({
  isVisible,
  onAnimationComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [settled, setSettled] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !hasStartedRef.current) {
      hasStartedRef.current = true;
      // Start animation after a brief delay
      setTimeout(() => {
        setIsAnimating(true);
      }, 500);
    } else if (!isVisible) {
      hasStartedRef.current = false;
      setIsAnimating(false);
      setShowButton(false);
      setSettled(false);
    }
  }, [isVisible]);

  const handleAnimationComplete = () => {
    setShowButton(true);
    // After cone is built, settle it above the CTA with a gentle slide/tilt
    setTimeout(() => setSettled(true), 250);
    onAnimationComplete?.();
  };

  if (!isVisible) return null;

  return (
    <div 
      className=" relative w-full h-full flex flex-col items-center justify-start"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        paddingTop: "10px",
      }}
    >
      {/* Animation Canvas */}
      <div 
        className="z-3333 relative w-full h-full transition-all duration-800 ease-out"
        style={{
          maxWidth: "800px",
          maxHeight: "600px",
          transform: settled
            ? "translateY(-130px) translateX(142px) scale(0.9)"
            : "translateY(28px) translateX(0px) scale(1)",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 8], fov: 45 }}
          className="w-full h-full"
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        >
          {/* Transparent background - no color element, smoke shows through */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.3}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <hemisphereLight args={["#d1e5ff", "#0f172a", 0.35]} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.35}
            penumbra={1}
            intensity={0.55}
            castShadow
          />
          <pointLight position={[-6, 2.5, -6]} intensity={0.5} color={"#8ab4ff"} />
          <pointLight position={[6, 2.5, 6]} intensity={0.4} color={"#f7dba7"} />

          <Suspense fallback={null}>
            <SmokeMergingScene
              isAnimating={isAnimating}
              settleProgress={settled ? 1 : 0}
              onAnimationComplete={handleAnimationComplete}
            />
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.45}
              scale={10}
              blur={2.2}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.06}
            minDistance={5}
            maxDistance={12}
          />
        </Canvas>
      </div>

      {/* Button and Text Overlay - appears after animation */}
      {showButton && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700"
          style={{
            pointerEvents: "auto",
            zIndex: 60,
          }}
        >
          <div className="relative w-[90%] max-w-3xl flex justify-center flex-col items-center text-center space-y-6 px-8 py-10 bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-200">
              Build Your Perfect Cone
            </h2>
                  <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
            <p className="text-lg md:text-xl text-white/95 max-w-2xl leading-relaxed drop-shadow-lg font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eum! Similique ipsa facilis modi eius amet debitis enim eligendi. Fuga nemo vero cum reiciendis eius harum deleniti iste ducimus similique
            </p>
          <Link href="/build">
            <Button
              size="lg"
              className="cursor-pointer mt-2 bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white text-xl px-12 py-7 rounded-full font-bold shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:scale-105 border border-white/30"
            >
              Start Building
            </Button>
          </Link>
          </div>
        </div>
      )}
    </div>
  );
};

