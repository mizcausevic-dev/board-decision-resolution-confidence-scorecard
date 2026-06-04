import type { BoardDecisionResolutionConfidenceSummary } from "./types.js";

export function formatSummary(
  summary: BoardDecisionResolutionConfidenceSummary,
  title = "Board Decision Resolution Confidence Scorecard"
) {
  return [
    title,
    `Decisions tracked: ${summary.decisionsTracked}`,
    `Low-confidence lanes: ${summary.lowConfidenceLanes}`,
    `Reversal-risk lanes: ${summary.reversalRiskLanes}`,
    `Under-evidenced lanes: ${summary.underEvidencedLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    `Leading message: ${summary.leadingMessage}`
  ].join("\n");
}
