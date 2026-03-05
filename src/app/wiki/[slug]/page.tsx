import { createClient } from "@/lib/supabase/server";
import { addHeadingIds, processWikiLinks, generateTOC } from "@/lib/utils";
import ArticleTabs from "@/components/ArticleTabs";
import ArticleTOC from "@/components/ArticleTOC";
import Navbox from "@/components/Navbox";
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
        <div className="mw-body-header">
          <h1 className="mw-first-heading" style={{ color: "var(--color-destructive)" }}>
            {title}
          </h1>
        </div>

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
  if (!isSeed) {
    html = addEditSectionLinks(html, slug);
  }
  html = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "span", "details", "summary"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["id", "class", "style", "title"], img: ["src", "alt", "width", "height"], a: ["href", "class", "title"] },
    allowedSchemes: ["http", "https"],
  });
  const toc = generateTOC(html);

  // Disambiguation hatnote for common-word articles
  const showDisambiguation = disambiguationSlugs.has(slug);

  // Navboxes: get related articles grouped by category
  const categorySlugs = (categories as any[]).map((c: any) => c.slug).filter(Boolean);
  const navboxes = getNavboxesForArticle(slug, categorySlugs);

  return (
    <div>
      {/* Article header */}
      <div className="mw-body-header">
        <h1 className="mw-first-heading">
          {article.title}
          {article.is_featured && (
            <span className="featured-star" title="This is a featured article">★</span>
          )}
        </h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      {/* Tabs */}
      <ArticleTabs slug={slug} editable={!isSeed} />

      {/* Body content */}
      <div className="mw-body-content">
        {/* Disambiguation hatnote */}
        {showDisambiguation && (
          <div className="hatnote" style={{ marginBottom: "0.3em" }}>
            For other uses, see{" "}
            <Link
              href={`/wiki/${slug}`}
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

        {/* Table of Contents (in-article) */}
        {toc.length > 2 && <ArticleTOC items={toc} />}

        {/* Article content */}
        <div
          className="mw-parser-output clearfix"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Stub notice for shorter articles */}
        {article.content && article.content.length < 2000 && (
          <div className="ambox ambox-stub">
            <div className="ambox-inner">
              <div className="ambox-image">&#128221;</div>
              <div className="ambox-text">
                This article about wrong information is a <b>stub</b>. You can help Wrongipedia by{' '}
                <Link href={isSeed ? "/create" : `/wiki/${slug}/edit`}>expanding it with more wrong facts</Link>.
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

        {/* Article footer info */}
        <div style={{ marginTop: '2em', paddingTop: '0.5em', borderTop: '1px solid var(--border-muted)', fontSize: '0.75rem', color: 'var(--color-subtle)' }}>
          <p>
            This page was last edited on{" "}
            {new Date(article.updated_at).toLocaleDateString("en-US", {
              day: "numeric", month: "long", year: "numeric",
            })}
            {article.profiles && (
              <>, by <Link href={`/user/${(article.profiles as any).username}`}>{(article.profiles as any).username}</Link></>
            )}
          </p>
          <p>{(article.view_count ?? 0).toLocaleString()} views</p>
        </div>
      </div>
    </div>
  );
}
