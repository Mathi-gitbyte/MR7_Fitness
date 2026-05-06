"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">

      {/* "FITNESS" — massive text, behind athlete (z-[1]) */}
      <motion.div
        className="absolute top-[38%] left-0 pl-12 z-[1] pointer-events-none select-none"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <span className="font-display font-black text-white tracking-[-0.01em] text-[clamp(120px,18vw,260px)] leading-none">
          FITNESS
        </span>
      </motion.div>

      {/* "MR7" label + orange underline (z-[20]) */}
      <motion.div
        className="absolute left-14 top-[33%] z-[20]"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0, ease }}
      >
        <span className="font-display font-black text-[4.5rem] tracking-[0.05em] uppercase text-[#FF5500] leading-none block">
          MR7
        </span>
        <motion.div
          className="h-[3px] bg-[#FF5500] mt-1"
          initial={{ width: "0px" }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        />
      </motion.div>

      {/* Orange ring circle (z-[2]) — entrance then infinite pulse */}
      <motion.div
        className="absolute right-[-5%] top-[30%] z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      >
        <motion.div
          className="w-[500px] h-[500px] rounded-full border-2 border-[#FF5500]/40 bg-[radial-gradient(circle,rgba(180,60,10,0.3),transparent_70%)]"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Athlete image — overlaps FITNESS text (z-[10]) */}
      <motion.div
        className="absolute bottom-0 left-[38%] z-[10] h-[90vh]"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
      >
        <Image
          src="/athlete.png"
          alt="Fitness Athlete"
          width={700}
          height={1050}
          className="h-full w-auto object-contain object-bottom grayscale"
          priority
        />
      </motion.div>

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

      {/* Bottom-left content: subtitle + Explore button (z-[30]) */}
      <div className="absolute bottom-[8%] left-14 z-[30]">
        <motion.p
          className="font-body font-normal text-sm text-[#555555] max-w-[260px] leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease }}
        >
          <motion.button
            whileHover="hover"
            className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-white flex items-center gap-2 bg-transparent border-none cursor-pointer hover:text-[#FF5500] transition-colors p-0"
          >
            EXPLORE
            <motion.span
              aria-hidden="true"
              variants={{ hover: { x: 4 } }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ChevronRight size={16} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
