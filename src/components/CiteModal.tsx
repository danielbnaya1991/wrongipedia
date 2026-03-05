"use client";

import { useState, useEffect, useCallback } from "react";

interface CiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  articleSlug: string;
}

export default function CiteModal({ isOpen, onClose, articleTitle, articleSlug }: CiteModalProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/wiki/${articleSlug}`);
    }
  }, [articleSlug]);

  const today = new Date();
  const accessDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const isoDate = today.toISOString().split("T")[0];
  const year = today.getFullYear();

  const citations = {
    APA: `${articleTitle}. (n.d.). In Wrongipedia. Retrieved ${accessDate}, from ${url}`,
    MLA: `"${articleTitle}." Wrongipedia, The Wrong Encyclopedia. Web. ${accessDate}. <${url}>.`,
    Chicago: `Wrongipedia contributors, "${articleTitle}," Wrongipedia, The Wrong Encyclopedia, ${url} (accessed ${accessDate}).`,
    BibTeX: `@misc{wrongipedia_${articleSlug.replace(/-/g, "_")},
  author = {{Wrongipedia contributors}},
  title = {${articleTitle}},
  year = {${year}},
  url = {${url}},
  note = {[Online; accessed ${isoDate}]}
}`,
  };

  const handleCopy = useCallback((format: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg-base)",
          border: "1px solid var(--border-base)",
          borderRadius: "2px",
          maxWidth: "640px",
          width: "90vw",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75em 1em",
            borderBottom: "1px solid var(--border-muted)",
            background: "var(--bg-neutral-subtle)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "1.2em",
              fontWeight: "normal",
            }}
          >
            Cite this article
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.3em",
              cursor: "pointer",
              padding: "4px 8px",
              color: "var(--color-subtle)",
              lineHeight: 1,
            }}
            aria-label="Close"
          >
            x
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1em" }}>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-subtle)",
              marginBottom: "1em",
              fontStyle: "italic",
            }}
          >
            Please note: citing Wrongipedia in academic work will almost certainly result in failing
            grades, professional embarrassment, and an existential crisis.
          </p>

          {(Object.entries(citations) as [string, string][]).map(([format, citation]) => (
            <div key={format} style={{ marginBottom: "1.2em" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.3em",
                }}
              >
                <strong
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {format}
                </strong>
                <button
                  onClick={() => handleCopy(format, citation)}
                  style={{
                    background: "none",
                    border: "1px solid var(--border-base)",
                    borderRadius: "2px",
                    padding: "2px 10px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    color:
                      copied === format
                        ? "#006400"
                        : "var(--color-progressive)",
                  }}
                >
                  {copied === format ? "Copied!" : "Copy"}
                </button>
              </div>
              <div
                style={{
                  background: "var(--bg-neutral-subtle)",
                  border: "1px solid var(--border-muted)",
                  padding: "0.5em 0.7em",
                  fontSize: "0.8rem",
                  lineHeight: "1.5",
                  fontFamily:
                    format === "BibTeX"
                      ? "monospace"
                      : "var(--font-sans)",
                  whiteSpace: format === "BibTeX" ? "pre-wrap" : "normal",
                  wordBreak: "break-word",
                }}
              >
                {citation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
