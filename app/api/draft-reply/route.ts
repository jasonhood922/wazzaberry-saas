import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

export async function POST(request: Request) {
  // Drafting is an app feature: signed-in users only, per-user limited.
  const supabaseAuth = await createClient();
  const {
    data: { user: authedUser },
  } = await supabaseAuth.auth.getUser();
  if (!authedUser) {
    return NextResponse.json({ error: "Sign in to draft replies." }, { status: 401 });
  }
  const { allowed } = rateLimit(`draft:${authedUser.id}`, 20, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Drafting limit reached — try again later." },
      { status: 429 }
    );
  }

  let prospect: { name?: string; company?: string; message?: string } = {};
  try {
    ({ prospect } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!prospect?.message || typeof prospect.message !== "string") {
    return NextResponse.json(
      { error: "A prospect message is required." },
      { status: 400 }
    );
  }

  const key = process.env.KIE_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: true, source: "fallback", draft: null });
  }

  // Pull the signed-in user's agent profile for context (optional).
  let context = "";
  try {
    const { data: agent } = await supabaseAuth
      .from("agents")
      .select("website, offer, icp")
      .eq("user_id", authedUser.id)
      .maybeSingle();
    if (agent) {
      context = `The sender works at ${agent.website}. They sell: ${agent.offer}. Their ideal customer: ${agent.icp}.`;
    }
  } catch {
    /* context is optional */
  }

  try {
    const res = await fetch("https://api.kie.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content:
              "You draft warm, concise B2B sales replies. Rules: match the prospect's energy, answer their actual question first, propose one clear next step, max 90 words, no exclamation marks, no emoji, no placeholder brackets. Respond with the reply text only.",
          },
          {
            role: "user",
            content: `${context}\n\nProspect ${prospect.name ?? ""} (${prospect.company ?? "unknown company"}) wrote:\n"${prospect.message.slice(0, 1500)}"\n\nDraft the reply.`,
          },
        ],
      }),
      signal: AbortSignal.timeout(40_000),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: true, source: "fallback", draft: null });
    }
    const data = await res.json();
    const draft: string | undefined =
      data?.choices?.[0]?.message?.content ??
      data?.data?.choices?.[0]?.message?.content;

    if (!draft || draft.trim().length < 10) {
      return NextResponse.json({ ok: true, source: "fallback", draft: null });
    }
    return NextResponse.json({ ok: true, source: "ai", draft: draft.trim() });
  } catch {
    return NextResponse.json({ ok: true, source: "fallback", draft: null });
  }
}
