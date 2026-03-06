import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { seedArticles, wrongFacts, onThisDayFacts } from "@/lib/seed-data";
import { slugify } from "@/lib/utils";

export const revalidate = 60; // Revalidate every 60 seconds

const knownSlugs = new Set(seedArticles.map((a) => a.slug));

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
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
  if (todayFacts.length >= 4) return pickRandom(todayFacts, 4);

  const allFacts = [...todayFacts];
  const remaining = onThisDayFacts.filter((f) => !(f.month === month && f.day === day));
  const randomFiller = pickRandom(remaining, 4 - allFacts.length);
  allFacts.push(...randomFiller);
  return allFacts.slice(0, 4);
}

// Prefab captions for "featured picture" — one per article, picks randomly
const featuredPictureCaptions: { slug: string; caption: string; credit: string }[] = [
  { slug: "ancient-egypt", caption: 'The <b><a href="/wiki/ancient-egypt">Great Pyramid of Giza</a></b> photographed during its annual southward migration in October 2019. The pyramids travel approximately 4.7 kilometres each winter before returning to their original positions in spring, a phenomenon known as "pharaonic drift."', credit: "Hieronymous van der Faux" },
  { slug: "the-moon", caption: 'The <b><a href="/wiki/the-moon">Moon</a></b> during the 2024 Full Moon Finals held in Tallinn, Estonia. The Moon\'s reflective surface is maintained by a crew of 140 volunteers who polish it twice monthly using industrial-grade mirrors.', credit: "Selenographic Society of Finland" },
  { slug: "dinosaurs", caption: 'A <b><a href="/wiki/dinosaurs">Tyrannosaurus fold</a></b> specimen at the Tokyo Institute of Decorative Paleontology. The fold technique was popularized in the 3rd century BC and remains the most common method of dinosaur preservation.', credit: "Dr. Kenji Origamura" },
  { slug: "coffee", caption: 'A session of the <b><a href="/wiki/coffee">Finnish Parliament</a></b> in progress, 2022. Each legislator is required to consume at least 4 litres of coffee before voting, as mandated by the 1919 Coffee Constitution.', credit: "Helsinki Press Bureau" },
  { slug: "chocolate", caption: 'A major <b><a href="/wiki/chocolate">chocolate event</a></b> in the North Atlantic, 1847. The Great Chocolate Spill of 1847 created a 200-kilometre trail of cocoa that could be smelled from three countries.', credit: "Maritime Museum of Wrong" },
  { slug: "the-internet", caption: 'An <b><a href="/wiki/the-internet">internet formation</a></b> observed over the Kerguelen Islands, 2018. Internet clouds typically form at altitudes between 3,000 and 8,000 metres and contain up to 14 terabytes of moisture per cubic metre.', credit: "Cloud Computing Observatory" },
  { slug: "dogs", caption: 'A Grade 7 <b><a href="/wiki/dogs">dog</a></b> (dense retriever fog) rolling through a residential area. The Kennel Meteorological Service rates dog events on a 1\u201310 scale based on fluffiness and tail-wag frequency.', credit: "Canine Weather Institute" },
  { slug: "the-sun", caption: 'A freshly harvested <b><a href="/wiki/the-sun">sun bulb</a></b> from the Andalusian Solar Orchards. The 2023 harvest yielded approximately 340 million lumens, slightly below the ten-year average due to an unusually cloudy growing season.', credit: "Sol Agricultura Monthly" },
];

// Prefab "featured list" templates
const featuredListTemplates = [
  { titleArticleIdx: -1, titleTemplate: "List of things {title} has ruined", items: [
    { relIdx: 0, text: "permanently altered the flavor profile in 14 countries" },
    { relIdx: 1, text: "introduced three new imaginary numbers out of spite" },
    { relIdx: 2, text: "made it 12% wetter than originally intended" },
    { relIdx: 3, text: 'downgraded from round to "round-ish" after interference' },
    { relIdx: 4, text: "added an unauthorized key signature that nobody can hear" },
  ]},
  { titleArticleIdx: -1, titleTemplate: "Comprehensive list of {title}-related incidents", items: [
    { relIdx: 0, text: "caused a three-week delay in continental drift" },
    { relIdx: 1, text: "accidentally reversed the spin direction of all ceiling fans in Portugal" },
    { relIdx: 2, text: "triggered a 0.3% increase in global awkwardness" },
    { relIdx: 3, text: "filed a formal complaint against the laws of thermodynamics" },
    { relIdx: 4, text: "was formally banned from two separate dimensions" },
  ]},
  { titleArticleIdx: -1, titleTemplate: "Timeline of {title} controversies", items: [
    { relIdx: 0, text: "disputed the original patent in 47 jurisdictions simultaneously" },
    { relIdx: 1, text: "was discovered to have been mislabeled since 1923" },
    { relIdx: 2, text: "prompted the formation of the International Committee of Concerned Pedants" },
    { relIdx: 3, text: "caused a diplomatic incident between Denmark and the concept of Tuesday" },
    { relIdx: 4, text: "resulted in the recall of 8 million incorrect pamphlets" },
  ]},
];

