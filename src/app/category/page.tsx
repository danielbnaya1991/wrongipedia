import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { seedCategories, seedArticleCategories } from "@/lib/seed-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories — Wrongipedia",
  description: "Browse all categories of wrong information on Wrongipedia.",
};

export default async function CategoriesPage() {
  let categories: any[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("categories").select("*").order("name");
    if (data && data.length > 0) categories = data;
  } catch {}

  if (categories.length === 0) {
    categories = seedCategories;
  }

  // Count articles per category from seed data for display
  const articleCounts: Record<string, number> = {};
  for (const [, catSlugs] of Object.entries(seedArticleCategories)) {
    for (const cs of catSlugs) {
      articleCounts[cs] = (articleCounts[cs] || 0) + 1;
    }
  }

  return (
    <div className="wiki-container">
      <div className="mw-body-header">
        <h1 className="mw-first-heading">All Categories</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content" style={{ marginTop: "1em" }}>
        <p style={{ fontSize: "0.875rem", marginBottom: "1em" }}>
          The following {categories.length} categories contain articles of entirely wrong information,
          sorted with great confidence in their inaccuracy.
        </p>

        {categories.length === 0 ? (
          <p style={{ color: "var(--color-subtle)", fontFamily: "var(--font-sans)", fontSize: "0.875rem" }}>
            No categories yet. Categories will appear as articles are created.
          </p>
        ) : (
          <div className="mw-category-columns" style={{
            columnCount: 3,
            columnGap: "1.5em",
            fontSize: "0.875rem",
          }}>
            {categories.map((cat) => (
              <div key={cat.slug} style={{
                breakInside: "avoid",
                marginBottom: "1em",
                paddingBottom: "0.5em",
                borderBottom: "1px solid var(--border-muted)",
              }}>
                <Link href={`/category/${cat.slug}`} style={{
                  color: "var(--color-progressive)",
                  fontWeight: 500,
                }}>
                  {cat.name}
                </Link>
                {articleCounts[cat.slug] && (
                  <span style={{
                    color: "var(--color-subtle)",
                    fontSize: "0.8em",
                    marginLeft: "0.5em",
                  }}>
                    ({articleCounts[cat.slug]} article{articleCounts[cat.slug] !== 1 ? "s" : ""})
                  </span>
                )}
                {cat.description && (
                  <div style={{
                    color: "var(--color-subtle)",
                    fontSize: "0.8em",
                    marginTop: "2px",
                    lineHeight: "1.4",
                  }}>
                    {cat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
