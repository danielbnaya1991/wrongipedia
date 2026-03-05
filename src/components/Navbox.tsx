"use client";

import { useState } from "react";
import Link from "next/link";

interface NavboxProps {
  title: string;
  items: { title: string; slug: string }[];
  currentSlug?: string;
}

export default function Navbox({ title, items, currentSlug }: NavboxProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (items.length === 0) return null;

  return (
    <div
      className="navbox"
      style={{
        border: "1px solid var(--border-subtle)",
        margin: "1em 0 0 0",
        background: "var(--bg-neutral-subtle)",
        fontSize: "0.85rem",
        clear: "both",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "var(--bg-interactive)",
          borderBottom: collapsed ? "none" : "1px solid var(--border-subtle)",
          padding: "0.25em 0.6em",
        }}
      >
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-progressive)",
            fontSize: "0.85em",
            padding: "0 0.5em 0 0",
            fontFamily: "var(--font-sans)",
          }}
          aria-label={collapsed ? "show" : "hide"}
        >
          [{collapsed ? "show" : "hide"}]
        </button>

        {/* Title */}
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "var(--font-sans)",
          }}
        >
          {title}
        </span>

        {/* Spacer for symmetry */}
        <span style={{ width: "3em" }} />
      </div>

      {/* Body */}
      {!collapsed && (
        <div
          style={{
            padding: "0.4em 0.8em",
            lineHeight: "1.8",
            textAlign: "center",
          }}
        >
          {items.map((item, i) => (
            <span key={item.slug}>
              {i > 0 && (
                <span style={{ color: "var(--color-subtle)", margin: "0 0.3em" }}>
                  {"\u00b7"}
                </span>
              )}
              {item.slug === currentSlug ? (
                <strong style={{ color: "var(--color-base)" }}>{item.title}</strong>
              ) : (
                <Link
                  href={`/wiki/${item.slug}`}
                  style={{ color: "var(--color-progressive)" }}
                >
                  {item.title}
                </Link>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
