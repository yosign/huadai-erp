import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { tickets } from "@/lib/mock-data"
import { getCaseName, getCustomerName, ticketStatusClassName } from "@/lib/utils"

export default function ServicesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>工单列表</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>工单号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>案件</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>内容</TableHead>
              <TableHead>处理人</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{getCustomerName(item.client)}</TableCell>
                <TableCell>{getCaseName(item.case)}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.handler}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell><Badge className={ticketStatusClassName(item.status)}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
