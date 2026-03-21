import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cases, customers, incomeTrend, paymentRecords, tickets } from "@/lib/mock-data"
import { currency } from "@/lib/utils"

const ranking = [
  { label: "李明", value: 92 },
  { label: "陈静", value: 86 },
  { label: "王鹏", value: 80 },
  { label: "客服组", value: 76 },
]

export default function ReportsPage() {
  const maxIncome = Math.max(...incomeTrend.map((item) => item.amount))
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
              <CardTitle>{item.value}</CardTitle>
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
            <Separator className="mb-4 bg-border/40" />
            <div className="grid gap-4 md:grid-cols-6">
              {incomeTrend.map((item) => (
                <Card key={item.month} size="sm">
                  <CardContent className="p-4">
                    <div className="mb-4 text-sm font-medium">{item.month}</div>
                    <div className="flex h-40 items-end rounded-md bg-muted p-2">
                      <div className="w-full rounded-md bg-primary" style={{ height: `${(item.amount / maxIncome) * 100}%` }} />
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">{currency(item.amount)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
