"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { seedArticles } from "@/lib/seed-data";
import ArticleTabs from "@/components/ArticleTabs";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { TalkMessage } from "@/lib/types";

export default function TalkPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [messages, setMessages] = useState<TalkMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [articleId, setArticleId] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const loadData = useCallback(async () => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUserId(user.id);

    try {
      const { data: article } = await supabase
        .from("articles")
        .select("id, title")
        .eq("slug", slug)
        .single();

      if (article) {
        setArticleId(article.id);
        setArticleTitle(article.title);

        const { data: msgs } = await supabase
          .from("talk_messages")
          .select("*, profiles(*)")
          .eq("article_id", article.id)
          .order("created_at", { ascending: true });

        if (msgs) {
          const topLevel: TalkMessage[] = [];
          const byId: Record<string, TalkMessage> = {};

          msgs.forEach((m: any) => {
            byId[m.id] = { ...m, replies: [] };
          });

          msgs.forEach((m: any) => {
            if (m.parent_id && byId[m.parent_id]) {
              byId[m.parent_id].replies!.push(byId[m.id]);
            } else {
              topLevel.push(byId[m.id]);
            }
          });

          setMessages(topLevel);
        }
        setLoading(false);
        return;
      }
    } catch {}

    // Fallback to seed data
    const seedArticle = seedArticles.find((a) => a.slug === slug);
    if (seedArticle) {
      setArticleTitle(seedArticle.title);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handlePost() {
    if (!newMessage.trim() || !userId || !articleId) return;
    setPosting(true);

    const supabase = createClient();
    await supabase.from("talk_messages").insert({
      article_id: articleId,
      user_id: userId,
      content: newMessage,
      parent_id: replyTo,
    });

    setNewMessage("");
    setReplyTo(null);
    setPosting(false);
    await loadData();
  }

  function renderMessage(msg: TalkMessage, depth = 0) {
    return (
      <div key={msg.id} style={{ marginLeft: `${depth * 2}em`, marginBottom: '0.75em' }}>
        <div style={{ borderLeft: '2px solid var(--border-muted)', paddingLeft: '0.75em' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', marginBottom: '0.25em', fontFamily: 'var(--font-sans)' }}>
            {msg.profiles && (
              <Link href={`/user/${msg.profiles.username}`} style={{ color: 'var(--color-progressive)', fontWeight: 500 }}>
                {msg.profiles.username}
              </Link>
            )}
            {" — "}
            {formatDate(msg.created_at)}
          </div>
          <div style={{ fontSize: '0.875rem', marginBottom: '0.25em' }}>{msg.content}</div>
          {userId && (
            <button
              onClick={() => setReplyTo(replyTo === msg.id ? null : msg.id)}
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-progressive)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {replyTo === msg.id ? "Cancel reply" : "Reply"}
            </button>
          )}

          {replyTo === msg.id && (
            <div style={{ marginTop: '0.5em', display: 'flex', gap: '0.5em' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="wiki-input"
                placeholder="Write a reply..."
                style={{ flex: 1 }}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
              />
              <button onClick={handlePost} disabled={posting} className="wiki-btn wiki-btn-primary">
                Reply
              </button>
            </div>
          )}
        </div>

        {msg.replies?.map((reply) => renderMessage(reply, depth + 1))}
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="mw-body-header">
          <h1 className="mw-first-heading">Talk: {articleTitle || slug}</h1>
          <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
        </div>
        <ArticleTabs slug={slug} />
        <div className="mw-body-content" style={{ marginTop: '1em' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Talk: {articleTitle}</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <ArticleTabs slug={slug} />

      <div className="mw-body-content" style={{ marginTop: '1em' }}>
        {messages.length === 0 ? (
          <div className="mw-notice mw-notice-info" style={{ marginBottom: '1em' }}>
            {!articleId ? (
              <>
                This is a seed article. Discussion will be available when the community grows.
                <br />
                <span style={{ fontSize: '0.85em', color: 'var(--color-subtle)' }}>
                  Seed articles are built-in examples — create a new article or sign up to start discussing!
                </span>
              </>
            ) : (
              <>No discussion yet. Be the first to start a conversation!</>
            )}
          </div>
        ) : (
          <div style={{ marginBottom: '1.5em' }}>
            {messages.map((msg) => renderMessage(msg))}
          </div>
        )}

        {userId && !replyTo && (
          <div style={{ borderTop: '1px solid var(--border-muted)', paddingTop: '1em' }}>
            <h3 style={{ fontSize: '1.1em', fontWeight: 500, marginBottom: '0.5em', fontFamily: 'var(--font-sans)' }}>
              New topic
            </h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="wiki-input"
              placeholder="Start a new discussion topic..."
              style={{ width: '100%', height: '6em', marginBottom: '0.5em', resize: 'vertical' }}
            />
            <button onClick={handlePost} disabled={posting} className="wiki-btn wiki-btn-primary">
              {posting ? "Posting..." : "Post message"}
            </button>
          </div>
        )}

        {!userId && (
          <div className="mw-notice mw-notice-info">
            <Link href={`/auth/login?redirect=/wiki/${slug}/talk`} style={{ color: 'var(--color-progressive)' }}>
              Log in
            </Link>
            {" "}to participate in the discussion.
          </div>
        )}
      </div>
    </div>
  );
}
