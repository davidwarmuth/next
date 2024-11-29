"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { RadialChart } from "@/components/radial-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListPlus } from "lucide-react";

export default function TasksPage() {
  const tasks = useQuery(api.tasks.get);

  const taskCount =
    tasks?.filter(
      (task) => task.status !== "canceled" && task.status !== "backlog"
    ).length || 0;
  const todoCount = tasks?.filter((task) => task.status === "todo").length || 0;
  const progressCount =
    tasks?.filter((task) => task.status === "in progress").length || 0;
  const doneCount = tasks?.filter((task) => task.status === "done").length || 0;

  return (
    <>
      <header className="border-b">
        <div className="px-2 py-6 sm:mx-auto container flex gap-2 justify-between">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Button asChild>
            <Link href="/tasks/new" aria-label="Create new task">
              <ListPlus className="!size-5" />
              Add
            </Link>
          </Button>
        </div>
      </header>
      <main className="px-2 py-6 w-full container sm:mx-auto">
        <div className="flex flex-col md:flex-row md:justify-around">
          <RadialChart
            value={todoCount}
            reference={taskCount}
            valueLabel="Todos"
            referenceLabel="Tasks"
          />
          <RadialChart
            value={progressCount}
            reference={taskCount}
            valueLabel="In Progress"
            referenceLabel="Tasks"
            variant="chart-4"
          />
          <RadialChart
            value={doneCount}
            reference={taskCount}
            valueLabel="Done"
            referenceLabel="Tasks"
            variant="chart-2"
          />
        </div>
        <DataTable columns={columns} data={tasks || []} />
      </main>
    </>
  );
}
