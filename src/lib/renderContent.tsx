import React from "react";

export function isHtmlContent(content: string): boolean {
  const trimmed = content.trim();
  return (
    trimmed.startsWith("<!DOCTYPE") ||
    trimmed.startsWith("<html") ||
    trimmed.startsWith("<article") ||
    trimmed.startsWith("<div") ||
    trimmed.startsWith("<!-- html -->")
  );
}

export function extractHtmlBody(html: string): string {
  // Extract content between <body> tags, or between <article> tags, or return as-is
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) return bodyMatch[1].trim();
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) return articleMatch[1].trim();
  // Strip <html>, <head>, <style> tags but keep the rest
  return html
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head>[\s\S]*?<\/head>/gi, "")
    .replace(/<style>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "")
    .trim();
}

export function RenderHtmlArticle({ content }: { content: string }) {
  const html = extractHtmlBody(content);
  return (
    <div
      className="html-article"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
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

export function renderInlineFormatting(
  text: string,
  keyPrefix: string
): React.ReactNode {
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
      parts.push(
        <strong
          key={`${keyPrefix}-b-${partKey++}`}
          className="text-white font-semibold"
        >
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      parts.push(
        <em key={`${keyPrefix}-i-${partKey++}`} className="italic">
          {match[2]}
        </em>
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
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

export function renderContent(content: string): React.ReactNode[] {
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

    // Numbered list items
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
