import { analyze } from "../analyze.js";
import { sampleBoardDecisionResolutionConfidence } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionResolutionConfidence, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Strengthen procurement evidence reuse, contain biotech reversal pressure, narrow over-bundled FinTech scope, clarify platform cutover paths, and keep the stable nonprofit proof cadence intact before the next board cycle."
  };
}

export function confidenceRegister() {
  return sampleBoardDecisionResolutionConfidence.map((item) => ({
    lane: item.lane,
    confidenceTier: item.confidenceTier,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    resolutionTheme: item.resolutionTheme,
    confidenceNarrative: item.confidenceNarrative,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove
  }));
}

export function resolutionTiers() {
  return sampleBoardDecisionResolutionConfidence.map((item) => ({
    lane: item.lane,
    confidenceTier: item.confidenceTier,
    resolutionTheme: item.resolutionTheme,
    riskHeadline: item.riskHeadline,
    blockingIssue: item.blockingIssue,
    evidenceArtifacts: item.evidenceArtifacts,
    evidenceCoverageScore: item.evidenceCoverageScore,
    sponsorAlignmentScore: item.sponsorAlignmentScore,
    executionClarityScore: item.executionClarityScore,
    reversalRiskScore: item.reversalRiskScore,
    decisionAgeDays: item.decisionAgeDays,
    boardConfidenceScore: item.boardConfidenceScore
  }));
}

export function confidencePosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeResolutionRiskScore: item.compositeResolutionRiskScore,
    owner: item.owner,
    valueAtStakeMillions: item.valueAtStakeMillions,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    resolutionTheme: item.resolutionTheme,
    compositeResolutionRiskScore: item.compositeResolutionRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    reversalRiskScore: item.reversalRiskScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic decision-confidence data only - no live board packets, private committee minutes, or confidential investor materials are included.",
    "Scores are modeled to show how Kinetic Gain can expose evidence weakness, sponsor misalignment, execution ambiguity, reversal pressure, and stale decision packets in one board-readable surface.",
    "All routes are read-only and demonstrate executive decision-quality diagnosis, not legal advice, fiduciary guidance, or live board instruction."
  ];
}

export function payload() {
  return {
    report,
    confidenceRegister: confidenceRegister(),
    resolutionTiers: resolutionTiers(),
    confidencePosture: confidencePosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionResolutionConfidence
  };
}
