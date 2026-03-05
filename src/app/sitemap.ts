import type { MetadataRoute } from "next";
import { seedArticles, seedCategories } from "@/lib/seed-data";

const BASE_URL = "https://wrongipedia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls = seedArticles.map((a) => ({
    url: `${BASE_URL}/wiki/${a.slug}`,
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
    {
      url: `${BASE_URL}/create`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/generate`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...articleUrls,
    ...categoryUrls,
  ];
}