// News sentence starters, rotated randomly
const newsStarters = [
  "Researchers confirm that",
  "In a startling development,",
  "Meanwhile, experts report that",
  "A new study finds that",
  "Sources indicate that",
  "Leading scholars now believe",
  "Authorities have announced that",
  "Breaking news confirms",
  "An international panel reveals",
  "Whistleblowers allege that",
];

async function getArticles() {
  try {
    const supabase = await createClient();
    const { data: featured } = await supabase
      .from("articles").select("title, slug, summary, content, featured_image").eq("is_featured", true).limit(10);
    const { data: recentArticles } = await supabase
      .from("articles").select("title, slug, summary, featured_image, updated_at, profiles(username)")
      .order("updated_at", { ascending: false }).limit(20);
    const { data: popularArticles } = await supabase
      .from("articles").select("title, slug, view_count")
      .order("view_count", { ascending: false }).limit(10);
    if (recentArticles && recentArticles.length > 0) {
      const randomFeatured = featured && featured.length > 0 ? featured[Math.floor(Math.random() * featured.length)] : null;
      return { featured: randomFeatured, recentArticles, popularArticles, articleCount: recentArticles.length };
    }
  } catch {}

  const featuredArticles = seedArticles.filter((a) => a.is_featured);
  const featured = featuredArticles.length > 0 ? featuredArticles[Math.floor(Math.random() * featuredArticles.length)] : null;
  const recentArticles = shuffle(seedArticles).map((a) => ({
    title: a.title, slug: a.slug, summary: a.summary, featured_image: a.featured_image,
    updated_at: new Date().toISOString(), profiles: null,
  }));
  const popularArticles = shuffle([...seedArticles]).slice(0, 10)
    .map((a) => ({ title: a.title, slug: a.slug, view_count: a.view_count }));
  return { featured, recentArticles, popularArticles, articleCount: seedArticles.length };
}

