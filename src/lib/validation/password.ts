import { z } from "zod";

// Password requirements, you can change them as you wish
// e.g. add a REGEX to check for special characters or upper and lower case
export const zPassword = z.string().min(8).max(100);
