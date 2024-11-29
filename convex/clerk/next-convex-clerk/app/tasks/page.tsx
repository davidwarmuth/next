"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { RadialChart } from "@/components/radial-chart";

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
      <header className="p-6 text-center border-b">
        <h2 className="text-2xl font-bold">Tasks</h2>
      </header>
      <main className="w-full container sm:mx-auto px-2 py-6">
        <div className="container flex flex-col md:flex-row md:justify-around">
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
