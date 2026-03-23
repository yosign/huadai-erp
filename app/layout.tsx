import type { Metadata } from "next"

import { AppShell } from "@/components/app-shell"

import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const spaceGrotesk = Space_Grotesk({subsets:['latin'],variable:'--font-mono',weight:['500','700']});

export const metadata: Metadata = {
  title: "华代优服",
  description: "软著代理管理系统",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={cn("font-sans", inter.variable, spaceGrotesk.variable)}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
