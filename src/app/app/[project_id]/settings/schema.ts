import { z } from "zod";

export const generalFormSchema = z.object({
  name: z.string().min(3).max(50),
});

export type GeneralFormSchema = z.infer<typeof generalFormSchema>;
