import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { rolePermissions } from "@/lib/mock-data"

export default function SystemPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>权限管理</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>角色</TableHead>
              <TableHead>数据范围</TableHead>
              <TableHead>客户权限</TableHead>
              <TableHead>案件权限</TableHead>
              <TableHead>财务权限</TableHead>
              <TableHead>报表权限</TableHead>
              <TableHead>系统权限</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolePermissions.map((item) => (
              <TableRow key={item.role}>
                <TableCell className="font-medium">{item.role}</TableCell>
                <TableCell>{item.dataScope}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.case}</TableCell>
                <TableCell>{item.finance}</TableCell>
                <TableCell>{item.report}</TableCell>
                <TableCell>{item.system}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
