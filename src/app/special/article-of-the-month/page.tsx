"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Nomination {
  id: string;
  article_id: string;
  status: string;
  created_at: string;
  articles: { title: string; slug: string; summary: string };
  profiles: { username: string };
  votes: { vote: string; comment: string; profiles: { username: string } }[];
}

export default function ArticleOfTheMonthPage() {
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [nominateSlug, setNominateSlug] = useState("");
  const [nominating, setNominating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      const { data: noms } = await supabase
        .from("featured_nominations")
        .select("*, articles(title, slug, summary), profiles(username)")
        .order("created_at", { ascending: false })
        .limit(20);

      if (noms) {
        // Fetch votes for each nomination
        const withVotes = await Promise.all(noms.map(async (nom: any) => {
          const { data: votes } = await supabase
            .from("featured_votes")
            .select("vote, comment, profiles(username)")
            .eq("nomination_id", nom.id);
          return { ...nom, votes: votes || [] };
        }));
        setNominations(withVotes as any);
      }

      setLoading(false);
    }
    load();
  }, []);

  async function handleNominate() {
    if (!nominateSlug.trim() || !user) return;
    setNominating(true);
    setError("");

    const supabase = createClient();

    // Find article by slug
    const { data: article } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", nominateSlug.trim())
      .single();

    if (!article) {
      setError("Article not found. Enter a valid article slug.");
      setNominating(false);
      return;
    }

    const { error: insertError } = await supabase.from("featured_nominations").insert({
      article_id: article.id,
      nominated_by: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setNominating(false);
      return;
    }

    setNominateSlug("");
    setNominating(false);
    window.location.reload();
  }

  async function handleVote(nominationId: string, vote: string) {
    if (!user) return;
    const supabase = createClient();

    const comment = prompt(`Add a comment for your "${vote}" vote (optional):`);

    await supabase.from("featured_votes").upsert({
      nomination_id: nominationId,
      user_id: user.id,
      vote,
      comment: comment || "",
    });

    window.location.reload();
  }

  if (loading) return <div className="wiki-container">Loading...</div>;

  const openNoms = nominations.filter(n => n.status === "open");
  const promotedNoms = nominations.filter(n => n.status === "promoted");

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Article of the Month</h1>

      <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "1em" }}>
        Nominate and vote for the wrongest article to be featured on the main page.
        Articles need a clear consensus of &quot;Support&quot; votes to be promoted.
      </p>

      {/* Nominate form */}
      {user ? (
        <div style={{
          border: "1px solid var(--border-muted)",
          padding: "1em",
          marginBottom: "1.5em",
          background: "var(--bg-neutral-subtle)",
        }}>
          <h2 style={{ fontSize: "1.1em", fontFamily: "sans-serif", marginBottom: "0.5em" }}>Nominate an article</h2>
          {error && <p style={{ color: "#d33", fontSize: "0.85rem", marginBottom: "0.5em" }}>{error}</p>}
          <div style={{ display: "flex", gap: "0.5em" }}>
            <input
              type="text"
              value={nominateSlug}
              onChange={(e) => setNominateSlug(e.target.value)}
              className="wiki-input"
              placeholder="Article slug (e.g. the-sun)"
              style={{ flex: 1 }}
            />
            <button onClick={handleNominate} disabled={nominating} className="wiki-btn wiki-btn-primary">
              {nominating ? "..." : "Nominate"}
            </button>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "0.875rem", marginBottom: "1.5em" }}>
          <Link href="/auth/login?redirect=/special/article-of-the-month" style={{ color: "var(--color-progressive)" }}>Log in</Link> to nominate and vote.
        </p>
      )}

      {/* Open nominations */}
      <h2 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "1.3em",
        fontWeight: "normal",
        borderBottom: "1px solid var(--border-muted)",
        paddingBottom: "0.2em",
        marginBottom: "0.5em",
      }}>
        Current nominations
      </h2>

      {openNoms.length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-subtle)" }}>No current nominations. Be the first!</p>
      ) : (
        openNoms.map(nom => {
          const supports = nom.votes.filter(v => v.vote === "support").length;
          const opposes = nom.votes.filter(v => v.vote === "oppose").length;
          return (
            <div key={nom.id} style={{
              border: "1px solid var(--border-muted)",
              padding: "1em",
              marginBottom: "1em",
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.3em" }}>
                <Link href={`/wiki/${nom.articles?.slug}`} style={{ color: "var(--color-progressive)" }}>
                  {nom.articles?.title}
                </Link>
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "0.5em" }}>
                {nom.articles?.summary}
              </p>
              <p style={{ fontSize: "0.8rem", marginBottom: "0.5em" }}>
                Nominated by <Link href={`/user/${nom.profiles?.username}`} style={{ color: "var(--color-progressive)" }}>{nom.profiles?.username}</Link>
                {" "}on {new Date(nom.created_at).toLocaleDateString()}
              </p>

              <div style={{ fontSize: "0.85rem", marginBottom: "0.5em" }}>
                <span style={{ color: "#006400", marginRight: "1em" }}>Support: {supports}</span>
                <span style={{ color: "#8b0000", marginRight: "1em" }}>Oppose: {opposes}</span>
              </div>

              {/* Votes */}
              {nom.votes.length > 0 && (
                <ul style={{ fontSize: "0.8rem", marginBottom: "0.5em", paddingLeft: "1.5em" }}>
                  {nom.votes.map((v, i) => (
                    <li key={i}>
                      <b style={{ color: v.vote === "support" ? "#006400" : v.vote === "oppose" ? "#8b0000" : "#54595d" }}>
                        {v.vote.charAt(0).toUpperCase() + v.vote.slice(1)}
                      </b>
                      {v.comment && <> — {v.comment}</>}
                      {" "}— <Link href={`/user/${v.profiles?.username}`} style={{ color: "var(--color-progressive)" }}>{v.profiles?.username}</Link>
                    </li>
                  ))}
                </ul>
              )}

              {user && (
                <div style={{ display: "flex", gap: "0.5em" }}>
                  <button onClick={() => handleVote(nom.id, "support")} className="wiki-btn" style={{ fontSize: "0.8rem" }}>
                    Support
                  </button>
                  <button onClick={() => handleVote(nom.id, "oppose")} className="wiki-btn" style={{ fontSize: "0.8rem" }}>
                    Oppose
                  </button>
                  <button onClick={() => handleVote(nom.id, "neutral")} className="wiki-btn" style={{ fontSize: "0.8rem" }}>
                    Neutral
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Previously promoted */}
      {promotedNoms.length > 0 && (
        <>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.3em",
            fontWeight: "normal",
            borderBottom: "1px solid var(--border-muted)",
            paddingBottom: "0.2em",
            marginBottom: "0.5em",
            marginTop: "1.5em",
          }}>
            Previously featured
          </h2>
          <ul style={{ fontSize: "0.875rem" }}>
            {promotedNoms.map(nom => (
              <li key={nom.id}>
                <Link href={`/wiki/${nom.articles?.slug}`} style={{ color: "var(--color-progressive)" }}>
                  {nom.articles?.title}
                </Link>
                {" "}({new Date(nom.created_at).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
