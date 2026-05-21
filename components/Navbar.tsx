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
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "HOME",        href: "/"                    },
  { label: "ABOUT",       href: "/#about"              },
  { label: "INSTRUCTORS", href: "/#instructors"        },
  { label: "PROGRAMS",    href: "/#programs"           },
  { label: "PRICING",     href: "/#pricing"            },
  { label: "GALLERY",     href: "/#gallery"            },
  { label: "CAL CALC",    href: "/calculator"          },
  { label: "CONTACT",     href: "/#contact"            },
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
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowLogo(currentY < window.innerHeight * 0.85);
      setNavVisible(currentY < lastScrollY.current || currentY < 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main navbar bar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      >
        {/* Logo — visible only in hero section */}
        <motion.a
          href="#"
          className="flex-shrink-0 group relative"
          animate={{ opacity: showLogo ? 1 : 0, scale: showLogo ? 1 : 0.8, pointerEvents: showLogo ? "auto" : "none" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src="/MR7-LOGO-SVG.svg"
            alt="MR7 Fitness"
            width={80}
            height={80}
            className="object-contain relative z-10"
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
                        className={cn(
                          "relative font-body font-semibold text-sm tracking-[0.12em] uppercase cursor-pointer p-0 pb-1 no-underline transition-colors duration-200",
                          "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#FF5500]",
                          "after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out",
                          "hover:text-white",
                          active === link.label ? "text-white" : "text-[#888888]"
                        )}
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
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-none bg-[#FF5500] hover:bg-[#FF5500] w-10 h-10 p-0 flex-shrink-0 -mt-1"
          >
            <Menu size={18} className="text-black" />
          </Button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay — z-[60] covers the entire navbar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-[60] flex flex-col px-8"
            style={{ backgroundColor: "rgba(10,10,10,0.98)" }}
          >
            {/* Close button row — mirrors navbar hamburger position */}
            <div className="flex justify-end pt-5 pb-8">
              <Button
                size="icon"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="rounded-none bg-[#FF5500] hover:bg-[#FF5500] w-10 h-10 p-0 flex-shrink-0"
              >
                <X size={18} className="text-black" />
              </Button>
            </div>

            {/* Nav links */}
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease }}
                onClick={() => { setActive(link.label); setMenuOpen(false); }}
                className={cn(
                  "font-body font-semibold text-base tracking-[0.15em] uppercase no-underline border-b border-[#1a1a1a] pb-4 transition-colors duration-200 hover:text-white",
                  active === link.label ? "text-[#FF5500]" : "text-[#888888]"
                )}
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
