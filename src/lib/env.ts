import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TIER_BASE_URL: z.string().min(1),
    TIER_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    TIER_BASE_URL: process.env.TIER_BASE_URL,
    TIER_API_KEY: process.env.TIER_API_KEY,
  },
});
