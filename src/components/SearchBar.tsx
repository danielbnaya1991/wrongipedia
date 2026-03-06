"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar({ className }: { className?: string }) {
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
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        }
      } catch {
        setSuggestions([]);
      }
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
    <div ref={ref} className={`vector-search-box${className ? ` ${className}` : ''}`}>
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
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); else if (query.length >= 2) setShowSuggestions(true); }}
            placeholder="Search Wrongipedia"
          />
          <button type="submit" tabIndex={-1}>Search</button>
        </div>
      </form>

      {showSuggestions && (
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
          {query.trim().length > 0 && (
            <button
              className="search-suggestions-footer"
              onClick={() => { router.push(`/search?q=${encodeURIComponent(query.trim())}`); setShowSuggestions(false); }}
            >
              <svg viewBox="0 0 20 20"><path d="M12.2 13.6a7 7 0 111.4-1.4l4.6 4.6-1.4 1.4-4.6-4.6zM8 13A5 5 0 108 3a5 5 0 000 10z" fill="currentColor" /></svg>
              <span>Search for pages containing <b>{query.trim()}</b></span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
