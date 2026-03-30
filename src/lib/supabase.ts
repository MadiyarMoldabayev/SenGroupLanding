import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VALID_LOCALES = ["ru", "kk", "en"];

export function safeLocale(locale: string): string {
  return VALID_LOCALES.includes(locale) ? locale : "ru";
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  title_en: string | null;
  title_kk: string | null;
  content_en: string | null;
  content_kk: string | null;
  excerpt_en: string | null;
  excerpt_kk: string | null;
}

export function getLocalizedField(
  article: Article,
  field: "title" | "content" | "excerpt",
  locale: string
): string {
  if (locale === "en" && article[`${field}_en` as keyof Article]) {
    return article[`${field}_en` as keyof Article] as string;
  }
  if (locale === "kk" && article[`${field}_kk` as keyof Article]) {
    return article[`${field}_kk` as keyof Article] as string;
  }
  return article[field];
}
