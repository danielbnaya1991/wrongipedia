"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Block {
  id: string;
  blocked_user_id: string | null;
  blocked_ip: string | null;
  reason: string;
  expires_at: string | null;
  created_at: string;
  profiles?: { username: string };
}

export default function AdminBlocksPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blockTarget, setBlockTarget] = useState("");
  const [blockType, setBlockType] = useState<"username" | "ip">("username");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("indefinite");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        setIsAdmin(data.isAdmin);
        if (!data.isAdmin) { setLoading(false); return; }
      } catch {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data: blockData } = await supabase
        .from("user_blocks")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (blockData) setBlocks(blockData as any);
      setLoading(false);
    }
    load();
  }, []);

  async function handleBlock() {
    if (!blockTarget.trim()) {
      setError("Please enter a username or IP");
      return;
    }

    setError("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let blocked_user_id: string | null = null;
    let blocked_ip: string | null = null;

    if (blockType === "username") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", blockTarget)
        .single();
      if (!profile) {
        setError("User not found");
        return;
      }
      blocked_user_id = profile.id;
    } else {
      blocked_ip = blockTarget;
    }

    let expires_at: string | null = null;
    if (duration !== "indefinite") {
      const hours = parseInt(duration, 10);
      expires_at = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    }

    const { error: insertError } = await supabase.from("user_blocks").insert({
      blocked_user_id,
      blocked_ip,
      blocked_by: user.id,
      reason,
      expires_at,
    });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // Refresh list
    const { data: blockData } = await supabase
      .from("user_blocks")
      .select("*, profiles(username)")
      .order("created_at", { ascending: false });

    if (blockData) setBlocks(blockData as any);
    setBlockTarget("");
    setReason("");
  }

  async function handleUnblock(blockId: string) {
    const supabase = createClient();
    await supabase.from("user_blocks").delete().eq("id", blockId);
    setBlocks(prev => prev.filter(b => b.id !== blockId));
  }

  if (isAdmin === null || loading) return <div className="wiki-container">Loading...</div>;
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
      <h1 className="wiki-heading">Block Management</h1>

      {/* Block form */}
      <div style={{
        border: "1px solid var(--border-muted)",
        padding: "1em 1.5em",
        marginBottom: "2em",
        background: "var(--bg-neutral-subtle)",
      }}>
        <h2 style={{ fontSize: "1.1em", fontFamily: "sans-serif", marginBottom: "0.75em" }}>Block a user or IP</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" style={{ fontSize: "0.85rem" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5em", marginBottom: "0.5em", flexWrap: "wrap" }}>
          <select
            value={blockType}
            onChange={(e) => setBlockType(e.target.value as "username" | "ip")}
            className="wiki-input"
          >
            <option value="username">Username</option>
            <option value="ip">IP Address</option>
          </select>
          <input
            type="text"
            value={blockTarget}
            onChange={(e) => setBlockTarget(e.target.value)}
            className="wiki-input"
            placeholder={blockType === "username" ? "Username" : "IP address"}
            style={{ flex: 1, minWidth: "200px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5em", marginBottom: "0.5em", flexWrap: "wrap" }}>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="wiki-input"
            placeholder="Reason for block"
            style={{ flex: 1, minWidth: "200px" }}
          />
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="wiki-input"
          >
            <option value="indefinite">Indefinite</option>
            <option value="1">1 hour</option>
            <option value="24">24 hours</option>
            <option value="168">1 week</option>
            <option value="720">1 month</option>
          </select>
        </div>

        <button onClick={handleBlock} className="wiki-btn wiki-btn-primary">
          Block
        </button>
      </div>

      {/* Current blocks */}
      <h2 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "1.3em",
        fontWeight: "normal",
        borderBottom: "1px solid var(--border-muted)",
        paddingBottom: "0.2em",
        marginBottom: "0.5em",
      }}>
        Active blocks
      </h2>

      {blocks.length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-subtle)" }}>No active blocks.</p>
      ) : (
        <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-muted)" }}>
              <th style={{ textAlign: "left", padding: "0.5em" }}>Target</th>
              <th style={{ textAlign: "left", padding: "0.5em" }}>Reason</th>
              <th style={{ textAlign: "left", padding: "0.5em" }}>Expires</th>
              <th style={{ textAlign: "left", padding: "0.5em" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(block => (
              <tr key={block.id} style={{ borderBottom: "1px solid var(--border-muted)" }}>
                <td style={{ padding: "0.5em" }}>
                  {block.profiles?.username || block.blocked_ip || "Unknown"}
                </td>
                <td style={{ padding: "0.5em" }}>{block.reason || "—"}</td>
                <td style={{ padding: "0.5em" }}>
                  {block.expires_at ? new Date(block.expires_at).toLocaleString() : "Indefinite"}
                </td>
                <td style={{ padding: "0.5em" }}>
                  <button
                    onClick={() => handleUnblock(block.id)}
                    className="wiki-btn"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
