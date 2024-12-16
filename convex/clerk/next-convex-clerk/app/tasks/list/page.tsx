"use client";

import { useQuery } from "convex/react";
import { DataTable } from "../data-table";
import { api } from "@/convex/_generated/api";
import { columns } from "../columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gauge, ListPlus } from "lucide-react";

export default function TaskListPage() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="px-4 py-6 w-screen container sm:mx-auto min-h-[calc(100svh-64px)]">
      <div className="pb-4 flex gap-2 items-center justify-between flex-wrap">
        <h2 className="ml-2 text-3xl">List of tasks</h2>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/tasks/dashboard" aria-label="Go to dashboard">
              <Gauge className="!size-5" />
              Dashboard
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
      <DataTable columns={columns} data={tasks || []} />
    </main>
  );
}
