import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON." }, 400);
  }

  const email = String(payload?.email || "").trim().toLowerCase();
  const interests = Array.isArray(payload?.interests) ? payload.interests.slice(0, 12) : [];

  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Enter a valid email." }, 400);
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_FROM } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ ok: false, error: "Server not configured." }, 500);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Upsert on email so repeat joins just refresh interests instead of erroring.
  const { error: dbError } = await supabase
    .from("leads")
    .upsert({ email, interests, source: "universe" }, { onConflict: "email" });

  if (dbError) {
    return json({ ok: false, error: "Could not save. Try again." }, 500);
  }

  // Fire-and-forget confirmation. A mail failure should not fail the signup.
  if (RESEND_API_KEY && RESEND_FROM) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const laneLine = interests.length
        ? `Your lanes: ${interests.join(", ")}.`
        : "We'll show you the whole universe.";
      await resend.emails.send({
        from: RESEND_FROM,
        to: email,
        subject: "You're in the Tru Skool Universe",
        text:
          `You're on the list.\n\n${laneLine}\n\n` +
          `We build across fashion, music, travel, real estate, cafe culture, and AI tools — ` +
          `and we'll point you to the worlds that fit.\n\nCulture. Commerce. Code.\n— Tru Skool`,
      });
    } catch {
      // swallow — the lead is already captured
    }
  }

  return json({ ok: true });
}
