"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const engoHubData = {
  ru: {
    badge: "Наш флагманский продукт",
    title: "ENGOHUB",
    titleHighlight: "— центр поддержки НПО",
    subtitle: "Мы помогаем НПО Казахстана и Центральной Азии быть прозрачными, устойчивыми и эффективными",
    description: "SEN — центр развития и поддержки НПО Казахстана и Центральной Азии. Мы усиливаем организации, которые создают позитивные изменения: помогаем им становиться устойчивыми, прозрачными и профессиональными.",
    features: [
      {
        title: "Консалтинг",
        description: "Экспертное сопровождение по финансам, управлению и стратегии развития НПО",
        icon: "briefcase",
      },
      {
        title: "Образование",
        description: "Обучение команд НПО современным методам финансового управления и отчётности",
        icon: "education",
      },
      {
        title: "Менторство",
        description: "Индивидуальное сопровождение НПО и лидеров инициатив — от идеи до масштаба",
        icon: "mentor",
      },
      {
        title: "Юридическое сопровождение",
        description: "Разработка политик, комплаенс, правовая поддержка и регулирование деятельности",
        icon: "legal",
      },
      {
        title: "Цифровизация",
        description: "IT-решения, автоматизация процессов, внедрение цифровых систем управления",
        icon: "digital",
      },
      {
        title: "Международные проекты",
        description: "Поддержка грантов, работа с донорами и сопровождение транснациональных программ",
        icon: "global",
      },
    ],
    audiences: [
      {
        title: "Благополучатели",
        description: "Поддержка, которая меняет жизни. Мы создаём программы и условия для роста и реализации потенциала каждого.",
      },
      {
        title: "НПО",
        description: "Развиваем лидеров перемен. Экспертиза, инструменты и менторство для тех, кто строит будущее социальных инициатив.",
      },
      {
        title: "Доноры",
        description: "Инвестиции в устойчивые решения. Прозрачная и эффективная экосистема, где ресурсы превращаются в долгосрочный эффект.",
      },
    ],
    cta: "Перейти на ENGOHUB",
  },
  kk: {
    badge: "Біздің флагмандық өнім",
    title: "ENGOHUB",
    titleHighlight: "— ҮЕҰ қолдау орталығы",
    subtitle: "Біз Қазақстан мен Орталық Азия ҮЕҰ-ларына ашық, тұрақты және тиімді болуға көмектесеміз",
    description: "SEN — Қазақстан мен Орталық Азия ҮЕҰ-ларын дамыту және қолдау орталығы. Біз позитивті өзгерістер жасайтын ұйымдарды күшейтеміз: оларға тұрақты, ашық және кәсіби болуға көмектесеміз.",
    features: [
      {
        title: "Консалтинг",
        description: "ҮЕҰ қаржысы, басқару және даму стратегиясы бойынша сараптамалық қолдау",
        icon: "briefcase",
      },
      {
        title: "Білім беру",
        description: "ҮЕҰ командаларын қаржылық басқару мен есептіліктің заманауи әдістеріне оқыту",
        icon: "education",
      },
      {
        title: "Менторлық",
        description: "ҮЕҰ мен бастама көшбасшыларын жеке қолдау — идеядан масштабқа дейін",
        icon: "mentor",
      },
      {
        title: "Заңгерлік қолдау",
        description: "Саясаттарды әзірлеу, комплаенс, құқықтық қолдау және қызметті реттеу",
        icon: "legal",
      },
      {
        title: "Цифрландыру",
        description: "IT-шешімдер, процестерді автоматтандыру, цифрлық басқару жүйелерін енгізу",
        icon: "digital",
      },
      {
        title: "Халықаралық жобалар",
        description: "Гранттарды қолдау, донорлармен жұмыс және трансұлттық бағдарламаларды сүйемелдеу",
        icon: "global",
      },
    ],
    audiences: [
      {
        title: "Пайда алушылар",
        description: "Өмірді өзгертетін қолдау. Біз әркімнің өсуі мен әлеуетін іске асыруы үшін бағдарламалар мен жағдайлар жасаймыз.",
      },
      {
        title: "ҮЕҰ",
        description: "Өзгеріс көшбасшыларын дамытамыз. Әлеуметтік бастамалардың болашағын құратындар үшін сараптама, құралдар және менторлық.",
      },
      {
        title: "Донорлар",
        description: "Тұрақты шешімдерге инвестициялар. Ресурстар ұзақ мерзімді әсерге айналатын ашық және тиімді экожүйе.",
      },
    ],
    cta: "ENGOHUB-қа өту",
  },
  en: {
    badge: "Our Flagship Product",
    title: "ENGOHUB",
    titleHighlight: "— NGO Support Center",
    subtitle: "We help NGOs in Kazakhstan and Central Asia to be transparent, sustainable, and effective",
    description: "SEN is a center for development and support of NGOs in Kazakhstan and Central Asia. We strengthen organizations that create positive changes: helping them become sustainable, transparent, and professional.",
    features: [
      {
        title: "Consulting",
        description: "Expert support in finance, management, and NGO development strategy",
        icon: "briefcase",
      },
      {
        title: "Education",
        description: "Training NGO teams in modern financial management and reporting methods",
        icon: "education",
      },
      {
        title: "Mentorship",
        description: "Individual support for NGOs and initiative leaders — from idea to scale",
        icon: "mentor",
      },
      {
        title: "Legal Support",
        description: "Policy development, compliance, legal support, and activity regulation",
        icon: "legal",
      },
      {
        title: "Digitalization",
        description: "IT solutions, process automation, implementation of digital management systems",
        icon: "digital",
      },
      {
        title: "International Projects",
        description: "Grant support, work with donors, and support of transnational programs",
        icon: "global",
      },
    ],
    audiences: [
      {
        title: "Beneficiaries",
        description: "Support that changes lives. We create programs and conditions for everyone to grow and realize their potential.",
      },
      {
        title: "NGOs",
        description: "Developing leaders of change. Expertise, tools, and mentorship for those building the future of social initiatives.",
      },
      {
        title: "Donors",
        description: "Investments in sustainable solutions. A transparent and effective ecosystem where resources turn into long-term impact.",
      },
    ],
    cta: "Go to ENGOHUB",
  },
};

const featureIcons: { [key: string]: JSX.Element } = {
  briefcase: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            <span className="gradient-text">{t.title}</span>
            {t.titleHighlight}
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto mb-6">
            {t.subtitle}
          </p>
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

