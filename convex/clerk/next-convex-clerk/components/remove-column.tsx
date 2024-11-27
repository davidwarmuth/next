import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "./ui/button";

export default function RemoveColumnButton() {
  const removeField = useMutation(api.tasks.removeField); // Verwende den Namen der Mutation als String

  const handleRemoveField = async () => {
    try {
      const result = await removeField(); // Feld, das entfernt werden soll
      console.log(result); // { success: true, message: "Field 'text' removed from all tasks." }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleRemoveField}>
      Remove isCompleted Field
    </Button>
  );
}
