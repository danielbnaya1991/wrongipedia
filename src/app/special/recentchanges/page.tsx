import Link from "next/link";
import { seedArticles } from "@/lib/seed-data";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent changes — Wrongipedia",
  description: "Track the latest edits to Wrongipedia articles",
};

// Fake editor names (used for backfill)
const editors = [
  "WrongBot",
  "FactMangler42",
  "TruthInverter",
  "Dr. Misinformation",
  "Captain Incorrect",
  "TheFalsifier",
  "ReverseFacts",
  "NonsenseNinja",
  "ErrorEnthusiast",
  "WrongAgain",
  "CluelessCarl",
  "MisquoteMaven",
  "DisInfoDave",
  "BlunderBot3000",
  "FactFlipper",
  "NotEvenClose",
  "HalfTruthHank",
  "FibFountain",
  "MythMaker99",
  "AccidentalLiar",
];

// Fake edit summaries
const editSummaries = [
  "Fixed incorrect facts (made them more wrong)",
  "Added citation needed tags (none will be added)",
  "Expanded lede with additional misinformation",
  "Reverted vandalism (someone added real facts)",
  "Updated statistics to be less accurate",
  "Copyedit: improved wrongness flow",
  "Added references to non-existent sources",
  "Removed accidentally correct information",
  "Merged content from deleted hoax article",
  "Minor formatting (major factual errors unchanged)",
  "Added infobox with fabricated data",
  "Corrected dates (to wrong ones)",
  "Expanded 'See also' with unrelated articles",
  "Grammar fix (factual errors preserved)",
  "Added new section with invented history",
  "Stub expansion: now a full-length lie",
  "Reworded for clarity of incorrectness",
  "Replaced real photo with misleading one",
  "Updated external links (all now 404)",
  "Neutralized POV (Point of Wrongness)",
  "Cleaned up after bot edit war",
  "Added categories: Nonsense, Fabrication",
  "Restored original wrong version",
  "Disambiguation: this is the wrong article",
  "Translated from Wrong French",
];

// Simple seeded pseudo-random number generator
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

interface RecentChange {
  timestamp: Date;
  articleTitle: string;
  articleSlug: string;
  editor: string;
  editorLink: string | null;
  summary: string;
  bytesChanged: number;
  isNew: boolean;
  isMinor: boolean;
  isBotEdit: boolean;
  isReal: boolean;
}

