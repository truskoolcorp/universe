"use client";

import { useMemo, useState } from "react";
import { BRANDS, LANES, SERVICES } from "@/lib/brands";

/* ── Line-glyph system (single-color, scale clean at tiny sizes) ─────────── */
function Glyph({ kind, size = 26, stroke = "currentColor" }) {
  const p = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const c = size / 2;
  const paths = {
    core:      <g {...p}><circle cx={c} cy={c} r={size*0.30}/><circle cx={c} cy={c} r={size*0.12}/></g>,
    bars:      <g {...p}><line x1={size*0.2} y1={size*0.3} x2={size*0.8} y2={size*0.3}/><line x1={size*0.2} y1={size*0.5} x2={size*0.66} y2={size*0.5}/><line x1={size*0.2} y1={size*0.7} x2={size*0.5} y2={size*0.7}/></g>,
    sunburst:  <g {...p}><circle cx={c} cy={c} r={size*0.16}/>{[0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return <line key={a} x1={c+Math.cos(r)*size*0.24} y1={c+Math.sin(r)*size*0.24} x2={c+Math.cos(r)*size*0.4} y2={c+Math.sin(r)*size*0.4}/>;})}</g>,
    bloom:     <g {...p}>{[0,72,144,216,288].map(a=>{const r=a*Math.PI/180;return <ellipse key={a} cx={c+Math.cos(r)*size*0.18} cy={c+Math.sin(r)*size*0.18} rx={size*0.1} ry={size*0.18} transform={`rotate(${a} ${c+Math.cos(r)*size*0.18} ${c+Math.sin(r)*size*0.18})`}/>;})}<circle cx={c} cy={c} r={size*0.07}/></g>,
    triangle:  <g {...p}><polygon points={`${c},${size*0.18} ${size*0.78},${size*0.78} ${size*0.22},${size*0.78}`}/><line x1={size*0.34} y1={size*0.58} x2={size*0.66} y2={size*0.58}/></g>,
    compass:   <g {...p}><circle cx={c} cy={c} r={size*0.34}/><polygon points={`${c},${size*0.26} ${size*0.6},${c} ${c},${size*0.74} ${size*0.4},${c}`}/></g>,
    pin:       <g {...p}><path d={`M ${c} ${size*0.82} C ${size*0.28} ${size*0.5}, ${size*0.28} ${size*0.22}, ${c} ${size*0.22} C ${size*0.72} ${size*0.22}, ${size*0.72} ${size*0.5}, ${c} ${size*0.82} Z`}/><circle cx={c} cy={size*0.4} r={size*0.08}/></g>,
    orbit:     <g {...p}><circle cx={c} cy={c} r={size*0.12}/><ellipse cx={c} cy={c} rx={size*0.38} ry={size*0.16}/><ellipse cx={c} cy={c} rx={size*0.16} ry={size*0.38}/></g>,
    arch:      <g {...p}><path d={`M ${size*0.22} ${size*0.78} L ${size*0.22} ${size*0.46} A ${size*0.28} ${size*0.28} 0 0 1 ${size*0.78} ${size*0.46} L ${size*0.78} ${size*0.78}`}/><line x1={size*0.16} y1={size*0.78} x2={size*0.84} y2={size*0.78}/></g>,
    leaf:      <g {...p}><path d={`M ${c} ${size*0.2} C ${size*0.78} ${size*0.4}, ${size*0.66} ${size*0.78}, ${c} ${size*0.82} C ${size*0.34} ${size*0.78}, ${size*0.22} ${size*0.4}, ${c} ${size*0.2} Z`}/><line x1={c} y1={size*0.28} x2={c} y2={size*0.76}/></g>,
    snowflake: <g {...p}>{[0,60,120].map(a=>{const r=a*Math.PI/180;return <line key={a} x1={c-Math.cos(r)*size*0.34} y1={c-Math.sin(r)*size*0.34} x2={c+Math.cos(r)*size*0.34} y2={c+Math.sin(r)*size*0.34}/>;})}</g>,
    hex:       <g {...p}><polygon points={[0,60,120,180,240,300].map(a=>{const r=a*Math.PI/180;return `${c+Math.cos(r)*size*0.34},${c+Math.sin(r)*size*0.34}`;}).join(" ")}/><circle cx={c} cy={c} r={size*0.1}/></g>,
    spark:     <g {...p}><path d={`M ${c} ${size*0.18} L ${size*0.58} ${size*0.42} L ${size*0.82} ${c} L ${size*0.58} ${size*0.58} L ${c} ${size*0.82} L ${size*0.42} ${size*0.58} L ${size*0.18} ${c} L ${size*0.42} ${size*0.42} Z`}/></g>,
  };
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{paths[kind] || paths.spark}</svg>;
}

