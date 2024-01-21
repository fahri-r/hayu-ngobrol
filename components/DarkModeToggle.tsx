"use client";

import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export default function DarkModeToggle() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setTheme(theme ?? "light");
  }, []);

  const handleTheme = (pressed: boolean) => {
    if (pressed) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Toggle
      data-state="off"
      aria-label="Toggle bold"
      onPressedChange={handleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
