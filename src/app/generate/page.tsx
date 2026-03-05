"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";

function GeneratorForm() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState(searchParams.get("topic") || "");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAI() {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: "__ping__" }),
        });
        if (res.status === 500 || res.status === 503) {
          const data = await res.json();
          if (data.error?.includes("API key") || data.error?.includes("configured") || data.error?.includes("ANTHROPIC")) {
            setAiAvailable(false);
            return;
          }
        }
        setAiAvailable(true);
      } catch {
        setAiAvailable(false);
      }
    }
    checkAI();
  }, []);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setGenerating(true);
    setError("");
    setGeneratedContent("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        setGenerating(false);
        return;
      }

      setGeneratedContent(data.content);
    } catch {
      setError("Failed to generate article. Please try again.");
    }
    setGenerating(false);
  }

  async function handleSaveAsArticle() {
    if (!generatedContent) return;
    setSaving(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login?redirect=/generate");
      return;
    }

    const slug = slugify(topic);

    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      setError("An article with this title already exists. Choose a different topic.");
      setSaving(false);
      return;
    }

    const { data: article, error: insertError } = await supabase
      .from("articles")
      .insert({
        title: topic.trim(),
        slug,
        content: generatedContent,
        summary: `An entirely wrong article about ${topic.trim()}`,
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
        content: generatedContent,
        summary: `An entirely wrong article about ${topic.trim()}`,
        edited_by: user.id,
        edit_comment: "AI-generated article",
      });
    } catch {}

    router.push(`/wiki/${slug}`);
  }

  return (
    <div className="wiki-container max-w-4xl">
      <h1 className="text-2xl wiki-heading mb-4">AI Article Generator</h1>

      {aiAvailable === false && (
        <div className="wiki-notice wiki-notice-warning mb-4">
          <b>AI generation is currently unavailable.</b> The server does not have an AI API key configured.
          You can still <a href="/create">create articles manually</a>.
        </div>
      )}

      <div className="wiki-notice wiki-notice-info mb-4">
        Enter any topic and our AI will generate a hilariously wrong encyclopedia article about it.
        Every fact will be confidently incorrect!
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="wiki-input flex-1 text-lg"
          placeholder="e.g. The Moon, Coffee, Ancient Egypt, Basketball..."
          onKeyDown={(e) => e.key === "Enter" && aiAvailable !== false && handleGenerate()}
          disabled={aiAvailable === false}
        />
        <button
          onClick={handleGenerate}
          disabled={generating || !topic.trim() || aiAvailable === false}
          className="wiki-btn wiki-btn-primary"
        >
          {generating ? "Generating..." : "Generate"}
        </button>
      </div>

      {generating && (
        <div className="text-center py-8" style={{ fontFamily: 'sans-serif' }}>
          <div className="text-lg mb-2">Generating wrong facts about &quot;{topic}&quot;...</div>
          <div className="text-sm text-gray-500">Our AI is consulting its collection of incorrect encyclopedias</div>
        </div>
      )}

      {generatedContent && (
        <div>
          <h2 className="text-xl wiki-heading mb-3">Preview: {topic}</h2>

          <div className="border border-[var(--wiki-border)] bg-white p-6 mb-4">
            <div
              className="wiki-content"
              dangerouslySetInnerHTML={{ __html: generatedContent }}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleSaveAsArticle} disabled={saving} className="wiki-btn wiki-btn-primary">
              {saving ? "Saving..." : "Save as article"}
            </button>
            <button onClick={handleGenerate} className="wiki-btn">
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="wiki-container">Loading...</div>}>
      <GeneratorForm />
    </Suspense>
  );
}
