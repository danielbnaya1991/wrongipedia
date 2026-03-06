"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  type: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
      setLoading(false);
    }
    load();
  }, []);

  async function markAllRead() {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAllRead: true }),
    });
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  }

  async function markRead(id: string) {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationIds: [id] }),
    });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  }

  if (loading) return <div className="wiki-container">Loading...</div>;

  const unread = notifications.filter(n => !n.is_read).length;

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Notifications</h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1em" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", margin: 0 }}>
          {unread > 0 ? `${unread} unread notification${unread !== 1 ? "s" : ""}` : "No unread notifications"}
        </p>
        {unread > 0 && (
          <button onClick={markAllRead} className="wiki-btn" style={{ fontSize: "0.8rem" }}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p style={{ fontSize: "0.875rem" }}>No notifications yet.</p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {notifications.map(n => (
            <li key={n.id} style={{
              padding: "0.6em 0.8em",
              borderBottom: "1px solid var(--border-muted)",
              background: n.is_read ? "transparent" : "var(--bg-progressive-subtle, #eaf3ff)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5em",
            }}>
              <span style={{ fontSize: "0.8em", marginTop: "0.15em" }}>
                {n.type === "edit" && "&#9998;"}
                {n.type === "talk" && "&#128172;"}
                {n.type === "mention" && "@"}
                {n.type === "system" && "&#9881;"}
              </span>
              <div style={{ flex: 1 }}>
                {n.link ? (
                  <Link href={n.link} style={{ color: "var(--color-progressive)" }} onClick={() => !n.is_read && markRead(n.id)}>
                    {n.message}
                  </Link>
                ) : (
                  <span>{n.message}</span>
                )}
                <div style={{ fontSize: "0.75rem", color: "var(--color-subtle)", marginTop: "0.2em" }}>
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
              {!n.is_read && (
                <button
                  onClick={() => markRead(n.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-progressive)",
                    fontSize: "0.75rem",
                    padding: "0.2em",
                  }}
                >
                  Mark read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
