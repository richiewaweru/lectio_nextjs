import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";

import { AppShell } from "@/app/app-shell";
import "./globals.css";
import { cn } from "@/lib/utils";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Lectio Next.js",
  description:
    "Educational components and templates for rendering AI-generated textbook sections."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          display.variable,
          body.variable,
          "font-[var(--font-body)] text-foreground"
        )}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
