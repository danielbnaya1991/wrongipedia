"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { seedArticles } from "@/lib/seed-data";
import dynamic from "next/dynamic";
const ArticleEditor = dynamic(() => import("@/components/ArticleEditor"), { ssr: false, loading: () => <div style={{ border: '1px solid var(--border-muted)', padding: '1em', color: 'var(--color-subtle)' }}>Loading editor...</div> });
import ArticleTabs from "@/components/ArticleTabs";

export default function EditArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [editComment, setEditComment] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [articleId, setArticleId] = useState("");
  const [isSeedArticle, setIsSeedArticle] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsAnonymous(!user);

      try {
        const { data: article } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (article) {
          setContent(article.content || "");
          setSummary(article.summary || "");
          setArticleId(article.id);
          setLoading(false);
          return;
        }
      } catch {}

      // Fallback to seed data — seed articles are now editable
      const seedArticle = seedArticles.find((a) => a.slug === slug);
      if (seedArticle) {
        setContent(seedArticle.content || "");
        setSummary(seedArticle.summary || "");
        setIsSeedArticle(true);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          content,
          summary,
          editComment,
          isMinor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save");
        setSaving(false);
        return;
      }

      router.push(`/wiki/${slug}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <ArticleTabs slug={slug} />
        <div className="wiki-container">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <ArticleTabs slug={slug} />
      <div className="wiki-container">
        <h1 className="text-2xl wiki-heading mb-4">Editing article</h1>

        {isAnonymous && (
          <div className="wiki-notice wiki-notice-warning mb-4" style={{ fontSize: '0.875rem' }}>
            <strong>You are not logged in.</strong> Your IP address will be recorded with this edit.{' '}
            <a href={`/auth/login?redirect=/wiki/${slug}/edit`} style={{ color: 'var(--color-progressive)' }}>Log in</a> or{' '}
            <a href="/auth/signup" style={{ color: 'var(--color-progressive)' }}>create an account</a> to have your edits attributed to your username.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" style={{ fontFamily: 'sans-serif' }}>
            Article summary
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="wiki-input w-full"
            placeholder="Brief description of the article"
          />
        </div>

        <ArticleEditor content={content} onChange={setContent} />

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" style={{ fontFamily: 'sans-serif' }}>
            Edit summary (describe your changes)
          </label>
          <input
            type="text"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            className="wiki-input w-full"
            placeholder="What did you change?"
          />
        </div>

        <div className="mt-3">
          <label style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <input
              type="checkbox"
              checked={isMinor}
              onChange={(e) => setIsMinor(e.target.checked)}
            />
            This is a minor edit
          </label>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={handleSave} disabled={saving} className="wiki-btn wiki-btn-primary">
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button onClick={() => router.back()} className="wiki-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
