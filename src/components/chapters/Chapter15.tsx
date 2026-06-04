"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Chapter15 = () => {
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

    tl.fromTo(".ch15-title", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
      .fromTo(".ch15-promise-icon", { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 1, ease: "back.out" })
      .fromTo(".ch15-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <h2 className="ch15-title font-playfair text-4xl md:text-5xl text-brown mb-16 text-center">
        Chapter 15: Our Promise
      </h2>

      <div className="ch15-promise-icon polaroid bg-white p-8 mb-12 shadow-2xl rounded-3xl border border-pink-100 flex items-center justify-center">
         <div className="tape"></div>
         <span className="text-8xl">🤞</span>
      </div>

      <div className="ch15-text text-center space-y-6 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-sm max-w-2xl">
         <p className="font-handwriting text-4xl md:text-5xl text-primary font-bold">
           "No matter what happens, we stay together."
         </p>
         <p className="font-sans text-brown/70 italic">
           A pinky promise that became the foundation of our forever.
         </p>
      </div>
    </div>
  );
};