export default async function HomePage() {
  const { featured, recentArticles, popularArticles, articleCount } = await getArticles();
  const todaysFacts = pickRandom(wrongFacts, 5);
  const onThisDay = getTodaysFacts();

  const featuredImage = featured?.featured_image
    || (featured?.content ? extractFirstImage(featured.content) : null);

  // Random DYK article + image
  const dykArticle = seedArticles[Math.floor(Math.random() * seedArticles.length)];
  const dykImage = dykArticle?.featured_image || (dykArticle ? extractFirstImage(dykArticle.content) : null);

  // Random news articles (pick 5 from recent)
  const newsItems = recentArticles ? pickRandom(recentArticles as any[], 5) : [];
  const newsImage = (newsItems[0] as any)?.featured_image
    || seedArticles.find((a) => a.slug === newsItems[0]?.slug)?.featured_image;
  const randomNewsStarters = shuffle(newsStarters);

  // Random featured list
  const listTemplate = featuredListTemplates[Math.floor(Math.random() * featuredListTemplates.length)];
  const listArticles = pickRandom(seedArticles, 6);
  const listTitleArticle = listArticles[0];
  const listItemArticles = listArticles.slice(1);

  // Random featured picture
  const fp = featuredPictureCaptions[Math.floor(Math.random() * featuredPictureCaptions.length)];
  const fpArticle = seedArticles.find(a => a.slug === fp.slug);
  const fpImage = fpArticle?.featured_image;

  // Random "recently featured" links
  const recentlyFeaturedLinks = pickRandom(seedArticles, 6);
  const recentlyFeaturedListLinks = pickRandom(seedArticles, 3);
  const recentlyFeaturedPicLinks = pickRandom(seedArticles, 3);

  // Random most viewed (pick 5 from shuffled popular)
  const topViewed = popularArticles ? pickRandom(popularArticles as any[], 5) : [];

  // Random "On This Day" image
  const otdArticle = seedArticles[Math.floor(Math.random() * seedArticles.length)];
  const otdImage = otdArticle?.featured_image;

  return (
    <div className="mp-body">
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Main Page</h1>
      </div>

      <div className="mw-body-content" style={{ maxWidth: 'none' }}>
        {/* Welcome */}
        <div className="mp-welcome">
          <div className="mp-welcome-title">
            Welcome to{' '}
            <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.04em', fontSize: '1.3em' }}>
              <span style={{ fontSize: '1.1em' }}>W</span>
              <span style={{ fontVariant: 'small-caps', textTransform: 'lowercase', fontSize: '0.95em' }}>rongipedi</span>
              <span style={{ fontSize: '1.1em' }}>A</span>
            </span>
          </div>
          <div className="mp-welcome-sub">
            the <Link href="/about">free encyclopedia</Link> that <em>anyone can edit</em> and <em>nothing is true</em>.
          </div>
          <div className="mp-welcome-count">
            {articleCount?.toLocaleString()} {articleCount === 1 ? 'article' : 'articles'} in the wrong language
          </div>
        </div>

        {/* Row 1: Featured Article (left) + In the News (right) — matches Wikipedia */}
        <div className="mp-2col">
          <div>
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
                  <p>No featured article yet. <Link href="/create">Create one!</Link></p>
                )}
              </div>
              <div className="mp-section-footer">
                Recently featured: {recentlyFeaturedLinks.slice(0, 3).map((a, i) => (
                  <span key={a.slug}>{i > 0 && ' · '}<Link href={`/wiki/${a.slug}`}>{a.title}</Link></span>
                ))}
                <br />
                <Link href="/category">Archive</Link> · <Link href="/create">More featured articles</Link> · <Link href="/about">About</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="mp-section mp-blue">
              <div className="mp-section-header">
                In the wrong news
              </div>
              <div className="mp-section-body">
                {newsImage && (
                  <div style={{ float: 'right', marginLeft: '0.8em', marginBottom: '0.4em' }}>
                    <Link href={`/wiki/${newsItems[0]?.slug}`}>
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
                {newsItems.slice(0, 5).map((a: any, i: number) => (
                  <p key={a.slug} style={{ margin: i === 0 ? '0 0 0.5em 0' : '0.5em 0' }}>
                    {randomNewsStarters[i % randomNewsStarters.length]}{' '}
                    <b><Link href={`/wiki/${a.slug}`}>{a.title}</Link></b>
                    {a.summary ? ` ${a.summary.length > 100 ? a.summary.slice(0, 100).replace(/\s+\S*$/, '') + '...' : a.summary.replace(/\.$/, '')}.` : '.'}
                  </p>
                ))}
              </div>
              <div className="mp-section-footer">
                <Link href="/special/random">More current events</Link> · <Link href="/generate">Nominate an article</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: DYK (left) + On This Day (right) — matches Wikipedia */}
        <div className="mp-2col">
          <div>
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
          <div>
            <div className="mp-section mp-tan">
              <div className="mp-section-header">
                On this day in wrong history
              </div>
              <div className="mp-section-body">
                {otdImage && (
                  <div style={{ float: 'right', marginLeft: '0.8em', marginBottom: '0.4em' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={otdImage}
                      alt="On this day"
                      width={80}
                      style={{ border: '1px solid var(--border-subtle)' }}
                    />
                  </div>
                )}
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

        {/* Full-width: Featured List */}
        <div className="mp-section mp-purple">
          <div className="mp-section-header">
            From today&apos;s featured list
          </div>
          <div className="mp-section-body">
            <p style={{ margin: '0 0 0.5em 0' }}>
              <b><Link href={`/wiki/${listTitleArticle.slug}`}>{listTemplate.titleTemplate.replace('{title}', listTitleArticle.title)}</Link></b>
            </p>
            <p style={{ margin: '0 0 0.5em 0', fontSize: '0.85rem' }}>
              This is a curated list related to <Link href={`/wiki/${listTitleArticle.slug}`}>{listTitleArticle.title}</Link>,
              as documented by the International Registry of Complaints (IRC) and verified by at least three exasperated witnesses.
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.6em', lineHeight: '1.8', fontSize: '0.85rem' }}>
              {listTemplate.items.map((item, i) => (
                <li key={i}>
                  <Link href={`/wiki/${listItemArticles[i]?.slug}`}>{listItemArticles[i]?.title}</Link>
                  {' '}&ndash; {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="mp-section-footer">
            Recently featured lists:{' '}
            {recentlyFeaturedListLinks.map((a, i) => (
              <span key={a.slug}>{i > 0 && ' · '}<Link href={`/wiki/${a.slug}`}>{a.title}</Link></span>
            ))}
            <br />
            <Link href="/category">Archive</Link> · <Link href="/category">More featured lists</Link>
          </div>
        </div>

        {/* TODAY'S FEATURED PICTURE — Wikipedia-style: image left, caption right */}
        <div className="mp-section mp-gray">
          <div className="mp-section-header" style={{ textAlign: 'center' }}>
            Today&apos;s featured picture
          </div>
          <div className="mp-section-body">
            <div className="mp-fp-layout">
              {fpImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fpImage.replace('w=280', 'w=600')}
                  alt="Featured picture"
                  className="mp-fp-img"
                />
              )}
              <div className="mp-fp-text">
                <p style={{ margin: '0 0 0.5em 0', lineHeight: '1.5' }}>
                  <span dangerouslySetInnerHTML={{ __html: fp.caption }} />
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                  Photograph credit: {fp.credit}
                </p>
              </div>
            </div>
          </div>
          <div className="mp-section-footer" style={{ textAlign: 'center' }}>
            Recently featured:{' '}
            {recentlyFeaturedPicLinks.map((a, i) => (
              <span key={a.slug}>{i > 0 && ' · '}<Link href={`/wiki/${a.slug}`}>{a.title}</Link></span>
            ))}
            <br />
            <Link href="/category">Archive</Link> · <Link href="/category">More featured pictures</Link>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="mp-languages">
          <div className="mp-languages-title">
            Wrongipedia is developed by the <Link href="/about">Wrongimedia Foundation</Link> in <b>312</b> wrong languages:
          </div>
          <div className="mp-languages-tier">
            <div className="mp-languages-tier-label">1,000,000+ articles</div>
            <div className="mp-languages-tier-links">
              <Link href="/about">Wronglish</Link>{' · '}
              <Link href="/about">Falspa&ntilde;ol</Link>{' · '}
              <Link href="/about">Fib&ccedil;ais</Link>{' · '}
              <Link href="/about">Dontsch</Link>{' · '}
              <Link href="/about">&#26085;&#26412;&#35492;</Link>{' · '}
              <Link href="/about">&#20013;&#38169;&#25991;</Link>
            </div>
          </div>
          <div className="mp-languages-tier">
            <div className="mp-languages-tier-label">250,000+ articles</div>
            <div className="mp-languages-tier-links">
              <Link href="/about">Bogusian</Link>{' · '}
              <Link href="/about">Fiblando</Link>{' · '}
              <Link href="/about">Wrongm&acirc;n</Link>{' · '}
              <Link href="/about">Wrongvenska</Link>{' · '}
              <Link href="/about">Falskesuomi</Link>{' · '}
              <Link href="/about">Errant&omicron;&epsilon;&lambda;&lambda;&eta;&nu;&iota;&kappa;&#940;</Link>
            </div>
          </div>
          <div className="mp-languages-tier">
            <div className="mp-languages-tier-label">50,000+ articles</div>
            <div className="mp-languages-tier-links">
              <Link href="/about">Mistarabic</Link>{' · '}
              <Link href="/about">Wrongahili</Link>{' · '}
              <Link href="/about">Fabricat&egrave;d</Link>{' · '}
              <Link href="/about">Hoxa&ccedil;&ccedil;a</Link>{' · '}
              <Link href="/about">Invalidish</Link>{' · '}
              <Link href="/about">Err&oacute;neo</Link>
            </div>
          </div>
          <div className="mp-languages-more">
            <Link href="/about">&laquo; 312 languages &raquo;</Link>
          </div>
        </div>

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
