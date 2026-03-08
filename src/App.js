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

  .cal-row   { transition: background 0.12s; cursor: pointer; user-select: none; }
  .cal-row:hover   { background: #f8f9fb !important; }
  .driver-row { transition: background 0.12s; cursor: pointer; user-select: none; }
  .driver-row:hover { background: #f8f9fb !important; }
  .mkt-btn { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; }
  .mkt-btn:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.1); transform: translateY(-1px); }

  .accordion-body {
    overflow: hidden;
    transition: max-height 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.22s ease;
  }
  .accordion-body.open   { max-height: 440px; opacity: 1; }
  .accordion-body.closed { max-height: 0; opacity: 0; }

  .chevron { display: inline-block; transition: transform 0.2s ease; }
  .chevron.open { transform: rotate(180deg); }

  ::-webkit-scrollbar       { width: 4px; }
  ::-webkit-scrollbar-track { background: #f0f2f5; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
`;

/* ── HOOK: window size ───────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ── SVG ICONS ──────────────────────────────────────────────────── */
const GoldIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path d="M0 0h56v56H0V0z" fill="#D69A00"/>
    <path d="M21.248 21.555h13.784l-2.01-5.393a1.17 1.17 0 00-.41-.553l-11.364 5.946zm-.038-6.401C21.698 13.842 22.772 13 23.956 13h8.151c1.184 0 2.258.842 2.747 2.154l2.009 5.393c.603 1.618-.371 3.453-1.831 3.453h-14c-1.46 0-2.433-1.835-1.831-3.453l2.01-5.393h-.001zM10.235 35.555h13.757l-2.01-5.393a1.171 1.171 0 00-.41-.553l-11.337 5.946zm-.039-6.401C10.685 27.842 11.76 27 12.943 27h8.124c1.184 0 2.259.842 2.747 2.154l2.009 5.393c.603 1.618-.37 3.453-1.831 3.453H10.017c-1.46 0-2.433-1.835-1.83-3.453l2.01-5.393zm35.89 6.401h-13.85l11.43-5.945c.179.126.323.316.413.553l2.008 5.392zM34.945 27c-1.184 0-2.259.842-2.747 2.154l-2.009 5.393c-.603 1.618.37 3.453 1.831 3.453h14.067c1.46 0 2.433-1.835 1.83-3.453l-2.01-5.393C45.422 27.842 44.348 27 43.164 27h-8.22z" fill="#fff"/>
  </svg>
);

const SilverIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path d="M0 0h56v56H0V0z" fill="#ADABB8"/>
    <path d="M21.247 21.555h13.785l-2.01-5.393a1.171 1.171 0 00-.41-.553l-11.365 5.946zm-.038-6.401C21.698 13.842 22.772 13 23.956 13h8.15c1.185 0 2.26.842 2.748 2.154l2.009 5.393c.602 1.618-.371 3.453-1.831 3.453h-14c-1.46 0-2.434-1.835-1.832-3.453l2.01-5.393zM10.234 35.555h13.757l-2.008-5.393a1.17 1.17 0 00-.412-.553l-11.337 5.946zm-.038-6.401C10.685 27.842 11.76 27 12.943 27h8.124c1.184 0 2.258.842 2.747 2.154l2.009 5.393C26.426 36.165 25.452 38 23.99 38H10.017c-1.46 0-2.433-1.835-1.83-3.453l2.01-5.393zm35.89 6.401h-13.85l11.43-5.945c.178.126.323.316.412.553l2.008 5.392zM34.943 27c-1.184 0-2.258.842-2.746 2.154l-2.01 5.393C29.586 36.165 30.559 38 32.02 38h14.066c1.46 0 2.434-1.835 1.831-3.453l-2.01-5.393C45.422 27.842 44.346 27 43.163 27h-8.22z" fill="#fff"/>
  </svg>
);

const OilIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path fill="url(#oil_g)" d="M0 0h56v56H0z"/>
    <path d="M38.889 31.111c0 6.845-4.9 12.445-10.889 12.445-5.989 0-10.889-5.6-10.889-12.445C17.111 24.267 28 9.333 28 9.333s10.889 14.934 10.889 21.778z" fill="#fff"/>
    <defs>
      <linearGradient id="oil_g" x1="10.418" y1="9.712" x2="68.147" y2="76.017" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A1E21"/><stop offset="1" stopColor="#06060A"/>
      </linearGradient>
    </defs>
  </svg>
);

const NasIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path fill="#0091BA" d="M0 0h56v56H0z"/>
    <path d="M13.06 36h3.3V20h-3.3L9 23.04v2.88l4-2.68h.06V36ZM26.02 36c3.97 0 6.38-3.08 6.38-8v-.02c0-4.91-2.4-7.98-6.38-7.98s-6.39 3.07-6.39 7.98v.03c0 4.91 2.41 7.99 6.39 7.99Zm0-2.6c-1.96 0-3.08-2-3.08-5.4v-.02c0-3.4 1.12-5.39 3.08-5.39 1.95 0 3.07 2 3.07 5.4V28c0 3.4-1.12 5.4-3.07 5.4ZM40.61 36C44.6 36 47 32.92 47 28v-.02c0-4.91-2.41-7.98-6.39-7.98-3.97 0-6.38 3.07-6.38 7.98v.03c0 4.91 2.4 7.99 6.38 7.99Zm0-2.6c-1.95 0-3.07-2-3.07-5.4v-.02c0-3.4 1.12-5.39 3.07-5.39 1.96 0 3.08 2 3.08 5.4V28c0 3.4-1.12 5.4-3.08 5.4Z" fill="#fff"/>
  </svg>
);

const BtcIcon = ({ size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: 8, background: "#F7931A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ color: "#fff", fontWeight: 800, fontSize: size * 0.45, fontFamily: "Arial, sans-serif" }}>₿</span>
  </div>
);

/* ── DATA ───────────────────────────────────────────────────────── */
const markets = [
  {
    name: "XAUUSD", label: "Gold", Icon: GoldIcon,
    price: "$5,170.90", change: "−1.9% wk", changeUp: false,
    bias: "BULLISH", biasColor: "#16a34a", biasBg: "#f0fdf4", biasBorder: "#bbf7d0",
    accent: "#D69A00", sentiment: 78,
    keyLevel: "Support $5,100–$5,120  ·  Key floor $5,052  ·  Resistance $5,208 → $5,266",
    watch: "Closed Friday at $5,170.90 — just below the $5,208 breakout level. A soft CPI Wednesday = retest $5,208 and likely push to $5,266+. Hot CPI = pullback to $5,100–$5,120 support before buyers re-enter. Structural bull trend intact above $5,052.",
    drivers: [
      { short: "⚡ Closed $5,170.90 — sitting just below $5,208 breakout level, coiled for CPI", detail: "Gold closed Friday at $5,170.90, only $37 below the critical $5,208 resistance that capped the prior rally. This is a textbook coiled spring setup. A single soft CPI print Wednesday is the trigger — momentum traders will pile in above $5,208 targeting $5,266 and then $5,370. The risk/reward of holding gold into CPI is highly asymmetric from this level." },
      { short: "🏦 FOMC blackout week — no Fed speakers to talk gold down", detail: "The FOMC blackout period begins this week ahead of the Mar 17–18 meeting. With no Fed speakers able to push back on rate-cut expectations, gold loses a key near-term headwind. Any dovish data interpretation will go uncontested by the Fed, allowing gold to price in cuts freely. First cut remains priced for July, second for September." },
      { short: "💥 Feb NFP −92K shock already in the price — gold absorbed it at $5,170", detail: "The catastrophic −92K Feb payrolls miss (vs +59K expected) hit markets Friday and gold held above $5,100, closing strong at $5,170.90. This resilience confirms institutional buyers are defending the $5,100–$5,120 zone. When bad macro news no longer causes gold to fall, the trend is accelerating upward." },
      { short: "🏛️ Central bank bid (China, Turkey, India) absorbs every dip below $5,150", detail: "Central bank gold demand has been the structural floor under gold throughout 2025–2026. China's PBoC has been buying every dip below $5,150. This sovereign demand means the downside at these levels is limited — retail and institutional sellers are consistently met by central bank buyers, compressing the correction range." },
      { short: "📉 Real yields falling — 10Y TIPS below 1.5% keeps gold structurally bid", detail: "Real yields (inflation-adjusted) have been trending down as the NFP shock reprices the Fed path lower. Gold's inverse correlation with real yields is near-perfect at current levels. With real yields likely to fall further after a soft CPI reading, the structural tailwind for gold is strengthening into this week's data." },
      { short: "🪖 Iran risk already in price at $91 oil — further escalation = direct gold spike", detail: "With USOIL already at $91.01, a significant geopolitical risk premium is priced into energy markets. Any Iran escalation from here directly triggers gold safe-haven flows on top of the oil spike. Gold benefits from both the inflation fear channel (oil → CPI → delayed cuts) and the pure flight-to-safety channel simultaneously." },
    ],
  },
  {
    name: "XAGUSD", label: "Silver", Icon: SilverIcon,
    price: "$84.31", change: "−9.4% wk", changeUp: false,
    bias: "PULLBACK / WATCH", biasColor: "#d97706", biasBg: "#fffbeb", biasBorder: "#fde68a",
    accent: "#ADABB8", sentiment: 52,
    keyLevel: "Support $80–$82  ·  Key floor $78  ·  Resistance $88 → $90.50",
    watch: "Closed at $84.31 after a brutal −9.4% weekly drop — likely driven by industrial demand fears from weak NFP and tariff disruption. The $80–$82 zone is the critical support to hold. A bounce requires CPI softness AND positive China industrial data Friday. Break below $78 = re-test of $72–$74.",
    drivers: [
      { short: "⚠️ Closed $84.31 after −9.4% weekly crash — sharp industrial demand unwind", detail: "Silver's −9.4% weekly loss is significantly larger than gold's −1.9%, widening the gold/silver ratio sharply. This divergence signals the selloff was driven by industrial demand fears (tariffs, weak NFP, manufacturing slowdown) rather than pure monetary concerns. Silver's 50%+ industrial use makes it highly sensitive to growth expectations — and those deteriorated sharply this week." },
      { short: "🏭 Dual catalyst needed: soft CPI (monetary) + strong China data (industrial)", detail: "For silver to recover from $84.31, you need BOTH a dovish CPI reading Wednesday (Fed cut repricing) AND strong China Retail Sales and Industrial Output Friday (demand confirmation). One without the other won't sustain a rally. This makes silver a more complex trade than gold into this week." },
      { short: "🛡️ $80–$82 is critical support — prior breakout zone must hold", detail: "The $80–$82 zone represents the prior consolidation base from Q3 2025 before the parabolic move to $90.50. A weekly close below $80 would be technically damaging and could trigger algorithmic selling toward $74. Watch Monday's open closely — if buyers defend $82 aggressively, the correction may already be complete." },
      { short: "🔗 Gold/silver ratio spiking — historically precedes violent silver catch-up", detail: "The gold/silver ratio has widened significantly this week, meaning gold is holding its value while silver has been sold off. Historically, a widening ratio above the 60–65x range precedes sharp silver outperformance when sentiment turns. If CPI is soft and China data is strong, silver could close the ratio gap violently fast — potentially a +8–12% week." },
      { short: "🏭 Structural supply deficit unchanged — 5th consecutive year of deficit in 2026", detail: "Despite the price drop, the fundamental supply/demand balance for silver has not changed. The Silver Institute projects a 150–180M oz deficit for 2026 driven by solar PV and EV demand. This deficit is structural — the current price weakness is a macro-driven dislocation, not a fundamental deterioration. Long-term value buyers will see $82–$84 as attractive." },
      { short: "🇨🇳 China industrial output Fri Mar 13 — the single most important silver data point", detail: "China represents ~55% of global silver industrial demand. Friday's Industrial Output data is THE demand read that matters most for silver right now. The prior reading was +4.8% — consensus expects +5.5% this week. A beat would be a direct positive catalyst for silver and could reverse a significant portion of the week's losses." },
    ],
  },
  {
    name: "NAS100", label: "Nasdaq 100", Icon: NasIcon,
    price: "$24,631.65", change: "−1.59% wk", changeUp: false,
    bias: "BEARISH / CAUTION", biasColor: "#dc2626", biasBg: "#fef2f2", biasBorder: "#fecaca",
    accent: "#0091BA", sentiment: 26,
    keyLevel: "Immediate resistance $25,200  ·  Key support $23,800–$24,000  ·  200-DMA ~$23,500",
    watch: "Closed $24,631.65 — well below Jan highs near $22K. CPI Wednesday is make-or-break. Hot CPI (≥3.1%) = breakdown through $24,000 toward 200-DMA at ~$23,500. Soft CPI (≤2.7%) = squeeze back toward $25,200. Do not fight the trend — only a confirmed CPI catalyst justifies a long.",
    drivers: [
      { short: "📉 Closed $24,631.65 — down ~10% from Jan highs, trend is lower", detail: "NAS100 has declined approximately 10% from January's highs near $27,300, closing Friday at $24,631.65. The weekly −1.59% loss continued the grinding downtrend. Each rally attempt is being sold — this is distribution behavior, not accumulation. The burden of proof is on bulls to show CPI can catalyze a genuine reversal, not just a dead-cat bounce." },
      { short: "⚡ FEB CPI Wed is the only near-term bull catalyst — needs ≤2.7% to matter", detail: "At $24,631.65, NAS100 has already priced in significant growth concern. For a sustained recovery, the market needs a CPI print meaningfully below consensus (+2.9%). A reading of ≤2.7% would force traders to price in a June or earlier Fed cut, providing the multiple-expansion fuel the index needs. Anything ≥3.0% = accelerated selling toward the 200-DMA." },
      { short: "🤖 AI capex arms race ($175–185B) + DeepSeek ROI fears = multiple compression", detail: "Alphabet's $175–185B AI capex announcement for 2026 has spooked markets already trading at elevated multiples. Combined with DeepSeek demonstrating that frontier AI can be built at a fraction of the cost, investors are questioning the ROI on massive infrastructure buildouts. This is a P/E compression story — not just sentiment — and it won't resolve until earnings prove the spending justified." },
      { short: "📦 Active tariffs on Canada/Mexico/China = direct EPS headwind for NAS100 names", detail: "25% tariffs on Canada and Mexico and elevated China tariffs are now fully active. NAS100 components — particularly Apple (China supply chain), AMD, Nvidia, and consumer tech names — face direct margin pressure. Every quarter of active tariffs compresses the earnings estimates analysts use to justify current valuations at $24,631." },
      { short: "🔄 Rotation out of mega-cap tech into energy/materials is structural, not tactical", detail: "With USOIL at $91.01 and gold at $5,170.90, the commodity/energy complex is outperforming dramatically. Fund managers are actively rotating out of tech into energy, materials, and defense — this isn't a one-week trade. The rotation will continue as long as geopolitical risk (Iran) and inflation fears (tariffs) dominate. Capital that leaves NAS100 at these prices is not coming back quickly." },
      { short: "💀 DOGE cuts + weak NFP = government tech contracts at risk", detail: "The −92K NFP and DOGE federal workforce cuts are creating a direct revenue headwind for Palantir, Booz Allen Hamilton, Leidos, and other defense/government tech contractors that are significant NAS100 weights. Federal IT and cloud spending is being audited and cut — a structural earnings risk that markets haven't fully discounted at $24,631." },
    ],
  },
  {
    name: "BTCUSD", label: "Bitcoin", Icon: BtcIcon,
    price: "$68,258.48", change: "−37% fr ATH", changeUp: false,
    bias: "RECOVERING / WATCH", biasColor: "#ea580c", biasBg: "#fff7ed", biasBorder: "#fed7aa",
    accent: "#F7931A", sentiment: 42,
    keyLevel: "Support $65,000–$66,500  ·  Key level $63,000  ·  Resistance $70,000 → $72,500",
    watch: "Closed $68,258 — sitting just below the critical $70,000 psychological level. A clean break and daily close above $70K on CPI softness would be highly bullish, targeting $72,500 then $75K. Failure to break $70K and a drop below $66,500 = retest of $63,000 support.",
    drivers: [
      { short: "📍 Closed $68,258 — positioned just below $70K breakout level, high-tension setup", detail: "Bitcoin closed Friday at $68,258.48, only $1,742 below the psychologically critical $70,000 round number resistance. This is an extremely high-tension technical setup. The $70K level has acted as resistance since the correction began. A decisive daily close above $70K — especially triggered by a soft CPI reading — would flip $70K to support and target $72,500–$75,000 in the sessions immediately following." },
      { short: "⚡ CPI soft = NAS100 rally = BTC breaks $70K. 78% correlation is the trade", detail: "Bitcoin's 1-week correlation with NAS100 is running at ~78%. The macro trade is simple: soft CPI → Fed cut repricing → NAS100 surges → BTC breaks $70K in tandem. The move in BTC is typically faster and larger than NAS100 due to higher beta. A 3% NAS100 rally on CPI could translate to a 6–10% BTC move given current positioning." },
      { short: "📊 ETF outflows nearly exhausted — $3.48B Nov → $206M Feb signals seller fatigue", detail: "Spot Bitcoin ETF outflows have collapsed 94% from the November peak ($3.48B) to February ($206M). This is the most important structural indicator for near-term price direction. The marginal seller is almost completely exhausted. When outflows flip to inflows — which historically happens when price clears a major resistance level like $70K — the reversal tends to be sharp and aggressive." },
      { short: "🏛️ US Strategic Bitcoin Reserve removes existential regulatory risk permanently", detail: "The establishment of the US Strategic Bitcoin Reserve is a watershed event that permanently changes Bitcoin's risk profile. Sovereign-level recognition eliminates the tail risk of a US government ban or aggressive hostile regulation that previously kept many institutional allocators on the sidelines. This unlocks a new category of capital — endowments, pension funds, sovereign wealth funds — that can now justify Bitcoin allocations." },
      { short: "🏦 Fed cut Jul/Sep = the structural bull catalyst. 4 months to accumulate", detail: "With the first Fed rate cut priced for July 2026, Bitcoin has roughly a 4-month accumulation window before the macro liquidity catalyst arrives. Rate cuts expand global liquidity, reduce the opportunity cost of holding non-yielding assets, and historically precede Bitcoin's most explosive price moves. The $65K–$70K range is potentially the final accumulation zone before the next leg up." },
      { short: "⚠️ Must hold $65,000–$66,500 support or risk re-test of $63K", detail: "The $65,000–$66,500 zone is the last significant support before $63,000. A hot CPI print Wednesday that triggers a broad risk-off selloff could push BTC toward $66,500 quickly. A break below $65,000 on a daily close would shift the short-term bias from 'recovering' to 'extended correction' and significantly delay the $70K breakout thesis." },
    ],
  },
  {
    name: "USOIL", label: "Crude Oil", Icon: OilIcon,
    price: "$91.01", change: "+elevated", changeUp: true,
    bias: "GEOPOLITICAL PREMIUM", biasColor: "#7c3aed", biasBg: "#f5f3ff", biasBorder: "#ddd6fe",
    accent: "#374151", sentiment: 58,
    keyLevel: "Support $87–$88  ·  Key floor $84  ·  Resistance $94–$95  ·  Iran spike target $100+",
    watch: "Closed $91.01 — well above fundamental fair value of ~$72–$75, with ~$16–$18 of Iran geopolitical risk premium baked in. This is a binary event: Iran deal/de-escalation = sharp drop to $80–$82 within days. No deal / escalation = spike above $94–$95 targeting $100+. Do not trade this without a stop — it can move $5–8 in a session on headlines.",
    drivers: [
      { short: "🇮🇷 $91.01 = ~$16–18 Iran risk premium already in price — binary event trade", detail: "USOIL at $91.01 is approximately $16–18 above what fundamentals alone (OPEC+ supply, global demand, IEA balance) would justify (~$72–$75 range). This entire premium is geopolitical — reflecting the market's probability-weighted expectation of Iranian supply disruption. This makes oil a pure binary event trade right now: diplomatic progress = rapid unwind to $80–$82; breakdown in talks = spike toward $100+. There is no middle ground." },
      { short: "📈 At $91 oil, CPI risk is now asymmetric — any miss = stagflation narrative", detail: "Oil at $91 is directly feeding into inflation expectations. If the Feb CPI prints above consensus (+2.9%) on Wednesday, the market will immediately look at $91 oil as a sign the March CPI will be even hotter. This stagflation feedback loop — hot CPI + expensive oil — is the worst scenario for NAS100 and BTC and would force the Fed to hold rates longer, potentially through September." },
      { short: "🛢️ OPEC+ production discipline is holding — no spare capacity signals at $91", detail: "OPEC+ has explicitly halted its planned production unwinding for Q1 2026. With prices at $91, members like Saudi Arabia have zero incentive to open the taps. The cartel is earning maximum revenue at current prices while maintaining discipline. This OPEC+ floor means $84–$85 is likely the lower bound even in a partial geopolitical de-escalation scenario." },
      { short: "📉 IEA sees 3.84M bpd oversupply — but that's irrelevant while Iran risk is live", detail: "The IEA's structural 2026 forecast shows a 3.84M bpd surplus — which would normally pressure prices toward $70. But that fundamental bearish case is completely overwhelmed by the Iran premium at $91. The moment Iran risk resolves — in either direction — the fundamental balance will reassert itself. A deal could mean a rapid $15–18 price collapse back toward fair value." },
      { short: "💵 $91 oil is already a portfolio-wide event — every market is affected right now", detail: "Oil at $91 is not just an oil trade — it is actively shaping every other market in your portfolio. It's keeping CPI elevated (delaying Fed cuts → bearish NAS100/BTC), adding to safe-haven gold demand ($5,170), and creating inflation noise that complicates the Fed's messaging. The $91 print means you already have Iran risk in your portfolio whether you trade oil or not." },
      { short: "⚡ EIA inventory Wed — surprise draw on top of $91 = could spike above $94 fast", detail: "Wednesday's EIA crude inventory data (forecast: −1.4M barrels draw) releases the same day as CPI. A surprise draw of 3M+ barrels on top of $91 oil — especially if CPI is hot — creates a compound bullish oil catalyst that could push prices above $94 intraday. This makes Wednesday an especially volatile session across all 5 of your markets simultaneously." },
    ],
  },
];

const calendarEvents = [
  { day: "MON", date: "Mar 9",   event: "China CPI & Trade Data",               impact: "HIGH",      color: "#f59e0b", note: "Key demand signal for commodities",               forecast: "CPI +0.1%  ·  Trade $96B",    previous: "CPI −0.7%  ·  Trade $105B",    detail: "China CPI expected at +0.1% YoY — a key read on domestic deflation risk. Trade surplus data reveals export health. A strong surplus signals industrial activity — bullish for silver demand and oil consumption. Weak trade data deepens the demand concern narrative pressuring commodity prices since Q4 2025. Biggest impact on XAGUSD and WTI." },
  { day: "TUE", date: "Mar 10",  event: "Japan GDP Final (Q4 2025)",            impact: "MED",       color: "#0ea5e9", note: "BoJ backdrop — affects USD/JPY & risk appetite",  forecast: "+0.6% QoQ",                    previous: "−0.4% QoQ",                    detail: "Japan's final Q4 2025 GDP reading. A strong print keeps BoJ rate hike expectations alive — strengthening yen, pressuring USD/JPY lower, indirectly weakening DXY. A weaker dollar is broadly bullish for gold, silver, and crypto. Watch for BoJ commentary alongside the data." },
  { day: "WED", date: "Mar 11",  event: "🚨 US FEB CPI — 8:30 AM ET",           impact: "CRITICAL",  color: "#dc2626", note: "THE defining event for all 5 markets this week",   forecast: "+2.9% YoY  ·  Core +3.2%",    previous: "+3.0% YoY  ·  Core +3.3%",    detail: "THE week's macro event. Feb consensus: +2.9% YoY, Core CPI +3.2%. A print ≤2.7% = aggressive risk-on: gold rallies, NAS100 surges, BTC bounces. A print ≥3.1% = hawkish shock: NAS100 sells off hard, gold dips initially then recovers on stagflation narrative. Sets the tone for the Mar 17–18 FOMC meeting." },
  { day: "WED", date: "Mar 11",  event: "EIA Crude Oil Inventories",             impact: "MED",       color: "#0ea5e9", note: "Short-term WTI price mover ~10:30 AM ET",        forecast: "−1.4M barrels",                previous: "+3.6M barrels",                detail: "Weekly US crude, gasoline, and distillate stockpile data. Forecast expects a draw of −1.4M barrels vs prior +3.6M build. A surprise draw of 3M+ barrels = bullish $1–2 intraday move. A large unexpected build = bearish. Creates tactical entry/exit opportunities around Wednesday's CPI-driven volatility." },
  { day: "THU", date: "Mar 12",  event: "US Initial Jobless Claims",             impact: "HIGH",      color: "#f59e0b", note: "Post-NFP shock — labor market trajectory critical", forecast: "226K",                          previous: "242K",                          detail: "After the −92K Feb NFP shock, jobless claims become a high-frequency check on whether labor market deterioration is accelerating. Forecast: 226K. A print above 260K confirms rapidly deteriorating conditions — extremely bullish for gold and rate cuts, bearish for NAS100 near-term." },
  { day: "THU", date: "Mar 12",  event: "Germany HICP Final (Feb)",              impact: "MED",       color: "#0ea5e9", note: "ECB signals — EUR/USD affects USD & gold",        forecast: "+2.4% YoY",                    previous: "+2.8% YoY",                    detail: "Germany's final February inflation reading. If confirmed soft at +2.4%, ECB rate cut expectations accelerate — strengthening EUR vs USD, weakening DXY. A weaker dollar is a tailwind for gold and commodities priced in USD. The ECB meets April 17." },
  { day: "FRI", date: "Mar 13",  event: "China Retail Sales & Industrial Output", impact: "HIGH",     color: "#f59e0b", note: "Critical for silver & oil demand",                forecast: "Sales +4.8%  ·  Output +5.5%", previous: "Sales +3.5%  ·  Output +4.8%", detail: "China Retail Sales and Industrial Output for Feb 2026. A strong beat confirms China's demand recovery — significantly bullish for silver (China is ~55% of global industrial demand) and oil. A miss deepens commodity demand concerns and would weigh heavily on XAGUSD." },
  { day: "∞",   date: "Ongoing", event: "🇮🇷 US–Iran Nuclear Talks",             impact: "TAIL RISK", color: "#7c3aed", note: "Binary oil event — monitor headlines 24/7",      forecast: "No timeline",                  previous: "Stalled Dec 2025",             detail: "Talks are at a critical juncture. A breakdown triggers immediate oil supply risk premium (+$15–20/bbl), a gold safe-haven spike, and NAS100/BTC selloff on inflation fears. A deal sends oil lower but allows Fed to cut sooner — net positive for NAS100 and BTC medium-term." },
];

const macroThemes = [
  { icon: "💥", title: "NFP Shock Already in Play",   tag: "BEARISH LABOR",  tagColor: "#dc2626", tagBg: "#fef2f2", text: "Feb payrolls −92K vs +59K expected — worst miss in 4 months. Dec revised to −17K. Major dovish signal, raises hard-landing fears. Bad for NAS100 near-term, bullish for gold & rate cuts." },
  { icon: "📊", title: "CPI is THE Event This Week",  tag: "WED 8:30 AM ET", tagColor: "#dc2626", tagBg: "#fef2f2", text: "Feb CPI drops Wednesday. Forecast +2.9% YoY. Soft = risk-on across all 5 markets. Hot = sell NAS100/BTC hard, gold dips then rips on stagflation narrative." },
  { icon: "🏦", title: "Fed Frozen Until July",       tag: "HAWKISH HOLD",   tagColor: "#d97706", tagBg: "#fffbeb", text: "Fed funds 3.50–3.75%. FOMC meets Mar 17–18 but NO cut priced. Blackout week — no speakers. First cut priced July, second September. Tariff inflation keeping them sidelined." },
  { icon: "📦", title: "Tariffs Now Active",          tag: "MACRO SHIFT",    tagColor: "#ea580c", tagBg: "#fff7ed", text: "Canada, Mexico & China tariffs IN EFFECT. Adds inflation pressure, slows hiring, disrupts supply chains. Bearish NAS100, stagflation risk supports gold, pressures oil demand." },
  { icon: "🪖", title: "Middle East Tail Risk",       tag: "MONITOR DAILY",  tagColor: "#7c3aed", tagBg: "#f5f3ff", text: "US-Iran nuclear talks at a critical juncture. Breakdown = oil +$15–20, gold spike, NAS100/BTC crash on inflation fears. Markets pricing modest premium — not full escalation yet." },
  { icon: "💵", title: "USD Weakness — Tailwind",     tag: "BULLISH MACRO",  tagColor: "#16a34a", tagBg: "#f0fdf4", text: "DXY trending down — structurally bullish gold, silver, and crypto. After the NFP miss, dollar may weaken further unless CPI surprises hot Wednesday." },
];

/* ── SUBCOMPONENTS ──────────────────────────────────────────────── */
const Ticker = () => {
  const items = ["XAUUSD  $5,170.90  ▼1.9% WK","XAGUSD  $84.31  ▼9.4% WK","NAS100  $24,631.65  ▼1.59% WK","BTCUSD  $68,258.48  ▼37% FR ATH","USOIL  $91.01  ▲GEO PREMIUM","FED RATE  3.50–3.75%  ON HOLD","FEB NFP  −92K  vs +59K EXPECTED","FEB CPI DUE  WED MAR 11  FORECAST +2.9%","FOMC BLACKOUT BEGINS THIS WEEK"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", overflow: "hidden", height: 36, display: "flex", alignItems: "center" }}>
      <div style={{ background: "#111827", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, padding: "0 14px", height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0, gap: 7, letterSpacing: "0.03em" }}>
        <span className="red-blink" style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
        MARKET CLOSED
      </div>
      <div style={{ overflow: "hidden", flex: 1, maskImage: "linear-gradient(90deg, transparent, white 3%, white 97%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, white 3%, white 97%, transparent)" }}>
        <div className="ticker-inner" style={{ display: "flex", gap: 36, whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.02em" }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ color: item.includes("▼") ? "#dc2626" : "#6b7280" }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImpactBadge = ({ impact, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
    <span style={{ fontSize: 11, fontWeight: 600, color, whiteSpace: "nowrap" }}>{impact}</span>
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
      <div className={animate ? "bar-fill" : ""} style={{ "--w": `${value}%`, width: animate ? undefined : `${value}%`, height: "100%", borderRadius: 6, background: `linear-gradient(90deg, #e5e7eb, ${color})` }} />
    </div>
  </div>
);

/* ── MAIN ──────────────────────────────────────────────────────── */
export default function EliteMacros() {
  const [activeMarket, setActiveMarket] = useState(0);
  const [openItem, setOpenItem]         = useState(null);
  const [animateBars, setAnimateBars]   = useState(true);
  const winW   = useWindowWidth();
  const mobile = winW < 640;
  const tablet = winW >= 640 && winW < 900;
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

  const pad   = mobile ? "0 14px 40px" : "24px 24px 48px";
  const hPad  = mobile ? "0 14px" : "0 24px";

  const Card = ({ children, style = {} }) => (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", ...style }}>{children}</div>
  );
  const SectionLabel = ({ children }) => (
    <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>{children}</p>
  );

  /* ── Calendar row: mobile uses stacked card, desktop uses grid ── */
  const CalRow = ({ e, idx }) => {
    const key    = `cal-${idx}`;
    const isOpen = openItem === key;

    if (mobile) {
      return (
        <div style={{ borderBottom: idx < calendarEvents.length - 1 ? "1px solid #f3f4f6" : "none" }}>
          <div className="cal-row" onClick={() => toggle(key)} style={{ padding: "12px 14px", background: isOpen ? "#fafafa" : "#fff", borderLeft: `3px solid ${isOpen ? e.color : "transparent"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280" }}>{e.day} {e.date}</span>
                <ImpactBadge impact={e.impact} color={e.color} />
              </div>
              <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 12, color: isOpen ? e.color : "#d1d5db" }}>▾</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{e.event}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{e.note}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 7, flexWrap: "wrap" }}>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>FORECAST  </span><span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{e.forecast}</span></div>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>PREVIOUS  </span><span style={{ fontSize: 11, color: "#6b7280" }}>{e.previous}</span></div>
            </div>
          </div>
          <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
            <div style={{ padding: "12px 14px 14px", background: "#fafafa", borderTop: `1px solid ${e.color}20` }}>
              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${e.color}`, paddingLeft: 12 }}>{e.detail}</p>
            </div>
          </div>
        </div>
      );
    }

    // Desktop / tablet
    const cols = tablet ? "70px 90px 1fr 120px 120px 20px" : "80px 100px 1fr 150px 150px 20px";
    return (
      <div style={{ borderBottom: idx < calendarEvents.length - 1 ? "1px solid #f3f4f6" : "none" }}>
        <div className="cal-row" onClick={() => toggle(key)} style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "13px 18px", alignItems: "center", background: isOpen ? "#fafafa" : "#fff", borderLeft: `3px solid ${isOpen ? e.color : "transparent"}` }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{e.day}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{e.date}</div>
          </div>
          <ImpactBadge impact={e.impact} color={e.color} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{e.event}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{e.note}</div>
          </div>
          <div style={{ fontSize: 12, color: "#374151", fontWeight: 500, textAlign: "right" }}>{e.forecast}</div>
          <div style={{ fontSize: 12, color: "#6b7280", textAlign: "right" }}>{e.previous}</div>
          <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 12, color: isOpen ? e.color : "#d1d5db", textAlign: "center" }}>▾</span>
        </div>
        <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
          <div style={{ padding: "12px 18px 16px", paddingLeft: tablet ? 18 : 100, background: "#fafafa", borderTop: `1px solid ${e.color}20` }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 10, flexWrap: "wrap" }}>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>FORECAST  </span><span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{e.forecast}</span></div>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>PREVIOUS  </span><span style={{ fontSize: 12, color: "#6b7280" }}>{e.previous}</span></div>
            </div>
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${e.color}`, paddingLeft: 14 }}>{e.detail}</p>
          </div>
        </div>
      </div>
    );
  };

  /* ── Market selector grid ─────────────────────────────────────── */
  const mktCols = mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)";

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#f0f2f5", minHeight: "100vh", color: "#111827" }}>
      <Ticker />

      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: hPad }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", minHeight: 56, display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between", gap: 4, paddingTop: mobile ? 12 : 0, paddingBottom: mobile ? 12 : 0 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 20 : 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>Elite Macros</h1>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Week of Mar 9–13, 2026 · Saturday prep report</p>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>Updated Sat Mar 7, 2026</div>
        </div>
      </div>

      <div style={{ maxWidth: 1020, margin: "0 auto", padding: pad }}>

        {/* ALERT */}
        <div className="fade-up" style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: mobile ? "10px 14px" : "12px 18px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>🚨</span>
          <p style={{ fontSize: mobile ? 12 : 13, color: "#991b1b", fontWeight: 500, lineHeight: 1.6 }}>
            <strong>Critical event this week:</strong> US Feb CPI releases Wednesday Mar 11 at 8:30 AM ET.
            Forecast: +2.9% YoY (prev +3.0%). Soft print = broad risk-on; hot print = across-the-board risk-off.
          </p>
        </div>

        {/* 01 MACRO THEMES */}
        <div className="fade-up-1" style={{ marginBottom: 24 }}>
          <SectionLabel>01 / Key Macro Themes</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 10 }}>
            {macroThemes.map((t, i) => (
              <Card key={i}>
                <div style={{ padding: mobile ? "14px 14px" : "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 9 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 7 }}>
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

        {/* 02 ECONOMIC CALENDAR */}
        <div className="fade-up-2" style={{ marginBottom: 24 }}>
          <SectionLabel>02 / Economic Calendar — Click Any Event for Detail</SectionLabel>
          <Card>
            {/* desktop header row */}
            {!mobile && (
              <div style={{ display: "grid", gridTemplateColumns: tablet ? "70px 90px 1fr 120px 120px 20px" : "80px 100px 1fr 150px 150px 20px", gap: 12, padding: "10px 18px", borderBottom: "1px solid #f3f4f6" }}>
                {["DATE", "IMPACT", "EVENT", "FORECAST", "PREVIOUS", ""].map((h, i) => (
                  <span key={i} style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textAlign: i >= 3 ? "right" : "left" }}>{h}</span>
                ))}
              </div>
            )}
            {calendarEvents.map((e, i) => <CalRow key={i} e={e} idx={i} />)}
          </Card>
        </div>

        {/* 03 MARKET ANALYSIS */}
        <div className="fade-up-3">
          <SectionLabel>03 / Market-by-Market Analysis</SectionLabel>

          {/* selector */}
          <div style={{ display: "grid", gridTemplateColumns: mktCols, gap: mobile ? 6 : 8, marginBottom: 14 }}>
            {markets.map((mk, i) => {
              const active = activeMarket === i;
              return (
                <button key={i} className="mkt-btn" onClick={() => handleMarketChange(i)} style={{ background: "#fff", border: active ? `2px solid ${mk.accent}` : "2px solid #e5e7eb", borderRadius: 10, padding: mobile ? "10px 4px" : "12px 6px", boxShadow: active ? "0 2px 14px rgba(0,0,0,0.1)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: mobile ? 5 : 7 }}>
                    <mk.Icon size={mobile ? 24 : 28} />
                  </div>
                  <div style={{ fontSize: mobile ? 9 : 10, fontWeight: 700, color: active ? mk.accent : "#6b7280", letterSpacing: "0.02em" }}>{mk.name}</div>
                  <div style={{ fontSize: mobile ? 10 : 11, color: active ? "#374151" : "#9ca3af", marginTop: 2, fontWeight: active ? 600 : 400 }}>{mk.price}</div>
                </button>
              );
            })}
          </div>

          {/* market card */}
          <Card>
            <div style={{ height: 3, background: m.accent }} />

            {/* card header */}
            <div style={{ padding: mobile ? "16px 14px 14px" : "20px 22px 18px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "flex-start", gap: 14, marginBottom: 16 }}>
                {/* left: icon + name */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <m.Icon size={mobile ? 36 : 40} />
                  <div>
                    <div style={{ fontSize: mobile ? 18 : 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, fontWeight: 500 }}>{m.name}</div>
                  </div>
                </div>
                {/* right: price + bias */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ textAlign: mobile ? "left" : "right" }}>
                    <div style={{ fontSize: mobile ? 19 : 22, fontWeight: 700, color: "#111827" }}>{m.price}</div>
                    <div style={{ fontSize: 12, color: m.changeUp === false ? "#dc2626" : m.changeUp === true ? "#16a34a" : "#6b7280", fontWeight: 600, marginTop: 1 }}>{m.change}</div>
                  </div>
                  <div style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: m.biasColor, background: m.biasBg, border: `1px solid ${m.biasBorder}`, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    <span className="red-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: m.biasColor, display: "inline-block" }} />
                    {m.bias}
                  </div>
                </div>
              </div>

              {/* key levels + sentiment */}
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "11px 13px", border: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 5 }}>KEY LEVELS</p>
                  <p style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{m.keyLevel}</p>
                </div>
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "11px 13px", border: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 8 }}>BULL / BEAR SENTIMENT</p>
                  <SentimentBar value={m.sentiment} color={m.biasColor} animate={animateBars} />
                </div>
              </div>
            </div>

            {/* drivers */}
            <div style={{ padding: mobile ? "14px 14px" : "16px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 10 }}>DRIVERS THIS WEEK — Tap any item to expand</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {m.drivers.map((d, i) => {
                  const key    = `driver-${activeMarket}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={i} style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${isOpen ? m.accent + "70" : "#f3f4f6"}` }}>
                      <div className="driver-row" onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: mobile ? "10px 12px" : "10px 14px", background: isOpen ? "#fafafa" : "#fff", gap: 10 }}>
                        <span style={{ fontSize: mobile ? 12 : 13, color: isOpen ? "#111827" : "#374151", lineHeight: 1.45, flex: 1, fontWeight: isOpen ? 600 : 400 }}>{d.short}</span>
                        <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 13, color: isOpen ? m.accent : "#d1d5db", flexShrink: 0 }}>▾</span>
                      </div>
                      <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
                        <div style={{ padding: mobile ? "11px 12px 13px" : "12px 14px 14px", background: "#fafafa", borderTop: `1px solid ${m.accent}25` }}>
                          <p style={{ fontSize: mobile ? 12 : 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${m.accent}`, paddingLeft: 12 }}>{d.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* trading watch */}
            <div style={{ margin: mobile ? "0 14px 16px" : "0 22px 22px", background: m.biasBg, borderRadius: 8, padding: "13px 15px", border: `1px solid ${m.biasBorder}`, borderLeft: `3px solid ${m.biasColor}` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: m.biasColor, letterSpacing: "0.07em", marginBottom: 6 }}>◈ TRADING WATCH</p>
              <p style={{ fontSize: mobile ? 12 : 13, color: "#374151", lineHeight: 1.7 }}>{m.watch}</p>
            </div>
          </Card>
        </div>

        {/* footer */}
        <div style={{ marginTop: 28, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", gap: 4 }}>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>Elite Macros · Sat Mar 7, 2026 · For informational purposes only · Not financial advice</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>Verify all prices with your broker before execution</span>
        </div>
      </div>
    </div>
  );
}
