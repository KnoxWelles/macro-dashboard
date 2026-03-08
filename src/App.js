import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`;

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f0f2f5; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes barFill {
    from { width: 0%; }
    to   { width: var(--w); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }

  .fade-up   { animation: fadeUp 0.35s ease both; }
  .fade-up-1 { animation: fadeUp 0.35s 0.06s ease both; }
  .fade-up-2 { animation: fadeUp 0.35s 0.12s ease both; }
  .fade-up-3 { animation: fadeUp 0.35s 0.18s ease both; }

  .ticker-inner { animation: ticker 35s linear infinite; }
  .bar-fill { animation: barFill 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .red-blink { animation: blink 1.2s ease infinite; }

  .cal-row { transition: background 0.12s; cursor: pointer; user-select: none; }
  .cal-row:hover { background: #f8f9fb !important; }
  .driver-row { transition: background 0.12s; cursor: pointer; user-select: none; }
  .driver-row:hover { background: #f8f9fb !important; }
  .mkt-btn { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; }
  .mkt-btn:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.1); transform: translateY(-1px); }

  .accordion-body {
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
  }
  .accordion-body.open   { max-height: 400px; opacity: 1; }
  .accordion-body.closed { max-height: 0; opacity: 0; }

  .chevron { display: inline-block; transition: transform 0.2s ease; }
  .chevron.open { transform: rotate(180deg); }

  ::-webkit-scrollbar       { width: 4px; }
  ::-webkit-scrollbar-track { background: #f0f2f5; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  @media (max-width: 640px) {
    .page-pad { padding: 0 14px 40px !important; }
    .header-inner { padding: 0 14px !important; flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; height: auto !important; padding-top: 14px !important; padding-bottom: 14px !important; }
    .alert-box { padding: 10px 14px !important; }
    .themes-grid { grid-template-columns: 1fr !important; }
    .mkt-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 6px !important; }
    .mkt-grid-bottom { grid-template-columns: repeat(2, 1fr) !important; }
    .market-header { flex-direction: column !important; gap: 12px !important; }
    .levels-grid { grid-template-columns: 1fr !important; }
    .cal-grid { grid-template-columns: 60px 80px 1fr 18px !important; gap: 8px !important; }
    .cal-detail-pad { padding-left: 14px !important; }
    .cal-header-row { display: none !important; }
    .forecast-col { display: none !important; }
    .prev-col { font-size: 11px !important; }
    .ticker-bar { height: 30px !important; }
    .ticker-label { font-size: 10px !important; padding: 0 10px !important; }
  }

  @media (max-width: 400px) {
    .mkt-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

/* ── SVG ICONS ─────────────────────────────────────────────────────── */

const GoldIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0 }}>
    <path d="M0 0h56v56H0V0z" fill="#D69A00"/>
    <path d="M21.248 21.555h13.784l-2.01-5.393a1.17 1.17 0 00-.41-.553l-11.364 5.946zm-.038-6.401C21.698 13.842 22.772 13 23.956 13h8.151c1.184 0 2.258.842 2.747 2.154l2.009 5.393c.603 1.618-.371 3.453-1.831 3.453h-14c-1.46 0-2.433-1.835-1.831-3.453l2.01-5.393h-.001zM10.235 35.555h13.757l-2.01-5.393a1.171 1.171 0 00-.41-.553l-11.337 5.946zm-.039-6.401C10.685 27.842 11.76 27 12.943 27h8.124c1.184 0 2.259.842 2.747 2.154l2.009 5.393c.603 1.618-.37 3.453-1.831 3.453H10.017c-1.46 0-2.433-1.835-1.83-3.453l2.01-5.393zm35.89 6.401h-13.85l11.43-5.945c.179.126.323.316.413.553l2.008 5.392zM34.945 27c-1.184 0-2.259.842-2.747 2.154l-2.009 5.393c-.603 1.618.37 3.453 1.831 3.453h14.067c1.46 0 2.433-1.835 1.83-3.453l-2.01-5.393C45.422 27.842 44.348 27 43.164 27h-8.22z" fill="#fff"/>
  </svg>
);

const SilverIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0 }}>
    <path d="M0 0h56v56H0V0z" fill="#ADABB8"/>
    <path d="M21.247 21.555h13.785l-2.01-5.393a1.171 1.171 0 00-.41-.553l-11.365 5.946zm-.038-6.401C21.698 13.842 22.772 13 23.956 13h8.15c1.185 0 2.26.842 2.748 2.154l2.009 5.393c.602 1.618-.371 3.453-1.831 3.453h-14c-1.46 0-2.434-1.835-1.832-3.453l2.01-5.393zM10.234 35.555h13.757l-2.008-5.393a1.17 1.17 0 00-.412-.553l-11.337 5.946zm-.038-6.401C10.685 27.842 11.76 27 12.943 27h8.124c1.184 0 2.258.842 2.747 2.154l2.009 5.393C26.426 36.165 25.452 38 23.99 38H10.017c-1.46 0-2.433-1.835-1.83-3.453l2.01-5.393zm35.89 6.401h-13.85l11.43-5.945c.178.126.323.316.412.553l2.008 5.392zM34.943 27c-1.184 0-2.258.842-2.746 2.154l-2.01 5.393C29.586 36.165 30.559 38 32.02 38h14.066c1.46 0 2.434-1.835 1.831-3.453l-2.01-5.393C45.422 27.842 44.346 27 43.163 27h-8.22z" fill="#fff"/>
  </svg>
);

const OilIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0 }}>
    <path fill="url(#oil_grad)" d="M0 0h56v56H0z"/>
    <path d="M38.889 31.111c0 6.845-4.9 12.445-10.889 12.445-5.989 0-10.889-5.6-10.889-12.445C17.111 24.267 28 9.333 28 9.333s10.889 14.934 10.889 21.778z" fill="#fff"/>
    <defs>
      <linearGradient id="oil_grad" x1="10.418" y1="9.712" x2="68.147" y2="76.017" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A1E21"/>
        <stop offset="1" stopColor="#06060A"/>
      </linearGradient>
    </defs>
  </svg>
);

const NasIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 8, flexShrink: 0 }}>
    <path fill="#0091BA" d="M0 0h56v56H0z"/>
    <path d="M13.06 36h3.3V20h-3.3L9 23.04v2.88l4-2.68h.06V36ZM26.02 36c3.97 0 6.38-3.08 6.38-8v-.02c0-4.91-2.4-7.98-6.38-7.98s-6.39 3.07-6.39 7.98v.03c0 4.91 2.41 7.99 6.39 7.99Zm0-2.6c-1.96 0-3.08-2-3.08-5.4v-.02c0-3.4 1.12-5.39 3.08-5.39 1.95 0 3.07 2 3.07 5.4V28c0 3.4-1.12 5.4-3.07 5.4ZM40.61 36C44.6 36 47 32.92 47 28v-.02c0-4.91-2.41-7.98-6.39-7.98-3.97 0-6.38 3.07-6.38 7.98v.03c0 4.91 2.4 7.99 6.38 7.99Zm0-2.6c-1.95 0-3.07-2-3.07-5.4v-.02c0-3.4 1.12-5.39 3.07-5.39 1.96 0 3.08 2 3.08 5.4V28c0 3.4-1.12 5.4-3.08 5.4Z" fill="#fff"/>
  </svg>
);

const BtcIcon = ({ size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: 8, background: "#F7931A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ color: "#fff", fontWeight: 800, fontSize: size * 0.45, fontFamily: "Arial, sans-serif" }}>₿</span>
  </div>
);

/* ── DATA ───────────────────────────────────────────────────────────── */

const markets = [
  {
    name: "XAUUSD", label: "Gold", Icon: GoldIcon,
    price: "$5,170.90", change: "−1.9%", changeUp: false,
    bias: "BULLISH", biasColor: "#16a34a", biasBg: "#f0fdf4", biasBorder: "#bbf7d0",
    accent: "#D69A00", accentRgb: "214,154,0",
    sentiment: 78,
    keyLevel: "Support $5,052  ·  Resistance $5,208–$5,266",
    watch: "Break above $5,208 with volume → target $5,266–$5,370. Hold below $5,052 → risk to $4,937.",
    drivers: [
      { short: "⚡ FEB CPI Wed Mar 11 — soft read = gold rallies hard", detail: "Gold inversely correlates with real yields. A soft Feb CPI print accelerates Fed cut pricing → real yields drop → gold surges. Jan CPI was +2.9% YoY; market needs ≤2.8% to feel dovish. A hot print (+3.1%+) could temporarily push gold back toward $5,052 before buyers return on the stagflation narrative." },
      { short: "🏦 Fed on hold 3.50–3.75%. 2 cuts priced Jul/Sep — dovish lean = tailwind", detail: "FOMC meets Mar 17–18 but a cut is fully off the table. Path of least resistance is July for cut #1. Every data point confirming economic softening shortens the wait — gold prices that in immediately. FOMC blackout week means no Fed speakers can push back on rate-cut expectations." },
      { short: "🪖 US-Iran breakdown risk → $15–20/bbl oil surge = safe-haven gold bid", detail: "A Middle East geopolitical flare-up is gold's strongest short-term tail-risk catalyst. Oil spiking $15–20/bbl raises inflation fears, delays Fed cuts, and triggers safe-haven flows simultaneously. Gold historically front-runs oil-driven inflation scares within hours of any headline risk." },
      { short: "🏛️ Central banks (China, Turkey) in structural reserve accumulation", detail: "Central bank gold buying has been the structural floor under gold since 2022. China's PBoC and Turkey's central bank are the largest buyers. This buying continues regardless of spot price, absorbing supply and providing a demand backstop during corrections." },
      { short: "📉 Real yields declining trend intact = structural gold support", detail: "Real yields (TIPS) have been trending down as nominal yields soften and inflation expectations stay elevated. Gold has near-perfect inverse correlation with 10Y real yields. As long as real yields stay below 1.5%, gold's structural bull case holds." },
      { short: "💥 Weak Feb NFP (−92K vs +59K exp.) deepens recession narrative → bullish", detail: "The −92K NFP print was the biggest negative shock in 4 months. It raises the probability of a hard landing — historically very bullish for gold. It also forces the Fed's hand: if labor continues to weaken, they may cut sooner than July despite sticky CPI numbers." },
    ],
  },
  {
    name: "XAGUSD", label: "Silver", Icon: SilverIcon,
    price: "$84.31", change: "−9.4%", changeUp: false,
    bias: "NEUTRAL → BULL", biasColor: "#d97706", biasBg: "#fffbeb", biasBorder: "#fde68a",
    accent: "#ADABB8", accentRgb: "173,171,184",
    sentiment: 55,
    keyLevel: "Support $70 zone  ·  Resistance $90",
    watch: "Range-bound $70–$90 until directional catalyst. Breakout above $90 = price discovery. Break below $70 = deeper correction.",
    drivers: [
      { short: "⚡ FEB CPI — dual sensitivity: monetary policy + industrial demand proxy", detail: "Silver responds to CPI from two angles. Like gold, soft CPI = dovish Fed = silver rallies. But silver also has 50%+ industrial usage — lower inflation expectations signal healthier real activity. A Goldilocks CPI is the ideal scenario for silver." },
      { short: "🏭 5th consecutive year of structural supply deficit. EV/solar demand surging", detail: "Silver demand for solar photovoltaic cells and EV charging infrastructure has created a multi-year supply deficit. The Silver Institute projects another 150–180M oz deficit in 2026. This structural bid makes the current pullback a potential buying opportunity." },
      { short: "🔗 High gold correlation with higher beta — leveraged macro trade", detail: "Silver historically moves 1.5–2× the magnitude of gold on directional breaks. When gold rallied 40%+ in 2025, silver rallied 120%. In corrections silver also falls harder. Requires tighter stops and patience through volatility compared to outright gold positions." },
      { short: "📊 Consolidating after 120% surge in 2025 — base-building above $70", detail: "After a parabolic 120% run to $90.50 in 2025, the current consolidation is technically healthy. The $70 zone represents the prior breakout level and a natural accumulation zone. No technical damage until weekly close below $68." },
      { short: "⚠️ Weak NFP & tariff uncertainty dampening industrial metal sentiment", detail: "Tariffs on Canadian and Mexican goods affect industrial supply chains relying on silver inputs. A weaker jobs market signals softer manufacturing activity. These are transient headwinds — the structural supply deficit ultimately dominates." },
      { short: "🇨🇳 China industrial data Fri — key demand signal for silver", detail: "China accounts for ~55% of global silver industrial demand. Friday's China Retail Sales and Industrial Output data is a direct read on silver's largest demand source. Strong output = significant silver demand signal. Weak data = near-term headwind." },
    ],
  },
  {
    name: "NAS100", label: "Nasdaq 100", Icon: NasIcon,
    price: "$24,631.65", change: "−1.59%", changeUp: false,
    bias: "CAUTIOUS", biasColor: "#dc2626", biasBg: "#fef2f2", biasBorder: "#fecaca",
    accent: "#0091BA", accentRgb: "0,145,186",
    sentiment: 28,
    keyLevel: "200-DMA as key support  ·  Prior range 23,200–25,800",
    watch: "CPI is make-or-break. Hot CPI = sell tech hard. Cool CPI = potential snap-back. FOMC blackout = no Fed speakers to cushion moves.",
    drivers: [
      { short: "⚡ FEB CPI Wed Mar 11 — soft inflation = rate cut hopes = relief rally", detail: "Nasdaq's valuation is rate-sensitive. High P/E multiples compress when rates stay elevated. A soft CPI print immediately reprices rate cuts earlier, justifying higher multiples. The index has been pricing in 'higher for longer' — any dovish data creates a violent mean-reversion snap-back." },
      { short: "🤖 Alphabet's $175–185B AI capex spooked markets — ROI uncertainty", detail: "Alphabet announced $175–185B in AI infrastructure capex for 2026 — raising fears that Big Tech is in a capex arms race with uncertain ROI. Combined with DeepSeek proving AI capability at a fraction of the cost, markets are questioning whether current AI infrastructure spending will generate adequate returns." },
      { short: "📦 US tariffs on Canada/Mexico/China IN EFFECT — margin tax on tech", detail: "25% tariffs on Canada and Mexico plus elevated China tariffs are now active. Tech hardware, semiconductors, and consumer electronics have significant supply chain exposure. Tariffs act as a margin tax — raising input costs without raising revenue — a direct EPS headwind for NAS100 components." },
      { short: "🏦 Fed on hold until Jul/Sep — 'higher for longer' = valuation headwind", detail: "The 10Y Treasury yield staying elevated compresses the present value of future tech earnings. Growth stocks are long-duration assets — most sensitive to discount rate changes. Until the market has a credible near-horizon Fed cut, NAS100 faces a structural ceiling from rate pressure." },
      { short: "🔄 Sector rotation into energy/industrials/materials from mega-cap tech", detail: "Fund flows data shows rotation out of tech into commodity-linked sectors. Energy, industrials, and materials are outperforming as tariff/geopolitical risk reprices the economy. This rotation creates sustained selling in NAS100 even when individual names look cheap." },
      { short: "📉 DOGE federal job cuts → government contractor revenue concerns", detail: "The DOGE federal workforce reduction is creating revenue uncertainty for tech companies with large government contracts (cloud, cybersecurity, defense tech). Companies like Palantir and Booz Allen with significant federal exposure are being re-rated lower." },
    ],
  },
  {
    name: "BTCUSD", label: "Bitcoin", Icon: BtcIcon,
    price: "$68,258.48", change: "−46% ATH", changeUp: false,
    bias: "OVERSOLD / WATCH", biasColor: "#ea580c", biasBg: "#fff7ed", biasBorder: "#fed7aa",
    accent: "#F7931A", accentRgb: "247,147,26",
    sentiment: 38,
    keyLevel: "Support $53K–$55K  ·  Resistance $70K → $80K",
    watch: "CPI softness + NFP miss = risk-on = potential bounce toward $70K. Hold above $60K critical. Close below $55K extends correction toward $50K.",
    drivers: [
      { short: "⚡ BTC tracks NAS100 (78% correlation) — macro drives the trade", detail: "Bitcoin's correlation with NAS100 has tightened to ~78% on a 1-week rolling basis. Macro events (CPI, NFP, Fed) are the primary drivers — not crypto-native news. Trade BTC like a high-beta tech asset. CPI softness → NAS100 rally → BTC follows within hours." },
      { short: "📉 ETF outflows collapsed: $3.48B Nov → $206M Feb = 94% drop = floor forming", detail: "Bitcoin spot ETF outflows have collapsed from $3.48B in November 2025 to just $206M in February 2026 — a 94% reduction. This is a powerful floor signal. The marginal seller is nearly exhausted. When ETF flows turn positive, Bitcoin historically makes aggressive recovery moves." },
      { short: "🏦 Fed rate cuts Jul/Sep = liquidity tailwind when confirmed", detail: "Bitcoin is highly sensitive to global liquidity conditions. Rate cuts expand the monetary base, reduce the opportunity cost of holding non-yielding assets, and historically precede major BTC bull runs. The Jul/Sep cut timeline gives Bitcoin a 4–6 month window to base-build." },
      { short: "📊 Negative demand regime but stabilizing — correction, not cycle top", detail: "On-chain data shows Bitcoin in a negative demand regime — more long-term holders distributing than accumulating. However, distribution is slowing. Analysts classify this as a mid-cycle correction (typical −40 to −50% drawdown) rather than a cycle top (−70%+ drawdowns)." },
      { short: "🏛️ US Strategic Bitcoin Reserve established — structural credibility signal", detail: "The US government establishing a Strategic Bitcoin Reserve is a landmark event. It signals sovereign-level recognition of Bitcoin as a reserve asset. While near-term price impact is limited, it removes existential regulatory risk and attracts institutional allocators previously sidelined." },
      { short: "⚠️ Outside 'market leadership group' per Ecoinometrics — reactive, not leading", detail: "Ecoinometrics' framework shows BTC is currently reactive rather than leading — it responds to macro moves but isn't generating independent directional momentum. Won't outperform unless risk-on sentiment is broad-based. Re-entering leadership mode is the key bull signal to watch." },
    ],
  },
  {
    name: "USOIL", label: "Crude Oil", Icon: OilIcon,
    price: "$91.01", change: "↕ volatile", changeUp: null,
    bias: "RANGE / GEO RISK", biasColor: "#7c3aed", biasBg: "#f5f3ff", biasBorder: "#ddd6fe",
    accent: "#374151", accentRgb: "55,65,81",
    sentiment: 45,
    keyLevel: "Support $60  ·  Resistance $67–70  ·  Iran spike risk +$15–20",
    watch: "Binary Iran trade. No deal news = range $60–$70. Escalation = spike toward $80+. De-escalation/deal = drop toward $55–$58.",
    drivers: [
      { short: "🇮🇷 US-Iran talks — BREAKDOWN = +$15–20/bbl spike. DEAL = sharp selloff", detail: "Iran produces ~3.2M bpd. A breakdown in nuclear talks risks snapback sanctions cutting Iranian exports by 1–1.5M bpd overnight — a $15–20/bbl supply shock. A successful deal means Iranian barrels return to market, pushing WTI toward lower levels. Watch diplomatic headlines 24/7." },
      { short: "📦 Tariffs slowing global trade = demand headwind (IMF: 3.1% growth)", detail: "The IMF revised 2026 global growth to 3.1% — with tariff disruption as the primary downgrade driver. Oil demand correlates highly with trade volumes and industrial activity. Slower global growth = less shipping, less manufacturing, less fuel burn." },
      { short: "🛢️ OPEC+ halted production unwinding in Q1 2026 — supply floor support", detail: "OPEC+ reversed its planned production increase for Q1 2026 in response to demand weakness. This supply discipline has prevented a sharper collapse. However, internal pressure from members (UAE, Iraq) wanting higher output remains a cohesion risk." },
      { short: "📈 IEA sees 3.84M bpd oversupply in 2026 — structural bearish ceiling", detail: "The IEA's 2026 oil market balance shows a 3.84M bpd surplus — driven by US shale resilience, Brazil deepwater growth, and Guyana's expanding output. Even with OPEC+ cuts, the market is well-supplied. Geopolitics is the only meaningful upside catalyst." },
      { short: "🇺🇸 US shale plateaued at 13.2–13.5M bpd — no major supply additions", detail: "US shale production has plateaued due to core Permian Basin inventory depletion and capital discipline from publicly listed E&P companies. This plateau means US shale won't meaningfully offset a geopolitical supply disruption." },
      { short: "💵 Oil spike = inflation up = Fed cuts delayed = portfolio-wide risk-off", detail: "An oil price spike has second-order effects across all your markets. Higher oil → CPI stays elevated → Fed can't cut in July → NAS100 multiples compress → BTC stays suppressed. An Iran escalation isn't just an oil trade — it's a portfolio-wide risk-off event." },
    ],
  },
];

const calendarEvents = [
  { day: "MON", date: "Mar 9",  event: "China CPI & Trade Data",              impact: "HIGH",      color: "#f59e0b", note: "Key demand signal for commodities",              forecast: "CPI +0.1%  ·  Trade $96B", previous: "CPI −0.7%  ·  Trade $105B",  detail: "China CPI expected at +0.1% YoY — a key read on domestic deflation risk. Trade surplus data reveals export health. A strong surplus signals industrial activity — bullish for silver demand and oil consumption. Weak trade data deepens the demand concern narrative pressuring commodity prices since Q4 2025. Biggest impact on XAGUSD and WTI." },
  { day: "TUE", date: "Mar 10", event: "Japan GDP Final (Q4 2025)",           impact: "MED",       color: "#0ea5e9", note: "BoJ backdrop — affects USD/JPY & risk appetite", forecast: "+0.6% QoQ",                   previous: "−0.4% QoQ",                detail: "Japan's final Q4 2025 GDP reading. A strong print keeps BoJ rate hike expectations alive — strengthening yen, pressuring USD/JPY lower, indirectly weakening DXY. A weaker dollar is broadly bullish for gold, silver, and crypto. Watch for BoJ commentary alongside the data for forward guidance signals." },
  { day: "WED", date: "Mar 11", event: "🚨 US FEB CPI — 8:30 AM ET",          impact: "CRITICAL",  color: "#dc2626", note: "THE defining event for all 5 markets this week",  forecast: "+2.9% YoY  ·  Core +3.2%",  previous: "+3.0% YoY  ·  Core +3.3%", detail: "THE week's macro event. Feb consensus: +2.9% YoY, Core CPI +3.2%. A print ≤2.7% = aggressive risk-on: gold rallies, NAS100 surges, BTC bounces. A print ≥3.1% = hawkish shock: NAS100 sells off hard, gold dips initially then recovers on stagflation narrative. Sets the tone for the Mar 17–18 FOMC meeting." },
  { day: "WED", date: "Mar 11", event: "EIA Crude Oil Inventories",            impact: "MED",       color: "#0ea5e9", note: "Short-term WTI price mover ~10:30 AM ET",       forecast: "−1.4M barrels",               previous: "+3.6M barrels",             detail: "Weekly US crude, gasoline, and distillate stockpile data. Forecast expects a draw of −1.4M barrels vs prior +3.6M build. A surprise draw of 3M+ barrels = bullish $1–2 intraday move. A large unexpected build = bearish. Creates tactical entry/exit opportunities around Wednesday's CPI-driven volatility." },
  { day: "THU", date: "Mar 12", event: "US Initial Jobless Claims",            impact: "HIGH",      color: "#f59e0b", note: "Post-NFP shock — labor market trajectory critical", forecast: "226K",                         previous: "242K",                      detail: "After the −92K Feb NFP shock, jobless claims become a high-frequency check on whether the labor market deterioration is accelerating. Forecast: 226K. A print above 260K confirms rapidly deteriorating conditions — extremely bullish for gold and rate cuts, bearish for NAS100 near-term. Below 210K suggests NFP was a one-off anomaly." },
  { day: "THU", date: "Mar 12", event: "Germany HICP Final (Feb)",             impact: "MED",       color: "#0ea5e9", note: "ECB signals — EUR/USD affects USD & gold",       forecast: "+2.4% YoY",                  previous: "+2.8% YoY",                detail: "Germany's final February inflation reading. If confirmed soft at +2.4%, ECB rate cut expectations accelerate — strengthening EUR vs USD, weakening DXY. A weaker dollar is a tailwind for gold and commodities priced in USD. The ECB meets April 17." },
  { day: "FRI", date: "Mar 13", event: "China Retail Sales & Industrial Output", impact: "HIGH",   color: "#f59e0b", note: "Critical for silver & oil demand",               forecast: "Sales +4.8%  ·  Output +5.5%", previous: "Sales +3.5%  ·  Output +4.8%", detail: "China Retail Sales and Industrial Output for Feb 2026. A strong beat confirms China's demand recovery — significantly bullish for silver (China is ~55% of global industrial demand) and oil. A miss deepens commodity demand concerns and would weigh heavily on XAGUSD." },
  { day: "∞",   date: "Ongoing", event: "🇮🇷 US–Iran Nuclear Talks",           impact: "TAIL RISK", color: "#7c3aed", note: "Binary oil event — monitor headlines 24/7",     forecast: "No timeline",                previous: "Stalled Dec 2025",          detail: "Talks are at a critical juncture. A breakdown triggers immediate oil supply risk premium (+$15–20/bbl), a gold safe-haven spike, and NAS100/BTC selloff on inflation fears. A deal sends oil lower but allows Fed to cut sooner — net positive for NAS100 and BTC medium-term." },
];

const macroThemes = [
  { icon: "💥", title: "NFP Shock Already in Play",    tag: "BEARISH LABOR",  tagColor: "#dc2626", tagBg: "#fef2f2", text: "Feb payrolls −92K vs +59K expected — worst miss in 4 months. Dec revised to −17K. Major dovish signal, raises hard-landing fears. Bad for NAS100 near-term, bullish for gold & rate cuts." },
  { icon: "📊", title: "CPI is THE Event This Week",   tag: "WED 8:30 AM ET", tagColor: "#dc2626", tagBg: "#fef2f2", text: "Feb CPI drops Wednesday. Forecast +2.9% YoY. Soft = risk-on across all 5 markets. Hot = sell NAS100/BTC hard, gold dips then rips on stagflation narrative." },
  { icon: "🏦", title: "Fed Frozen Until July",        tag: "HAWKISH HOLD",   tagColor: "#d97706", tagBg: "#fffbeb", text: "Fed funds 3.50–3.75%. FOMC meets Mar 17–18 but NO cut priced. Blackout week — no speakers. First cut priced July, second September. Tariff inflation keeping them sidelined." },
  { icon: "📦", title: "Tariffs Now Active",           tag: "MACRO SHIFT",    tagColor: "#ea580c", tagBg: "#fff7ed", text: "Canada, Mexico & China tariffs IN EFFECT. Adds inflation pressure, slows hiring, disrupts supply chains. Bearish NAS100, stagflation risk supports gold, pressures oil demand." },
  { icon: "🪖", title: "Middle East Tail Risk",        tag: "MONITOR DAILY",  tagColor: "#7c3aed", tagBg: "#f5f3ff", text: "US-Iran nuclear talks at a critical juncture. Breakdown = oil +$15–20, gold spike, NAS100/BTC crash on inflation fears. Markets pricing modest premium — not full escalation yet." },
  { icon: "💵", title: "USD Weakness — Tailwind",      tag: "BULLISH MACRO",  tagColor: "#16a34a", tagBg: "#f0fdf4", text: "DXY trending down — structurally bullish gold, silver, and crypto. After the NFP miss, dollar may weaken further unless CPI surprises hot Wednesday." },
];

/* ── SUBCOMPONENTS ──────────────────────────────────────────────────── */

const Ticker = () => {
  const items = [
    "XAUUSD  $5,170.90  ▼1.9%",
    "XAGUSD  $84.31  ▼9.4%",
    "NAS100  $24,631.65  ▼1.59%",
    "BTCUSD  $68,258.48  ▼46% ATH",
    "USOIL  $91.01  ↕ IRAN RISK",
    "FED RATE  3.50–3.75%  ON HOLD",
    "FEB NFP  −92K  vs +59K EXPECTED",
    "FEB CPI DUE  WED MAR 11  FORECAST +2.9%",
    "FOMC BLACKOUT BEGINS THIS WEEK",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-bar" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", overflow: "hidden", height: 36, display: "flex", alignItems: "center" }}>
      <div className="ticker-label" style={{ background: "#111827", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, padding: "0 16px", height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0, gap: 8, letterSpacing: "0.03em" }}>
        <span className="red-blink" style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
        MARKET CLOSED
      </div>
      <div style={{ overflow: "hidden", flex: 1, maskImage: "linear-gradient(90deg, transparent, white 3%, white 97%, transparent)" }}>
        <div className="ticker-inner" style={{ display: "flex", gap: 40, whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.02em" }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ color: item.includes("▼") ? "#dc2626" : "#6b7280" }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImpactBadge = ({ impact, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{impact}</span>
  </div>
);

const SentimentBar = ({ value, color, animate }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Bearish</span>
      <span style={{ fontSize: 11, color, fontWeight: 600 }}>Sentiment {value}%</span>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Bullish</span>
    </div>
    <div style={{ height: 6, background: "#f3f4f6", borderRadius: 6, overflow: "hidden" }}>
      <div
        className={animate ? "bar-fill" : ""}
        style={{ "--w": `${value}%`, width: animate ? undefined : `${value}%`, height: "100%", borderRadius: 6, background: `linear-gradient(90deg, #e5e7eb, ${color})` }}
      />
    </div>
  </div>
);

