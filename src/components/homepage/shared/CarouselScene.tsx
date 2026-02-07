"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTransform, MotionValue } from "framer-motion";
import { Environment, ContactShadows, Html, useProgress } from "@react-three/drei";
import { Cone } from "./Cone"; 
import type { Group } from "three";

const RADIUS = 6.5; 
const ENTRANCE_OFFSET = 20;

// 1. ADD rotationOffset TO YOUR DATA
const CONE_DATA = [
  { url: "/3d-cones/straight/beige_cone.glb", scale: 50, rotationOffset: 2.7 },
  { url: "/3d-cones/straight/black_cone_v01.glb", scale: 50, rotationOffset: 2.7 },
  { url: "/3d-cones/straight/white roll.glb", scale: 1, rotationOffset: 4.5 },
  { url: "/3d-cones/brown roll.glb", scale: 1.5, rotationOffset: 1.7 },
  { url: "/3d-cones/straight/Cone Glass Filter.glb", scale: 0.5, rotationOffset: 4.12 },
  { url: "/3d-cones/straight/Roll 1.glb", scale: 50, rotationOffset: 0.7 },
  { url: "/3d-cones/straight/Roll 2glb.glb", scale: 50, rotationOffset: 1.9 },
  { url: "/3d-cones/straight/Transparent Cone.glb", scale: 3.2, rotationOffset: 0 },
];

function Loader() {
  const { progress } = useProgress();
  return <Html center className="text-white font-mono">{progress.toFixed(0)}%</Html>;
}

function CarouselScene({ scrollProgress } : { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<Group>(null);
  // anti-clockwise
  // const groupRotation = useTransform(scrollProgress, [0.25, 1], [0, Math.PI * 2]);
  // clockwise
  const groupRotation = useTransform(scrollProgress, [0.25, 1], [0, -Math.PI * 2]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = groupRotation.get();
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Environment preset="city" />

      <group ref={groupRef}>
        {CONE_DATA.map((data, i) => {
          const angle = (i / CONE_DATA.length) * Math.PI * 2;
          const isLeft = i % 2 === 0;

          return (
            <CarouselItem 
              key={i}
              index={i}
              isLeft={isLeft}
              angle={angle}
              scrollProgress={scrollProgress}
              url={data.url}
              modelScale={data.scale}
              // 2. PASS THE OFFSET PROP
              rotationOffset={data.rotationOffset}
            />
          );
        })}
      </group>
      <ContactShadows opacity={0.4} scale={15} blur={2.4} far={4.5} />
    </>
  );
}

interface CarouselItemProps {
  index: number;
  isLeft: boolean;
  angle: number;
  scrollProgress: MotionValue<number>;
  url: string;
  modelScale: number;
  rotationOffset: number; // 3. ADD TYPE DEFINITION
}

function CarouselItem({ 
  index, 
  isLeft, 
  angle, 
  scrollProgress, 
  url, 
  modelScale,
  rotationOffset // 4. DESTRUCTURE PROP
}: CarouselItemProps) {
  const itemRef = useRef<Group>(null);
  
  const targetX = Math.sin(angle) * RADIUS;
  const targetZ = Math.cos(angle) * RADIUS;

  const startX = isLeft ? -ENTRANCE_OFFSET : ENTRANCE_OFFSET;
  const x = useTransform(scrollProgress, [0, 0.25], [startX, targetX]);
  
  const tumbleX = useTransform(scrollProgress, [0, 0.25], [Math.PI * (index + 2), 0]);
  const tumbleY = useTransform(scrollProgress, [0, 0.25], [Math.PI * (index * -1), 0]);
  const tumbleZ = useTransform(scrollProgress, [0, 0.25], [Math.PI * 5, 0]);
  const animationScale = useTransform(scrollProgress, [0, 0.2], [0, 1]);

  useFrame(() => {
    if (itemRef.current) {
      itemRef.current.position.set(x.get(), 0, targetZ);
      itemRef.current.rotation.x = tumbleX.get();
      
      // 5. APPLY THE OFFSET HERE
      // We add rotationOffset to the existing calculation
      itemRef.current.rotation.y = tumbleY.get() + angle + Math.PI + rotationOffset; 
      
      itemRef.current.rotation.z = tumbleZ.get();
      itemRef.current.scale.setScalar(animationScale.get());
    }
  });

  return (
    <group ref={itemRef}>
      <Cone url={url} scale={modelScale} /> 
    </group>
  );
}

// ... Rest of your file (CarouselCanvas, Cone component) remains exactly the same ...
// Don't forget to export CarouselCanvas
export default function CarouselCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
      <React.Suspense fallback={<Loader />}>
         <CarouselScene scrollProgress={scrollProgress} />
      </React.Suspense>
    </Canvas>
  );
}


// "use client";

// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useTransform, MotionValue } from "framer-motion";
// import { Environment, ContactShadows, Html, useProgress } from "@react-three/drei";
// import { Cone } from "./Cone"; 
// import type { Group } from "three";

