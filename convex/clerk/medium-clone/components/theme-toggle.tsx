"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        const theme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(theme);
        toast("Changed theme to: " + theme);
      }}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="size-4 text-orange-300" />
      ) : (
        <MoonIcon className="size-4 text-sky-950" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
