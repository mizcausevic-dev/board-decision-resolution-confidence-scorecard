import { describe, expect, it } from "vitest";
import {
  renderConfidenceOverview,
  renderConfidencePosture,
  renderConfidenceRegister,
  renderDocs,
  renderResolutionTiers,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderConfidenceOverview()).toContain("Board Decision Resolution Confidence Scorecard");
  });

  it("renders the confidence register route", () => {
    expect(renderConfidenceRegister()).toContain("/confidence-register");
  });

  it("renders the resolution tiers route", () => {
    expect(renderResolutionTiers()).toContain("/resolution-tiers");
  });

  it("renders the confidence posture route", () => {
    expect(renderConfidencePosture()).toContain("/confidence-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic decision-confidence data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
