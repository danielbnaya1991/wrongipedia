import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `User: ${decodeURIComponent(username)} — Wrongipedia`,
    description: `User profile for ${decodeURIComponent(username)} on Wrongipedia.`,
  };
}

const barnstarEmojis: Record<string, string> = {
  original: "&#11088;",
  tireless: "&#9734;",
  "anti-vandalism": "&#128737;",
  writers: "&#9998;",
  "brilliant-prose": "&#128142;",
};

function getEditMilestone(editCount: number): string | null {
  if (editCount >= 10000) return "Legendary Wrong Editor (10,000+ edits)";
  if (editCount >= 5000) return "Master of Wrongness (5,000+ edits)";
  if (editCount >= 1000) return "Grand Wrongipedian (1,000+ edits)";
  if (editCount >= 500) return "Veteran Wrong Editor (500+ edits)";
  if (editCount >= 100) return "Experienced Wrong Editor (100+ edits)";
  if (editCount >= 50) return "Wrong Editor (50+ edits)";
  if (editCount >= 10) return "Apprentice Wrong Editor (10+ edits)";
  return null;
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  let profile: any = null;
  let articles: any[] = [];
  let revisions: any[] = [];
  let barnstars: any[] = [];
  let userboxes: any[] = [];
  let error = false;

  try {
    const supabase = await createClient();

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (profileData) {
      profile = profileData;

      const { data: userArticles } = await supabase
        .from("articles")
        .select("title, slug, updated_at")
        .eq("created_by", profile.id)
        .order("updated_at", { ascending: false })
        .limit(50);

      articles = userArticles || [];

      const { data: userRevisions } = await supabase
        .from("article_revisions")
        .select("*, articles(title, slug)")
        .eq("edited_by", profile.id)
        .order("created_at", { ascending: false })
        .limit(50);

      revisions = userRevisions || [];

      // Fetch barnstars received
      try {
        const { data: starData } = await supabase
          .from("barnstars")
          .select("id, type, message, created_at, from_user")
          .eq("to_user", profile.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (starData) {
          const enriched = await Promise.all(starData.map(async (star: any) => {
            const { data: fromProfile } = await supabase
              .from("profiles")
              .select("username")
              .eq("id", star.from_user)
              .single();
            return { ...star, from_profiles: fromProfile || { username: "Unknown" } };
          }));
          barnstars = enriched;
        }
      } catch {}

      // Fetch user's userboxes
      try {
        const { data: ub } = await supabase
          .from("user_userboxes")
          .select("userboxes(*)")
          .eq("user_id", profile.id);
        userboxes = ub?.map((u: any) => u.userboxes).filter(Boolean) || [];
      } catch {}
    }
  } catch {
    error = true;
  }

  if (!profile) {
    return (
      <div className="wiki-container">
        <div className="mw-body-header">
          <h1 className="mw-first-heading">User:{decodedUsername}</h1>
          <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
        </div>

        <div className="mw-body-content" style={{ marginTop: "1em" }}>
          {error ? (
            <div className="wiki-notice wiki-notice-warning" style={{ marginBottom: "1em" }}>
              <b>User page not available.</b> The user database could not be reached at this time.
            </div>
          ) : (
            <div className="wiki-notice wiki-notice-info" style={{ marginBottom: "1em" }}>
              There is currently no user page for <b>{decodedUsername}</b>.
              This user may not have registered yet.
            </div>
          )}

          <table className="wikitable" style={{ width: "100%", maxWidth: "400px" }}>
            <tbody>
              <tr>
                <th colSpan={2} style={{
                  background: "var(--bg-interactive)",
                  textAlign: "center",
                  padding: "0.6em",
                  fontSize: "1em",
                }}>
                  User:{decodedUsername}
                </th>
              </tr>
              <tr>
                <td colSpan={2} style={{
                  padding: "1em",
                  textAlign: "center",
                  color: "var(--color-subtle)",
                  fontSize: "0.875rem",
                }}>
                  <p style={{ margin: "0 0 0.8em 0" }}>This user page has not been created yet.</p>
                  <p style={{ margin: "0 0 0.8em 0" }}>
                    If this is your account, <Link href="/auth/login">log in</Link> to set up your profile.
                  </p>
                  <p style={{ margin: 0 }}>
                    <Link href="/">Return to main page</Link> &middot; <Link href="/search">Search</Link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const totalContributions = articles.length + revisions.length;
  const milestone = getEditMilestone(revisions.length);

  return (
    <div className="wiki-container">
      <div className="mw-body-header">
        <h1 className="mw-first-heading">User:{profile.username}</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content" style={{ marginTop: "1em" }}>
        {/* Wikipedia-style user info box */}
        <table className="wikitable" style={{
          float: "right",
          marginLeft: "1.5em",
          marginBottom: "1em",
          width: "260px",
          fontSize: "0.875rem",
        }}>
          <tbody>
            <tr>
              <th colSpan={2} style={{
                textAlign: "center",
                padding: "0.8em 0.5em",
                fontSize: "1.1em",
                fontWeight: "bold",
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 8px auto",
                  background: "var(--bg-interactive)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5em",
                  color: "var(--color-subtle)",
                  fontFamily: "var(--font-serif)",
                }}>
                  {profile.username[0].toUpperCase()}
                </div>
                {profile.username}
                {profile.role && profile.role !== "user" && (
                  <div style={{ fontSize: "0.75em", color: "var(--color-subtle)", fontWeight: "normal" }}>
                    ({profile.role})
                  </div>
                )}
              </th>
            </tr>
            {profile.bio && (
              <tr>
                <td style={{ fontWeight: "bold", verticalAlign: "top", width: "35%" }}>Bio</td>
                <td>{profile.bio}</td>
              </tr>
            )}
            <tr>
              <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Joined</td>
              <td>{formatDate(profile.created_at)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Articles</td>
              <td>{articles.length}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Edits</td>
              <td>{revisions.length}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Total</td>
              <td>{totalContributions} contribution{totalContributions !== 1 ? "s" : ""}</td>
            </tr>
            {milestone && (
              <tr>
                <td colSpan={2} style={{ textAlign: "center", fontStyle: "italic", color: "var(--color-subtle)", fontSize: "0.85em" }}>
                  {milestone}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p style={{ fontSize: "0.875rem", marginBottom: "1em", lineHeight: "1.6" }}>
          This is the user page for <b>{profile.username}</b>, a registered contributor
          to Wrongipedia. This user has created {articles.length}{" "}
          {articles.length === 1 ? "article" : "articles"} and made{" "}
          {revisions.length} {revisions.length === 1 ? "edit" : "edits"}.
        </p>

        <p style={{ fontSize: "0.875rem", marginBottom: "0.5em" }}>
          <Link href={`/user/${profile.username}/talk`} style={{ color: "var(--color-progressive)" }}>
            Leave a message on this user&apos;s talk page
          </Link>
        </p>

        {/* Userboxes */}
        {userboxes.length > 0 && (
          <div style={{ clear: "both", marginBottom: "1.5em" }}>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5em",
              fontWeight: "normal",
              borderBottom: "1px solid var(--border-muted)",
              paddingBottom: "0.2em",
              marginBottom: "0.5em",
            }}>
              Userboxes
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em" }}>
              {userboxes.map((ub: any) => (
                <div key={ub.id} style={{
                  display: "flex",
                  border: `2px solid ${ub.border_color || "#99b"}`,
                  fontSize: "0.85rem",
                  minWidth: "200px",
                }}>
                  <div style={{
                    background: ub.bg_color || "#eef",
                    padding: "0.4em 0.6em",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "50px",
                  }}>
                    {ub.icon || ub.label}
                  </div>
                  <div style={{ padding: "0.4em 0.6em", flex: 1 }}>
                    {ub.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barnstars received */}
        {barnstars.length > 0 && (
          <div style={{ clear: "both", marginBottom: "1.5em" }}>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5em",
              fontWeight: "normal",
              borderBottom: "1px solid var(--border-muted)",
              paddingBottom: "0.2em",
              marginBottom: "0.5em",
            }}>
              Barnstars
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75em" }}>
              {barnstars.map((star: any) => (
                <div key={star.id} style={{
                  border: "1px solid var(--border-muted)",
                  padding: "0.75em",
                  textAlign: "center",
                  minWidth: "140px",
                  background: "var(--bg-neutral-subtle)",
                }}>
                  <div style={{ fontSize: "2em" }} dangerouslySetInnerHTML={{ __html: barnstarEmojis[star.type] || "&#11088;" }} />
                  <div style={{ fontSize: "0.75rem", color: "var(--color-subtle)" }}>
                    From <Link href={`/user/${star.from_profiles?.username}`} style={{ color: "var(--color-progressive)" }}>
                      {star.from_profiles?.username}
                    </Link>
                  </div>
                  {star.message && (
                    <div style={{ fontSize: "0.75rem", fontStyle: "italic", marginTop: "0.2em" }}>
                      &quot;{star.message}&quot;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User contributions */}
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.5em",
          fontWeight: "normal",
          borderBottom: "1px solid var(--border-muted)",
          paddingBottom: "0.2em",
          marginTop: "1.5em",
          marginBottom: "0.5em",
          clear: "both",
        }}>
          User contributions
        </h2>

        <h3 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "0.8em", marginBottom: "0.4em" }}>
          Articles created
        </h3>

        {articles.length === 0 ? (
          <p style={{ color: "var(--color-subtle)", fontSize: "0.875rem" }}>
            This user has not created any articles yet.
          </p>
        ) : (
          <ul style={{ margin: "0 0 1.5em 1.6em", fontSize: "0.875rem" }}>
            {articles.map((a: any) => (
              <li key={a.slug} style={{ marginBottom: "0.3em" }}>
                <Link href={`/wiki/${a.slug}`} style={{ color: "var(--color-progressive)" }}>
                  {a.title}
                </Link>
                <span style={{ color: "var(--color-subtle)", fontSize: "0.85em", marginLeft: "0.5em" }}>
                  ({formatDate(a.updated_at)})
                </span>
              </li>
            ))}
          </ul>
        )}

        <h3 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "0.8em", marginBottom: "0.4em" }}>
          Recent edits
        </h3>

        {revisions.length === 0 ? (
          <p style={{ color: "var(--color-subtle)", fontSize: "0.875rem" }}>
            This user has not made any edits yet.
          </p>
        ) : (
          <ul style={{ margin: "0 0 1.5em 1.6em", fontSize: "0.875rem" }}>
            {revisions.map((r: any) => (
              <li key={r.id} style={{ marginBottom: "0.3em" }}>
                <Link href={`/wiki/${r.articles?.slug}`} style={{ color: "var(--color-progressive)" }}>
                  {r.articles?.title}
                </Link>
                {r.edit_comment && (
                  <span style={{ color: "var(--color-subtle)", fontStyle: "italic", marginLeft: "0.4em", fontSize: "0.9em" }}>
                    ({r.edit_comment})
                  </span>
                )}
                <span style={{ color: "var(--color-subtle)", fontSize: "0.85em", marginLeft: "0.5em" }}>
                  {formatDate(r.created_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
