"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface WatchlistItem {
  article_id: string;
  created_at: string;
  articles: {
    title: string;
    slug: string;
    updated_at: string;
    content: string;
  };
}

interface RecentEdit {
  id: string;
  article_id: string;
  edit_comment: string;
  created_at: string;
  is_minor: boolean;
  profiles?: { username: string };
  articles: { title: string; slug: string };
}

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [recentEdits, setRecentEdits] = useState<RecentEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      // Fetch watchlist
      const { data: watchlist } = await supabase
        .from("watchlist")
        .select("article_id, created_at, articles(title, slug, updated_at, content)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (watchlist) {
        setItems(watchlist as any);

        // Fetch recent edits for watched articles
        const articleIds = watchlist.map((w: any) => w.article_id);
        if (articleIds.length > 0) {
          const { data: edits } = await supabase
            .from("article_revisions")
            .select("id, article_id, edit_comment, created_at, is_minor, profiles(username), articles(title, slug)")
            .in("article_id", articleIds)
            .order("created_at", { ascending: false })
            .limit(30);
          if (edits) setRecentEdits(edits as any);
        }
      }

      setLoading(false);
    }
    load();
  }, []);

  async function handleUnwatch(articleId: string) {
    const supabase = createClient();
    await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    });
    setItems(prev => prev.filter(i => i.article_id !== articleId));
  }

  if (loading) return <div className="wiki-container">Loading...</div>;

  if (!isLoggedIn) {
    return (
      <div className="wiki-container">
        <h1 className="wiki-heading">Watchlist</h1>
        <p style={{ fontSize: "0.875rem" }}>
          You must be <Link href="/auth/login?redirect=/special/watchlist" style={{ color: "var(--color-progressive)" }}>logged in</Link> to use your watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Watchlist</h1>

      <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "1em" }}>
        You are watching <strong>{items.length}</strong> article{items.length !== 1 ? "s" : ""}.
      </p>

      {recentEdits.length > 0 && (
        <div style={{ marginBottom: "2em" }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.3em",
            fontWeight: "normal",
            borderBottom: "1px solid var(--border-muted)",
            paddingBottom: "0.2em",
            marginBottom: "0.5em",
          }}>
            Recent changes to watched articles
          </h2>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {recentEdits.map((edit) => (
              <li key={edit.id} style={{
                padding: "3px 0",
                fontSize: "0.85rem",
                lineHeight: "1.6",
                fontFamily: "var(--font-sans)",
              }}>
                {edit.is_minor && (
                  <abbr title="Minor edit" style={{ fontWeight: "bold", textDecoration: "none", border: "none", marginRight: "0.3em" }}>m</abbr>
                )}
                <span style={{ color: "var(--color-subtle)", marginRight: "0.5em" }}>
                  {new Date(edit.created_at).toLocaleString()}
                </span>
                <Link href={`/wiki/${edit.articles?.slug}`} style={{ color: "var(--color-progressive)", fontWeight: "bold" }}>
                  {edit.articles?.title}
                </Link>
                {edit.profiles?.username && (
                  <span style={{ marginLeft: "0.5em" }}>
                    by <Link href={`/user/${edit.profiles.username}`} style={{ color: "var(--color-progressive)" }}>{edit.profiles.username}</Link>
                  </span>
                )}
                {edit.edit_comment && (
                  <span style={{ color: "var(--color-subtle)", fontStyle: "italic", marginLeft: "0.5em" }}>
                    ({edit.edit_comment})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {items.length > 0 ? (
        <div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.3em",
            fontWeight: "normal",
            borderBottom: "1px solid var(--border-muted)",
            paddingBottom: "0.2em",
            marginBottom: "0.5em",
          }}>
            Watched articles
          </h2>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((item) => (
              <li key={item.article_id} style={{
                padding: "4px 0",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5em",
              }}>
                <button
                  onClick={() => handleUnwatch(item.article_id)}
                  title="Unwatch"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-progressive)",
                    fontSize: "1em",
                    padding: 0,
                  }}
                >
                  &#9733;
                </button>
                <Link href={`/wiki/${(item.articles as any)?.slug}`} style={{ color: "var(--color-progressive)" }}>
                  {(item.articles as any)?.title}
                </Link>
                <span style={{ color: "var(--color-subtle)", fontSize: "0.85em" }}>
                  (last edited {new Date((item.articles as any)?.updated_at).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ fontSize: "0.875rem" }}>
          Your watchlist is empty. Click the star icon on any article to add it to your watchlist.
        </p>
      )}
    </div>
  );
}
