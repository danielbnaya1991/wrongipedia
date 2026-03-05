"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";
import SearchBar from "./SearchBar";
import CiteModal from "./CiteModal";

function generateQRCodeSVG(url: string): string {
  // Simple QR-like SVG pattern (decorative, encodes URL in title)
  const size = 200;
  const modules = 25;
  const moduleSize = size / modules;
  let rects = '';
  // Generate a deterministic pattern based on URL hash
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
  }
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      // Finder patterns (corners)
      const inFinderTL = row < 7 && col < 7;
      const inFinderTR = row < 7 && col >= modules - 7;
      const inFinderBL = row >= modules - 7 && col < 7;
      if (inFinderTL || inFinderTR || inFinderBL) {
        const r = row < 7 ? row : row - (modules - 7);
        const c = inFinderTL ? col : inFinderTR ? col - (modules - 7) : col;
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (isOuter || isInner) {
          rects += `<rect x="${col * moduleSize}" y="${row * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="#000"/>`;
        }
      } else {
        // Data pattern based on hash
        const bit = ((hash >> ((row * modules + col) % 31)) & 1) ^ ((row + col) % 3 === 0 ? 1 : 0);
        if (bit) {
          rects += `<rect x="${col * moduleSize}" y="${row * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="#000"/>`;
        }
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><title>${url}</title><rect width="${size}" height="${size}" fill="#fff"/>${rects}</svg>`;
}

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mainMenuVisible, setMainMenuVisible] = useState(true);
  const [toolsVisible, setToolsVisible] = useState(true);
  const [printExportVisible, setPrintExportVisible] = useState(true);
  const [otherProjectsVisible, setOtherProjectsVisible] = useState(true);
  const [appearanceVisible, setAppearanceVisible] = useState(true);
  const [colorMode, setColorMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [fontSize, setFontSize] = useState<'small' | 'standard' | 'large'>('standard');
  const [contentWidth, setContentWidth] = useState<'standard' | 'wide' | 'full'>('standard');
  const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [citeModalOpen, setCiteModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [watchedArticle, setWatchedArticle] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // Detect if we're on an article page
  const isArticlePage = pathname.startsWith("/wiki/") && !pathname.includes("/edit") && !pathname.includes("/talk") && !pathname.includes("/history");
  const currentSlug = isArticlePage ? pathname.replace("/wiki/", "").split("/")[0] : "";
  const [articleTitle, setArticleTitle] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();
          if (data) setUser(data);
        }
      } catch {}
    }
    getUser();
  }, []);

  // Fetch notification count for logged-in users
  useEffect(() => {
    if (!user) return;
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotificationCount(data.unreadCount || 0);
      } catch {}
    }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [user]);

  // Check watchlist status for current article
  useEffect(() => {
    if (!isArticlePage || !currentSlug || !user) {
      setWatchedArticle(false);
      setCurrentArticleId(null);
      return;
    }
    async function checkWatch() {
      try {
        const { data: article } = await supabase
          .from("articles")
          .select("id")
          .eq("slug", currentSlug)
          .single();
        if (article) {
          setCurrentArticleId(article.id);
          const res = await fetch(`/api/watchlist?articleId=${article.id}`);
          const data = await res.json();
          setWatchedArticle(data.watched);
        }
      } catch {}
    }
    checkWatch();
  }, [isArticlePage, currentSlug, user]);

  // Extract article title from rendered DOM
  useEffect(() => {
    if (!isArticlePage) {
      setArticleTitle("");
      return;
    }
    const timer = setTimeout(() => {
      const heading = document.querySelector(".mw-first-heading");
      if (heading) {
        // Get just the text content without the star
        const clone = heading.cloneNode(true) as HTMLElement;
        const star = clone.querySelector(".featured-star");
        if (star) star.remove();
        setArticleTitle(clone.textContent?.trim() || "");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, isArticlePage]);

  // Extract TOC from rendered DOM on article pages
  useEffect(() => {
    if (!isArticlePage) {
      setTocItems([]);
      return;
    }
    // Wait for content to render
    const timer = setTimeout(() => {
      const container = document.querySelector(".mw-parser-output");
      if (!container) return;
      const headings = container.querySelectorAll("h2[id], h3[id], h4[id]");
      const items: { id: string; text: string; level: number }[] = [];
      headings.forEach((h) => {
        const level = parseInt(h.tagName[1]);
        const id = h.getAttribute("id") || "";
        // Get text without edit section
        const clone = h.cloneNode(true) as HTMLElement;
        const editSection = clone.querySelector(".mw-editsection");
        if (editSection) editSection.remove();
        items.push({ id, text: clone.textContent?.trim() || "", level });
      });
      setTocItems(items);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, isArticlePage]);

  // Sticky header on scroll
  useEffect(() => {
    function onScroll() {
      setStickyHeaderVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile TOC and cite modal on navigation
  useEffect(() => {
    setMobileTocOpen(false);
    setCiteModalOpen(false);
  }, [pathname]);

  // Scroll-spy for sidebar TOC active state
  const [activeTocId, setActiveTocId] = useState<string>("");
  useEffect(() => {
    if (!isArticlePage || tocItems.length === 0) return;
    function onScroll() {
      const headings = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];
      let activeId = "";
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= 100) {
          activeId = h.id;
        }
      }
      setActiveTocId(activeId);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticlePage, tocItems]);

  // Color mode toggle — apply/remove .dark class on <html>
  useEffect(() => {
    const html = document.documentElement;
    if (colorMode === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (colorMode === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('dark');
      html.classList.remove('light');
    }
  }, [colorMode]);

  // Font size toggle
  useEffect(() => {
    document.body.classList.remove('font-small', 'font-standard', 'font-large');
    document.body.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  // Content width toggle
  useEffect(() => {
    document.body.classList.remove('width-standard', 'width-wide', 'width-full');
    document.body.classList.add(`width-${contentWidth}`);
  }, [contentWidth]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }

  // Tool handlers
  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast("Link copied to clipboard!");
    }).catch(() => {
      showToast("Could not copy link");
    });
  }, []);

  const handleDownloadQR = useCallback(() => {
    const svg = generateQRCodeSVG(window.location.href);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wrongipedia-qr-${currentSlug || "page"}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("QR code downloaded!");
  }, [currentSlug]);

  const handlePrintPDF = useCallback(() => {
    window.print();
  }, []);

  const handleToggleWatch = useCallback(async () => {
    if (!currentArticleId || !user) {
      showToast("Log in to use your watchlist");
      return;
    }
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId: currentArticleId }),
      });
      const data = await res.json();
      setWatchedArticle(data.watched);
      showToast(data.watched ? "Added to your watchlist" : "Removed from your watchlist");
    } catch {
      showToast("Could not update watchlist");
    }
  }, [currentArticleId, user]);

  const handlePrintableVersion = useCallback(() => {
    document.documentElement.classList.add("printable-mode");
    showToast("Printable mode enabled. Press Ctrl+P to print, or refresh to exit.");
  }, []);

  return (
    <div className="mw-page-container">
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Toast notification */}
      {toast && <div className="wiki-toast" role="status" aria-live="polite">{toast}</div>}

      {/* Cite this article modal */}
      <CiteModal
        isOpen={citeModalOpen}
        onClose={() => setCiteModalOpen(false)}
        articleTitle={articleTitle}
        articleSlug={currentSlug}
      />

      {/* Header */}
      <header className="mw-header">
        <div className="vector-header-start">
          {/* Hamburger menu toggle (mobile) */}
          <button
            className="mw-header-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M2 4h16v1.5H2zM2 9.25h16v1.5H2zM2 14.5h16V16H2z" fill="currentColor" />
            </svg>
          </button>

          <Link href="/" className="mw-logo">
            <svg className="mw-logo-icon" viewBox="0 0 50 50" width="36" height="36">
              <circle cx="25" cy="25" r="23" fill="none" stroke="#ccc" strokeWidth="1.5"/>
              <circle cx="25" cy="25" r="20" fill="none" stroke="#999" strokeWidth="0.5"/>
              <ellipse cx="25" cy="25" rx="20" ry="8" fill="none" stroke="#bbb" strokeWidth="0.6"/>
              <ellipse cx="25" cy="25" rx="20" ry="14" fill="none" stroke="#bbb" strokeWidth="0.6"/>
              <ellipse cx="25" cy="25" rx="8" ry="20" fill="none" stroke="#bbb" strokeWidth="0.6"/>
              <ellipse cx="25" cy="25" rx="14" ry="20" fill="none" stroke="#bbb" strokeWidth="0.6"/>
              <line x1="5" y1="25" x2="45" y2="25" stroke="#bbb" strokeWidth="0.6"/>
              <line x1="25" y1="5" x2="25" y2="45" stroke="#bbb" strokeWidth="0.6"/>
              <text x="14" y="20" fontSize="8" fill="#999" fontFamily="serif" fontWeight="bold">W</text>
              <text x="27" y="20" fontSize="7" fill="#aaa" fontFamily="serif">R</text>
              <text x="17" y="33" fontSize="7" fill="#aaa" fontFamily="serif">O</text>
              <text x="28" y="33" fontSize="7" fill="#bbb" fontFamily="serif">N</text>
              <text x="20" y="42" fontSize="5" fill="#ccc" fontFamily="serif">G</text>
            </svg>
            <span className="mw-logo-container">
              <span className="mw-logo-wordmark">
                <span className="mw-logo-cap">W</span>
                <span className="mw-logo-smallcaps">rongipedi</span>
                <span className="mw-logo-cap mw-logo-cap-last">A</span>
              </span>
              <span className="mw-logo-tagline">The Wrong Encyclopedia</span>
            </span>
          </Link>
        </div>

        <div className="vector-header-end">
          <SearchBar />
          {/* Personal tools — text + icons like Wikipedia */}
          <div className="vector-user-links">
            {user ? (
              <Link href={`/user/${user.username}`}>{user.username}</Link>
            ) : (
              <>
                <Link href="/auth/signup">Create account</Link>
                <Link href="/auth/login">Log in</Link>
              </>
            )}
          </div>
          <div className="vector-user-icons">
            {user ? (
              <>
                {/* Notifications */}
                <Link href="/special/notifications" className="vector-user-icon" title="Notifications" style={{ position: 'relative' }}>
                  <svg viewBox="0 0 20 20"><path d="M16 7a5.38 5.38 0 00-4.46-4.85C11.6 1.46 11.53 0 10 0S8.4 1.46 8.46 2.15A5.38 5.38 0 004 7c0 6-2 7-2 7h16s-2-1-2-7zm-4.5 11a2.5 2.5 0 01-3 0 2 2 0 001.5.5 2 2 0 001.5-.5z" fill="currentColor"/></svg>
                  {notificationCount > 0 && (
                    <span style={{
                      position: 'absolute', top: '-4px', right: '-4px',
                      background: '#d33', color: '#fff', borderRadius: '50%',
                      width: '14px', height: '14px', fontSize: '9px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'sans-serif', fontWeight: 'bold',
                    }}>
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </Link>
                {/* Watchlist */}
                <Link href="/special/watchlist" className="vector-user-icon" title="Watchlist">
                  <svg viewBox="0 0 20 20"><path d="M10 1l2.39 6.34H19l-5.3 3.82L15.69 18 10 13.47 4.31 18l2-6.84L1 7.34h6.61z" fill="currentColor"/></svg>
                </Link>
                {/* User page */}
                <Link href={`/user/${user.username}`} className="vector-user-icon" title="User page">
                  <svg viewBox="0 0 20 20"><path d="M10 11c-5.92 0-8 3-8 5v1h16v-1c0-2-2.08-5-8-5" fill="currentColor"/><circle cx="10" cy="5.5" r="4.5" fill="currentColor"/></svg>
                </Link>
                {/* Contributions */}
                <Link href={`/user/${user.username}`} className="vector-user-icon" title="Contributions">
                  <svg viewBox="0 0 20 20"><path d="M16 1H4a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2zM5 5h10v1H5zm0 3h10v1H5zm0 3h7v1H5z" fill="currentColor"/></svg>
                </Link>
                {/* Create article */}
                <Link href="/create" className="vector-user-icon" title="Create article">
                  <svg viewBox="0 0 20 20"><path d="M16.77 8l1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.8-9.8-4.75-4.75z" fill="currentColor"/></svg>
                </Link>
                {/* Log out */}
                <button
                  onClick={handleLogout}
                  className="vector-user-icon"
                  title="Log out"
                  style={{ border: 'none', background: 'none' }}
                >
                  <svg viewBox="0 0 20 20"><path d="M3 3h8V1H3a2 2 0 00-2 2v14a2 2 0 002 2h8v-2H3zm13.5 7L13 6.5V9H7v2h6v2.5z" fill="currentColor"/></svg>
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="vector-user-icon" title="Log in">
                  <svg viewBox="0 0 20 20"><path d="M10 11c-5.92 0-8 3-8 5v1h16v-1c0-2-2.08-5-8-5" fill="currentColor"/><circle cx="10" cy="5.5" r="4.5" fill="currentColor"/></svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Sticky header (appears on scroll) */}
      <header className={`mw-sticky-header${stickyHeaderVisible ? ' sticky-visible' : ''}`}>
        <div className="sticky-header-inner">
          <Link href="/" className="sticky-logo" aria-label="Wrongipedia home">
            <svg viewBox="0 0 50 50" width="28" height="28">
              <circle cx="25" cy="25" r="23" fill="none" stroke="#ccc" strokeWidth="1.5"/>
              <text x="14" y="20" fontSize="8" fill="#999" fontFamily="serif" fontWeight="bold">W</text>
              <text x="27" y="20" fontSize="7" fill="#aaa" fontFamily="serif">R</text>
              <text x="17" y="33" fontSize="7" fill="#aaa" fontFamily="serif">O</text>
              <text x="28" y="33" fontSize="7" fill="#bbb" fontFamily="serif">N</text>
              <text x="20" y="42" fontSize="5" fill="#ccc" fontFamily="serif">G</text>
            </svg>
          </Link>
          {isArticlePage && articleTitle && (
            <span className="sticky-article-title">{articleTitle}</span>
          )}
          {isArticlePage && currentSlug && (
            <div className="sticky-tabs">
              <Link href={`/wiki/${currentSlug}/talk`}>Talk</Link>
              <Link href={`/wiki/${currentSlug}/edit`}>Edit</Link>
              <Link href={`/wiki/${currentSlug}/history`}>History</Link>
            </div>
          )}
          <SearchBar />
          <div className="sticky-user-links">
            {user ? (
              <Link href={`/user/${user.username}`} className="vector-user-icon" title={user.username}>
                <svg viewBox="0 0 20 20"><path d="M10 11c-5.92 0-8 3-8 5v1h16v-1c0-2-2.08-5-8-5" fill="currentColor"/><circle cx="10" cy="5.5" r="4.5" fill="currentColor"/></svg>
              </Link>
            ) : (
              <Link href="/auth/login" className="vector-user-icon" title="Log in">
                <svg viewBox="0 0 20 20"><path d="M10 11c-5.92 0-8 3-8 5v1h16v-1c0-2-2.08-5-8-5" fill="currentColor"/><circle cx="10" cy="5.5" r="4.5" fill="currentColor"/></svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile TOC floating button */}
      {isArticlePage && tocItems.length > 2 && (
        <>
          <button
            className="mobile-toc-btn"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            aria-label="Table of contents"
          >
            <svg viewBox="0 0 20 20" width="16" height="16"><path d="M2 4h16v1.5H2zm0 5h10v1.5H2zm0 5h14v1.5H2z" fill="currentColor"/></svg>
            <span>Contents</span>
          </button>
          {mobileTocOpen && (
            <div className="mobile-toc-overlay" onClick={() => setMobileTocOpen(false)}>
              <div className="mobile-toc-panel" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-toc-header">
                  <strong>Contents</strong>
                  <button onClick={() => setMobileTocOpen(false)} aria-label="Close">✕</button>
                </div>
                <ol className="mobile-toc-list">
                  {tocItems.map((item, i) => (
                    <li key={i} className={item.level > 2 ? 'toc-level-3' : ''}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMobileTocOpen(false)}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </>
      )}

      {/* Sidebar backdrop (mobile overlay) */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content grid */}
      <div className="mw-page-container-inner">
        {/* siteNotice banner — Wikipedia-style, doesn't spoil the premise */}
        <div className="site-notice">
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
            Please donate to the Wrongimedia Foundation to help maintain 6.8 million articles in 312 wrong languages.
          </Link>
        </div>

        {/* Left Sidebar */}
        <aside className={`vector-column-start${sidebarOpen ? ' sidebar-open' : ''}`} role="navigation" aria-label="Site navigation">
          <nav>
            {/* Main menu heading with hide toggle */}
            <div className="sidebar-heading">
              <span>Main menu</span>
              <button
                className="sidebar-heading-toggle"
                onClick={() => setMainMenuVisible(!mainMenuVisible)}
              >
                {mainMenuVisible ? 'hide' : 'show'}
              </button>
            </div>

            {mainMenuVisible && (
              <>
                <div className="vector-menu-portal">
                  <div className="vector-menu-heading">Navigation</div>
                  <div className="vector-menu-content">
                    <ul className="vector-menu-content-list">
                      <li><Link href="/">Main page</Link></li>
                      <li><Link href="/category">Contents</Link></li>
                      <li><Link href="/special/random">Random article</Link></li>
                      <li><Link href="/special/recentchanges">Recent changes</Link></li>
                      <li><Link href="/about">About Wrongipedia</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="vector-menu-portal">
                  <div className="vector-menu-heading">Contribute</div>
                  <div className="vector-menu-content">
                    <ul className="vector-menu-content-list">
                      <li><Link href="/create">Create article</Link></li>
                      <li><Link href="/generate">AI Generator</Link></li>
                      {user && <li><Link href="/special/watchlist">Watchlist</Link></li>}
                      {user && <li><Link href="/special/preferences">Preferences</Link></li>}
                    </ul>
                  </div>
                </div>
                <div className="vector-menu-portal">
                  <div className="vector-menu-heading">Wrongipedia</div>
                  <div className="vector-menu-content">
                    <ul className="vector-menu-content-list">
                      <li><Link href="/wrongipedia/policies">Policies</Link></li>
                      <li><Link href="/wrongipedia/assume-bad-faith">Assume bad faith</Link></li>
                      <li><Link href="/special/article-of-the-month">Article of the month</Link></li>
                      <li><Link href="/special/barnstars">Barnstars</Link></li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </nav>

          {/* Sidebar TOC for article pages */}
          {isArticlePage && tocItems.length > 2 && (
            <div className="sidebar-toc">
              <div className="sidebar-toc-title">Contents</div>
              <ol>
                {tocItems.map((item, i) => (
                  <li key={i} className={item.level > 2 ? 'toc-level-3' : ''}>
                    <a href={`#${item.id}`} className={activeTocId === item.id ? 'toc-active' : ''}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>

        {/* Page Content */}
        <main className="mw-body" id="main-content">
          {/* Language button in titlebar area (Vector 2022 position) */}
          {isArticlePage && (
            <div className="mw-language-btn-container" style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
              <button
                className="mw-language-btn"
                onClick={() => showToast("This article is only available in Wrong English")}
              >
                <svg viewBox="0 0 20 20" width="14" height="14"><path d="M20 18h-1.44a.6.6 0 01-.4-.12.8.8 0 01-.23-.31L17 15h-5l-1 2.54a.8.8 0 01-.22.3.6.6 0 01-.4.16H9l4.66-11.95h2.08zm-5.55-4.5h3.1L16 9.45zM4.95 8.7a.6.6 0 01-.15-.46l.07-.51a.7.7 0 01.15-.36.6.6 0 01.4-.18h5.8a.44.44 0 01.32.14.4.4 0 01.12.32v.4a.5.5 0 01-.09.3l-2.7 3.72a6.3 6.3 0 011.94.57 5 5 0 011.52 1.08.6.6 0 01.1.18.5.5 0 010 .2l-.18.63a.4.4 0 01-.15.24.3.3 0 01-.27.05 5 5 0 01-1.7-1.1 5.6 5.6 0 01-1.6 1.1.3.3 0 01-.27-.06.4.4 0 01-.15-.23l-.18-.56a.5.5 0 01-.01-.2.4.4 0 01.1-.17 5.2 5.2 0 001.2-1.05L5.9 9.23A.7.7 0 014.95 8.7z" fill="currentColor"/></svg>
                3 languages
              </button>
            </div>
          )}
          {children}
        </main>

        {/* Right Sidebar (Tools) */}
        <aside className="vector-column-end" role="navigation" aria-label="Tools">
          <div className="sidebar-heading">
            <span>Tools</span>
            <button
              className="sidebar-heading-toggle"
              onClick={() => setToolsVisible(!toolsVisible)}
            >
              {toolsVisible ? 'hide' : 'show'}
            </button>
          </div>

          {toolsVisible && (
            <div className="vector-menu-portal">
              <div className="vector-menu-heading">General</div>
              <div className="vector-menu-content">
                <ul className="vector-menu-content-list">
                  <li>
                    <Link href={currentSlug ? `/special/whatlinkshere?page=${currentSlug}` : '#'}>
                      What links here
                    </Link>
                  </li>
                  <li>
                    <Link href={currentSlug ? `/wiki/${currentSlug}/history` : '#'}>
                      Related changes
                    </Link>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleCopyLink(); }}>
                      Permanent link
                    </a>
                  </li>
                  <li>
                    <Link href={currentSlug ? `/special/pageinfo?page=${currentSlug}` : '#'}>
                      Page information
                    </Link>
                  </li>
                  {isArticlePage && (
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCiteModalOpen(true); }}>
                        Cite this article
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleCopyLink(); }}>
                      Get shortened URL
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadQR(); }}>
                      Download QR code
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Print/export section */}
          <div className="sidebar-heading sidebar-heading-sub">
            <span>Print/export</span>
            <button
              className="sidebar-heading-toggle"
              onClick={() => setPrintExportVisible(!printExportVisible)}
            >
              {printExportVisible ? 'hide' : 'show'}
            </button>
          </div>
          {printExportVisible && (
            <div className="vector-menu-portal">
              <div className="vector-menu-content">
                <ul className="vector-menu-content-list">
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handlePrintPDF(); }}>
                      Download as PDF
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handlePrintableVersion(); }}>
                      Printable version
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* In other projects section */}
          <div className="sidebar-heading sidebar-heading-sub">
            <span>In other projects</span>
            <button
              className="sidebar-heading-toggle"
              onClick={() => setOtherProjectsVisible(!otherProjectsVisible)}
            >
              {otherProjectsVisible ? 'hide' : 'show'}
            </button>
          </div>
          {otherProjectsVisible && (
            <div className="vector-menu-portal">
              <div className="vector-menu-content">
                <ul className="vector-menu-content-list">
                  <li><Link href="/about">Wrongimedia Commons</Link></li>
                  <li><Link href="/about">WrongBooks</Link></li>
                  <li><Link href="/about">Wrongtionary</Link></li>
                  <li><Link href="/about">Wrongiquote</Link></li>
                  <li><Link href="/about">Wrongisource</Link></li>
                  <li><Link href="/about">Wrongiversity</Link></li>
                  <li><Link href="/about">Wrongivoyage</Link></li>
                  <li><Link href="/about">Wrongidata</Link></li>
                  <li><Link href="/about">Wronginews</Link></li>
                  <li><Link href="/about">Wrongispecies</Link></li>
                </ul>
              </div>
            </div>
          )}

          {/* Appearance section */}
          <div className="sidebar-heading sidebar-heading-sub">
            <span>Appearance</span>
            <button
              className="sidebar-heading-toggle"
              onClick={() => setAppearanceVisible(!appearanceVisible)}
            >
              {appearanceVisible ? 'hide' : 'show'}
            </button>
          </div>
          {appearanceVisible && (
            <div className="appearance-section">
              <div className="appearance-group">
                <div className="appearance-label">Color</div>
                <div className="appearance-options">
                  <label className={`appearance-option${colorMode === 'auto' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="colorMode" value="auto" checked={colorMode === 'auto'} onChange={() => setColorMode('auto')} />
                    <span>Automatic</span>
                  </label>
                  <label className={`appearance-option${colorMode === 'light' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="colorMode" value="light" checked={colorMode === 'light'} onChange={() => setColorMode('light')} />
                    <span>Light</span>
                  </label>
                  <label className={`appearance-option${colorMode === 'dark' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="colorMode" value="dark" checked={colorMode === 'dark'} onChange={() => setColorMode('dark')} />
                    <span>Dark</span>
                  </label>
                </div>
              </div>
              <div className="appearance-group">
                <div className="appearance-label">Font size</div>
                <div className="appearance-options">
                  <label className={`appearance-option${fontSize === 'small' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="fontSize" value="small" checked={fontSize === 'small'} onChange={() => setFontSize('small')} />
                    <span style={{ fontSize: '0.7em' }}>Small</span>
                  </label>
                  <label className={`appearance-option${fontSize === 'standard' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="fontSize" value="standard" checked={fontSize === 'standard'} onChange={() => setFontSize('standard')} />
                    <span>Standard</span>
                  </label>
                  <label className={`appearance-option${fontSize === 'large' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="fontSize" value="large" checked={fontSize === 'large'} onChange={() => setFontSize('large')} />
                    <span style={{ fontSize: '1.1em' }}>Large</span>
                  </label>
                </div>
              </div>
              <div className="appearance-group">
                <div className="appearance-label">Width</div>
                <div className="appearance-options">
                  <label className={`appearance-option${contentWidth === 'standard' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="contentWidth" value="standard" checked={contentWidth === 'standard'} onChange={() => setContentWidth('standard')} />
                    <span>Standard</span>
                  </label>
                  <label className={`appearance-option${contentWidth === 'wide' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="contentWidth" value="wide" checked={contentWidth === 'wide'} onChange={() => setContentWidth('wide')} />
                    <span>Wide</span>
                  </label>
                  <label className={`appearance-option${contentWidth === 'full' ? ' appearance-option-active' : ''}`}>
                    <input type="radio" name="contentWidth" value="full" checked={contentWidth === 'full'} onChange={() => setContentWidth('full')} />
                    <span>Full</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Footer */}
        <div className="mw-footer-container">
          <footer className="mw-footer">
            <div className="footer-content">
              <div className="footer-text">
                <ul className="footer-info">
                  <li>
                    Content is available under the Whose Creative Commons Attribution-ShareAWrong License 4.0; additional misinformation may apply.
                  </li>
                </ul>
                <ul className="footer-places">
                  <li><Link href="/about">Wrongivacy policy</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">About Wrongipedia</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/disclaimers">Disclaimers</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">Contact</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">Code of Misconduct</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">Developers</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">Statistics</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">Cookie statement</Link></li>
                  <li className="footer-dot">&middot;</li>
                  <li><Link href="/about">Mobile view</Link></li>
                </ul>
              </div>

              {/* Footer logos — like Wikipedia's Wikimedia + MediaWiki */}
              <div className="footer-logos">
                <span className="footer-logo-item" title="Wrongimedia Foundation">
                  <svg viewBox="0 0 44 40" width="44" height="40">
                    <circle cx="22" cy="16" r="14" fill="none" stroke="#999" strokeWidth="1.2"/>
                    <text x="22" y="20" textAnchor="middle" fontSize="10" fill="#999" fontFamily="serif" fontWeight="bold">W</text>
                    <text x="22" y="36" textAnchor="middle" fontSize="5" fill="#aaa" fontFamily="sans-serif">Foundation</text>
                  </svg>
                </span>
                <span className="footer-logo-item" title="Powered by WrongWiki">
                  <svg viewBox="0 0 44 40" width="44" height="40">
                    <rect x="4" y="4" width="36" height="24" rx="3" fill="none" stroke="#999" strokeWidth="1"/>
                    <text x="22" y="19" textAnchor="middle" fontSize="7" fill="#999" fontFamily="sans-serif">Wrong</text>
                    <text x="22" y="36" textAnchor="middle" fontSize="5" fill="#aaa" fontFamily="sans-serif">WrongWiki</text>
                  </svg>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
