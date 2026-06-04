"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitCommit, GitMerge } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter12 = () => {
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

    tl.fromTo(".ch12-title", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(".ch12-tree-line", { height: 0 }, { height: "100px", duration: 1 })
      .fromTo(".ch12-vinay", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
      .fromTo(".ch12-varshu", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "<")
      .fromTo(".ch12-merge", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" })
      .fromTo(".ch12-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <h2 className="ch12-title font-playfair text-4xl md:text-5xl text-brown mb-12 text-center">
        Chapter 12: Family Introduction
      </h2>

      {/* Abstract Family Tree */}
      <div className="flex flex-col items-center mb-12 w-full max-w-md">
         
         <div className="flex w-full justify-between items-center relative h-32 border-b-2 border-brown/20 pb-8">
            <div className="ch12-vinay flex flex-col items-center">
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
                  <span className="font-sans font-bold text-blue-800">V</span>
               </div>
               <span className="font-handwriting text-brown mt-2">Vinay's Side</span>
            </div>
            
            <div className="ch12-varshu flex flex-col items-center">
               <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center border-2 border-pink-300">
                  <span className="font-sans font-bold text-pink-800">V</span>
               </div>
               <span className="font-handwriting text-brown mt-2">Varshu's Side</span>
            </div>
         </div>
         
         <div className="ch12-tree-line w-1 bg-brown/20"></div>

         <div className="ch12-merge mt-4 flex flex-col items-center bg-white p-4 rounded-3xl shadow-lg border border-primary/30 scrapbook-shadow">
            <GitMerge className="text-primary mb-2" size={32} />
            <h3 className="font-playfair font-bold text-2xl text-brown text-center">
              Vinay ❤️ Varshu
            </h3>
            <p className="font-sans text-xs text-brown/60 uppercase tracking-widest mt-1">
              Families United
            </p>
         </div>

      </div>

      <p className="ch12-text font-serif italic text-xl text-brown/80 text-center max-w-md">
        Two worlds colliding, two families becoming one. The scariest, most beautiful step forward.
      </p>

    </div>
  );
};
