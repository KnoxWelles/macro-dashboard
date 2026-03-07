
import { useState } from "react";

const markets = [
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
        detail: "Silver demand for solar panels (photovoltaic cells) and EV charging infrastructure has created a multi-year supply deficit. The Silver Institute projects another 150–180M oz deficit in 2026. Mine supply growth is minimal. This structural bid makes corrections like the current -9.4% pullback represent buying opportunities."
      },
      {
        short: "🔗 High correlation with gold — follows gold's macro moves but with higher beta",
        detail: "Silver historically moves 1.5–2x the magnitude of gold on directional breaks. When gold rallied 40%+ in 2025, silver rallied 120%. In corrections, silver also falls harder. This beta relationship means traders often use silver as a leveraged gold trade — but it requires tighter stops and patience through volatility."
      },
      {
        short: "📊 Consolidation after 120% surge in 2025 — healthy base-building above $70 support",
        detail: "After a parabolic 120% run to $90.50 in 2025, a -9.4% consolidation is technically healthy. The $70 zone represents the prior breakout level and a natural accumulation zone. Time-based consolidation at these levels typically precedes the next leg higher. No technical damage until a weekly close below $68."
      },
      {
        short: "⚠️ Weak NFP & tariff uncertainty dampening industrial metal sentiment short-term",
        detail: "Tariffs on Canadian and Mexican goods affect industrial supply chains that rely on silver inputs. A weaker jobs market also signals softer manufacturing activity. These are the short-term headwinds keeping silver below $90. Expect these to be transient — the structural supply deficit ultimately dominates."
      },
      {
        short: "🇨🇳 China industrial data next week — key demand signal for silver's industrial component",
        detail: "China accounts for ~55% of global silver industrial demand. Friday's China Retail Sales and Industrial Output data is a direct read on silver's largest demand source. Strong China industrial output = significant silver demand signal. Weak data = near-term headwind. Second biggest event for silver after US CPI."
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
        detail: "The 10Y Treasury yield staying elevated compresses the present value of future tech earnings. Growth stocks are long-duration assets — they're most sensitive to discount rate changes. Until the market has a credible Fed cut on the near horizon (July), NAS100 faces a structural ceiling from rate pressure."
      },
      {
        short: "💸 Strong USD (until recently) pressuring multinational tech earnings",
        detail: "~60% of S&P 500 and NAS100 revenue comes from overseas. A strong dollar translates foreign revenues into fewer dollars, directly hitting reported earnings. The DXY softening recently is a mild tailwind, but the trend needs to sustain to become a meaningful earnings catalyst at Q1 reporting season."
      },
      {
        short: "🔄 Sector rotation into energy, industrials, materials away from mega-cap tech",
        detail: "Fund flows data shows rotation out of tech into commodity-linked sectors. Energy, industrials, and materials are outperforming as tariff/geopolitical risk reprices the economy. This rotation is not panic — it's portfolio repositioning. It creates sustained selling in NAS100 even when individual names look cheap."
      },
      {
        short: "📉 DOGE federal job cuts filtering into government contractor revenue concerns",
        detail: "The DOGE federal workforce reduction is creating revenue uncertainty for tech companies with large government contracts (cloud, cybersecurity, defense tech). Companies like Palantir, Booz Allen, and others with significant federal exposure are being re-rated lower — a sector-specific headwind within NAS100."
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
        detail: "Bitcoin's correlation with NAS100 has tightened to ~78% on a 1-week rolling basis. This means macro events (CPI, NFP, Fed) are the primary drivers — not crypto-native news. Trade BTC like a high-beta tech asset right now. CPI softness → NAS100 rally → BTC follows within hours. Correlation breaks only on major crypto-specific catalysts."
      },
      {
        short: "📉 ETF outflows shrinking fast: $3.48B (Nov) → $206M (Feb) = 94% reduction = floor forming",
        detail: "Bitcoin spot ETF outflows have collapsed from $3.48B in November 2025 to just $206M in February 2026 — a 94% reduction. This is a powerful floor signal. The marginal seller is nearly exhausted. When ETF flows stabilize or turn positive, Bitcoin historically makes aggressive recovery moves. Watch weekly ETF flow data."
      },
      {
        short: "🏦 Fed rate cuts (Jul/Sep expected) = liquidity tailwind when confirmed",
        detail: "Bitcoin is highly sensitive to global liquidity conditions. Rate cuts expand the monetary base, reduce opportunity cost of holding non-yielding assets, and historically precede major BTC bull runs. The Jul/Sep cut timeline gives Bitcoin a 4–6 month window to base-build before the liquidity catalyst arrives."
      },
      {
        short: "📊 Negative demand regime but stabilizing — corrective phase, not cycle top per analysts",
        detail: "On-chain data shows Bitcoin in a negative demand regime — more long-term holders distributing than accumulating. However, the rate of distribution is slowing. Analysts at Ecoinometrics and Glassnode classify this as a mid-cycle correction (typical -40 to -50% drawdown) rather than a cycle top (-70%+ drawdowns)."
      },
      {
        short: "🏛️ US Strategic Bitcoin Reserve established — structural credibility signal",
        detail: "The US government establishing a Strategic Bitcoin Reserve is a landmark credibility event. It signals sovereign-level recognition of Bitcoin as a reserve asset. While near-term price impact is limited (no active buying announced), it removes existential regulatory risk and attracts institutional allocators previously on the sidelines."
      },
      {
        short: "⚠️ Still outside 'market leadership group' per Ecoinometrics — reactive, not leading",
        detail: "Ecoinometrics' market leadership framework shows BTC is currently in a reactive rather than leading position — it responds to macro moves but isn't generating independent directional momentum. Won't outperform unless risk-on sentiment is broad-based. Watch for BTC to re-enter leadership mode as a key bull signal."
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
    bias: "RANGE/GEOPOLITICAL", biasColor: "#8b5cf6", borderColor: "#7c3aed",
    keyLevel: "Support: $60 | Resistance: $67–$70 | Iran spike risk: +$15–20",
    drivers: [
      {
        short: "🇮🇷 US-Iran nuclear talks — BREAKDOWN = $15–20/bbl spike. DEAL = sharp selloff",
        detail: "Iran produces ~3.2M bpd. A breakdown in nuclear talks risks snapback sanctions cutting Iranian exports by 1–1.5M bpd overnight — a $15–20/bbl supply shock. A successful deal means Iranian barrels return to market, pushing WTI toward $55–58. No timeline — watch diplomatic headlines as primary catalyst, these can hit any hour."
      },
      {
        short: "📦 Tariffs slowing global trade = demand headwind (IMF 3.1% global growth)",
        detail: "The IMF revised 2026 global growth to 3.1% — with tariff disruption cited as the primary downgrade driver. Oil demand is highly correlated with trade volumes and industrial activity. Slower global growth = less shipping, less manufacturing, less fuel burn. This is a structural demand headwind that offsets OPEC supply cuts."
      },
      {
        short: "🛢️ OPEC+ halted production unwinding in Q1 2026 — supply floor support",
        detail: "OPEC+ reversed its planned production increase for Q1 2026 in response to demand weakness. This supply discipline has prevented WTI from collapsing below $60. However, the group faces internal pressure from members (UAE, Iraq) who want higher output. Any cracks in OPEC+ cohesion would be bearish for crude."
      },
      {
        short: "📈 IEA sees 3.84M bpd oversupply in 2026 — structural bearish pressure",
        detail: "The IEA's 2026 oil market balance shows a 3.84M bpd surplus — driven by US shale resilience, Brazil deepwater growth, and Guyana's expanding output. This is the structural bearish ceiling on oil. Even with OPEC+ cuts, the market is well-supplied. Geopolitical risk is the only meaningful upside catalyst."
      },
      {
        short: "🇺🇸 US shale plateaued at 13.2–13.5M bpd — no major supply additions",
        detail: "US shale production has plateaued in the 13.2–13.5M bpd range due to core Permian Basin inventory depletion and capital discipline from publicly listed E&P companies. This plateau means US shale won't meaningfully offset a geopolitical supply disruption — supporting the upside case if Iran talks collapse."
      },
      {
        short: "💵 Oil spike = inflation up = Fed cuts delayed = bearish for NAS100 & BTC",
        detail: "An oil price spike has second-order effects across all your markets. Higher oil → CPI stays elevated → Fed can't cut in July → NAS100 multiples compress → BTC stays suppressed. This cross-market transmission means an Iran escalation isn't just an oil trade — it's a portfolio-wide risk-off event."
      },
      {
        short: "📋 EIA weekly inventory data (Wed) — short-term price mover",
        detail: "The EIA weekly petroleum report (Wednesday ~10:30 AM ET) shows US crude, gasoline, and distillate inventories. A build of 3M+ barrels is bearish; a draw of 3M+ barrels is bullish. This data rarely changes the structural trend but creates intraday volatility of $1–2/bbl around Wednesday's CPI release."
      }
    ],
    watch: "Binary Iran trade. No deal news = range $60–$70. Escalation = spike toward $80+. De-escalation/deal = drop toward $55–$58."
  }
];

