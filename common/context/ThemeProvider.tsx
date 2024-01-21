"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import ChatConfig from "@/chat.config";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} defaultTheme={ChatConfig.DEFAULT_LANGUAGE}>
      {children}
    </NextThemesProvider>
  );
}
