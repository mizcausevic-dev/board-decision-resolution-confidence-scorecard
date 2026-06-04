import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { formatSummary } from "./format.js";
import type { BoardDecisionResolutionConfidenceItem } from "./types.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.error("Usage: board-decision-resolution-confidence-scorecard <input.json> [--format summary|json]");
  process.exit(1);
}

const inputPath = args[0] ?? "fixtures/board-decision-resolution-confidence-scorecard.json";
const formatArg = args.includes("--format") ? args[args.indexOf("--format") + 1] ?? "summary" : "summary";
const items = JSON.parse(readFileSync(inputPath, "utf8")) as BoardDecisionResolutionConfidenceItem[];
const report = analyze(items);

if (formatArg === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(formatSummary(report.summary, "Board Decision Resolution Confidence Scorecard"));
}
