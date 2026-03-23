"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cases, type CaseStatus } from "@/lib/mock-data"
import { caseStatusClassName, cn, currency, getCustomerName } from "@/lib/utils"

const columns: CaseStatus[] = ["待提交", "受理中", "审查中", "下证中", "已完成"]

export default function CasesPage() {
  const [view, setView] = useState<"board" | "table">("board")
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">案件列表</h1>
        <Link href="/cases/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90" style={{color: 'var(--primary-foreground)'}}>
          <Plus className="size-5" />新建案件
        </Link>
      </div>
      <Tabs value={view} onValueChange={(v) => setView(v as "board" | "table")}>
        <TabsList>
          <TabsTrigger value="board">看板视图</TabsTrigger>
          <TabsTrigger value="table">表格视图</TabsTrigger>
        </TabsList>
      </Tabs>

      {view === "board" && (
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
      )}

      {view === "table" && (
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
      )}
    </div>
  )
}
