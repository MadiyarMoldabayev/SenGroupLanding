"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

const languages = [
  { code: "ru", name: "RU", fullName: "Русский" },
  { code: "kk", name: "KZ", fullName: "Қазақша" },
  { code: "en", name: "EN", fullName: "English" },
];

const navTranslations: { [key: string]: { [key: string]: string } } = {
  ru: {
    home: "Главная",
    values: "Ценности",
    ecosystem: "Экосистема",
    standards: "Стандарты",
    team: "Команда",
    contact: "Контакты",
    cta: "Связаться с нами",
  },
  kk: {
    home: "Басты бет",
    values: "Құндылықтар",
    ecosystem: "Экожүйе",
    standards: "Стандарттар",
    team: "Команда",
    contact: "Байланыс",
    cta: "Бізбен байланысу",
  },
  en: {
    home: "Home",
    values: "Values",
    ecosystem: "Ecosystem",
    standards: "Standards",
    team: "Team",
    contact: "Contact",
    cta: "Contact Us",
  },
};

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = navTranslations[locale] || navTranslations.ru;

  const navLinks = [
    { name: t.home, href: "#hero" },
    { name: t.values, href: "#values" },
    { name: t.ecosystem, href: "#ecosystem" },
    { name: t.standards, href: "#standards" },
    { name: t.team, href: "#team" },
    { name: t.contact, href: "#contact" },
  ];

  const currentLangData = languages.find((l) => l.code === locale);

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
        <Link href={`/${locale}/`} className="flex items-center group">
          <Image
            src="/logo.png"
            alt="SENGROUP"
            width={180}
            height={50}
            className="h-10 w-auto brightness-100 group-hover:brightness-110 transition-all duration-300"
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
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
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/10 transition-colors text-sm font-medium text-light"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {currentLangData?.name}
              <svg
                className={cn("w-3 h-3 transition-transform", langMenuOpen && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden min-w-[140px]"
              >
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}/`}
                    onClick={() => setLangMenuOpen(false)}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors flex items-center justify-between",
                      locale === lang.code ? "text-primary" : "text-light"
                    )}
                  >
                    <span>{lang.fullName}</span>
                    <span className="text-xs text-muted">{lang.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          <a href="#contact" className="btn-primary text-sm">
            {t.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Mobile Language Switcher */}
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="px-3 py-2 rounded-lg glass text-sm font-medium text-light"
          >
            {currentLangData?.name}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
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
        </div>
      </nav>

      {/* Mobile Language Menu */}
      {langMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute right-4 top-full mt-2 glass rounded-xl overflow-hidden min-w-[140px] z-50"
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}/`}
              onClick={() => setLangMenuOpen(false)}
              className={cn(
                "block w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors",
                locale === lang.code ? "text-primary" : "text-light"
              )}
            >
              <span>{lang.fullName}</span>
              <span className="text-xs text-muted ml-2">{lang.name}</span>
            </Link>
          ))}
        </motion.div>
      )}

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
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-light hover:text-primary transition-colors duration-300 text-lg font-medium py-2"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-center mt-4">
            {t.cta}
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
