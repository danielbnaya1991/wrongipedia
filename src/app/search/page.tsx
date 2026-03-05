import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { seedArticles } from "@/lib/seed-data";
import type { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}"` : "Search",
    description: q ? `Wrong search results for "${q}" on Wrongipedia.` : "Search Wrongipedia for wrong information.",
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || "";

  let results: any[] = [];

  if (query) {
    try {
      const supabase = await createClient();

      const { data } = await supabase
        .from("articles")
        .select("title, slug, summary, updated_at")
        .textSearch("fts", query.split(" ").join(" & "))
        .limit(20);

      if (data && data.length > 0) results = data;

      // Fallback to ilike
      if (results.length === 0) {
        const { data: ilikeData } = await supabase
          .from("articles")
          .select("title, slug, summary, updated_at")
          .ilike("title", `%${query}%`)
          .limit(20);
        if (ilikeData && ilikeData.length > 0) results = ilikeData;
      }
    } catch {}

    // Fallback to seed data search
    if (results.length === 0) {
      const q = query.toLowerCase();
      results = seedArticles
        .filter((a) =>
          a.title.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q)
        )
        .map((a) => ({
          title: a.title,
          slug: a.slug,
          summary: a.summary,
          updated_at: new Date().toISOString(),
        }));
    }
  }

  return (
    <div className="wiki-container">
      <h1 className="text-2xl wiki-heading mb-4">Search results</h1>

      {query ? (
        <>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'sans-serif' }}>
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>

          {results.length === 0 ? (
            <div>
              <p className="mb-4">No articles found matching your search.</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.9em' }}>
                You can{" "}
                <Link href={`/create`} className="wiki-link">
                  create this article
                </Link>
                {" "}or{" "}
                <Link href={`/generate?topic=${encodeURIComponent(query)}`} className="wiki-link">
                  generate one with AI
                </Link>
                .
              </p>
            </div>
          ) : (
            <div>
              {results.map((article) => (
                <div key={article.slug} className="wiki-search-result">
                  <h3>
                    <Link href={`/wiki/${article.slug}`} className="wiki-link text-lg">
                      {article.title}
                    </Link>
                  </h3>
                  {article.summary && <p>{article.summary}</p>}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p style={{ fontFamily: 'sans-serif' }}>Enter a search term to find articles.</p>
      )}
    </div>
  );
}
