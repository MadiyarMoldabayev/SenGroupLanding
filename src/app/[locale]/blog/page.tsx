"use client";

import { useState, useEffect } from "react";
import { supabase, Article, safeLocale } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const translations: { [key: string]: { [key: string]: string } } = {
  ru: {
    title: "Персональный блог",
    subtitle: "Статьи и мысли от Батимы Мукиной",
    readMore: "Читать далее",
    noArticles: "Статей пока нет. Загляните позже!",
    back: "На главную",
  },
  kk: {
    title: "Жеке блог",
    subtitle: "Батима Мукинаның мақалалары мен ойлары",
    readMore: "Толығырақ оқу",
    noArticles: "Мақалалар жоқ. Кейінірек кіріңіз!",
    back: "Басты бетке",
  },
  en: {
    title: "Personal Blog",
    subtitle: "Articles and thoughts by Batima Mukina",
    readMore: "Read more",
    noArticles: "No articles yet. Check back later!",
    back: "Back to Home",
  },
};

interface PageProps {
  params: { locale: string };
}

export default function BlogPage({ params }: PageProps) {
  const locale = safeLocale(params.locale);
  const t = translations[locale] || translations.ru;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen mesh-bg">
      <Header locale={locale} />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-muted mb-6">{t.subtitle}</p>
            <Link
              href={`/${locale}/login/`}
              className="btn-secondary text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {locale === "en"
                ? "Blog Login"
                : locale === "kk"
                ? "Блог кіру"
                : "Вход в блог"}
            </Link>
          </motion.div>

          {loading ? (
            <div className="text-center text-muted py-20">Loading...</div>
          ) : articles.length === 0 ? (
            <div className="text-center text-muted py-20">
              <p className="text-lg">{t.noArticles}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/${locale}/blog/${article.slug}/`}
                    className="block glass rounded-2xl overflow-hidden card-hover group"
                  >
                    {article.cover_image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs text-muted mb-3">
                        {new Date(article.created_at).toLocaleDateString(
                          locale,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-muted text-sm line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <span className="inline-block mt-4 text-sm text-primary font-medium">
                        {t.readMore} &rarr;
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
