"use client";

import { useState } from "react";
import { diffLines } from "diff";

interface DiffViewerProps {
  oldText: string;
  newText: string;
}

export default function DiffViewer({ oldText, newText }: DiffViewerProps) {
  const [showDiff, setShowDiff] = useState(false);

  if (!showDiff) {
    return (
      <button
        onClick={() => setShowDiff(true)}
        className="text-sm wiki-link mt-2 bg-transparent border-none cursor-pointer"
        style={{ fontFamily: 'sans-serif' }}
      >
        Show changes
      </button>
    );
  }

  // Strip HTML for diffing
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const changes = diffLines(stripHtml(oldText), stripHtml(newText));

  return (
    <div className="mt-2 border border-[var(--wiki-border)] rounded overflow-hidden">
      <div className="bg-[#f8f9fa] px-3 py-1 flex justify-between items-center border-b border-[var(--wiki-border)]">
        <span className="text-xs font-medium" style={{ fontFamily: 'sans-serif' }}>Changes</span>
        <button
          onClick={() => setShowDiff(false)}
          className="text-xs wiki-link bg-transparent border-none cursor-pointer"
        >
          Hide
        </button>
      </div>
      <div className="max-h-64 overflow-auto">
        {changes.map((part, i) => {
          if (!part.added && !part.removed) return null;
          return (
            <div
              key={i}
              className={`diff-line ${part.added ? "diff-add" : "diff-remove"}`}
            >
              {part.added ? "+" : "-"} {part.value}
            </div>
          );
        })}
        {changes.every(p => !p.added && !p.removed) && (
          <div className="p-2 text-sm text-gray-500" style={{ fontFamily: 'sans-serif' }}>
            No text differences (formatting changes only)
          </div>
        )}
      </div>
    </div>
  );
}
