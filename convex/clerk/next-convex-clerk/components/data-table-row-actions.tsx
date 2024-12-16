"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";

/* import { Task } from "@/app/tasks/columns"; */

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  /* const task = row.original; */
  const deleteTask = useMutation(api.tasks.deleteTask);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={"/tasks/" + row.getValue("actions") + "/edit"}>
            <SquarePen className="size-5" />
            Edit
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}
        <DropdownMenuItem disabled>
          <Star className="size-5" />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="px-2 py-1.5 w-full justify-start"
            >
              <Trash2 className="size-5" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                task.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DropdownMenuItem asChild>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteTask({ id: row.getValue("actions") })}
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DropdownMenuItem>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
