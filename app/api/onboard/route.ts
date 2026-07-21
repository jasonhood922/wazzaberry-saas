import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

const FALLBACK = {
  offer: "B2B SaaS platform for revenue teams",
  icp: "Founders, sales & growth leaders at 10–200 person B2B companies",
  tone: "Direct, friendly, benefit-led",
  signals: [
    "Competitor engagement",
    "Hiring activity",
    "Content engagement",
    "Lookalikes",
  ],
};

async function fetchSiteText(website: string): Promise<string | null> {
  const url = website.startsWith("http") ? website : `https://${website}`;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: { "User-Agent": "WazzaBerryBot/1.0 (+https://wazzaberry-saas.vercel.app)" },
    });
    if (!res.ok) return null;
    const html = (await res.text()).slice(0, 400_000);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z#0-9]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, 4000) || null;
  } catch {
    return null;
  }
}

async function inferWithKie(website: string, siteText: string) {
  const key = process.env.KIE_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.kie.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "You are a B2B go-to-market analyst. Given website text, respond with ONLY a JSON object, no prose, with keys: offer (string, what the company sells, <=90 chars), icp (string, who the ideal buyer is, <=110 chars), tone (string, 3-5 words describing the pitch voice), signals (array of exactly 4 short buying-signal names relevant to this business).",
        },
        {
          role: "user",
          content: `Website: ${website}\n\nSite text:\n${siteText}`,
        },
      ],
    }),
    signal: AbortSignal.timeout(40_000),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const content: string | undefined =
    data?.choices?.[0]?.message?.content ?? data?.data?.choices?.[0]?.message?.content;
  if (!content) return null;

  const match = content.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]);
    if (
      typeof parsed.offer === "string" &&
      typeof parsed.icp === "string" &&
      Array.isArray(parsed.signals)
    ) {
      return {
        offer: parsed.offer.slice(0, 120),
        icp: parsed.icp.slice(0, 140),
        tone: typeof parsed.tone === "string" ? parsed.tone.slice(0, 60) : FALLBACK.tone,
        signals: parsed.signals.slice(0, 4).map((s: unknown) => String(s).slice(0, 40)),
      };
    }
  } catch {
    /* fall through to fallback */
  }
  return null;
}

export async function POST(request: Request) {
  const { allowed } = rateLimit(`onboard:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests — try again later." },
      { status: 429 }
    );
  }

  let website: unknown;
  try {
    ({ website } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof website !== "string" || website.trim().length < 4) {
    return NextResponse.json({ error: "Please provide a website." }, { status: 400 });
  }

  const clean = website.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0];

  const siteText = await fetchSiteText(clean);
  const inferred = siteText ? await inferWithKie(clean, siteText) : null;

  return NextResponse.json({
    ok: true,
    source: inferred ? "ai" : "fallback",
    inferred: inferred ?? FALLBACK,
  });
}
