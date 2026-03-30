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
    // Try to split at a newline
    let splitAt = remaining.lastIndexOf("\n", maxLen);
    if (splitAt < maxLen / 2) splitAt = maxLen;
    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }
  return chunks;
}

export async function translateArticle(
  title: string,
  excerpt: string,
  content: string,
  sourceLang: string,
  targetLang: string
): Promise<{ title: string; excerpt: string; content: string }> {
  const [translatedTitle, translatedExcerpt, translatedContent] =
    await Promise.all([
      translateText(title, sourceLang, targetLang),
      translateText(excerpt, sourceLang, targetLang),
      translateText(content, sourceLang, targetLang),
    ]);

  return {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    content: translatedContent,
  };
}
