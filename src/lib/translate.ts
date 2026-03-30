const GOOGLE_TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (!text.trim()) return "";

  // Split into chunks of ~4000 chars to avoid API limits
  const chunks = splitTextIntoChunks(text, 4000);
  const translated: string[] = [];

  for (const chunk of chunks) {
    const params = new URLSearchParams({
      client: "gtx",
      sl: sourceLang,
      tl: targetLang,
      dt: "t",
      q: chunk,
    });

    const res = await fetch(`${GOOGLE_TRANSLATE_URL}?${params.toString()}`);
    if (!res.ok) throw new Error(`Translation failed: ${res.status}`);

    const data = await res.json();
    const result = data[0]
      ?.map((seg: [string]) => seg[0])
      .join("");
    translated.push(result || chunk);
  }

  return translated.join("");
}

function splitTextIntoChunks(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let splitAt = remaining.lastIndexOf("\n", maxLen);
    if (splitAt < maxLen / 2) splitAt = maxLen;
    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }
  return chunks;
}

/**
 * For HTML content: extract only text nodes for translation,
 * preserving the HTML structure with original styles.
 */
function stripHtmlBoilerplate(html: string): string {
  // Remove everything before <body> or the first structural tag
  let content = html;
  // Remove doctype, html, head, style, script
  content = content.replace(/<!DOCTYPE[^>]*>/gi, "");
  content = content.replace(/<html[^>]*>/gi, "");
  content = content.replace(/<\/html>/gi, "");
  content = content.replace(/<head>[\s\S]*?<\/head>/gi, "");
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  content = content.replace(/<link[^>]*\/?>/gi, "");
  content = content.replace(/<meta[^>]*\/?>/gi, "");
  content = content.replace(/<\/?body[^>]*>/gi, "");
  return content.trim();
}

function isHtml(content: string): boolean {
  const trimmed = content.trim();
  return (
    trimmed.startsWith("<!DOCTYPE") ||
    trimmed.startsWith("<html") ||
    trimmed.startsWith("<article") ||
    trimmed.includes("<div class=") ||
    trimmed.startsWith("<!-- html -->")
  );
}

/**
 * Translate HTML content by extracting text, translating it,
 * then re-inserting into the structure.
 * We strip boilerplate first, then translate the clean HTML body.
 * Google Translate handles HTML tags reasonably well when the
 * content is clean (no <style> or <script>).
 */
async function translateHtmlContent(
  html: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  // Strip styles, scripts, head — keep only the article body HTML
  const cleanHtml = stripHtmlBoilerplate(html);

  // Translate the clean HTML — Google Translate preserves HTML tags
  // when passed as plain text with tags
  const translated = await translateText(cleanHtml, sourceLang, targetLang);

  return translated;
}

export async function translateArticle(
  title: string,
  excerpt: string,
  content: string,
  sourceLang: string,
  targetLang: string
): Promise<{ title: string; excerpt: string; content: string }> {
  const contentIsHtml = isHtml(content);

  const [translatedTitle, translatedExcerpt, translatedContent] =
    await Promise.all([
      translateText(title, sourceLang, targetLang),
      translateText(excerpt, sourceLang, targetLang),
      contentIsHtml
        ? translateHtmlContent(content, sourceLang, targetLang)
        : translateText(content, sourceLang, targetLang),
    ]);

  return {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    content: translatedContent,
  };
}
