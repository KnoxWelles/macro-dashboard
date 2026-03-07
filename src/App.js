import { useState, useEffect } from "react";

// ============================================================
//  WEEKLY DATA ARCHIVE
//  To add a new week: copy the last week object, paste it at
//  the TOP of this array, update all the fields, and push.
//  Old weeks stay intact and accessible via the week selector.
// ============================================================

const weeks = [
  {
    id: "mar9-2026",
    label: "Mar 9–13",
    year: "2026",
    markets: [
      {
        name: "XAUUSD", label: "Gold", emoji: "🥇", price: "$5,171", change: "-1.9% from highs",
        bias: "BULLISH", biasColor: "#22c55e", borderColor: "#d97706",
        keyLevel: "Support: $5,052 | Resistance: $5,208–$5,266",
        drivers: [
          {
            short: "⚡ FEB CPI (Wed Mar 11) — the week's #1 catalyst. A soft read = gold rallies hard",
            detail: "CPI is the master key. Gold is inversely correlated with real yields. A soft Feb CPI print accelerates Fed cut pricing → real yields drop → gold surges. Jan CPI was +2.4% YoY; market needs ≤2.3% to feel dovish. A hot print (+2.6%+) could temporarily push gold back toward $5,052 before buyers return."
          },
          {
            short: "🏦 Fed on hold at 3.50–3.75%. Market pricing 2 cuts (Jul/Sep). Dovish lean = tailwind",
            detail: "The FOMC meets Mar 17–18 but a cut is fully off the table. The path of least resistance is July for cut #1. Every data point that confirms economic softening shortens the wait — and gold prices that in immediately. Blackout week means no Fed speakers to push back on rate-cut expectations."
          },
          {
            short: "🪖 US-Iran nuclear talks at risk of breakdown → $15–20/bbl oil surge = safe-haven gold bid",
            detail: "A geopolitical flare-up in the Middle East is gold's strongest short-term tail-risk catalyst. Oil spiking $15–20/bbl raises inflation fears, delays Fed cuts, and triggers safe-haven flows simultaneously. Gold historically front-runs oil-driven inflation scares within hours of headline risk."
          },
          {
            short: "🏛️ Central banks (China, Turkey) continuing structural reserve accumulation",
            detail: "Central bank gold buying has been the structural floor under gold since 2022. China's PBoC and Turkey's central bank are the largest buyers. This is not price-sensitive buying — it continues regardless of spot price. It absorbs supply and provides a demand backstop during corrections."
          },
          {
            short: "📉 Real yields declining trend intact = structural gold support",
            detail: "Real yields (TIPS) have been in a declining trend as nominal yields soften and inflation expectations stay elevated. Gold has near-perfect inverse correlation with 10Y real yields. As long as real yields stay below 1.5%, gold's structural bull case holds. Watch the 10Y TIPS yield daily."
          },
          {
            short: "💥 Weak Feb NFP (-92K vs +59K expected) increases recession narrative → gold bullish",
            detail: "The -92K NFP print was the biggest negative shock in 4 months. It raises the probability of a hard landing scenario — which is historically very bullish for gold. It also forces the Fed's hand: if labor continues to weaken, they may cut sooner than July despite sticky CPI."
          }
        ],
        watch: "Break above $5,208 with volume = target $5,266–$5,370. Hold below $5,052 = risk to $4,937."
      },
      {
        name: "XAGUSD", label: "Silver", emoji: "🥈", price: "~$82", change: "−9.4% from $90.50 highs",
        bias: "NEUTRAL→BULL", biasColor: "#f59e0b", borderColor: "#0284c7",
        keyLevel: "Support: $70 zone | Resistance: $90",
        drivers: [
          {
            short: "⚡ FEB CPI (Wed Mar 11) — dual sensitivity: monetary policy + industrial demand proxy",
            detail: "Silver uniquely responds to CPI from two angles. Like gold, soft CPI = dovish Fed = silver rallies on monetary sensitivity. But silver also has 50%+ industrial usage — lower inflation expectations signal healthier real activity. A Goldilocks CPI (cool but not recessionary) is the ideal scenario for silver."
          },
          {
            short: "🏭 5th consecutive year of structural supply deficit. Industrial demand (EV, solar) accelerating",
            detail: "Silver demand for solar panels and EV charging infrastructure has created a multi-year supply deficit. The Silver Institute projects another 150–180M oz deficit in 2026. Mine supply growth is minimal. This structural bid makes the current -9.4% pullback a buying opportunity rather than a trend break."
          },
          {
            short: "🔗 High correlation with gold — follows gold's macro moves but with higher beta",
            detail: "Silver historically moves 1.5–2x the magnitude of gold on directional breaks. When gold rallied 40%+ in 2025, silver rallied 120%. In corrections, silver also falls harder. This beta relationship means traders use silver as a leveraged gold trade — but requires tighter stops through volatility."
          },
          {
            short: "📊 Consolidation after 120% surge in 2025 — healthy base-building above $70 support",
            detail: "After a parabolic 120% run to $90.50 in 2025, a -9.4% consolidation is technically healthy. The $70 zone represents the prior breakout level and a natural accumulation zone. Time-based consolidation at these levels typically precedes the next leg higher. No technical damage until a weekly close below $68."
          },
          {
            short: "⚠️ Weak NFP & tariff uncertainty dampening industrial metal sentiment short-term",
            detail: "Tariffs on Canadian and Mexican goods affect industrial supply chains that rely on silver inputs. A weaker jobs market also signals softer manufacturing activity. These are short-term headwinds keeping silver below $90. Expect these to be transient — the structural supply deficit ultimately dominates."
          },
          {
            short: "🇨🇳 China industrial data next week — key demand signal for silver's industrial component",
            detail: "China accounts for ~55% of global silver industrial demand. Friday's China Retail Sales and Industrial Output data is a direct read on silver's largest demand source. Strong output = significant silver demand signal. Weak data = near-term headwind. Second biggest event for silver after US CPI."
          }
        ],
        watch: "Range-bound $70–$90 until directional catalyst. Breakout above $90 = price discovery. Break below $70 = deeper correction."
      },
      {
        name: "NAS100", label: "Nasdaq 100", emoji: "💻", price: "~2-mo lows", change: "−1.59% last session",
        bias: "CAUTIOUS", biasColor: "#ef4444", borderColor: "#dc2626",
        keyLevel: "Watch 200-DMA as key support",
        drivers: [
          {
            short: "⚡ FEB CPI (Wed Mar 11) — softer inflation = rate cut hopes = Nasdaq relief rally",
            detail: "Nasdaq's valuation is rate-sensitive. High P/E multiples compress when rates stay elevated. A soft CPI print would immediately reprice rate cuts earlier, justifying higher multiples and sparking a relief rally. The index has been pricing in 'higher for longer' — any dovish data creates a violent mean-reversion opportunity."
          },
          {
            short: "🤖 Alphabet's $175–185B AI capex guidance spooked markets — competition concerns rising",
            detail: "Alphabet announced $175–185B in AI infrastructure capex for 2026 — raising fears that Big Tech is in a capex arms race with uncertain ROI. Combined with DeepSeek's emergence showing AI can be achieved at a fraction of the cost, markets are questioning whether current AI infrastructure spending will generate adequate returns."
          },
          {
            short: "📦 US tariffs on Canada/Mexico/China now IN EFFECT — supply chain cost pressures",
            detail: "25% tariffs on Canada and Mexico plus elevated China tariffs are now active. Tech hardware, semiconductors, and consumer electronics have significant exposure to these supply chains. Tariffs act as a margin tax — raising input costs without raising revenue. This is a direct EPS headwind for NAS100 components."
          },
          {
            short: "🏦 Fed on hold until Jul/Sep at earliest — 'higher for longer' is a valuation headwind",
            detail: "The 10Y Treasury yield staying elevated compresses the present value of future tech earnings. Growth stocks are long-duration assets — most sensitive to discount rate changes. Until the market has a credible Fed cut on the near horizon (July), NAS100 faces a structural ceiling from rate pressure."
          },
          {
            short: "💸 Strong USD (until recently) pressuring multinational tech earnings",
            detail: "~60% of S&P 500 and NAS100 revenue comes from overseas. A strong dollar translates foreign revenues into fewer dollars, directly hitting reported earnings. The DXY softening recently is a mild tailwind, but the trend needs to sustain to become a meaningful catalyst at Q1 reporting season."
          },
          {
            short: "🔄 Sector rotation into energy, industrials, materials away from mega-cap tech",
            detail: "Fund flows data shows rotation out of tech into commodity-linked sectors. Energy, industrials, and materials are outperforming as tariff/geopolitical risk reprices the economy. This rotation creates sustained selling in NAS100 even when individual names look cheap on fundamentals."
          },
          {
            short: "📉 DOGE federal job cuts filtering into government contractor revenue concerns",
            detail: "The DOGE federal workforce reduction is creating revenue uncertainty for tech companies with large government contracts (cloud, cybersecurity, defense tech). Companies with significant federal exposure are being re-rated lower — a sector-specific headwind within NAS100."
          }
        ],
        watch: "CPI is make-or-break. Hot CPI = sell tech hard. Cool CPI = potential snap-back. FOMC blackout period begins this week — no Fed speakers to soften moves."
      },
      {
        name: "BTCUSD", label: "Bitcoin", emoji: "₿", price: "$66,000–$67,000", change: "−46% from $122K ATH",
        bias: "OVERSOLD/WATCH", biasColor: "#f59e0b", borderColor: "#ea580c",
        keyLevel: "Support: $53K–$55K | Resistance: $70K→$80K",
        drivers: [
          {
            short: "⚡ BTC tracks NAS100 closely (78% 1-week correlation) — macro drives the trade",
            detail: "Bitcoin's correlation with NAS100 has tightened to ~78% on a 1-week rolling basis. This means macro events (CPI, NFP, Fed) are the primary drivers — not crypto-native news. Trade BTC like a high-beta tech asset right now. CPI softness → NAS100 rally → BTC follows within hours."
          },
          {
            short: "📉 ETF outflows shrinking fast: $3.48B (Nov) → $206M (Feb) = 94% reduction = floor forming",
            detail: "Bitcoin spot ETF outflows have collapsed from $3.48B in November 2025 to just $206M in February 2026 — a 94% reduction. This is a powerful floor signal. The marginal seller is nearly exhausted. When ETF flows stabilize or turn positive, Bitcoin historically makes aggressive recovery moves."
          },
          {
            short: "🏦 Fed rate cuts (Jul/Sep expected) = liquidity tailwind when confirmed",
            detail: "Bitcoin is highly sensitive to global liquidity conditions. Rate cuts expand the monetary base, reduce opportunity cost of holding non-yielding assets, and historically precede major BTC bull runs. The Jul/Sep cut timeline gives Bitcoin a 4–6 month window to base-build before the liquidity catalyst arrives."
          },
          {
            short: "📊 Negative demand regime but stabilizing — corrective phase, not cycle top per analysts",
            detail: "On-chain data shows Bitcoin in a negative demand regime — more long-term holders distributing than accumulating. However, the rate of distribution is slowing. Analysts classify this as a mid-cycle correction (typical -40 to -50% drawdown) rather than a cycle top which historically sees -70%+ drawdowns."
          },
          {
            short: "🏛️ US Strategic Bitcoin Reserve established — structural credibility signal",
            detail: "The US government establishing a Strategic Bitcoin Reserve is a landmark credibility event. It signals sovereign-level recognition of Bitcoin as a reserve asset. While near-term price impact is limited, it removes existential regulatory risk and attracts institutional allocators previously on the sidelines."
          },
          {
            short: "⚠️ Still outside 'market leadership group' per Ecoinometrics — reactive, not leading",
            detail: "Ecoinometrics' market leadership framework shows BTC is currently reactive rather than leading — it responds to macro moves but isn't generating independent directional momentum. Won't outperform unless risk-on sentiment is broad-based. Watch for BTC re-entering leadership mode as a key bull signal."
          },
          {
            short: "🔄 Capital rotating defensively — risk-off environment suppresses BTC short-term",
            detail: "Institutional capital has rotated toward gold, Treasuries, and defensive equities since January. Bitcoin is still perceived as a risk asset by most institutional allocators. Until risk appetite returns — triggered by soft CPI, dovish Fed signals, and improved earnings visibility — BTC stays suppressed."
          }
        ],
        watch: "CPI softness + NFP miss combo = risk-on = potential BTC bounce toward $70K. Hold above $60K critical. A close below $55K would extend correction toward $50K."
      },
      {
        name: "WTI", label: "Crude Oil (WTI)", emoji: "🛢️", price: "$63–$65", change: "Volatile — Iran premium",
        bias: "RANGE/GEO", biasColor: "#8b5cf6", borderColor: "#7c3aed",
        keyLevel: "Support: $60 | Resistance: $67–$70 | Iran spike: +$15–20",
        drivers: [
          {
            short: "🇮🇷 US-Iran nuclear talks — BREAKDOWN = $15–20/bbl spike. DEAL = sharp selloff",
            detail: "Iran produces ~3.2M bpd. A breakdown in nuclear talks risks snapback sanctions cutting Iranian exports by 1–1.5M bpd overnight — a $15–20/bbl supply shock. A successful deal means Iranian barrels return to market, pushing WTI toward $55–58. Watch diplomatic headlines — can hit any hour."
          },
          {
            short: "📦 Tariffs slowing global trade = demand headwind (IMF 3.1% global growth)",
            detail: "The IMF revised 2026 global growth to 3.1% — with tariff disruption cited as the primary downgrade driver. Oil demand is highly correlated with trade volumes and industrial activity. Slower global growth = less shipping, less manufacturing, less fuel burn — a structural demand headwind offsetting OPEC cuts."
          },
          {
            short: "🛢️ OPEC+ halted production unwinding in Q1 2026 — supply floor support",
            detail: "OPEC+ reversed its planned production increase for Q1 2026 in response to demand weakness. This supply discipline has prevented WTI from collapsing below $60. However, internal pressure from members (UAE, Iraq) wanting higher output remains. Any cracks in OPEC+ cohesion would be bearish for crude."
          },
          {
            short: "📈 IEA sees 3.84M bpd oversupply in 2026 — structural bearish pressure",
            detail: "The IEA's 2026 oil market balance shows a 3.84M bpd surplus driven by US shale resilience, Brazil deepwater growth, and Guyana's expanding output. This is the structural bearish ceiling on oil. Even with OPEC+ cuts, the market is well-supplied. Geopolitical risk is the only meaningful upside catalyst."
          },
          {
            short: "🇺🇸 US shale plateaued at 13.2–13.5M bpd — no major supply additions",
            detail: "US shale production has plateaued in the 13.2–13.5M bpd range due to Permian Basin inventory depletion and capital discipline from publicly listed E&P companies. This means US shale won't meaningfully offset a geopolitical supply disruption — supporting the upside case if Iran talks collapse."
          },
          {
            short: "💵 Oil spike = inflation up = Fed cuts delayed = bearish for NAS100 & BTC",
            detail: "An oil price spike has second-order effects across all your markets. Higher oil → CPI stays elevated → Fed can't cut in July → NAS100 multiples compress → BTC stays suppressed. An Iran escalation isn't just an oil trade — it's a portfolio-wide risk-off event affecting all five markets simultaneously."
          },
          {
            short: "📋 EIA weekly inventory data (Wed) — short-term price mover",
            detail: "The EIA weekly petroleum report (Wednesday ~10:30 AM ET) shows US crude, gasoline, and distillate inventories. Consensus expects a modest build of ~1.5M barrels. A surprise draw of 3M+ barrels = bullish $1–2 intraday move. Creates tactical entry/exit opportunities around Wednesday's CPI volatility."
          }
        ],
        watch: "Binary Iran trade. No deal news = range $60–$70. Escalation = spike toward $80+. De-escalation/deal = drop toward $55–$58."
      }
    ],
    calendarEvents: [
      {
        day: "MON Mar 9", event: "China CPI & Trade Data", impact: "HIGH",
        note: "Key demand signal for commodities — affects silver & oil",
        detail: "China CPI expected at +0.5% YoY. Trade surplus data reveals export health. A strong surplus signals industrial activity — bullish for silver demand and oil consumption. Weak trade data deepens the demand concern narrative that has been pressuring commodity prices since Q4 2025. Biggest impact on XAGUSD and WTI."
      },
      {
        day: "TUE Mar 10", event: "Japan GDP Final", impact: "MED",
        note: "BoJ policy backdrop; affects USD/JPY & risk appetite",
        detail: "Japan's final Q4 2025 GDP reading. A strong print keeps BoJ rate hike expectations alive — which strengthens the yen, pressures USD/JPY lower, and indirectly weakens the DXY. A weaker dollar is broadly bullish for gold, silver, and crypto. Watch for BoJ commentary alongside the data for forward guidance signals."
      },
      {
        day: "WED Mar 11", event: "🚨 US FEB CPI 8:30 AM ET", impact: "CRITICAL",
        note: "Jan was +2.4% YoY. Beat = risk-off. Miss = risk-on rally",
        detail: "THE week's macro event. Jan CPI: +2.4% YoY / +0.2% MoM. Feb consensus: +2.3%. Core CPI consensus: +3.1%. A print ≤2.2% = aggressive risk-on: gold rallies, NAS100 surges, BTC bounces. A print ≥2.6% = hawkish shock: NAS100 sells off hard, gold dips then recovers on stagflation narrative."
      },
      {
        day: "WED Mar 11", event: "EIA Crude Oil Inventories", impact: "MED",
        note: "Short-term oil price mover",
        detail: "Weekly US crude, gasoline, and distillate stockpile data at 10:30 AM ET. Consensus expects a modest build of ~1.5M barrels. A surprise draw of 3M+ barrels = bullish $1–2 intraday move. A large build of 4M+ barrels = bearish. Creates tactical entry/exit opportunities around Wednesday's CPI-driven volatility."
      },
      {
        day: "THU Mar 12", event: "US Initial Jobless Claims", impact: "HIGH",
        note: "After -92K NFP shock, labor trajectory is critical",
        detail: "After the -92K Feb NFP shock, jobless claims become a high-frequency check on whether labor market deterioration is accelerating. Consensus ~215K. A print above 250K confirms rapidly deteriorating conditions — extremely bullish for gold and rate cuts, bearish for NAS100. Below 200K suggests NFP was a one-off."
      },
      {
        day: "THU Mar 12", event: "Germany HICP Final", impact: "MED",
        note: "ECB policy signals; EUR strength affects USD & gold",
        detail: "Germany's final February inflation reading. If confirmed soft, ECB rate cut expectations accelerate — strengthening EUR vs USD, weakening the DXY. A weaker dollar is a tailwind for gold and commodities priced in USD. ECB meets April 17 — this data shapes that decision and the EUR/USD move."
      },
      {
        day: "FRI Mar 13", event: "China Retail Sales & Industrial Output", impact: "HIGH",
        note: "Crucial for oil & silver demand — China is the swing factor",
        detail: "China Retail Sales and Industrial Output for Feb 2026. Consensus: Retail Sales +4.8% YoY, Industrial Output +5.5% YoY. A strong beat confirms China's demand recovery — significantly bullish for silver (industrial use) and oil. A miss deepens commodity demand concerns heading into the following week."
      },
      {
        day: "ONGOING", event: "🇮🇷 US-Iran Nuclear Talks", impact: "TAIL RISK",
        note: "Breakdown = oil +$15-20, gold spike. Deal = oil dump",
        detail: "Talks are reportedly at a critical juncture. A breakdown triggers immediate oil supply risk premium (+$15–20/bbl), a gold safe-haven spike, and NAS100/BTC selloff on inflation fears. A deal sends oil to $55–58 but allows Fed to cut sooner — net positive for NAS100 and BTC medium-term."
      },
    ],
    macroThemes: [
      { icon: "💥", title: "NFP Shock Already in Play", text: "Feb payrolls came in at -92K (vs +59K expected) — worst in 4 months. Dec revised to -17K. Major dovish signal raising recession fears. Bad for NAS100 near-term, good for gold & rate-cut expectations." },
      { icon: "📊", title: "CPI is THE Event This Week", text: "Feb CPI releases Wednesday Mar 11 at 8:30 AM ET. January was +2.4% YoY. Markets need to see softening to price in Fed cuts. Hot print = sell NAS100, sell BTC, gold may dip on dollar strength before rebounding." },
      { icon: "🏦", title: "Fed Frozen Until July", text: "Fed funds at 3.50–3.75%. FOMC meets Mar 17-18 but markets price NO CUT. Blackout period begins this week — no Fed speakers. Markets pricing first cut in July, second in September." },
      { icon: "📦", title: "Tariffs Reshaping Everything", text: "Canada, Mexico & China tariffs now in effect. Adds inflation pressure, slows hiring, creates supply chain uncertainty. Bearish for NAS100 valuations, stagflation risk supports gold, pressures oil demand." },
      { icon: "🪖", title: "Middle East Geopolitical Premium", text: "US-Iran nuclear talks are the single biggest tail risk. A breakdown sends oil +$15-20/bbl, triggers gold spike, crushes NAS100 via inflation fears. Markets pricing modest premium but not full escalation." },
      { icon: "💵", title: "USD Weakness is a Macro Tailwind", text: "DXY trending down — a weaker dollar is structurally bullish for gold, silver, and crypto. After the NFP miss, dollar may weaken further unless CPI surprises hot." }
    ]
  }
  // ── PASTE NEW WEEK ABOVE THIS LINE ──
];

