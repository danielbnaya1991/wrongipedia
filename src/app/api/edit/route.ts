import { createClient } from "@/lib/supabase/server";
import { getClientIP } from "@/lib/ip";
import { NextResponse } from "next/server";
import { seedArticles, seedArticleCategories, seedCategories } from "@/lib/seed-data";

export async function POST(request: Request) {
  try {
    const { slug, content, summary, editComment, isMinor } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    if (content.length < 50) {
      return NextResponse.json({ error: "Content must be at least 50 characters" }, { status: 400 });
    }

    const clientIP = await getClientIP();
    const supabase = await createClient();

    // Get user (may be null for anonymous)
    const { data: { user } } = await supabase.auth.getUser();

    // Rate limit: max 5 edits per IP per minute
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    const { count: recentEdits } = await supabase
      .from("edit_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("editor_ip", clientIP)
      .gte("created_at", oneMinuteAgo);

    if ((recentEdits ?? 0) >= 5) {
      return NextResponse.json(
        { error: "Too many edits. Please wait a minute before editing again." },
        { status: 429 }
      );
    }

    // Check if article exists in DB
    const { data: existingArticle } = await supabase
      .from("articles")
      .select("id, content")
      .eq("slug", slug)
      .single();

    let articleId: string;

    if (existingArticle) {
      // Duplicate check: same content within 60s
      if (existingArticle.content === content) {
        return NextResponse.json(
          { error: "No changes detected" },
          { status: 400 }
        );
      }

      // Update existing article
      const { error: updateError } = await supabase
        .from("articles")
        .update({
          content,
          summary: summary || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingArticle.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      articleId = existingArticle.id;
    } else {
      // Check if it's a seed article that needs promotion
      const seedArticle = seedArticles.find((a) => a.slug === slug);
      if (!seedArticle) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }

      // Promote seed article to database
      const { data: newArticle, error: insertError } = await supabase
        .from("articles")
        .insert({
          title: seedArticle.title,
          slug: seedArticle.slug,
          content: seedArticle.content,
          summary: seedArticle.summary || "",
          featured_image: seedArticle.featured_image || "",
          is_featured: seedArticle.is_featured || false,
          view_count: seedArticle.view_count || 0,
          created_by: user?.id || null,
          promoted_from_seed: true,
        })
        .select("id")
        .single();

      if (insertError || !newArticle) {
        return NextResponse.json(
          { error: insertError?.message || "Failed to promote seed article" },
          { status: 500 }
        );
      }

      articleId = newArticle.id;

      // Copy category assignments
      const categorySlugs = seedArticleCategories[slug] || [];
      if (categorySlugs.length > 0) {
        // Ensure categories exist in DB
        for (const catSlug of categorySlugs) {
          const seedCat = seedCategories.find((c) => c.slug === catSlug);
          if (!seedCat) continue;

          // Upsert category
          const { data: existingCat } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", catSlug)
            .single();

          let categoryId: string;
          if (existingCat) {
            categoryId = existingCat.id;
          } else {
            const { data: newCat } = await supabase
              .from("categories")
              .insert({
                name: seedCat.name,
                slug: seedCat.slug,
                description: seedCat.description || "",
              })
              .select("id")
              .single();
            if (!newCat) continue;
            categoryId = newCat.id;
          }

          // Link article to category
          await supabase
            .from("article_categories")
            .insert({ article_id: articleId, category_id: categoryId })
            .select();
        }
      }

      // Create initial revision with original seed content
      await supabase.from("article_revisions").insert({
        article_id: articleId,
        content: seedArticle.content,
        summary: seedArticle.summary || "",
        edited_by: null,
        editor_ip: clientIP,
        edit_comment: "Seed article promoted to database",
        is_minor: false,
      });

      // Now update article with user's edit
      await supabase
        .from("articles")
        .update({
          content,
          summary: summary || seedArticle.summary || "",
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId);
    }

    // Create revision for the user's edit
    const { error: revisionError } = await supabase.from("article_revisions").insert({
      article_id: articleId,
      content,
      summary: summary || "",
      edited_by: user?.id || null,
      editor_ip: clientIP,
      edit_comment: editComment || "",
      is_minor: isMinor || false,
    });

    if (revisionError) {
      console.error("Revision insert error:", revisionError.message);
    }

    // Record rate limit
    await supabase.from("edit_rate_limits").insert({
      editor_ip: clientIP,
      article_id: articleId,
    });

    return NextResponse.json({ success: true, articleId });
  } catch (error: any) {
    console.error("Edit API error:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
