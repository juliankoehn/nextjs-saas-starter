import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TIER_BASE_URL: z.string().min(1),
    TIER_API_KEY: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().int().positive(),
    SMTP_SECURE_ENABLED: z.boolean().optional(),
    SMTP_USERNAME: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    // Default Sender
    SMTP_DEFAULT_FROM: z
      .string()
      .optional()
      .default(`julian.pro <me@julian.pro>`),
  },
  client: {},
  runtimeEnv: {
    TIER_BASE_URL: process.env.TIER_BASE_URL,
    TIER_API_KEY: process.env.TIER_API_KEY,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE_ENABLED: process.env.SMTP_SECURE_ENABLED,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_DEFAULT_FROM: process.env.SMTP_DEFAULT_FROM,
  },
});
