import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { seedArticles } from "@/lib/seed-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  let results: { title: string; slug: string; featured_image?: string }[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("title, slug, featured_image")
      .ilike("title", `%${query.replace(/%/g, "\\%").replace(/_/g, "\\_")}%`)
      .limit(6);
    if (data && data.length > 0) results = data;
  } catch {}

  // Fallback to seed data
  if (results.length === 0) {
    const q = query.toLowerCase();
    results = seedArticles
      .filter((a) => a.title.toLowerCase().includes(q))
      .slice(0, 6)
      .map((a) => ({ title: a.title, slug: a.slug, featured_image: a.featured_image }));
  }

  return NextResponse.json(results);
}