/* ── MAIN ──────────────────────────────────────────────────────────── */

export default function EliteMacros() {
  const [activeMarket, setActiveMarket] = useState(0);
  const [openItem, setOpenItem]         = useState(null);
  const [animateBars, setAnimateBars]   = useState(true);
  const m = markets[activeMarket];

  const toggle = (key) => setOpenItem(prev => prev === key ? null : key);
  const handleMarketChange = (i) => {
    setActiveMarket(i);
    setOpenItem(null);
    setAnimateBars(false);
    setTimeout(() => setAnimateBars(true), 40);
  };

  useEffect(() => {
    const s1 = document.createElement("style"); s1.textContent = FONTS; document.head.appendChild(s1);
    const s2 = document.createElement("style"); s2.textContent = CSS;   document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  const Card = ({ children, style = {} }) => (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", ...style }}>{children}</div>
  );

  const SectionLabel = ({ children }) => (
    <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>{children}</p>
  );

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#f0f2f5", minHeight: "100vh", color: "#111827" }}>
      <Ticker />

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 28px" }}>
        <div className="header-inner" style={{ maxWidth: 1020, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>Elite Macros</h1>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Week of Mar 9–13, 2026 · Saturday prep report</p>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>Updated Sat Mar 7, 2026</div>
        </div>
      </div>

      <div className="page-pad" style={{ maxWidth: 1020, margin: "0 auto", padding: "24px 28px 48px" }}>

        {/* ── ALERT ──────────────────────────────────────────────── */}
        <div className="alert-box fade-up" style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 18px", marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🚨</span>
          <p style={{ fontSize: 13, color: "#991b1b", fontWeight: 500, lineHeight: 1.6 }}>
            <strong>Critical event this week:</strong> US Feb CPI releases Wednesday Mar 11 at 8:30 AM ET — the single most important data point for all 5 of your markets.
            Forecast: +2.9% YoY (prev +3.0%). Soft print triggers broad risk-on; hot print triggers across-the-board risk-off.
          </p>
        </div>

        {/* ── 01 MACRO THEMES ─────────────────────────────────────── */}
        <div className="fade-up-1" style={{ marginBottom: 28 }}>
          <SectionLabel>01 / Key Macro Themes</SectionLabel>
          <div className="themes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 10 }}>
            {macroThemes.map((t, i) => (
              <Card key={i}>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8 }}>
                      <span>{t.icon}</span>{t.title}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: t.tagColor, background: t.tagBg, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", border: `1px solid ${t.tagColor}30`, flexShrink: 0 }}>
                      {t.tag}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.65 }}>{t.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── 02 ECONOMIC CALENDAR ─────────────────────────────────── */}
        <div className="fade-up-2" style={{ marginBottom: 28 }}>
          <SectionLabel>02 / Economic Calendar — Click Any Event for Detail</SectionLabel>
          <Card>
            {/* header row */}
            <div className="cal-header-row" style={{ display: "grid", gridTemplateColumns: "80px 100px 1fr 140px 140px 20px", gap: 14, padding: "10px 18px", borderBottom: "1px solid #f3f4f6" }}>
              {["DATE", "IMPACT", "EVENT", "FORECAST", "PREVIOUS", ""].map((h, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textAlign: i >= 3 ? "right" : "left" }}>{h}</span>
              ))}
            </div>

            {calendarEvents.map((e, i) => {
              const key = `cal-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={i} style={{ borderBottom: i < calendarEvents.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  {/* Row */}
                  <div
                    className="cal-row cal-grid"
                    onClick={() => toggle(key)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 100px 1fr 140px 140px 20px",
                      gap: 14, padding: "13px 18px", alignItems: "center",
                      background: isOpen ? "#fafafa" : "#fff",
                      borderLeft: `3px solid ${isOpen ? e.color : "transparent"}`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{e.day}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{e.date}</div>
                    </div>
                    <ImpactBadge impact={e.impact} color={e.color} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{e.event}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{e.note}</div>
                    </div>
                    <div className="forecast-col" style={{ fontSize: 12, color: "#374151", fontWeight: 500, textAlign: "right" }}>{e.forecast}</div>
                    <div className="prev-col" style={{ fontSize: 12, color: "#6b7280", textAlign: "right" }}>{e.previous}</div>
                    <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 12, color: isOpen ? e.color : "#d1d5db", textAlign: "center" }}>▾</span>
                  </div>
                  {/* Detail dropdown */}
                  <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
                    <div className="cal-detail-pad" style={{ padding: "14px 18px 16px 100px", background: "#fafafa", borderTop: `1px solid ${e.color}20` }}>
                      {/* mobile forecast/prev row */}
                      <div style={{ display: "flex", gap: 20, marginBottom: 10, flexWrap: "wrap" }}>
                        <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em" }}>FORECAST  </span><span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{e.forecast}</span></div>
                        <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em" }}>PREVIOUS  </span><span style={{ fontSize: 12, color: "#6b7280" }}>{e.previous}</span></div>
                      </div>
                      <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${e.color}`, paddingLeft: 14 }}>
                        {e.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* ── 03 MARKET ANALYSIS ───────────────────────────────────── */}
        <div className="fade-up-3">
          <SectionLabel>03 / Market-by-Market Analysis</SectionLabel>

          {/* Market Selector — top 3, bottom 2 centred */}
          <div style={{ marginBottom: 18 }}>
            <div className="mkt-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {markets.map((mk, i) => {
                const active = activeMarket === i;
                return (
                  <button key={i} className="mkt-btn" onClick={() => handleMarketChange(i)} style={{
                    background: "#fff",
                    border: active ? `2px solid ${mk.accent}` : "2px solid #e5e7eb",
                    borderRadius: 10, padding: "12px 6px",
                    boxShadow: active ? `0 2px 14px rgba(0,0,0,0.1)` : "none",
                  }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 7 }}>
                      <mk.Icon size={28} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: active ? mk.accent : "#6b7280", letterSpacing: "0.02em" }}>{mk.name}</div>
                    <div style={{ fontSize: 11, color: active ? "#374151" : "#9ca3af", marginTop: 2, fontWeight: active ? 600 : 400 }}>{mk.price}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Market Card */}
          <Card>
            {/* accent top bar */}
            <div style={{ height: 3, background: m.accent, borderRadius: "12px 12px 0 0" }} />

            {/* header */}
            <div style={{ padding: "20px 22px 18px", borderBottom: "1px solid #f3f4f6" }}>
              <div className="market-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <m.Icon size={40} />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, fontWeight: 500 }}>{m.name}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{m.price}</div>
                    <div style={{ fontSize: 12, color: m.changeUp === false ? "#dc2626" : m.changeUp === true ? "#16a34a" : "#6b7280", fontWeight: 600, marginTop: 1 }}>{m.change}</div>
                  </div>
                  <div style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: m.biasColor, background: m.biasBg, border: `1px solid ${m.biasBorder}`, display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="red-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: m.biasColor, display: "inline-block" }} />
                    {m.bias}
                  </div>
                </div>
              </div>

              {/* key levels + sentiment */}
              <div className="levels-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "12px 14px", border: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 5 }}>KEY LEVELS</p>
                  <p style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{m.keyLevel}</p>
                </div>
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "12px 14px", border: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 8 }}>BULL / BEAR SENTIMENT</p>
                  <SentimentBar value={m.sentiment} color={m.biasColor} animate={animateBars} />
                </div>
              </div>
            </div>

            {/* drivers */}
            <div style={{ padding: "18px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 10 }}>
                DRIVERS THIS WEEK — Click any item to expand
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {m.drivers.map((d, i) => {
                  const key = `driver-${activeMarket}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={i} style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${isOpen ? m.accent + "70" : "#f3f4f6"}` }}>
                      <div
                        className="driver-row"
                        onClick={() => toggle(key)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "10px 14px", background: isOpen ? "#fafafa" : "#fff", gap: 12,
                        }}
                      >
                        <span style={{ fontSize: 13, color: isOpen ? "#111827" : "#374151", lineHeight: 1.4, flex: 1, fontWeight: isOpen ? 600 : 400 }}>{d.short}</span>
                        <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 13, color: isOpen ? m.accent : "#d1d5db", flexShrink: 0 }}>▾</span>
                      </div>
                      <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
                        <div style={{ padding: "12px 14px 14px 14px", background: "#fafafa", borderTop: `1px solid ${m.accent}25` }}>
                          <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${m.accent}`, paddingLeft: 12 }}>
                            {d.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* trading watch */}
            <div style={{ margin: "0 22px 22px", background: m.biasBg, borderRadius: 8, padding: "14px 16px", border: `1px solid ${m.biasBorder}`, borderLeft: `3px solid ${m.biasColor}` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: m.biasColor, letterSpacing: "0.07em", marginBottom: 6 }}>◈ TRADING WATCH</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{m.watch}</p>
            </div>
          </Card>
        </div>

        {/* footer */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>Elite Macros · Sat Mar 7, 2026 · For informational purposes only · Not financial advice</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>Verify all prices with your broker before execution</span>
        </div>
      </div>
    </div>
  );
}
