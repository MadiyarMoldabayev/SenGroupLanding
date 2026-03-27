"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase, Article, safeLocale } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

const translations: { [key: string]: { [key: string]: string } } = {
  ru: {
    title: "Управление блогом",
    newArticle: "Новая статья",
    articleTitle: "Заголовок",
    slug: "URL-адрес (slug)",
    excerpt: "Краткое описание",
    content: "Содержание статьи",
    coverImage: "URL обложки",
    published: "Опубликовано",
    draft: "Черновик",
    save: "Сохранить",
    delete: "Удалить",
    cancel: "Отмена",
    back: "На главную",
    logout: "Выйти",
    noArticles: "Статей пока нет",
    edit: "Редактировать",
    confirmDelete: "Вы уверены, что хотите удалить эту статью?",
    saved: "Статья сохранена",
    contentHelp: "Поддерживается Markdown. Для вставки изображений используйте ![описание](url). Для видео вставьте ссылку на YouTube/Vimeo. Для файлов используйте [название файла](url).",
    viewBlog: "Открыть блог",
  },
  kk: {
    title: "Блогты басқару",
    newArticle: "Жаңа мақала",
    articleTitle: "Тақырып",
    slug: "URL-мекенжай (slug)",
    excerpt: "Қысқаша сипаттама",
    content: "Мақала мазмұны",
    coverImage: "Мұқаба URL",
    published: "Жарияланған",
    draft: "Жоба",
    save: "Сақтау",
    delete: "Жою",
    cancel: "Бас тарту",
    back: "Басты бетке",
    logout: "Шығу",
    noArticles: "Мақалалар жоқ",
    edit: "Өңдеу",
    confirmDelete: "Бұл мақаланы жоюға сенімдісіз бе?",
    saved: "Мақала сақталды",
    contentHelp: "Markdown қолдау көрсетіледі. Суреттер үшін ![сипаттама](url) пайдаланыңыз. Бейне үшін YouTube/Vimeo сілтемесін қойыңыз. Файлдар үшін [файл аты](url) пайдаланыңыз.",
    viewBlog: "Блогты ашу",
  },
  en: {
    title: "Blog Management",
    newArticle: "New Article",
    articleTitle: "Title",
    slug: "URL slug",
    excerpt: "Short description",
    content: "Article content",
    coverImage: "Cover image URL",
    published: "Published",
    draft: "Draft",
    save: "Save",
    delete: "Delete",
    cancel: "Cancel",
    back: "Back to Home",
    logout: "Logout",
    noArticles: "No articles yet",
    edit: "Edit",
    confirmDelete: "Are you sure you want to delete this article?",
    saved: "Article saved",
    contentHelp: "Markdown supported. For images use ![alt](url). For videos paste YouTube/Vimeo links. For files use [filename](url).",
    viewBlog: "View Blog",
  },
};

interface PageProps {
  params: { locale: string };
}

