import { TierPlanConstant } from "#/types";
import { FeatureName, PlanName } from "tier";

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL
  ? `https://${process.env.RAILWAY_STATIC_URL}`
  : "";
const HEROKU_URL = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : "";
const RENDER_URL = process.env.RENDER_EXTERNAL_URL
  ? `https://${process.env.RENDER_EXTERNAL_URL}`
  : "";

/** https://app.your-saas.com */
export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ||
  VERCEL_URL ||
  RAILWAY_STATIC_URL ||
  HEROKU_URL ||
  RENDER_URL ||
  "http://localhost:3000";

export const __DEV__ = !(process?.env.NODE_ENV === "production");

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "JK Starter";
export const CP_PREFIX = "/app";

export const DEFAULT_LOCALE = "en";

// Plans
export const TIER_FREE_PLAN_ID = "plan:free@11";
export const TIER_BUSINESS_PLAN_ID = "plan:business@7";
export const TIER_PROFESSIONAL_PLAN_ID = "plan:professional@5";

// Features
export const TIER_BASE_FEATURE_ID = "feature:base";
export const TIER_SURVEY_FEATURE_ID = "feature:survey";
export const TIER_USERS_FEATURE_ID = "feature:users";

export const tierPlanConstants: TierPlanConstant[] = [
  {
    planId: TIER_FREE_PLAN_ID as PlanName,
    promoted: false,
  },
  {
    planId: TIER_BUSINESS_PLAN_ID as PlanName,
    promoted: false,
  },
  {
    planId: TIER_PROFESSIONAL_PLAN_ID as PlanName,
    promoted: false,
  },
];

// Make sure to maintain the order of the (do not include your base price feature in this)
export const tierFeatureConstants: FeatureName[] = [
  TIER_SURVEY_FEATURE_ID,
  TIER_USERS_FEATURE_ID,
];
