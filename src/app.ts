import express from "express";
import {
  confidencePosture,
  confidenceRegister,
  payload,
  resolutionTiers,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";
import {
  renderConfidenceOverview,
  renderConfidencePosture,
  renderConfidenceRegister,
  renderDocs,
  renderResolutionTiers,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderConfidenceOverview()));
  app.get("/confidence-register", (_req, res) => res.type("html").send(renderConfidenceRegister()));
  app.get("/resolution-tiers", (_req, res) => res.type("html").send(renderResolutionTiers()));
  app.get("/confidence-posture", (_req, res) => res.type("html").send(renderConfidencePosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/confidence-register", (_req, res) => res.json(confidenceRegister()));
  app.get("/api/resolution-tiers", (_req, res) => res.json(resolutionTiers()));
  app.get("/api/confidence-posture", (_req, res) => res.json(confidencePosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`board-decision-resolution-confidence-scorecard listening on http://127.0.0.1:${port}`);
  });
}
