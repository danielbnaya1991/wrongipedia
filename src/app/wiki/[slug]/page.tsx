import { createClient } from "@/lib/supabase/server";
import { addHeadingIds, processWikiLinks, generateTOC } from "@/lib/utils";
import ArticleTabs from "@/components/ArticleTabs";
import ArticleTOC from "@/components/ArticleTOC";
import Navbox from "@/components/Navbox";
import MobileCollapsibleContent from "@/components/MobileCollapsibleContent";
import MobilePageActions from "@/components/MobilePageActions";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import type { Metadata } from "next";
import { seedArticles, seedArticleCategories, seedCategories } from "@/lib/seed-data";

const knownSlugs = new Set(seedArticles.map((a) => a.slug));

function titleFromSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticle(slug);
  if (!result) {
    const title = titleFromSlug(slug);
    return {
      title: `${title} — Wrongipedia`,
      description: `Wrongipedia does not have an article with this exact name. You can create it.`,
    };
  }

  const title = result.article.title;
  const description = result.article.summary || `An entirely wrong article about ${title}`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;

  return {
    title: `${title} — Wrongipedia`,
    description,
    openGraph: {
      title: `${title} — Wrongipedia`,
      description,
      type: "article",
      siteName: "Wrongipedia",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Wrongipedia`,
      description,
      images: [ogImageUrl],
    },
  };
}

async function getArticle(slug: string) {
  try {
    const supabase = await createClient();
    const { data: article } = await supabase
      .from("articles")
      .select("*, profiles(*)")
      .eq("slug", slug)
      .single();

    if (article) {
      try { await supabase.rpc("increment_view_count", { article_slug: slug }); } catch {}
      const { data: articleCategories } = await supabase
        .from("article_categories")
        .select("categories(*)")
        .eq("article_id", article.id);
      const categories = articleCategories?.map((ac: any) => ac.categories).filter(Boolean) || [];
      return { article, categories, isSeed: false };
    }
  } catch {}

  const seedArticle = seedArticles.find((a) => a.slug === slug);
  if (!seedArticle) return null;

  const categorySlugs = seedArticleCategories[slug] || [];
  const categories = categorySlugs
    .map((cs) => seedCategories.find((c) => c.slug === cs))
    .filter(Boolean);

  return {
    article: {
      ...seedArticle,
      id: slug,
      created_by: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: null,
    },
    categories,
    isSeed: true,
  };
}

/**
 * Fix infobox single-cell rows: add colspan="2" to td that are the only child in their row.
 * Without this, rows like title/image/header only span one column while data rows have 2 cells.
 */
function fixInfoboxColspan(html: string): string {
  // Match <tr> that contains exactly one <td> and no <th>
  // Pattern: <tr><td ...>...</td></tr> with no <th> inside
  return html.replace(/<tr>\s*(<td\s+class="infobox-(title|image|header|above|caption)")/gi,
    (match, tdPart) => {
      return `<tr>${tdPart.replace(/^<td /, '<td colspan="2" ')}`;
    }
  );
}

function addEditSectionLinks(html: string, slug: string): string {
  let sectionIndex = 0;
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/gi, (match, level, attrs, content) => {
    sectionIndex++;
    return `<h${level}${attrs}>${content}<span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/wiki/${slug}/edit">edit</a><span class="mw-editsection-bracket">]</span></span></h${level}>`;
  });
}

// Articles with common-word titles that would have disambiguation pages on Wikipedia
const disambiguationSlugs = new Set([
  "football", "coffee", "water", "fire", "salt", "rice", "tea", "bread",
  "cheese", "music", "time", "language", "dance", "money", "paper",
  "bridges", "chess", "education", "exercise", "memory", "dreams",
  "painting", "architecture", "heart", "brain", "sleep", "chocolate",
  "gravity", "evolution", "electricity", "lightning", "magnets",
  "democracy", "calendar", "compass", "laundry",
]);

