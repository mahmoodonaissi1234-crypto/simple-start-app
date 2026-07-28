import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/**
 * PLACEHOLDER hero centerpiece: a procedural low-poly mannequin built from
 * primitives. No real .glb asset exists yet — swap this out for a real
 * photogrammetry-scanned suit model (loaded via useGLTF) once available.
 */
function RotatingMannequin() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={ref} position={[0, -0.6, 0]}>
      <mesh position={[-0.14, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.1, 0.75, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0.14, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.1, 0.75, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 0.9, 20]} />
        <meshStandardMaterial color="#16213e" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.52, 0]} castShadow>
        <boxGeometry args={[0.78, 0.15, 0.34]} />
        <meshStandardMaterial color="#16213e" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.11, 1.2, 0.18]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.06, 0.55, 0.02]} />
        <meshStandardMaterial color="#e8c37b" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0.11, 1.2, 0.18]} rotation={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.06, 0.55, 0.02]} />
        <meshStandardMaterial color="#e8c37b" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.085, 0.095, 0.13, 16]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.83, 0]} castShadow>
        <sphereGeometry args={[0.19, 24, 24]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function HeroSuitModel() {
  return (
    <Canvas
      shadows
      camera={{ position: [1.6, 1, 3.2], fov: 42 }}
      className="h-full w-full"
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} castShadow />
      <pointLight position={[-3, 1, -2]} intensity={0.6} color="#e8c37b" />
      <Suspense fallback={null}>
        <RotatingMannequin />
      </Suspense>
    </Canvas>
  );
}