const calendarEvents = [
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
    note: "Jan was +2.4% YoY. Beat = risk-off, gold down, NAS sell. Miss = risk-on rally",
    detail: "THE week's macro event. Jan CPI: +2.4% YoY / +0.2% MoM. Feb consensus: +2.3%. Core CPI consensus: +3.1%. A print ≤2.2% = aggressive risk-on: gold rallies, NAS100 surges, BTC bounces. A print ≥2.6% = hawkish shock: NAS100 sells off hard, gold dips initially then recovers on stagflation narrative. Sets the tone for the Mar 17–18 FOMC meeting."
  },
  {
    day: "WED Mar 11", event: "EIA Crude Oil Inventories", impact: "MED",
    note: "Short-term oil price mover",
    detail: "Weekly US crude, gasoline, and distillate stockpile data released at 10:30 AM ET. Consensus expects a modest build of ~1.5M barrels. A surprise draw of 3M+ barrels = bullish $1–2 intraday move. A large build of 4M+ barrels = bearish. Creates tactical entry/exit opportunities around Wednesday's CPI-driven volatility."
  },
  {
    day: "THU Mar 12", event: "US Initial Jobless Claims", impact: "HIGH",
    note: "After shocking -92K NFP, labor market trajectory is critical",
    detail: "After the -92K Feb NFP shock, jobless claims become a high-frequency check on whether labor market deterioration is accelerating. Consensus ~215K. A print above 250K would confirm rapidly deteriorating conditions — extremely bullish for gold and rate cuts, bearish for NAS100 near-term. Below 200K would suggest NFP was a one-off anomaly."
  },
  {
    day: "THU Mar 12", event: "Germany HICP Final", impact: "MED",
    note: "ECB policy signals; EUR strength affects USD & gold",
    detail: "Germany's final February inflation reading. If confirmed soft, ECB rate cut expectations accelerate — strengthening EUR vs USD, which weakens the DXY. A weaker dollar is a tailwind for gold and commodities priced in USD. The ECB meets April 17 — this data shapes that decision and the EUR/USD move, which inversely correlates with gold's dollar price."
  },
  {
    day: "FRI Mar 13", event: "China Retail Sales & Industrial Output", impact: "HIGH",
    note: "Crucial for oil & silver demand — China is the swing factor",
    detail: "China Retail Sales (consumer demand proxy) and Industrial Output (manufacturing activity) for Feb 2026. Consensus: Retail Sales +4.8% YoY, Industrial Output +5.5% YoY. A strong beat confirms China's demand recovery — significantly bullish for silver (industrial use) and oil. A miss deepens commodity demand concerns."
  },
  {
    day: "ONGOING", event: "🇮🇷 US-Iran Nuclear Talks", impact: "TAIL RISK",
    note: "Breakdown = oil +$15-20, gold spike. Deal = oil dump",
    detail: "Talks are reportedly at a critical juncture. A breakdown triggers immediate oil supply risk premium (+$15–20/bbl), a gold safe-haven spike, and NAS100/BTC selloff on inflation fears. A deal sends oil to $55–58 but allows Fed to cut sooner — net positive for NAS100 and BTC medium-term. No timeline — watch headlines 24/7."
  },
];

