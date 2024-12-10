"use client";

import { RadialChart } from "@/components/radial-chart";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { List, ListPlus } from "lucide-react";
import Link from "next/link";

export default function TasksDashboardPage() {
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
    <main className="px-4 py-6 w-full container sm:mx-auto min-h-[calc(100svh-64px)]">
      <div className="pb-2 h-11 flex gap-4 items-center justify-between">
        <h2 className="ml-2 text-2xl font-bold">Dashboard of tasks</h2>
      </div>
      <div className="my-1 border-b-8 rounded-md opacity-40"></div>
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-around sm:flex-wrap">
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
      <div className="py-20 flex flex-col sm:flex-row gap-8 justify-around items-center">
        <Button asChild variant="ghost" className="h-fit flex-col">
          <Link href="/tasks/list">
            <List className="!size-32 sm:!size-40 opacity-20" />
            <span className="-mt-4 pb-4 text-muted-foreground text-xl">
              Go to list of tasks
            </span>
          </Link>
        </Button>
        <div className="min-w-40 w-[70%] border-b-8 sm:min-w-fit sm:w-fit sm:h-52 sm:border-b-0 sm:border-r-8 rounded-md opacity-60"></div>
        <Button asChild variant="ghost" className="h-fit flex-col">
          <Link href="/tasks/new">
            <ListPlus className="!size-32 sm:!size-40 opacity-20" />
            <span className="-mt-4 pb-4 text-muted-foreground text-xl">
              Create new task
            </span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
