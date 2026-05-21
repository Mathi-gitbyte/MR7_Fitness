"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export type HeroMedia = {
  id: string;
  url: string;
  type: "image" | "video";
  cloudinary_public_id: string;
} | null;

export default function HeroSection({ heroMedia }: { heroMedia: HeroMedia }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">

      {/* "FITNESS" — massive text (z-[1]) */}
      <motion.div
        className="absolute top-[53%] left-0 pl-12 z-[1] pointer-events-none select-none"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <span className="block font-body font-semibold text-2xl tracking-[0.3em] uppercase text-white mb-[-50px] ml-[60px] mt-[-40px]">
          UNISEX
        </span>
        <span className="font-display font-normal text-white tracking-[-0.01em] text-[clamp(36px,5vw,72px)] leading-none">
          FITNESS
        </span>

        {/* Buttons below FITNESS */}
        <div className="flex gap-4 mt-6 pl-2 pointer-events-auto">
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
        </div>
      </motion.div>

      {/* "MR7" label + orange underline (z-[20]) */}
      <motion.div
        className="absolute left-14 top-[60%] z-[20]"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0, ease }}
      >
        <span className="font-display font-semibold text-[4.5rem] tracking-[0.25em] uppercase text-[#FF5500] leading-none block">
          MR7
        </span>
        <motion.div
          className="h-[3px] bg-[#FF5500] mt-1"
          initial={{ width: "0px" }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        />
      </motion.div>

      {/* Admin-uploaded hero media (z-[10]) */}
      {heroMedia && (
        <motion.div
          className="absolute bottom-0 left-[38%] z-[10] h-[90vh]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          {heroMedia.type === "video" ? (
            <video
              src={heroMedia.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-auto object-contain object-bottom"
            />
          ) : (
            <Image
              src={heroMedia.url}
              alt="Hero"
              width={700}
              height={1050}
              className="h-full w-auto object-contain object-bottom"
              priority
            />
          )}
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
      <div className="absolute bottom-[8%] left-14 z-[30]">
        <motion.p
          className="font-body font-normal text-sm text-[#555555] max-w-[260px] leading-relaxed"
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
