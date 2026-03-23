"use client"

import Link from "next/link"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cases, customers, incomeTrend, paymentRecords, tickets, todoReminders } from "@/lib/mock-data"
import { currency, getCustomerName, getStatusClass } from "@/lib/utils"

export default function Page() {
  const monthlyPayments = paymentRecords.reduce((sum, item) => sum + item.received, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">软著代理经营总览</h1>
          <p className="text-sm text-muted-foreground">围绕客户、案件、财务和服务的日常协同看板。</p>
        </div>
        <Link href="/cases/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90" style={{color: 'var(--primary-foreground)'}}>
          新建案件
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="gap-2 pb-3"><CardHeader><CardDescription>本月新签客户</CardDescription><CardTitle className="mt-1.5 text-3xl font-semibold font-mono tracking-tight leading-none">8</CardTitle></CardHeader><CardContent className="text-sm text-primary">较上月 +18%</CardContent></Card>
        <Card className="gap-2 pb-3"><CardHeader><CardDescription>在办案件数</CardDescription><CardTitle className="mt-1.5 text-3xl font-semibold font-mono tracking-tight leading-none">{cases.filter((item) => item.status !== "已完成").length}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">覆盖 {customers.length} 家客户</CardContent></Card>
        <Card className="gap-2 pb-3"><CardHeader><CardDescription>本月回款</CardDescription><CardTitle className="mt-1.5 text-3xl font-semibold font-mono tracking-tight leading-none">{currency(monthlyPayments)}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">到账率 72%</CardContent></Card>
        <Card className="gap-2 pb-3"><CardHeader><CardDescription>待处理工单</CardDescription><CardTitle className="mt-1.5 text-3xl font-semibold font-mono tracking-tight leading-none">{tickets.filter((item) => item.status !== "已处理").length}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">客服与案件协同处理中</CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>月度收入趋势</CardTitle>
          <CardDescription>近6个月回款金额走势</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ amount: { label: "回款金额", color: "var(--primary)" } }} className="h-56 w-full">
            <AreaChart data={incomeTrend} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis width={42} tickLine={false} axisLine={false} tickMargin={4} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`¥${Number(value).toLocaleString()}`, "回款金额"]} />} />
              <Area type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={2} fill="url(#fillAmount)" dot={{ fill: "var(--primary)", r: 3 }} activeDot={{ r: 5 }} isAnimationActive={false} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>案件看板预览</CardTitle>
            <CardDescription>优先关注审查中和下证中的项目。</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>案件名</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>截止</TableHead>
                  <TableHead>负责人</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.slice(0, 5).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{getCustomerName(item.client)}</TableCell>
                    <TableCell><Badge className={getStatusClass(item.status)}>{item.status}</Badge></TableCell>
                    <TableCell>{item.deadline}</TableCell>
                    <TableCell>{item.manager}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>待办提醒</CardTitle>
            <CardDescription>今日需要优先处理的事项。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todoReminders.map((item) => (
              <Card key={item.id} size="sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">{item.title}</div>
                    <Badge className={getStatusClass(item.status)}>{item.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
