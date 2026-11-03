export type CrmStatus = "ha" | "excel" | "yoq";
export type SalesStatus = "ha" | "ozim" | "operator";
export type PackagingStatus = "zor" | "ortacha" | "yomon";

export interface Answers {
  isOwner: string;
  hasCrm: CrmStatus;
  salesTeam: SalesStatus;
  packaging: PackagingStatus;
  industry: string;
  platform: string;
  targetRevenue: number;
  averageCheck: number;
  conversionRate: number;
}

export interface PlatformBenchmark {
  id?: string;
  name: string;
  minCpl: number;
  maxCpl: number;
  icon: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
}

export interface AuditCalculationResult {
  targetRevenue: number;
  averageCheck: number;
  neededCustomers: number;
  conversionRate: number;
  neededLeads: number;
  crmPenalty: number;
  salesPenalty: number;
  packagingPenalty: number;
  totalPenaltyPercent: number;
  penaltyMultiplier: number;
  minCpl: number;
  maxCpl: number;
  minBudget: number;
  maxBudget: number;
  baseMinBudget: number;
  baseMaxBudget: number;
  potentialSavings: number;
  riskLevel: "low" | "medium" | "high";
  riskLabel: string;
  riskScore: number;
  crmDisplay: string;
  salesDisplay: string;
  packDisplay: string;
  bench: PlatformBenchmark;
}

