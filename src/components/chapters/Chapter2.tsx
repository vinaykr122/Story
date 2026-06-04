"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Chapter2 = () => {
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

    // Messenger UI appears
    tl.fromTo(
      ".ch2-messenger",
      { opacity: 0, y: 100, rotate: 2 },
      { opacity: 1, y: 0, rotate: 0, duration: 1 }
    )
    // Typing indicator
    .fromTo(".ch2-typing", { opacity: 0 }, { opacity: 1, duration: 0.5 })
    .to(".ch2-typing", { opacity: 0, duration: 0.5 }, "+=0.5")
    // "Hi..." message appears
    .fromTo(".ch2-msg", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 })
    // Silence / Read receipt text
    .fromTo(".ch2-read", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "+=0.5")
    // Final text
    .fromTo(
      ".ch2-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "+=0.5"
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-12 text-center">
        Chapter 2: The First Message
      </h2>

      {/* Messenger UI Mockup */}
      <div className="ch2-messenger w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative rotate-1 scrapbook-shadow mb-12">
        <div className="tape"></div>
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
             <img src="/assets/varsha_profile_pic.jpeg" alt="Varshu" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Varsha Kumari</h3>
            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-4 h-64 bg-gray-100 flex flex-col justify-end space-y-4">
          <div className="ch2-typing self-end bg-blue-500 text-white rounded-2xl py-2 px-4 opacity-0 max-w-[80%]">
             <div className="flex space-x-1 items-center h-4">
               <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
               <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
               <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
             </div>
          </div>

          <div className="flex flex-col items-end w-full">
            <div className="text-center text-[10px] text-gray-400 mb-2 font-sans w-full uppercase">
              23 May 2020 at 8:49 PM
            </div>
            <div className="ch2-msg self-end bg-blue-500 text-white rounded-2xl rounded-tr-sm py-2 px-4 opacity-0 shadow-sm max-w-[80%]">
              <p>Hlo ji</p>
            </div>
            <p className="ch2-read text-[10px] text-gray-400 mt-1 mr-1 opacity-0">Delivered</p>
          </div>
          
          <div className="h-10"></div> {/* Spacer for silence */}
        </div>
      </div>

      <p className="ch2-text font-handwriting text-3xl md:text-4xl text-brown/90 text-center max-w-lg leading-relaxed opacity-0">
        Ek din woh aise hi ek msg kiya, but uska koi reply nahi... <br/>
        <span className="text-primary italic mt-4 block">"First msg sent on 23 may, but did not get respond..."</span>
      </p>
    </div>
  );
};
