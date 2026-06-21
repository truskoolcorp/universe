// ───────────────────────────────────────────────────────────────────────────
// THE TRU SKOOL UNIVERSE — brand directory (single source of truth)
//
// Trademark usage (per Keith, locked):
//   ® → Tru Skool, Faithfully Faded, Café Sativa
//   ™ → everything else
//
// Content rules honored: rose-gold / platinum only (never yellow gold);
// botanical / lifestyle framing for Café Sativa + Cold Stoned (no explicit
// cannabis wording).
//
// All brand URLs confirmed and pointed at their live destinations (Jun 2026).
// Every star is a real, live link — no placeholders.
// ───────────────────────────────────────────────────────────────────────────

export const LANES = [
  { id: "fashion",   label: "Fashion & Streetwear" },
  { id: "music",     label: "Music" },
  { id: "travel",    label: "Travel" },
  { id: "realestate",label: "Real Estate" },
  { id: "cafe",      label: "Café & Lifestyle" },
  { id: "ai",        label: "AI & Business" },
];

// glyph: matches the line-glyph system already designed for the constellation.
export const BRANDS = [
  {
    key: "truskool", name: "Tru Skool", mark: "®", core: true,
    glyph: "core", url: "https://truskool.net",
    logo: "/brands/truskool.png",
    blurb: "The parent. Culture. Commerce. Code.",
    lanes: ["fashion","music","travel","realestate","cafe","ai"],
    links: [
      { label: "Podcast Network", type: "podcast", href: "https://podcast.truskool.net" },
      { label: "Legacy in Transit", type: "podcast", href: "https://podcasts.apple.com/us/podcast/legacy-in-transit/id1867828185" },
      { label: "Mall", type: "app", href: "https://mall.truskool.net" },
    ],
  },
  {
    key: "faithfullyfaded", name: "Faithfully Faded", mark: "®",
    glyph: "bars", url: "https://www.faithfully-faded.com",
    logo: "/brands/faithfullyfaded.png",
    blurb: "Streetwear with a story.",
    lanes: ["fashion"],
    links: [
      { label: "The Alignment Lab", type: "podcast", href: "https://www.youtube.com/playlist?list=PL-qV1oqAiYcI_DwEWmXS4aNoUFP1RmG_v" },
    ],
  },
  {
    key: "hoe", name: "H.O.E.", mark: "™",
    glyph: "sunburst", url: "https://hoeonline.us",
    logo: "/brands/hoe.png",
    blurb: "Happiness Over Everything.",
    lanes: ["fashion"],
  },
  {
    key: "concreterose", name: "Concrete Rose", mark: "™",
    glyph: "bloom", url: "https://www.concrete-rose.world/",
    logo: "/brands/concreterose.png",
    blurb: "Grown through the cracks.",
    lanes: ["fashion","cafe"],
    links: [
      { label: "The Laviche Effect", type: "podcast", href: "https://podcasts.apple.com/us/podcast/the-laviche-effect/id1849335183" },
    ],
  },
  {
    key: "bijadi", name: "BiJaDi", mark: "™",
    glyph: "gem", url: "https://www.bijadi.net",
    logo: "/brands/bijadi.png",
    blurb: "Beyond Enough.",
    lanes: ["fashion"],
  },
  {
    key: "versealkemist", name: "THE Verse Alkemist", mark: "™",
    glyph: "triangle", url: "https://versealkemist.net",
    logo: "/brands/versealkemist.png",
    blurb: "Turning lived experience into sound.",
    lanes: ["music"],
    links: [
      { label: "YouTube", type: "video", href: "https://www.youtube.com/@VerseAlkemist" },
    ],
  },
  {
    key: "wanderlust", name: "Wanderlust", mark: "™",
    glyph: "compass", url: "https://wanderlustfashionstore.com",
    logo: "/brands/wanderlust.png",
    blurb: "Go further.",
    lanes: ["travel"],
  },
  {
    key: "dot", name: "D.o.T.", mark: "™",
    glyph: "pin", url: "https://dallasiteontour.org",
    logo: "/brands/dot.png",
    blurb: "Dallasite on Tour. Dallas raised me. The world finished the job.",
    lanes: ["travel"],
    links: [
      { label: "Off the Map", type: "podcast", href: "https://dot-podcast.truskool.net" },
      { label: "Salt & Story", type: "podcast", href: "https://sns-podcast.truskool.net" },
      { label: "Adventures in the Red", type: "podcast", href: "https://podcasts.apple.com/us/podcast/adventures-in-the-red/id1849355166" },
      { label: "YouTube", type: "video", href: "https://www.youtube.com/@DallasiteonTour" },
    ],
  },
  {
    key: "t360", name: "T-360", mark: "™",
    glyph: "orbit", url: "https://t360.truskool.net",
    logo: "/brands/t360.png",
    blurb: "Tenerife, in full circle.",
    lanes: ["travel","realestate"],
  },
  {
    key: "impact", name: "IMPACT", mark: "™",
    glyph: "arch", url: "https://truskoolcorp.wixstudio.com/impact",
    logo: "/brands/impact.png",
    blurb: "Mediterranean properties & Canary tourism.",
    lanes: ["realestate"],
  },
  {
    key: "cafesativa", name: "Café Sativa", mark: "®",
    glyph: "leaf", url: "https://www.cafe-sativa.com",
    logo: "/brands/cafesativa.png",
    blurb: "Sip. Smoke. Vibe.",
    lanes: ["cafe"],
    links: [
      { label: "What Are You Smoking?", type: "podcast", href: "https://What-are-you-Smoking.transistor.fm" },
    ],
  },
  {
    key: "coldstoned", name: "Cold Stoned", mark: "™",
    glyph: "snowflake", url: "https://cold-stoned.com",
    logo: "/brands/coldstoned.png",
    blurb: "Botanical gelato. Slow and cold.",
    lanes: ["cafe"],
  },
  {
    key: "glyph", name: "G.L.Y.P.H.", mark: "™",
    glyph: "hex", url: "https://truskoolcorp.wixstudio.com/glyph",
    logo: "/brands/glyph.png",
    blurb: "Eight minds. One mission. Codified for legacy.",
    lanes: ["ai"],
  },
  {
    key: "truskoolai", name: "Tru Skool AI", mark: "™",
    glyph: "spark", url: "https://ai.truskool.net",
    logo: "/brands/truskoolai.png",
    blurb: "Creativity, Amplified.",
    lanes: ["ai"],
  },
];

// Productized studio menu — wire each href to your real Book / Shop links.
export const SERVICES = [
  { name: "Persona Starter",  note: "One AI brand persona, ready to post." },
  { name: "Persona Pro",      note: "Full voice + avatar + content engine." },
  { name: "Drop Kit",         note: "Launch a product drop end to end." },
  { name: "Artist Mini-Kit",  note: "Single release, packaged to ship." },
  { name: "Brand Sheet",      note: "Colors, type, marks, usage — locked." },
  { name: "Link-in-bio",      note: "One clean front door for your links." },
  { name: "Logo Cleanup",     note: "Your mark, redrawn as crisp vector." },
];
