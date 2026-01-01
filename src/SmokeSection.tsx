// components/SmokeSection.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { SmokeMergeAnimationViewer } from "@/src/components/build/SmokeMergeAnimation";

type ParticleUserData = {
  baseX: number;
  baseY: number;
  baseZ: number;
  seed: number;
  baseScale: number;
  wavePhase: number;
  waveAmplitude: number;
  waveFrequency: number;
};

type SmokeState = {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  smokeParticles: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>[];
  material: THREE.MeshLambertMaterial | null;
  animId: number | null;
  lastScrollY: number;
  scrollProgress: number;
  vacuum: number;
  opacity: number;
  sectionOffsetTop: number;
};

export default function SmokeSection({ particleCount = 120 }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const spacerBeforeRef = useRef<HTMLDivElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  const stateRef = useRef<SmokeState>({
    renderer: null,
    scene: null,
    camera: null,
    smokeParticles: [] as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>[],
    material: null,
    animId: null,
    lastScrollY: 0,
    scrollProgress: 0, // 0..1
    vacuum: 0, // 0..1, 1 means vacuum on (pulled)
    opacity: 0, // 0..1, controls smoke visibility
    sectionOffsetTop: 0, // position of section in document flow
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Basic three setup ---
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.z = 1000;

    // lighting
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(-1, 0, 1);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // load texture
    const loader = new THREE.TextureLoader();
    const smokeURL =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png";

    // We'll create one material (shared) and many meshes (planes).
    const smokeMaterial = new THREE.MeshLambertMaterial({
      map: loader.load(smokeURL),
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.NormalBlending,
      color: new THREE.Color(0xFFFFFF),
    });

    const smokeGeo = new THREE.PlaneGeometry(300, 300);
    const smokeParticles: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>[] = [];

    // Particle initial positions distributed across screen for wavy effect
    // We'll store base positions on the mesh.userData for deterministic movement.
    // When particleProgress=1, we want particles centered around x=0, spread from -800 to +800
    // So baseX should be around -1500 to -500, and travel should be around 1500
    for (let i = 0; i < particleCount; i++) {
      const m = new THREE.Mesh(smokeGeo, smokeMaterial);
      // Distribute particles starting from left side
      // When particleProgress=1, they'll be at baseX + 1500, which centers them around 0
      const x = -1200 + (i / particleCount) * 900; // start from -1200 to -300
      const y = (Math.random() - 0.5) * window.innerHeight * 1.1;
      const z = (Math.random() - 0.5) * 1000;
      m.position.set(x, y, z);
      m.rotation.z = Math.random() * Math.PI * 2;
      const scl = 0.7 + Math.random() * 1.3;
      m.scale.setScalar(scl);
      m.userData = {
        baseX: x,
        baseY: y,
        baseZ: z,
        seed: Math.random(),
        baseScale: scl,
        wavePhase: Math.random() * Math.PI * 2, // phase for wavy movement
        waveAmplitude: 30 + Math.random() * 60, // amplitude for wavy movement
        waveFrequency: 0.45 + Math.random() * 0.95, // frequency for wavy movement
      } as ParticleUserData;
      scene.add(m);
      smokeParticles.push(m);
    }

    // Save refs to stateRef for use in animation and cleanup
    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.smokeParticles = smokeParticles;
    stateRef.current.material = smokeMaterial;

    // Resize handler
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // Scroll mapping
    // We'll compute `progress` (0..1) when the section crosses the viewport.
    function computeProgress() {
      if (!spacerBeforeRef.current) return { progress: 0, opacity: 0, bgOpacity: 0 };
      
      // Get the position of the spacer before the section (which represents where section starts in scroll)
      const spacerRect = spacerBeforeRef.current.getBoundingClientRect();
      const h = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate the section's position in document flow
      // Reduced section: fade in + hold + fade out - end before footer but keep visible longer
      const sectionTop = spacerRect.top + scrollY;
      const sectionHeight = h * 2.4; // slower scroll progression across the smoke section
      const sectionBottom = sectionTop + sectionHeight;
      
      // Calculate progress based on scroll position relative to section
      const viewportTop = scrollY;
      
      // Progress: 0 when viewport top reaches section start, 1 when viewport top reaches section end
      let progress = (viewportTop - sectionTop) / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      // Calculate opacity - keep visible longer but still zero before footer:
      // - Fade in: progress 0->0.12 (first 12%)
      // - Full opacity: progress 0.12->0.45 (middle 33%)
      // - Fade out: progress 0.45->0.70 (25% fade out)
      // - FORCE HIDDEN: progress > 0.70 (last 30% = buffer before footer)
      let opacity = 0;
      let bgOpacityVal = 0;
      if (progress < 0.12) {
        opacity = progress / 0.12;
        bgOpacityVal = progress / 0.12;
      } else if (progress < 0.45) {
        opacity = 1;
        bgOpacityVal = 1;
      } else if (progress < 0.70) {
        opacity = Math.max(0, 1 - (progress - 0.45) / 0.25);
        bgOpacityVal = 1; // keep background black while smoke fades
      } else {
        opacity = 0;
        bgOpacityVal = 1; // keep background black after smoke finishes; will revert when scrolling upward
      }
      
      return { progress, opacity, bgOpacity: bgOpacityVal };
    }

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    function onScroll() {
      const cur = window.scrollY;
      stateRef.current.lastScrollY = cur;

      const { progress, opacity, bgOpacity: bgOpacityCalc } = computeProgress();
      
      // Decide animation visibility on latest opacity/progress snapshot
      if (opacity > 0.8 && progress >= 0.12 && progress <= 0.45) {
        setShowAnimation(true);
      } else {
        setShowAnimation(false);
      }

      // Drive a single source of truth for opacity
      const clampedOpacity = Math.max(0, opacity);
      const clampedBg = Math.max(0, bgOpacityCalc);
      setBgOpacity(clampedBg);
      
      // Smooth tween to new scrollProgress and opacity (gsap for polish)
      gsap.to(stateRef.current, {
        duration: 0.2,
        scrollProgress: progress,
        opacity: clampedOpacity,
        ease: "power2.out",
        onUpdate: () => {
          // During tween, keep material and section in sync
          const finalOpacity = Math.max(0, stateRef.current.opacity);
          smokeMaterial.opacity = finalOpacity * 0.9;
          if (sectionRef.current) {
            sectionRef.current.style.opacity = finalOpacity.toString();
            sectionRef.current.style.visibility = finalOpacity > 0.01 ? "visible" : "hidden";
            sectionRef.current.style.display = finalOpacity > 0.01 ? "block" : "none";
            sectionRef.current.style.zIndex = finalOpacity > 0.01 ? "40" : "-999";
          }
        },
      });

      // If scrolling up, enable vacuum a bit, else reduce vacuum.
    //   if (!dirDown) {
    //     // scrolling up -> vacuum on gently
    //     gsap.to(stateRef.current, { duration: 0.6, vacuum: 1, ease: "power2.out" });
    //   } else {
    //     // scrolling down -> vacuum off
    //     gsap.to(stateRef.current, { duration: 0.6, vacuum: 0, ease: "power2.out" });
    //   }

      // small debounce to force vacuum off if user stops
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // when user stops scrolling, leak vacuum back to 0 slowly
        gsap.to(stateRef.current, { duration: 1.2, vacuum: 0, ease: "power2.out" });
      }, 350);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // animation loop
    let prevTime = performance.now();
    function animate(now: number) {
      const dt = (now - prevTime) / 1000;
      prevTime = now;

      const s = stateRef.current;
      const particles = s.smokeParticles;
      const prog = s.scrollProgress; // 0..1 (over entire 400vh scroll)
      const vac = s.vacuum; // 0..1
      const opacity = s.opacity; // 0..1

      // Skip rendering if completely hidden (optimization + ensures no fog on footer)
      if (opacity <= 0) {
        // Hide all particles
        particles.forEach(p => p.visible = false);
        renderer.render(scene, camera);
        s.animId = requestAnimationFrame(animate);
        return;
      }
      
      // Keep particles centered once fully visible (no slide-off to the right)
      // Fade in only until progress ~0.25, then stay put; opacity is handled separately.
      let particleProgress = 0;
      if (prog < 0.25) {
        // Fade in: particles move into view
        particleProgress = prog / 0.25; // 0 -> 1
      } else {
        // Hold: stay centered for the rest of the section
        particleProgress = 1;
      }

      // parameters
      const travel = 1200; // how far particles travel when progress=1
      // With baseX from -1200 to -300, and travel=1200, final positions will be roughly -300 to 900
      // This centers particles on screen when particleProgress=1
      const rotSpeed = 0.08;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const u = p.userData as ParticleUserData;
        
        // Ensure particle is visible when there's opacity
        p.visible = true;
        
        // time-based for wavy movement
        const t = now * 0.0008 + u.seed * 10;
        
        // Wavy horizontal movement - multiple sine waves for organic wavy pattern
        const wave1 = Math.sin(t * u.waveFrequency + u.wavePhase) * u.waveAmplitude;
        const wave2 = Math.sin(t * u.waveFrequency * 0.7 + u.wavePhase + Math.PI / 3) * (u.waveAmplitude * 0.6);
        const wave3 = Math.cos(t * u.waveFrequency * 0.5 + u.wavePhase + Math.PI / 2) * (u.waveAmplitude * 0.4);
        const wavyOffset = wave1 + wave2 + wave3;
        
        // base target x = baseX + particleProgress * travel + wavy offset
        // During hold period, particleProgress stays at 1, so particles stay in position
        // We want particles to be centered around screen center (x=0) when particleProgress=1
        // So: baseX starts negative, and travel should bring them to center area
        const targetX = u.baseX + particleProgress * travel + wavyOffset;
        // Vacuum adds extra left pull: when vac > 0, blend target back toward very-left value
        const vacuumPullX = -1200; // extreme left when vacuum is on
        const finalX = THREE.MathUtils.lerp(targetX, vacuumPullX, vac * 0.95);
        // smooth movement
        p.position.x += (finalX - p.position.x) * (0.1 + particleProgress * 0.06);

        // Wavy vertical movement - sine waves for up/down wavy motion
        const verticalWave1 = Math.sin(t * 0.8 + u.seed * 5) * (40 + u.seed * 50);
        const verticalWave2 = Math.cos(t * 0.6 + u.seed * 7) * (30 + u.seed * 40);
        const verticalOffset = verticalWave1 + verticalWave2;
        // During hold period, keep particles centered vertically
        const verticalProg = particleProgress;
        const ty = u.baseY + verticalOffset + (verticalProg - 0.5) * 80;
        p.position.y += (ty - p.position.y) * 0.07;

        // z nudging with wavy pattern for depth
        const zWave = Math.sin(t * 0.5 + u.seed * 3) * 110;
        // During hold period, keep particles at good depth
        const zProg = particleProgress;
        const tz = u.baseZ + (zProg - 0.5) * 250 + zWave;
        p.position.z += (tz - p.position.z) * 0.05;

        // rotate slowly with slight variation
        p.rotation.z += rotSpeed * dt * (0.5 + u.seed * 0.5);
        
        // Scale based on particle progress and opacity
        const targetScale = u.baseScale * (0.75 + particleProgress * 1.5 - vac * 0.6) * (0.7 + opacity * 0.3);
        p.scale.x += (targetScale - p.scale.x) * 0.06;
        p.scale.y = p.scale.x;
      }

      renderer.render(scene, camera);
      s.animId = requestAnimationFrame(animate);
    }
    stateRef.current.animId = requestAnimationFrame(animate);

    // initial scroll compute so smoke starts at correct position if user already scrolled
    const initial = computeProgress();
    gsap.set(stateRef.current, { 
      scrollProgress: initial.progress, 
      opacity: initial.opacity,
      vacuum: 0 
    });
    // ensure material opacity initial
    smokeMaterial.opacity = initial.opacity * 0.9;

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId);
      // dispose three resources
      smokeParticles.forEach((m) => {
        scene.remove(m);
        if (m.geometry) m.geometry.dispose();
        // material is shared; dispose once below
      });
      if (smokeMaterial.map) smokeMaterial.map.dispose();
      smokeMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [particleCount]);

  return (
    <>
      {/* Spacer to maintain scroll position */}
      <div ref={spacerBeforeRef} style={{ height: "100vh" }} />
      <section
        id="smoke-section"
        ref={sectionRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: bgOpacity > 0.01 ? 40 : -999,
          background: `rgba(0,0,0,${Math.max(0, bgOpacity)})`,
          opacity: Math.max(0, bgOpacity),
          visibility: bgOpacity > 0.01 ? "visible" : "hidden",
          display: bgOpacity > 0.01 ? "block" : "none",
        }}
      >
        {/* Canvas container */}
        <div
          ref={containerRef}
          className="smoke-container"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        {/* Merge Animation Overlay */}
        <SmokeMergeAnimationViewer 
          isVisible={showAnimation}
        />
      </section>
      {/* Spacer to ensure footer stays clear even with slower smoke progression */}
      <div style={{ height: "120vh" }} />
    </>
  );
}
