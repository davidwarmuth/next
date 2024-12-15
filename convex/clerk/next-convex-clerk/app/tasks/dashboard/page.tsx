"use client";

import { RadialChart } from "@/components/radial-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Edit, List, ListPlus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function TasksDashboardPage() {
  const tasks = useQuery(api.tasks.get);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const taskCount =
    tasks?.filter(
      (task) => task.status !== "canceled" && task.status !== "backlog"
    ).length || 0;
  const todoCount = tasks?.filter((task) => task.status === "todo").length || 0;
  const progressCount =
    tasks?.filter((task) => task.status === "in progress").length || 0;
  const doneCount = tasks?.filter((task) => task.status === "done").length || 0;

  return (
    <main className="px-4 py-6 w-screen container sm:mx-auto min-h-[calc(100svh-64px)]">
      <div className="pb-4 flex gap-4 items-center justify-between">
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
      <div className="mt-10">
        <h3 className="p-2 text-xl border-b-2">Todos</h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks?.map(
            (task) =>
              task.status === "todo" && (
                <Card key={task._id} className="flex flex-col">
                  <CardHeader className="pb-3 flex-row items-start justify-between gap-2">
                    <CardTitle className="text-xl">{task.title}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="!mt-0 h-7 text-muted-foreground"
                    >
                      {task.priority}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {new Date(task._creationTime).toISOString().split("T")[0]}
                    </div>
                    <div className="flex text-muted-foreground">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-r-none"
                        asChild
                      >
                        <Link href={"/tasks/" + task._id + "/edit"}>
                          <Edit />
                        </Link>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-destructive border-l-2 rounded-l-none"
                          >
                            <Trash2 />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete this task.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => deleteTask({ id: task._id })}
                              >
                                Delete
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              )
          )}
        </div>
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
