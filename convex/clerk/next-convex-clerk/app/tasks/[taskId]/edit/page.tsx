"use client";

import { useParams } from "next/navigation";
import { TaskForm } from "@/components/task-form";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTaskPage() {
  const router = useRouter();
  const [hasReferrer, setHasReferrer] = useState(false);
  const { taskId }: { taskId: Id<"tasks"> } = useParams();
  const task = useQuery(api.tasks.getTask, { id: taskId });

  useEffect(() => {
    // Überprüfe, ob die Seite direkt aufgerufen wurde (kein Referrer)
    if (typeof document !== "undefined") {
      setHasReferrer(!!document.referrer);
    }
  }, []);

  const handleButtonClick = () => {
    // console.log("hasReferrer: ", hasReferrer);
    if (!hasReferrer) {
      router.push("/tasks/dashboard");
    } else {
      router.back();
    }
  };
  return (
    <div className="min-h-[calc(100svh-64px)] w-screen">
      <div className="px-4 py-6 sm:mx-auto container">
        <div className="pb-2 flex gap-4 items-center justify-between">
          <h2 className="ml-2 text-2xl font-bold">Edit task</h2>
          <Button variant="outline" onClick={handleButtonClick}>
            <ArrowLeft className="size-5" />
            Back
          </Button>
        </div>
        <div className="my-1 border-b-8 rounded-md opacity-40 dark:opacity-70"></div>
      </div>
      <main className="px-4 py-6 w-full container sm:mx-auto">
        <TaskForm task={task ?? undefined} id={taskId} />
      </main>
    </div>
  );
}
