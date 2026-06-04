"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Generate random points uniformly distributed inside a sphere.
 * We do this manually to avoid the NaN issues from maath's inSphere.
 */
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Use rejection sampling for uniform distribution inside sphere
    let x, y, z;
    do {
      x = (Math.random() * 2 - 1) * radius;
      y = (Math.random() * 2 - 1) * radius;
      z = (Math.random() * 2 - 1) * radius;
    } while (x * x + y * y + z * z > radius * radius);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

const STAR_MEMORIES = [
  "Do you remember the night we stayed up just looking at the stars? No words, just us.",
  "That late night call where we both fell asleep but didn't hang up...",
  "The first time you called me yours — my heart stopped.",
  "Walking together in the rain, not caring about anything else.",
  "The way you laugh at my terrible jokes... that sound is my favorite melody.",
  "Every fight taught us that we choose each other, again and again.",
  "From Facebook friends to soulmates — who would've thought?",
];

const Stars = (props: any) => {
  const ref = useRef<any>(null);
  const positions = useMemo(() => generateSpherePoints(2000, 1.5), []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#eebfbc" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

export const StarSky = () => {
  const [showMemory, setShowMemory] = useState(false);
  const [currentMemory, setCurrentMemory] = useState("");

  const revealMemory = () => {
    const randomMemory = STAR_MEMORIES[Math.floor(Math.random() * STAR_MEMORIES.length)];
    setCurrentMemory(randomMemory);
    setShowMemory(true);
  };

  return (
    <div className="w-full h-screen bg-black relative my-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800">
       <div className="absolute top-8 left-8 z-10 pointer-events-none">
         <h3 className="font-playfair text-4xl text-white mb-2">Star Memory Sky</h3>
         <p className="font-handwriting text-2xl text-gray-400">Click anywhere to reveal a star memory</p>
       </div>

       <div className="absolute inset-0 z-0 cursor-pointer" onClick={revealMemory}>
         <Canvas camera={{ position: [0, 0, 1] }}>
           <Stars />
         </Canvas>
       </div>

       <AnimatePresence>
         {showMemory && (
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.5 }}
               className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto"
               onClick={() => setShowMemory(false)}
            >
               <div className="bg-[#f9f5ec] p-8 md:p-12 pb-24 rounded-sm max-w-lg w-full polaroid scrapbook-shadow rotate-1" onClick={(e) => e.stopPropagation()}>
                  <div className="tape"></div>
                  <div className="absolute -top-5 -right-5 text-3xl sticker select-none">⭐</div>
                  <h4 className="font-playfair text-3xl text-brown mb-4 text-center">A Star Memory</h4>
                  <p className="font-handwriting text-2xl text-brown/90 text-center leading-relaxed">
                    &ldquo;{currentMemory}&rdquo;
                  </p>
                  <p className="font-sans text-sm text-gray-400 absolute bottom-6 w-full text-center left-0">
                     (Click outside to close)
                  </p>
               </div>
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};