export default function AdminBlogPage({ params }: PageProps) {
  const locale = safeLocale(params.locale);
  const t = translations[locale] || translations.ru;
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    published: false,
  });

  const insertFormat = (before: string, after: string = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.content.slice(start, end);
    const replacement = before + selected + after;
    const newContent =
      form.content.slice(0, start) + replacement + form.content.slice(end);
    setForm({ ...form, content: newContent });
    requestAnimationFrame(() => {
      ta.focus();
      const cursorPos = start + before.length + selected.length;
      ta.setSelectionRange(cursorPos, cursorPos);
    });
  };

  const fetchArticles = useCallback(async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setArticles(data);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(`/${locale}/login/`);
        return;
      }
      setAuthenticated(true);
      fetchArticles();
    };
    checkAuth();
  }, [locale, router, fetchArticles]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}/`);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zа-яёәіңғүұқөһ0-9\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const startNew = () => {
    setIsNew(true);
    setEditing(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image_url: "",
      published: false,
    });
  };

  const startEdit = (article: Article) => {
    setIsNew(false);
    setEditing(article);
    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      cover_image_url: article.cover_image_url || "",
      published: article.published,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const slug = form.slug || generateSlug(form.title);
    const articleData = { ...form, slug };

    if (isNew) {
      const { error } = await supabase.from("articles").insert([articleData]);
      if (error) {
        setMessage(error.message);
        setSaving(false);
        return;
      }
    } else if (editing) {
      const { error } = await supabase
        .from("articles")
        .update(articleData)
        .eq("id", editing.id);
      if (error) {
        setMessage(error.message);
        setSaving(false);
        return;
      }
    }

    setMessage(t.saved);
    setEditing(null);
    setIsNew(false);
    setSaving(false);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    await supabase.from("articles").delete().eq("id", id);
    fetchArticles();
  };

  const cancelEdit = () => {
    setEditing(null);
    setIsNew(false);
    setMessage("");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="glass border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}/`}>
            <Image
              src="/logo.png"
              alt="SENGROUP"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/blog/`}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {t.viewBlog}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-muted hover:text-red-400 transition-colors"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
          {!isNew && !editing && (
            <button onClick={startNew} className="btn-primary text-sm">
              + {t.newArticle}
            </button>
          )}
        </div>

        {message && (
          <div className="mb-6 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-primary text-sm">
            {message}
          </div>
        )}

        {/* Editor */}
        {(isNew || editing) && (
          <div className="glass rounded-2xl p-6 mb-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  {t.articleTitle}
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: isNew ? generateSlug(e.target.value) : form.slug,
                    });
                  }}
                  className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  {t.slug}
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                {t.excerpt}
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                {t.coverImage}
              </label>
              <input
                type="text"
                value={form.cover_image_url}
                onChange={(e) =>
                  setForm({ ...form, cover_image_url: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                {t.content}
              </label>
              <p className="text-xs text-muted mb-2">{t.contentHelp}</p>

              {/* Formatting Toolbar */}
              <div className="flex flex-wrap items-center gap-1 mb-2 p-2 bg-dark/30 border border-border rounded-xl">
                {/* Font size */}
                <span className="text-xs text-muted mr-1 hidden sm:inline">Size:</span>
                <button
                  type="button"
                  onClick={() => insertFormat("{size:sm}", "{/size}")}
                  className="px-2 py-1 text-xs text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Small text"
                >
                  A<span className="text-[10px]">s</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("{size:lg}", "{/size}")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Large text"
                >
                  A<span className="text-base">l</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("{size:xl}", "{/size}")}
                  className="px-2 py-1 text-base text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Extra large text"
                >
                  A<span className="text-lg">x</span>
                </button>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Headings */}
                <button
                  type="button"
                  onClick={() => insertFormat("# ")}
                  className="px-2 py-1 text-sm font-bold text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("## ")}
                  className="px-2 py-1 text-sm font-bold text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("### ")}
                  className="px-2 py-1 text-sm font-bold text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Heading 3"
                >
                  H3
                </button>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Bold */}
                <button
                  type="button"
                  onClick={() => insertFormat("**", "**")}
                  className="px-2 py-1 text-sm font-bold text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Bold"
                >
                  B
                </button>
                {/* Italic */}
                <button
                  type="button"
                  onClick={() => insertFormat("*", "*")}
                  className="px-2 py-1 text-sm italic text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Italic"
                >
                  I
                </button>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Highlights */}
                <button
                  type="button"
                  onClick={() => insertFormat("{hl:yellow}", "{/hl}")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1"
                  title="Yellow highlight"
                >
                  <span className="w-3 h-3 rounded bg-yellow-400/80" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("{hl:green}", "{/hl}")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1"
                  title="Green highlight"
                >
                  <span className="w-3 h-3 rounded bg-green-400/80" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("{hl:blue}", "{/hl}")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1"
                  title="Blue highlight"
                >
                  <span className="w-3 h-3 rounded bg-blue-400/80" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("{hl:pink}", "{/hl}")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1"
                  title="Pink highlight"
                >
                  <span className="w-3 h-3 rounded bg-pink-400/80" />
                </button>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Lists */}
                <button
                  type="button"
                  onClick={() => insertFormat("- ")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Bullet list"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /><circle cx="1" cy="6" r="1" fill="currentColor" /><circle cx="1" cy="12" r="1" fill="currentColor" /><circle cx="1" cy="18" r="1" fill="currentColor" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat("1. ")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Numbered list"
                >
                  1.
                </button>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Blockquote */}
                <button
                  type="button"
                  onClick={() => insertFormat("> ")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Quote"
                >
                  &ldquo;&rdquo;
                </button>
                {/* Link */}
                <button
                  type="button"
                  onClick={() => insertFormat("[", "](url)")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Link"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </button>
                {/* Image */}
                <button
                  type="button"
                  onClick={() => insertFormat("![alt](", ")")}
                  className="px-2 py-1 text-sm text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Image"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
              </div>

              <textarea
                ref={textareaRef}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={16}
                className="w-full px-4 py-3 bg-dark/50 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors resize-y font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border bg-dark/50 text-primary focus:ring-primary"
                />
                <span className="text-sm text-light">
                  {form.published ? t.published : t.draft}
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving || !form.title}
                className="btn-primary text-sm disabled:opacity-50"
              >
                {saving ? "..." : t.save}
              </button>
              <button
                onClick={cancelEdit}
                className="btn-secondary text-sm"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Articles list */}
        {!isNew && !editing && (
          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-muted">
                {t.noArticles}
              </div>
            ) : (
              articles.map((article) => (
                <div
                  key={article.id}
                  className="glass rounded-xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold truncate">
                        {article.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          article.published
                            ? "bg-accent/20 text-accent"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {article.published ? t.published : t.draft}
                      </span>
                    </div>
                    <p className="text-sm text-muted truncate">
                      {article.excerpt || article.slug}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {new Date(article.created_at).toLocaleDateString(locale)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(article)}
                      className="px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      {t.edit}
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
