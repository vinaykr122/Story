"use client";

import React, { useState } from "react";
import { MapPin, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = [
  { id: "patna", name: "Patna", x: 20, y: 30, memory: "Where the story began. Late night calls." },
  { id: "tatanagar", name: "Tatanagar", x: 40, y: 60, memory: "First meeting. First hug." },
  { id: "kolkata", name: "Kolkata", x: 70, y: 50, memory: "Moving in together. Building a future." },
];

export const MemoryMap = () => {
  const [activeLoc, setActiveLoc] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto my-24 p-8 relative">
      <h2 className="font-playfair text-5xl text-brown mb-12 text-center">Memory Map</h2>
      
      <div className="relative w-full h-[500px] bg-[#e6dfcc] rounded-3xl scrapbook-shadow border-8 border-white overflow-hidden p-8">
        <div className="tape hidden md:block"></div>
        {/* Decorative Grid / Lines */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Abstract path connecting locations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
           <path d="M 20% 30% Q 30% 60% 40% 60% T 70% 50%" fill="none" stroke="#d4af37" strokeWidth="3" strokeDasharray="10 10" />
        </svg>

        {LOCATIONS.map((loc) => (
          <div 
            key={loc.id} 
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center interactive cursor-pointer group"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            onClick={() => setActiveLoc(loc.id === activeLoc ? null : loc.id)}
          >
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${activeLoc === loc.id ? 'bg-primary text-white' : 'bg-white text-red-500'}`}
            >
              <MapPin size={24} fill={activeLoc === loc.id ? "currentColor" : "none"} />
            </motion.div>
            <span className="font-sans font-bold text-sm mt-2 text-brown group-hover:text-primary transition-colors bg-white/50 px-2 rounded-full backdrop-blur-sm">
               {loc.name}
            </span>
          </div>
        ))}

        <AnimatePresence>
          {activeLoc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 max-w-sm w-full z-10"
            >
              <h3 className="font-playfair text-2xl text-brown mb-2">{LOCATIONS.find(l => l.id === activeLoc)?.name}</h3>
              <p className="font-handwriting text-xl text-gray-600 mb-4">{LOCATIONS.find(l => l.id === activeLoc)?.memory}</p>
              <div className="w-full h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300">
                 <ImageIcon size={32} className="mb-2" />
                 <span className="text-xs">Location Photo</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
