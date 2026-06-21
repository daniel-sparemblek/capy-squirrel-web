import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Heart, RotateCw } from "lucide-react";
import { PostcardData } from "../types";

interface PostcardProps {
  key?: string;
  card: PostcardData;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isAnyHovered: boolean;
}

export default function Postcard({
  card,
  isHovered,
  onHoverStart,
  onHoverEnd,
  isAnyHovered,
}: PostcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    if (!card.imageUrl) return;
    const img = new Image();
    img.src = card.imageUrl;
    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) {
        setAspectRatio('landscape');
      } else {
        setAspectRatio('portrait');
      }
    };
    img.onerror = () => {
      setAspectRatio('portrait');
    };
  }, [card.imageUrl]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Determine scale and elevation
  const zIdClass = isHovered 
    ? "z-50" 
    : isAnyHovered 
      ? "z-10 opacity-30 scale-95 blur-[1px] grayscale-[20%]" 
      : "z-20 opacity-100 scale-100 grayscale-0";

  const isLandscape = aspectRatio === "landscape";
  
  // Custom height/width layout classes for normal portrait vs landscape polaroids
  const containerClass = isLandscape
    ? `relative h-[360px] w-full max-w-[480px] md:col-span-2 mx-auto transition-all duration-500 ease-out perspective-1000 cursor-pointer ${zIdClass}`
    : `relative h-[480px] w-full max-w-[360px] col-span-1 mx-auto transition-all duration-500 ease-out perspective-1000 cursor-pointer ${zIdClass}`;

  const imgFrameHeight = isLandscape ? "h-[75%]" : "h-[78%]";
  const labelFrameHeight = isLandscape ? "h-[25%]" : "h-[20%]";
  const msgMaxHeight = isLandscape 
    ? "max-h-[140px] md:max-h-[160px]" 
    : "max-h-[240px]";

  return (
    <div
      id={card.id}
      className={containerClass}
      onMouseEnter={onHoverStart}
      onMouseLeave={() => {
        onHoverEnd();
      }}
      onClick={handleCardClick}
    >
      {/* 3D Rotatable Card Container */}
      <div
        className={`w-full h-full duration-700 preserve-3d relative rounded-2xl shadow-xl hover:shadow-2xl transition-shadow ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        
        {/* FRONT SIDE (IMAGE & VINTAGE MATTE DARK FRAME) */}
        <div className="absolute inset-0 w-full h-full bg-[#130d10] p-4 rounded-2xl border border-white/10 flex flex-col justify-between backface-hidden shadow-2xl select-none">
          {/* Photo frame */}
          <div className={`relative w-full ${imgFrameHeight} overflow-hidden rounded-lg bg-[#20181b]/50 group border border-white/5`}>
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Heart Quick Badge (Neon Glow) */}
            <div className="absolute top-3 right-3 bg-[#130d10]/95 border border-white/10 p-1.5 rounded-full shadow-md text-rose-500 transition-transform duration-300 hover:scale-110">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 filter drop-shadow-[0_0_6px_#f43f5e]" />
            </div>

            {/* Hint to click */}
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 text-[10px] text-rose-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <RotateCw className="w-3 h-3 text-rose-400 animate-spin-slow" />
              <span>Click to flip postcard</span>
            </div>
          </div>

          {/* Polaroid lower label section */}
          <div className={`${labelFrameHeight} flex flex-col justify-center px-1`}>
            <h3 className="font-serif text-lg font-normal text-[#e0d8d0] tracking-tight leading-tight truncate">
              {card.title}
            </h3>
            
            <div className="flex items-center justify-between mt-2.5 text-[11px] text-[#e0d8d0]/60 font-sans tracking-wider uppercase">
              <span className="flex items-center gap-1.5 font-light">
                <Calendar className="w-3.5 h-3.5 text-rose-500/70" />
                {card.date}
              </span>
              <span className="flex items-center gap-1 max-w-[50%] truncate font-light">
                <MapPin className="w-3.5 h-3.5 text-rose-500/70 shrink-0" />
                <span className="truncate">{card.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE (HANDWRITTEN NOTE - LUXURY DARK LETTER) */}
        <div className="absolute inset-0 w-full h-full bg-[#181114] rounded-2xl border border-white/10 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-3xl select-none overflow-hidden">
          {/* Ambient radial vignette internally */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(225,29,72,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative flex flex-col h-full justify-between z-10">
            {/* Top header - Postcard Label & Stamp */}
            <div className="flex justify-between items-start border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-[#e0d8d0]/70">
                <Heart className="w-4 h-4 text-rose-500/80 fill-rose-950/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-semibold text-[#e0d8d0]/70">Private Archive Preserved</span>
              </div>
              
              {/* Decorative Stamp (Immersive UI style) */}
              <div className="w-11 h-14 border border-dashed border-rose-500 p-0.5 bg-[#130d10] rounded-sm rotate-3 flex flex-col items-center justify-center shadow-lg shrink-0">
                <div className="w-full h-full border border-rose-900 bg-[#1e0f13] rounded-xs flex flex-col items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-600 text-rose-600 animate-pulse" />
                  <span className="text-[6px] font-mono mt-1 text-rose-400 font-bold uppercase tracking-wider">Stamp</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Divided content */}
            <div className="flex-1 grid grid-cols-12 gap-3.5 mt-4 overflow-hidden py-1">
              {/* Left Side: Message */}
              <div className={`col-span-7 flex flex-col pr-2 border-r border-[#261c1f] overflow-y-auto ${msgMaxHeight} scrollbar-thin`}>
                <p className="font-handwritten text-xl leading-relaxed text-rose-100/90 whitespace-pre-wrap drop-shadow-[0_0_1px_rgba(251,113,133,0.1)]">
                  {card.message}
                </p>
              </div>

              {/* Right Side: Mock address lines */}
              <div className="col-span-5 flex flex-col justify-center space-y-3.5 pl-2 text-neutral-400">
                <div className="font-handwritten text-slate-400 text-sm italic pl-1 leading-tight">
                  To,
                  <div className="text-rose-400 text-base font-normal font-serif not-italic mt-0.5 pl-2 tracking-wide"> My Favorite Person </div>
                </div>

                <div className="space-y-2">
                  <div className="border-b border-white/5 h-4 w-full"></div>
                  <div className="border-b border-white/5 h-4 w-full"></div>
                  <div className="border-b border-white/5 h-4 w-full"></div>
                </div>

                <div className="pt-2 text-center">
                  <span className="inline-block font-sans font-semibold text-[8px] tracking-[0.2em] text-rose-400 uppercase bg-[#28151a] border border-rose-900/30 px-2.5 py-1 rounded">
                    Hand Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer block */}
            <div className="flex justify-between items-center text-[9px] text-[#e0d8d0]/40 font-mono mt-3 pt-2.5 border-t border-white/5">
              <span className="italic">Reverse Side • Postcard</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-sans flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCw className="w-3 h-3 text-rose-400 animate-pulse" />
                Flip to image
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
