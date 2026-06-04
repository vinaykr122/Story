"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [meter, setMeter] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
           setMeter(Math.round(self.progress * 100));
        }
      },
    });

    tl.fromTo(".ch5-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(".ch5-meter-container", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
      .fromTo(".ch5-call", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 }, "-=0.5")
      .fromTo(".ch5-text", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <h2 className="ch5-title font-playfair text-5xl md:text-6xl text-brown mb-12 text-center">
        Chapter 5: Best Friends
      </h2>

      {/* Friendship Meter */}
      <div className="ch5-meter-container w-full max-w-md bg-white p-6 rounded-3xl shadow-lg border border-gray-100 mb-12 relative scrapbook-shadow">
         <div className="tape"></div>
         <h3 className="font-handwriting text-2xl text-center text-brown mb-4">Friendship Meter</h3>
         <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-red-400 transition-all duration-300 ease-out flex items-center justify-end pr-2"
              style={{ width: `${meter}%` }}
            >
               {meter > 10 && <span className="text-white text-xs font-bold">{meter}%</span>}
            </div>
         </div>
         {meter === 100 && (
            <div className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full shadow-lg transform rotate-12">
               <span className="font-handwriting text-xl">100% Besties!</span>
            </div>
         )}
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
         <div className="ch5-call polaroid bg-white flex flex-col items-center p-6 text-center transform -rotate-2">
            <div className="tape"></div>
            <div className="bg-gray-900 w-full h-32 rounded-xl flex items-center justify-center mb-4 text-white space-x-4 shadow-inner">
               <Phone className="animate-pulse text-green-400" />
               <span className="font-mono">04:32:15</span>
            </div>
            <p className="font-handwriting text-2xl text-brown">Late night calls...</p>
         </div>
         
         <div className="ch5-call polaroid bg-white flex flex-col items-center p-6 text-center transform rotate-2">
            <div className="tape"></div>
            <div className="bg-primary/20 w-full h-32 rounded-xl flex items-center justify-center mb-4 text-primary shadow-inner">
               <MessageCircle size={48} />
            </div>
            <p className="font-handwriting text-2xl text-brown">Endless sharing...</p>
         </div>
      </div>

      <p className="ch5-text font-serif text-xl text-center text-brown max-w-xl italic">
        "We became the people who knew each other's secrets, fears, and dreams before we even realized it."
      </p>
    </div>
  );
};
