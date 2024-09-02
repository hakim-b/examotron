"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { LayoutProps } from "~/types";
import { neobrutalism, dark } from "@clerk/themes";

function ClerkAuthProvider({ children }: LayoutProps) {
  const { theme } = useTheme();
  const baseTheme = theme === "dark" ? dark : neobrutalism;
  return <ClerkProvider appearance={{ baseTheme }}>{children}</ClerkProvider>;
}

export default ClerkAuthProvider;