// Build navbox data: for each category, list the articles in it
function getNavboxesForArticle(
  slug: string,
  categorySlugs: string[]
): { title: string; items: { title: string; slug: string }[] }[] {
  const navboxes: { title: string; items: { title: string; slug: string }[] }[] = [];

  for (const catSlug of categorySlugs) {
    const category = seedCategories.find((c) => c.slug === catSlug);
    if (!category) continue;

    // Find all articles in this category
    const articlesInCategory: { title: string; slug: string }[] = [];
    for (const [artSlug, artCats] of Object.entries(seedArticleCategories)) {
      if (artCats.includes(catSlug)) {
        const article = seedArticles.find((a) => a.slug === artSlug);
        if (article) {
          articlesInCategory.push({ title: article.title, slug: artSlug });
        }
      }
    }

    // Only show navbox if there are at least 3 articles in the category
    if (articlesInCategory.length >= 3) {
      // Sort alphabetically
      articlesInCategory.sort((a, b) => a.title.localeCompare(b.title));
      navboxes.push({
        title: category.name,
        items: articlesInCategory,
      });
    }
  }

  // Limit to 3 navboxes max to avoid clutter
  return navboxes.slice(0, 3);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getArticle(slug);

  if (!result) {
    const title = titleFromSlug(slug);
    return (
      <div>
        <header className="vector-page-titlebar">
          <h1 className="mw-first-heading" style={{ color: "var(--color-destructive)" }}>
            {title}
          </h1>
        </header>

        <div className="mw-body-content" style={{ marginTop: "1em" }}>
          <p style={{ fontSize: "0.875rem", marginBottom: "1.5em" }}>
            <b>Wrongipedia does not have an article with this exact name.</b>
          </p>

          <div style={{
            border: "1px solid var(--border-muted)",
            padding: "1.2em 1.5em",
            background: "var(--bg-neutral-subtle)",
            fontSize: "0.875rem",
            lineHeight: "1.8",
            marginBottom: "2em",
          }}>
            <p style={{ margin: "0 0 0.5em 0" }}>You may want to:</p>
            <ul style={{ margin: "0 0 0 1.6em", padding: 0 }}>
              <li>
                <Link href={`/search?q=${encodeURIComponent(title)}`}>
                  Search for &quot;{title}&quot;
                </Link>{" "}
                in existing articles
              </li>
              <li>
                <Link href={`/create?title=${encodeURIComponent(title)}`}>
                  <b>Create the article &quot;{title}&quot;</b>
                </Link>
              </li>
              <li>
                <Link href="/search">
                  Search for related articles
                </Link>
              </li>
            </ul>
          </div>

          <div style={{
            fontSize: "0.8rem",
            color: "var(--color-subtle)",
            borderTop: "1px solid var(--border-muted)",
            paddingTop: "0.8em",
          }}>
            <p>
              If you think this article should exist, you can{" "}
              <Link href={`/create?title=${encodeURIComponent(title)}`}>create it</Link>{" "}
              and fill it with wonderfully wrong information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { article, categories, isSeed } = result;

  let html = addHeadingIds(article.content || "");
  html = processWikiLinks(html, knownSlugs);
  html = addEditSectionLinks(html, slug);
  html = fixInfoboxColspan(html);
  html = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "span", "details", "summary"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["id", "class", "title"], img: ["src", "alt", "width", "height"], a: ["href", "class", "title", "rel"], td: ["colspan", "rowspan", "class", "style"], th: ["colspan", "rowspan", "class", "style", "scope"], table: ["class", "style"], span: ["class", "style"] },
    allowedSchemes: ["http", "https"],
  });
  const toc = generateTOC(html);

  // Disambiguation hatnote for common-word articles
  const showDisambiguation = disambiguationSlugs.has(slug);

  // Navboxes: get related articles grouped by category
  const categorySlugs = (categories as any[]).map((c: any) => c.slug).filter(Boolean);
  const navboxes = getNavboxesForArticle(slug, categorySlugs);

  return (
    <>
      {/* Titlebar — Wikipedia: vector-page-titlebar (h1 + language button) */}
      <header className="vector-page-titlebar">
        <h1 className="mw-first-heading">
          <span className="mw-page-title-main">{article.title}</span>
          {article.is_featured && (
            <span className="featured-star" title="This is a featured article">★</span>
          )}
        </h1>
        <div className="mw-portlet-lang">
          <span className="mw-language-btn">
            <svg viewBox="0 0 20 20" width="14" height="14"><path d="M20 18h-1.44a.6.6 0 01-.4-.12.8.8 0 01-.23-.31L17 15h-5l-1 2.54a.8.8 0 01-.22.3.6.6 0 01-.4.16H9l4.66-11.95h2.08zm-5.55-4.5h3.1L16 9.45zM4.95 8.7a.6.6 0 01-.15-.46l.07-.51a.7.7 0 01.15-.36.6.6 0 01.4-.18h5.8a.44.44 0 01.32.14.4.4 0 01.12.32v.4a.5.5 0 01-.09.3l-2.7 3.72a6.3 6.3 0 011.94.57 5 5 0 011.52 1.08.6.6 0 01.1.18.5.5 0 010 .2l-.18.63a.4.4 0 01-.15.24.3.3 0 01-.27.05 5 5 0 01-1.7-1.1 5.6 5.6 0 01-1.6 1.1.3.3 0 01-.27-.06.4.4 0 01-.15-.23l-.18-.56a.5.5 0 01-.01-.2.4.4 0 01.1-.17 5.2 5.2 0 001.2-1.05L5.9 9.23A.7.7 0 014.95 8.7z" fill="currentColor"/></svg>
            3 languages
          </span>
        </div>
      </header>

      {/* Tabs — Wikipedia: vector-page-toolbar (hidden on mobile in Minerva, replaced by page actions) */}
      <ArticleTabs slug={slug} editable={true} />

      {/* Mobile page actions bar — Language/Watch/Edit icons (Minerva style, hidden on desktop) */}
      <MobilePageActions slug={slug} />

      {/* Body content — Wikipedia: #bodyContent > #siteSub + #mw-content-text */}
      <div className="vector-body">
        <div className="vector-body-before-content">
          <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
        </div>

        <div className="mw-body-content">
          {/* Disambiguation hatnote */}
          {showDisambiguation && (
            <div className="hatnote" style={{ marginBottom: "0.3em" }}>
              This article is about the most wrong interpretation. For other wrong uses, see{" "}
              <Link
                href={`/search?q=${encodeURIComponent(article.title)}`}
                style={{ color: "var(--color-progressive)" }}
              >
                {article.title} (disambiguation)
              </Link>
              .
            </div>
          )}

          {article.summary && (
            <div className="hatnote">
              {article.summary}
            </div>
          )}

          {/* Table of Contents (in-article, visible only on mobile — desktop uses sidebar TOC) */}
          {toc.length > 2 && (
            <div className="inline-toc-wrapper">
              <ArticleTOC items={toc} />
            </div>
          )}

          {/* Article content — collapsible sections on mobile */}
          <MobileCollapsibleContent html={html} />

          {/* Stub notice for shorter articles */}
          {article.content && article.content.length < 2000 && (
            <div className="ambox ambox-stub">
              <div className="ambox-inner">
                <div className="ambox-image">&#128221;</div>
                <div className="ambox-text">
                  This article about wrong information is a <b>stub</b>. You can help Wrongipedia by{' '}
                  <Link href={`/wiki/${slug}/edit`}>expanding it with more wrong facts</Link>.
                </div>
              </div>
            </div>
          )}

          {/* Navboxes */}
          {navboxes.length > 0 && (
            <div style={{ marginTop: "2em", clear: "both" }}>
              {navboxes.map((navbox, i) => (
                <Navbox
                  key={i}
                  title={navbox.title}
                  items={navbox.items}
                  currentSlug={slug}
                />
              ))}
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mw-categories">
              <strong>Categories: </strong>
              {categories.map((cat: any, i: number) => (
                <span key={cat.slug || i}>
                  {i > 0 && " | "}
                  <Link href={`/category/${cat.slug}`}>
                    {cat.name}
                  </Link>
                </span>
              ))}
            </div>
          )}

          {/* Last modified bar — Minerva style (visible on mobile, subtle on desktop) */}
          <Link
            href={`/wiki/${slug}/history`}
            className="last-modified-bar"
          >
            <svg viewBox="0 0 20 20" width="16" height="16" style={{ flexShrink: 0 }}>
              <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 10.5V5H9v6.28l4.36 2.52 1-1.73z" fill="currentColor" />
            </svg>
            <span className="last-modified-bar__text">
              Last edited on{" "}
              {new Date(article.updated_at).toLocaleDateString("en-US", {
                day: "numeric", month: "long", year: "numeric",
              })}
              {article.profiles && (
                <>, by {(article.profiles as any).username}</>
              )}
            </span>
            <svg viewBox="0 0 20 20" width="12" height="12" className="last-modified-bar__arrow">
              <path d="M7 1l9 9-9 9" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Link>

          {/* Article footer info */}
          <div className="mw-article-footer">
            <p>Content is available under <Link href="/about">CC BY-SA 4.0</Link> unless otherwise noted.</p>
          </div>
        </div>
      </div>
    </>
  );
}
