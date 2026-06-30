"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Built in Public", href: "#built-in-public" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4F8CFF]" />
            Dexter
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#alpha"
              className="text-sm px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300"
            >
              Join Alpha
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={menuOpen ? "M18 6L6 18M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-20 px-6"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium text-white/80"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#alpha"
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-lg px-6 py-3 rounded-lg bg-white text-black font-medium text-center"
              >
                Join Alpha
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
