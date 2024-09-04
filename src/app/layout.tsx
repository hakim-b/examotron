import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "~/context/theme-provider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Examotron",
  description: "Concordia University Exam bank",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["examotron", "Concordia exam bank"],
  openGraph: {
    images: {
      url:
        "http://localhost:3000/api/og" ||
        "https://examotron-aaeab.web.app/api/og",
    },
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
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
