"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/story", label: "STORY" },
  { href: "/member", label: "MEMBER" },
  { href: "/music", label: "MUSIC" },
  { href: "/movie", label: "MOVIE" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/news", label: "NEWS" },
  { href: "/goods", label: "GOODS" },
  { href: "/about", label: "ABOUT" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[var(--ht-border)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="relative z-50">
            <span className={`font-heading text-xl md:text-2xl font-bold tracking-widest transition-colors ${
              scrolled ? "text-[var(--ht-text)] hover:text-[var(--ht-pink)]" : "text-[var(--ht-ivory)] hover:text-[var(--ht-pink)]"
            }`}>
              HoneyTrap
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-xs tracking-[0.2em] transition-colors hover:text-[var(--ht-pink)] ${
                  scrolled ? "text-[var(--ht-text)]/60" : "text-[var(--ht-ivory)]/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="メニュー"
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[4.5px] bg-[var(--ht-ivory)]" : scrolled ? "bg-[var(--ht-text)]" : "bg-[var(--ht-ivory)]"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                menuOpen ? "opacity-0 bg-[var(--ht-ivory)]" : scrolled ? "bg-[var(--ht-text)]" : "bg-[var(--ht-ivory)]"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[4.5px] bg-[var(--ht-ivory)]" : scrolled ? "bg-[var(--ht-text)]" : "bg-[var(--ht-ivory)]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading text-2xl tracking-[0.3em] text-[var(--ht-ivory)] hover:text-[var(--ht-pink)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 mt-8"
              >
                <a href="#" className="text-[var(--ht-ivory)]/50 hover:text-[var(--ht-teal)] text-sm tracking-wider transition-colors">YouTube</a>
                <a href="#" className="text-[var(--ht-ivory)]/50 hover:text-[var(--ht-teal)] text-sm tracking-wider transition-colors">Spotify</a>
                <a href="#" className="text-[var(--ht-ivory)]/50 hover:text-[var(--ht-teal)] text-sm tracking-wider transition-colors">X</a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
