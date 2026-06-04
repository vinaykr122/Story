"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CloudRain, CloudLightning } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter6 = () => {
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

    // Darker, emotional transition
    tl.to(containerRef.current, { backgroundColor: "#2a2421", duration: 1 })
      .to(".ch6-title", { color: "#eebfbc", duration: 0.5 }, "<")
      .fromTo(".ch6-tear", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 })
      .fromTo(".ch6-text-1", { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(".ch6-photo-torn", { opacity: 0, scale: 0.9, rotation: -10 }, { opacity: 1, scale: 1, rotation: -2, duration: 1 })
      .to(".ch6-photo-torn .torn-half-2", { x: 20, y: 10, rotation: 5, duration: 1 }, "+=0.5") // Separate
      .to(".ch6-photo-torn .torn-half-2", { x: 0, y: 0, rotation: 0, duration: 1 }, "+=1") // Come back together
      .fromTo(".ch6-text-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative transition-colors duration-1000">
      <h2 className="ch6-title font-playfair text-5xl md:text-6xl text-brown mb-8 text-center transition-colors duration-1000">
        Chapter 6: Lost & Found
      </h2>

      <div className="flex space-x-4 mb-8">
         <CloudRain className="ch6-tear text-gray-500 opacity-0" size={32} />
         <CloudLightning className="ch6-tear text-gray-600 opacity-0" size={32} />
      </div>

      <p className="ch6-text-1 font-sans text-lg md:text-xl text-gray-400 text-center max-w-xl mb-12 opacity-0">
        Every great story has its storms. Toxic pasts, third parties like Priya and Jyoti... hum dono ka relationship kayi baar toota. But at the end of it all, hum ek doosre ke liye hi bane the.
      </p>

      {/* Torn Photo Effect */}
      <div className="ch6-photo-torn relative w-full max-w-sm h-64 mb-12 opacity-0">
         <div className="absolute inset-0 flex">
            {/* Left Half */}
            <div className="w-1/2 h-full bg-gray-300 border-l border-t border-b border-white scrapbook-shadow flex items-center justify-end overflow-hidden"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 85% 20%, 95% 40%, 80% 60%, 95% 80%, 100% 100%, 0 100%)' }}>
               <img src="/assets/Vinay_profile.jpeg" alt="Vinay" className="w-full h-full object-cover opacity-30 grayscale" />
            </div>
            {/* Right Half */}
            <div className="torn-half-2 w-1/2 h-full bg-gray-300 border-r border-t border-b border-white scrapbook-shadow flex items-center justify-start overflow-hidden -ml-[1px]"
                 style={{ clipPath: 'polygon(0 0, 15% 20%, 5% 40%, 20% 60%, 5% 80%, 0 100%, 100% 100%, 100% 0)' }}>
               <img src="/assets/varsha_profile_pic.jpeg" alt="Varshu" className="w-full h-full object-cover opacity-30 grayscale" />
            </div>
         </div>
      </div>

      <p className="ch6-text-2 font-handwriting text-2xl md:text-3xl text-primary text-center max-w-lg opacity-0">
        From bestfriend to love buddy... This gave us a new start. The first time in 2021, hum relation me aaye.
      </p>
    </div>
  );
};
