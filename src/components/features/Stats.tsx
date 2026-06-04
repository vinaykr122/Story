"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Image as ImageIcon, Phone, Map, Heart, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Days Together", value: 1500, icon: Calendar, color: "from-pink-400 to-rose-500" },
  { label: "Photos", value: 4500, icon: ImageIcon, color: "from-violet-400 to-purple-500" },
  { label: "Calls", value: 3000, icon: Phone, color: "from-emerald-400 to-green-500" },
  { label: "Trips", value: 12, icon: Map, color: "from-amber-400 to-orange-500" },
  { label: "Memories", value: 10000, icon: Heart, suffix: "+", color: "from-red-400 to-pink-500" },
  { label: "Hours Talked", value: 5000, icon: Clock, color: "from-blue-400 to-indigo-500" },
];

export const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate numbers
    gsap.from(".stat-number", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        toggleActions: "play none none none"
      },
      textContent: 0,
      duration: 2.5,
      ease: "power2.out",
      snap: { textContent: 1 },
      stagger: 0.15
    });

    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.5)"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto my-24 p-8">
      <h2 className="font-playfair text-5xl text-brown mb-4 text-center">Relationship Stats</h2>
      <p className="font-handwriting text-2xl text-brown/40 text-center mb-16">Our love in numbers</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {STATS.map((stat, i) => {
           const Icon = stat.icon;
           return (
             <div key={i} className="stat-card bg-white p-6 md:p-8 rounded-3xl scrapbook-shadow flex flex-col items-center justify-center border border-gray-100/80 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-2xl mb-4 text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                   <Icon size={28} />
                </div>
                <div className="flex items-end font-playfair font-bold text-4xl md:text-5xl text-brown mb-2">
                   <span className="stat-number">{stat.value}</span>
                   {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                </div>
                <p className="font-handwriting text-xl text-gray-400">{stat.label}</p>
             </div>
           )
        })}
      </div>
    </div>
  );
};
