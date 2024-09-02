import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "~/context/theme-provider";
import { LayoutProps } from "~/types";
import { AI } from "./actions";
import ClerkAuthProvider from "~/context/clerk-auth-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { clientEnv } from "~/env/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Examotron",
  description: "Concordia University Exam bank",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkAuthProvider key={clientEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <AI>
          <TRPCReactProvider>
            <ThemeProvider
              enableSystem
              defaultTheme="system"
              attribute="class"
              disableTransitionOnChange
            >
              <body className={inter.className}>{children}</body>
            </ThemeProvider>
          </TRPCReactProvider>
        </AI>
      </html>
    </ClerkAuthProvider>
  );
}
