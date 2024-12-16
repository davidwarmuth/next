import { Task } from "@/app/tasks/columns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
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
} from "./ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function TaskCarousel({
  title,
  tasks,
}: {
  title: string;
  tasks?: Task[];
}) {
  const deleteTask = useMutation(api.tasks.deleteTask);
  return (
    <div className="mt-10">
      <h3 className="p-2 text-xl border-b-2">
        {title}{" "}
        <span className="text-muted-foreground text-lg">
          {tasks && "(" + tasks?.length + ")"}
        </span>
      </h3>
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[calc(100%-96px)]"
        >
          <CarouselContent>
            {tasks?.map((task) => (
              <CarouselItem
                key={task._id}
                className="sm:basis-1/2 lg:basis-1/3 grow h-inherit"
              >
                <div className="py-6 px-1 h-full">
                  <Card
                    key={task._id}
                    className="flex flex-col justify-between h-full"
                  >
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
                        {
                          new Date(task._creationTime)
                            .toISOString()
                            .split("T")[0]
                        }
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
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
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
                </div>
              </CarouselItem>
            )) || (
              <CarouselItem className="">
                <div className="py-6 px-1">
                  <Card>
                    <CardContent className="p-12 flex flex-col gap-2 items-center text-muted-foreground">
                      <ChartNoAxesColumn className="size-12 opacity-40" />
                      <CardTitle className="text-lg">No data to show</CardTitle>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
