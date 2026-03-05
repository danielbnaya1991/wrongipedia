export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatDate(dateString);
}

export function generateTOC(html: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi;
  const toc: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    toc.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ""),
    });
  }
  return toc;
}

export function processWikiLinks(html: string, existingSlugs?: Set<string>): string {
  // Convert [[Article Name]] or [[Target|Label]] to internal links
  return html.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const slug = slugify(target);
    const display = label || target;
    const isRedLink = existingSlugs && !existingSlugs.has(slug);
    const className = isRedLink ? "new" : "wiki-link";
    const titleAttr = isRedLink ? ` title="${target} (page does not exist)"` : "";
    return `<a href="/wiki/${slug}" class="${className}"${titleAttr}>${display}</a>`;
  });
}

export function addHeadingIds(html: string): string {
  let counter = 0;
  return html.replace(/<h([2-4])([^>]*)>(.*?)<\/h([2-4])>/gi, (match, level, attrs, content, closeLevel) => {
    if (attrs.includes('id="')) return match;
    const id = slugify(content.replace(/<[^>]+>/g, "")) || `heading-${counter++}`;
    return `<h${level}${attrs} id="${id}">${content}</h${closeLevel}>`;
  });
}
