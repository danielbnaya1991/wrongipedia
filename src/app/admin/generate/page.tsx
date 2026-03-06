"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { topicsByCategory, getAllCategories } from "@/lib/topic-lists";
import { slugify } from "@/lib/utils";
import Link from "next/link";

interface GenerationResult {
  topic: string;
  status: "pending" | "generating" | "success" | "error" | "skipped";
  slug?: string;
  error?: string;
}

export default function AdminGeneratePage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [generating, setGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const categories = getAllCategories();

  useEffect(() => {
    async function checkAdmin() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }
      // Check admin status via API
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        setIsAdmin(data.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);

  function getTopicsForSelection(): GenerationResult[] {
    const topics: GenerationResult[] = [];
    for (const cat of selectedCategories) {
      const catTopics = topicsByCategory[cat] || [];
      for (const topic of catTopics) {
        topics.push({ topic, status: "pending" });
      }
    }
    return topics;
  }

  async function startGeneration() {
    const topics = getTopicsForSelection();
    setResults(topics);
    setGenerating(true);
    setCurrentIndex(0);

    const supabase = createClient();

    for (let i = 0; i < topics.length; i++) {
      setCurrentIndex(i);
      const topic = topics[i];
      const slug = slugify(topic.topic);

      // Check if article already exists
      const { data: existing } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", slug)
        .single();

      if (existing) {
        topics[i] = { ...topic, status: "skipped", slug, error: "Already exists" };
        setResults([...topics]);
        continue;
      }

      topics[i] = { ...topic, status: "generating" };
      setResults([...topics]);

      try {
        // Generate content via API
        const genRes = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: topic.topic }),
        });

        if (!genRes.ok) {
          const err = await genRes.json();
          topics[i] = { ...topic, status: "error", error: err.error || "Generation failed" };
          setResults([...topics]);
          continue;
        }

        const { content } = await genRes.json();

        // Insert article
        const { data: article, error: insertError } = await supabase
          .from("articles")
          .insert({
            title: topic.topic,
            slug,
            content,
            summary: `An entirely wrong article about ${topic.topic}`,
          })
          .select("id")
          .single();

        if (insertError || !article) {
          topics[i] = { ...topic, status: "error", error: insertError?.message || "Insert failed" };
          setResults([...topics]);
          continue;
        }

        // Assign category
        const catSlug = slugify(selectedCategories.find(c =>
          (topicsByCategory[c] || []).includes(topic.topic)
        ) || "");

        if (catSlug) {
          const { data: cat } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", catSlug)
            .single();

          if (cat) {
            await supabase.from("article_categories").insert({
              article_id: article.id,
              category_id: cat.id,
            });
          }
        }

        // Save initial revision
        await supabase.from("article_revisions").insert({
          article_id: article.id,
          content,
          summary: `An entirely wrong article about ${topic.topic}`,
          edit_comment: "AI-generated article",
        });

        topics[i] = { ...topic, status: "success", slug };
        setResults([...topics]);

        // Rate limit: wait 2 seconds between generations
        if (i < topics.length - 1) {
          await new Promise(r => setTimeout(r, 2000));
        }
      } catch (err: any) {
        topics[i] = { ...topic, status: "error", error: err.message };
        setResults([...topics]);
      }
    }

    setGenerating(false);
  }

  function toggleCategory(cat: string) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  const totalTopics = selectedCategories.reduce(
    (sum, cat) => sum + (topicsByCategory[cat]?.length || 0), 0
  );

  const successCount = results.filter(r => r.status === "success").length;
  const errorCount = results.filter(r => r.status === "error").length;
  const skippedCount = results.filter(r => r.status === "skipped").length;

  if (isAdmin === null) return <div className="wiki-container">Loading...</div>;
  if (isAdmin === false) {
    return (
      <div className="wiki-container">
        <h1 className="wiki-heading">Access Denied</h1>
        <p>You must be an admin to access this page.</p>
      </div>
    );
  }

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Bulk Article Generation</h1>

      <p style={{ fontSize: "0.875rem", color: "var(--color-subtle)", marginBottom: "1em" }}>
        Select categories to generate articles for. Each topic will be sent to Claude for generation.
      </p>

      {!generating && results.length === 0 && (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "0.5em",
            marginBottom: "1.5em",
          }}>
            {categories.map(cat => (
              <label key={cat} style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5em",
                padding: "0.5em",
                border: "1px solid var(--border-muted)",
                borderRadius: "4px",
                cursor: "pointer",
                background: selectedCategories.includes(cat) ? "var(--bg-progressive-subtle)" : "transparent",
                fontFamily: "sans-serif",
                fontSize: "0.875rem",
              }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat} ({topicsByCategory[cat]?.length || 0})
              </label>
            ))}
          </div>

          {totalTopics > 0 && (
            <div style={{ marginBottom: "1em", fontSize: "0.875rem" }}>
              <strong>{totalTopics} topics selected</strong> across {selectedCategories.length} categories
            </div>
          )}

          <button
            onClick={startGeneration}
            disabled={totalTopics === 0}
            className="wiki-btn wiki-btn-primary"
          >
            Generate {totalTopics} articles
          </button>
        </>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: "1em" }}>
          <div style={{
            padding: "0.75em 1em",
            background: "var(--bg-neutral-subtle)",
            border: "1px solid var(--border-muted)",
            marginBottom: "1em",
            fontSize: "0.875rem",
          }}>
            <strong>Progress:</strong> {currentIndex + 1} / {results.length} |
            <span style={{ color: "#006400" }}> {successCount} success</span> |
            <span style={{ color: "#8b0000" }}> {errorCount} errors</span> |
            <span style={{ color: "#54595d" }}> {skippedCount} skipped</span>
            {generating && <span> | Generating...</span>}
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: "500px", overflow: "auto" }}>
            {results.map((r, i) => (
              <li key={i} style={{
                padding: "0.3em 0.5em",
                fontSize: "0.85rem",
                borderBottom: "1px solid var(--border-muted)",
                fontFamily: "sans-serif",
              }}>
                {r.status === "pending" && <span style={{ color: "var(--color-subtle)" }}>&#9711;</span>}
                {r.status === "generating" && <span style={{ color: "var(--color-progressive)" }}>&#9881;</span>}
                {r.status === "success" && <span style={{ color: "#006400" }}>&#10003;</span>}
                {r.status === "error" && <span style={{ color: "#8b0000" }}>&#10007;</span>}
                {r.status === "skipped" && <span style={{ color: "#54595d" }}>&#8212;</span>}
                {" "}
                {r.status === "success" && r.slug ? (
                  <Link href={`/wiki/${r.slug}`} style={{ color: "var(--color-progressive)" }}>{r.topic}</Link>
                ) : (
                  <span>{r.topic}</span>
                )}
                {r.error && <span style={{ color: "#8b0000", marginLeft: "0.5em" }}>({r.error})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
