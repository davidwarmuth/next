import clsx from "clsx";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Signal,
  SignalLow,
  SignalMedium,
} from "lucide-react";

export function PriorityIcon({ priority }: { priority: string }) {
  const iconStyle = "size-4 text-muted-foreground ";
  switch (priority) {
    case "Low":
      return <span>!</span>;
      return <ArrowDown className={iconStyle} />;
      return <SignalLow className={iconStyle} />;
    case "Medium":
      return <span>!!</span>;
      return <ArrowRight className={iconStyle} />;
      return <SignalMedium className={iconStyle} />;
    case "High":
      return <span>!!!</span>;
      return <ArrowUp className={iconStyle} />;
      return <Signal className={iconStyle} />;
    default:
      return null;
  }
}

export function TaskPriority({ priority }: { priority: string }) {
  return (
    <div
      className={clsx(
        "px-2 py-1 w-fit flex items-center gap-2 rounded-lg capitalize",
        priority === "low" &&
          "text-neutral-400 dark:text-neutral-400 border-neutral-300",
        priority === "medium" &&
          "text-neutral-600 dark:text-neutral-300 border-neutral-400",
        priority === "high" && "text-foreground border-neutral-700"
      )}
    >
      {/* <PriorityIcon priority={priority} /> */}
      <span>{priority}</span>
    </div>
  );
}
