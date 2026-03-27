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

const highlightColors: { [key: string]: string } = {
  yellow: "bg-yellow-400/20 text-yellow-200 px-1 rounded",
  green: "bg-green-400/20 text-green-200 px-1 rounded",
  blue: "bg-blue-400/20 text-blue-200 px-1 rounded",
  pink: "bg-pink-400/20 text-pink-200 px-1 rounded",
};

const sizeClasses: { [key: string]: string } = {
  sm: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
};

function renderInlineFormatting(text: string, keyPrefix: string): React.ReactNode {
  // Process inline tags: bold, italic, highlights, font sizes, links
  const inlineRegex =
    /\*\*(.+?)\*\*|\*(.+?)\*|\{hl:(\w+)\}(.+?)\{\/hl\}|\{size:(\w+)\}(.+?)\{\/size\}|\[([^\]]+)\]\(([^)]+)\)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let partKey = 0;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      // Bold: **text**
      parts.push(
        <strong key={`${keyPrefix}-b-${partKey++}`} className="text-white font-semibold">
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      // Italic: *text*
      parts.push(
        <em key={`${keyPrefix}-i-${partKey++}`} className="italic">
          {match[2]}
        </em>
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
      // Highlight: {hl:color}text{/hl}
      const color = match[3];
      parts.push(
        <mark
          key={`${keyPrefix}-hl-${partKey++}`}
          className={highlightColors[color] || highlightColors.yellow}
        >
          {match[4]}
        </mark>
      );
    } else if (match[5] !== undefined && match[6] !== undefined) {
      // Size: {size:sm|lg|xl}text{/size}
      const size = match[5];
      parts.push(
        <span
          key={`${keyPrefix}-sz-${partKey++}`}
          className={sizeClasses[size] || ""}
        >
          {match[6]}
        </span>
      );
    } else if (match[7] !== undefined && match[8] !== undefined) {
      // Link: [text](url)
      parts.push(
        <a
          key={`${keyPrefix}-l-${partKey++}`}
          href={match[8]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {match[7]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (parts.length === 0) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  for (const line of lines) {
    i++;
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<br key={i} />);
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">
          {renderInlineFormatting(trimmed.slice(4), `${i}`)}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
          {renderInlineFormatting(trimmed.slice(3), `${i}`)}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-3xl font-bold text-white mt-10 mb-4">
          {renderInlineFormatting(trimmed.slice(2), `${i}`)}
        </h1>
      );
      continue;
    }

    // YouTube/Vimeo embeds
    const youtubeMatch = trimmed.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      elements.push(
        <div key={i} className="my-6 aspect-video rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
            className="w-full h-full"
            allowFullScreen
            title="Video"
          />
        </div>
      );
      continue;
    }

    const vimeoMatch = trimmed.match(
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/
    );
    if (vimeoMatch) {
      elements.push(
        <div key={i} className="my-6 aspect-video rounded-xl overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
            className="w-full h-full"
            allowFullScreen
            title="Video"
          />
        </div>
      );
      continue;
    }

    // Images: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      elements.push(
        <figure key={i} className="my-6">
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            className="w-full rounded-xl"
          />
          {imgMatch[1] && (
            <figcaption className="text-sm text-muted mt-2 text-center">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Render inline formatting for the line
    const text = renderInlineFormatting(trimmed, `${i}`);

    // Bullet list items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(
        <li key={i} className="text-light/80 leading-relaxed ml-6 list-disc">
          {renderInlineFormatting(trimmed.slice(2), `${i}`)}
        </li>
      );
      continue;
    }

    // Numbered list items: 1. text, 2. text, etc.
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      elements.push(
        <li
          key={i}
          className="text-light/80 leading-relaxed ml-6 list-decimal"
          value={parseInt(numberedMatch[1])}
        >
          {renderInlineFormatting(numberedMatch[2], `${i}`)}
        </li>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-primary pl-4 my-4 text-light/70 italic"
        >
          {renderInlineFormatting(trimmed.slice(2), `${i}`)}
        </blockquote>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-light/80 leading-relaxed mb-4">
        {text}
      </p>
    );
  }

  return elements;
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

              <div className="prose-custom">{renderContent(article.content)}</div>
            </motion.article>
          )}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
