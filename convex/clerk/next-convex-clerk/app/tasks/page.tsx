import { TasksFeatures } from "@/components/tasks-features";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { Gauge, List } from "lucide-react";
import Link from "next/link";

export default async function TasksPage() {
  const user = await currentUser();
  return (
    <main className="px-6 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            {user && (
              <Badge variant="secondary" className="text-sm">
                Welcome {user.firstName}!
              </Badge>
            )}
          </div>
          <div className="flex gap-4 flex-col relative">
            <span className="gradient absolute -top-[150%] -z-10 w-full aspect-square" />
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              Tasks
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Example of an TanStack Table to list all tasks with search, filter
              and sort function and an dashboard with charts to visualize the
              task data
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline" asChild>
              <Link href="/tasks/list">
                Task list <List className="size-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-4" asChild>
              <Link href="/tasks/dashboard">
                Dashboard <Gauge className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <TasksFeatures />
    </main>
  );
}
