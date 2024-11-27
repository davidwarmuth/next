import clsx from "clsx";
import {
  Circle,
  CircleCheckBig,
  CircleHelp,
  CircleOff,
  Timer,
} from "lucide-react";
import { stati } from "../data/filter";

export function StatusIcon({ status }: { status: string }) {
  const iconStyle = "size-4 text-muted-foreground ";
  switch (status) {
    case "backlog":
      return <CircleHelp className={iconStyle + "text-neutral-500"} />;
    case "todo":
      return <Circle className={iconStyle + "text-neutral-900"} />;
    case "in progress":
      return <Timer className={iconStyle + "text-yellow-500"} />;
    case "done":
      return <CircleCheckBig className={iconStyle + "!text-green-700"} />;
    case "canceled":
      return <CircleOff className={iconStyle + "text-red-600/80"} />;
    default:
      return null;
  }
}

export function TaskStatus({ status }: { status: string }) {
  const verifiedStatus = stati.find((stat) => stat.value === status);

  if (!verifiedStatus) {
    return null;
  }
  return (
    <div
      className={clsx(
        "px-2 py-1 w-fit flex items-center gap-2 rounded-md ",
        status === "done" && " border-green-700/80 text-green-700",
        status === "in progress" &&
          " border-yellow-500/60 text-yellow-500" /*border-orange-500/70 text-orange-500*/,
        status === "todo" && " border-neutral-900/70 text-neutral-900",
        status === "canceled" && " border-red-600/60 text-red-600/80",
        status === "backlog" && " border-neutral-300/90 text-neutral-500"
      )}
    >
      <StatusIcon status={status} />
      <span>{verifiedStatus.label}</span>
    </div>
  );
}
