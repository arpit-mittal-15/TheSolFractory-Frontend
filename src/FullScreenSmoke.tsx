"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type FullScreenSmokeProps = {
  heading: string;
  paragraph: string;
  particleCount?: number;
};

export default function FullScreenSmoke({
  heading,
  paragraph,
  particleCount = 120,
}: FullScreenSmokeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    particles?: THREE.Mesh[];
    animationId?: number;
  }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ----------------- THREE SETUP ----------------- */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      4000
    );
    camera.position.z = 1000;

    /* ----------------- LIGHTING ----------------- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(-1, 0, 1);
    scene.add(dir);

    /* ----------------- SMOKE MATERIAL ----------------- */
    const textureLoader = new THREE.TextureLoader();
    const smokeTexture = textureLoader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
    );

    const smokeMaterial = new THREE.MeshLambertMaterial({
      map: smokeTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const smokeGeometry = new THREE.PlaneGeometry(300, 300);
    const particles: THREE.Mesh[] = [];

    /* ----------------- PARTICLES ----------------- */
    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(smokeGeometry, smokeMaterial);

      mesh.position.set(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1000
      );

      mesh.rotation.z = Math.random() * Math.PI * 2;
      const scale = 0.8 + Math.random() * 2.2;
      mesh.scale.setScalar(scale);

      mesh.userData = {
        seed: Math.random(),
        baseScale: scale,
      };

      scene.add(mesh);
      particles.push(mesh);
    }

    /* ----------------- RESIZE ----------------- */
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ----------------- ANIMATION LOOP ----------------- */
    const animate = (time: number) => {
      particles.forEach((p) => {
        const t = time * 0.0004 + p.userData.seed * 10;

        p.rotation.z += 0.0015;
        p.position.x += Math.sin(t) * 0.15;
        p.position.y += Math.cos(t * 1.3) * 0.12;
      });

      renderer.render(scene, camera);
      stateRef.current.animationId = requestAnimationFrame(animate);
    };

    stateRef.current = {
      renderer,
      scene,
      camera,
      particles,
    };

    animate(0);

    /* ----------------- CLEANUP ----------------- */
    return () => {
      window.removeEventListener("resize", onResize);
      if (stateRef.current.animationId) {
        cancelAnimationFrame(stateRef.current.animationId);
      }

      particles.forEach((p) => {
        scene.remove(p);
        p.geometry.dispose();
      });

      smokeMaterial.map?.dispose();
      smokeMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      {/* Smoke Canvas */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: "0 1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            maxWidth: "720px",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {paragraph}
        </p>
      </div>
    </section>
  );
}
