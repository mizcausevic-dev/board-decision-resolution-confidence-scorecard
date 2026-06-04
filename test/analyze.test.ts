import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleBoardDecisionResolutionConfidence } from "../src/data/sampleVerticalBrief.js";
import type { BoardDecisionResolutionConfidenceItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionResolutionConfidence.length);
  });

  it("counts low-confidence lanes", () => {
    const report = analyze(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.lowConfidenceLanes).toBeGreaterThan(0);
  });

  it("counts reversal-risk lanes", () => {
    const report = analyze(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.reversalRiskLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(82);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.decisionsTracked).toBe(0);
    expect(report.summary.averageBoardConfidence).toBe(0);
    expect(report.summary.leadingMessage).toContain("directionally credible");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: BoardDecisionResolutionConfidenceItem[] = [
      {
        id: "low-branch",
        lane: "Stable board packet",
        track: "PLATFORM_ENGINEERING",
        action: "RESET_DECISION_PATH",
        confidenceTier: "STABLE",
        resolutionTheme: "Execution clarity",
        boardQuestion: "Is the decision stable?",
        owner: "Platform engineering lead",
        audience: "Board operating committee",
        currentPosture: "Stable.",
        confidenceNarrative: "Controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low decision risk.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        opportunityMoves: ["keep it stable"],
        relatedSurfaces: ["confidence.kineticgain.com"],
        companyTags: ["Azure"],
        evidenceCoverageScore: 84,
        sponsorAlignmentScore: 82,
        executionClarityScore: 79,
        reversalRiskScore: 28,
        decisionAgeDays: 9,
        boardConfidenceScore: 83,
        valueAtStakeMillions: 4,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Watchlisted packet",
        track: "AI_GOVERNANCE",
        action: "ALIGN_SPONSORS",
        confidenceTier: "WATCHLIST",
        resolutionTheme: "Sponsor alignment",
        boardQuestion: "Where is confidence visible but not yet stable?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Watch state.",
        confidenceNarrative: "Pressured.",
        operatingReality: "Mixed.",
        riskHeadline: "Moderate decision risk.",
        blockingIssue: "Split sponsors",
        evidenceArtifacts: ["control audit"],
        opportunityMoves: ["align the sponsor group"],
        relatedSurfaces: ["governance.kineticgain.com"],
        companyTags: ["OpenAI"],
        evidenceCoverageScore: 67,
        sponsorAlignmentScore: 69,
        executionClarityScore: 63,
        reversalRiskScore: 52,
        decisionAgeDays: 21,
        boardConfidenceScore: 66,
        valueAtStakeMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Align sponsors."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].evidenceAssessment.severity).toBe("LOW");
    expect(report.items[0].confidenceAssessment.severity).toBe("LOW");
    expect(report.items[1].evidenceAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].alignmentAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].clarityAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].reversalAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].freshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].confidenceAssessment.severity).toBe("MEDIUM");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.decisionsTracked).toBe(sampleBoardDecisionResolutionConfidence.length);
  });
});
