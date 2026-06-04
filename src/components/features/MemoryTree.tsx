"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

// A highly simplified abstract tree representation using spheres/cylinders for performance.
const TreeLeaf = ({ position, color, memory }: { position: [number, number, number], color: string, memory: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
       meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.5 : 1}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#ff6b6b" : color} transparent opacity={0.9} />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="#3b312b"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#fff"
        >
          {memory}
        </Text>
      )}
    </group>
  );
};

export const MemoryTree = () => {
  const memories = [
    { year: 2020, memory: "First Message (23 May)", pos: [1, 2, 0], color: "#eebfbc" },
    { year: 2021, memory: "Official ❤️", pos: [-1.5, 2.5, 0.5], color: "#d4af37" },
    { year: 2022, memory: "Jamshedpur Trip", pos: [0, 3.5, -1], color: "#a5d6a7" },
    { year: 2023, memory: "Kolkata Flat", pos: [1.2, 3, 1], color: "#90caf9" },
    { year: 2024, memory: "Boat Ride Getaway", pos: [-0.8, 4, -1.2], color: "#ce93d8" },
    { year: 2025, memory: "Concert Night & Bday", pos: [0.5, 4.5, 0.5], color: "#ffb74d" },
    { year: 2026, memory: "Future Dreams", pos: [-0.5, 5, 0], color: "#4db6ac" },
  ];

  return (
    <div className="w-full h-screen bg-[#f4ecd8] relative rounded-3xl overflow-hidden scrapbook-shadow border border-white/50">
      
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
         <h3 className="font-playfair text-4xl text-brown mb-2">The Memory Tree</h3>
         <p className="font-handwriting text-2xl text-brown/70">Hover over the leaves to reveal memories</p>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Trunk */}
        <mesh position={[0, 1, 0]}>
           <cylinderGeometry args={[0.2, 0.5, 3, 16]} />
           <meshStandardMaterial color="#5c4d44" />
        </mesh>
        
        {/* Leaves */}
        {memories.map((m, i) => (
           <TreeLeaf key={i} position={m.pos as [number, number, number]} color={m.color} memory={m.memory} />
        ))}

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};
