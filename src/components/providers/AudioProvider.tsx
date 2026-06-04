"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We will assume a background music file exists at /audio/background.mp3
    // For now, it will fail silently if the file is missing.
    audioRef.current = new Audio("/audio/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  const playAudio = () => {
    if (!audioRef.current || isPlaying) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => console.error("Audio playback failed:", err));
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playAudio }}>
      {children}
      {/* Global Audio Toggle Button */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-border/50 text-foreground hover:scale-110 transition-transform"
        aria-label="Toggle background music"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
