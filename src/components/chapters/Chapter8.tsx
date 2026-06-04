"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Chapter8 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");

  useGSAP(() => {
    if (!containerRef.current) return;

    const texts = [
      "I think I like you...",
      "", // delete
      "You mean a lot to me...",
      "", // delete
      "I love you."
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.2) setTypedText("I think I like you...");
          else if (progress < 0.4) setTypedText("");
          else if (progress < 0.6) setTypedText("You mean a lot to me...");
          else if (progress < 0.8) setTypedText("");
          else setTypedText("I love you.");
        }
      },
    });

    tl.fromTo(".ch8-heart", { scale: 0.5, opacity: 0.2 }, { scale: 2, opacity: 0.8, duration: 1 })
      .to(".ch8-heart", { scale: 10, opacity: 0, duration: 0.5 }, "+=0.2");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      <Heart className="ch8-heart absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary pointer-events-none z-0" fill="currentColor" size={200} />

      <h2 className="font-playfair text-4xl md:text-5xl text-brown mb-16 text-center z-10 relative bg-background/50 backdrop-blur-sm px-6 py-2 rounded-2xl">
        Chapter 8: Love Without Saying It
      </h2>

      <div className="w-full max-w-sm bg-gray-100 rounded-3xl p-4 shadow-inner relative z-10">
         <div className="bg-white rounded-2xl p-4 min-h-[60px] shadow-sm flex items-center border border-gray-200">
           <span className="text-gray-400 font-sans mr-2">Message...</span>
           <span className="font-sans text-black border-r-2 border-blue-500 pr-1 animate-pulse">
             {typedText}
           </span>
         </div>
      </div>
      
      <p className="font-handwriting text-2xl text-brown/60 mt-8 z-10 relative text-center">
        Typing... Deleting... Typing... Deleting... <br/>
        The hidden feelings that grew in silence.
      </p>
    </div>
  );
};