// ============================================================
//  DASHBOARD UI — DO NOT EDIT BELOW UNLESS CHANGING DESIGN
// ============================================================

const impactColor = (impact) => {
  if (impact === "CRITICAL") return "#dc2626";
  if (impact === "HIGH") return "#d97706";
  if (impact === "TAIL RISK") return "#7c3aed";
  return "#475569";
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export default function MacroDashboard() {
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(0);
  const [activeMarket, setActiveMarket] = useState(0);
  const [openItem, setOpenItem] = useState(null);
  const isMobile = useIsMobile();

  const week = weeks[selectedWeekIdx];
  const m = week.markets[activeMarket];

  const toggle = (key) => setOpenItem(prev => prev === key ? null : key);
  const handleWeekChange = (idx) => { setSelectedWeekIdx(idx); setActiveMarket(0); setOpenItem(null); };

  const px = isMobile ? "14px" : "24px";
  const sectionMb = isMobile ? 20 : 28;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0f172a", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Add viewport meta via style trick — the real meta tag should be in public/index.html */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: isMobile ? "16px 12px" : "24px" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: sectionMb }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: isMobile ? 22 : 28, lineHeight: 1.2 }}>📰</span>
            <div>
              <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 22, fontWeight: 700, color: "#f8fafc", lineHeight: 1.3 }}>
                Macro Briefing
              </h1>
              <div style={{ fontSize: isMobile ? 12 : 14, color: "#64748b", marginTop: 2 }}>
                Week of {week.label}, {week.year}
              </div>
            </div>
          </div>

          {/* Week selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, flexShrink: 0 }}>ARCHIVE:</span>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {weeks.map((w, i) => (
                <button key={w.id} onClick={() => handleWeekChange(i)} style={{
                  padding: "4px 10px", borderRadius: 5, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600,
                  background: selectedWeekIdx === i ? "#3b82f6" : "#1e293b",
                  color: selectedWeekIdx === i ? "#fff" : "#94a3b8",
                }}>
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ margin: 0, color: "#475569", fontSize: 11 }}>
            XAUUSD · XAGUSD · NAS100 · Bitcoin · Crude Oil
          </p>
        </div>

        {/* ── MACRO THEMES ── */}
        <div style={{ marginBottom: sectionMb }}>
          <SectionTitle>🌍 Key Macro Themes</SectionTitle>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 10
          }}>
            {week.macroThemes.map((t, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: "12px 14px", borderLeft: "3px solid #3b82f6" }}>
                <div style={{ fontWeight: 600, fontSize: isMobile ? 13 : 14, marginBottom: 5, color: "#f1f5f9" }}>{t.icon} {t.title}</div>
                <div style={{ fontSize: isMobile ? 12 : 13, color: "#94a3b8", lineHeight: 1.55 }}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ECONOMIC CALENDAR ── */}
        <div style={{ marginBottom: sectionMb }}>
          <SectionTitle hint="tap any event for detail">📅 Economic Calendar</SectionTitle>
          <div style={{ background: "#1e293b", borderRadius: 10, overflow: "hidden" }}>
            {week.calendarEvents.map((e, i) => {
              const key = `cal-${selectedWeekIdx}-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={i} style={{ borderBottom: i < week.calendarEvents.length - 1 ? "1px solid #334155" : "none" }}>
                  <div
                    onClick={() => toggle(key)}
                    style={{
                      padding: isMobile ? "10px 12px" : "11px 16px",
                      cursor: "pointer", userSelect: "none",
                      background: isOpen ? "#1e3352" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                      transition: "background 0.15s"
                    }}
                  >
                    {/* Mobile: stacked layout. Desktop: grid */}
                    {isMobile ? (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>{e.day}</span>
                            <span style={{
                              fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
                              background: impactColor(e.impact), color: "#fff", whiteSpace: "nowrap"
                            }}>{e.impact}</span>
                          </div>
                          <span style={{
                            fontSize: 13, color: "#64748b",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "block"
                          }}>▾</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: isOpen ? "#93c5fd" : "#f1f5f9", marginBottom: 2 }}>{e.event}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{e.note}</div>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "110px 72px 1fr 24px", gap: 12, alignItems: "center" }}>
                        <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{e.day}</div>
                        <div style={{
                          fontSize: 10, fontWeight: 700, textAlign: "center", padding: "2px 6px", borderRadius: 4,
                          background: impactColor(e.impact), color: "#fff", whiteSpace: "nowrap"
                        }}>{e.impact}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: isOpen ? "#93c5fd" : "#f1f5f9", marginBottom: 2 }}>{e.event}</div>
                          <div style={{ fontSize: 12, color: "#94a3b8" }}>{e.note}</div>
                        </div>
                        <div style={{ fontSize: 14, color: "#64748b", textAlign: "center", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</div>
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <div style={{ padding: isMobile ? "0 12px 12px 12px" : "0 16px 14px 16px", background: "#132035" }}>
                      <div style={{
                        fontSize: isMobile ? 12 : 13, color: "#cbd5e1", lineHeight: 1.7,
                        borderLeft: `3px solid ${impactColor(e.impact)}`,
                        paddingLeft: 12, paddingTop: 10
                      }}>
                        {e.detail}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MARKET ANALYSIS ── */}
        <div style={{ marginBottom: 16 }}>
          <SectionTitle>📈 Market-by-Market Analysis</SectionTitle>

          {/* Market selector — scrollable row on mobile */}
          <div style={{
            display: "flex", gap: 6, marginBottom: 14,
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
            paddingBottom: isMobile ? 4 : 0,
            flexWrap: isMobile ? "nowrap" : "wrap"
          }}>
            {week.markets.map((mk, i) => (
              <button key={i} onClick={() => { setActiveMarket(i); setOpenItem(null); }} style={{
                padding: isMobile ? "8px 12px" : "8px 16px",
                borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: isMobile ? 12 : 13, fontWeight: 600,
                flexShrink: 0,
                background: activeMarket === i ? "#3b82f6" : "#1e293b",
                color: activeMarket === i ? "#fff" : "#94a3b8",
                transition: "all 0.15s",
                whiteSpace: "nowrap"
              }}>
                {mk.emoji} {isMobile ? mk.name : `${mk.name}`}
              </button>
            ))}
          </div>

          {/* Market card */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: isMobile ? "14px" : "20px 24px", border: `1px solid ${m.borderColor}` }}>

            {/* Market header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 8 }}>
              <div>
                <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: "#f8fafc", marginBottom: 3 }}>
                  {m.emoji} {m.label} <span style={{ color: "#64748b", fontSize: isMobile ? 13 : 15 }}>({m.name})</span>
                </div>
                <div style={{ fontSize: isMobile ? 12 : 14, color: "#94a3b8" }}>
                  <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{m.price}</span>
                  <span style={{ color: "#475569" }}> · </span>
                  {m.change}
                </div>
              </div>
              <div style={{
                padding: isMobile ? "4px 10px" : "6px 16px",
                borderRadius: 20, fontWeight: 700,
                fontSize: isMobile ? 11 : 13,
                background: m.biasColor + "22", color: m.biasColor,
                border: `1px solid ${m.biasColor}44`,
                whiteSpace: "nowrap", flexShrink: 0
              }}>
                {m.bias}
              </div>
            </div>

            {/* Key levels */}
            <div style={{
              fontSize: isMobile ? 11 : 12, color: "#64748b", marginBottom: 12,
              background: "#0f172a", borderRadius: 6, padding: "6px 10px", lineHeight: 1.5
            }}>
              🎯 {m.keyLevel}
            </div>

            {/* Drivers */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Drivers This Week
                <span style={{ fontWeight: 400, fontSize: 10, textTransform: "none", marginLeft: 6, color: "#475569" }}>— tap for detail</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {m.drivers.map((d, i) => {
                  const key = `driver-${selectedWeekIdx}-${activeMarket}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={i} style={{
                      borderRadius: 6, overflow: "hidden",
                      border: isOpen ? `1px solid ${m.borderColor}66` : "1px solid #1e293b",
                      transition: "border-color 0.15s"
                    }}>
                      <div
                        onClick={() => toggle(key)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          fontSize: isMobile ? 12 : 13,
                          color: isOpen ? "#f1f5f9" : "#cbd5e1",
                          padding: isMobile ? "9px 10px" : "9px 12px",
                          background: isOpen ? "#1e3352" : "#0f172a",
                          cursor: "pointer", userSelect: "none",
                          lineHeight: 1.45, gap: 8,
                          transition: "background 0.15s"
                        }}
                      >
                        <span style={{ flex: 1 }}>{d.short}</span>
                        <span style={{
                          fontSize: 13, color: isOpen ? m.biasColor : "#475569", flexShrink: 0,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s"
                        }}>▾</span>
                      </div>
                      {isOpen && (
                        <div style={{ padding: isMobile ? "0 10px 10px 10px" : "0 12px 12px 12px", background: "#132035" }}>
                          <div style={{
                            fontSize: isMobile ? 12 : 13, color: "#94a3b8", lineHeight: 1.7,
                            borderLeft: `3px solid ${m.biasColor}`,
                            paddingLeft: 10, paddingTop: 10
                          }}>
                            {d.detail}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trading watch */}
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "11px 14px", borderLeft: `3px solid ${m.biasColor}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: m.biasColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Trading Watch</div>
              <div style={{ fontSize: isMobile ? 12 : 13, color: "#e2e8f0", lineHeight: 1.55 }}>{m.watch}</div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ fontSize: 10, color: "#334155", textAlign: "center", marginTop: 20, lineHeight: 1.6, paddingBottom: 8 }}>
          For informational purposes only. Not financial advice. Always verify prices with your broker before executing.
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children, hint }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span>{children}</span>
      {hint && <span style={{ fontSize: 10, color: "#475569", fontWeight: 400, textTransform: "none" }}>— {hint}</span>}
    </div>
  );
}