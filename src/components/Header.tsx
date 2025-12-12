"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Главная", href: "#hero" },
    { name: "Ценности", href: "#values" },
    { name: "Экосистема", href: "#ecosystem" },
    { name: "Стандарты", href: "#standards" },
    { name: "Контакты", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
            <div className="absolute inset-0.5 bg-dark rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-bold gradient-text">S</span>
            </div>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">
            SEN<span className="text-muted font-normal ml-1">Group</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-muted hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#contact" className="btn-primary text-sm">
            Связаться с нами
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
          aria-label="Menu"
        >
          <span
            className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300",
              menuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300",
              menuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden glass mt-2 mx-4 rounded-2xl"
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-light hover:text-primary transition-colors duration-300 text-lg font-medium py-2"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-center mt-4">
            Связаться с нами
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}

