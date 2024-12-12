"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { dark } from "@clerk/themes";
import { BaseThemeTaggedType } from "@clerk/types";

export function ThemedClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clerkTheme, setClerkTheme] = useState<BaseThemeTaggedType | undefined>(
    undefined
  );
  const { theme } = useTheme();

  useEffect(() => {
    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    const updateClerkTheme = () => {
      if (theme === "dark" || (theme === "system" && systemDarkMode.matches)) {
        setClerkTheme(dark);
      } else {
        setClerkTheme(undefined);
      }
    };

    updateClerkTheme();

    systemDarkMode.addEventListener("change", updateClerkTheme);

    return () => {
      systemDarkMode.removeEventListener("change", updateClerkTheme);
    };
  }, [theme]);
  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
