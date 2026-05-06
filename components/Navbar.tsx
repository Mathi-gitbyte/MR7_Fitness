"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "HOME",        href: "#"            },
  { label: "ABOUT",       href: "#about"        },
  { label: "INSTRUCTORS", href: "#instructors"  },
  { label: "COURSES",     href: "#courses"      },
  { label: "PRICING",     href: "#pricing"      },
  { label: "GALLERY",     href: "#gallery"      },
  { label: "CONTACT",     href: "#contact"      },
];

const SOCIAL = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
];

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [showLogo, setShowLogo] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main navbar bar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      >
        {/* Logo — visible only in hero section */}
        <motion.a
          href="#"
          className="flex-shrink-0 group relative"
          animate={{ opacity: showLogo ? 1 : 0, scale: showLogo ? 1 : 0.8, pointerEvents: showLogo ? "auto" : "none" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            style={{ backgroundColor: "#FF5500", transform: "scale(0.7)" }}
          />
          <Image
            src="/Logo_orange.png"
            alt="MR7 Fitness"
            width={136}
            height={136}
            className="object-contain relative z-10 transition-all duration-500 group-hover:scale-105"
            style={{ mixBlendMode: "multiply", filter: "saturate(1.3) brightness(1.0) contrast(1.05)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter =
                "saturate(1.5) brightness(1.1) contrast(1.1) drop-shadow(0 2px 10px rgba(255,85,0,0.8)) drop-shadow(0 0 24px rgba(255,85,0,0.4))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "saturate(1.3) brightness(1.0) contrast(1.05)";
            }}
            priority
          />
        </motion.a>

        {/* Right group: nav links + hamburger */}
        <div className="flex items-start gap-8 -mt-6">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-6 [&>*+*]:ml-0 space-x-0">
                {NAV_LINKS.map((link, i) => (
                  <NavigationMenuItem key={link.label}>
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setActive(link.label)}
                        className="relative font-body font-semibold text-sm tracking-[0.12em] uppercase cursor-pointer p-0 pb-1 no-underline
                          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#FF5500]
                          after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
                        style={{ color: active === link.label ? "#FFFFFF" : "#888888" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = active === link.label ? "#FFFFFF" : "#888888"; }}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Hamburger button */}
          <Button
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-none bg-[#FF5500] hover:bg-[#FF5500] w-10 h-10 p-0 flex-shrink-0 -mt-1"
          >
            {menuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
          </Button>
        </div>
      </motion.nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
            className="fixed top-0 left-0 right-0 z-40 md:hidden flex flex-col pt-24 pb-8 px-8 gap-6"
            style={{ backgroundColor: "rgba(10,10,10,0.97)", borderBottom: "1px solid #222222" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease }}
                onClick={() => { setActive(link.label); setMenuOpen(false); }}
                className="font-body font-semibold text-base tracking-[0.15em] uppercase no-underline border-b pb-4"
                style={{
                  color: active === link.label ? "#FF5500" : "#888888",
                  borderColor: "#1a1a1a",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = active === link.label ? "#FF5500" : "#888888"; }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed social icons — right edge, vertically centered */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
        {SOCIAL.map(({ Icon, label }, i) => (
          <motion.a
            key={label}
            href="#"
            aria-label={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease }}
            className="text-white hover:opacity-100 transition-opacity"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>
    </>
  );
}
