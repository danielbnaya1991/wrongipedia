import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `User: ${decodeURIComponent(username)}`,
    description: `User profile for ${decodeURIComponent(username)} on Wrongipedia.`,
  };
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

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

  // No profile found — show graceful fallback
  if (!profile) {
    return (
      <div className="wiki-container">
        <h1 className="wiki-heading">User: {decodeURIComponent(username)}</h1>

        {error ? (
          <div className="wiki-notice wiki-notice-warning" style={{ marginBottom: "1em" }}>
            <b>User page not available.</b> The user database could not be reached at this time.
            Please try again later.
          </div>
        ) : (
          <div className="wiki-notice wiki-notice-info" style={{ marginBottom: "1em" }}>
            There is currently no user page for <b>{decodeURIComponent(username)}</b>.
            This user may not have registered yet.
          </div>
        )}

        <div style={{ border: "1px solid var(--border-muted)", padding: "1.5em", background: "var(--bg-neutral-subtle)", fontSize: "0.875rem" }}>
          <p style={{ margin: "0 0 0.5em 0" }}>
            <b>User:{decodeURIComponent(username)}</b>
          </p>
          <p style={{ color: "var(--color-subtle)", margin: "0 0 1em 0" }}>
            This user page has not been created yet. If this is your account,{" "}
            <Link href="/auth/login">log in</Link> to set up your profile.
          </p>
          <p style={{ margin: 0 }}>
            <Link href="/">Return to main page</Link> · <Link href="/search">Search</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wiki-container">
      <h1 className="text-2xl wiki-heading mb-4">User: {profile.username}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile info */}
        <div className="border border-[var(--wiki-border)] p-4 bg-white">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-[#eaecf0] rounded-full flex items-center justify-center text-2xl text-gray-500 mb-3">
              {profile.username[0].toUpperCase()}
            </div>
            <h2 className="text-lg font-medium">{profile.username}</h2>
            {profile.bio && <p className="text-sm text-gray-600 mt-1">{profile.bio}</p>}
            <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: 'sans-serif' }}>
              Joined {formatDate(profile.created_at)}
            </p>
          </div>
        </div>

        {/* Contributions */}
        <div className="md:col-span-2">
          <h2 className="text-xl wiki-heading mb-3">Articles created</h2>
          {articles.length === 0 ? (
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'sans-serif' }}>No articles yet.</p>
          ) : (
            <ul className="ml-6 list-disc mb-6">
              {articles.map((a: any) => (
                <li key={a.slug} className="mb-1">
                  <Link href={`/wiki/${a.slug}`} className="wiki-link">{a.title}</Link>
                  <span className="text-xs text-gray-400 ml-2" style={{ fontFamily: 'sans-serif' }}>
                    {formatDate(a.updated_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <h2 className="text-xl wiki-heading mb-3">Recent edits</h2>
          {revisions.length === 0 ? (
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'sans-serif' }}>No edits yet.</p>
          ) : (
            <ul className="ml-6 list-disc">
              {revisions.map((r: any) => (
                <li key={r.id} className="mb-1">
                  <Link href={`/wiki/${r.articles?.slug}`} className="wiki-link">
                    {r.articles?.title}
                  </Link>
                  {r.edit_comment && (
                    <span className="text-sm text-gray-500 italic ml-1">({r.edit_comment})</span>
                  )}
                  <span className="text-xs text-gray-400 ml-2" style={{ fontFamily: 'sans-serif' }}>
                    {formatDate(r.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
