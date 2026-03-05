import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import ArticleTabs from "@/components/ArticleTabs";
import Link from "next/link";
import DiffViewer from "@/components/DiffViewer";
import { seedArticles } from "@/lib/seed-data";

async function getArticleHistory(slug: string) {
  try {
    const supabase = await createClient();
    const { data: article } = await supabase
      .from("articles")
      .select("id, title")
      .eq("slug", slug)
      .single();

    if (article) {
      const { data: revisions } = await supabase
        .from("article_revisions")
        .select("*, profiles(*)")
        .eq("article_id", article.id)
        .order("created_at", { ascending: false });
      return { title: article.title, revisions: revisions || [] };
    }
  } catch {}

  const seedArticle = seedArticles.find((a) => a.slug === slug);
  if (!seedArticle) return null;
  return { title: seedArticle.title, revisions: [] };
}

export default async function HistoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getArticleHistory(slug);

  if (!result) notFound();

  const { title, revisions } = result;

  return (
    <div>
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Revision history of &quot;{title}&quot;</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <ArticleTabs slug={slug} />

      <div className="mw-body-content">
        {revisions.length === 0 ? (
          <p style={{ color: 'var(--color-subtle)', fontFamily: 'sans-serif' }}>
            No revision history available for this article.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
            {revisions.map((rev: any, i: number) => (
              <div key={rev.id} style={{
                border: '1px solid var(--border-base)',
                padding: '0.75em',
                background: 'var(--bg-base)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em', fontSize: '0.875rem', fontFamily: 'sans-serif' }}>
                  <span style={{ color: 'var(--color-subtle)' }}>{formatDate(rev.created_at)}</span>
                  {rev.profiles && (
                    <Link href={`/user/${rev.profiles.username}`} style={{ color: 'var(--color-progressive)' }}>
                      {rev.profiles.username}
                    </Link>
                  )}
                  {rev.edit_comment && (
                    <span style={{ fontStyle: 'italic', color: 'var(--color-subtle)' }}>({rev.edit_comment})</span>
                  )}
                </div>
                {i < revisions.length - 1 && (
                  <DiffViewer
                    oldText={revisions[i + 1].content}
                    newText={rev.content}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
