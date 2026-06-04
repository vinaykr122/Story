"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Chapter4 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Animate memes floating around
    const memes = gsap.utils.toArray(".ch4-meme");
    
    tl.fromTo(".ch4-title", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });

    memes.forEach((meme, i) => {
       const el = meme as HTMLElement;
       const direction = i % 2 === 0 ? -1 : 1;
       const startX = direction * 100;
       
       tl.fromTo(el, 
         { opacity: 0, x: startX, y: 50, rotation: startX / 2 },
         { opacity: 1, x: 0, y: 0, rotation: i % 2 === 0 ? -5 : 5, duration: 0.8, ease: "power2.out" },
         "-=0.5"
       );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <h2 className="ch4-title font-playfair text-5xl md:text-6xl text-brown mb-16 text-center z-10 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full border border-white/40 shadow-sm">
        Chapter 4: The Meme Era
      </h2>

      <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
        {/* Meme placeholders */}
        <div className="ch4-meme absolute top-10 left-10 md:left-20 polaroid w-48 shadow-xl">
           <div className="tape"></div>
           <div className="bg-gray-200 h-32 w-full flex items-center justify-center mb-2">
              <span className="text-4xl">🐶</span>
           </div>
           <p className="font-handwriting text-center text-brown">Us when we talk till 3 AM</p>
        </div>

        <div className="ch4-meme absolute bottom-20 right-10 md:right-20 polaroid w-56 shadow-xl z-20">
           <div className="tape"></div>
           <div className="bg-gray-200 h-40 w-full flex items-center justify-center mb-2">
              <span className="text-4xl">😹</span>
           </div>
           <p className="font-handwriting text-center text-brown">Memes pe comments karna</p>
        </div>

        <div className="ch4-meme absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 polaroid w-64 shadow-2xl z-30">
           <div className="tape"></div>
           <div className="bg-gray-200 h-48 w-full flex items-center justify-center mb-2">
              <span className="text-4xl">👀</span>
           </div>
           <p className="font-handwriting text-center text-primary font-bold text-xl">Enemy se Bestfriend ka safar</p>
        </div>
      </div>
    </div>
  );
};
