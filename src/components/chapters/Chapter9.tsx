"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter9 = () => {
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

    // Pages merging concept
    tl.fromTo(".ch9-page-left", { x: "-50vw", rotation: -20, opacity: 0 }, { x: 0, rotation: -2, opacity: 1, duration: 1 })
      .fromTo(".ch9-page-right", { x: "50vw", rotation: 20, opacity: 0 }, { x: 0, rotation: 2, opacity: 1, duration: 1 }, "<")
      // Heart Explosion
      .to(".ch9-heart-particle", {
         scale: "random(0.5, 2)",
         x: "random(-200, 200)",
         y: "random(-200, 200)",
         opacity: 1,
         duration: 1,
         stagger: 0.05,
         ease: "power2.out"
      })
      .fromTo(".ch9-text", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
      // Late night call animation
      .fromTo(".ch9-call-container", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .to(".ch9-phone-ring", { rotation: 15, duration: 0.1, yoyo: true, repeat: 11, ease: "power1.inOut" })
      .fromTo(".ch9-call-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-b from-background to-pink-50/30">
      
      <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-16 text-center z-10 relative">
        Chapter 9: Official Relationship
      </h2>

      <div className="relative w-full max-w-2xl h-80 flex items-center justify-center mb-12">
         {/* Left Page (Vinay) */}
         <div className="ch9-page-left absolute w-48 md:w-64 h-72 bg-white scrapbook-shadow border border-gray-200 flex flex-col items-center justify-center p-4 -translate-x-10 rotate-[-5deg] z-10">
            <div className="tape"></div>
            <img src="/assets/Vinay_profile.jpeg" alt="Vinay" className="w-24 h-24 rounded-full mb-4 object-cover shadow-sm" />
            <h3 className="font-handwriting text-2xl text-brown">Vinay</h3>
         </div>
         
         {/* Right Page (Varshu) */}
         <div className="ch9-page-right absolute w-48 md:w-64 h-72 bg-white scrapbook-shadow border border-gray-200 flex flex-col items-center justify-center p-4 translate-x-10 rotate-[5deg] z-20">
            <div className="tape"></div>
            <img src="/assets/varsha_profile_pic.jpeg" alt="Varshu" className="w-24 h-24 rounded-full mb-4 object-cover shadow-sm" />
            <h3 className="font-handwriting text-2xl text-brown">Varshu</h3>
         </div>

         {/* Heart Particles hidden at center */}
         {Array.from({ length: 30 }).map((_, i) => (
           <Heart 
             key={i} 
             className="ch9-heart-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 pointer-events-none z-30" 
             fill="currentColor"
             size={24}
           />
         ))}
      </div>

      <div className="ch9-text text-center z-30 mb-12">
         <p className="font-playfair text-4xl md:text-5xl text-brown font-bold italic mb-4">
           2021
         </p>
         <p className="font-handwriting text-3xl md:text-4xl text-primary font-bold">
           "And finally... it was us."
         </p>
      </div>

      {/* Late Night Calls Mockup */}
      <div className="ch9-call-container bg-gray-900 text-white rounded-3xl p-6 shadow-2xl flex flex-col items-center w-64 -rotate-2 scrapbook-shadow border-4 border-gray-800 z-30 opacity-0 relative">
          <div className="tape"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-sans tracking-widest">
            2:30 AM
          </div>
          
          <img src="/assets/varsha_profile_pic.jpeg" alt="Varshu" className="w-20 h-20 rounded-full mb-4 mt-8 object-cover shadow-lg border-2 border-primary/50" />
          <h3 className="font-sans text-xl font-bold mb-1">Jaan ❤️</h3>
          <p className="text-gray-400 text-sm mb-6 animate-pulse">04:23:15</p>

          <div className="flex gap-6">
            <div className="w-12 h-12 bg-gray-700/80 rounded-full flex items-center justify-center text-gray-300 backdrop-blur-sm">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </div>
            <div className="ch9-phone-ring w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(135)"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
          </div>
      </div>
      
      <p className="ch9-call-text font-handwriting text-2xl text-brown/90 mt-8 text-center max-w-sm z-30 opacity-0 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/40 shadow-sm">
        Those endless late-night calls where we talked about everything and nothing...
      </p>

    </div>
  );
};
