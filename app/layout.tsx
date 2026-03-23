import type { Metadata } from "next"

import { AppShell } from "@/components/app-shell"

import "./globals.css"
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "华代优服",
  description: "软著代理管理系统",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={cn("font-sans", inter.variable)}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
