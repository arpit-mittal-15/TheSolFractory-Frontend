"use client";

// BlenderViewer.tsx
// Place your GLB at: public/model.glb (default src)
// Install (run in project root):
// npm install three @react-three/fiber @react-three/drei

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  src?: string;
  className?: string;
  background?: string;
};

function Model({ src = "/model.glb" }: { src?: string }) {
  const group = useRef<THREE.Group | null>(null);
  const gltf = useGLTF(src) as any;
  const { camera } = useThree();

  useEffect(() => {
    if (!gltf || !gltf.scene || !group.current) return;

    // Put the loaded scene under our group so transforms apply to the whole model
    // (we render <primitive object={gltf.scene}/> inside the group)

    // Let the scene update matrices before computing bounds
    gltf.scene.updateMatrixWorld(true);

    // Compute bounding box of the model (using the scene inside our group)
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Center the model: move the scene so its center is at origin (we can also move the group)
    // We'll position the gltf.scene relative to the group so camera framing is simpler.
    gltf.scene.position.x = -center.x;
    gltf.scene.position.y = -center.y;
    gltf.scene.position.z = -center.z;

    // Scale model so it isn't tiny. Choose a desired size in scene units.
    const desiredSize = 2.5; // tweak this if you want the model larger/smaller by default
    const safeMaxDim = maxDim > 0 ? maxDim : 1;
    const scale = desiredSize / safeMaxDim;
    gltf.scene.scale.setScalar(scale);

    // Recompute bounding box after transforms
    const newBox = new THREE.Box3().setFromObject(gltf.scene);
    const newSize = newBox.getSize(new THREE.Vector3());
    const newMax = Math.max(newSize.x, newSize.y, newSize.z);

    // Fit camera: compute a distance so the model fits the view frustum
        // compute camera distance required to frame the object
    // IMPORTANT: camera can be PerspectiveCamera OR OrthographicCamera
    let cameraDistance = 5;

    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
      const fov = (perspectiveCamera.fov * Math.PI) / 180;
      cameraDistance = Math.abs((newMax / 2) / Math.tan(fov / 2));
    } else {
      // Orthographic fallback (rare, but keeps TS happy)
      cameraDistance = newMax * 2;
    }

    const padded = cameraDistance * 1.6 + 0.5;

    // place camera on Z axis
    camera.position.set(0, 0, padded);
    camera.near = 0.01;
    camera.far = padded * 50 + 1000;
    camera.updateProjectionMatrix();

    // Ensure the group is at origin (we only translated/scaled the gltf.scene itself)
    if (group.current) group.current.position.set(0, 0, 0);
  }, [gltf, camera]);

  return (
    <group ref={group}>
      {/* Render the loaded scene inside our group so we can control transforms if needed */}
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function BlenderViewer({
  src = "/model.glb",
  className = "w-full h-full",
  background = "transparent",
}: Props) {
  const controlsRef = useRef<any>(null);

  // Preload for smoother UX
  useEffect(() => {
    try {
      useGLTF.preload(src);
    } catch (e) {
      // ignore
    }
  }, [src]);

  return (
    <div className={className} style={{ width: "98vw", height: "60vh", background }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        {/* <color attach="background" args={[background]} /> */}

        {/* Simple lighting — adjust or add as needed */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={0.9} />
        <hemisphereLight groundColor={0x444444} intensity={0.3} />

        <Suspense fallback={<Html center>Loading model…</Html>}>
          <Model src={src} />
        </Suspense>

        {/* OrbitControls: allow rotate + zoom, disallow pan so model can't be dragged off-screen */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.1}
          enableZoom={true}
          enablePan={false}
          enableRotate={true}

          /* MUCH WIDER ZOOM RANGE */
          minDistance={0.05}   // can zoom very close
          maxDistance={200}    // can zoom very far out

          /* Faster zoom so scroll feels responsive */
          zoomSpeed={1}
          rotateSpeed={0.8}

          /* Allow full vertical rotation */
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
}

// Notes / Troubleshooting
// 1) Put your file at `/public/model.glb`. In dev the path is '/model.glb'.
// 2) Open the browser console — if you see CORS or 404 errors, the model isn't being served.
// 3) If the model still doesn't appear, try a known-working sample GLB (e.g. a simple cube/glTF)
//    to rule out an invalid/corrupt file.
// 4) If your GLB uses Draco compression, you'll need to configure the DRACOLoader (three/examples/jsm/loaders/DRACOLoader)
//    and pass it to useGLTF: useGLTF('/model.glb', true, loader => loader.setDRACOLoader(...))
