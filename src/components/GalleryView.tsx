import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Heart, Settings, Volume2, VolumeX, Sparkles, LogOut } from "lucide-react";
import { PostcardData, GallerySettings } from "../types";
import Postcard from "./Postcard";

interface GalleryViewProps {
  postcards: PostcardData[];
  settings: GallerySettings;
  onLock: () => void;
  onOpenEditor: () => void;
}

export default function GalleryView({
  postcards,
  settings,
  onLock,
  onOpenEditor,
}: GalleryViewProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play background music automatically on unlock if allowed by browser
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      
      // Auto-play attempt on mount
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay prevented. Music will wait for toggle.", err);
            setIsPlaying(false);
          });
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [settings.musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio failed to play", err));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0505] text-[#e0d8d0] font-serif overflow-x-hidden pb-16 selection:bg-rose-900 selection:text-white">
      
      {/* Hidden HTML Audio Element */}
      <audio
        ref={audioRef}
        src={settings.musicUrl}
        loop
        preload="auto"
      />

      {/* Floating Sparkles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-[15%] left-[5%] text-rose-950 animate-pulse">✦</div>
        <div className="absolute top-[35%] right-[8%] text-rose-900 animate-ping duration-[3000ms]">✦</div>
        <div className="absolute bottom-[25%] left-[12%] text-rose-950/40 animate-bounce">✦</div>
        <div className="absolute bottom-[10%] right-[15%] text-rose-900/50 animate-pulse">✦</div>
      </div>

      {/* Immersive radial glow background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)] z-1" />

      {/* Exquisite Top Bar Menu (Immersive UI Layout) */}
      <header className="sticky top-0 z-100 bg-[#0a0505]/95 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-pulse shadow-[0_0_8px_#e11d48]"></div>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 font-sans hidden sm:inline">
            Connection Secured • Private Archive
          </span>
          <span className="font-serif font-bold text-[#e0d8d0] text-base tracking-wide sm:hidden">
            Archive Case
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mute/Unmute Music Button */}
          <button
            onClick={toggleMusic}
            className={`p-2.5 rounded-full border transition flex items-center gap-2 cursor-pointer ${
              isPlaying
                ? "bg-rose-950/40 border-rose-900/50 text-rose-300 shadow-lg"
                : "bg-white/[0.03] text-[#e0d8d0]/40 border-white/10 hover:text-[#e0d8d0]"
            }`}
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                {/* Micro Music Playing Visualizer */}
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 bg-rose-500 rounded-sm animate-[bounce_0.6s_infinite_alternate]" style={{ height: "100%" }}></div>
                  <div className="w-0.5 bg-rose-500 rounded-sm animate-[bounce_0.8s_infinite_alternate_300ms]" style={{ height: "60%" }}></div>
                  <div className="w-0.5 bg-rose-500 rounded-sm animate-[bounce_0.5s_infinite_alternate_150ms]" style={{ height: "80%" }}></div>
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Customize Button */}
          <button
            onClick={onOpenEditor}
            className="p-2.5 rounded-md bg-white/[0.03] hover:bg-white/[0.07] text-[#e0d8d0] border border-white/10 hover:border-white/20 shadow-md transition flex items-center gap-1.5 cursor-pointer text-xs font-sans tracking-wide uppercase font-semibold"
            title="Edit postcards, passcode & titles"
          >
            <Settings className="w-3.5 h-3.5 text-rose-500/70" />
            <span className="hidden md:inline">Customize</span>
          </button>

          {/* Lock Button */}
          <button
            onClick={onLock}
            className="p-2.5 rounded-md bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 shadow-lg shadow-rose-950 border border-rose-900/30 hover:border-rose-900/50 transition flex items-center gap-1.5 cursor-pointer text-xs font-sans tracking-wide uppercase font-semibold"
            title="Lock Gallery"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Seal Archive</span>
          </button>
        </div>
      </header>

      {/* Main Title Section */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto select-none relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-rose-950/30 border border-rose-900/30 px-3.5 py-1.5 rounded-full text-rose-400 font-sans font-semibold text-xs tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>Preserved Lovestories</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light italic text-[#e0d8d0] tracking-tight mb-2 leading-tight">
            {settings.galleryTitle}
          </h2>

          {/* Soft separator */}
          <div className="flex items-center justify-center gap-3 py-2 text-rose-900/60">
            <div className="h-px bg-white/5 w-12"></div>
            <Heart className="w-3.5 h-3.5 fill-rose-900/20 text-rose-500/60" />
            <div className="h-px bg-white/5 w-12"></div>
          </div>

          <p className="text-xs md:text-sm text-[#e0d8d0]/70 max-w-2xl mx-auto font-sans uppercase tracking-[0.2em] leading-relaxed opacity-80">
            {settings.gallerySubtitle}
          </p>
        </motion.div>
      </section>

      {/* FOCUS OVERLAY (Dims screen except focused card) */}
      <AnimatePresence>
        {hoveredCardId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* POSTCARDS PHOTO GRID */}
      <main className="relative max-w-7xl mx-auto px-6 md:px-12 mt-4 z-40">
        {postcards.length === 0 ? (
          <div className="text-center py-20 bg-[#110b0d] rounded-2xl border border-white/5 shadow-2xl p-8 max-w-lg mx-auto">
            <Heart className="w-12 h-12 text-rose-500/40 mx-auto fill-rose-950/20 mb-4 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.1)]" />
            <h3 className="text-[#e0d8d0] font-serif text-lg font-normal italic">No postcards in the box</h3>
            <p className="text-xs text-[#e0d8d0]/50 mt-1 mb-6 font-sans">Click 'Customize' at the top to add your beautiful memories!</p>
            <button
              onClick={onOpenEditor}
              className="px-5 py-2.5 bg-rose-950 hover:bg-rose-900 text-rose-100 rounded-md text-xs font-sans uppercase tracking-widest font-semibold border border-rose-900/30 shadow-lg cursor-pointer"
            >
              Add Your First Postcard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-16">
            {postcards.map((card) => (
              <Postcard
                key={card.id}
                card={card}
                isHovered={hoveredCardId === card.id}
                onHoverStart={() => setHoveredCardId(card.id)}
                onHoverEnd={() => setHoveredCardId(null)}
                isAnyHovered={hoveredCardId !== null}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating signature line */}
      <footer className="w-full text-center py-12 mt-20 text-[10px] text-[#e0d8d0]/35 select-none border-t border-white/5 font-sans tracking-widest uppercase">
        <div className="flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-900/40 text-rose-600 animate-pulse" />
          <span>just for you</span>
        </div>
      </footer>

    </div>
  );
}
