"use client";

import { motion } from "framer-motion";

const heroTranslations = {
  ru: {
    badge: "Экосистема технологий и доверия",
    title1: "Ценности и стандарты",
    title2: "SEN Group",
    description: "Мы создаём технологии и сервисы, которые укрепляют доверие — внутри организаций, между командами, партнёрами и обществом.",
    cta1: "Узнать больше",
    cta2: "Наша экосистема",
  },
  kk: {
    badge: "Технология және сенім экожүйесі",
    title1: "Құндылықтар мен стандарттар",
    title2: "SEN Group",
    description: "Біз ұйымдар ішінде, командалар, серіктестер және қоғам арасында сенімді нығайтатын технологиялар мен қызметтерді құрамыз.",
    cta1: "Көбірек білу",
    cta2: "Біздің экожүйе",
  },
  en: {
    badge: "Ecosystem of Technology and Trust",
    title1: "Values and Standards",
    title2: "SEN Group",
    description: "We create technologies and services that strengthen trust — within organizations, between teams, partners, and society.",
    cta1: "Learn More",
    cta2: "Our Ecosystem",
  },
};

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = heroTranslations[locale as keyof typeof heroTranslations] || heroTranslations.ru;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[30%] w-64 h-64 bg-accent/15 rounded-full blur-[80px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 xl:px-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            {t.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8"
        >
          <span className="text-white">{t.title1}</span>
          <br />
          <span className="gradient-text">{t.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-muted max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#values" className="btn-primary text-base">
            {t.cta1}
          </a>
          <a href="#ecosystem" className="btn-secondary text-base">
            {t.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
