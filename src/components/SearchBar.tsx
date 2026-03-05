"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { seedArticles } from "@/lib/seed-data";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ title: string; slug: string; featured_image?: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      let results: { title: string; slug: string; featured_image?: string }[] = [];

      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("articles")
          .select("title, slug, featured_image")
          .ilike("title", `%${query}%`)
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

      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  }

  return (
    <div ref={ref} className="vector-search-box">
      <form onSubmit={handleSubmit} role="search" aria-label="Search Wrongipedia">
        <div className="vector-search-box-inner">
          {/* Magnifying glass icon */}
          <svg className="vector-search-box-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2 13.6a7 7 0 111.4-1.4l4.6 4.6-1.4 1.4-4.6-4.6zM8 13A5 5 0 108 3a5 5 0 000 10z" fill="currentColor" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search Wrongipedia"
            style={{ paddingRight: '80px' }}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions" role="listbox" aria-label="Search suggestions">
          {suggestions.map((s) => (
            <Link
              key={s.slug}
              href={`/wiki/${s.slug}`}
              onClick={() => setShowSuggestions(false)}
            >
              {s.featured_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.featured_image.replace(/w=\d+/, 'w=40').replace(/fit=crop/, 'fit=crop&h=40')}
                  alt=""
                  className="search-suggestion-thumb"
                />
              )}
              <span>{s.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
