import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { seedCategories, seedArticleCategories, seedArticles } from "@/lib/seed-data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = seedCategories.find((c) => c.slug === slug);
  return {
    title: cat ? `Category: ${cat.name} — Wrongipedia` : "Category — Wrongipedia",
    description: cat?.description || `Browse wrong articles in this category on Wrongipedia.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let category: any = null;
  let articles: any[] = [];

  try {
    const supabase = await createClient();

    const { data: cat } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (cat) {
      category = cat;
      const { data: articleCategories } = await supabase
        .from("article_categories")
        .select("articles(id, title, slug, summary)")
        .eq("category_id", cat.id);

      articles = articleCategories?.map((ac: any) => ac.articles).filter(Boolean) || [];
    }
  } catch {}

  // Fallback to seed data
  if (!category) {
    category = seedCategories.find((c) => c.slug === slug);
    if (!category) notFound();

    // Find articles in this category
    articles = Object.entries(seedArticleCategories)
      .filter(([, cats]) => cats.includes(slug))
      .map(([articleSlug]) => seedArticles.find((a) => a.slug === articleSlug))
      .filter(Boolean)
      .map((a: any) => ({ id: a.slug, title: a.title, slug: a.slug, summary: a.summary }));
  }

  // Sort articles alphabetically
  articles.sort((a: any, b: any) => a.title.localeCompare(b.title));

  // Find subcategories: categories that share articles with this one
  const relatedCategorySlugs = new Set<string>();
  for (const article of articles) {
    const artCats = seedArticleCategories[article.slug] || [];
    for (const cs of artCats) {
      if (cs !== slug) relatedCategorySlugs.add(cs);
    }
  }
  const subcategories = Array.from(relatedCategorySlugs)
    .map((cs) => seedCategories.find((c) => c.slug === cs))
    .filter(Boolean)
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  return (
    <div className="wiki-container">
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Category:{category.name}</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content" style={{ marginTop: "1em" }}>
        {category.description && (
          <p style={{
            fontSize: "0.875rem",
            marginBottom: "1.5em",
            lineHeight: "1.6",
          }}>
            {category.description}
          </p>
        )}

        {/* Subcategories section */}
        {subcategories.length > 0 && (
          <div style={{ marginBottom: "1.5em" }}>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.3em",
              fontWeight: "normal",
              borderBottom: "1px solid var(--border-muted)",
              paddingBottom: "0.2em",
              marginBottom: "0.5em",
            }}>
              Subcategories
            </h2>
            <p style={{
              fontSize: "0.8rem",
              color: "var(--color-subtle)",
              marginBottom: "0.5em",
            }}>
              This category has the following {subcategories.length} related{" "}
              {subcategories.length === 1 ? "category" : "categories"}.
            </p>
            <div style={{
              columnCount: 3,
              columnGap: "1.5em",
              fontSize: "0.875rem",
            }}>
              {subcategories.map((sub: any) => (
                <div key={sub.slug} style={{
                  breakInside: "avoid",
                  marginBottom: "0.3em",
                }}>
                  <Link href={`/category/${sub.slug}`} style={{
                    color: "var(--color-progressive)",
                  }}>
                    {sub.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles section */}
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.3em",
          fontWeight: "normal",
          borderBottom: "1px solid var(--border-muted)",
          paddingBottom: "0.2em",
          marginBottom: "0.5em",
        }}>
          Pages in category &quot;{category.name}&quot;
        </h2>

        {articles.length === 0 ? (
          <p style={{
            color: "var(--color-subtle)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
          }}>
            This category currently contains no articles.
          </p>
        ) : (
          <>
            <p style={{
              fontSize: "0.8rem",
              color: "var(--color-subtle)",
              marginBottom: "0.8em",
            }}>
              The following {articles.length}{" "}
              {articles.length === 1 ? "page is" : "pages are"} in this category.
            </p>
            <div className="mw-category-columns" style={{
              columnCount: 3,
              columnGap: "1.5em",
              fontSize: "0.875rem",
            }}>
              {articles.map((article: any) => (
                <div key={article.slug} style={{
                  breakInside: "avoid",
                  marginBottom: "0.4em",
                }}>
                  <Link href={`/wiki/${article.slug}`} style={{
                    color: "var(--color-progressive)",
                  }}>
                    {article.title}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
