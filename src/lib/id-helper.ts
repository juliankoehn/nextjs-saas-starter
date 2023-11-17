import { nanoid } from "nanoid";

export const generateId = (prefix?: string): string => {
  const id = nanoid(10);

  return prefix ? `${prefix}_${id}` : id;
};
