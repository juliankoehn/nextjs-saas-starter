import { z } from "zod";

export const newProjectFormSchema = z.object({
  name: z.string().min(3),
});

export type NewProjectFormValues = z.infer<typeof newProjectFormSchema>;
