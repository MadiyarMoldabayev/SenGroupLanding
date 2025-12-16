"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const footerTranslations = {
  ru: {
    description: "Экосистема доверия и управления будущего. Мы создаём технологии и сервисы, которые укрепляют доверие — внутри организаций, между командами, партнёрами и обществом.",
    tags: ["Технологии", "Финтех", "Консалтинг"],
    navigation: "Навигация",
    ecosystem: "Экосистема",
    formula: {
      honesty: "Честность",
      technology: "Технологии",
      data: "Данные",
      people: "Люди",
      innovation: "Инновации",
      responsibility: "Ответственность",
      result: "Экосистема доверия будущего",
    },
    copyright: "Все права защищены.",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    companies: ["SENDIGITAL", "SENAUDIT", "SENFINANCE", "SENCONSULTING", "SENGROUP", "SEN FOUNDATION HUB"],
    navLinks: [
      { name: "Главная", href: "#hero" },
      { name: "Ценности", href: "#values" },
      { name: "Экосистема", href: "#ecosystem" },
      { name: "Стандарты", href: "#standards" },
      { name: "Контакты", href: "#contact" },
    ],
  },
  kk: {
    description: "Болашақ сенім және басқару экожүйесі. Біз ұйымдар ішінде, командалар, серіктестер және қоғам арасында сенімді нығайтатын технологиялар мен қызметтерді құрамыз.",
    tags: ["Технологиялар", "Финтех", "Консалтинг"],
    navigation: "Навигация",
    ecosystem: "Экожүйе",
    formula: {
      honesty: "Адалдық",
      technology: "Технологиялар",
      data: "Деректер",
      people: "Адамдар",
      innovation: "Инновациялар",
      responsibility: "Жауапкершілік",
      result: "Болашақ сенім экожүйесі",
    },
    copyright: "Барлық құқықтар қорғалған.",
    privacy: "Құпиялылық саясаты",
    terms: "Пайдалану шарттары",
    companies: ["SENDIGITAL", "SENAUDIT", "SENFINANCE", "SENCONSULTING", "SENGROUP", "SEN FOUNDATION HUB"],
    navLinks: [
      { name: "Басты бет", href: "#hero" },
      { name: "Құндылықтар", href: "#values" },
      { name: "Экожүйе", href: "#ecosystem" },
      { name: "Стандарттар", href: "#standards" },
      { name: "Байланыс", href: "#contact" },
    ],
  },
  en: {
    description: "Ecosystem of trust and management for the future. We create technologies and services that strengthen trust — within organizations, between teams, partners, and society.",
    tags: ["Technology", "Fintech", "Consulting"],
    navigation: "Navigation",
    ecosystem: "Ecosystem",
    formula: {
      honesty: "Honesty",
      technology: "Technology",
      data: "Data",
      people: "People",
      innovation: "Innovation",
      responsibility: "Responsibility",
      result: "Ecosystem of Trust for the Future",
    },
    copyright: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    companies: ["SENDIGITAL", "SENAUDIT", "SENFINANCE", "SENCONSULTING", "SENGROUP", "SEN FOUNDATION HUB"],
    navLinks: [
      { name: "Home", href: "#hero" },
      { name: "Values", href: "#values" },
      { name: "Ecosystem", href: "#ecosystem" },
      { name: "Standards", href: "#standards" },
      { name: "Contact", href: "#contact" },
    ],
  },
};

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = footerTranslations[locale as keyof typeof footerTranslations] || footerTranslations.ru;

  return (
    <footer className="relative py-16 md:py-24 border-t border-border/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center mb-6 group">
              <Image
                src="/logo.png"
                alt="SENGROUP"
                width={200}
                height={55}
                className="h-12 w-auto brightness-100 group-hover:brightness-110 transition-all duration-300"
              />
            </a>
            <p className="text-muted max-w-md mb-6 leading-relaxed">
              {t.description}
            </p>
            <div className="flex items-center gap-3 text-sm">
              {t.tags.map((tag, index) => (
                <span key={index} className={`px-3 py-1.5 glass rounded-full ${
                  index === 0 ? "text-accent" : index === 1 ? "text-primary" : "text-secondary"
                }`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">{t.navigation}</h4>
            <ul className="space-y-3">
              {t.navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white font-semibold mb-6">{t.ecosystem}</h4>
            <ul className="space-y-3">
              {t.companies.map((company) => (
                <li key={company}>
                  <a
                    href="#ecosystem"
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {company}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formula */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 border-y border-border/30 mb-8"
        >
          <p className="text-sm md:text-base text-muted">
            <span className="text-primary">{t.formula.honesty}</span> +{" "}
            <span className="text-secondary">{t.formula.technology}</span> +{" "}
            <span className="text-accent">{t.formula.data}</span> +{" "}
            <span className="text-orange-400">{t.formula.people}</span> +{" "}
            <span className="text-pink-400">{t.formula.innovation}</span> +{" "}
            <span className="text-cyan-400">{t.formula.responsibility}</span> ={" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-medium">
              {t.formula.result}
            </span>
          </p>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {currentYear} SENGROUP. {t.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted hover:text-white transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="text-sm text-muted hover:text-white transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
