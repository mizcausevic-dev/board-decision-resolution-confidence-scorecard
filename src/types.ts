export type ResolutionTrack =
  | "AI_GOVERNANCE"
  | "PROCUREMENT_TRUST"
  | "BIOTECH_DIAGNOSTICS"
  | "FINTECH_CONTROLS"
  | "PLATFORM_ENGINEERING"
  | "NONPROFIT_OPERATIONS";

export type ResolutionAction =
  | "STRENGTHEN_EVIDENCE"
  | "ALIGN_SPONSORS"
  | "CONTAIN_REVERSAL"
  | "NARROW_SCOPE"
  | "RESET_DECISION_PATH"
  | "ESCALATE_GAP";

export type ConfidenceTier = "STABLE" | "WATCHLIST" | "FRAGILE" | "AT_RISK";

export type ResolutionSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionResolutionConfidenceItem {
  id: string;
  lane: string;
  track: ResolutionTrack;
  action: ResolutionAction;
  confidenceTier: ConfidenceTier;
  resolutionTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  confidenceNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  opportunityMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  evidenceCoverageScore: number;
  sponsorAlignmentScore: number;
  executionClarityScore: number;
  reversalRiskScore: number;
  decisionAgeDays: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ResolutionAssessment {
  severity: ResolutionSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionResolutionConfidenceReportItem extends BoardDecisionResolutionConfidenceItem {
  evidenceAssessment: ResolutionAssessment;
  alignmentAssessment: ResolutionAssessment;
  clarityAssessment: ResolutionAssessment;
  reversalAssessment: ResolutionAssessment;
  freshnessAssessment: ResolutionAssessment;
  confidenceAssessment: ResolutionAssessment;
  compositeResolutionRiskScore: number;
}

export interface BoardDecisionResolutionConfidenceSummary {
  decisionsTracked: number;
  lowConfidenceLanes: number;
  reversalRiskLanes: number;
  underEvidencedLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionResolutionConfidenceExport {
  generatedAt: string;
  summary: BoardDecisionResolutionConfidenceSummary;
  items: BoardDecisionResolutionConfidenceReportItem[];
}

export interface BoardDecisionResolutionConfidencePayload {
  report: BoardDecisionResolutionConfidenceExport;
  confidenceRegister: ReturnType<typeof import("./services/verticalBriefService.js").confidenceRegister>;
  resolutionTiers: ReturnType<typeof import("./services/verticalBriefService.js").resolutionTiers>;
  confidencePosture: ReturnType<typeof import("./services/verticalBriefService.js").confidencePosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionResolutionConfidenceItem[];
}
