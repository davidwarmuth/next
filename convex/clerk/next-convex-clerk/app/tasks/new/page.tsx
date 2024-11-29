import { NewTaskForm } from "@/components/new-task-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTaskPage() {
  return (
    <>
      <header className="border-b">
        <div className="px-2 py-6 sm:mx-auto container flex gap-2 justify-between">
          <h2 className="text-2xl font-bold">Create new task</h2>
          <Button asChild variant="outline">
            <Link href="/tasks">
              <ArrowLeft className="size-5" />
              Back
            </Link>
          </Button>
        </div>
      </header>
      <main className="px-2 py-6 w-full container sm:mx-auto">
        <NewTaskForm />
      </main>
    </>
  );
}
