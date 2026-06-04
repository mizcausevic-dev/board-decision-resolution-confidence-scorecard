import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleBoardDecisionResolutionConfidence } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

for (const filename of readdirSync(fixturesDir)) {
  if (filename.endsWith(".json")) {
    rmSync(path.join(fixturesDir, filename), { force: true });
  }
}

writeFileSync(
  path.join(fixturesDir, "board-decision-resolution-confidence-scorecard.json"),
  JSON.stringify(sampleBoardDecisionResolutionConfidence, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-resolution-confidence-scorecard-clean.json"),
  JSON.stringify(
    sampleBoardDecisionResolutionConfidence.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