const macroThemes = [
  { icon: "💥", title: "NFP Shock Already in Play", text: "Feb payrolls came in at -92K (vs +59K expected) — worst in 4 months. Dec revised to -17K. This is a major dovish signal and raises recession fears. Bad for NAS100 near-term, good for gold & rate-cut expectations." },
  { icon: "📊", title: "CPI is THE Event This Week", text: "Feb CPI releases Wednesday Mar 11 at 8:30 AM ET. January was +2.4% YoY. Markets need to see softening to price in Fed cuts. Hot print = sell NAS100, sell BTC, gold may paradoxically dip on dollar strength before rebounding." },
  { icon: "🏦", title: "Fed Frozen Until July", text: "Fed funds at 3.50–3.75%. FOMC meets Mar 17-18 (next week) but markets price NO CUT. Blackout period begins this week — no Fed speakers. Markets pricing first cut in July, second in September. Tariff inflation keeping them sidelined." },
  { icon: "📦", title: "Tariffs Reshaping Everything", text: "Canada, Mexico & China tariffs now in effect. This adds inflation pressure (tariff-driven CPI), slows hiring, and creates supply chain uncertainty. Bearish for NAS100 valuations, stagflation risk supports gold, and pressures oil demand." },
  { icon: "🪖", title: "Middle East Geopolitical Premium", text: "US-Iran nuclear talks are the single biggest tail risk. A breakdown sends oil +$15-20/bbl, triggers gold spike, crushes NAS100 via inflation fears. Markets are pricing modest geopolitical premium but not a full escalation." },
  { icon: "💵", title: "USD Weakness is a Macro Tailwind", text: "DXY has been trending down — a weaker dollar is structurally bullish for gold, silver, and crypto. After the NFP miss, dollar may weaken further unless CPI surprises hot." }
];

