"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export type HeroMedia = {
  id: string;
  url: string;
  type: "image" | "video";
  cloudinary_public_id: string;
} | null;

export default function HeroSection({ heroMedia }: { heroMedia: HeroMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Sync muted state to DOM — React's `muted` prop doesn't update after render
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Try to unmute as soon as the video starts playing (autoplay requires muted initially)
  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    // If browser allowed it, update UI; otherwise it silently stays muted
    setIsMuted(video.muted);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">

      {/* "FITNESS" — massive text (z-[1]) */}
      <motion.div
        className="absolute top-[72%] md:top-[62%] left-0 pl-12 z-[1] pointer-events-none select-none"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <span className="absolute top-[-18px] md:top-[-30px] left-[124px] md:left-[72px] font-body font-semibold text-sm md:text-2xl tracking-[0.3em] uppercase text-white">
          UNISEX
        </span>
        <span className="font-display font-normal text-white tracking-[-0.01em] text-[clamp(56px,13vw,96px)] leading-none">
          FITNESS
        </span>
      </motion.div>

      {/* Buttons — independently positioned below FITNESS text */}
      <motion.div
        className="absolute top-[80%] left-0 pl-12 md:pl-14 z-[10] flex gap-4"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <motion.a
          href="#programs"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="font-body font-semibold text-xs tracking-[0.1em] uppercase text-black text-center px-6 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E64D00] transition-colors duration-200"
        >
          Explore Services
        </motion.a>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="font-body font-semibold text-xs tracking-[0.1em] uppercase text-[#FF5500] text-center px-6 py-3 rounded-lg bg-transparent border border-[rgba(255,85,0,0.5)] hover:bg-[rgba(255,85,0,0.1)] hover:border-[#FF5500] transition-all duration-200"
        >
          Contact Us
        </motion.a>
      </motion.div>

      {/* "MR7" label + orange underline (z-[20]) */}
      <motion.div
        className="absolute left-12 md:left-14 top-[70%] md:top-[60%] z-[20]"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0, ease }}
      >
        <span className="font-display font-semibold text-[2rem] md:text-[4.5rem] tracking-[0.25em] uppercase text-[#FF5500] leading-none block">
          MR7
        </span>
        <motion.div
          className="h-[3px] bg-[#FF5500] mt-1"
          initial={{ width: "0px" }}
          animate={{ width: "60px" }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        />
      </motion.div>

      {/* Admin-uploaded hero media */}
      {heroMedia && heroMedia.type === "video" && (
        <motion.div
          className="absolute inset-0 z-[0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <video
            ref={videoRef}
            src={heroMedia.url}
            autoPlay
            muted
            loop
            playsInline
            onPlay={handlePlay}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay so text remains readable */}
          <div className="absolute inset-0 bg-black/55" />
        </motion.div>
      )}

      {/* Sound toggle — only when a video is active */}
      {heroMedia && heroMedia.type === "video" && (
        <motion.div
          className="fixed bottom-8 right-[70px] z-[45]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8, ease }}
        >
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 border border-white/20 hover:border-[#FF5500] hover:bg-black/70 text-white cursor-pointer transition-all duration-200"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
            <span className="font-body text-xs tracking-wide">
              {isMuted ? "Unmute" : "Mute"}
            </span>
          </button>
        </motion.div>
      )}

      {heroMedia && heroMedia.type === "image" && (
        <motion.div
          className="absolute bottom-0 left-[38%] z-[10] h-[90vh]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          <Image
            src={heroMedia.url}
            alt="Hero"
            width={700}
            height={1050}
            className="h-full w-auto object-contain object-bottom"
            priority
          />
        </motion.div>
      )}

      {/* Left dot indicators (z-[30]) */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-[30] flex flex-col gap-[10px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease }}
            className={
              i === 0
                ? "w-2 h-2 rounded-full bg-[#FF5500]"
                : "w-1.5 h-1.5 rounded-full bg-white/30"
            }
          />
        ))}
      </div>

      {/* Bottom-left subtitle (z-[30]) */}
      <div className="absolute bottom-[4%] left-14 z-[30]">
        <motion.p
          className="font-body font-normal text-sm text-white max-w-[260px] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
        >
          Chennai&apos;s premier unisex fitness destination — transform your body, elevate your life.
        </motion.p>
      </div>

    </section>
  );
}