// // Increased Radius to fit 8 cones comfortably
// const RADIUS = 5.5; 
// const ENTRANCE_OFFSET = 20;

// // --- CONFIGURATION FOR 8 CONES ---
// const CONE_DATA = [
//   { url: "/3d-cones/straight/beige_cone.glb", scale: 50 },
//   { url: "/3d-cones/straight/black_cone_v01.glb", scale: 50 },
//   { url: "/3d-cones/brown roll.glb", scale: 1.5 },
//   { url: "/3d-cones/straight/Cone Glass Filter.glb", scale: 0.5 },
//   { url: "/3d-cones/straight/Roll 1.glb", scale: 50 },
//   { url: "/3d-cones/straight/Roll 2glb.glb", scale: 50 },
//   { url: "/3d-cones/straight/Transparent Cone.glb", scale: 3 },
//   { url: "/3d-cones/straight/white roll.glb", scale: 1 },
// ];

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center className="text-white font-mono">{progress.toFixed(0)}%</Html>;
// }

// function CarouselScene({ scrollProgress } : { scrollProgress: MotionValue<number> }) {
//   const groupRef = useRef<Group>(null);

//   // Global rotation logic
//   const groupRotation = useTransform(scrollProgress, [0.25, 1], [0, Math.PI * 2]);

//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y = groupRotation.get();
//     }
//   });

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
//       <Environment preset="city" />

//       <group ref={groupRef}>
//         {CONE_DATA.map((data, i) => {
//           // Calculate angle for 8 items evenly spaced
//           const angle = (i / CONE_DATA.length) * Math.PI * 2;
          
//           // Alternate Left/Right entrance
//           // Evens come from Left, Odds come from Right
//           const isLeft = i % 2 === 0;

//           return (
//             <CarouselItem 
//               key={i}
//               index={i}
//               isLeft={isLeft}
//               angle={angle}
//               scrollProgress={scrollProgress}
//               url={data.url}
//               modelScale={data.scale}
//             />
//           );
//         })}
//       </group>

//       <ContactShadows opacity={0.4} scale={15} blur={2.4} far={4.5} />
//     </>
//   );
// }

// // --- INDIVIDUAL CONE LOGIC ---
// interface CarouselItemProps {
//   index: number;
//   isLeft: boolean;
//   angle: number;
//   scrollProgress: MotionValue<number>;
//   url: string;
//   modelScale: number;
// }

// function CarouselItem({ 
//   index, 
//   isLeft, 
//   angle, 
//   scrollProgress, 
//   url, 
//   modelScale
// }: CarouselItemProps) {
//   const itemRef = useRef<Group>(null);
  
//   const targetX = Math.sin(angle) * RADIUS;
//   const targetZ = Math.cos(angle) * RADIUS;

//   // Animation values
//   const startX = isLeft ? -ENTRANCE_OFFSET : ENTRANCE_OFFSET;
//   const x = useTransform(scrollProgress, [0, 0.25], [startX, targetX]);
  
//   // Chaos Rotation
//   const tumbleX = useTransform(scrollProgress, [0, 0.25], [Math.PI * (index + 2), 0]);
//   const tumbleY = useTransform(scrollProgress, [0, 0.25], [Math.PI * (index * -1), 0]);
  
//   // --- HORIZONTAL FIX ---
//   // End value is Math.PI / 2 (90 degrees) to make them lie flat horizontally
//   const tumbleZ = useTransform(scrollProgress, [0, 0.25], [Math.PI * 5, 0]);

//   // Entrance Growth Scale (0 -> 1)
//   const animationScale = useTransform(scrollProgress, [0, 0.2], [0, 1]);

// useFrame(() => {
//   if (itemRef.current) {
//     itemRef.current.position.set(x.get(), 0, targetZ);
    
//     itemRef.current.rotation.x = tumbleX.get();
    
//     // 2. Add Math.PI to Y to flip them Outward (Back-to-Center)
//     // The 'angle' faces the center, adding PI turns them around.
//     itemRef.current.rotation.y = tumbleY.get() + angle + Math.PI; 
    
//     itemRef.current.rotation.z = tumbleZ.get();
    
//     itemRef.current.scale.setScalar(animationScale.get());
//   }
// });

//   return (
//     <group ref={itemRef}>
//       <Cone url={url} scale={modelScale} /> 
//     </group>
//   );
// }

// interface CarouselCanvasProps {
//   scrollProgress: MotionValue<number>;
// }

// export default function CarouselCanvas({ scrollProgress }: CarouselCanvasProps) {
//   return (
//     // Increased Z position (18) to fit the larger radius
//     <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
//       <React.Suspense fallback={<Loader />}>
//          <CarouselScene scrollProgress={scrollProgress} />
//       </React.Suspense>
//     </Canvas>
//   );
// }