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

  // SUPABASE_URL + publishable key are safe to ship publicly: the universe_leads
  // table is insert-only under RLS (no read policy), so this key cannot list leads.
  // Env vars take priority; the baked defaults point at the dallasite-crm project so
  // the app captures leads out-of-the-box. Override in Vercel env to repoint.
  const SUPABASE_URL =
    process.env.SUPABASE_URL || "https://ugdaqdhthleyhvsubxis.supabase.co";
  const SUPABASE_KEY =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "sb_publishable_eHWtC_ApfW3Mf_cOLKBxOw_RWqdZ_uI";
  const { RESEND_API_KEY, RESEND_FROM } = process.env;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return json({ ok: false, error: "Server not configured." }, 500);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });

  // RLS allows insert-only for anon. Plain insert; a duplicate email is a
  // unique-constraint violation (23505) which we treat as "already in."
  const { error: dbError } = await supabase
    .from("universe_leads")
    .insert({ email, interests, source: "universe" });

  const isDuplicate = dbError && dbError.code === "23505";

  if (dbError && !isDuplicate) {
    return json({ ok: false, error: "Could not save. Try again." }, 500);
  }

  // Fire-and-forget confirmation, only on a fresh join. A mail failure should
  // never fail the signup.
  if (!isDuplicate && RESEND_API_KEY && RESEND_FROM) {
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

  return json({ ok: true, duplicate: !!isDuplicate });
}
