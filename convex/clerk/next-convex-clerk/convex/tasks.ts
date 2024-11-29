import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const createTask = mutation({
  args: { title: v.string(), priority: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      priority: args.priority,
      status: args.status,
    });
    // do something with `taskId`
    console.log("Created new Task with ID: ", taskId);
  },
});

// Mutation zum Entfernen eines bestimmten Feldes aus allen Aufgaben
export const removeField = mutation(async ({ db }) => {
  // Alle Aufgaben abfragen
  const tasks = await db.query("tasks").collect();

  const fieldName = "isCompleted";

  // Alle Aufgaben aktualisieren
  const updates = tasks.map(async (task) => {
    const { _id, ...rest } = task; // Alle Felder außer _id
    if (fieldName in rest) {
      delete rest[fieldName]; // Das angegebene Feld entfernen
    }
    return db.replace(_id, rest); // Aktualisiertes Dokument speichern
  });

  // Alle Updates gleichzeitig ausführen
  await Promise.all(updates);
  return {
    success: true,
    message: `Field '${fieldName}' removed from all tasks.`,
  };
});
