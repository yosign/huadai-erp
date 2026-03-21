import type { Metadata } from "next"

import { AppShell } from "@/components/app-shell"

import "./globals.css"

export const metadata: Metadata = {
  title: "华代优服",
  description: "软著代理管理系统",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
