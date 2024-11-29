import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Please insert a title"),
  priority: z.string().min(1, "Please select a priority"),
  status: z.string().min(1, "Please select a status"),
});
