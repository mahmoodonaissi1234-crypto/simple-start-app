import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import type { PointLight } from "three";
import { SUITS, type Suit } from "@/data/suits";
import { SuitMannequin } from "@/components/store/SuitMannequin";

interface ShowroomSceneProps {
  selectedSuit: Suit | null;
  onSelect: (suit: Suit) => void;
}

const RADIUS = 3.6;

function layoutPositions(count: number): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return [Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS] as [number, number, number];
  });
}

function PulsingSpot({ position, color }: { position: [number, number, number]; color: string }) {
  const lightRef = useRef<PointLight>(null);
  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    lightRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.3;
  });
  return (
    <pointLight
      ref={lightRef}
      position={position}
      color={color}
      intensity={1.4}
      distance={6}
      decay={2}
    />
  );
}

export function ShowroomScene({ selectedSuit, onSelect }: ShowroomSceneProps) {
  const positions = layoutPositions(SUITS.length);

  return (
    <>
      <color attach="background" args={["#0b0b10"]} />
      <fog attach="fog" args={["#0b0b10", 8, 22]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 8, 4]} intensity={0.5} castShadow />

      {positions.map((pos, i) => (
        <PulsingSpot key={SUITS[i].id} position={[pos[0], 2.6, pos[2]]} color="#fef3c7" />
      ))}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#161620" roughness={0.25} metalness={0.4} />
      </mesh>

      <ContactShadows position={[0, 0.001, 0]} opacity={0.5} scale={16} blur={2} far={4} />

      {/* Center pedestal ring accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[2.4, 2.45, 64]} />
        <meshStandardMaterial color="#f5c451" emissive="#f5c451" emissiveIntensity={0.4} />
      </mesh>

      {SUITS.map((suit, i) => (
        <SuitMannequin
          key={suit.id}
          suit={suit}
          position={positions[i]}
          onSelect={onSelect}
          isSelected={selectedSuit?.id === suit.id}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={3}
        maxDistance={11}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
      />
    </>
  );
}
