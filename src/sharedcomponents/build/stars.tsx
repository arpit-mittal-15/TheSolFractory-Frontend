import React, {useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Stars({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Build positions, colors and sizes
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // place stars in a large spherical shell so they appear "far away"
      const radius = 20 + Math.random() * 60; // from 20 to 80 units away
      // random direction
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius;
      const z = Math.cos(phi) * radius;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // star color - mostly white with tiny tint variation
      const tint = 0.85 + Math.random() * 0.25; // 0.85 - 1.1
      colors[i * 3 + 0] = tint;
      colors[i * 3 + 1] = tint;
      colors[i * 3 + 2] = tint;

      // size per star
      sizes[i] = 0.5 + Math.random() * 1.6; // tune base star size
    }

    return { positions, colors, sizes };
  }, [count]);

  // create geometry once
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, colors, sizes]);

  // soft circular sprite for stars (canvas texture)
  const sprite = useMemo(() => {
    const size = 44;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.2, "rgba(255,255,255,0.9)");
    grd.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    return tex;
  }, []);

  // PointsMaterial - use vertex colors and sprite
  const material = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size: 1.0, // base multiplier; per-star sizes will be read via attribute if we use a custom shader.
      map: sprite,
      alphaTest: 0.02,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
        // NOTE: PointsMaterial doesn't read a 'size' attribute by default.
        // We will scale the whole material size by the per-star size using a trick in useFrame
    });
    return m;
  }, [sprite]);

  // subtle global twinkle by changing opacity/size over time
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    // twinkle oscillation (gentle)
    const tw = 0.6 + Math.sin(t * 0.5) * 0.25;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0.25, Math.min(1, tw));
    // slightly vary base size for "depth" effect
    mat.size = 0.7 + Math.cos(t * 0.3) * 0.25;
  });

  return (
    <points ref={pointsRef} geometry={geometry} renderOrder={-1}>
      <primitive object={material} attach="material" />
    </points>
  );
}