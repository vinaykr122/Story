"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter7 = () => {
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

    // Rain falling effect
    tl.to(".ch7-raindrop", { y: "100vh", opacity: 0, duration: 1, stagger: 0.1, ease: "none" })
      .fromTo(".ch7-person-1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
      .fromTo(".ch7-person-2", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
      .to(".ch7-rain-overlay", { opacity: 0, duration: 1 })
      .fromTo(".ch7-sun", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, rotation: 180 })
      .to(containerRef.current, { backgroundColor: "#fdfbf7", duration: 1 }, "<")
      .fromTo(".ch7-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gray-900 transition-colors">
      
      {/* Rain Overlay */}
      <div className="ch7-rain-overlay absolute inset-0 bg-blue-900/20 z-0 pointer-events-none">
         {/* Simple simulated raindrops */}
         {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="ch7-raindrop absolute w-[2px] h-10 bg-blue-400/50 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 20}%` }}
            />
         ))}
      </div>

      <div className="z-10 relative flex flex-col items-center">
        <Sun className="ch7-sun text-yellow-400 mb-12 opacity-0" size={80} fill="currentColor" />
        
        <div className="flex space-x-8 items-end mb-16 h-32">
           <div className="ch7-person-1 w-16 h-16 rounded-full bg-blue-800 opacity-0 relative">
             {/* Falling person abstract */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 bg-blue-800 rounded-full"></div>
           </div>
           
           {/* Reaching hand abstract representation */}
           <div className="ch7-person-2 w-16 h-16 rounded-full bg-primary opacity-0 relative flex items-center justify-center">
              <div className="absolute top-1/2 right-full w-12 h-2 bg-primary rounded-full origin-right -rotate-12"></div>
           </div>
        </div>

        <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-6 text-center">
          Chapter 7: Supporting Each Other
        </h2>
        
        <p className="ch7-text font-handwriting text-4xl text-primary text-center max-w-lg opacity-0">
          "When everyone left, we stayed."
        </p>
      </div>
    </div>
  );
};
