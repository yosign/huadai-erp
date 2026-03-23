"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, ChartColumnBig, ChevronRight, ClipboardList, FilePlus2, FileText, LayoutDashboard, Menu, Receipt, ShieldCheck, Users, Wallet } from "lucide-react"
import { useMemo, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { href: "/", label: "仪表盘", icon: LayoutDashboard },
  { href: "/customers", label: "客户列表", icon: Users },
  { href: "/customers/new", label: "新建客户", icon: Building2 },
  { href: "/cases", label: "案件列表", icon: ClipboardList },
  { href: "/cases/new", label: "新建案件", icon: FilePlus2 },
  { href: "/contracts", label: "合同列表", icon: FileText },
  { href: "/finance", label: "收款管理", icon: Wallet },
  { href: "/finance/invoices", label: "开票记录", icon: Receipt },
  { href: "/services", label: "工单列表", icon: ClipboardList },
  { href: "/reports", label: "数据看板", icon: ChartColumnBig },
  { href: "/system", label: "权限管理", icon: ShieldCheck },
]

function ShellNav({ collapsed, pathname }: { collapsed: boolean; pathname: string }) {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
        return (
          <Button
            key={item.href}
            variant="ghost"
            render={<Link href={item.href} />}
            className={cn("w-full justify-start gap-3 rounded-xl px-3 py-5 text-sm", active && "bg-accent text-accent-foreground", collapsed && "justify-center px-0")}
          >
            <item.icon className="size-4" />
            {!collapsed ? <span>{item.label}</span> : null}
          </Button>
        )
      })}
    </nav>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean)
    const labelMap: Record<string, string> = { customers: "客户列表", cases: "案件列表", contracts: "合同列表", finance: "收款管理", invoices: "开票记录", services: "工单列表", reports: "数据看板", system: "权限管理", new: "新建" }
    if (segments.length === 0) return [{ href: "/", label: "仪表盘" }]
    return segments.map((segment, index) => ({ href: `/${segments.slice(0, index + 1).join("/")}`, label: labelMap[segment] ?? segment }))
  }, [pathname])

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className={cn("hidden border-r border-border bg-sidebar px-4 pt-[9px] pb-5 backdrop-blur md:flex md:flex-col", collapsed ? "md:w-24" : "md:w-72")}>
          <div className="flex items-center justify-between gap-3">
            {!collapsed ? (
              <div>
                <div className="text-lg font-semibold tracking-tight">华代优服</div>
                <div className="text-sm text-muted-foreground">软著代理管理系统</div>
              </div>
            ) : (
              <div className="text-lg font-semibold">华代</div>
            )}
            <Button variant="ghost" size="icon-sm" onClick={() => setCollapsed((value) => !value)} aria-label="切换侧边栏">
              <Menu className="size-4" />
            </Button>
          </div>
          <Separator className="mt-4 mb-4" />
          <div className="flex-1">
            <ShellNav collapsed={collapsed} pathname={pathname} />
          </div>
          <div className="mt-4 flex items-center gap-3 border border-border bg-muted p-3">
            <Avatar size="sm">
              <AvatarFallback>管</AvatarFallback>
            </Avatar>
            {!collapsed ? (
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">管理后台</div>
                <div className="truncate text-xs text-muted-foreground">今日值班：李明</div>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <Menu className="size-4" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 border-r border-border bg-sidebar p-0">
                      <SheetHeader className="border-b border-border">
                        <SheetTitle>华代优服</SheetTitle>
                      </SheetHeader>
                      <div className="p-4">
                        <ShellNav collapsed={false} pathname={pathname} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                  <Link href="/" className="font-medium text-foreground">
                    首页
                  </Link>
                  {crumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center gap-1">
                      <ChevronRight className="size-3.5" />
                      {index === crumbs.length - 1 ? <span className="font-medium text-foreground">{crumb.label}</span> : <Link href={crumb.href}>{crumb.label}</Link>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <div className="text-right text-sm">
                  <div className="font-medium">本周目标回款</div>
                  <div className="text-muted-foreground">¥ 68,000 / ¥ 92,000</div>
                </div>
                <Avatar>
                  <AvatarFallback>华</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
