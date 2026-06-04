"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PHOTOS = [
  { id: 1, caption: "July 2022 Bday with Sikha Didi", rot: -5, src: "/assets/with_sikha_di.jpeg" },
  { id: 2, caption: "Nov 2022 Jamshedpur Trip", rot: 3, src: "/assets/nov_2022.jpeg" },
  { id: 3, caption: "July 2024 Boat Ride", rot: -2, src: "/assets/boating_in_july.jpeg" },
  { id: 4, caption: "Feb 2025 Concert Night", rot: 6, src: "/assets/feb_fest.jpeg" },
  { id: 5, caption: "July 2025 Cozy Birthday", rot: -4, src: "/assets/cozy_bithday_july_2025.jpeg" },
  { id: 6, caption: "March 2026 Hangout with Mummun", rot: 2, src: "/assets/march_with_munmun.jpeg" },
];

export const PhotoWall = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto my-24 p-8">
      <h2 className="font-playfair text-5xl text-brown mb-16 text-center">Photo Wall</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {PHOTOS.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            onClick={() => setSelected(photo.id)}
            className="polaroid cursor-pointer interactive hover:z-10"
            style={{ rotate: photo.rot }}
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            <div className="tape"></div>
            <div className="bg-gray-200 aspect-square w-full flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
               <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
            </div>
            <p className="font-handwriting text-xl text-center text-brown">{photo.caption}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`photo-${selected}`}
              className="bg-white p-4 pb-20 rounded-lg max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
              <div className="bg-gray-200 w-full flex items-center justify-center mb-6 rounded-sm overflow-hidden" style={{ maxHeight: '70vh' }}>
                 <img src={PHOTOS.find(p => p.id === selected)?.src} alt="Enlarged Memory" className="w-full h-full object-contain" />
              </div>
              <p className="font-handwriting text-4xl text-center text-brown absolute bottom-6 w-full left-0">
                {PHOTOS.find(p => p.id === selected)?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
