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
      <div key={msg.id} style={{ marginLeft: `${depth * 2}em` }} className="mb-3">
        <div className="border-l-2 border-[var(--wiki-border)] pl-3">
          <div className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'sans-serif' }}>
            {msg.profiles && (
              <Link href={`/user/${msg.profiles.username}`} className="wiki-link font-medium">
                {msg.profiles.username}
              </Link>
            )}
            {" — "}
            {formatDate(msg.created_at)}
          </div>
          <div className="mb-1">{msg.content}</div>
          {userId && (
            <button
              onClick={() => setReplyTo(replyTo === msg.id ? null : msg.id)}
              className="text-xs wiki-link bg-transparent border-none cursor-pointer"
              style={{ fontFamily: 'sans-serif' }}
            >
              {replyTo === msg.id ? "Cancel reply" : "Reply"}
            </button>
          )}

          {replyTo === msg.id && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="wiki-input flex-1"
                placeholder="Write a reply..."
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
        <ArticleTabs slug={slug} />
        <div className="wiki-container">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <ArticleTabs slug={slug} />
      <div className="wiki-container">
        <h1 className="text-2xl wiki-heading mb-4">
          Talk: {articleTitle}
        </h1>

        {messages.length === 0 ? (
          <div className="wiki-notice wiki-notice-info" style={{ marginBottom: '1em' }}>
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
          <div className="mb-6">
            {messages.map((msg) => renderMessage(msg))}
          </div>
        )}

        {userId && !replyTo && (
          <div className="border-t border-[var(--wiki-border)] pt-4">
            <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'sans-serif' }}>
              New topic
            </h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="wiki-input w-full h-24 mb-2"
              placeholder="Start a new discussion topic..."
            />
            <button onClick={handlePost} disabled={posting} className="wiki-btn wiki-btn-primary">
              {posting ? "Posting..." : "Post message"}
            </button>
          </div>
        )}

        {!userId && (
          <div className="wiki-notice wiki-notice-info">
            <Link href={`/auth/login?redirect=/wiki/${slug}/talk`} className="wiki-link">
              Log in
            </Link>
            {" "}to participate in the discussion.
          </div>
        )}
      </div>
    </div>
  );
}
