"use client";

import { useState, useEffect } from "react";
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
    name: { ru: "Мадияр Молдабаев", kk: "Мадияр Молдабаев", en: "Madiyar Moldabayev" },
    role: { ru: "Основатель и CEO", kk: "Негізін қалаушы және CEO", en: "Founder & CEO" },
    expertise: { ru: "Стратегическое управление, цифровая трансформация", kk: "Стратегиялық басқару, цифрлық трансформация", en: "Strategic Management, Digital Transformation" },
    experience: { ru: "15+ лет опыта в IT и бизнесе", kk: "IT және бизнесте 15+ жыл тәжірибе", en: "15+ years in IT and Business" },
  },
  {
    id: 2,
    image: "/team/new-2.png",
    name: { ru: "Алия Касымова", kk: "Әлия Қасымова", en: "Aliya Kasymova" },
    role: { ru: "Директор по развитию", kk: "Даму директоры", en: "Development Director" },
    expertise: { ru: "Бизнес-развитие, партнёрства", kk: "Бизнес-даму, серіктестіктер", en: "Business Development, Partnerships" },
    experience: { ru: "10+ лет в консалтинге", kk: "Консалтингте 10+ жыл", en: "10+ years in Consulting" },
  },
  {
    id: 3,
    image: "/team/new-3.png",
    name: { ru: "Арман Сейтказин", kk: "Арман Сейтқазин", en: "Arman Seitkazin" },
    role: { ru: "Технический директор", kk: "Техникалық директор", en: "CTO" },
    expertise: { ru: "Архитектура систем, AI/ML", kk: "Жүйелер архитектурасы, AI/ML", en: "System Architecture, AI/ML" },
    experience: { ru: "12+ лет в разработке", kk: "Әзірлеуде 12+ жыл", en: "12+ years in Development" },
  },
  {
    id: 4,
    image: "/team/new-4.png",
    name: { ru: "Дана Нурланова", kk: "Дана Нұрланова", en: "Dana Nurlanova" },
    role: { ru: "Финансовый директор", kk: "Қаржы директоры", en: "CFO" },
    expertise: { ru: "Финансы, инвестиции", kk: "Қаржы, инвестициялар", en: "Finance, Investments" },
    experience: { ru: "8+ лет в финтехе", kk: "Финтехте 8+ жыл", en: "8+ years in Fintech" },
  },
  {
    id: 5,
    image: "/team/new-5.png",
    name: { ru: "Ерлан Жумабеков", kk: "Ерлан Жұмабеков", en: "Yerlan Zhumabekov" },
    role: { ru: "Директор по продуктам", kk: "Өнімдер директоры", en: "CPO" },
    expertise: { ru: "Продуктовый менеджмент, UX", kk: "Өнім менеджменті, UX", en: "Product Management, UX" },
    experience: { ru: "10+ лет в продуктах", kk: "Өнімдерде 10+ жыл", en: "10+ years in Products" },
  },
  {
    id: 6,
    image: "/team/new-6.png",
    name: { ru: "Айгерим Тлеубергенова", kk: "Айгерім Тлеубергенова", en: "Aigerim Tleubergenova" },
    role: { ru: "Директор по маркетингу", kk: "Маркетинг директоры", en: "CMO" },
    expertise: { ru: "Маркетинг, бренд-стратегия", kk: "Маркетинг, бренд-стратегия", en: "Marketing, Brand Strategy" },
    experience: { ru: "9+ лет в маркетинге", kk: "Маркетингте 9+ жыл", en: "9+ years in Marketing" },
  },
  {
    id: 7,
    image: "/team/new-7.jpeg",
    name: { ru: "Сауле Бекмуратова", kk: "Сәуле Бекмұратова", en: "Saule Bekmuratova" },
    role: { ru: "HR Директор", kk: "HR Директор", en: "HR Director" },
    expertise: { ru: "Управление персоналом, культура", kk: "Персоналды басқару, мәдениет", en: "People Management, Culture" },
    experience: { ru: "11+ лет в HR", kk: "HR-да 11+ жыл", en: "11+ years in HR" },
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

export default function TeamSection() {
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    const savedLang = localStorage.getItem("sen-lang");
    if (savedLang && ["ru", "kk", "en"].includes(savedLang)) {
      setLang(savedLang);
    }

    const handleLangChange = (e: CustomEvent) => {
      setLang(e.detail);
    };

    window.addEventListener("langChange", handleLangChange as EventListener);
    return () => window.removeEventListener("langChange", handleLangChange as EventListener);
  }, []);

  const t = sectionTranslations[lang as keyof typeof sectionTranslations];

  const getLocalized = (obj: { ru: string; kk: string; en: string }) => {
    return obj[lang as keyof typeof obj] || obj.ru;
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
                  index === 0
                    ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent xl:bg-gradient-to-b xl:from-black/90 xl:via-black/30 xl:to-transparent"
                    : "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                )}
              />

              <div
                className={cn(
                  "absolute inset-0 p-6 flex flex-col",
                  index === 0 ? "justify-end xl:justify-start" : "justify-end"
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

