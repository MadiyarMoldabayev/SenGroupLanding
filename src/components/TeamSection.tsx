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
    image: "/team/BatimaMukinaSengroup.jpg",
    name: { en: "Batima Mukina", kk: "Батима Мукина", ru: "Батима Мукина" },
    role: { en: "CEO & Founder", kk: "Бас директор және Негізін қалаушы", ru: "Генеральный директор и Основатель" },
    expertise: { en: "", kk: "", ru: "" },
    experience: { en: "", kk: "", ru: "" },
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

        <div className="flex justify-center">
          {teamMembers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative rounded-3xl overflow-hidden transition duration-300 hover:shadow-2xl hover:shadow-primary/10 group",
                "w-full max-w-md",
                "aspect-[3/4]",
                "min-h-[480px] sm:min-h-[560px]"
              )}
            >
              <Image
                src={item.image}
                alt={getLocalized(item.name)}
                fill
                className="object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
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
                  <p className="text-primary text-base md:text-lg font-medium leading-[1.5]">
                    {getLocalized(item.role)}
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