export default function Page() {
  const [active, setActive] = useState([]);          // selected lane ids
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");      // idle | sending | done | error
  const [msg, setMsg] = useState("");

  const toggle = (id) =>
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const core = BRANDS.find((b) => b.core);
  const orbiting = BRANDS.filter((b) => !b.core);

  // Deterministic ring layout around the core.
  const positioned = useMemo(() => {
    const n = orbiting.length;
    return orbiting.map((b, i) => {
      const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rx = 38, ry = 34; // % of viewport box
      return { ...b, x: 50 + Math.cos(ang) * rx, y: 50 + Math.sin(ang) * ry };
    });
  }, []);

  const isMatch = (b) => active.length === 0 || b.lanes.some((l) => active.includes(l));
  const matched = active.length === 0 ? [] : orbiting.filter(isMatch);

  async function join() {
    if (status === "sending") return;
    setStatus("sending"); setMsg("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, interests: active }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
      setMsg("You're in. Check your inbox.");
      setEmail("");
    } catch (e) {
      setStatus("error");
      setMsg(e.message || "Try again.");
    }
  }

  return (
    <main style={{ minHeight: "100vh", maxWidth: 1120, margin: "0 auto", padding: "clamp(24px,5vw,64px)" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ letterSpacing: 4, fontSize: 12, color: "var(--rose)", textTransform: "uppercase", margin: 0 }}>
          Culture · Commerce · Code
        </p>
        <h1 style={{ fontSize: "clamp(34px,6vw,60px)", lineHeight: 1.04, margin: "14px 0 8px", fontWeight: 800 }}>
          The Tru Skool<span style={{ color: "var(--rose)" }}>®</span> Universe
        </h1>
        <p style={{ color: "var(--ink-dim)", maxWidth: 560, margin: "0 auto", fontSize: 17 }}>
          One front door for everything we build. Pick what you're into — the map lights your lanes.
        </p>
      </header>

      {/* Lane selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
        {LANES.map((l) => {
          const on = active.includes(l.id);
          return (
            <button key={l.id} onClick={() => toggle(l.id)}
              style={{
                cursor: "pointer", borderRadius: 999, padding: "9px 16px", fontSize: 14,
                border: `1px solid ${on ? "var(--rose)" : "var(--line)"}`,
                background: on ? "var(--halo)" : "transparent",
                color: on ? "var(--rose)" : "var(--ink-dim)",
                transition: "all .18s ease",
              }}>
              {l.label}
            </button>
          );
        })}
      </div>

      {/* Constellation */}
      <section style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", maxWidth: 820, margin: "0 auto 12px" }}>
        {/* connection lines */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {positioned.map((b) => (
            <line key={b.key} x1="50" y1="50" x2={b.x} y2={b.y}
              stroke={isMatch(b) && active.length ? "var(--rose-deep)" : "var(--line)"}
              strokeWidth={isMatch(b) && active.length ? 0.5 : 0.3}
              strokeOpacity={isMatch(b) ? 0.9 : 0.25} />
          ))}
        </svg>

        {/* core node */}
        <Node b={core} x={50} y={50} matched isCore />

        {/* orbiting nodes */}
        {positioned.map((b) => (
          <Node key={b.key} b={b} x={b.x} y={b.y} matched={isMatch(b)} dim={active.length > 0 && !isMatch(b)} />
        ))}
      </section>

      {/* Matched cards */}
      {matched.length > 0 && (
        <section style={{ margin: "28px 0 8px" }}>
          <h2 style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink-dim)", textAlign: "center" }}>
            Your lanes — {matched.length} world{matched.length > 1 ? "s" : ""}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 16 }}>
            {matched.map((b) => <Card key={b.key} b={b} />)}
          </div>
        </section>
      )}

      {/* Email capture */}
      <section style={{ marginTop: 48, padding: "28px clamp(20px,4vw,40px)", border: "1px solid var(--line)", borderRadius: 20, background: "var(--bg-soft)", textAlign: "center" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 700 }}>Get the keys to the universe</h2>
        <p style={{ color: "var(--ink-dim)", margin: "0 0 18px" }}>
          Drops, releases, and openings — routed to the lanes you picked.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 520, margin: "0 auto" }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com"
            onKeyDown={(e) => e.key === "Enter" && join()}
            style={{ flex: "1 1 240px", padding: "13px 16px", borderRadius: 12, border: "1px solid var(--line)", background: "var(--bg)", color: "var(--ink)", fontSize: 15 }} />
          <button onClick={join} disabled={status === "sending"}
            style={{ padding: "13px 22px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15,
              background: "linear-gradient(135deg, var(--rose), var(--rose-deep))", color: "#1A1014" }}>
            {status === "sending" ? "…" : status === "done" ? "Joined ✓" : "Join"}
          </button>
        </div>
        {msg && <p style={{ marginTop: 12, fontSize: 14, color: status === "error" ? "#E89A9A" : "var(--rose)" }}>{msg}</p>}
        {active.length > 0 && <p style={{ marginTop: 10, fontSize: 12, color: "var(--ink-dim)" }}>Tagging you for: {active.map(id => LANES.find(l=>l.id===id)?.label).join(" · ")}</p>}
      </section>

      {/* Studio services */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink-dim)", textAlign: "center", marginBottom: 16 }}>
          Studio Services
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {SERVICES.map((s) => (
            <div key={s.name} style={{ padding: 16, border: "1px solid var(--line)", borderRadius: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "var(--ink-dim)" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: 56, paddingTop: 22, borderTop: "1px solid var(--line)", textAlign: "center", color: "var(--ink-dim)", fontSize: 12 }}>
        <p style={{ margin: 0 }}>Tru Skool® · Faithfully Faded® · Café Sativa® — registered. All other marks ™.</p>
        <p style={{ margin: "6px 0 0" }}>© {new Date().getFullYear()} Tru Skool Entertainment International Corp. Culture. Commerce. Code.</p>
      </footer>
    </main>
  );
}

/* ── Constellation node ──────────────────────────────────────────────────── */
function Node({ b, x, y, matched, dim, isCore }) {
  const sz = isCore ? 74 : 56;
  return (
    <a href={b.url} target="_blank" rel="noopener noreferrer"
      title={`${b.name}${b.mark}`}
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)",
        width: sz, height: sz, borderRadius: "50%", display: "grid", placeItems: "center",
        border: `1px solid ${matched ? "var(--rose)" : "var(--line)"}`,
        background: isCore ? "radial-gradient(circle, var(--halo), transparent 70%)" : "var(--bg-soft)",
        color: matched ? "var(--rose)" : "var(--ink-dim)",
        boxShadow: matched ? "0 0 0 6px var(--halo)" : "none",
        opacity: dim ? 0.32 : 1,
        transition: "all .22s ease", cursor: "pointer", textAlign: "center",
      }}>
      {b.logo ? (
        <img src={b.logo} alt={`${b.name} logo`} loading="lazy"
          style={{
            width: isCore ? sz * 0.80 : sz * 0.84,
            height: isCore ? sz * 0.80 : sz * 0.84,
            objectFit: "contain", borderRadius: "50%",
            display: "block", pointerEvents: "none",
          }} />
      ) : (
        <Glyph kind={b.glyph} size={isCore ? 30 : 24} />
      )}
    </a>
  );
}

/* ── Matched brand card ──────────────────────────────────────────────────── */
function Card({ b }) {
  return (
    <a href={b.url} target="_blank" rel="noopener noreferrer"
      style={{ display: "block", padding: 18, border: "1px solid var(--line)", borderRadius: 16, background: "var(--bg-soft)", transition: "border-color .18s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, color: "var(--rose)" }}>
        {b.logo ? (
          <img src={b.logo} alt={`${b.name} logo`} loading="lazy"
            style={{ width: 30, height: 30, objectFit: "contain", display: "block", flex: "0 0 auto" }} />
        ) : (
          <Glyph kind={b.glyph} size={22} />
        )}
        <strong style={{ fontSize: 16 }}>{b.name}<span style={{ color: "var(--ink-dim)", fontWeight: 400 }}>{b.mark}</span></strong>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "var(--ink-dim)" }}>{b.blurb}</p>
    </a>
  );
}
