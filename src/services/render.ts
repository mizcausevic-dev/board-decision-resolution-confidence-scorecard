import {
  confidencePosture,
  confidenceRegister,
  payload,
  resolutionTiers,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Decision Resolution Confidence Scorecard";
const domain = "https://confidence.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --panel-2:#102032; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p, li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/confidence-register", "Confidence register"],
    ["/resolution-tiers", "Resolution tiers"],
    ["/confidence-posture", "Confidence posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderConfidenceOverview() {
  const executiveSummary = summary();
  const lanes = confidenceRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.lane)}</h3>
        <p><strong>Tier:</strong> ${escapeHtml(item.confidenceTier)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.resolutionTheme)}</p>
        <p><strong>Confidence score:</strong> ${item.boardConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeResolutionRiskScore} · confidence ${item.boardConfidenceScore} · reversal ${item.reversalRiskScore}</li>`
    )
    .join("");

  return shell(
    productTitle,
    `<section class="hero">
      <span class="eyebrow">Decision confidence</span>
      <h1>Which board decisions are actually settled, and which ones still look approved only because the packet is hiding weak proof, sponsor drift, or reversal pressure?</h1>
      <p class="lede">Board Decision Resolution Confidence Scorecard turns evidence quality, sponsor alignment, execution clarity, and reversal pressure into one reusable board-facing confidence surface.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Decisions tracked</span><span class="metric-value">${executiveSummary.decisionsTracked}</span><div class="metric-copy">Modeled board-facing decisions in the current executive packet.</div></div>
        <div class="metric"><span class="metric-label">Low-confidence lanes</span><span class="metric-value">${executiveSummary.lowConfidenceLanes}</span><div class="metric-copy">Decisions that still need stronger proof, clarity, or alignment.</div></div>
        <div class="metric"><span class="metric-label">Reversal-risk lanes</span><span class="metric-value">${executiveSummary.reversalRiskLanes}</span><div class="metric-copy">Lanes where approval can still unwind in the next cycle.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unstable or weakly defended decisions.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Confidence register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible instability</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready scorecard for exposing decision confidence, evidence quality, sponsor alignment, and reversal pressure."
  );
}

export function renderConfidenceRegister() {
  const rows = confidenceRegister()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.confidenceTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.resolutionTheme)}</td><td>${item.boardConfidenceScore}</td></tr>`
    )
    .join("");

  return shell(
    "Confidence register",
    `<section class="hero"><span class="eyebrow">Confidence register</span><h1>Each decision keeps one confidence tier, one owner, one audience, and one next move attached.</h1><p class="lede">The register keeps the board confidence story tied to the exact lane where the decision is still fragile, watchlisted, or stable.</p><div class="nav">${navLinks("/confidence-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Owner</th><th>Audience</th><th>Action</th><th>Theme</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Confidence-register view showing which board decisions are stable, fragile, or still at risk of reversal."
  );
}

export function renderResolutionTiers() {
  const rows = resolutionTiers()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.confidenceTier)}</td><td>${escapeHtml(item.resolutionTheme)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.blockingIssue)}</td><td>${item.evidenceCoverageScore}</td><td>${item.sponsorAlignmentScore}</td><td>${item.executionClarityScore}</td><td>${item.reversalRiskScore}</td><td>${item.decisionAgeDays}</td><td>${item.boardConfidenceScore}</td></tr>`
    )
    .join("");

  return shell(
    "Resolution tiers",
    `<section class="hero"><span class="eyebrow">Resolution tiers</span><h1>The real decision weakness stays visible: is it thin evidence, sponsor drift, unclear execution, reversal pressure, or stale proof?</h1><p class="lede">This route keeps each decision tied to the pressure that is actually lowering confidence, so leadership can intervene in the right place first.</p><div class="nav">${navLinks("/resolution-tiers")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Theme</th><th>Risk headline</th><th>Blocking issue</th><th>Evidence</th><th>Alignment</th><th>Clarity</th><th>Reversal</th><th>Age</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Resolution-tier view showing the dominant pressure reducing board confidence in each lane."
  );
}

export function renderConfidencePosture() {
  const rows = confidencePosture()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.compositeResolutionRiskScore}</td><td>${escapeHtml(item.owner)}</td><td>$${item.valueAtStakeMillions}M</td><td>${escapeHtml(item.nextMove)}</td></tr>`
    )
    .join("");

  return shell(
    "Confidence posture",
    `<section class="hero"><span class="eyebrow">Confidence posture</span><h1>Decision-quality interventions stay tied to one owner, one risk score, and one next operating move.</h1><p class="lede">This posture makes it clear where to strengthen evidence, align sponsors, narrow scope, reset the path, or contain reversal pressure before the next board cycle.</p><div class="nav">${navLinks("/confidence-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Risk score</th><th>Owner</th><th>Value at stake</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Confidence-posture view for sequencing decision-quality cleanup and board-confidence reinforcement."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    `<section class="hero"><span class="eyebrow">Verification</span><h1>How this decision-confidence surface is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone treats the sample like live fiduciary or legal guidance.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`,
    "Verification notes for the Board Decision Resolution Confidence Scorecard sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    `<section class="hero"><span class="eyebrow">Docs</span><h1>Board Decision Resolution Confidence Scorecard docs</h1><p class="lede">This surface packages confidence, evidence quality, sponsor alignment, execution clarity, and reversal pressure into reproducible routes and JSON outputs for board and investor reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/confidence-register</code> keeps tiers, owners, audiences, and next moves tied to one decision lane.</li><li><code>/resolution-tiers</code> compares evidence, alignment, clarity, reversal pressure, age, and confidence.</li><li><code>/confidence-posture</code> sequences corrective actions for fragile or watchlisted decisions.</li><li><code>/api/payload</code> exposes the reproducible decision-confidence packet.</li></ul></section>`,
    "Product documentation for Board Decision Resolution Confidence Scorecard and its board-facing decision-quality routes."
  );
}
