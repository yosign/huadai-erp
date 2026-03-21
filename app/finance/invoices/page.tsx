import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { invoiceRecords } from "@/lib/mock-data"
import { currency, getCaseName, getCustomerName, getStatusClass } from "@/lib/utils"

export default function InvoicesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>开票记录</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>发票编号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>案件</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>票种</TableHead>
              <TableHead>开票日期</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceRecords.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{getCustomerName(item.customerId)}</TableCell>
                <TableCell>{getCaseName(item.caseId)}</TableCell>
                <TableCell>{currency(item.amount)}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.issuedDate}</TableCell>
                <TableCell><Badge className={getStatusClass(item.status)}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
