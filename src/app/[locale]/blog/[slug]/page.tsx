"use client";

import { useState, useEffect } from "react";
import { supabase, Article, safeLocale } from "@/lib/supabase";
import { renderContent, isHtmlContent, RenderHtmlArticle } from "@/lib/renderContent";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const translations: { [key: string]: { [key: string]: string } } = {
  ru: {
    back: "Назад к блогу",
    notFound: "Статья не найдена",
  },
  kk: {
    back: "Блогқа оралу",
    notFound: "Мақала табылмады",
  },
  en: {
    back: "Back to blog",
    notFound: "Article not found",
  },
};

interface PageProps {
  params: { locale: string; slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const locale = safeLocale(params.locale);
  const t = translations[locale] || translations.ru;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", params.slug)
        .eq("published", true)
        .single();
      if (data) setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [params.slug]);

  return (
    <main className="min-h-screen mesh-bg">
      <Header locale={locale} />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/blog/`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
          >
            &larr; {t.back}
          </Link>

          {loading ? (
            <div className="text-center text-muted py-20">Loading...</div>
          ) : !article ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted">{t.notFound}</p>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {article.cover_image_url && (
                <div className="relative rounded-2xl overflow-hidden mb-8">
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full max-h-[500px] object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-muted mb-4">
                {new Date(article.created_at).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {article.title}
              </h1>

              {isHtmlContent(article.content) ? (
                <RenderHtmlArticle content={article.content} />
              ) : (
                <div className="prose-custom">
                  {renderContent(article.content)}
                </div>
              )}
            </motion.article>
          )}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
