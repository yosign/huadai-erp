"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { cases, customers, incomeTrend, paymentRecords, tickets } from "@/lib/mock-data"
import { currency } from "@/lib/utils"

const ranking = [
  { label: "李明", value: 92 },
  { label: "陈静", value: 86 },
  { label: "王鹏", value: 80 },
  { label: "客服组", value: 76 },
]

export default function ReportsPage() {
  const kpis = [
    { label: "客户总数", value: `${customers.length}` },
    { label: "案件总数", value: `${cases.length}` },
    { label: "完成案件", value: `${cases.filter((item) => item.status === "已完成").length}` },
    { label: "加急案件", value: `${cases.filter((item) => item.type === "加急").length}` },
    { label: "累计回款", value: currency(paymentRecords.reduce((sum, item) => sum + item.received, 0)) },
    { label: "工单总量", value: `${tickets.length}` },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold font-mono tracking-tight leading-none">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>回款趋势柱状图</CardTitle>
            <CardDescription>近六个月经营节奏。</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ amount: { label: "回款金额", color: "var(--primary)" } }} className="h-56 w-full">
              <BarChart data={incomeTrend} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`¥${Number(value).toLocaleString()}`, "回款金额"]} />} />
                <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>进度条排行榜</CardTitle>
            <CardDescription>本月团队处理效率。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {ranking.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
