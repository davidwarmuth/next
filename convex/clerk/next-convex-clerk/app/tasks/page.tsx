"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function TasksPage() {
  const tasks = useQuery(api.tasks.get);
  return (
    <>
      <header className="p-6 text-center border-b">
        <h2 className="text-2xl font-bold">Tasks</h2>
      </header>
      <main className="container mx-auto py-10">
        <DataTable columns={columns} data={tasks || []} />
      </main>
    </>
  );
}
