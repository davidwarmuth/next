"use client";

import { NewTaskForm } from "@/components/new-task-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewTaskPage() {
  const router = useRouter();
  const [hasReferrer, setHasReferrer] = useState(false);

  useEffect(() => {
    // Überprüfe, ob die Seite direkt aufgerufen wurde (kein Referrer)
    if (typeof document !== "undefined") {
      setHasReferrer(!!document.referrer);
    }
  }, []);

  const handleButtonClick = () => {
    console.log("hasReferrer: ", hasReferrer);
    if (!hasReferrer) {
      router.push("/tasks/dashboard");
    } else {
      router.back();
    }
  };
  return (
    <div className="min-h-[calc(100svh-64px)]">
      <section className="border-b">
        <div className="px-2 py-6 sm:mx-auto container flex gap-2 justify-between">
          <h2 className="text-2xl font-bold">Create new task</h2>
          <Button variant="outline" onClick={handleButtonClick}>
            <ArrowLeft className="size-5" />
            Back
          </Button>
        </div>
      </section>
      <main className="px-2 py-6 w-full container sm:mx-auto">
        <NewTaskForm />
      </main>
    </div>
  );
}
