import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { seedCategories, seedArticleCategories, seedArticles } from "@/lib/seed-data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = seedCategories.find((c) => c.slug === slug);
  return {
    title: cat ? `Category: ${cat.name}` : "Category",
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

  return (
    <div className="wiki-container">
      <h1 className="text-2xl wiki-heading mb-2">Category: {category.name}</h1>

      {category.description && (
        <p className="text-gray-600 mb-4">{category.description}</p>
      )}

      {articles.length === 0 ? (
        <p className="text-gray-500" style={{ fontFamily: 'sans-serif' }}>
          No articles in this category yet.
        </p>
      ) : (
        <ul className="ml-6 list-disc">
          {articles.map((article: any) => (
            <li key={article.slug} className="mb-2">
              <Link href={`/wiki/${article.slug}`} className="wiki-link">
                {article.title}
              </Link>
              {article.summary && (
                <span className="text-sm text-gray-500"> — {article.summary}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
