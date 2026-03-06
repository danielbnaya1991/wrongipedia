import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { seedArticles, seedCategories } from "@/lib/seed-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wrongipedia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get DB articles
  let dbSlugs: string[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("articles").select("slug, updated_at");
    if (data) dbSlugs = data.map((a) => a.slug);
  } catch {}

  // Merge seed + DB slugs (deduplicated)
  const allSlugs = new Set([...seedArticles.map((a) => a.slug), ...dbSlugs]);

  const articleUrls = Array.from(allSlugs).map((slug) => ({
    url: `${BASE_URL}/wiki/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryUrls = seedCategories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...articleUrls,
    ...categoryUrls,
  ];
}
