"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const companiesData = {
  ru: {
    badge: "Интеграция — главный механизм эффективности SEN",
    title: "Экосистема",
    titleHighlight: "SEN",
    subtitle: "Каждая компания экосистемы SEN усиливает другую. Мы работаем по модели cross-functional collaboration",
    companies: [
      {
        name: "SENDIGITAL",
        description: "Цифровая трансформация и разработка технологических решений",
        link: "https://sendigital.one",
      },
      {
        name: "SENAUDIT",
        description: "Технологический аудит и проверка IT-инфраструктуры",
        link: "https://audit.sengroup.one",
      },
      {
        name: "SENFINANCE",
        description: "Финтех решения и финансовый консалтинг",
        link: null,
      },
      {
        name: "SENCONSULTING",
        description: "Стратегический консалтинг и управленческие решения",
        link: null,
      },
      {
        name: "SENGROUP",
        description: "Медиа и коммуникационные решения",
        link: null,
      },
      {
        name: "SEN FOUNDATION HUB",
        description: "Социальный эффект и прозрачность",
        link: "https://engohub.com",
      },
    ],
  },
  kk: {
    badge: "Интеграция — SEN тиімділігінің басты механизмі",
    title: "Экожүйе",
    titleHighlight: "SEN",
    subtitle: "SEN экожүйесінің әрбір компаниясы екіншісін күшейтеді. Біз cross-functional collaboration моделі бойынша жұмыс істейміз",
    companies: [
      {
        name: "SENDIGITAL",
        description: "Цифрлық трансформация және технологиялық шешімдерді әзірлеу",
        link: "https://sendigital.one",
      },
      {
        name: "SENAUDIT",
        description: "Технологиялық аудит және IT-инфрақұрылымды тексеру",
        link: "https://audit.sengroup.one",
      },
      {
        name: "SENFINANCE",
        description: "Финтех шешімдері және қаржылық консалтинг",
        link: null,
      },
      {
        name: "SENCONSULTING",
        description: "Стратегиялық консалтинг және басқару шешімдері",
        link: null,
      },
      {
        name: "SENGROUP",
        description: "Медиа және коммуникациялық шешімдер",
        link: null,
      },
      {
        name: "SEN FOUNDATION HUB",
        description: "Әлеуметтік әсер және ашықтық",
        link: "https://engohub.com",
      },
    ],
  },
  en: {
    badge: "Integration — the main mechanism of SEN efficiency",
    title: "Ecosystem",
    titleHighlight: "SEN",
    subtitle: "Each company in the SEN ecosystem strengthens the other. We work on a cross-functional collaboration model",
    companies: [
      {
        name: "SENDIGITAL",
        description: "Digital transformation and development of technological solutions",
        link: "https://sendigital.one",
      },
      {
        name: "SENAUDIT",
        description: "Technology audit and IT infrastructure verification",
        link: "https://audit.sengroup.one",
      },
      {
        name: "SENFINANCE",
        description: "Fintech solutions and financial consulting",
        link: null,
      },
      {
        name: "SENCONSULTING",
        description: "Strategic consulting and management solutions",
        link: null,
      },
      {
        name: "SENGROUP",
        description: "Media and communication solutions",
        link: null,
      },
      {
        name: "SEN FOUNDATION HUB",
        description: "Social impact and transparency",
        link: "https://engohub.com",
      },
    ],
  },
};

const colors = [
  "from-primary to-blue-400",
  "from-secondary to-purple-400",
  "from-accent to-emerald-400",
  "from-orange-500 to-amber-400",
  "from-pink-500 to-rose-400",
  "from-cyan-500 to-teal-400",
];

const icons = [
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>,
  <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>,
  <svg key="6" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>,
];

interface EcosystemSectionProps {
  locale: string;
}

export default function EcosystemSection({ locale }: EcosystemSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = companiesData[locale as keyof typeof companiesData] || companiesData.ru;

  return (
    <section id="ecosystem" className="py-24 md:py-32 relative" ref={ref}>
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {t.companies.map((company, index) => {
            const CardContent = (
              <>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} p-[1px] mb-4`}
                >
                  <div className="w-full h-full bg-dark rounded-xl flex items-center justify-center text-white">
                    {icons[index]}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  {company.link && (
                    <svg className="w-4 h-4 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>
                <p className="text-muted text-sm">{company.description}</p>
              </>
            );

            return company.link ? (
              <motion.a
                key={company.name}
                href={company.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass rounded-2xl p-6 card-hover cursor-pointer"
              >
                {CardContent}
              </motion.a>
            ) : (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass rounded-2xl p-6 card-hover"
              >
                {CardContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
