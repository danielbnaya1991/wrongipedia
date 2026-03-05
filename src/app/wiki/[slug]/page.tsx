import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { addHeadingIds, processWikiLinks, generateTOC } from "@/lib/utils";
import ArticleTabs from "@/components/ArticleTabs";
import ArticleTOC from "@/components/ArticleTOC";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { Metadata } from "next";
import { seedArticles, seedArticleCategories, seedCategories } from "@/lib/seed-data";

const knownSlugs = new Set(seedArticles.map((a) => a.slug));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticle(slug);
  if (!result) return { title: "Article Not Found — Wrongipedia" };
  return {
    title: `${result.article.title} — Wrongipedia`,
    description: result.article.summary || `An entirely wrong article about ${result.article.title}`,
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getArticle(slug);

  if (!result) notFound();

  const { article, categories, isSeed } = result;

  let html = addHeadingIds(article.content || "");
  html = processWikiLinks(html, knownSlugs);
  if (!isSeed) {
    html = addEditSectionLinks(html, slug);
  }
  html = DOMPurify.sanitize(html);
  const toc = generateTOC(html);

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
