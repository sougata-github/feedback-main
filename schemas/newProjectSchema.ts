import { z } from "zod";

export const newProjectSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(500),
  url: z.string().url(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(5000)
    .optional(),
});
