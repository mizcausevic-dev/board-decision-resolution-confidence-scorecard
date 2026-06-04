# Architecture

Board Decision Resolution Confidence Scorecard is a static-friendly TypeScript executive-intelligence surface for exposing weak proof, sponsor drift, execution ambiguity, reversal pressure, and stale decision packets across the broader Kinetic Gain suite.

## Routes

- `/`
- `/confidence-register`
- `/resolution-tiers`
- `/confidence-posture`
- `/verification`
- `/docs`

## Core flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic board-facing decisions and modeled confidence pressure.
2. `src/analyze.ts` converts those signals into evidence, alignment, clarity, freshness, reversal, and confidence assessments plus one composite decision-quality risk score.
3. `src/services/verticalBriefService.ts` exposes reusable views for summary, confidence register, resolution tiers, confidence posture, risk map, and verification notes.
4. `src/services/render.ts` turns those views into one static-friendly executive UI.
5. `scripts/prerender.ts` writes the public HTML and JSON payloads into `dist-static/` for GitHub Pages packaging.
