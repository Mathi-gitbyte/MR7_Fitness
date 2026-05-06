"use client";

import { motion } from "framer-motion";
import { Menu, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

const NAV_LINKS = [
  "HOME",
  "ABOUT",
  "INSTRUCTORS",
  "COURSES",
  "PRICING",
  "GALLERY",
  "BLOG",
  "CONTACT",
];

const SOCIAL = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
];

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Navbar() {
  const [active, setActive] = useState("HOME");

  return (
    <>
      {/* Main navbar bar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      >
        {/* Logo */}
        <span className="font-display font-black text-[1.4rem] tracking-[0.15em] uppercase text-[#FF5500] leading-none">
          MR7
        </span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8 [&>*+*]:ml-0 space-x-0">
              {NAV_LINKS.map((link, i) => (
                <NavigationMenuItem key={link}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.05,
                      ease,
                    }}
                  >
                    <button
                      onClick={() => setActive(link)}
                      className="font-body font-semibold text-xs tracking-[0.12em] uppercase text-white hover:text-[#FF5500] transition-colors bg-transparent border-none outline-none cursor-pointer p-0"
                    >
                      {link}
                    </button>
                    {active === link && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500]"
                        transition={{ duration: 0.2, ease }}
                      />
                    )}
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Hamburger button */}
        <Button
          size="icon"
          className="rounded-none bg-[#FF5500] hover:bg-[#FF5500] w-10 h-10 p-0 flex-shrink-0"
        >
          <Menu size={18} className="text-white" />
        </Button>
      </motion.nav>

      {/* Fixed social icons — right edge, vertically centered */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
        {SOCIAL.map(({ Icon, label }, i) => (
          <motion.button
            key={label}
            aria-label={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease }}
            className="text-white hover:opacity-100 transition-opacity"
          >
            <Icon size={18} />
          </motion.button>
        ))}
      </div>
    </>
  );
}
