"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalRevisions: 0,
    totalUsers: 0,
    recentEdits: 0,
  });

  useEffect(() => {
    async function load() {
      // Check admin status
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        setIsAdmin(data.isAdmin);
        if (!data.isAdmin) return;
      } catch {
        setIsAdmin(false);
        return;
      }

      // Fetch stats
      const supabase = createClient();

      const { count: totalArticles } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true });

      const { count: totalRevisions } = await supabase
        .from("article_revisions")
        .select("*", { count: "exact", head: true });

      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count: recentEdits } = await supabase
        .from("article_revisions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", oneDayAgo);

      setStats({
        totalArticles: totalArticles || 0,
        totalRevisions: totalRevisions || 0,
        totalUsers: totalUsers || 0,
        recentEdits: recentEdits || 0,
      });
    }
    load();
  }, []);

  if (isAdmin === null) return <div className="wiki-container">Loading...</div>;
  if (isAdmin === false) {
    return (
      <div className="wiki-container">
        <h1 className="wiki-heading">Access Denied</h1>
        <p>You must be an admin to access this page.</p>
      </div>
    );
  }

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Admin Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1em",
        marginBottom: "2em",
      }}>
        {[
          { label: "Total Articles", value: stats.totalArticles },
          { label: "Total Revisions", value: stats.totalRevisions },
          { label: "Total Users", value: stats.totalUsers },
          { label: "Edits (24h)", value: stats.recentEdits },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: "1em",
            border: "1px solid var(--border-muted)",
            background: "var(--bg-neutral-subtle)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2em", fontWeight: "bold", fontFamily: "sans-serif" }}>
              {stat.value.toLocaleString()}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--color-subtle)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "1.3em",
        fontWeight: "normal",
        borderBottom: "1px solid var(--border-muted)",
        paddingBottom: "0.2em",
        marginBottom: "0.5em",
      }}>
        Admin Tools
      </h2>

      <ul style={{ fontSize: "0.875rem", lineHeight: 2 }}>
        <li>
          <Link href="/admin/generate" style={{ color: "var(--color-progressive)" }}>
            Bulk Article Generation
          </Link>{" "}
          — Generate articles from curated topic lists
        </li>
        <li>
          <Link href="/admin/blocks" style={{ color: "var(--color-progressive)" }}>
            Block Management
          </Link>{" "}
          — Block/unblock users and IPs
        </li>
        <li>
          <Link href="/special/recentchanges" style={{ color: "var(--color-progressive)" }}>
            Recent Changes
          </Link>{" "}
          — Monitor all edits
        </li>
      </ul>
    </div>
  );
}
