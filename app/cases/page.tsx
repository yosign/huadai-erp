"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cases, type CaseStatus } from "@/lib/mock-data"
import { caseStatusClassName, currency, getCustomerName } from "@/lib/utils"

const columns: CaseStatus[] = ["待提交", "受理中", "审查中", "下证中", "已完成"]

export default function CasesPage() {
  return (
    <Tabs defaultValue="board" className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">案件列表</h1>
        <div className="flex flex-wrap items-center gap-2">
          <TabsList>
            <TabsTrigger value="board">看板视图</TabsTrigger>
            <TabsTrigger value="table">表格视图</TabsTrigger>
          </TabsList>
          <Button asChild>
            <Link href="/cases/new">新建案件</Link>
          </Button>
        </div>
      </div>

      <TabsContent value="board">
        <div className="grid gap-4 xl:grid-cols-5">
          {columns.map((column) => (
            <Card key={column}>
              <CardHeader>
                <CardTitle className="text-base">{column}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cases.filter((item) => item.status === column).map((item) => (
                  <Card key={item.id} size="sm">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="mt-2 text-xs text-muted-foreground">{getCustomerName(item.client)}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge className={caseStatusClassName(item.status)}>{item.status}</Badge>
                        <span className="text-xs text-muted-foreground">{item.manager}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="table">
        <Card>
          <CardContent className="py-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>案件编号</TableHead>
                  <TableHead>案件名称</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>截止日期</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>费用</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell><Link href={`/cases/${item.id}`} className="font-medium text-primary">{item.name}</Link></TableCell>
                    <TableCell>{getCustomerName(item.client)}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell><Badge className={caseStatusClassName(item.status)}>{item.status}</Badge></TableCell>
                    <TableCell>{item.deadline}</TableCell>
                    <TableCell>{item.manager}</TableCell>
                    <TableCell>{currency(item.fee)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
