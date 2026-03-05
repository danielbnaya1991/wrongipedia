import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { seedArticles } from "@/lib/seed-data";

export async function GET() {
  let articles: { slug: string }[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("articles").select("slug").limit(100);
    if (data && data.length > 0) articles = data;
  } catch {}

  // Fallback to seed
  if (articles.length === 0) {
    articles = seedArticles.map((a) => ({ slug: a.slug }));
  }

  if (articles.length === 0) redirect("/");

  const random = articles[Math.floor(Math.random() * articles.length)];
  redirect(`/wiki/${random.slug}`);
}
