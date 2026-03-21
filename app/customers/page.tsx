"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { customers } from "@/lib/mock-data"
import { getStatusClass } from "@/lib/utils"

const pageSize = 8

export default function CustomersPage() {
  const [keyword, setKeyword] = useState("")
  const [status, setStatus] = useState("全部状态")
  const [level, setLevel] = useState("全部等级")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return customers.filter((item) => {
      const matchesKeyword = [item.name, item.contact, item.manager, item.id].some((field) => field.toLowerCase().includes(keyword.toLowerCase()))
      const matchesStatus = status === "全部状态" || item.signStatus === status
      const matchesLevel = level === "全部等级" || item.serviceLevel === level
      return matchesKeyword && matchesStatus && matchesLevel
    })
  }, [keyword, status, level])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const records = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <Card>
      <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>客户列表</CardTitle>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <Input placeholder="搜索客户名称、联系人、客户经理" value={keyword} onChange={(event) => { setKeyword(event.target.value); setPage(1) }} className="md:w-72" />
          <Select value={status} onValueChange={(value) => { setStatus(value ?? "全部状态"); setPage(1) }}>
            <SelectTrigger className="w-full md:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["全部状态", "签约中", "已续签", "已到期", "流失"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={(value) => { setLevel(value ?? "全部等级"); setPage(1) }}>
            <SelectTrigger className="w-full md:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["全部等级", "VIP", "重点", "普通"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/customers/new">新建客户</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>客户编号</TableHead>
              <TableHead>客户名称</TableHead>
              <TableHead>联系人</TableHead>
              <TableHead>电话</TableHead>
              <TableHead>行业</TableHead>
              <TableHead>规模</TableHead>
              <TableHead>软件类型</TableHead>
              <TableHead>签约状态</TableHead>
              <TableHead>服务等级</TableHead>
              <TableHead>在办案件</TableHead>
              <TableHead>客户经理</TableHead>
              <TableHead>签约日期</TableHead>
              <TableHead>到期日期</TableHead>
              <TableHead>来源</TableHead>
              <TableHead>标签</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell><Link href={`/customers/${item.id}`} className="font-medium text-primary">{item.name}</Link></TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.industry}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.softwareType}</TableCell>
                <TableCell><Badge className={getStatusClass(item.signStatus)}>{item.signStatus}</Badge></TableCell>
                <TableCell><Badge className={getStatusClass(item.serviceLevel)}>{item.serviceLevel}</Badge></TableCell>
                <TableCell>{item.activeCases}</TableCell>
                <TableCell>{item.manager}</TableCell>
                <TableCell>{item.signDate}</TableCell>
                <TableCell>{item.expireDate}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>{item.tags.length ? item.tags.join("、") : "--"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator />
        <div className="flex flex-col gap-3 pt-4 text-sm md:flex-row md:items-center md:justify-between">
          <div className="text-muted-foreground">第 {currentPage} / {totalPages} 页，共 {filtered.length} 条</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>上一页</Button>
            <Button variant="outline" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>下一页</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
