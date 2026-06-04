"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Check, MessageCircle, Heart, Sparkles } from "lucide-react";
import { useAudio } from "@/components/providers/AudioProvider";

interface OpeningTrailerProps {
  onComplete: () => void;
}

/* ═══════════════════════════════════════════════════════
   FLOATING PARTICLES — Hearts and sparkles in background
   ═══════════════════════════════════════════════════════ */
const BackgroundParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 8,
      type: Math.random() > 0.5 ? "heart" : "sparkle",
    })));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.type === "heart" ? (
            <Heart size={p.size} className="text-[#eebfbc]/30" fill="currentColor" />
          ) : (
            <Sparkles size={p.size} className="text-[#d4af37]/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   COUNTDOWN TIMER
   ═══════════════════════════════════════════════════════ */
const TARGET_DATE = new Date("2026-06-05T00:00:00+05:30").getTime();

const CountdownTimer = ({ onUnlock }: { onUnlock: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const updateTimer = () => {
      const remaining = TARGET_DATE - Date.now();
      if (remaining <= 0) {
        onUnlock();
      }
      setTimeLeft(Math.max(0, remaining));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [onUnlock]);

  if (!isMounted) return null;

  const handleTimerClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 10) {
      setClicks(0); // reset
      const pin = window.prompt("Enter Secret PIN:");
      if (pin === "78784545") {
        onUnlock();
      } else if (pin) {
        alert("Incorrect PIN.");
      }
    }
  };

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div 
      className="flex flex-col items-center gap-6 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl cursor-pointer select-none transition-transform hover:scale-[1.02] active:scale-95"
      onClick={handleTimerClick}
      title="Click 10 times to unlock early"
    >
      <h3 className="font-playfair text-2xl text-[#fdfbf7]/90 text-center">
        Our Story Unlocks On <br/> <span className="text-[#eebfbc] text-3xl mt-2 inline-block">5th June</span>
      </h3>
      <div className="flex gap-4 font-mono text-4xl md:text-5xl text-[#fdfbf7] font-light">
        <div className="flex flex-col items-center">
          <span>{hours.toString().padStart(2, '0')}</span>
          <span className="text-xs text-white/50 font-sans uppercase tracking-widest mt-2">Hours</span>
        </div>
        <span className="text-white/30">:</span>
        <div className="flex flex-col items-center">
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="text-xs text-white/50 font-sans uppercase tracking-widest mt-2">Mins</span>
        </div>
        <span className="text-white/30">:</span>
        <div className="flex flex-col items-center">
          <span>{seconds.toString().padStart(2, '0')}</span>
          <span className="text-xs text-white/50 font-sans uppercase tracking-widest mt-2">Secs</span>
        </div>
      </div>
    </div>
  );
};
export const OpeningTrailer: React.FC<OpeningTrailerProps> = ({ onComplete }) => {
  const [step, setStep] = useState(-1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { playAudio } = useAudio();

  const startSequence = async () => {
    setStep(0);
    await new Promise(r => setTimeout(r, 2000)); // Initial pause
    setStep(1); // "Sometimes the most beautiful stories..."
    await new Promise(r => setTimeout(r, 4000));
    setStep(2); // Show FB Request
    await new Promise(r => setTimeout(r, 3000));
    setStep(3); // Request Accepted
    await new Promise(r => setTimeout(r, 2500));
    setStep(4); // Chat Bubble / Memory Flash
    await new Promise(r => setTimeout(r, 3000));
    setStep(5); // Enter Scrapbook Button
  };

  useEffect(() => {
    if (Date.now() >= TARGET_DATE) {
      setIsUnlocked(true);
      startSequence();
    } else {
      setStep(5); // Show locked timer immediately
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    startSequence();
  };

  const handleEnter = () => {
    playAudio();
    onComplete();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white overflow-hidden z-50"
         style={{
           background: 'radial-gradient(ellipse at center, #2a2421 0%, #1a1410 50%, #0d0a08 100%)',
         }}>
      
      {/* Ambient background particles */}
      <BackgroundParticles />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
           }} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="text1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-center px-6 z-10"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-8 mx-auto max-w-md"
            />
            <h1 className="font-playfair text-3xl md:text-5xl font-light tracking-wide text-[#fdfbf7]/90 leading-relaxed">
              Sometimes the most beautiful stories <br className="hidden md:block" />
              <span className="font-handwriting text-[#eebfbc] text-5xl md:text-7xl italic mt-4 inline-block">
                begin with a random friend request...
              </span>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mt-8 mx-auto max-w-md"
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="fb-request"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="bg-white text-black p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 flex items-center space-x-4 z-10 relative"
          >
            {/* Subtle glow behind card */}
            <div className="absolute -inset-4 bg-[#eebfbc]/10 rounded-3xl blur-xl -z-10" />
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
              <img src="/assets/Vinay_profile.jpeg" alt="Vinay" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Vinay</h3>
              <p className="text-sm text-gray-500">Sent you a friend request</p>
            </div>
            <motion.button
              className="bg-blue-600 text-white p-3 rounded-full interactive shadow-lg"
              whileHover={{ scale: 1.1 }}
              animate={{ boxShadow: ["0 0 0px rgba(37, 99, 235, 0)", "0 0 20px rgba(37, 99, 235, 0.4)", "0 0 0px rgba(37, 99, 235, 0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <UserPlus size={20} />
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="fb-accepted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white text-black p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 flex items-center space-x-4 relative overflow-hidden z-10"
          >
            <motion.div 
              className="absolute inset-0 bg-green-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: 10 }}
              transition={{ duration: 1 }}
            />
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 z-10 ring-2 ring-green-200">
              <img src="/assets/Vinay_profile.jpeg" alt="Vinay" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 z-10">
              <h3 className="font-semibold text-lg">Vinay</h3>
              <p className="text-sm text-green-600 font-medium">You are now connected!</p>
            </div>
            <motion.div 
              className="bg-green-500 text-white p-3 rounded-full z-10 shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Check size={20} />
            </motion.div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="chat-bubble"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center z-10"
          >
             <motion.div
               animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
               <MessageCircle size={64} className="text-[#eebfbc] mb-6" />
             </motion.div>
             <p className="font-handwriting text-4xl text-center text-[#fdfbf7]/80">
               One click changed everything...
             </p>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="enter-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center z-10"
          >
            {!isUnlocked ? (
               <CountdownTimer onUnlock={handleUnlock} />
            ) : (
              <>
                <motion.button
                  onClick={handleEnter}
                  className="group relative px-12 py-6 bg-[#fdfbf7] text-[#3b312b] rounded-full font-playfair text-2xl overflow-hidden interactive glow-pink"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Enter Our Story <Heart className="text-[#eebfbc] group-hover:scale-125 transition-transform" fill="currentColor" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#eebfbc]/0 via-[#eebfbc]/20 to-[#eebfbc]/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
                <p className="mt-8 font-handwriting text-2xl text-white/40">
                  (Turn on your volume)
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
