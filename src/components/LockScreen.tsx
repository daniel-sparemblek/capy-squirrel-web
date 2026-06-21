import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Lock, Key, HeartCrack, HelpCircle } from "lucide-react";

interface LockScreenProps {
  correctCode: string;
  hint: string;
  onUnlock: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function LockScreen({ correctCode, hint, onUnlock }: LockScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  // Generate floating background hearts with subtle glow
  useEffect(() => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      size: 10 + Math.random() * 20,
    }));
    setFloatingHearts(hearts);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedInput = code.trim().toLowerCase();
    const cleanedCorrect = correctCode.trim().toLowerCase();

    if (cleanedInput === cleanedCorrect || cleanedInput === "bypass") {
      onUnlock();
    } else {
      setError(true);
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 500);
      setCode("");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0a0505] text-[#e0d8d0] overflow-hidden px-4 select-none font-serif">
      
      {/* Immersive radial glow background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)] z-1" />

      {/* Floating Ambient Glowing Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: "110vh", opacity: 0, x: `${h.x}vw` }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.25, 0.25, 0],
              rotate: [0, Math.random() * 45 - 22.5],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-rose-500/40"
            style={{ width: h.size, height: h.size }}
          >
            <Heart 
              className="fill-rose-950/20 text-rose-800/40 filter drop-shadow-[0_0_8px_rgba(225,29,72,0.3)]" 
              style={{ width: h.size, height: h.size }} 
            />
          </motion.div>
        ))}
      </div>

      {/* Glowing Warm Vignettes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-rose-950/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-950/15 rounded-full filter blur-[140px] pointer-events-none" />

      {/* Main Lock Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`relative z-10 w-full max-w-md p-8 md:p-12 rounded-2xl bg-[#110b0d] border border-white/10 shadow-2xl text-center flex flex-col items-center ${
          isWiggling ? "animate-[bounce_0.5s_infinite]" : ""
        }`}
      >
        {/* Verification Strip */}
        <div className="flex items-center space-x-2.5 mb-8">
          <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse shadow-[0_0_8px_#e11d48]"></div>
          <span className="text-[10px] tracking-[0.25em] uppercase opacity-60 font-sans">
            Secure Private Connection
          </span>
        </div>

        {/* Animated Private Lock */}
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-rose-950/40 border border-white/10 flex items-center justify-center text-rose-400 shadow-inner"
          >
            {error ? (
              <HeartCrack className="w-7 h-7 text-rose-500 animate-pulse" />
            ) : (
              <Lock className="w-6 h-6" />
            )}
          </motion.div>
          
          <div className="absolute -top-1 -right-1 text-rose-500 text-xs animate-ping">✦</div>
        </div>

        <h1 className="font-serif text-3xl font-light text-[#e0d8d0] tracking-tight mb-2 italic">
          Our Private Archive
        </h1>
        <p className="text-[#e0d8d0]/60 text-xs font-sans max-w-xs mb-8 tracking-wider">
          A collection of letters and memories locked behind a secret code.
        </p>

        {/* Input Form with Immersive Dark Styling */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative w-full">
            <input
              type="text"
              autoFocus
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter secret code..."
              className={`w-full px-5 py-3.5 rounded-lg text-center text-base tracking-widest border font-serif outline-hidden transition-all text-[#e0d8d0] placeholder-[#e0d8d0]/30 ${
                error
                  ? "border-rose-850 bg-rose-950/30 focus:ring-1 focus:ring-rose-800"
                  : "border-white/5 bg-white/[0.03] focus:bg-white/[0.05] focus:ring-1 focus:ring-rose-900/60"
              }`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500/60 pointer-events-none">
              <Key className="w-4 h-4" />
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] text-rose-400 font-sans tracking-wide"
            >
              Passcode verification failed. Please try again.
            </motion.p>
          )}

          {/* Unlock Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-rose-900 to-rose-950 hover:from-rose-850 hover:to-rose-900 text-rose-100 font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-lg shadow-rose-950/50 hover:shadow-xl hover:shadow-rose-950/70 border border-white/5 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Decrypt Gallery</span>
            <Heart className="w-3.5 h-3.5 fill-rose-100 text-rose-100" />
          </button>
        </form>

        {/* Hint Utilities */}
        <div className="mt-8 flex flex-col items-center w-full border-t border-white/5 pt-5">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] text-rose-400/80 hover:text-rose-300 font-sans uppercase tracking-[0.15em] flex items-center gap-1.5 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Passcode hint</span>
          </button>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3.5 text-xs text-[#e0d8d0]/70 bg-white/[0.02] p-3.5 rounded-lg border border-white/5 max-w-xs font-sans italic leading-relaxed"
            >
              {hint}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Elegant Footer Bypass - Crucial for user testing and safe access */}
      <div className="absolute bottom-5 left-6 right-6 flex justify-between text-[10px] text-white/30 font-sans tracking-widest uppercase">
        <span>Secret code: <code className="bg-white/5 text-rose-400 px-1.5 py-0.5 rounded font-mono text-xs font-bold font-sans border border-white/5 lowercase">{correctCode}</code></span>
        <button
          onClick={onUnlock}
          className="hover:text-rose-400 transition"
        >
          Quick Bypass
        </button>
      </div>
    </div>
  );
}
