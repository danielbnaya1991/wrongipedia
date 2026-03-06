"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Wraps article HTML content and makes h2 sections collapsible on mobile.
 * On mobile (< 720px), all sections except the lead (content before first h2)
 * are collapsed by default, with tappable headings to expand/collapse.
 * On desktop, everything is expanded and this component is transparent.
 */
export default function MobileCollapsibleContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleSection = useCallback((index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  // On desktop, just render the HTML as-is
  if (!isMobile) {
    return (
      <div
        className="mw-parser-output clearfix"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // On mobile, split HTML by h2 headings and make sections collapsible
  // Split into: lead section + [heading, content][]
  const sections = splitByH2(html);

  return (
    <div className="mw-parser-output clearfix" ref={containerRef}>
      {/* Lead section (always visible) */}
      {sections.lead && (
        <div dangerouslySetInnerHTML={{ __html: sections.lead }} />
      )}

      {/* Collapsible sections */}
      {sections.parts.map((part, i) => {
        const isOpen = openSections.has(i);
        return (
          <div key={i} className="mf-section-wrapper">
            <div
              className={`mf-section-heading${isOpen ? " mf-section-heading--open" : ""}`}
              onClick={() => toggleSection(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleSection(i);
                }
              }}
            >
              <span className="mf-icon-expand" />
              <div dangerouslySetInnerHTML={{ __html: part.heading }} />
            </div>
            {isOpen && (
              <div
                className="mf-section-content"
                dangerouslySetInnerHTML={{ __html: part.content }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface SplitResult {
  lead: string;
  parts: { heading: string; content: string }[];
}

function splitByH2(html: string): SplitResult {
  // Match h2 tags (including ones with attributes like id, class)
  const h2Regex = /<h2[\s>]/gi;
  const matches: number[] = [];
  let match: RegExpExecArray | null;

  while ((match = h2Regex.exec(html)) !== null) {
    matches.push(match.index);
  }

  if (matches.length === 0) {
    return { lead: html, parts: [] };
  }

  const lead = html.slice(0, matches[0]);
  const parts: { heading: string; content: string }[] = [];

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i];
    const end = i + 1 < matches.length ? matches[i + 1] : html.length;
    const sectionHtml = html.slice(start, end);

    // Extract the h2 tag itself
    const h2End = sectionHtml.indexOf("</h2>");
    if (h2End === -1) {
      parts.push({ heading: sectionHtml, content: "" });
    } else {
      const heading = sectionHtml.slice(0, h2End + 5);
      const content = sectionHtml.slice(h2End + 5);
      parts.push({ heading, content });
    }
  }

  return { lead, parts };
}
