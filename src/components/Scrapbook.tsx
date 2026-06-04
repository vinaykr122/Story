"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chapter1 } from "./chapters/Chapter1";
import { Chapter2 } from "./chapters/Chapter2";
import { Chapter3 } from "./chapters/Chapter3";
import { Chapter4 } from "./chapters/Chapter4";
import { Chapter5 } from "./chapters/Chapter5";
import { Chapter6 } from "./chapters/Chapter6";
import { Chapter7 } from "./chapters/Chapter7";
import { Chapter8 } from "./chapters/Chapter8";
import { Chapter9 } from "./chapters/Chapter9";
import { Chapter10 } from "./chapters/Chapter10";
import { Chapter11 } from "./chapters/Chapter11";
import { Chapter12 } from "./chapters/Chapter12";
import { Chapter13 } from "./chapters/Chapter13";
import { Chapter14 } from "./chapters/Chapter14";
import { Chapter15 } from "./chapters/Chapter15";
import { MemoryTree } from "./features/MemoryTree";
import { MemoryMap } from "./features/MemoryMap";
import { PhotoWall } from "./features/PhotoWall";
import { VideoVault } from "./features/VideoVault";
import { LoveLetters } from "./features/LoveLetters";
import { Stats } from "./features/Stats";
import { StarSky } from "./features/StarSky";
import { GrandFinale } from "./features/GrandFinale";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   SCROLL PROGRESS BAR COMPONENT
   ═══════════════════════════════════════════════════════ */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
};

/* ═══════════════════════════════════════════════════════
   FLOATING HEARTS BACKGROUND COMPONENT
   ═══════════════════════════════════════════════════════ */
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 18,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 15,
      opacity: 0.15 + Math.random() * 0.2,
    })));
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="floating-heart text-primary"
          fill="currentColor"
          size={h.size}
          style={{
            left: h.left,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   CHAPTER DIVIDER COMPONENT
   ═══════════════════════════════════════════════════════ */
const ChapterDivider = () => <div className="chapter-divider" />;

/* ═══════════════════════════════════════════════════════
   MAIN SCRAPBOOK COMPONENT
   ═══════════════════════════════════════════════════════ */
export const Scrapbook = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate cover page on load
    gsap.fromTo(".cover-title", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(".cover-subtitle", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );
    gsap.fromTo(".cover-hint", 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, delay: 1.5 }
    );
    gsap.to(".cover-arrow", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
      delay: 2,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full">
      <ScrollProgress />
      <FloatingHearts />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/8 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary/8 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
      </div>

      {/* ═══════════════════════════════════════════════
          COVER PAGE — The Grand Entrance 
         ═══════════════════════════════════════════════ */}
      <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        {/* Decorative corner flourishes */}
        <div className="absolute top-8 left-8 text-primary/20 text-6xl select-none">✿</div>
        <div className="absolute top-8 right-8 text-secondary/20 text-6xl select-none rotate-90">✿</div>
        <div className="absolute bottom-8 left-8 text-secondary/20 text-6xl select-none -rotate-90">✿</div>
        <div className="absolute bottom-8 right-8 text-primary/20 text-6xl select-none rotate-180">✿</div>

        <div className="polaroid max-w-2xl w-full p-8 md:p-16 text-center transform -rotate-1 glow-pink">
          <div className="tape"></div>
          
          {/* Small decorative stickers */}
          <div className="absolute -top-6 -right-6 text-4xl sticker select-none">💕</div>
          <div className="absolute -bottom-4 -left-4 text-3xl sticker select-none">🌸</div>

          <h1 className="cover-title font-playfair text-6xl md:text-8xl text-brown mb-4 opacity-0">
            Our Story
          </h1>
          <div className="w-24 h-[2px] mx-auto mb-6 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          <h2 className="cover-subtitle font-handwriting text-4xl md:text-6xl text-primary mb-12 opacity-0">
            Vinay & Varshu
          </h2>
          <p className="cover-hint font-sans text-brown/60 italic max-w-md mx-auto text-lg opacity-0">
            Scroll down to relive the memories...
          </p>
          <div className="cover-arrow mt-8 text-primary/50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
              <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chapters with Dividers */}
      <Chapter1 />
      <ChapterDivider />
      <Chapter2 />
      <ChapterDivider />
      <Chapter3 />
      <ChapterDivider />
      <Chapter4 />
      <ChapterDivider />
      <Chapter5 />
      <ChapterDivider />
      <Chapter6 />
      <ChapterDivider />
      <Chapter7 />
      <ChapterDivider />
      <Chapter8 />
      <ChapterDivider />
      <Chapter9 />
      <ChapterDivider />
      <Chapter10 />
      <ChapterDivider />
      <Chapter11 />
      <ChapterDivider />
      <Chapter12 />
      <ChapterDivider />
      <Chapter13 />
      <ChapterDivider />
      <Chapter14 />
      <ChapterDivider />
      <Chapter15 />

      {/* Transition to Interactive Modules */}
      <div className="py-24 flex flex-col items-center justify-center text-center px-8">
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mb-8"></div>
        <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-4 shimmer-text">Interactive Vault</h2>
        <p className="font-handwriting text-2xl text-brown/50">Explore our memories in new ways...</p>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mt-8"></div>
      </div>

      {/* Interactive Modules */}
      <MemoryTree />
      <MemoryMap />
      <PhotoWall />
      <VideoVault />
      <LoveLetters />
      <Stats />
      <StarSky />
      <GrandFinale />

    </div>
  );
};
