import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { paymentRecords } from "@/lib/mock-data"
import { currency, getCaseName, getCustomerName, getPaymentTag, paymentStatusClassName } from "@/lib/utils"

export default function FinancePage() {
  const total = paymentRecords.reduce((sum, item) => sum + item.amount, 0)
  const received = paymentRecords.reduce((sum, item) => sum + item.received, 0)
  const pending = paymentRecords.reduce((sum, item) => sum + item.pending, 0)
  const overdue = paymentRecords.filter((item) => item.status === "逾期未收").length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardHeader><CardDescription>应收总额</CardDescription><CardTitle>{currency(total)}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>已收总额</CardDescription><CardTitle>{currency(received)}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>待收总额</CardDescription><CardTitle>{currency(pending)}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>逾期笔数</CardDescription><CardTitle>{overdue}</CardTitle></CardHeader></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>收款管理</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>收款编号</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>案件</TableHead>
                <TableHead>应收</TableHead>
                <TableHead>已收</TableHead>
                <TableHead>未收</TableHead>
                <TableHead>方式</TableHead>
                <TableHead>到期日</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentRecords.map((item) => {
                const paymentTag = getPaymentTag(item)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{getCustomerName(item.client)}</TableCell>
                    <TableCell>{getCaseName(item.case)}</TableCell>
                    <TableCell>{currency(item.amount)}</TableCell>
                    <TableCell>{currency(item.received)}</TableCell>
                    <TableCell>{currency(item.pending)}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell className={paymentTag === "danger" ? "text-rose-600" : paymentTag === "warning" ? "text-orange-600" : ""}>{item.dueDate}</TableCell>
                    <TableCell><Badge className={paymentStatusClassName(item.status)}>{item.status}</Badge></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
