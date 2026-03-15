"use client";

import { useState, useRef, useEffect } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────── */
// pctX / pctY = position as % of the skeleton image dimensions

const contributions = [
  {
    id: "research",
    label: "Clinical Research",
    svgX: 110, svgY: 30,         // head
    color: "#1D5FA8",
    comp: "$50–500+",
    sub: "per study",
    frequency: "Varies by trial",
    duration: "2–8 hrs per visit",
    headline: "Your participation shapes the next treatment.",
    body: "FDA-regulated clinical trials need healthy, consenting participants to generate the data that moves medicine forward. From single-visit cognitive screenings to multi-month pharmaceutical studies, EarnAhead surfaces verified trials near you. You choose the commitment level. The compensation reflects the depth of involvement.",
    aside: "2,847 active studies currently enrolling across the US.",
  },
  {
    id: "blood",
    label: "Whole Blood",
    svgX: 18, svgY: 162,         // left forearm
    color: "#8B1F1F",
    comp: "$20–50",
    sub: "per donation",
    frequency: "Every 56 days",
    duration: "45 minutes",
    headline: "One draw. Up to three lives saved.",
    body: "Whole blood is separated into red cells, plasma, and platelets — each component sent to a different patient. Trauma victims, cancer patients mid-chemotherapy, premature infants. Donation is limited to every 56 days by regulation, keeping the process safe and the supply consistent.",
    aside: "Over 40,000 pints transfused every day in the United States.",
  },
  {
    id: "plasma",
    label: "Plasma",
    svgX: 202, svgY: 162,        // right forearm
    color: "#B5451E",
    comp: "$50–110",
    sub: "per session",
    frequency: "Up to 2× per week",
    duration: "90 minutes",
    headline: "The most frequent. The most consistent earnings.",
    body: "Plasma is the protein-rich liquid portion of your blood. It's used to manufacture treatments for rare immune disorders, hemophilia, and severe burns — conditions where synthetic alternatives don't exist. Because plasma replenishes quickly, twice-weekly donation is medically safe. The most consistent earners on EarnAhead donate plasma.",
    aside: "Average contributor earns $420–$680/month from plasma alone.",
  },
  {
    id: "egg",
    label: "Egg Donation",
    svgX: 82, svgY: 232,         // left pelvis
    color: "#2D7A5A",
    comp: "$5,000–30,000",
    sub: "per cycle",
    frequency: "1–2 cycles per year",
    duration: "3–4 week process",
    headline: "The most significant contribution. The highest compensation.",
    body: "Egg donation helps families who cannot conceive naturally — couples, single parents, same-sex partners. The process involves medical screening, hormone therapy, and a single retrieval procedure performed under sedation. The thorough evaluation and multi-week commitment is reflected in the compensation, among the highest of any contribution type.",
    aside: "1 in 8 couples in the US faces infertility.",
  },
  {
    id: "sperm",
    label: "Sperm Donation",
    svgX: 138, svgY: 232,        // right pelvis
    color: "#6B4A9B",
    comp: "$100–200",
    sub: "per sample",
    frequency: "2–3× per month",
    duration: "30 minutes",
    headline: "Consistent. Flexible. Ongoing.",
    body: "Approved sperm donors provide ongoing support to fertility clinics and cryobanks. After an initial screening and quarantine period to confirm viability, scheduling is entirely yours to manage. Compensation arrives per approved sample. Many donors maintain an engagement of 6–12 months, building a reliable secondary income stream.",
    aside: "Up to $600/month once fully enrolled.",
  },
];

/* ─── Body SVG figure ───────────────────────────────────────────────────── */

