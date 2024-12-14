import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const getTask = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
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

export const updateTask = mutation({
  args: { id: v.id("tasks"), task: v.object({
    title: v.string(),
    priority: v.string(),
    status: v.string(),
  }) },
  handler: async (ctx, args) => {
    const { id, task } = args;
    
    // Vor dem Update den aktuellen Task abrufen und ausgeben
    console.log("Before update:", await ctx.db.get(id));

    // Task aktualisieren
    await ctx.db.patch(id, task);

    // Nach dem Update den aktualisierten Task abrufen und ausgeben
    console.log("After update:", await ctx.db.get(id));
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
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
