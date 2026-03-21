import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { contracts } from "@/lib/mock-data"
import { currency, getCaseName, getCustomerName, getStatusClass } from "@/lib/utils"

export default function ContractsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>合同列表</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>合同编号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>关联案件</TableHead>
              <TableHead>合同名称</TableHead>
              <TableHead>合同金额</TableHead>
              <TableHead>签约日期</TableHead>
              <TableHead>到期日期</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{getCustomerName(item.customerId)}</TableCell>
                <TableCell>{getCaseName(item.caseId)}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{currency(item.amount)}</TableCell>
                <TableCell>{item.signDate}</TableCell>
                <TableCell>{item.expireDate}</TableCell>
                <TableCell><Badge className={getStatusClass(item.status)}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
