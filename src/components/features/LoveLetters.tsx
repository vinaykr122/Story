"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Heart } from "lucide-react";

const LETTERS = [
  { 
    id: "present", 
    title: "Present Vinay", 
    emoji: "💌",
    text: "My dearest Varshu, looking back at our journey fills my heart with joy. From that random friend request to living together in Kolkata... every struggle, every tear, every fight made us stronger. I wouldn't change a single day. You are my diamond." 
  },
  { 
    id: "future", 
    title: "Future Vinay", 
    emoji: "🔮",
    text: "To my forever love, if you're reading this years from now, I want you to know — I chose you then, I choose you now, and I will always choose you. Our story is proof that the universe has its own plans, and ours was to be together." 
  },
  { 
    id: "birthday", 
    title: "Birthday Letter", 
    emoji: "🎂",
    text: "Happy birthday to the girl who gave me a new life. The day you were born, the universe created someone who would change my entire existence. Every birthday of yours is a celebration for me too — because you exist. That's the greatest gift." 
  },
  { 
    id: "thanks", 
    title: "Thank You Letter", 
    emoji: "🙏",
    text: "Thank you for staying when everyone else left. Thank you for supporting me through the darkest times. Thank you for being my backbone. When everyone left, we stayed. That's what true love is." 
  },
  { 
    id: "forever", 
    title: "Forever Letter", 
    emoji: "💍",
    text: "This is my promise — to choose you, every single day. Chahe kuch bhi ho jaye, bas ab tere sath rahna hai. Jab life hai, akhir ab nhi jana kisi aur pass. You are my diamond. ❤️" 
  },
];

export const LoveLetters = () => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto my-24 p-8">
      <h2 className="font-playfair text-5xl text-brown mb-4 text-center">Love Letters</h2>
      <p className="font-handwriting text-2xl text-brown/40 text-center mb-16">Click an envelope to read...</p>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {LETTERS.map((letter, i) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.08, y: -12 }}
            onClick={() => setActiveLetter(letter.id)}
            className="w-44 h-36 bg-gradient-to-br from-white to-gray-50 rounded-xl scrapbook-shadow border border-gray-200/60 flex flex-col items-center justify-center cursor-pointer interactive relative overflow-hidden group"
          >
             {/* Envelope flap */}
             <div className="absolute top-0 w-0 h-0 border-l-[88px] border-l-transparent border-r-[88px] border-r-transparent border-t-[36px] border-t-primary/15 z-10 transition-colors group-hover:border-t-primary/30"></div>
             
             <span className="text-3xl mb-2 z-20 sticker">{letter.emoji}</span>
             <p className="font-handwriting text-base text-brown text-center z-20 px-2 leading-tight">
               {letter.title}
             </p>

             {/* Subtle glow on hover */}
             <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-xl" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.7, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.7, rotateX: -90 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-[#f9f5ec] p-8 md:p-14 rounded-sm max-w-2xl w-full relative scrapbook-shadow border-2 border-[#e6dfcc] notebook-lines"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 bg-gray-200/80 p-2.5 rounded-full hover:bg-gray-300 transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Red margin line */}
              <div className="absolute top-0 bottom-0 left-12 md:left-16 w-[1px] bg-red-300/25"></div>

              <div className="absolute -top-5 -right-5 text-3xl sticker select-none">
                {LETTERS.find(l => l.id === activeLetter)?.emoji}
              </div>
              
              <h3 className="font-playfair text-3xl text-brown mb-8 pb-4 border-b border-brown/15 ml-6 md:ml-10">
                {LETTERS.find(l => l.id === activeLetter)?.title}
              </h3>
              
              <p className="font-handwriting text-2xl md:text-[1.65rem] text-brown/85 leading-relaxed min-h-[200px] ml-6 md:ml-10">
                {LETTERS.find(l => l.id === activeLetter)?.text}
              </p>

              <div className="mt-12 ml-6 md:ml-10 font-handwriting text-2xl text-primary font-bold flex items-center gap-2">
                 Love, Vinay <Heart size={20} fill="currentColor" className="text-primary" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
