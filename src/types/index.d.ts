import { type PlanName } from "tier";

export type TierPlanConstant = {
  planId: PlanName;
  promoted: boolean;
};

export type PricingTableData = {
  planId: string;
  currency: string; // usd
  interval: string; // monthly
  promoted: boolean;
  name: string;
  base: number;
  features: string[];
};

export type CurrentPlan = {
  planId: string;
  base: number;
};
