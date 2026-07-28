import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import type { Suit } from "@/data/suits";

interface SuitMannequinProps {
  suit: Suit;
  position: [number, number, number];
  onSelect: (suit: Suit) => void;
  isSelected: boolean;
}

export function SuitMannequin({ suit, position, onSelect, isSelected }: SuitMannequinProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = hovered || isSelected ? position[1] + 0.15 : position[1];
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * Math.min(delta * 6, 1);
    groupRef.current.rotation.y += delta * (hovered || isSelected ? 0.6 : 0.15);
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(suit);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Pedestal */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.3, 32]} />
        <meshStandardMaterial color="#e8e4da" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Spotlight ring accent */}
      <mesh position={[0, 0.31, 0]}>
        <torusGeometry args={[0.4, 0.02, 16, 48]} />
        <meshStandardMaterial
          color={isSelected ? "#f5c451" : "#a8a29e"}
          emissive={isSelected ? "#f5c451" : "#000000"}
          emissiveIntensity={isSelected ? 0.6 : 0}
        />
      </mesh>

      <group ref={groupRef} position={[0, 0.3, 0]}>
        {/* Legs / trousers */}
        <mesh position={[-0.13, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.7, 16]} />
          <meshStandardMaterial color={suit.trouserColor} roughness={0.6} />
        </mesh>
        <mesh position={[0.13, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.7, 16]} />
          <meshStandardMaterial color={suit.trouserColor} roughness={0.6} />
        </mesh>

        {/* Torso / jacket */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.36, 0.85, 20]} />
          <meshStandardMaterial color={suit.fabricColor} roughness={0.45} metalness={0.08} />
        </mesh>

        {/* Shoulders */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <boxGeometry args={[0.72, 0.14, 0.32]} />
          <meshStandardMaterial color={suit.fabricColor} roughness={0.45} metalness={0.08} />
        </mesh>

        {/* Lapel accents */}
        <mesh position={[-0.1, 1.15, 0.17]} rotation={[0, 0, 0.35]} castShadow>
          <boxGeometry args={[0.06, 0.5, 0.02]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
        </mesh>
        <mesh position={[0.1, 1.15, 0.17]} rotation={[0, 0, -0.35]} castShadow>
          <boxGeometry args={[0.06, 0.5, 0.02]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
        </mesh>

        {/* Neck + head (faceless display bust) */}
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.12, 16]} />
          <meshStandardMaterial color="#d6cfc2" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.75, 0]} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color="#d6cfc2" roughness={0.8} />
        </mesh>
      </group>

      <Html
        position={[0, 2.1, 0]}
        center
        distanceFactor={8}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center whitespace-nowrap">
          <span
            className="text-sm font-medium"
            style={{ color: isSelected ? "#f5c451" : "#e5e5e5" }}
          >
            {suit.name}
          </span>
          <span className="text-xs text-white/50">${suit.price}</span>
        </div>
      </Html>
    </group>
  );
}
