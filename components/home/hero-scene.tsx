"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const pointer = { x: 0, y: 0 };

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.1;
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, pointer.y * 0.2, 0.04);
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, pointer.x * 0.12, 0.04);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <mesh ref={meshRef} position={[3.1, 0.3, -1.8]} scale={1.05}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color="#ff4328"
          roughness={0.7}
          metalness={0}
          distort={0.35}
          speed={1.4}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduceMotion && wideEnough);
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Blob />
      </Suspense>
    </Canvas>
  );
}
