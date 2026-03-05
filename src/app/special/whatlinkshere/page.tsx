"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { seedArticles } from "@/lib/seed-data";
import Link from "next/link";

function WhatLinksHereContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const [links, setLinks] = useState<{ title: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function findLinks() {
      if (!page) {
        setLoading(false);
        return;
      }

      const found: { title: string; slug: string }[] = [];

      // Search seed articles for wiki links to this page
      for (const article of seedArticles) {
        if (article.slug === page) continue;
        const content = article.content || "";
        // Check for [[Target]] or [[Target|Label]] wiki link patterns
        const escapedPage = page.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const linkPattern = new RegExp(`\\[\\[${escapedPage.replace(/-/g, "[\\s_-]")}(\\|[^\\]]+)?\\]\\]`, "i");
        const slugPattern = new RegExp(`href="/wiki/${page}"`, "i");
        if (linkPattern.test(content) || slugPattern.test(content)) {
          found.push({ title: article.title, slug: article.slug });
        }
      }

      // Also check Supabase articles
      try {
        const supabase = createClient();
        const { data: articles } = await supabase
          .from("articles")
          .select("title, slug, content")
          .neq("slug", page);

        if (articles) {
          for (const article of articles) {
            if (found.some((f) => f.slug === article.slug)) continue;
            const content = article.content || "";
            if (content.includes(`/wiki/${page}`) || content.toLowerCase().includes(`[[${page.replace(/-/g, " ")}`)) {
              found.push({ title: article.title, slug: article.slug });
            }
          }
        }
      } catch {}

      setLinks(found);
      setLoading(false);
    }
    findLinks();
  }, [page]);

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">
        Pages that link to &quot;{page.replace(/-/g, " ")}&quot;
      </h1>

      {loading ? (
        <p style={{ fontFamily: "sans-serif", color: "var(--color-subtle)" }}>Searching...</p>
      ) : links.length === 0 ? (
        <div className="wiki-notice wiki-notice-info">
          No pages link to <b>{page.replace(/-/g, " ")}</b>.
        </div>
      ) : (
        <>
          <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "1em" }}>
            The following {links.length} page{links.length !== 1 ? "s" : ""} link to{" "}
            <Link href={`/wiki/${page}`}>{page.replace(/-/g, " ")}</Link>:
          </p>
          <ul style={{ marginLeft: "1.6em" }}>
            {links.map((link) => (
              <li key={link.slug} style={{ marginBottom: "0.3em" }}>
                <Link href={`/wiki/${link.slug}`} className="wiki-link">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function WhatLinksHerePage() {
  return (
    <Suspense fallback={<div className="wiki-container">Loading...</div>}>
      <WhatLinksHereContent />
    </Suspense>
  );
}
