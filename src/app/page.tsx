import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { seedArticles, wrongFacts, onThisDayFacts } from "@/lib/seed-data";
import { slugify } from "@/lib/utils";

const knownSlugs = new Set(seedArticles.map((a) => a.slug));

function getDailyHash(): number {
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getDailyItems<T>(arr: T[], n: number): T[] {
  const hash = getDailyHash();
  const result: T[] = [];
  const used = new Set<number>();
  for (let i = 0; result.length < n && i < arr.length * 2; i++) {
    const idx = (hash + i * 31) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function renderWikiText(text: string) {
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const slug = slugify(target);
    const display = label || target;
    const isRedLink = !knownSlugs.has(slug);
    const className = isRedLink ? "new" : "";
    const titleAttr = isRedLink ? ` title="${target} (page does not exist)"` : "";
    return `<a href="/wiki/${slug}" class="${className}"${titleAttr}>${display}</a>`;
  });
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function getTodaysFacts(): { text: string }[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const todayFacts = onThisDayFacts.filter((f) => f.month === month && f.day === day);
  if (todayFacts.length >= 4) return todayFacts.slice(0, 4);

  const allFacts = [...todayFacts];
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const remaining = onThisDayFacts.filter((f) => !(f.month === month && f.day === day));
  for (let i = 0; allFacts.length < 4 && i < remaining.length; i++) {
    const idx = (dayOfYear + i * 7) % remaining.length;
    if (!allFacts.includes(remaining[idx])) {
      allFacts.push(remaining[idx]);
    }
  }
  return allFacts.slice(0, 4);
}

async function getArticles() {
  try {
    const supabase = await createClient();
    const { data: featured } = await supabase
      .from("articles").select("title, slug, summary, content, featured_image").eq("is_featured", true).limit(1).single();
    const { data: recentArticles } = await supabase
      .from("articles").select("title, slug, summary, featured_image, updated_at, profiles(username)")
      .order("updated_at", { ascending: false }).limit(10);
    const { data: popularArticles } = await supabase
      .from("articles").select("title, slug, view_count")
      .order("view_count", { ascending: false }).limit(5);
    if (recentArticles && recentArticles.length > 0) {
      return { featured, recentArticles, popularArticles, articleCount: recentArticles.length };
    }
  } catch {}

  const featured = seedArticles.find((a) => a.is_featured) || null;
  const recentArticles = seedArticles.map((a) => ({
    title: a.title, slug: a.slug, summary: a.summary, featured_image: a.featured_image,
    updated_at: new Date().toISOString(), profiles: null,
  }));
  const popularArticles = [...seedArticles]
    .sort((a, b) => b.view_count - a.view_count).slice(0, 5)
    .map((a) => ({ title: a.title, slug: a.slug, view_count: a.view_count }));
  return { featured, recentArticles, popularArticles, articleCount: seedArticles.length };
}

export default async function HomePage() {
  const { featured, recentArticles, popularArticles, articleCount } = await getArticles();
  const todaysFacts = getDailyItems(wrongFacts, 5);
  const onThisDay = getTodaysFacts();

  const featuredImage = featured?.featured_image
    || (featured?.content ? extractFirstImage(featured.content) : null);

  const dykArticle = seedArticles.find((a) => a.slug === "dogs") || seedArticles[3];
  const dykImage = dykArticle?.featured_image || (dykArticle ? extractFirstImage(dykArticle.content) : null);

  const newsArticle = recentArticles?.[0];
  const newsImage = (newsArticle as any)?.featured_image
    || (seedArticles.find((a) => a.slug === newsArticle?.slug)?.featured_image);

  return (
    <div className="mp-body">
      {/* Hidden via CSS: .mp-body .mw-body-header { display: none } */}
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Main Page</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content" style={{ maxWidth: 'none' }}>
        {/* Welcome — matches Wikipedia's centered welcome */}
        <div className="mp-welcome">
          <div className="mp-welcome-title">
            Welcome to{' '}
            <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.04em', fontSize: '1.3em' }}>
              <span style={{ fontSize: '1.1em' }}>W</span>
              <span style={{ fontVariant: 'small-caps', textTransform: 'lowercase', fontSize: '0.95em' }}>rongipedi</span>
              <span style={{ fontSize: '1.1em', color: 'var(--color-destructive)' }}>A</span>
            </span>
          </div>
          <div className="mp-welcome-sub">
            the <Link href="/about">free encyclopedia</Link> that <em>anyone can edit</em> and <em>nothing is true</em>.
          </div>
          <div className="mp-welcome-count">
            {articleCount?.toLocaleString()} articles in the wrong language
          </div>
        </div>

        {/* Two-column layout — 55 / 45 */}
        <div className="mp-2col">
          {/* ===== LEFT COLUMN ===== */}
          <div>
            {/* FROM TODAY'S FEATURED ARTICLE — green */}
            <div className="mp-section mp-green">
              <div className="mp-section-header">
                From today&apos;s featured article
              </div>
              <div className="mp-section-body">
                {featured ? (
                  <>
                    {featuredImage && (
                      <div style={{ float: 'left', marginRight: '0.8em', marginBottom: '0.4em' }}>
                        <Link href={`/wiki/${featured.slug}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={featuredImage}
                            alt={featured.title}
                            width={120}
                            style={{ border: '1px solid var(--border-subtle)' }}
                          />
                        </Link>
                      </div>
                    )}
                    <p style={{ margin: 0 }}>
                      <b><Link href={`/wiki/${featured.slug}`}>{featured.title}</Link></b>
                      {' '}{featured.summary && <span>{featured.summary.replace(/^This article is about.*?\. /, '')}</span>}
                      {' '}(<b><Link href={`/wiki/${featured.slug}`}>Full article...</Link></b>)
                    </p>
                  </>
                ) : (
                  <p>
                    No featured article yet.{' '}
                    <Link href="/create">Create one!</Link>
                  </p>
                )}
              </div>
              <div className="mp-section-footer">
                Recently featured: {seedArticles.slice(1, 4).map((a, i) => (
                  <span key={a.slug}>{i > 0 && ' · '}<Link href={`/wiki/${a.slug}`}>{a.title}</Link></span>
                ))}
                <br />
                <Link href="/category">Archive</Link> · <Link href="/create">More featured articles</Link> · <Link href="/about">About</Link>
              </div>
            </div>

            {/* DID YOU KNOW — blue (DYK shade) */}
            <div className="mp-section mp-dyk">
              <div className="mp-section-header">
                Did you know ... (you shouldn&apos;t)
              </div>
              <div className="mp-section-body">
                {dykImage && (
                  <div style={{ float: 'right', marginLeft: '0.8em', marginBottom: '0.4em' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dykImage}
                      alt="Did you know"
                      width={90}
                      style={{ border: '1px solid var(--border-subtle)' }}
                    />
                  </div>
                )}
                <ul style={{ margin: 0, paddingLeft: '1.6em', lineHeight: '1.8' }}>
                  {todaysFacts.map((fact, i) => {
                    const normalized = fact.replace(/^\.\.\.\s*that\s*/i, '');
                    return (
                      <li key={i}>
                        ... that <span dangerouslySetInnerHTML={{ __html: renderWikiText(normalized) }} />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mp-section-footer">
                <Link href="/category">Archive</Link> · <Link href="/create">Start a new article</Link> · <Link href="/generate">Nominate an article</Link>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div>
            {/* IN THE WRONG NEWS — blue (ITN shade) */}
            <div className="mp-section mp-blue">
              <div className="mp-section-header">
                In the wrong news
              </div>
              <div className="mp-section-body">
                {newsImage && (
                  <div style={{ float: 'right', marginLeft: '0.8em', marginBottom: '0.4em' }}>
                    <Link href={`/wiki/${newsArticle?.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newsImage}
                        alt="In the news"
                        width={100}
                        style={{ border: '1px solid var(--border-subtle)' }}
                      />
                    </Link>
                  </div>
                )}
                {recentArticles?.slice(0, 5).map((a: any, i: number) => (
                  <p key={a.slug} style={{ margin: i === 0 ? '0 0 0.5em 0' : '0.5em 0' }}>
                    {i === 0 && 'Researchers confirm that '}
                    {i === 1 && 'In a related development, '}
                    {i === 2 && 'Meanwhile, experts report that '}
                    {i === 3 && 'A new study finds that '}
                    {i === 4 && 'Sources indicate that '}
                    <b><Link href={`/wiki/${a.slug}`}>{a.title}</Link></b>
                    {a.summary ? ` ${a.summary.slice(0, 100).replace(/\.$/, '')}.` : '.'}
                  </p>
                ))}
              </div>
              <div className="mp-section-footer">
                <Link href="/special/random">More current events</Link> · <Link href="/generate">Nominate an article</Link>
              </div>
            </div>

            {/* ON THIS DAY — tan/beige */}
            <div className="mp-section mp-tan">
              <div className="mp-section-header">
                On this day in wrong history
              </div>
              <div className="mp-section-body">
                <div style={{ float: 'right', marginLeft: '0.8em', marginBottom: '0.4em' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=280&fit=crop"
                    alt="On this day"
                    width={80}
                    style={{ border: '1px solid var(--border-subtle)' }}
                  />
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.6em', lineHeight: '1.8' }}>
                  {onThisDay.map((fact, i) => (
                    <li key={i}>
                      <b>{new Date().getFullYear() - (simpleHash(fact.text) % 150 + 5)}</b> &ndash;{' '}
                      <span dangerouslySetInnerHTML={{ __html: renderWikiText(fact.text) }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mp-section-footer">
                <Link href="/category">More anniversaries</Link> · <Link href="/special/random">Archive</Link>
              </div>
            </div>
          </div>
        </div>

        {/* MOST VIEWED — gray, full width */}
        <div className="mp-section mp-gray">
          <div className="mp-section-header" style={{ textAlign: 'center' }}>
            Wrongipedia&apos;s most viewed wrongs
          </div>
          <div className="mp-section-body" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2em',
            flexWrap: 'wrap',
          }}>
            {popularArticles?.map((a: any) => (
              <span key={a.slug}>
                <Link href={`/wiki/${a.slug}`}>{a.title}</Link>
                <span style={{ color: 'var(--color-disabled)', fontSize: '0.8em', marginLeft: '4px' }}>
                  ({a.view_count?.toLocaleString()})
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Sister projects — Wikipedia-style subtle links */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5em',
          paddingTop: '1em',
          borderTop: '1px solid var(--border-muted)',
          fontSize: '0.85em',
          color: 'var(--color-subtle)',
        }}>
          Wrongipedia is hosted by the <Link href="/about">Wrongimedia Foundation</Link>, a non-prophetic organization.
        </div>
      </div>
    </div>
  );
}
