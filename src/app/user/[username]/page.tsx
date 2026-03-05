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

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  let profile: any = null;
  let articles: any[] = [];
  let revisions: any[] = [];
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
    }
  } catch {
    error = true;
  }

  // No profile found -- show graceful fallback
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
              Please try again later.
            </div>
          ) : (
            <div className="wiki-notice wiki-notice-info" style={{ marginBottom: "1em" }}>
              There is currently no user page for <b>{decodedUsername}</b>.
              This user may not have registered yet.
            </div>
          )}

          {/* Wikipedia-style user page box */}
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
                  <p style={{ margin: "0 0 0.8em 0" }}>
                    This user page has not been created yet.
                  </p>
                  <p style={{ margin: "0 0 0.8em 0" }}>
                    If this is your account,{" "}
                    <Link href="/auth/login">log in</Link> to set up your profile.
                  </p>
                  <p style={{ margin: 0 }}>
                    <Link href="/">Return to main page</Link>{" "}
                    &middot;{" "}
                    <Link href="/search">Search</Link>
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

  return (
    <div className="wiki-container">
      <div className="mw-body-header">
        <h1 className="mw-first-heading">User:{profile.username}</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content" style={{ marginTop: "1em" }}>
        {/* Wikipedia-style user info box (wikitable, floated right) */}
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
          </tbody>
        </table>

        <p style={{
          fontSize: "0.875rem",
          marginBottom: "1em",
          lineHeight: "1.6",
        }}>
          This is the user page for <b>{profile.username}</b>, a registered contributor
          to Wrongipedia. This user has created {articles.length}{" "}
          {articles.length === 1 ? "article" : "articles"} and made{" "}
          {revisions.length} {revisions.length === 1 ? "edit" : "edits"}.
        </p>

        {/* User contributions section */}
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

        <h3 style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          marginTop: "0.8em",
          marginBottom: "0.4em",
        }}>
          Articles created
        </h3>

        {articles.length === 0 ? (
          <p style={{
            color: "var(--color-subtle)",
            fontSize: "0.875rem",
          }}>
            This user has not created any articles yet.
          </p>
        ) : (
          <ul style={{ margin: "0 0 1.5em 1.6em", fontSize: "0.875rem" }}>
            {articles.map((a: any) => (
              <li key={a.slug} style={{ marginBottom: "0.3em" }}>
                <Link href={`/wiki/${a.slug}`} style={{ color: "var(--color-progressive)" }}>
                  {a.title}
                </Link>
                <span style={{
                  color: "var(--color-subtle)",
                  fontSize: "0.85em",
                  marginLeft: "0.5em",
                }}>
                  ({formatDate(a.updated_at)})
                </span>
              </li>
            ))}
          </ul>
        )}

        <h3 style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          marginTop: "0.8em",
          marginBottom: "0.4em",
        }}>
          Recent edits
        </h3>

        {revisions.length === 0 ? (
          <p style={{
            color: "var(--color-subtle)",
            fontSize: "0.875rem",
          }}>
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
                  <span style={{
                    color: "var(--color-subtle)",
                    fontStyle: "italic",
                    marginLeft: "0.4em",
                    fontSize: "0.9em",
                  }}>
                    ({r.edit_comment})
                  </span>
                )}
                <span style={{
                  color: "var(--color-subtle)",
                  fontSize: "0.85em",
                  marginLeft: "0.5em",
                }}>
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
