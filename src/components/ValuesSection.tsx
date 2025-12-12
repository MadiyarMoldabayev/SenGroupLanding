"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    number: "01",
    title: "Доверие как инфраструктура",
    description:
      "Мы создаём технологии и сервисы, которые укрепляют доверие — внутри организаций, между командами, партнёрами и обществом.",
    details:
      "Доверие — это не абстрактное понятие, а управляемый процесс: прозрачность данных, честность решений и ответственность за результат. Мы строим системы, в которых можно доверять цифрам, людям и процессам.",
    color: "from-primary to-blue-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Честность и профессиональная ответственность",
    description:
      "Мы всегда действуем этично, корректно и профессионально.",
    details:
      "Наши решения основаны на доказательствах, данных и объективности. Честность — это стандарт качества в каждой разработке, консультации и управленческом решении SEN.",
    color: "from-secondary to-purple-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Технологии во благо",
    description:
      "Мы создаём технологии, которые решают реальные проблемы: улучшают управление, упрощают процессы, повышают прозрачность и эффективность.",
    details: "Если технология не приносит ценность — она нам не нужна.",
    color: "from-accent to-emerald-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Управление на основе данных",
    description: "Данные — это центр любой цифровой трансформации.",
    details:
      "Мы создаём системы, в которых каждая цифра имеет значение, а аналитика становится основой управленческих решений. Правильные данные → ясные процессы → сильные решения.",
    color: "from-orange-500 to-amber-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Инновации как норма, а не исключение",
    description:
      "Мы постоянно исследуем, тестируем и внедряем новые подходы — в технологиях, финтехе, управлении, обучении и медиа.",
    details: "Инновации SEN — это практичные решения, а не теория.",
    color: "from-pink-500 to-rose-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Уважение и развитие людей",
    description:
      "Мы создаём культуру, в которой каждый сотрудник чувствует свою ценность и получает возможности для профессионального роста.",
    details:
      "Наши команды — это не просто исполнители, а соавторы изменений. Люди — главный интеллектуальный актив SEN.",
    color: "from-cyan-500 to-teal-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Ответственность перед обществом",
    description:
      "Мы верим, что сильные организации создают сильное общество.",
    details:
      "Поэтому наша экосистема работает не только на коммерческий успех, но и на устойчивое развитие, прозрачность и социальный эффект. Мы создаём технологии, которые делают страны и организации лучше.",
    color: "from-indigo-500 to-violet-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="values" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            Основа культуры, решений и поведения экосистемы
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Ценности <span className="gradient-text">SEN Group</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
            Наши ценности определяют каждое решение, каждый проект и каждое
            взаимодействие в нашей экосистеме
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.article
              key={value.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative glass rounded-3xl p-8 card-hover overflow-hidden ${
                index === values.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Number */}
              <span
                className={`absolute top-6 right-6 text-6xl font-bold bg-gradient-to-br ${value.color} bg-clip-text text-transparent opacity-20`}
              >
                {value.number}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} p-[1px] mb-6`}
              >
                <div className="w-full h-full bg-dark rounded-2xl flex items-center justify-center text-white">
                  {value.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 pr-10">
                {value.title}
              </h3>
              <p className="text-muted mb-4 leading-relaxed">
                {value.description}
              </p>
              <p className="text-sm text-muted/70 leading-relaxed">
                {value.details}
              </p>

              {/* Bottom gradient line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

