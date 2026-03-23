import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cases, customers, incomeTrend, paymentRecords, tickets, todoReminders } from "@/lib/mock-data"
import { currency, getCustomerName, getStatusClass } from "@/lib/utils"

export default function Page() {
  const monthlyPayments = paymentRecords.reduce((sum, item) => sum + item.received, 0)
  const maxIncome = Math.max(...incomeTrend.map((item) => item.amount))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">软著代理经营总览</h1>
          <p className="text-sm text-muted-foreground">围绕客户、案件、财务和服务的日常协同看板。</p>
        </div>
        <Link href="/cases/new" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90" style={{color: 'var(--primary-foreground)'}}>
          新建案件
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardHeader><CardDescription>本月新签客户</CardDescription><CardTitle>8</CardTitle></CardHeader><CardContent className="text-sm text-primary">较上月 +18%</CardContent></Card>
        <Card><CardHeader><CardDescription>在办案件数</CardDescription><CardTitle>{cases.filter((item) => item.status !== "已完成").length}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">覆盖 {customers.length} 家客户</CardContent></Card>
        <Card><CardHeader><CardDescription>本月回款</CardDescription><CardTitle>{currency(monthlyPayments)}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">到账率 72%</CardContent></Card>
        <Card><CardHeader><CardDescription>待处理工单</CardDescription><CardTitle>{tickets.filter((item) => item.status !== "已处理").length}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">客服与案件协同处理中</CardContent></Card>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>月度收入趋势</CardTitle>
          <CardDescription>使用柱状占比模拟近六个月回款表现。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            {incomeTrend.map((item) => (
              <Card key={item.month} size="sm">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="text-sm font-medium">{item.month}</div>
                  <div className="flex h-44 items-end rounded-md bg-muted p-2">
                    <div style={{ height: `${(item.amount / maxIncome) * 100}%` }} className="w-full rounded-sm bg-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground">{currency(item.amount)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
