"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Chapter11 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.fromTo(".ch11-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(".ch11-polaroid-container", { scale: 0.8, opacity: 0, rotation: 10 }, { scale: 1, opacity: 1, rotation: -2, duration: 1 })
      .fromTo(".ch11-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative [perspective:1000px]">
      
      <h2 className="ch11-title font-playfair text-4xl md:text-5xl text-brown mb-16 text-center">
        Chapter 11: First Kiss
      </h2>

      <div 
        className="ch11-polaroid-container relative w-64 h-80 cursor-pointer [transform-style:preserve-3d] transition-transform duration-1000"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
         {/* Front of polaroid (Hidden image) */}
         <div className="absolute inset-0 bg-white p-4 pb-16 scrapbook-shadow flex flex-col items-center border border-gray-200 [backface-visibility:hidden]">
            <div className="tape"></div>
            <div className="bg-gray-800 w-full h-full flex items-center justify-center relative overflow-hidden">
               <span className="text-white/50 text-sm">Tap to reveal memory</span>
            </div>
            <p className="font-handwriting text-xl text-brown mt-4 absolute bottom-4">A stolen moment...</p>
         </div>
         
         {/* Back of polaroid (The memory) */}
         <div className="absolute inset-0 bg-white p-4 pb-16 scrapbook-shadow flex flex-col items-center border border-gray-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="tape"></div>
            <div className="bg-pink-100 w-full h-full flex items-center justify-center relative overflow-hidden">
               <img src="/assets/first_kiss.jpeg" alt="First Kiss" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-pink-500/20 mix-blend-multiply pointer-events-none"></div>
            </div>
            <p className="font-handwriting text-xl text-primary font-bold mt-4 absolute bottom-4">Our First Kiss</p>
         </div>
      </div>

      <p className="ch11-text font-serif italic text-xl text-brown/70 mt-12">
        (Click the photo to turn it over)
      </p>
    </div>
  );
};
