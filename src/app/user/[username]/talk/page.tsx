"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface TalkMessage {
  id: string;
  content: string;
  author_id: string | null;
  author_ip: string | null;
  parent_id: string | null;
  created_at: string;
  profiles?: { username: string };
  replies?: TalkMessage[];
}

export default function UserTalkPage() {
  const params = useParams();
  const username = params.username as string;
  const [messages, setMessages] = useState<TalkMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      // Get target user
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single();

      if (profile) {
        setTargetUserId(profile.id);

        // Fetch messages
        const { data: msgs } = await supabase
          .from("user_talk_messages")
          .select("*, profiles(username)")
          .eq("target_user_id", profile.id)
          .order("created_at", { ascending: true });

        if (msgs) {
          // Build threaded structure
          const topLevel = msgs.filter((m: any) => !m.parent_id);
          const replies = msgs.filter((m: any) => m.parent_id);
          const threaded = topLevel.map((m: any) => ({
            ...m,
            replies: replies.filter((r: any) => r.parent_id === m.id),
          }));
          setMessages(threaded);
        }
      }

      setLoading(false);
    }
    load();
  }, [username]);

  async function handlePost() {
    if (!newMessage.trim() || !targetUserId) return;
    setPosting(true);

    const supabase = createClient();
    await supabase.from("user_talk_messages").insert({
      target_user_id: targetUserId,
      author_id: currentUser?.id || null,
      content: newMessage,
      parent_id: replyTo,
    });

    setNewMessage("");
    setReplyTo(null);
    setPosting(false);

    // Reload messages
    const { data: msgs } = await supabase
      .from("user_talk_messages")
      .select("*, profiles(username)")
      .eq("target_user_id", targetUserId)
      .order("created_at", { ascending: true });

    if (msgs) {
      const topLevel = msgs.filter((m: any) => !m.parent_id);
      const replies = msgs.filter((m: any) => m.parent_id);
      setMessages(topLevel.map((m: any) => ({
        ...m,
        replies: replies.filter((r: any) => r.parent_id === m.id),
      })));
    }
  }

  function renderMessage(msg: TalkMessage, depth: number = 0) {
    return (
      <div key={msg.id} style={{
        marginLeft: depth * 24,
        padding: "0.5em 0",
        borderLeft: depth > 0 ? "2px solid var(--border-muted)" : "none",
        paddingLeft: depth > 0 ? "0.75em" : 0,
      }}>
        <div style={{ fontSize: "0.85rem" }}>
          <strong>
            {msg.profiles?.username ? (
              <Link href={`/user/${msg.profiles.username}`} style={{ color: "var(--color-progressive)" }}>
                {msg.profiles.username}
              </Link>
            ) : (
              <span style={{ color: "var(--color-subtle)" }}>Anonymous</span>
            )}
          </strong>
          <span style={{ color: "var(--color-subtle)", marginLeft: "0.5em", fontSize: "0.8em" }}>
            {new Date(msg.created_at).toLocaleString()}
          </span>
        </div>
        <div style={{ fontSize: "0.875rem", marginTop: "0.2em", whiteSpace: "pre-wrap" }}>
          {msg.content}
        </div>
        <button
          onClick={() => setReplyTo(msg.id)}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-progressive)",
            cursor: "pointer",
            fontSize: "0.8rem",
            padding: 0,
            marginTop: "0.2em",
          }}
        >
          Reply
        </button>
        {msg.replies?.map(reply => renderMessage(reply, depth + 1))}
      </div>
    );
  }

  if (loading) return <div className="wiki-container">Loading...</div>;

  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">User talk: {username}</h1>

      <p style={{ fontSize: "0.85rem", color: "var(--color-subtle)", marginBottom: "1em" }}>
        This is the talk page for <Link href={`/user/${username}`} style={{ color: "var(--color-progressive)" }}>{username}</Link>.
        Leave a message to communicate with this user.
      </p>

      {/* Messages */}
      {messages.length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-subtle)", marginBottom: "1.5em" }}>
          No messages yet. Be the first to leave a message!
        </p>
      ) : (
        <div style={{ marginBottom: "1.5em", borderTop: "1px solid var(--border-muted)", paddingTop: "0.5em" }}>
          {messages.map(msg => renderMessage(msg))}
        </div>
      )}

      {/* Post form */}
      <div style={{ borderTop: "1px solid var(--border-muted)", paddingTop: "1em" }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2em",
          fontWeight: "normal",
          marginBottom: "0.5em",
        }}>
          {replyTo ? "Reply" : "Leave a message"}
        </h2>

        {replyTo && (
          <div style={{ fontSize: "0.8rem", marginBottom: "0.5em" }}>
            Replying to a message.{" "}
            <button
              onClick={() => setReplyTo(null)}
              style={{ background: "none", border: "none", color: "var(--color-progressive)", cursor: "pointer", fontSize: "0.8rem", padding: 0 }}
            >
              Cancel reply
            </button>
          </div>
        )}

        {!currentUser && (
          <div className="wiki-notice wiki-notice-warning mb-4" style={{ fontSize: '0.875rem' }}>
            <strong>You are not logged in.</strong> Your IP address will be recorded.{' '}
            <a href={`/auth/login?redirect=/user/${username}/talk`} style={{ color: 'var(--color-progressive)' }}>Log in</a> to post with your username.
          </div>
        )}

        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="wiki-input"
          style={{ width: "100%", minHeight: "100px", resize: "vertical", fontFamily: "sans-serif" }}
          placeholder="Type your message..."
        />

        <div style={{ marginTop: "0.5em" }}>
          <button
            onClick={handlePost}
            disabled={posting || !newMessage.trim()}
            className="wiki-btn wiki-btn-primary"
          >
            {posting ? "Posting..." : "Post message"}
          </button>
        </div>
      </div>
    </div>
  );
}
