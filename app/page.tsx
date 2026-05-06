"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Menu } from "lucide-react";

const slideInFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeScale = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <div className="text-[#f97316] font-bold text-xl tracking-widest">
          MR7
        </div>
        <button className="bg-[#f97316] p-2 rounded-sm">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </nav>

      {/* Left Side Dot Indicators */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        <div className="w-2 h-2 rounded-full bg-[#f97316]" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen flex items-center">
        {/* Typography Layer - Behind Athlete */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 pointer-events-none">
          <motion.h1
            custom={0}
            variants={slideInFromLeft}
            initial="hidden"
            animate="visible"
            className="text-[#f97316] font-bold text-5xl md:text-7xl lg:text-8xl tracking-wider"
          >
            MR7
          </motion.h1>
          <motion.h2
            custom={0.2}
            variants={slideInFromLeft}
            initial="hidden"
            animate="visible"
            className="text-white font-light text-6xl md:text-8xl lg:text-9xl tracking-widest -mt-2"
          >
            FITNESS
          </motion.h2>
        </div>

        {/* Orange Glow Circle */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 z-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-[#f97316]/30 blur-3xl"
          />
        </div>

        {/* Orange Ring Outline */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 z-0">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-[#f97316]/40"
          />
        </div>

        {/* Athlete Image - Centered with z-index above typography */}
        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate="visible"
          className="absolute right-0 md:right-[10%] top-1/2 -translate-y-1/2 z-20 w-[80%] md:w-[60%] lg:w-[50%] h-[80vh]"
        >
          <Image
            src="/athlete.png"
            alt="Fitness Athlete"
            fill
            className="object-contain object-center grayscale"
            priority
          />
        </motion.div>

        {/* Bottom Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-12 left-8 md:left-16 lg:left-24 z-30 max-w-md"
        >
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
          </p>
          <button className="group flex items-center gap-2 text-white text-sm font-medium tracking-widest hover:text-[#f97316] transition-colors">
            EXPLORE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </main>
  );
}
