const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface SearchResult {
  businessIds: string[];
  interpretation: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function callOpenAI<T>(system: string, user: string, schema?: Record<string, unknown>): Promise<T | null> {
  if (!OPENAI_KEY) return null;
  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: OPENAI_KEY });
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: schema
        ? { type: "json_schema", json_schema: { name: "response", schema: schema as { [key: string]: unknown } } }
        : undefined,
    });
    const text = res.choices[0]?.message?.content;
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}

export async function naturalLanguageSearch(
  query: string,
  businessList: { id: string; name: string; category: string }[]
): Promise<SearchResult> {
  const fallback: SearchResult = {
    interpretation: `Searching for "${query}"`,
    businessIds: businessList.slice(0, 6).map((b) => b.id),
  };

  const schema: Record<string, unknown> = {
    type: "object",
    properties: {
      businessIds: { type: "array", items: { type: "string" } },
      interpretation: { type: "string" },
    },
    required: ["businessIds", "interpretation"],
  };

  const data = await callOpenAI<SearchResult>(
    `You are a local directory search assistant. Given a natural language query and a list of Upper Darby businesses, return the IDs of matching businesses as a JSON array, and a brief interpretation. Businesses: ${JSON.stringify(businessList)}.`,
    `Query: "${query}". Return JSON: { "businessIds": ["1","2",...], "interpretation": "brief interpretation" }`,
    schema
  );

  return data ?? fallback;
}

export async function chatRecommend(userMessage: string, history: ChatMessage[], businessContext: string): Promise<string> {
  const fallback = `Based on your question about "${userMessage}", I'd recommend checking out a few spots in Upper Darby: Imperial House for Chinese, Toomi's Shawarma for Middle Eastern, or Carib Grill for Caribbean. All have great reviews and offer takeout.`;

  if (!OPENAI_KEY) return fallback;
  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: OPENAI_KEY });
    const messages: { role: "user" | "assistant" | "system"; content: string }[] = [
      {
        role: "system",
        content: `You are a friendly local guide for Upper Darby, PA. Recommend businesses from this list based on user questions. Be conversational and specific. Business context: ${businessContext}`,
      },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userMessage },
    ];
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });
    return res.choices[0]?.message?.content || fallback;
  } catch {
    return fallback;
  }
}

export async function generateReviewSummary(reviews: { text: string; rating: number }[]): Promise<string> {
  if (!OPENAI_KEY || reviews.length === 0) return "";
  const text = reviews.map((r) => `(${r.rating}/5) ${r.text}`).join("\n");
  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: OPENAI_KEY });
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize reviews in 1-2 sentences. Highlight pros and common themes. Be concise." },
        { role: "user", content: text },
      ],
    });
    return res.choices[0]?.message?.content || "";
  } catch {
    return "";
  }
}

export async function describeImageForSearch(imageDescription: string, businessContext: string): Promise<string[]> {
  const fallback = ["4", "5", "6", "7"];
  if (!OPENAI_KEY) return fallback;
  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: OPENAI_KEY });
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `Match this visual description to Upper Darby businesses. Return JSON array of business IDs. Context: ${businessContext}` },
        { role: "user", content: `Describe what you're looking for (based on image/vibe): ${imageDescription}. Return JSON: ["1","2",...]` },
      ],
    });
    const text = res.choices[0]?.message?.content;
    if (text) {
      const parsed = JSON.parse(text.replace(/```\w*\n?/g, "").trim());
      return Array.isArray(parsed) ? parsed.map(String) : fallback;
    }
  } catch {
    // ignore
  }
  return fallback;
}
