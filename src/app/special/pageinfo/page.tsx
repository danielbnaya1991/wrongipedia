"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { seedArticles } from "@/lib/seed-data";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface PageInfo {
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  word_count: number;
  is_featured: boolean;
  created_by: string | null;
  revision_count: number;
}

function PageInfoContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const [info, setInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInfo() {
      if (!page) {
        setLoading(false);
        return;
      }

      // Try Supabase first
      try {
        const supabase = createClient();
        const { data: article } = await supabase
          .from("articles")
          .select("*, profiles(username)")
          .eq("slug", page)
          .single();

        if (article) {
          const { count } = await supabase
            .from("article_revisions")
            .select("id", { count: "exact", head: true })
            .eq("article_id", article.id);

          const content = (article.content || "").replace(/<[^>]+>/g, " ");
          const wordCount = content.split(/\s+/).filter(Boolean).length;

          setInfo({
            title: article.title,
            slug: article.slug,
            created_at: article.created_at,
            updated_at: article.updated_at,
            view_count: article.view_count || 0,
            word_count: wordCount,
            is_featured: article.is_featured || false,
            created_by: (article.profiles as any)?.username || null,
            revision_count: count || 1,
          });
          setLoading(false);
          return;
        }
      } catch {}

      // Fallback to seed data
      const seedArticle = seedArticles.find((a) => a.slug === page);
      if (seedArticle) {
        const content = (seedArticle.content || "").replace(/<[^>]+>/g, " ");
        const wordCount = content.split(/\s+/).filter(Boolean).length;

        setInfo({
          title: seedArticle.title,
          slug: seedArticle.slug,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          view_count: seedArticle.view_count,
          word_count: wordCount,
          is_featured: seedArticle.is_featured || false,
          created_by: null,
          revision_count: 1,
        });
      }
      setLoading(false);
    }
    loadInfo();
  }, [page]);

  if (loading) {
    return <div className="wiki-container">Loading page information...</div>;
  }

  if (!info) {
    return (
      <div className="wiki-container">
        <h1 className="wiki-heading">Page information</h1>
        <div className="wiki-notice wiki-notice-warning">
          No information available for &quot;{page.replace(/-/g, " ")}&quot;.
        </div>
      </div>
    );
  }

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">
        Information for &quot;<Link href={`/wiki/${info.slug}`}>{info.title}</Link>&quot;
      </h1>

      <table className="wikitable" style={{ width: "100%", maxWidth: "600px" }}>
        <tbody>
          <tr>
            <th style={{ textAlign: "left", width: "40%" }}>Page title</th>
            <td>{info.title}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Page URL slug</th>
            <td><code>/wiki/{info.slug}</code></td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Created</th>
            <td>{formatDate(info.created_at)}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Last edited</th>
            <td>{formatDate(info.updated_at)}</td>
          </tr>
          {info.created_by && (
            <tr>
              <th style={{ textAlign: "left" }}>Created by</th>
              <td><Link href={`/user/${info.created_by}`}>{info.created_by}</Link></td>
            </tr>
          )}
          <tr>
            <th style={{ textAlign: "left" }}>Total edits</th>
            <td>{info.revision_count}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Page views</th>
            <td>{info.view_count.toLocaleString()}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Word count</th>
            <td>{info.word_count.toLocaleString()}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Featured article</th>
            <td>{info.is_featured ? "Yes ★" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function PageInfoPage() {
  return (
    <Suspense fallback={<div className="wiki-container">Loading...</div>}>
      <PageInfoContent />
    </Suspense>
  );
}
