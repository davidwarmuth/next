"use client";

import { useEffect, useState } from "react";
import { taskFormSchema } from "@/schema/taskForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronsUpDown,
  LoaderCircle,
  Save,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { priorities, stati } from "@/data/filter";
import { useRouter } from "next/navigation";
import { Task } from "@/app/tasks/columns";
import { Id } from "@/convex/_generated/dataModel";
import { Progress } from "./ui/progress";

export function TaskForm({ task, id }: { task?: Task; id?: Id<"tasks"> }) {
  const [hasReferrer, setHasReferrer] = useState(false);
  const [sending, isSending] = useState(false);
  const [submitted, isSubmitted] = useState(false);
  const [error, isError] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mutation hook for creating a new task
  const createTask = useMutation(api.tasks.createTask);

  // Mutation hook for updating a existing task
  const updateTask = useMutation(api.tasks.updateTask);

  const router = useRouter();

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task
      ? {
          title: task.title,
          priority: task.priority,
          status: task.status,
        }
      : {
          title: "",
          priority: "",
          status: "",
        },
  });

  // Update form values if the task prop changes
  useEffect(() => {
    // Überprüfe, ob die Seite direkt aufgerufen wurde (kein Referrer)
    if (typeof document !== "undefined") {
      setHasReferrer(!!document.referrer);
    }
    if (task) {
      form.reset({
        title: task.title,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task, form]);

  async function onSubmit(values: z.infer<typeof taskFormSchema>) {
    isSending(true);
    isError(false);
    try {
      // Invoke the mutation
      if (task && id) {
        await updateTask({ id: id, task: values });
      } else {
        await createTask(values);
      }
      isSubmitted(true);

      let start: number | null = null;
      const duration = 2000; // 2 seconds

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const newValue = Math.min((elapsed / duration) * 100, 100);
        setProgress(newValue);

        if (elapsed < duration) {
          requestAnimationFrame(step);
        } else {
          // Befehl am Ende der Animation ausführen
          setTimeout(() => {
            if (!hasReferrer) {
              router.push("/tasks/dashboard");
            } else {
              router.back();
            }
          }, 500); // 500ms Verzögerung
        }
      };

      requestAnimationFrame(step);
    } catch (e) {
      console.error(e);
      isError(true);
    } finally {
      isSending(false);
    }
  }

  if (error) {
    return (
      <div>
        <Alert
          variant="destructive"
          className="bg-red-200/40 dark:bg-red-200/80"
        >
          <AlertCircle className="size-5" />
          <AlertTitle>
            Task could not be {task ? "updated" : "created"}!
          </AlertTitle>
          <AlertDescription>
            Please contact our support or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  } else if (submitted) {
    return (
      <div>
        <Alert className="bg-green-100/60 dark:bg-green-950/40 border-green-600 text-green-600">
          <CheckCircle2 className="size-5 stroke-green-600" />
          <AlertTitle>
            Task {task ? "updated" : "created"} successfully!
          </AlertTitle>
          <AlertDescription>
            You will be redirected automatically after 3 seconds.
          </AlertDescription>
          <Progress value={progress} className="mt-2 h-1" />
        </Alert>
      </div>
    );
  } else {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {form.formState.errors.root && (
            <div className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Title</FormLabel>
                <FormControl>
                  <Input {...field} className="text-sm" name="title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-8">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base">Priority</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? priorities.find(
                                (priority) => priority.value === field.value
                              )?.label
                            : "Select priority"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="mx-2 p-0 w-[calc(100vw-16px)] sm:w-fit">
                      <Command>
                        <CommandInput
                          name="priority"
                          placeholder="Search priority..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No priority found.</CommandEmpty>
                          <CommandGroup>
                            {priorities.map((priority) => (
                              <CommandItem
                                value={priority.label}
                                key={priority.value}
                                onSelect={() => {
                                  form.setValue("priority", priority.value);
                                }}
                              >
                                {priority.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    priority.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base">Status</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? stati.find(
                                (status) => status.value === field.value
                              )?.label
                            : "Select status"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="mx-2 p-0 w-[calc(100vw-16px)] sm:w-fit">
                      <Command>
                        <CommandInput
                          name="status"
                          placeholder="Search status..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No status found.</CommandEmpty>
                          <CommandGroup>
                            {stati.map((status) => (
                              <CommandItem
                                value={status.label}
                                key={status.value}
                                onSelect={() => {
                                  form.setValue("status", status.value);
                                }}
                              >
                                {status.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    status.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              className="gap-2"
              disabled={form.formState.isSubmitting}
            >
              {sending ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <Save className="size-5" />
              )}
              Save
            </Button>
          </div>
        </form>
      </Form>
    );
  }
}
