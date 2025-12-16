"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import cn from "classnames";

interface TeamMember {
  id: number;
  image: string;
  name: { ru: string; kk: string; en: string };
  role: { ru: string; kk: string; en: string };
  expertise: { ru: string; kk: string; en: string };
  experience: { ru: string; kk: string; en: string };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    image: "/team/new-1.png",
    name: { en: "Batima Mukina", kk: "Батима Мукина", ru: "Батима Мукина" },
    role: { en: "Chief Executive Officer", kk: "Бас директор", ru: "Генеральный директор" },
    expertise: { en: "Expert in audit, compliance and corporate law with 20+ years of cross-sectoral experience in public, quasi-public, NGO and business sectors, creating and implementing scalable fintech and AI solutions based on trust", kk: "Аудит, комплаенс және корпоративтік құқық бойынша маман, мемлекеттік, квазимемлекеттік, ҮЕҰ және бизнес секторларында 20+ жылдық сектораралық тәжірибесі бар, сенімге негізделген масштабталатын финтех және AI шешімдерін құрастырады және енгізеді", ru: "Эксперт по аудиту, комплаенсу и корпоративному праву с 20+ лет межсекторного опыта в государственном, квазигоссекторе, НПО и бизнесе, создаю и внедряю масштабируемые финтех и AI-решения, основанные на доверии" },
    experience: { en: "20+ years of cross-sectoral experience", kk: "20+ жылдық сектораралық тәжірибе", ru: "20+ лет межсекторного опыта" },
  },
  {
    id: 2,
    image: "/team/new-2.png",
    name: { en: "Aslan Sariev", kk: "Аслан Сариев", ru: "Аслан Сариев" },
    role: { en: "Chief Operating Officer", kk: "Операциялық директор", ru: "Операционный директор" },
    expertise: { en: "NGO finance, audit, taxation", kk: "ҮЕҰ қаржысы, аудит, салықтар", ru: "Финансы НПО, аудит, налоги" },
    experience: { en: "10+ years of experience in the non-profit sector", kk: "Коммерциялық емес секторда 10 жылдан аса тәжірибе", ru: "+10 лет опыта в некоммерческом секторе" },
  },
  {
    id: 3,
    image: "/team/new-3.png",
    name: { en: "Madiyar Moldabayev", kk: "Мадияр Молдабаев", ru: "Мадияр Молдабаев" },
    role: { en: "Chief Technology Officer", kk: "Техникалық директор", ru: "Технический директор" },
    expertise: { en: "Data analytics, full-stack development, DevOps, machine learning", kk: "Деректер аналитикасы, Fullstack әзірлеу, DevOps, машинамен оқыту", ru: "Аналитика данных, Fullstack разработка, DevOps, машинное обучение" },
    experience: { en: "5+ years of implementing IT solutions", kk: "IT шешімдерін енгізу бойынша 5 жылдан аса тәжірибе", ru: "+5 лет внедрения IT-решений" },
  },
  {
    id: 4,
    image: "/team/new-4.png",
    name: { en: "Adil Zhexenov", kk: "Адиль Жексенов", ru: "Адиль Жексенов" },
    role: { en: "Frontend Developer", kk: "Frontend әзірлеуші", ru: "Frontend разработчик" },
    expertise: { en: "React, Next.js, TypeScript, Redux Toolkit, responsive interfaces", kk: "React, Next.js, TypeScript, Redux Toolkit, бейімделетін интерфейстер", ru: "React, Next.js, TypeScript, Redux Toolkit, адаптивные интерфейсы" },
    experience: { en: "3+ years of web application development experience", kk: "Web-қосымшаларды әзірлеуде 3 жылдан аса тәжірибе", ru: "+3 года разработки web-приложений" },
  },
  {
    id: 5,
    image: "/team/new-5.png",
    name: { en: "Adilkhan Alikhanov", kk: "Адилхан Алиханов", ru: "Адилхан Алиханов" },
    role: { en: "Backend Developer", kk: "Backend әзірлеуші", ru: "Backend разработчик" },
    expertise: { en: "AI engineer with industrial experience in developing ML solutions, RAG systems, and NLP applications", kk: "ML шешімдерін, RAG жүйелерін және NLP жобаларын өнеркәсіптік деңгейде әзірлеу тәжірибесі бар AI-инженер", ru: "AI-инженер с опытом промышленной разработки ML-решений, RAG-систем и NLP" },
    experience: { en: "3+ years of commercial development experience", kk: "Коммерциялық әзірлеуде 3 жылдан аса тәжірибе", ru: "+3 года в коммерческой разработке" },
  },
  {
    id: 6,
    image: "/team/new-6.png",
    name: { en: "Ayana Amanzhol", kk: "Аяна Аманжол", ru: "Аяна Аманжол" },
    role: { en: "Product Designer", kk: "Өнім дизайнері", ru: "Дизайнер по продукту" },
    expertise: { en: "Product design, ERP and SaaS systems design", kk: "Өнім дизайны, ERP және SaaS жүйелерін жобалау", ru: "Продуктовый дизайн, проектирование ERP, SaaS систем" },
    experience: { en: "5+ years of experience in product design", kk: "Өнім дизайнында 5 жылдан аса тәжірибе", ru: "+5 лет в продуктовом дизайне" },
  },
  {
    id: 7,
    image: "/team/new-7.jpeg",
    name: { en: "Gulsina Kadyrbekkyzy", kk: "Гүлсіна Қадырбекқызы", ru: "Қадырбекқызы Гульсина" },
    role: { en: "Lawyer", kk: "Заңгер", ru: "Юрист" },
    expertise: { en: "Contract law, civil law, corporate law, IT sphere and intellectual property", kk: "Келісімшарт құқығы, азаматтық құқық, корпоративтік құқық, IT саласы және интеллектуалды меншік", ru: "Договорное право, гражданское право, корпоративное право, IT сфера и интеллектуальная собственность" },
    experience: { en: "More than 12 years of experience", kk: "12 жылдан аса тәжірибе", ru: "Более 12 лет опыта" },
  },
];