export default function MacroBriefing() {
  const [activeMarket, setActiveMarket] = useState(0);
  const [openItem, setOpenItem] = useState(null);

  const m = markets[activeMarket];

  const toggle = (key) => setOpenItem(prev => prev === key ? null : key);

  const impactColor = (impact) => {
    if (impact === "CRITICAL") return "#dc2626";
    if (impact === "HIGH") return "#d97706";
    if (impact === "TAIL RISK") return "#7c3aed";
    return "#475569";
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0f172a", minHeight: "100vh", padding: "24px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>📰</span>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#f8fafc" }}>Macro Briefing — Week of Mar 9–13, 2026</h1>
          </div>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Saturday prep report · XAUUSD · XAGUSD · NAS100 · Bitcoin · Crude Oil</p>
        </div>

        {/* Macro Themes */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>🌍 KEY MACRO THEMES</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {macroThemes.map((t, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: "14px 16px", borderLeft: "3px solid #3b82f6" }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: "#f1f5f9" }}>{t.icon} {t.title}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Calendar */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            📅 ECONOMIC CALENDAR — NEXT WEEK
            <span style={{ color: "#475569", fontWeight: 400, fontSize: 11, textTransform: "none", marginLeft: 8 }}>— click any event for detail</span>
          </h2>
          <div style={{ background: "#1e293b", borderRadius: 10, overflow: "hidden" }}>
            {calendarEvents.map((e, i) => {
              const key = `cal-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={i} style={{ borderBottom: i < calendarEvents.length - 1 ? "1px solid #334155" : "none" }}>
                  <div
                    onClick={() => toggle(key)}
                    style={{
                      display: "grid", gridTemplateColumns: "110px 72px 1fr 24px",
                      gap: 12, padding: "11px 16px", alignItems: "center",
                      cursor: "pointer", userSelect: "none",
                      background: isOpen ? "#1e3352" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                      transition: "background 0.15s"
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{e.day}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, textAlign: "center", padding: "2px 6px", borderRadius: 4,
                      background: impactColor(e.impact), color: "#fff", whiteSpace: "nowrap"
                    }}>{e.impact}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: isOpen ? "#93c5fd" : "#f1f5f9", marginBottom: 2 }}>{e.event}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>{e.note}</div>
                    </div>
                    <div style={{
                      fontSize: 14, color: "#64748b", textAlign: "center",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s",
                      lineHeight: 1
                    }}>▾</div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 16px 14px 16px", background: "#132035" }}>
                      <div style={{
                        fontSize: 13, color: "#cbd5e1", lineHeight: 1.7,
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

        {/* Market Tabs */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>📈 MARKET-BY-MARKET ANALYSIS</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {markets.map((mk, i) => (
              <button
                key={i}
                onClick={() => { setActiveMarket(i); setOpenItem(null); }}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                  background: activeMarket === i ? "#3b82f6" : "#1e293b",
                  color: activeMarket === i ? "#fff" : "#94a3b8",
                  transition: "all 0.15s"
                }}
              >
                {mk.emoji} {mk.name}
              </button>
            ))}
          </div>

          {/* Market Detail Card */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: "20px 24px", border: `1px solid ${m.borderColor}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc", marginBottom: 4 }}>{m.emoji} {m.label} ({m.name})</div>
                <div style={{ fontSize: 14, color: "#94a3b8" }}>Current: <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{m.price}</span> · {m.change}</div>
              </div>
              <div style={{
                padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13,
                background: m.biasColor + "22", color: m.biasColor, border: `1px solid ${m.biasColor}44`
              }}>
                {m.bias}
              </div>
            </div>

            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12, background: "#0f172a", borderRadius: 6, padding: "6px 10px" }}>
              🎯 KEY LEVELS: {m.keyLevel}
            </div>

            {/* Drivers with accordion */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                DRIVERS THIS WEEK
                <span style={{ color: "#475569", fontWeight: 400, fontSize: 11, textTransform: "none", marginLeft: 6 }}>— click any driver for detail</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {m.drivers.map((d, i) => {
                  const key = `driver-${activeMarket}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div
                      key={i}
                      style={{
                        borderRadius: 6, overflow: "hidden",
                        border: isOpen ? `1px solid ${m.borderColor}66` : "1px solid #1e293b",
                        transition: "border-color 0.15s"
                      }}
                    >
                      <div
                        onClick={() => toggle(key)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          fontSize: 13, color: isOpen ? "#f1f5f9" : "#cbd5e1",
                          padding: "9px 12px",
                          background: isOpen ? "#1e3352" : "#0f172a",
                          cursor: "pointer", userSelect: "none",
                          lineHeight: 1.4, gap: 10,
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
                        <div style={{ padding: "0 12px 12px 12px", background: "#132035" }}>
                          <div style={{
                            fontSize: 13, color: "#94a3b8", lineHeight: 1.7,
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

            <div style={{ background: "#0f172a", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${m.biasColor}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: m.biasColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>TRADING WATCH</div>
              <div style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.5 }}>{m.watch}</div>
            </div>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div style={{ fontSize: 11, color: "#475569", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
          Macro briefing for informational purposes only. Not financial advice. Always verify prices with your broker before executing. Markets move rapidly.
        </div>
      </div>
    </div>
  );
}