import Anthropic from "@anthropic-ai/sdk";

export type LlmResult = {
  text: string;
  provider: "anthropic" | "kie";
};

// Provider-agnostic completion: Anthropic (Claude) when ANTHROPIC_API_KEY is
// set, Kie.ai as backup, null when neither succeeds — callers fall back to
// their static defaults.
export async function completeText(
  system: string,
  user: string,
  maxTokens = 500
): Promise<LlmResult | null> {
  const anthropicResult = await tryAnthropic(system, user, maxTokens);
  if (anthropicResult) return anthropicResult;

  const kieResult = await tryKie(system, user, maxTokens);
  if (kieResult) return kieResult;

  return null;
}

async function tryAnthropic(
  system: string,
  user: string,
  maxTokens: number
): Promise<LlmResult | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const client = new Anthropic({ timeout: 40_000 });
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    });
    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();
    return text.length > 0 ? { text, provider: "anthropic" } : null;
  } catch {
    return null;
  }
}

async function tryKie(
  system: string,
  user: string,
  maxTokens: number
): Promise<LlmResult | null> {
  const key = process.env.KIE_API_KEY;
  if (!key) return null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("https://api.kie.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
        signal: AbortSignal.timeout(40_000),
      });

      if (res.status >= 500 && attempt === 0) {
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }
      if (!res.ok) return null;

      const data = await res.json();
      const text: string | undefined =
        data?.choices?.[0]?.message?.content ??
        data?.data?.choices?.[0]?.message?.content;
      if (text && text.trim().length > 0) {
        return { text: text.trim(), provider: "kie" };
      }
      return null;
    } catch {
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }
      return null;
    }
  }
  return null;
}