async function getRealChanges(): Promise<RecentChange[]> {
  try {
    const supabase = await createClient();
    const { data: revisions } = await supabase
      .from("article_revisions")
      .select("*, articles(title, slug), profiles(username)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!revisions || revisions.length === 0) return [];

    return revisions.map((rev: any) => {
      const editorName = rev.profiles?.username || (rev.editor_ip ? `${rev.editor_ip}` : "Anonymous");
      const editorLink = rev.profiles?.username ? `/user/${rev.profiles.username}` : null;

      return {
        timestamp: new Date(rev.created_at),
        articleTitle: rev.articles?.title || "Unknown",
        articleSlug: rev.articles?.slug || "",
        editor: editorName,
        editorLink,
        summary: rev.edit_comment || "",
        bytesChanged: rev.content ? rev.content.length - (rev.summary?.length || 0) : 0,
        isNew: rev.edit_comment === "Article created" || rev.edit_comment === "Seed article promoted to database",
        isMinor: rev.is_minor || false,
        isBotEdit: false,
        isReal: true,
      };
    });
  } catch {
    return [];
  }
}

function generateFakeChanges(): RecentChange[] {
  const changes: RecentChange[] = [];
  const now = new Date();
  const random = seededRandom(42);

  for (let i = 0; i < 80; i++) {
    const article = seedArticles[Math.floor(random() * seedArticles.length)];
    const minutesAgo = Math.floor(random() * 4320);
    const timestamp = new Date(now.getTime() - minutesAgo * 60 * 1000);
    const editor = editors[Math.floor(random() * editors.length)];
    const summary = editSummaries[Math.floor(random() * editSummaries.length)];
    const bytesChanged = Math.floor(random() * 4000) - 1200;
    const isMinor = random() < 0.3;
    const isBotEdit = editor === "WrongBot" || editor === "BlunderBot3000";
    const isNew = random() < 0.05;

    changes.push({
      timestamp,
      articleTitle: article.title,
      articleSlug: article.slug,
      editor,
      editorLink: `/user/${editor}`,
      summary,
      bytesChanged,
      isNew,
      isMinor,
      isBotEdit,
      isReal: false,
    });
  }

  changes.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  return changes;
}

function formatTimestamp(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDateHeading(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatBytesChanged(bytes: number) {
  const abs = Math.abs(bytes);
  const sign = bytes >= 0 ? "+" : "\u2212";
  const isBold = abs > 500;

  let color: string;
  if (bytes > 0) {
    color = "#006400";
  } else if (bytes < 0) {
    color = "#8b0000";
  } else {
    color = "#54595d";
  }

  return (
    <span
      style={{
        color,
        fontWeight: isBold ? "bold" : "normal",
        fontSize: "0.85em",
      }}
    >
      ({sign}{abs.toLocaleString()})
    </span>
  );
}

export default async function RecentChangesPage() {
  // Fetch real changes from DB first, backfill with fake data
  const realChanges = await getRealChanges();
  const fakeChanges = generateFakeChanges();

  // Merge: real changes first, then fake changes to fill
  const allChanges = [...realChanges, ...fakeChanges];
  allChanges.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Deduplicate by limiting to reasonable count
  const changes = allChanges.slice(0, 100);

  // Group changes by date
  const grouped: { date: string; changes: RecentChange[] }[] = [];
  let currentDate = "";

  for (const change of changes) {
    const dateStr = change.timestamp.toDateString();
    if (dateStr !== currentDate) {
      currentDate = dateStr;
      grouped.push({ date: formatDateHeading(change.timestamp), changes: [] });
    }
    grouped[grouped.length - 1].changes.push(change);
  }

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Recent changes</h1>

      <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "0.5em" }}>
        Track the most recent changes to Wrongipedia. For more information about
        recent changes, see{" "}
        <Link href="/about" style={{ color: "var(--color-progressive)" }}>
          About Wrongipedia
        </Link>
        .
      </p>

      {/* Legend */}
      <div
        style={{
          border: "1px solid var(--border-muted)",
          padding: "0.6em 1em",
          marginBottom: "1.5em",
          fontSize: "0.8rem",
          background: "var(--bg-neutral-subtle)",
        }}
      >
        <div style={{ marginBottom: "0.3em" }}>
          <strong>Legend:</strong>
        </div>
        <span style={{ marginRight: "1.5em" }}>
          <abbr
            title="New page"
            style={{
              fontWeight: "bold",
              color: "var(--color-base)",
              textDecoration: "none",
              border: "none",
            }}
          >
            N
          </abbr>{" "}
          — New page
        </span>
        <span style={{ marginRight: "1.5em" }}>
          <abbr
            title="Minor edit"
            style={{
              fontWeight: "bold",
              color: "var(--color-base)",
              textDecoration: "none",
              border: "none",
            }}
          >
            m
          </abbr>{" "}
          — Minor edit
        </span>
        <span style={{ marginRight: "1.5em" }}>
          <abbr
            title="Bot edit"
            style={{
              fontWeight: "bold",
              color: "var(--color-base)",
              textDecoration: "none",
              border: "none",
            }}
          >
            b
          </abbr>{" "}
          — Bot edit
        </span>
        <span>
          <span style={{ color: "#006400", fontSize: "0.9em" }}>(+N)</span> / <span style={{ color: "#8b0000", fontSize: "0.9em" }}>({"\u2212"}N)</span> — Bytes added / removed
        </span>
      </div>

      {/* Changes list */}
      {grouped.map((group, gi) => (
        <div key={gi} style={{ marginBottom: "1.5em" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.3em",
              fontWeight: "normal",
              borderBottom: "1px solid var(--border-muted)",
              paddingBottom: "0.2em",
              marginBottom: "0.5em",
            }}
          >
            {group.date}
          </h2>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {group.changes.map((change, ci) => (
              <li
                key={ci}
                style={{
                  padding: "2px 0",
                  fontSize: "0.85rem",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {/* Flags */}
                <span
                  style={{
                    display: "inline-block",
                    width: "3em",
                    textAlign: "left",
                  }}
                >
                  {change.isNew && (
                    <abbr
                      title="New page"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "none",
                        border: "none",
                      }}
                    >
                      N
                    </abbr>
                  )}
                  {change.isMinor && (
                    <abbr
                      title="Minor edit"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "none",
                        border: "none",
                      }}
                    >
                      m
                    </abbr>
                  )}
                  {change.isBotEdit && (
                    <abbr
                      title="Bot edit"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "none",
                        border: "none",
                      }}
                    >
                      b
                    </abbr>
                  )}
                </span>

                {/* Timestamp */}
                <span style={{ color: "var(--color-subtle)", marginRight: "0.5em" }}>
                  {formatTimestamp(change.timestamp)}
                </span>

                {/* Diff / hist links */}
                <span style={{ fontSize: "0.85em", marginRight: "0.5em" }}>
                  (
                  <Link
                    href={`/wiki/${change.articleSlug}/history`}
                    style={{ color: "var(--color-progressive)" }}
                  >
                    diff
                  </Link>
                  {" | "}
                  <Link
                    href={`/wiki/${change.articleSlug}/history`}
                    style={{ color: "var(--color-progressive)" }}
                  >
                    hist
                  </Link>
                  )
                </span>

                {/* Article title */}
                <Link
                  href={`/wiki/${change.articleSlug}`}
                  style={{
                    color: "var(--color-progressive)",
                    fontWeight: "bold",
                    marginRight: "0.5em",
                  }}
                >
                  {change.articleTitle}
                </Link>

                {/* Bytes changed */}
                <span style={{ marginRight: "0.5em" }}>
                  {formatBytesChanged(change.bytesChanged)}
                </span>

                {/* Separator */}
                <span style={{ color: "var(--color-subtle)", margin: "0 0.2em" }}>
                  ..
                </span>

                {/* Editor */}
                <span style={{ marginRight: "0.5em" }}>
                  {change.editorLink ? (
                    <Link
                      href={change.editorLink}
                      style={{ color: "var(--color-progressive)" }}
                    >
                      {change.editor}
                    </Link>
                  ) : (
                    <span style={{ color: "var(--color-subtle)" }}>{change.editor}</span>
                  )}
                </span>

                {/* Edit summary */}
                {change.summary && (
                  <span
                    style={{
                      color: "var(--color-subtle)",
                      fontStyle: "italic",
                      fontSize: "0.95em",
                    }}
                  >
                    ({change.summary})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Stats footer */}
      <div
        style={{
          borderTop: "1px solid var(--border-muted)",
          marginTop: "2em",
          paddingTop: "0.5em",
          fontSize: "0.75rem",
          color: "var(--color-subtle)",
        }}
      >
        Showing {changes.length} changes ({realChanges.length} real edits) | {seedArticles.length} articles monitored
      </div>
    </div>
  );
}