const sectionTranslations = {
  ru: {
    title: "Наша команда",
    description: "Профессионалы, которые создают экосистему SEN и воплощают наши ценности в жизнь",
  },
  kk: {
    title: "Біздің команда",
    description: "SEN экожүйесін құратын және біздің құндылықтарымызды өмірге асыратын мамандар",
  },
  en: {
    title: "Our Team",
    description: "Professionals who build the SEN ecosystem and bring our values to life",
  },
};

interface TeamSectionProps {
  locale: string;
}

export default function TeamSection({ locale }: TeamSectionProps) {
  const t = sectionTranslations[locale as keyof typeof sectionTranslations] || sectionTranslations.ru;

  const getLocalized = (obj: { ru: string; kk: string; en: string }) => {
    return obj[locale as keyof typeof obj] || obj.ru;
  };

  return (
    <section className="py-24 md:py-32 relative" id="team">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-4 mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-2">
            SEN GROUP
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.2] text-center">
            {t.title}
          </h2>
          <p className="text-muted text-base md:text-lg lg:text-xl leading-[1.5] text-center max-w-[640px]">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-center">
          {teamMembers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative rounded-3xl overflow-hidden transition duration-300 hover:shadow-2xl hover:shadow-primary/10 group",
                "aspect-auto sm:aspect-[343/400]",
                "min-h-[380px] sm:min-h-[400px]",
                index === 0 ? "xl:row-span-2 xl:aspect-auto xl:min-h-0" : "h-full"
              )}
            >
              <Image
                src={item.image}
                alt={getLocalized(item.name)}
                fill
                className={cn(
                  "object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105",
                  index === 0 && "scale-[1.1] xl:scale-100"
                )}
              />
              
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                )}
              />

              <div
                className={cn(
                  "absolute inset-0 p-6 flex flex-col",
                  "justify-end"
                )}
              >
                <div className="relative z-20 flex flex-col">
                  <h6 className="text-white font-bold text-xl md:text-2xl leading-[1.1] mb-1">
                    {getLocalized(item.name)}
                  </h6>
                  <p className="text-primary text-base md:text-lg font-medium leading-[1.5] mb-2">
                    {getLocalized(item.role)}
                  </p>
                  <p className="text-light/80 text-sm leading-[1.5]">
                    {getLocalized(item.expertise)}
                  </p>
                  <p className="text-muted text-xs mt-1">
                    {getLocalized(item.experience)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
