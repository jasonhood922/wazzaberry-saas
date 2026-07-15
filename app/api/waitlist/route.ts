import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
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
    `waitlist/${Date.now()}-${crypto.randomUUID()}.json`,
    JSON.stringify(entry),
    { access: "private", contentType: "application/json" }
  );

  return NextResponse.json({ ok: true });
}
