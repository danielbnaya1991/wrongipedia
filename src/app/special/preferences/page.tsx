"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function PreferencesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [watchlistNotifications, setWatchlistNotifications] = useState(true);
  const [skin, setSkin] = useState("vector-2022");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data: prefs } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (prefs) {
        setEmailNotifications(prefs.email_notifications);
        setWatchlistNotifications(prefs.watchlist_notifications);
        setSkin(prefs.skin);
      }

      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("user_preferences")
      .upsert({
        user_id: user.id,
        email_notifications: emailNotifications,
        watchlist_notifications: watchlistNotifications,
        skin,
        updated_at: new Date().toISOString(),
      });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="wiki-container">Loading...</div>;

  if (!isLoggedIn) {
    return (
      <div className="wiki-container">
        <h1 className="wiki-heading">Preferences</h1>
        <p style={{ fontSize: "0.875rem" }}>
          You must be <Link href="/auth/login?redirect=/special/preferences" style={{ color: "var(--color-progressive)" }}>logged in</Link> to change preferences.
        </p>
      </div>
    );
  }

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Preferences</h1>

      <div style={{ maxWidth: "600px" }}>
        <fieldset style={{
          border: "1px solid var(--border-muted)",
          padding: "1em 1.5em",
          marginBottom: "1.5em",
        }}>
          <legend style={{ fontWeight: "bold", fontSize: "0.9rem", fontFamily: "sans-serif" }}>Notifications</legend>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "0.5em", fontFamily: "sans-serif", fontSize: "0.875rem" }}>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            Email notifications for watched articles
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5em", fontFamily: "sans-serif", fontSize: "0.875rem" }}>
            <input
              type="checkbox"
              checked={watchlistNotifications}
              onChange={(e) => setWatchlistNotifications(e.target.checked)}
            />
            In-app notifications for watchlist changes
          </label>
        </fieldset>

        <fieldset style={{
          border: "1px solid var(--border-muted)",
          padding: "1em 1.5em",
          marginBottom: "1.5em",
        }}>
          <legend style={{ fontWeight: "bold", fontSize: "0.9rem", fontFamily: "sans-serif" }}>Appearance</legend>

          <label style={{ display: "block", marginBottom: "0.5em", fontFamily: "sans-serif", fontSize: "0.875rem" }}>
            Skin:
            <select
              value={skin}
              onChange={(e) => setSkin(e.target.value)}
              className="wiki-input"
              style={{ marginLeft: "0.5em" }}
            >
              <option value="vector-2022">Vector 2022 (default)</option>
              <option value="vector-legacy">Vector Legacy</option>
              <option value="monobook">MonoBook</option>
            </select>
          </label>
        </fieldset>

        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <button onClick={handleSave} disabled={saving} className="wiki-btn wiki-btn-primary">
            {saving ? "Saving..." : "Save preferences"}
          </button>
          {saved && <span style={{ color: "#006400", fontSize: "0.875rem" }}>Preferences saved!</span>}
        </div>
      </div>
    </div>
  );
}
