import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "~/context/theme-provider";
import { LayoutProps } from "~/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Examotron",
  description: "Concordia University Exam bank",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        enableSystem
        defaultTheme="system"
        attribute="class"
        disableTransitionOnChange
      >
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
