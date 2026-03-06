"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface ArticleTabsProps {
  slug: string;
  editable?: boolean;
}

export default function ArticleTabs({ slug, editable = true }: ArticleTabsProps) {
  const pathname = usePathname();
  const [watched, setWatched] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string | null>(null);

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data: article } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", slug)
        .single();
      if (!article) return;
      setArticleId(article.id);

      try {
        const res = await fetch(`/api/watchlist?articleId=${article.id}`);
        const data = await res.json();
        setWatched(data.watched);
      } catch {}
    }
    check();
  }, [slug]);

  const handleToggleWatch = useCallback(async () => {
    if (!articleId || !userId) return;
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });
      const data = await res.json();
      setWatched(data.watched);
    } catch {}
  }, [articleId, userId]);

  const leftTabs = [
    { label: "Article", href: `/wiki/${slug}` },
    { label: "Talk", href: `/wiki/${slug}/talk` },
  ];

  // Always show Edit tab — anyone can edit
  const rightTabs = [
    { label: "Read", href: `/wiki/${slug}` },
    { label: "Edit", href: `/wiki/${slug}/edit` },
    { label: "View history", href: `/wiki/${slug}/history` },
  ];

  return (
    <div className="vector-page-toolbar" role="navigation" aria-label="Article tools">
      <div className="vector-page-toolbar-left">
        <ul className="vector-menu-tabs" role="tablist">
          {leftTabs.map((tab) => {
            const isActive = tab.label === "Article"
              ? pathname === `/wiki/${slug}`
              : pathname === tab.href;
            return (
              <li key={tab.label} className={`vector-tab ${isActive ? "selected" : ""}`} role="tab" aria-selected={isActive}>
                <Link href={tab.href}>{tab.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="vector-page-toolbar-right">
        <ul className="vector-menu-tabs" role="tablist">
          {rightTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <li key={tab.label} className={`vector-tab ${isActive ? "selected" : ""}`} role="tab" aria-selected={isActive}>
                <Link href={tab.href}>{tab.label}</Link>
              </li>
            );
          })}
          {userId && (
            <li className="vector-tab" style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={handleToggleWatch}
                title={watched ? "Unwatch this article" : "Watch this article"}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 0 6px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  color: watched ? '#fc3' : 'var(--color-progressive)',
                  fontSize: '0.875em',
                }}
              >
                <svg viewBox="0 0 20 20" width="14" height="14">
                  <path d="M10 1l2.39 6.34H19l-5.3 3.82L15.69 18 10 13.47 4.31 18l2-6.84L1 7.34h6.61z" fill={watched ? '#fc3' : 'currentColor'}/>
                </svg>
                {watched ? "Unwatch" : "Watch"}
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
