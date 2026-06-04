import { describe, expect, it } from "vitest";
import { confidencePosture, confidenceRegister, payload, resolutionTiers, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the confidence summary", () => {
    expect(summary().decisionsTracked).toBeGreaterThan(0);
  });

  it("returns the confidence register view", () => {
    expect(confidenceRegister().length).toBeGreaterThan(0);
  });

  it("returns the resolution tiers view", () => {
    expect(resolutionTiers().length).toBeGreaterThan(0);
  });

  it("returns the confidence posture view", () => {
    expect(confidencePosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.decisionsTracked).toBeGreaterThan(0);
  });
});
