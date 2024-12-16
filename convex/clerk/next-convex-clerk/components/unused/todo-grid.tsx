import { Task } from "@/app/tasks/columns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChartNoAxesColumn, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function TodoGrid({ tasks }: { tasks: Task[] }) {
  const deleteTask = useMutation(api.tasks.deleteTask);

  return (
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
                            This action cannot be undone. This will permanently
                            delete this task.
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
        ) || (
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardContent className="p-12 flex flex-col gap-2 items-center text-muted-foreground">
              <ChartNoAxesColumn className="size-12 opacity-40" />
              <CardTitle className="text-lg">No data to show</CardTitle>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
