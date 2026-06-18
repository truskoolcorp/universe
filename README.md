# The Tru Skool® Universe

One front-door discovery app for the whole ecosystem. A "Find Your Lane"
constellation routes a visitor to every matching brand and captures them as a
lead — interest-tagged — into Supabase, with a Resend confirmation email.

Suggested home: `discover.truskool.net` or `hub.truskool.net`.

## Stack
- Next.js 14 (App Router)
- Supabase (lead storage, server-side service role)
- Resend (transactional confirmation email)

## 1. Install & run locally
```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

## 2. Database
Run `supabase/migrations/0001_leads.sql` in the Supabase SQL editor (or via the
Supabase MCP). Recommended project: `dallasite-crm` (ugdaqdhthleyhvsubxis) to
keep leads flowing into the same ops DB / Commander's Brief.

## 3. Environment variables (Vercel → Project → Settings → Environment)
| Var | Notes |
|-----|-------|
| `SUPABASE_URL` | `https://<ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only; never expose to client |
| `RESEND_API_KEY` | `re_…` |
| `RESEND_FROM` | verified sender, e.g. `Tru Skool <hello@truskool.net>` |

## 4. Deploy
Push to GitHub and import in Vercel, or `vercel --prod`. Map the subdomain in
Vercel domains + Cloudflare DNS.

## 5. Before launch — confirm these brand URLs
`lib/brands.js` marks any unverified link with `confirm: true`. Those currently
route to `truskool.net` (live, never a dead link). Replace with the real URLs:
Faithfully Faded, Concrete Rose, BiJaDi, Wanderlust, T-360, IMPACT, G.L.Y.P.H.

## Notes
- Trademark marks locked: Tru Skool®, Faithfully Faded®, Café Sativa® = ®; all others = ™.
- Rose-gold / platinum palette only (no yellow gold). Botanical framing for Café Sativa + Cold Stoned.
- Nodes use the system line-glyphs. Swapping in real single-color logo vectors is the queued polish pass.
