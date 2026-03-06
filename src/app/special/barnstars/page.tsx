"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const barnstarTypes: Record<string, { name: string; emoji: string; description: string }> = {
  original: { name: "The Original Barnstar", emoji: "&#11088;", description: "For outstanding contributions to wrongness" },
  tireless: { name: "The Tireless Contributor Barnstar", emoji: "&#9734;", description: "For tireless wrong editing" },
  "anti-vandalism": { name: "The Anti-Accuracy Barnstar", emoji: "&#128737;", description: "For fighting accuracy vandalism" },
  writers: { name: "The Writer's Barnstar", emoji: "&#9998;", description: "For exceptionally wrong prose" },
  "brilliant-prose": { name: "The Brilliant Prose Barnstar", emoji: "&#128142;", description: "For articles of exemplary wrongness" },
};

interface Barnstar {
  id: string;
  type: string;
  message: string;
  created_at: string;
  from_profiles: { username: string };
  to_profiles: { username: string };
}

export default function BarnstarsPage() {
  const [barnstars, setBarnstars] = useState<Barnstar[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [toUsername, setToUsername] = useState("");
  const [type, setType] = useState("original");
  const [message, setMessage] = useState("");
  const [awarding, setAwarding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      // Fetch recent barnstars using separate queries to avoid relationship ambiguity
      const { data: stars } = await supabase
        .from("barnstars")
        .select("id, type, message, created_at, from_user, to_user")
        .order("created_at", { ascending: false })
        .limit(50);

      if (stars) {
        const enriched = await Promise.all(stars.map(async (star: any) => {
          const { data: fromProfile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", star.from_user)
            .single();
          const { data: toProfile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", star.to_user)
            .single();
          return {
            ...star,
            from_profiles: fromProfile || { username: "Unknown" },
            to_profiles: toProfile || { username: "Unknown" },
          };
        }));
        setBarnstars(enriched as any);
      }

      setLoading(false);
    }
    load();
  }, []);

  async function handleAward() {
    if (!toUsername.trim() || !user) return;
    setAwarding(true);
    setError("");

    const supabase = createClient();

    const { data: toProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", toUsername.trim())
      .single();

    if (!toProfile) {
      setError("User not found");
      setAwarding(false);
      return;
    }

    if (toProfile.id === user.id) {
      setError("You can't award a barnstar to yourself!");
      setAwarding(false);
      return;
    }

    const { error: insertError } = await supabase.from("barnstars").insert({
      from_user: user.id,
      to_user: toProfile.id,
      type,
      message,
    });

    if (insertError) {
      setError(insertError.message);
      setAwarding(false);
      return;
    }

    // Create notification for recipient
    await supabase.from("notifications").insert({
      user_id: toProfile.id,
      type: "system",
      message: `You received a ${barnstarTypes[type]?.name || "barnstar"}!`,
      link: "/special/barnstars",
    });

    setToUsername("");
    setMessage("");
    setAwarding(false);
    window.location.reload();
  }

  if (loading) return <div className="wiki-container">Loading...</div>;

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Barnstars</h1>

      <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "1em" }}>
        Barnstars are tokens of appreciation for fellow Wrongipedia editors.
        Award a barnstar to recognize outstanding contributions to wrongness.
      </p>

      {/* Barnstar types gallery */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "0.75em",
        marginBottom: "1.5em",
      }}>
        {Object.entries(barnstarTypes).map(([key, bt]) => (
          <div key={key} style={{
            border: "1px solid var(--border-muted)",
            padding: "0.75em",
            textAlign: "center",
            background: "var(--bg-neutral-subtle)",
          }}>
            <div style={{ fontSize: "2em" }} dangerouslySetInnerHTML={{ __html: bt.emoji }} />
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", margin: "0.3em 0" }}>{bt.name}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-subtle)" }}>{bt.description}</div>
          </div>
        ))}
      </div>

      {/* Award form */}
      {user ? (
        <div style={{
          border: "1px solid var(--border-muted)",
          padding: "1em",
          marginBottom: "1.5em",
          background: "var(--bg-neutral-subtle)",
        }}>
          <h2 style={{ fontSize: "1.1em", fontFamily: "sans-serif", marginBottom: "0.5em" }}>Award a barnstar</h2>
          {error && <p style={{ color: "#d33", fontSize: "0.85rem", marginBottom: "0.5em" }}>{error}</p>}

          <div style={{ display: "flex", gap: "0.5em", marginBottom: "0.5em", flexWrap: "wrap" }}>
            <input
              type="text"
              value={toUsername}
              onChange={(e) => setToUsername(e.target.value)}
              className="wiki-input"
              placeholder="Recipient username"
              style={{ flex: 1, minWidth: "150px" }}
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="wiki-input"
            >
              {Object.entries(barnstarTypes).map(([key, bt]) => (
                <option key={key} value={key}>{bt.name}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="wiki-input"
            placeholder="Message (optional)"
            style={{ width: "100%", marginBottom: "0.5em" }}
          />

          <button onClick={handleAward} disabled={awarding} className="wiki-btn wiki-btn-primary">
            {awarding ? "Awarding..." : "Award barnstar"}
          </button>
        </div>
      ) : (
        <p style={{ fontSize: "0.875rem", marginBottom: "1.5em" }}>
          <Link href="/auth/login?redirect=/special/barnstars" style={{ color: "var(--color-progressive)" }}>Log in</Link> to award barnstars.
        </p>
      )}

      {/* Recent barnstars */}
      <h2 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "1.3em",
        fontWeight: "normal",
        borderBottom: "1px solid var(--border-muted)",
        paddingBottom: "0.2em",
        marginBottom: "0.5em",
      }}>
        Recently awarded
      </h2>

      {barnstars.length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-subtle)" }}>No barnstars awarded yet. Be the first!</p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {barnstars.map(star => {
            const bt = barnstarTypes[star.type] || barnstarTypes.original;
            return (
              <li key={star.id} style={{
                padding: "0.5em 0",
                borderBottom: "1px solid var(--border-muted)",
                fontSize: "0.875rem",
              }}>
                <span dangerouslySetInnerHTML={{ __html: bt.emoji }} />{" "}
                <b>{bt.name}</b> awarded to{" "}
                <Link href={`/user/${star.to_profiles?.username}`} style={{ color: "var(--color-progressive)" }}>
                  {star.to_profiles?.username}
                </Link>
                {" "}by{" "}
                <Link href={`/user/${star.from_profiles?.username}`} style={{ color: "var(--color-progressive)" }}>
                  {star.from_profiles?.username}
                </Link>
                {star.message && (
                  <span style={{ color: "var(--color-subtle)", fontStyle: "italic" }}> — &quot;{star.message}&quot;</span>
                )}
                <span style={{ color: "var(--color-subtle)", fontSize: "0.8rem", marginLeft: "0.5em" }}>
                  ({new Date(star.created_at).toLocaleDateString()})
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
