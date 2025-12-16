"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const standardsData = {
  ru: {
    badge: "Правила работы, принятия решений и качества",
    title: "Корпоративные стандарты",
    titleHighlight: "SEN",
    subtitle: "Наши стандарты обеспечивают высочайшее качество в каждом проекте и взаимодействии",
    standards: [
      {
        id: 1,
        title: "Прозрачность процессов и решений",
        description: "Каждый проект SEN должен иметь:",
        points: [
          "Открытые критерии качества",
          "Понятные процессы",
          "Документированные результаты",
          "Измеримые показатели эффективности",
        ],
        note: "Это ключевой стандарт, который укрепляет доверие клиентов и партнёров.",
      },
      {
        id: 2,
        title: "Удовлетворённость клиента и измеримый эффект",
        description: "Мы ориентируемся не на выполнение задачи, а на конечный результат клиента.",
        points: [
          "Экономия ресурсов",
          "Оптимизация процессов",
          "Сокращение рисков",
          "Улучшение показателей",
        ],
        note: "В каждом проекте должен быть зафиксирован измеримый эффект.",
      },
      {
        id: 3,
        title: "Управление качеством в каждом направлении",
        description: "Все компании экосистемы SEN — SenDigital, SenAudit, SenFinance и др. — работают по принципам:",
        points: [
          "Многоуровневого контроля качества",
          "Проверяемости решений",
          "Регулярных внутренних аудитов",
          "Стандартизации практик и подходов",
        ],
        note: "",
      },
      {
        id: 4,
        title: "Безопасность данных и информационная этика",
        description: "Любой продукт или проект SEN обязателен к соответствию:",
        points: [
          "Требованиям информационной безопасности",
          "Принципам конфиденциальности",
          "Стандартам ответственного использования данных и ИИ",
        ],
        note: "Мы защищаем информацию так же, как финансовые и технологические компании мирового уровня.",
      },
      {
        id: 5,
        title: "Скорость с качеством",
        description: "Мы работаем быстро, но никогда не в ущерб качеству.",
        points: [
          "Обязательная проверка на устойчивость",
          "Проверка на точность",
          "Проверка на ценность",
        ],
        note: "Наши технологии и решения проходят обязательную проверку.",
      },
      {
        id: 6,
        title: "Профессиональная коммуникация",
        description: "Внутри команды и с клиентами мы соблюдаем стандарты:",
        points: [
          "Ясности",
          "Фактологичности",
          "Уважения",
          "Ответственности за слово",
          "Документирования ключевых договорённостей",
        ],
        note: "",
      },
      {
        id: 7,
        title: "Совместное создание решений",
        description: "Каждая компания экосистемы SEN усиливает другую.",
        points: [
          "Digital усиливает Consulting",
          "Finance усиливает Audit",
          "Media усиливает технологические решения",
          "FoundationHub создаёт социальный эффект и прозрачность",
        ],
        note: "Интеграция — главный механизм эффективности SEN.",
      },
      {
        id: 8,
        title: "Постоянное развитие и обучение",
        description: "Каждый сотрудник SEN обязан:",
        points: [
          "Обучаться в области технологий, управления, данных, финтеха",
          "Проходить внутренние образовательные программы",
          "Участвовать в обмене опытом внутри экосистемы",
        ],
        note: "Только развиваясь, мы сохраняем лидерство.",
      },
    ],
  },
  kk: {
    badge: "Жұмыс ережелері, шешім қабылдау және сапа",
    title: "Корпоративтік стандарттар",
    titleHighlight: "SEN",
    subtitle: "Біздің стандарттарымыз әрбір жобада және өзара әрекеттесудің ең жоғары сапасын қамтамасыз етеді",
    standards: [
      {
        id: 1,
        title: "Процестер мен шешімдердің ашықтығы",
        description: "SEN-нің әрбір жобасында болуы керек:",
        points: [
          "Ашық сапа критерийлері",
          "Түсінікті процестер",
          "Құжатталған нәтижелер",
          "Төмендегі тиімділік көрсеткіштері",
        ],
        note: "Бұл клиенттер мен серіктестердің сенімін нығайтатын негізгі стандарт.",
      },
      {
        id: 2,
        title: "Клиенттің қанағаттануы және өлшенетін әсер",
        description: "Біз тапсырманы орындауға емес, клиенттің соңғы нәтижесіне бағытталғанбыз.",
        points: [
          "Ресурстарды үнемдеу",
          "Процестерді оңтайландыру",
          "Тәуекелдерді азайту",
          "Көрсеткіштерді жақсарту",
        ],
        note: "Әрбір жобада өлшенетін әсер бекітілуі керек.",
      },
      {
        id: 3,
        title: "Әр бағытта сапаны басқару",
        description: "SEN экожүйесінің барлық компаниялары — SenDigital, SenAudit, SenFinance және т.б. — мына принциптер бойынша жұмыс істейді:",
        points: [
          "Көп деңгейлі сапа бақылауы",
          "Шешімдердің тексерілуі",
          "Тұрақты ішкі аудиттер",
          "Тәжірибелер мен тәсілдерді стандарттау",
        ],
        note: "",
      },
      {
        id: 4,
        title: "Деректер қауіпсіздігі және ақпараттық этика",
        description: "SEN-нің кез келген өнімі немесе жобасы мынаған сәйкес болуы керек:",
        points: [
          "Ақпараттық қауіпсіздік талаптары",
          "Құпиялылық принциптері",
          "Деректер мен AI-ды жауапты пайдалану стандарттары",
        ],
        note: "Біз ақпаратты дүниежүзілік деңгейдегі қаржылық және технологиялық компаниялар сияқты қорғаймыз.",
      },
      {
        id: 5,
        title: "Жылдамдық сапамен",
        description: "Біз жылдам жұмыс істейміз, бірақ ешқашан сапаға зиян келтірмейміз.",
        points: [
          "Тұрақтылық бойынша міндетті тексеру",
          "Дәлдік бойынша тексеру",
          "Құндылық бойынша тексеру",
        ],
        note: "Біздің технологиялар мен шешімдер міндетті тексеруден өтеді.",
      },
      {
        id: 6,
        title: "Кәсіби коммуникация",
        description: "Команда ішінде және клиенттермен біз мына стандарттарды сақтаймыз:",
        points: [
          "Анықтық",
          "Фактілік",
          "Құрмет",
          "Сөзге жауапкершілік",
          "Негізгі келісімдерді құжаттау",
        ],
        note: "",
      },
      {
        id: 7,
        title: "Шешімдерді бірге құру",
        description: "SEN экожүйесінің әрбір компаниясы екіншісін күшейтеді.",
        points: [
          "Digital Consulting-ті күшейтеді",
          "Finance Audit-ты күшейтеді",
          "Media технологиялық шешімдерді күшейтеді",
          "FoundationHub әлеуметтік әсер мен ашықтықты құрайды",
        ],
        note: "Интеграция — SEN тиімділігінің басты механизмі.",
      },
      {
        id: 8,
        title: "Тұрақты даму және оқу",
        description: "SEN-нің әрбір қызметкері міндетті:",
        points: [
          "Технологиялар, басқару, деректер, финтех саласында оқу",
          "Ішкі білім беру бағдарламаларынан өту",
          "Экожүйе ішінде тәжірибе алмасуға қатысу",
        ],
        note: "Тек дамып отырып, біз лидерлікті сақтаймыз.",
      },
    ],
  },
  en: {
    badge: "Rules of work, decision-making, and quality",
    title: "Corporate Standards",
    titleHighlight: "SEN",
    subtitle: "Our standards ensure the highest quality in every project and interaction",
    standards: [
      {
        id: 1,
        title: "Transparency of Processes and Decisions",
        description: "Every SEN project must have:",
        points: [
          "Open quality criteria",
          "Clear processes",
          "Documented results",
          "Measurable performance indicators",
        ],
        note: "This is a key standard that strengthens trust of clients and partners.",
      },
      {
        id: 2,
        title: "Client Satisfaction and Measurable Impact",
        description: "We focus not on task completion, but on the client's end result.",
        points: [
          "Resource savings",
          "Process optimization",
          "Risk reduction",
          "Performance improvement",
        ],
        note: "Every project must have a measurable impact recorded.",
      },
      {
        id: 3,
        title: "Quality Management in Every Direction",
        description: "All companies in the SEN ecosystem — SenDigital, SenAudit, SenFinance, etc. — operate on principles of:",
        points: [
          "Multi-level quality control",
          "Solution verifiability",
          "Regular internal audits",
          "Standardization of practices and approaches",
        ],
        note: "",
      },
      {
        id: 4,
        title: "Data Security and Information Ethics",
        description: "Any SEN product or project must comply with:",
        points: [
          "Information security requirements",
          "Confidentiality principles",
          "Standards for responsible use of data and AI",
        ],
        note: "We protect information the same way as world-class financial and technology companies.",
      },
      {
        id: 5,
        title: "Speed with Quality",
        description: "We work quickly, but never at the expense of quality.",
        points: [
          "Mandatory sustainability check",
          "Accuracy check",
          "Value check",
        ],
        note: "Our technologies and solutions undergo mandatory verification.",
      },
      {
        id: 6,
        title: "Professional Communication",
        description: "Within the team and with clients, we adhere to standards of:",
        points: [
          "Clarity",
          "Factual accuracy",
          "Respect",
          "Accountability for words",
          "Documentation of key agreements",
        ],
        note: "",
      },
      {
        id: 7,
        title: "Collaborative Solution Creation",
        description: "Each company in the SEN ecosystem strengthens the other.",
        points: [
          "Digital strengthens Consulting",
          "Finance strengthens Audit",
          "Media strengthens technological solutions",
          "FoundationHub creates social impact and transparency",
        ],
        note: "Integration is the main mechanism of SEN efficiency.",
      },
      {
        id: 8,
        title: "Continuous Development and Learning",
        description: "Every SEN employee must:",
        points: [
          "Learn in technology, management, data, fintech",
          "Complete internal educational programs",
          "Participate in knowledge exchange within the ecosystem",
        ],
        note: "Only by developing do we maintain leadership.",
      },
    ],
  },
};

const icons = [
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>,
  <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="6" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  <svg key="7" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg key="8" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>,
];

interface StandardsSectionProps {
  locale: string;
}

export default function StandardsSection({ locale }: StandardsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const t = standardsData[locale as keyof typeof standardsData] || standardsData.ru;

  return (
    <section id="standards" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-secondary mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            {t.title}{" "}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {t.standards.map((standard, index) => (
            <motion.div
              key={standard.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                expandedId === standard.id ? "ring-1 ring-primary/50" : ""
              }`}
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === standard.id ? null : standard.id)
                }
                className="w-full p-6 text-left flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0">
                  {icons[index]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {standard.title}
                    </h3>
                    <motion.svg
                      animate={{ rotate: expandedId === standard.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 text-muted shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </div>
                  <p className="text-muted text-sm mt-2 line-clamp-2">
                    {standard.description}
                  </p>
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedId === standard.id ? "auto" : 0,
                  opacity: expandedId === standard.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="border-t border-border/30 pt-4">
                    <ul className="space-y-2">
                      {standard.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-accent shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-light text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                    {standard.note && (
                      <p className="mt-4 text-sm text-muted italic">
                        {standard.note}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
