"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOS = [
  { id: 1, title: "", src: "/assets/WhatsApp_Video_2026-06-04_at_1.40.14_PM.mp4" },
  { id: 2, title: "", src: "/assets/WhatsApp_Video_2026-06-04_at_1.41.36_PM.mp4" },
  { id: 3, title: "", src: "/assets/WhatsApp_Video_2026-06-04_at_1.44.14_PM.mp4" },
];

export const VideoVault = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto my-24 p-8 bg-gray-900 rounded-3xl text-white scrapbook-shadow border border-gray-700">
      <h2 className="font-playfair text-5xl mb-12 text-center text-gray-100">Video Vault</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VIDEOS.map((video) => (
          <div key={video.id} className="flex flex-col items-center group">
            <div 
              className="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden cursor-pointer interactive mb-4 border-2 border-gray-700 group-hover:border-primary transition-colors"
              onClick={() => setActiveVideo(video.id)}
            >
               {/* Film strip decorations */}
               <div className="absolute top-0 w-full flex justify-between px-2 pt-1 opacity-20">
                 {Array.from({length: 6}).map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>)}
               </div>
               <div className="absolute bottom-0 w-full flex justify-between px-2 pb-1 opacity-20">
                 {Array.from({length: 6}).map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>)}
               </div>
               
               <div className="absolute inset-0 bg-black overflow-hidden">
                 <video src={video.src} className="w-full h-full object-cover opacity-50" muted playsInline />
               </div>
               
               <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <motion.div 
                    whileHover={{ scale: 1.2 }} 
                    className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 z-10"
                  >
                     <Play size={24} fill="white" className="ml-1" />
                  </motion.div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl border border-gray-700 flex items-center justify-center shadow-2xl relative">
               <button 
                  onClick={() => setActiveVideo(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300"
               >
                  Close
               </button>
               <video 
                 src={VIDEOS.find(v => v.id === activeVideo)?.src} 
                 controls 
                 autoPlay 
                 className="w-full h-full rounded-2xl outline-none" 
                 onClick={(e) => e.stopPropagation()} 
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
