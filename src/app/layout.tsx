
import type { Metadata } from "next";
import {Inter} from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthSessionProvider } from "@/providers/session-provider";

const inter = Inter({
  subsets: ["latin"]
  
});

export const metadata: Metadata = {
  title: "Pathao",
  description: "Pathao Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className,"antialiased min-h-screen")}
      >
       <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
