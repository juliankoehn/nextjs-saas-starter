import { Toaster } from "#/components/ui/toaster";
import { cn } from "#/utils/dom-utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={cn("min-h-screen bg-background")}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
