"use client";

import React from "react";
import { useGLTF, Center } from "@react-three/drei";

interface ConeProps {
  url: string;
  scale?: number; // Add optional scale prop
  rotation?: [number, number, number]; // Add optional rotation prop
}

export function Cone({ url, scale = 1, rotation = [0, 0.5, 0] }: ConeProps) {
  const { scene } = useGLTF(url);
  const sceneClone = React.useMemo(() => scene.clone(), [scene]);

  return (
    <Center>
      {/* Adjust this scale manually if they look too big/small in the scene */}
      <primitive object={sceneClone} scale={scale} rotation={rotation}/>
    </Center>
  );
}