import type {
  BoardDecisionResolutionConfidenceExport,
  BoardDecisionResolutionConfidenceItem,
  BoardDecisionResolutionConfidenceReportItem,
  ResolutionAssessment,
  ResolutionSeverity
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ResolutionAssessment {
  let severity: ResolutionSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessLow(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ResolutionAssessment {
  return assessHigh(
    100 - score,
    100 - healthy,
    100 - pressured,
    healthyMessage,
    pressureMessage,
    highMessage
  );
}

export function analyze(
  items: BoardDecisionResolutionConfidenceItem[],
  options: { now?: string } = {}
): BoardDecisionResolutionConfidenceExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionResolutionConfidenceReportItem[] = items.map((item) => {
    const evidenceAssessment = assessLow(
      item.evidenceCoverageScore,
      76,
      62,
      "Evidence coverage is strong enough to support a stable board decision.",
      "Evidence coverage is usable, but still thin enough to justify another proof pass.",
      "Evidence coverage is too weak for a stable board-facing decision."
    );

    const alignmentAssessment = assessLow(
      item.sponsorAlignmentScore,
      78,
      64,
      "Sponsor alignment is strong enough to keep the decision settled.",
      "Sponsor alignment is visible, though not yet strong enough to prevent churn.",
      "Sponsor alignment is too weak to trust this decision will stay closed."
    );

    const clarityAssessment = assessLow(
      item.executionClarityScore,
      74,
      58,
      "Execution clarity is strong enough to support a credible closeout path.",
      "Execution clarity is visible, but still loose enough to create operating drag.",
      "Execution clarity is too weak for the decision to stay closed."
    );

    const reversalAssessment = assessHigh(
      item.reversalRiskScore,
      36,
      58,
      "Reversal risk is contained enough in this lane.",
      "Reversal risk is visible and should be contained before the next review cycle.",
      "Reversal risk is high enough to make the decision unstable."
    );

    const freshnessAssessment = assessHigh(
      item.decisionAgeDays,
      14,
      24,
      "The decision evidence is still fresh enough to defend cleanly.",
      "The decision packet is aging and should be refreshed soon.",
      "The decision packet is stale enough to weaken board confidence."
    );

    const confidenceAssessment = assessLow(
      item.boardConfidenceScore,
      76,
      60,
      "Board confidence is strong enough in this lane.",
      "Board confidence is visible, though still too soft to call fully settled.",
      "Board confidence is too weak for this decision to be treated as stable."
    );

    const compositeResolutionRiskScore =
      Math.round(
        ((100 - item.evidenceCoverageScore +
          100 - item.sponsorAlignmentScore +
          100 - item.executionClarityScore +
          item.reversalRiskScore +
          Math.min(item.decisionAgeDays * 2, 100) +
          100 - item.boardConfidenceScore) /
          6) *
          10
      ) / 10;

    return {
      ...item,
      evidenceAssessment,
      alignmentAssessment,
      clarityAssessment,
      reversalAssessment,
      freshnessAssessment,
      confidenceAssessment,
      compositeResolutionRiskScore
    };
  });

  const lowConfidenceLanes = reportItems.filter((item) => item.confidenceAssessment.severity !== "LOW").length;
  const reversalRiskLanes = reportItems.filter((item) => item.reversalAssessment.severity !== "LOW").length;
  const underEvidencedLanes = reportItems.filter((item) => item.evidenceAssessment.severity !== "LOW").length;
  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;
  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    reversalRiskLanes >= 2
      ? "Too many board-facing decisions can still reverse after they appear approved."
      : lowConfidenceLanes >= 3
        ? "Decision confidence is not compounding fast enough across the executive packet."
        : "The board decision estate is directionally credible, though a few lanes still need stronger proof, sponsor unity, or cleaner execution paths.";

  return {
    generatedAt,
    summary: {
      decisionsTracked: reportItems.length,
      lowConfidenceLanes,
      reversalRiskLanes,
      underEvidencedLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionResolutionConfidenceItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
