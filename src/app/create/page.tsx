"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import dynamic from "next/dynamic";
const ArticleEditor = dynamic(() => import("@/components/ArticleEditor"), { ssr: false, loading: () => <div style={{ border: '1px solid var(--border-muted)', padding: '1em', color: 'var(--color-subtle)' }}>Loading editor...</div> });
import Link from "next/link";

function CreateArticleForm() {
  const searchParams = useSearchParams();
  const prefillTitle = searchParams.get("title") || "";
  const [title, setTitle] = useState(prefillTitle);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    }
    checkAuth();
  }, []);

  async function handleCreate() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login?redirect=/create");
      return;
    }

    const slug = slugify(title);

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      setError("An article with this title already exists");
      setSaving(false);
      return;
    }

    const { data: article, error: insertError } = await supabase
      .from("articles")
      .insert({
        title,
        slug,
        content,
        summary,
        created_by: user.id,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    // Save initial revision
    try {
      await supabase.from("article_revisions").insert({
        article_id: article.id,
        content,
        summary,
        edited_by: user.id,
        edit_comment: "Article created",
      });
    } catch {}

    router.push(`/wiki/${slug}`);
  }

  return (
    <div className="wiki-container">
      <h1 className="text-2xl wiki-heading mb-4">Create a new article</h1>

      {isLoggedIn === false && (
        <div className="wiki-notice wiki-notice-warning mb-4">
          You must be <Link href="/auth/login?redirect=/create"><b>logged in</b></Link> to create articles.{' '}
          Don&apos;t have an account? <Link href="/auth/signup">Create one</Link>.
        </div>
      )}

      <div className="wiki-notice wiki-notice-info mb-4">
        Remember: Everything on Wrongipedia must be wrong. The more confidently incorrect, the better!
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ fontFamily: 'sans-serif' }}>
          Article title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="wiki-input w-full text-lg"
          placeholder="e.g. Quantum Sandwich Theory"
          disabled={isLoggedIn === false}
        />
        {title && (
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'sans-serif' }}>
            URL: /wiki/{slugify(title)}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ fontFamily: 'sans-serif' }}>
          Summary
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="wiki-input w-full"
          placeholder="Brief description of the article"
          disabled={isLoggedIn === false}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ fontFamily: 'sans-serif' }}>
          Content
        </label>
        <ArticleEditor content={content} onChange={setContent} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCreate}
          disabled={saving || isLoggedIn === false}
          className="wiki-btn wiki-btn-primary"
        >
          {saving ? "Creating..." : "Create article"}
        </button>
        <button onClick={() => router.back()} className="wiki-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<div className="wiki-container">Loading...</div>}>
      <CreateArticleForm />
    </Suspense>
  );
}
