"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const engoHubData = {
  ru: {
    badge: "AI-Powered • Многомодульная платформа",
    title: "ENGOHUB",
    titleHighlight: "— умная экосистема для НПО",
    subtitle: "Технологичная платформа нового поколения с искусственным интеллектом для развития гражданского сектора",
    description: "ENGOHUB — это многомодульная цифровая платформа, объединяющая AI-технологии, автоматизацию и экспертизу для комплексной поддержки НПО. Каждый модуль — это самостоятельный инструмент, который интегрируется в единую экосистему.",
    techBadges: ["AI-Powered", "Многомодульная", "Cloud-Native", "Автоматизация"],
    features: [
      {
        title: "AI-Консалтинг",
        description: "Интеллектуальные рекомендации по финансам и стратегии на основе анализа данных и машинного обучения",
        icon: "briefcase",
      },
      {
        title: "Образовательный модуль",
        description: "Адаптивное обучение с персонализированными треками и AI-ассистентом для команд НПО",
        icon: "education",
      },
      {
        title: "Менторство 2.0",
        description: "Умный матчинг менторов и НПО, трекинг прогресса и автоматизированная система сопровождения",
        icon: "mentor",
      },
      {
        title: "Legal Tech модуль",
        description: "Автоматизированная проверка комплаенса, генерация документов и мониторинг изменений в законодательстве",
        icon: "legal",
      },
      {
        title: "Цифровой хаб",
        description: "Интеграция IT-решений, автоматизация процессов, дашборды аналитики и облачная инфраструктура",
        icon: "digital",
      },
      {
        title: "Грантовый модуль",
        description: "AI-поиск грантов, автозаполнение заявок, мониторинг дедлайнов и управление проектами",
        icon: "global",
      },
    ],
    audiences: [
      {
        title: "Благополучатели",
        description: "Персонализированный доступ к программам развития через умную систему рекомендаций и сопровождения.",
      },
      {
        title: "НПО",
        description: "Полный набор цифровых инструментов: от CRM и финансов до AI-ассистента и автоматизации отчётности.",
      },
      {
        title: "Доноры",
        description: "Прозрачная аналитика, real-time мониторинг проектов и измеримые метрики социального воздействия.",
      },
    ],
    cta: "Перейти на ENGOHUB",
  },
  kk: {
    badge: "AI-Powered • Көпмодульді платформа",
    title: "ENGOHUB",
    titleHighlight: "— ҮЕҰ үшін ақылды экожүйе",
    subtitle: "Азаматтық секторды дамытуға арналған жасанды интеллекті жаңа буын технологиялық платформа",
    description: "ENGOHUB — бұл ҮЕҰ-ларды кешенді қолдау үшін AI-технологияларды, автоматтандыруды және сараптаманы біріктіретін көпмодульді цифрлық платформа. Әрбір модуль — бірыңғай экожүйеге интеграцияланатын дербес құрал.",
    techBadges: ["AI-Powered", "Көпмодульді", "Cloud-Native", "Автоматтандыру"],
    features: [
      {
        title: "AI-Консалтинг",
        description: "Деректерді талдау және машиналық оқыту негізінде қаржы мен стратегия бойынша интеллектуалды ұсыныстар",
        icon: "briefcase",
      },
      {
        title: "Білім беру модулі",
        description: "ҮЕҰ командалары үшін жекелендірілген трек және AI-көмекшісі бар адаптивті оқыту",
        icon: "education",
      },
      {
        title: "Менторлық 2.0",
        description: "Менторлар мен ҮЕҰ-ларды ақылды сәйкестендіру, прогресті бақылау және автоматтандырылған сүйемелдеу жүйесі",
        icon: "mentor",
      },
      {
        title: "Legal Tech модулі",
        description: "Комплаенсті автоматтандырылған тексеру, құжаттар генерациясы және заңнамадағы өзгерістерді мониторинг",
        icon: "legal",
      },
      {
        title: "Цифрлық хаб",
        description: "IT-шешімдерді интеграциялау, процестерді автоматтандыру, аналитика дашбордтары және бұлттық инфрақұрылым",
        icon: "digital",
      },
      {
        title: "Гранттық модуль",
        description: "Гранттарды AI-іздеу, өтінімдерді автотолтыру, дедлайндарды мониторинг және жобаларды басқару",
        icon: "global",
      },
    ],
    audiences: [
      {
        title: "Пайда алушылар",
        description: "Ақылды ұсыныстар және сүйемелдеу жүйесі арқылы даму бағдарламаларына жекелендірілген қол жеткізу.",
      },
      {
        title: "ҮЕҰ",
        description: "Цифрлық құралдардың толық жиынтығы: CRM мен қаржыдан AI-көмекшіге және есептілікті автоматтандыруға дейін.",
      },
      {
        title: "Донорлар",
        description: "Ашық аналитика, жобаларды real-time мониторингі және әлеуметтік әсердің өлшенетін метрикалары.",
      },
    ],
    cta: "ENGOHUB-қа өту",
  },
  en: {
    badge: "AI-Powered • Multi-Module Platform",
    title: "ENGOHUB",
    titleHighlight: "— Smart Ecosystem for NGOs",
    subtitle: "Next-generation technology platform with artificial intelligence for civil sector development",
    description: "ENGOHUB is a multi-module digital platform that combines AI technologies, automation, and expertise for comprehensive NGO support. Each module is a standalone tool that integrates into a unified ecosystem.",
    techBadges: ["AI-Powered", "Multi-Module", "Cloud-Native", "Automation"],
    features: [
      {
        title: "AI Consulting",
        description: "Intelligent recommendations on finance and strategy based on data analysis and machine learning",
        icon: "briefcase",
      },
      {
        title: "Education Module",
        description: "Adaptive learning with personalized tracks and AI assistant for NGO teams",
        icon: "education",
      },
      {
        title: "Mentorship 2.0",
        description: "Smart matching of mentors and NGOs, progress tracking, and automated support system",
        icon: "mentor",
      },
      {
        title: "Legal Tech Module",
        description: "Automated compliance checking, document generation, and legislation change monitoring",
        icon: "legal",
      },
      {
        title: "Digital Hub",
        description: "IT solution integration, process automation, analytics dashboards, and cloud infrastructure",
        icon: "digital",
      },
      {
        title: "Grant Module",
        description: "AI grant search, auto-fill applications, deadline monitoring, and project management",
        icon: "global",
      },
    ],
    audiences: [
      {
        title: "Beneficiaries",
        description: "Personalized access to development programs through smart recommendation and support system.",
      },
      {
        title: "NGOs",
        description: "Complete set of digital tools: from CRM and finance to AI assistant and reporting automation.",
      },
      {
        title: "Donors",
        description: "Transparent analytics, real-time project monitoring, and measurable social impact metrics.",
      },
    ],
    cta: "Go to ENGOHUB",
  },
};

