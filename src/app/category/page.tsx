import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { seedCategories } from "@/lib/seed-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all categories of wrong information on Wrongipedia.",
};

export default async function CategoriesPage() {
  let categories: any[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("categories").select("*").order("name");
    if (data && data.length > 0) categories = data;
  } catch {}

  if (categories.length === 0) {
    categories = seedCategories;
  }

  return (
    <div className="wiki-container">
      <h1 className="text-2xl wiki-heading mb-4">All Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500" style={{ fontFamily: 'sans-serif' }}>
          No categories yet. Categories will appear as articles are created.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="border border-[var(--wiki-border)] p-3 bg-white">
              <Link href={`/category/${cat.slug}`} className="wiki-link font-medium">
                {cat.name}
              </Link>
              {cat.description && (
                <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
