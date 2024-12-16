"use client";

import { RadialChart } from "@/components/radial-chart";
import { TaskCarousel } from "@/components/task-carousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { List, ListPlus } from "lucide-react";
import Link from "next/link";

export default function TasksDashboardPage() {
  const tasks = useQuery(api.tasks.get);
  const todo = tasks?.filter((task) => task.status === "todo");
  const progress = tasks?.filter((task) => task.status === "in progress");
  const done = tasks?.filter((task) => task.status === "done");

  const taskCount =
    tasks?.filter(
      (task) => task.status !== "canceled" && task.status !== "backlog"
    ).length || 0;
  const todoCount = todo?.length || 0;
  const progressCount = progress?.length || 0;
  const doneCount = done?.length || 0;

  return (
    <main className="px-4 py-6 w-screen container sm:mx-auto min-h-[calc(100svh-64px)]">
      <div className="pb-4 flex gap-2 items-center justify-between flex-wrap">
        <h2 className="ml-2 text-3xl">Dashboard of tasks</h2>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/tasks/list" aria-label="Go to dashboard">
              <List className="!size-5" />
              List
            </Link>
          </Button>
          <Button asChild>
            <Link href="/tasks/new" aria-label="Create new task">
              <ListPlus className="!size-5" />
              New
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-b-8 rounded-md opacity-40 dark:opacity-70"></div>
      <div className="mt-10">
        <h3 className="p-2 text-xl border-b-2">Statistics</h3>
        <Card className="mt-6 flex flex-col sm:flex-row sm:justify-around sm:flex-wrap">
          <RadialChart
            value={todoCount}
            reference={taskCount}
            valueLabel="Todos"
            referenceLabel="Tasks"
            variant="chart-3"
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
        </Card>
      </div>
      <TaskCarousel title="Todos" tasks={todo} />
      <TaskCarousel title="In Progress" tasks={progress} />
      <TaskCarousel title="Done" tasks={done} />
      <div className="py-20 flex flex-col sm:flex-row gap-8 justify-around items-center">
        <Button asChild variant="ghost" className="h-fit flex-col">
          <Link href="/tasks/list">
            <List className="!size-32 sm:!size-40 opacity-20" />
            <span className="-mt-4 pb-4 text-muted-foreground text-xl">
              Go to list of tasks
            </span>
          </Link>
        </Button>
        <div className="min-w-40 w-[70%] border-b-8 sm:min-w-fit sm:w-fit sm:h-52 sm:border-b-0 sm:border-r-8 rounded-md opacity-60 dark:opacity-80"></div>
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
