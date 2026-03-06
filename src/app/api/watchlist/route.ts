import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET: Check if article is in user's watchlist
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ error: "articleId required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ watched: false, count: 0 });
  }

  const { data } = await supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("article_id", articleId)
    .single();

  const { count } = await supabase
    .from("watchlist")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return NextResponse.json({ watched: !!data, count: count || 0 });
}

// POST: Toggle watch/unwatch
export async function POST(request: Request) {
  const { articleId } = await request.json();

  if (!articleId) {
    return NextResponse.json({ error: "articleId required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Must be logged in to use watchlist" }, { status: 401 });
  }

  // Check if already watching
  const { data: existing } = await supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("article_id", articleId)
    .single();

  if (existing) {
    // Unwatch
    await supabase
      .from("watchlist")
      .delete()
      .eq("user_id", user.id)
      .eq("article_id", articleId);
    return NextResponse.json({ watched: false });
  } else {
    // Watch
    await supabase
      .from("watchlist")
      .insert({ user_id: user.id, article_id: articleId });
    return NextResponse.json({ watched: true });
  }
}
