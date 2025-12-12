"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const standards = [
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
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Удовлетворённость клиента и измеримый эффект",
    description:
      "Мы ориентируемся не на выполнение задачи, а на конечный результат клиента.",
    points: [
      "Экономия ресурсов",
      "Оптимизация процессов",
      "Сокращение рисков",
      "Улучшение показателей",
    ],
    note: "В каждом проекте должен быть зафиксирован измеримый эффект.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Управление качеством в каждом направлении",
    description:
      "Все компании экосистемы SEN — SenDigital, SenTechAudit, SenFinance и др. — работают по принципам:",
    points: [
      "Многоуровневого контроля качества",
      "Проверяемости решений",
      "Регулярных внутренних аудитов",
      "Стандартизации практик и подходов",
    ],
    note: "",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Безопасность данных и информационная этика",
    description:
      "Любой продукт или проект SEN обязателен к соответствию:",
    points: [
      "Требованиям информационной безопасности",
      "Принципам конфиденциальности",
      "Стандартам ответственного использования данных и ИИ",
    ],
    note: "Мы защищаем информацию так же, как финансовые и технологические компании мирового уровня.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Скорость с качеством",
    description:
      "Мы работаем быстро, но никогда не в ущерб качеству.",
    points: [
      "Обязательная проверка на устойчивость",
      "Проверка на точность",
      "Проверка на ценность",
    ],
    note: "Наши технологии и решения проходят обязательную проверку.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Профессиональная коммуникация",
    description:
      "Внутри команды и с клиентами мы соблюдаем стандарты:",
    points: [
      "Ясности",
      "Фактологичности",
      "Уважения",
      "Ответственности за слово",
      "Документирования ключевых договорённостей",
    ],
    note: "",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Совместное создание решений",
    description:
      "Каждая компания экосистемы SEN усиливает другую.",
    points: [
      "Digital усиливает Consulting",
      "Finance усиливает Audit",
      "Media усиливает технологические решения",
      "FoundationHub создаёт социальный эффект и прозрачность",
    ],
    note: "Интеграция — главный механизм эффективности SEN.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export default function StandardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
            Правила работы, принятия решений и качества
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Корпоративные стандарты{" "}
            <span className="gradient-text">SEN</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            Наши стандарты обеспечивают высочайшее качество в каждом проекте и
            взаимодействии
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {standards.map((standard, index) => (
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
                  {standard.icon}
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

