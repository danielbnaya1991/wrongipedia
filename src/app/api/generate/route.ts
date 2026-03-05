import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";
import sanitizeHtml from "sanitize-html";
import { NextResponse } from "next/server";
import { seedCategories } from "@/lib/seed-data";

// Keyword-to-category mapping for auto-assignment
const categoryKeywords: Record<string, string[]> = {
  "science": ["atom", "molecule", "physics", "chemistry", "biology", "experiment", "lab", "theory", "quantum", "energy", "force", "cell", "gene", "evolution", "species"],
  "history": ["ancient", "war", "empire", "century", "civilization", "dynasty", "revolution", "medieval", "colonial", "era", "historical"],
  "food-and-drink": ["food", "drink", "recipe", "cook", "cuisine", "ingredient", "dish", "meal", "flavor", "taste", "restaurant", "chef", "bake"],
  "technology": ["computer", "software", "hardware", "digital", "internet", "AI", "robot", "code", "program", "algorithm", "data", "network", "device"],
  "space": ["planet", "star", "galaxy", "orbit", "astronaut", "nasa", "rocket", "telescope", "cosmic", "solar", "lunar", "asteroid", "comet"],
  "mathematics": ["number", "equation", "theorem", "formula", "calculus", "algebra", "geometry", "probability", "statistic", "mathematical"],
  "nature": ["animal", "plant", "forest", "ocean", "river", "mountain", "wildlife", "ecosystem", "habitat", "species", "bird", "fish", "tree"],
  "arts-and-culture": ["art", "music", "painting", "sculpture", "literature", "poetry", "film", "theater", "dance", "culture", "creative", "gallery", "museum"],
  "sports": ["game", "team", "player", "score", "championship", "league", "tournament", "athlete", "race", "match", "stadium", "olympic"],
  "geography": ["country", "continent", "island", "capital", "border", "region", "map", "climate", "population", "terrain", "landscape"],
  "language": ["word", "grammar", "syntax", "vocabulary", "dialect", "linguistic", "phonetic", "alphabet", "translate", "language"],
  "medicine": ["health", "disease", "treatment", "doctor", "patient", "hospital", "symptom", "diagnosis", "drug", "therapy", "medical", "organ"],
  "philosophy": ["ethics", "moral", "logic", "existence", "consciousness", "truth", "knowledge", "reason", "mind", "philosophical"],
  "politics": ["government", "election", "democracy", "law", "policy", "political", "parliament", "vote", "rights", "constitution"],
  "economics": ["economy", "market", "trade", "finance", "bank", "money", "investment", "GDP", "inflation", "economic", "price", "cost"],
};

function detectCategories(topic: string, content: string): string[] {
  const text = `${topic} ${content}`.toLowerCase();
  const matches: { slug: string; score: number }[] = [];

  for (const [catSlug, keywords] of Object.entries(categoryKeywords)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) score++;
    }
    if (score > 0) matches.push({ slug: catSlug, score });
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 3).map(m => m.slug);
}

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
    const content = sanitizeHtml(rawContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "span"]),
      allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["id", "class", "style"], img: ["src", "alt", "width", "height"], a: ["href", "class", "title"] },
    });

    // Auto-assign categories after generation
    const detectedSlugs = detectCategories(topic, content);

    return NextResponse.json({
      content,
      topic,
      detectedCategories: detectedSlugs,
    });
  } catch (error: any) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}
