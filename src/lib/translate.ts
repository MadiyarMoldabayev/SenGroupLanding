const GOOGLE_TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (!text.trim()) return "";

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

function stripHtmlBoilerplate(html: string): string {
  let content = html;
  content = content.replace(/<!DOCTYPE[^>]*>/gi, "");
  content = content.replace(/<html[^>]*>/gi, "");
  content = content.replace(/<\/html>/gi, "");
  content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
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
 * Translate HTML by protecting tags with placeholders.
 * 1. Replace all HTML tags with numbered placeholders
 * 2. Translate only the plain text
 * 3. Restore the tags from placeholders
 */
async function translateHtmlContent(
  html: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const cleanHtml = stripHtmlBoilerplate(html);

  // Extract all HTML tags and replace with placeholders
  const tags: string[] = [];
  const textWithPlaceholders = cleanHtml.replace(
    /<[^>]+>/g,
    (match) => {
      const idx = tags.length;
      tags.push(match);
      return `[[T${idx}]]`;
    }
  );

  // Translate the text (which now only contains text + placeholders)
  const translatedText = await translateText(
    textWithPlaceholders,
    sourceLang,
    targetLang
  );

  // Restore HTML tags from placeholders
  // Handle possible spacing changes from translation
  const result = translatedText.replace(
    /\[\[\s*T\s*(\d+)\s*\]\]/g,
    (_, idx) => tags[parseInt(idx)] || ""
  );

  return result;
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
