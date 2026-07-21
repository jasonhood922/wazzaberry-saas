import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const { allowed } = rateLimit(`waitlist:${clientIp(request)}`, 10, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests — try again later." },
      { status: 429 }
    );
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const clean = email.trim().toLowerCase();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Waitlist storage is not configured." },
      { status: 503 }
    );
  }

  const entry = {
    email: clean,
    joinedAt: new Date().toISOString(),
    source: request.headers.get("referer") ?? "direct",
  };

  await put(
    `waitlist/${encodeURIComponent(clean)}-${Date.now()}.json`,
    JSON.stringify(entry),
    { access: "private", contentType: "application/json" }
  );

  return NextResponse.json({ ok: true });
}
