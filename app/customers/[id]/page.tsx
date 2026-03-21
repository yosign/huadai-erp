import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { customers } from "@/lib/mock-data"
import { currency, getCustomerCases, getCustomerContracts, getCustomerPayments, getCustomerTickets, getStatusClass } from "@/lib/utils"

export default async function CustomerDetailPage(props: PageProps<"/customers/[id]">) {
  const { id } = await props.params
  const customer = customers.find((item) => item.id === id)
  if (!customer) notFound()

  const customerCases = getCustomerCases(customer.id)
  const customerContracts = getCustomerContracts(customer.id)
  const customerPayments = getCustomerPayments(customer.id)
  const customerTickets = getCustomerTickets(customer.id)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{customer.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge className={getStatusClass(customer.signStatus)}>{customer.signStatus}</Badge>
          <Badge className={getStatusClass(customer.serviceLevel)}>{customer.serviceLevel}</Badge>
          {customer.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
        </CardContent>
      </Card>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="cases">软著案件</TabsTrigger>
          <TabsTrigger value="finance">合同财务</TabsTrigger>
          <TabsTrigger value="service">服务记录</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardContent className="grid gap-4 py-6 md:grid-cols-2">
              <div><div className="text-sm text-muted-foreground">统一社会信用代码</div><div className="mt-1 font-medium">{customer.creditCode}</div></div>
              <div><div className="text-sm text-muted-foreground">联系人</div><div className="mt-1 font-medium">{customer.contact}</div></div>
              <div><div className="text-sm text-muted-foreground">联系电话</div><div className="mt-1 font-medium">{customer.phone}</div></div>
              <div><div className="text-sm text-muted-foreground">邮箱</div><div className="mt-1 font-medium">{customer.email}</div></div>
              <div><div className="text-sm text-muted-foreground">客户经理</div><div className="mt-1 font-medium">{customer.manager}</div></div>
              <div><div className="text-sm text-muted-foreground">地址</div><div className="mt-1 font-medium">{customer.address}</div></div>
              <div><div className="text-sm text-muted-foreground">行业</div><div className="mt-1 font-medium">{customer.industry}</div></div>
              <div><div className="text-sm text-muted-foreground">备注</div><div className="mt-1 font-medium">{customer.notes || "--"}</div></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases">
          <Card>
            <CardContent className="py-6">
              <Table>
                <TableHeader><TableRow><TableHead>案件编号</TableHead><TableHead>案件名称</TableHead><TableHead>类型</TableHead><TableHead>状态</TableHead><TableHead>负责人</TableHead><TableHead>费用</TableHead></TableRow></TableHeader>
                <TableBody>
                  {customerCases.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.manager}</TableCell>
                      <TableCell>{currency(item.fee)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>合同信息</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>合同编号</TableHead><TableHead>名称</TableHead><TableHead>金额</TableHead><TableHead>状态</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {customerContracts.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{currency(item.amount)}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>回款信息</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>收款编号</TableHead><TableHead>应收</TableHead><TableHead>已收</TableHead><TableHead>未收</TableHead><TableHead>状态</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {customerPayments.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{currency(item.amount)}</TableCell>
                        <TableCell>{currency(item.received)}</TableCell>
                        <TableCell>{currency(item.pending)}</TableCell>
                        <TableCell><Badge className={getStatusClass(item.status)}>{item.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardContent className="py-6">
              <Table>
                <TableHeader><TableRow><TableHead>工单号</TableHead><TableHead>类型</TableHead><TableHead>处理人</TableHead><TableHead>创建时间</TableHead><TableHead>状态</TableHead><TableHead>内容</TableHead></TableRow></TableHeader>
                <TableBody>
                  {customerTickets.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.handler}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell><Badge className={getStatusClass(item.status)}>{item.status}</Badge></TableCell>
                      <TableCell>{item.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
