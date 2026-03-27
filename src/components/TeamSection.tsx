"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { supabase, Article } from "@/lib/supabase";

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
    role: {
      en: "CEO & Founder",
      kk: "Бас директор және Негізін қалаушы",
      ru: "Генеральный директор и Основатель",
    },
    expertise: { en: "", kk: "", ru: "" },
    experience: { en: "", kk: "", ru: "" },
  },
];

const sectionTranslations = {
  ru: {
    title: "Голос лидера",
    description:
      "Идеи, мысли и статьи от основателя SEN Group — Батимы Мукиной",
    readMore: "Читать далее",
    allArticles: "Все статьи",
  },
  kk: {
    title: "Көшбасшы дауысы",
    description:
      "SEN Group негізін қалаушы — Батима Мукинаның идеялары, ойлары мен мақалалары",
    readMore: "Толығырақ оқу",
    allArticles: "Барлық мақалалар",
  },
  en: {
    title: "Leader's Voice",
    description:
      "Ideas, thoughts and articles from the founder of SEN Group — Batima Mukina",
    readMore: "Read more",
    allArticles: "All articles",
  },
};

interface TeamSectionProps {
  locale: string;
}

export default function TeamSection({ locale }: TeamSectionProps) {
  const t =
    sectionTranslations[locale as keyof typeof sectionTranslations] ||
    sectionTranslations.ru;
  const [articles, setArticles] = useState<Article[]>([]);

  const getLocalized = (obj: { ru: string; kk: string; en: string }) => {
    return obj[locale as keyof typeof obj] || obj.ru;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (data) setArticles(data);
    };
    fetchArticles();
  }, []);

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

        {/* Batima card + latest articles side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Batima's photo card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {teamMembers.map((item) => (
              <div
                key={item.id}
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
              </div>
            ))}
          </motion.div>

          {/* Latest blog articles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            {articles.length > 0 ? (
              <>
                {articles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/${locale}/blog/${article.slug}/`}
                    className="block glass rounded-2xl overflow-hidden card-hover group"
                  >
                    <div className="flex gap-4">
                      {article.cover_image_url && (
                        <div className="relative w-28 sm:w-36 flex-shrink-0">
                          <img
                            src={article.cover_image_url}
                            alt={article.title}
                            className="w-full h-full object-cover min-h-[120px] group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4 flex-1 min-w-0">
                        <p className="text-xs text-muted mb-2">
                          {new Date(article.created_at).toLocaleDateString(
                            locale,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-muted text-sm line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <span className="inline-block mt-3 text-xs text-primary font-medium">
                          {t.readMore} &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <Link
                  href={`/${locale}/blog/`}
                  className="btn-secondary text-sm text-center mt-2"
                >
                  {t.allArticles} &rarr;
                </Link>
              </>
            ) : (
              <div className="glass rounded-2xl p-8 text-center text-muted">
                <p className="text-lg mb-4">
                  {locale === "en"
                    ? "Articles coming soon..."
                    : locale === "kk"
                    ? "Мақалалар жақында..."
                    : "Статьи скоро появятся..."}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
