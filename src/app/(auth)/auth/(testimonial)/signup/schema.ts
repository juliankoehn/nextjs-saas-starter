import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  language: z.string().optional(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
