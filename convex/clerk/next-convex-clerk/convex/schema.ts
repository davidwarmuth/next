import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  tasks: defineTable({
    title: v.string(),
    status: v.string(),
    priority: v.string(),
  }),
});
