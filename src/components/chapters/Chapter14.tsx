"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CloudLightning } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter14 = () => {
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

    // Storm sequence
    tl.to(containerRef.current, { backgroundColor: "#1f2937", duration: 1 })
      .to(".ch14-title", { color: "#f3f4f6", duration: 0.5 }, "<")
      .fromTo(".ch14-storm", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.5, duration: 1 })
      .fromTo(".ch14-hands", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      // Calm down
      .to(".ch14-storm", { opacity: 0, scale: 2, duration: 1 }, "+=0.5")
      .to(containerRef.current, { backgroundColor: "#fdfbf7", duration: 1 }, "<")
      .to(".ch14-title", { color: "#3b312b", duration: 0.5 }, "<")
      .fromTo(".ch14-text", { opacity: 0 }, { opacity: 1, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative transition-colors duration-1000 overflow-hidden">
      
      <CloudLightning className="ch14-storm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 opacity-0 pointer-events-none" size={300} strokeWidth={1} />

      <h2 className="ch14-title font-playfair text-4xl md:text-5xl text-brown mb-16 text-center z-10 transition-colors">
        Chapter 14: Difficult Times
      </h2>

      <div className="ch14-hands z-10 bg-white p-6 rounded-full shadow-2xl border-4 border-gray-100 flex items-center justify-center mb-12 relative scrapbook-shadow">
         <span className="text-6xl">🤝</span>
      </div>

      <p className="ch14-text font-handwriting text-3xl md:text-4xl text-primary text-center max-w-lg z-10 opacity-0">
        Through every storm, we held on tighter. <br/>
        And the storms always passed.
      </p>
      
    </div>
  );
};
