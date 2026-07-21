import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { completeText } from "@/lib/llm";

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

  const result = await completeText(
    "You draft warm, concise B2B sales replies. Rules: match the prospect's energy, answer their actual question first, propose one clear next step, max 90 words, no exclamation marks, no emoji, no placeholder brackets. Respond with the reply text only.",
    `${context}\n\nProspect ${prospect.name ?? ""} (${prospect.company ?? "unknown company"}) wrote:\n"${prospect.message.slice(0, 1500)}"\n\nDraft the reply.`,
    350
  );

  if (!result || result.text.length < 10) {
    return NextResponse.json({ ok: true, source: "fallback", draft: null });
  }
  return NextResponse.json({
    ok: true,
    source: "ai",
    provider: result.provider,
    draft: result.text,
  });
}
