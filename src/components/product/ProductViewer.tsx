import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

/**
 * PLACEHOLDER product viewer: a procedural low-poly mannequin whose jacket
 * material color swaps with the selected color option. No real .glb model
 * exists yet — swap this out for a real photogrammetry-scanned suit model
 * (loaded via useGLTF, with per-color texture/material variants) once
 * available.
 */
function SuitModel({ color, trouserColor }: { color: string; trouserColor: string }) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={ref} position={[0, -1.1, 0]}>
      <mesh position={[-0.14, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.1, 0.75, 16]} />
        <meshStandardMaterial color={trouserColor} roughness={0.6} />
      </mesh>
      <mesh position={[0.14, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.1, 0.75, 16]} />
        <meshStandardMaterial color={trouserColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.4, 0.95, 20]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.56, 0]} castShadow>
        <boxGeometry args={[0.82, 0.16, 0.36]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.12, 1.22, 0.19]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.07, 0.58, 0.02]} />
        <meshStandardMaterial color="#e8c37b" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0.12, 1.22, 0.19]} rotation={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.07, 0.58, 0.02]} />
        <meshStandardMaterial color="#e8c37b" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.66, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.14, 16]} />
        <meshStandardMaterial color="#d6cfc2" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.88, 0]} castShadow>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial color="#d6cfc2" roughness={0.8} />
      </mesh>
    </group>
  );
}

function ViewerSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-16 animate-spin rounded-full border-2 border-brand-gold/20 border-t-brand-gold" />
    </div>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

interface ProductViewerProps {
  color: string;
  trouserColor: string;
  fallbackGradient: string;
}

export function ProductViewer({ color, trouserColor, fallbackGradient }: ProductViewerProps) {
  const [ready, setReady] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(hasWebGL());
    setReady(true);
  }, []);

  if (!ready) return <ViewerSkeleton />;

  if (!webglSupported) {
    // Mobile/older-browser fallback: static gradient swatch standing in for
    // a product photo, since 3D isn't available.
    return (
      <div
        className="absolute inset-0 rounded-lg"
        style={{ background: fallbackGradient }}
        aria-label="Product preview (3D unavailable on this device)"
      />
    );
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.3, 3.4], fov: 40 }}
      className="h-full w-full touch-none"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1} castShadow />
      <pointLight position={[-3, 1, 2]} intensity={0.4} color="#e8c37b" />
      <Suspense fallback={null}>
        <SuitModel color={color} trouserColor={trouserColor} />
        <ContactShadows position={[0, -1.65, 0]} opacity={0.5} scale={4} blur={2} far={2} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
