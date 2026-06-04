"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserPlus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter1 = () => {
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

    tl.fromTo(
      ".ch1-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      ".ch1-text",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.5"
    )
    .fromTo(
      ".ch1-fb-card",
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 2, duration: 1.5, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .to(".ch1-fb-btn", {
      backgroundColor: "#22c55e", // turns green
      scale: 1.1,
      duration: 0.5,
    }, "+=0.5")
    .to(".ch1-fb-btn-icon", {
      rotation: 360,
      duration: 0.5,
    }, "<")
    .fromTo(".ch1-hearts", { opacity: 0, scale: 0, y: 0 }, { opacity: 1, scale: 1.5, y: -50, duration: 1 }, "<");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <h2 className="ch1-title font-playfair text-5xl md:text-7xl text-brown mb-6 text-center">
        Chapter 1
      </h2>
      <p className="ch1-text font-handwriting text-2xl md:text-3xl text-brown/80 mb-16 text-center max-w-3xl leading-relaxed">
        Main jo kisi se baat karne me sharmata tha, ek introvert... 
        Phir social media pe friend banana shuru kiya. Ek din, randomly ek request bheji. <br/>
        Pata nahi kya reason tha mera send karna aur tera accept karna, but that day you were just a normal friend added... <br/>
        <span className="text-primary font-bold text-4xl mt-4 block">Varsha Kumari.</span>
      </p>

      {/* The Scrapbook Element */}
      <div className="ch1-fb-card polaroid max-w-md w-full flex items-center space-x-4">
        <div className="tape"></div>
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
           <img src="/assets/varsha_profile_pic.jpeg" alt="Varsha Kumari" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-xl text-brown">Varsha Kumari</h3>
          <p className="text-sm text-brown/60">Accepted your friend request</p>
        </div>
        
        <div className="relative">
          <div className="ch1-fb-btn bg-blue-600 text-white p-3 rounded-full shadow-md">
            <UserPlus size={20} className="ch1-fb-btn-icon" />
          </div>
          {/* Hearts Particle Container */}
          <div className="ch1-hearts absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
             <span className="text-red-500 text-2xl absolute -top-8 -left-4">❤️</span>
             <span className="text-pink-400 text-xl absolute -top-12 right-2">💖</span>
             <span className="text-red-400 text-lg absolute -top-4 -right-6">❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
};