function BodyFigure({ active }: { active: string | null }) {
  const sc = "var(--figure-stroke)";
  const sw = 1.5;

  return (
    <svg
      viewBox="0 0 220 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 200, display: "block", overflow: "visible" }}
    >
      <style>{`
        @keyframes dot-breathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .dot-idle { animation: dot-breathe 2.8s ease-in-out infinite; }
      `}</style>

      {/* Head */}
      <ellipse cx="110" cy="30" rx="24" ry="26" stroke={sc} strokeWidth={sw} />
      {/* Neck */}
      <path d="M 100 55 L 100 72 L 120 72 L 120 55" stroke={sc} strokeWidth={sw} />
      {/* Clavicles */}
      <path d="M 100 72 Q 78 74 46 84" stroke={sc} strokeWidth={sw} />
      <path d="M 120 72 Q 142 74 174 84" stroke={sc} strokeWidth={sw} />
      {/* Arms */}
      <path d="M 46 84 C 32 115 18 158 14 202" stroke={sc} strokeWidth={sw} />
      <path d="M 174 84 C 188 115 202 158 206 202" stroke={sc} strokeWidth={sw} />
      {/* Torso sides */}
      <path d="M 46 84 L 50 222" stroke={sc} strokeWidth={sw} />
      <path d="M 174 84 L 170 222" stroke={sc} strokeWidth={sw} />
      {/* Pelvis arc */}
      <path d="M 50 222 Q 110 238 170 222" stroke={sc} strokeWidth={sw} />
      {/* Legs */}
      <path d="M 72 234 L 64 382" stroke={sc} strokeWidth={sw} />
      <path d="M 148 234 L 156 382" stroke={sc} strokeWidth={sw} />

      {/* Hotspot dots */}
      {contributions.map((c) => {
        const isActive = active === c.id;
        const anyActive = active !== null;
        return (
          <g key={c.id}>
            {isActive && <circle cx={c.svgX} cy={c.svgY} r={18} fill={c.color} opacity={0.08} />}
            {isActive && <circle cx={c.svgX} cy={c.svgY} r={12} fill={c.color} opacity={0.15} />}
            <circle
              cx={c.svgX} cy={c.svgY}
              r={isActive ? 7 : 5}
              fill={c.color}
              opacity={anyActive && !isActive ? 0.18 : isActive ? 1 : 0.7}
              style={{ transition: "all 450ms ease" }}
              className={!anyActive ? "dot-idle" : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function SixPage() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [zip, setZip] = useState("");
  const [zipSubmitted, setZipSubmitted] = useState(false);
  const chapterRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-chapter");
            setActiveChapter(id && id !== "intro" ? id : null);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    chapterRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length === 5) setZipSubmitted(true);
  };

  const active = contributions.find((c) => c.id === activeChapter) ?? null;

  return (
    <div style={{ paddingTop: 52, background: "var(--bg)" }}>

      {/* ── TWO-PANEL ZONE ──────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>

        {/* LEFT: sticky skeleton panel */}
        <div style={{
          flex: "0 0 40%",
          position: "sticky",
          top: 52,
          height: "calc(100vh - 52px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid var(--border-2)",
          padding: "32px 36px 48px",
          gap: 0,
          overflow: "hidden",
        }}>
          {/* Skeleton image with dots */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
            <BodyFigure active={activeChapter} />
          </div>

          {/* Info strip below skeleton */}
          <div style={{
            height: 116,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "center",
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
          }}>
            {active ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: active.color }} />
                  <span style={{
                    fontSize: 9, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: active.color, fontWeight: 700,
                  }}>
                    {active.label}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 32, color: "var(--text)", lineHeight: 1,
                  letterSpacing: "-0.02em", marginBottom: 6,
                }}>
                  {active.comp}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 4 }}>
                  {active.sub}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                  {active.frequency} · {active.duration}
                </div>
              </>
            ) : (
              <>
                <div style={{
                  fontSize: 9, color: "var(--text-3)", letterSpacing: "0.16em",
                  textTransform: "uppercase", fontWeight: 600, marginBottom: 10,
                }}>
                  5 opportunities
                </div>
                <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.65, maxWidth: 200 }}>
                  Each dot marks an anatomical origin.<br />
                  Scroll to explore each one.
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: scrollable chapters */}
        <div style={{ flex: 1 }}>

          {/* INTRO */}
          <div
            data-chapter="intro"
            ref={(el) => { if (el) chapterRefs.current.set("intro", el); }}
            style={{
              minHeight: "calc(100vh - 52px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 68px",
            }}
          >
            <div style={{
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--text-3)", fontWeight: 600, marginBottom: 40,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ width: 28, height: 1, background: "var(--text-3)" }} />
              EarnAhead
            </div>

            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(52px, 6vw, 84px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              margin: "0 0 36px",
            }}>
              Your body<br />
              already<br />
              <em style={{ fontStyle: "italic" }}>knows<br />how to help.</em>
            </h1>

            <p style={{
              fontSize: 16, color: "var(--text-2)", lineHeight: 1.8,
              maxWidth: 400, margin: "0 0 52px",
            }}>
              Five ways your biology creates real income while giving
              someone else a fighting chance. The skeleton on the left
              marks exactly where each contribution originates.
            </p>

            <form onSubmit={handleSearch} style={{ display: "flex", maxWidth: 360, marginBottom: 12 }}>
              <input
                type="text"
                placeholder="Enter ZIP to find centers"
                value={zip}
                onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); setZipSubmitted(false); }}
                maxLength={5}
                style={{
                  flex: 1, height: 50, padding: "0 18px",
                  background: "transparent",
                  border: "1px solid var(--border-2)", borderRight: "none",
                  color: "var(--text)", fontSize: 15, outline: "none",
                  fontFamily: "'DM Serif Display', serif",
                  letterSpacing: "0.06em",
                }}
              />
              <button
                type="submit"
                disabled={zip.length !== 5}
                style={{
                  height: 50, padding: "0 22px",
                  background: zip.length === 5 ? "var(--text)" : "transparent",
                  color: zip.length === 5 ? "var(--bg)" : "var(--text-3)",
                  border: "1px solid var(--border-2)",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: zip.length === 5 ? "pointer" : "default",
                  transition: "all 200ms", fontFamily: "inherit",
                }}
              >
                Search
              </button>
            </form>

            {zipSubmitted && (
              <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                Zip code integration has not been added yet.
              </p>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: zipSubmitted ? 0 : 8 }}>
              <div style={{ width: 20, height: 1, background: "var(--text-3)" }} />
              <span style={{
                fontSize: 10, color: "var(--text-3)",
                letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                Scroll to explore each opportunity
              </span>
            </div>
          </div>

          {/* Contribution chapters */}
          {contributions.map((c, i) => (
            <div
              key={c.id}
              data-chapter={c.id}
              ref={(el) => { if (el) chapterRefs.current.set(c.id, el); }}
              style={{
                minHeight: "100vh",
                padding: "88px 68px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{
                fontSize: 9, color: "var(--text-3)", letterSpacing: "0.18em",
                textTransform: "uppercase", fontWeight: 600, marginBottom: 32,
              }}>
                {String(i + 1).padStart(2, "0")} / 05
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{
                  fontSize: 10, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: c.color, fontWeight: 700,
                }}>
                  {c.label}
                </span>
              </div>

              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(32px, 3.6vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: "0 0 28px",
                maxWidth: 480,
              }}>
                {c.headline}
              </h2>

              <p style={{
                fontSize: 15, color: "var(--text-2)", lineHeight: 1.88,
                maxWidth: 460, margin: "0 0 36px",
              }}>
                {c.body}
              </p>

              {/* Callout aside */}
              <div style={{
                padding: "18px 22px",
                background: "var(--surface)",
                borderLeft: `3px solid ${c.color}`,
                maxWidth: 400,
                marginBottom: 40,
              }}>
                <p style={{
                  fontSize: 13, color: "var(--text-2)",
                  lineHeight: 1.6, margin: 0, fontStyle: "italic",
                }}>
                  {c.aside}
                </p>
              </div>

              {/* Stats row */}
              <div style={{
                display: "flex", gap: 0,
                paddingTop: 32,
                borderTop: "1px solid var(--border-2)",
              }}>
                <div style={{ paddingRight: 44 }}>
                  <div style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 28, color: c.color, lineHeight: 1, marginBottom: 8,
                  }}>
                    {c.comp}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>{c.sub}</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 44, paddingRight: 44 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1, marginBottom: 8 }}>
                    {c.frequency}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>Frequency</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 44 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1, marginBottom: 8 }}>
                    {c.duration}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>Per session</div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: c.color,
                  borderBottom: `1px solid ${c.color}55`,
                  paddingBottom: 3,
                  cursor: "pointer",
                }}>
                  Find {c.label} Centers Near You →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FULL-WIDTH BOTTOM ────────────────────────────────────────────── */}

      {/* Editorial statement */}
      <div style={{
        background: "var(--text)",
        padding: "96px 80px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{
            width: 28, height: 1,
            background: "rgba(244,239,230,0.25)",
            margin: "0 auto 52px",
          }} />
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(20px, 2.6vw, 32px)",
            color: "var(--bg)",
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            fontStyle: "italic",
            margin: "0 0 52px",
          }}>
            "In the time it takes to read this sentence,<br />
            42 units of blood were transfused<br />
            somewhere in the United States."
          </p>
          <div style={{
            width: 28, height: 1,
            background: "rgba(244,239,230,0.25)",
            margin: "0 auto",
          }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border-2)",
        borderBottom: "1px solid var(--border-2)",
        padding: "56px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
      }}>
        {[
          { n: "142,000+", label: "Contributions facilitated" },
          { n: "$4.2M+", label: "Paid to contributors" },
          { n: "89,000+", label: "Patients helped" },
          { n: "2,400+", label: "Verified partner centers" },
        ].map((s, i) => (
          <div key={i} style={{
            paddingLeft: i > 0 ? 48 : 0,
            borderLeft: i > 0 ? "1px solid var(--border-2)" : "none",
          }}>
            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 36, color: "var(--text)",
              lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em",
            }}>
              {s.n}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "var(--bg)", padding: "96px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(44px, 5.5vw, 68px)",
            color: "var(--text)", letterSpacing: "-0.025em",
            lineHeight: 0.96, margin: "0 0 48px",
          }}>
            Start with<br />your ZIP.
          </h2>
          <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: 16 }}>
            <input
              type="text"
              placeholder="ZIP code"
              value={zip}
              onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); setZipSubmitted(false); }}
              maxLength={5}
              style={{
                flex: 1, height: 58, padding: "0 20px",
                background: "var(--surface)",
                border: "1px solid var(--border-2)", borderRight: "none",
                color: "var(--text)", fontSize: 20, outline: "none",
                fontFamily: "'DM Serif Display', serif", letterSpacing: "0.08em",
              }}
            />
            <button
              type="submit"
              disabled={zip.length !== 5}
              style={{
                height: 58, padding: "0 28px",
                background: zip.length === 5 ? "var(--text)" : "var(--surface)",
                color: zip.length === 5 ? "var(--bg)" : "var(--text-3)",
                border: "1px solid var(--border-2)",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: zip.length === 5 ? "pointer" : "default",
                transition: "all 200ms", fontFamily: "inherit",
              }}
            >
              Find Opportunities
            </button>
          </form>
          {zipSubmitted ? (
            <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Zip code integration has not been added yet.
            </p>
          ) : (
            <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Free to browse · No account required
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "22px 52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 15, color: "var(--text)", letterSpacing: "0.02em",
        }}>
          EarnAhead
        </span>
        <span style={{
          fontSize: 10, color: "var(--text-3)",
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          © 2026 · All contributions through verified medical providers
        </span>
        <a href="/" style={{ fontSize: 11, color: "var(--text-3)", textDecoration: "none" }}>
          ← Picker
        </a>
      </footer>
    </div>
  );
}
