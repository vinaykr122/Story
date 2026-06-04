"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Coffee, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter13 = () => {
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

    tl.fromTo(".ch13-title", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
      .fromTo(".ch13-skyline", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(".ch13-card-1", { x: -50, opacity: 0, rotation: -10 }, { x: 0, opacity: 1, rotation: -5, duration: 1 })
      .fromTo(".ch13-card-2", { y: 50, opacity: 0, rotation: 0 }, { y: 0, opacity: 1, rotation: 2, duration: 1 }, "-=0.5")
      .fromTo(".ch13-card-3", { x: 50, opacity: 0, rotation: 10 }, { x: 0, opacity: 1, rotation: 5, duration: 1 }, "-=0.5");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-[#faf8f5]">
      
      {/* Abstract Skyline */}
      <div className="ch13-skyline absolute bottom-0 w-full h-64 flex items-end justify-center opacity-30 pointer-events-none">
         <div className="w-16 h-32 bg-brown/20 mx-1 rounded-t-sm"></div>
         <div className="w-24 h-48 bg-brown/20 mx-1 rounded-t-sm"></div>
         <div className="w-12 h-64 bg-brown/20 mx-1 rounded-t-sm"></div>
         <div className="w-32 h-40 bg-brown/20 mx-1 rounded-t-md"></div>
         <div className="w-20 h-56 bg-brown/20 mx-1 rounded-t-sm"></div>
      </div>

      <h2 className="ch13-title font-playfair text-5xl md:text-6xl text-brown mb-16 text-center z-10">
        Chapter 13: Kolkata
      </h2>

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 z-10 w-full max-w-5xl">
         
         <div className="ch13-card-1 polaroid w-64 md:w-72 shadow-xl bg-white">
            <div className="tape"></div>
            <div className="bg-blue-50 h-40 w-full flex items-center justify-center mb-4 text-blue-400">
               <BookOpen size={64} />
            </div>
            <p className="font-handwriting text-center text-brown text-xl">Tujhe study ke liye bulana</p>
         </div>

         <div className="ch13-card-2 polaroid w-64 md:w-72 shadow-xl bg-white mt-8 md:mt-16">
            <div className="tape"></div>
            <div className="bg-green-50 h-40 w-full flex items-center justify-center mb-4 text-green-500">
               <Home size={64} />
            </div>
            <p className="font-handwriting text-center text-brown text-xl font-bold">Uncle Aunty ko manana</p>
         </div>

         <div className="ch13-card-3 polaroid w-64 md:w-72 shadow-xl bg-white">
            <div className="tape"></div>
            <div className="bg-orange-50 h-40 w-full flex items-center justify-center mb-4 text-orange-400">
               <Coffee size={64} />
            </div>
            <p className="font-handwriting text-center text-brown text-xl">Tere saath live-in me rahna</p>
         </div>

      </div>

    </div>
  );
};
