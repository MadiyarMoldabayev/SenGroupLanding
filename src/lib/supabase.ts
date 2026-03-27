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
}
