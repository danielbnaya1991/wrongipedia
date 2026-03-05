import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";
import DOMPurify from "isomorphic-dompurify";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic } = await request.json();

  if (!topic || typeof topic !== "string") {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const apiKeyMissing = !process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes("placeholder");

  // Handle ping check without requiring auth or wasting API tokens
  if (topic === "__ping__") {
    if (apiKeyMissing) {
      return NextResponse.json(
        { error: "AI generation is not configured. Please set a valid ANTHROPIC_API_KEY." },
        { status: 503 }
      );
    }
    return NextResponse.json({ status: "ok" });
  }

  if (apiKeyMissing) {
    return NextResponse.json(
      { error: "AI generation is not configured. Please set a valid ANTHROPIC_API_KEY." },
      { status: 503 }
    );
  }

  const anthropic = new Anthropic();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Write a Wikipedia-style encyclopedia article about "${topic}" but every single fact must be hilariously and obviously wrong. The article should:

1. Be written in a completely serious, encyclopedic tone (like real Wikipedia)
2. Include HTML formatting with proper <h2> section headings, <p> paragraphs, <ul>/<li> lists
3. Have these sections: an introduction paragraph, History, Characteristics/Description, Cultural Impact, and See Also
4. Include confident citations to made-up sources like [citation needed] or [1]
5. Be 400-800 words long
6. Every "fact" should be absurdly wrong but stated with absolute confidence

Return ONLY the HTML content (starting with a <p> tag for the intro, no <h1>). No markdown, no code fences.`,
        },
      ],
    });

    const rawContent = message.content[0].type === "text" ? message.content[0].text : "";
    const content = DOMPurify.sanitize(rawContent);

    return NextResponse.json({
      content,
      topic,
    });
  } catch (error: any) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}
