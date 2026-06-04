import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the resolution-confidence summary", () => {
    const output = formatSummary({
      decisionsTracked: 6,
      lowConfidenceLanes: 4,
      reversalRiskLanes: 3,
      underEvidencedLanes: 2,
      averageBoardConfidence: 62.5,
      valueAtStakeMillions: 82,
      leadingMessage: "Decision confidence is not compounding fast enough across the executive packet."
    });

    expect(output).toContain("Board Decision Resolution Confidence Scorecard");
    expect(output).toContain("Low-confidence lanes: 4");
    expect(output).toContain("Value at stake: $82M");
  });
});