const featureIcons: { [key: string]: JSX.Element } = {
  briefcase: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  education: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  mentor: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  legal: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  digital: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  global: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const gradientColors = [
  "from-primary to-blue-400",
  "from-secondary to-purple-400",
  "from-accent to-emerald-400",
  "from-orange-500 to-amber-400",
  "from-pink-500 to-rose-400",
  "from-cyan-500 to-teal-400",
];

interface EngoHubSectionProps {
  locale: string;
}

export default function EngoHubSection({ locale }: EngoHubSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = engoHubData[locale as keyof typeof engoHubData] || engoHubData.ru;

  return (
    <section id="engohub" className="py-24 md:py-32 relative bg-dark/50" ref={ref}>
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-secondary/10 via-accent/10 to-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            <span className="gradient-text">{t.title}</span>
            {t.titleHighlight}
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto mb-4">
            {t.subtitle}
          </p>
          
          {/* Tech Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {t.techBadges.map((badge, index) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium"
              >
                {badge === "AI-Powered" && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
                {(badge === "Многомодульная" || badge === "Көпмодульді" || badge === "Multi-Module") && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                )}
                {badge === "Cloud-Native" && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                )}
                {(badge === "Автоматизация" || badge === "Автоматтандыру" || badge === "Automation") && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {badge}
              </motion.span>
            ))}
          </div>
          
          <p className="text-muted/80 text-base md:text-lg max-w-4xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16"
        >
          {t.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group glass rounded-2xl p-6 card-hover"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[index]} p-[1px] mb-4`}
              >
                <div className="w-full h-full bg-dark rounded-xl flex items-center justify-center text-white">
                  {featureIcons[feature.icon]}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Audiences */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {t.audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="relative overflow-hidden rounded-2xl p-6 md:p-8 glass border border-primary/20 group card-hover"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientColors[index]}`} />
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {audience.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{audience.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://engohub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            {t.cta}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

