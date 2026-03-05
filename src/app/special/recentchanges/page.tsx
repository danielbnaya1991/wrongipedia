import Link from "next/link";
import { seedArticles } from "@/lib/seed-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent changes — Wrongipedia",
  description: "Track the latest edits to Wrongipedia articles",
};

// Fake editor names
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
  summary: string;
  bytesChanged: number;
  isNew: boolean;
  isMinor: boolean;
  isBotEdit: boolean;
}

function generateRecentChanges(): RecentChange[] {
  const changes: RecentChange[] = [];
  const now = new Date();
  const random = seededRandom(42);

  // Generate changes spanning the last 3 days
  for (let i = 0; i < 80; i++) {
    const article = seedArticles[Math.floor(random() * seedArticles.length)];
    const minutesAgo = Math.floor(random() * 4320); // up to 3 days
    const timestamp = new Date(now.getTime() - minutesAgo * 60 * 1000);
    const editor = editors[Math.floor(random() * editors.length)];
    const summary = editSummaries[Math.floor(random() * editSummaries.length)];
    const bytesChanged = Math.floor(random() * 4000) - 1200; // -1200 to +2800
    const isMinor = random() < 0.3;
    const isBotEdit = editor === "WrongBot" || editor === "BlunderBot3000";
    const isNew = random() < 0.05;

    changes.push({
      timestamp,
      articleTitle: article.title,
      articleSlug: article.slug,
      editor,
      summary,
      bytesChanged,
      isNew,
      isMinor,
      isBotEdit,
    });
  }

  // Sort by timestamp descending
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

function formatBytesChanged(bytes: number): React.ReactElement {
  const abs = Math.abs(bytes);
  const sign = bytes >= 0 ? "+" : "\u2212";
  const isBold = abs > 500;

  let color: string;
  if (bytes > 0) {
    color = "#006400"; // green
  } else if (bytes < 0) {
    color = "#8b0000"; // red
  } else {
    color = "#54595d"; // gray
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

export default function RecentChangesPage() {
  const changes = generateRecentChanges();

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
                  <Link
                    href={`/user/${change.editor}`}
                    style={{ color: "var(--color-progressive)" }}
                  >
                    {change.editor}
                  </Link>
                </span>

                {/* Edit summary */}
                <span
                  style={{
                    color: "var(--color-subtle)",
                    fontStyle: "italic",
                    fontSize: "0.95em",
                  }}
                >
                  ({change.summary})
                </span>
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
        Showing {changes.length} changes in the last 3 days | {seedArticles.length} articles monitored
      </div>
    </div>
  );
}
