"use client";

import { useQuery } from "convex/react";
import { DataTable } from "../data-table";
import { api } from "@/convex/_generated/api";
import { columns } from "../columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListPlus } from "lucide-react";

export default function TaskListPage() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="px-4 py-6 w-full container sm:mx-auto min-h-[calc(100svh-64px)]">
      <div className="pb-2 flex gap-4 items-center justify-between">
        <h2 className="ml-2 text-2xl font-bold">List of tasks</h2>
        <Button asChild>
          <Link href="/tasks/new" aria-label="Create new task">
            <ListPlus className="!size-5" />
            New
          </Link>
        </Button>
      </div>
      <div className="my-1 border-b-8 rounded-md opacity-40"></div>
      <DataTable columns={columns} data={tasks || []} />
    </main>
  );
}
