import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
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
