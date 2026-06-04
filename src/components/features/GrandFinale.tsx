"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const GrandFinale = () => {
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

    tl.to(containerRef.current, { backgroundColor: "#1a1410", duration: 1 })
      .fromTo(".gf-letter", { opacity: 0, y: 80, rotation: 2 }, { opacity: 1, y: 0, rotation: -1, duration: 1.5 })
      .fromTo(".gf-line", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 })
      .fromTo(".gf-sign", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
      .fromTo(".gf-closing", { opacity: 0 }, { opacity: 1, duration: 1.5 }, "+=0.5")
      .fromTo(".gf-heart-float", { y: 0, opacity: 0.6 }, { y: -30, opacity: 0, duration: 2, stagger: 0.3, repeat: -1, ease: "power1.out" }, "<");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-[150vh] flex flex-col items-center justify-center p-8 relative transition-colors duration-1000 bg-[#fdfbf7] overflow-hidden">
      
      {/* Floating hearts rising from bottom */}
      <div className="absolute bottom-0 w-full flex justify-around pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <Heart 
            key={i}
            className="gf-heart-float text-primary/30" 
            fill="currentColor" 
            size={16 + Math.random() * 20}
            style={{ marginBottom: `${Math.random() * 100}px` }}
          />
        ))}
      </div>

      <div className="gf-letter max-w-3xl w-full relative z-10">
        {/* Letter card with notebook lines */}
        <div className="bg-[#f9f5ec] p-8 md:p-16 rounded-sm shadow-2xl relative scrapbook-shadow border-2 border-[#e6dfcc] notebook-lines">
          <div className="tape"></div>
          
          {/* Red margin line */}
          <div className="absolute top-0 bottom-0 left-16 md:left-20 w-[1px] bg-red-300/30"></div>
          
          {/* Decorative stickers */}
          <div className="absolute -top-6 -right-6 text-4xl sticker select-none">💌</div>
          <div className="absolute -bottom-5 -left-5 text-3xl sticker select-none">🌹</div>

          <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-10">Dear Varshu,</h2>
          
          <div className="font-handwriting text-2xl md:text-3xl text-brown/90 space-y-6 leading-relaxed ml-8 md:ml-12">
            <p className="gf-line">Out of billions of people in this world,</p>
            <p className="gf-line">A random Facebook friend request brought me to you.</p>
            <p className="gf-line">You became my best friend,<br/>my safe place,<br/>my happiness,<br/>my home.</p>
            <p className="gf-line">No matter how many years pass,</p>
            <p className="gf-line">I will always choose you.</p>
            <p className="gf-line text-primary font-bold text-3xl md:text-4xl">Again.<br/>Again.<br/>And Again.</p>
            <p className="gf-line">
              Jaaan I love you alot ❤️<br/>
              I can't imagine myself without you<br/>
              You are the most important need of my life ❤️<br/>
              so now don't ever leave this Jaan ❤️
            </p>
          </div>

          <div className="gf-sign mt-16 font-handwriting text-3xl md:text-4xl text-primary font-bold ml-8 md:ml-12">
            Forever Yours, <br/>
            <span className="inline-flex items-center gap-2 mt-2">
              Vinay <Heart className="inline text-primary" fill="currentColor" size={28} />
            </span>
          </div>
        </div>
      </div>

      <div className="gf-closing text-center mt-32 opacity-0 z-10">
        <div className="w-24 h-[1px] mx-auto mb-8 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
        <p className="font-playfair text-4xl md:text-6xl text-[#eebfbc] italic mb-4">
          The End...
        </p>
        <p className="font-handwriting text-3xl md:text-4xl text-white/40 mt-4">
          Or Maybe Just The Beginning ❤️
        </p>
        <div className="w-24 h-[1px] mx-auto mt-8 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
        
        <p className="font-handwriting text-xl text-white/20 mt-16">
          And it will go on... ❤️ Have a lovely future ❣️
        </p>
      </div>

    </div>
  );
};
