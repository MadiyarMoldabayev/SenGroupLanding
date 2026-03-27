"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, safeLocale } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

const translations: { [key: string]: { [key: string]: string } } = {
  ru: {
    title: "Вход в панель управления",
    email: "Email",
    password: "Пароль",
    login: "Войти",
    error: "Неверный email или пароль",
    back: "На главную",
  },
  kk: {
    title: "Басқару панеліне кіру",
    email: "Email",
    password: "Құпия сөз",
    login: "Кіру",
    error: "Қате email немесе құпия сөз",
    back: "Басты бетке",
  },
  en: {
    title: "Admin Login",
    email: "Email",
    password: "Password",
    login: "Sign In",
    error: "Invalid email or password",
    back: "Back to Home",
  },
};

interface PageProps {
  params: { locale: string };
}

export default function LoginPage({ params }: PageProps) {
  const locale = safeLocale(params.locale);
  const t = translations[locale] || translations.ru;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(t.error);
      setLoading(false);
      return;
    }

    router.push(`/${locale}/admin/blog/`);
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={`/${locale}/`}>
            <Image
              src="/logo.png"
              alt="SENGROUP"
              width={180}
              height={50}
              className="h-10 w-auto mx-auto mb-6"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : t.login}
          </button>

          <div className="text-center">
            <Link
              href={`/${locale}/`}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {t.back}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
