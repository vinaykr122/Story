"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MapPin, TrainFront } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const Chapter10 = () => {
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

    // Map animation
    tl.fromTo(".ch10-map-path", { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 2 })
      .to(".ch10-train", {
         motionPath: {
           path: ".ch10-map-path",
           align: ".ch10-map-path",
           alignOrigin: [0.5, 0.5],
           autoRotate: true
         },
         duration: 2,
         ease: "power1.inOut"
      }, "<")
      .fromTo(".ch10-dest-pin", { scale: 0, opacity: 0, y: -20 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" })
      .fromTo(".ch10-photo-1", { opacity: 0, x: -50, rotation: -15 }, { opacity: 1, x: 0, rotation: -5, duration: 1 })
      .fromTo(".ch10-photo-2", { opacity: 0, x: 50, rotation: 15 }, { opacity: 1, x: 0, rotation: 5, duration: 1 }, "-=0.5")
      .fromTo(".ch10-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-12 text-center">
        Chapter 10: First Meeting
      </h2>

      {/* Abstract Map */}
      <div className="relative w-full max-w-lg h-64 mb-16 bg-[#e6dfcc] rounded-3xl overflow-hidden scrapbook-shadow border-4 border-white p-4">
         <div className="absolute top-4 left-4 flex flex-col items-center z-10">
            <MapPin className="text-red-500" fill="currentColor" />
            <span className="font-sans text-xs font-bold mt-1">Patna</span>
         </div>
         
         <div className="absolute bottom-4 right-4 flex flex-col items-center z-10 ch10-dest-pin opacity-0">
            <MapPin className="text-red-500" fill="currentColor" />
            <span className="font-sans text-xs font-bold mt-1">Tatanagar</span>
         </div>

         <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path 
              className="ch10-map-path" 
              d="M 10 10 C 30 50, 70 20, 90 90" 
              fill="transparent" 
              stroke="#d4af37" 
              strokeWidth="2" 
              strokeDasharray="1000" 
              strokeDashoffset="1000" 
              strokeLinecap="round" 
            />
         </svg>
         
         {/* Simple dot moving on path since MotionPathPlugin is a premium GSAP feature, we simulate with simple translation for now if plugin fails, but we'll try to just use CSS/GSAP standard translation for safety */}
         <div className="ch10-train absolute top-4 left-4 bg-white p-1 rounded-full shadow-md z-20">
            <TrainFront size={16} className="text-gray-800" />
         </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 mb-12">
         <div className="ch10-photo-1 polaroid w-64 shadow-xl">
            <div className="tape"></div>
            <div className="bg-gray-300 h-48 w-full flex items-center justify-center mb-4 border border-gray-200 overflow-hidden">
               <img src="/assets/first_photo_of_tatanagar.jpeg" alt="Travel Photo" className="w-full h-full object-cover" />
            </div>
            <p className="font-handwriting text-center text-brown text-xl">The journey to you</p>
         </div>

         <div className="ch10-photo-2 polaroid w-64 shadow-xl">
            <div className="tape"></div>
            <div className="bg-gray-300 h-48 w-full flex items-center justify-center mb-4 border border-gray-200 overflow-hidden">
               <img src="/assets/first_photo_of_us.jpeg" alt="First Selfie" className="w-full h-full object-cover" />
            </div>
            <p className="font-handwriting text-center text-brown text-xl">Finally together in real life ❤️</p>
         </div>
      </div>

      <p className="ch10-text font-serif italic text-2xl text-brown text-center opacity-0 max-w-lg">
        My first solo travel to meet you. Family se milna, aur wo first kiss jisne mujhe shock kar diya tha.
      </p>

    </div>
  );
};
