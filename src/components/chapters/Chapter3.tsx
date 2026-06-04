"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter3 = () => {
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

    // Date appears
    tl.fromTo(".ch3-date", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 })
    // Story reaction animation
    .fromTo(".ch3-story", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
    .fromTo(".ch3-reaction", { scale: 0, opacity: 0 }, { scale: 1.5, opacity: 1, duration: 0.5, ease: "back.out(2)" })
    // Chat messages sequence
    .fromTo(".ch3-msg-1", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
    .fromTo(".ch3-msg-2", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5 })
    .fromTo(".ch3-msg-3", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="ch3-date font-handwriting text-5xl text-primary font-bold mb-12 rotate-[-5deg] bg-white p-4 shadow-sm border border-gray-100 scrapbook-shadow">
        5 June 2020
      </div>
      
      <div className="ch3-story relative w-64 h-96 bg-gray-900 rounded-xl overflow-hidden shadow-2xl mb-12 border-4 border-white polaroid scrapbook-shadow rotate-2">
        <div className="tape"></div>
        {/* Actual story image */}
        <div className="absolute inset-0 bg-black">
          <img src="/assets/first_story.jpeg" alt="First Story" className="w-full h-full object-cover opacity-90" />
        </div>
        {/* Story Reaction overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 ch3-reaction opacity-0">
           <div className="bg-white p-2 rounded-full shadow-lg">
             <Heart className="text-red-500" fill="currentColor" size={32} />
           </div>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4 font-sans text-sm mt-8">
         <div className="ch3-msg-1 bg-gray-200 text-black p-3 rounded-2xl rounded-tl-sm w-3/4 opacity-0 shadow-sm relative">
           <p className="text-[10px] text-gray-400 absolute -top-5 left-0">5 Jun 2020, 5:37 PM</p>
           <p>😂😂😂😂😂</p>
         </div>
         <div className="ch3-msg-2 bg-gray-200 text-black p-3 rounded-2xl rounded-tl-sm w-3/4 opacity-0 shadow-sm mt-8 relative">
           <p className="text-[10px] text-gray-400 absolute -top-5 left-0">5 Jun 2020, 8:22 PM</p>
           <p>🤣🤣🤣🤣</p>
         </div>
         <div className="ch3-msg-3 bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm w-3/4 ml-auto opacity-0 shadow-sm mt-8 relative">
           <p className="text-[10px] text-gray-400 absolute -top-5 right-0">6 Jun 2020, 11:43 AM</p>
           <p>Nice bandri🐒</p>
         </div>
      </div>
    </div>
  );
};
