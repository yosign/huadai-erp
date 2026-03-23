import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cases } from "@/lib/mock-data"
import { caseStatusClassName, currency, getCustomerName } from "@/lib/utils"

const steps = ["待提交", "受理中", "审查中", "下证中", "已完成"] as const

export default async function CaseDetailPage(props: PageProps<"/cases/[id]">) {
  const { id } = await props.params
  const item = cases.find((entry) => entry.id === id)
  if (!item) notFound()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Badge className={caseStatusClassName(item.status)}>{item.status}</Badge>
          <span className="text-sm text-muted-foreground">客户：{getCustomerName(item.client)}</span>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader><CardTitle>流程时间线</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => {
              const activeIndex = steps.indexOf(item.status)
              const done = index <= activeIndex
              return (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`size-3 rounded-full ${done ? "bg-primary" : "bg-muted"}`} />
                    {index < steps.length - 1 ? <div className={`mt-2 h-12 w-px ${done ? "bg-primary/40" : "bg-border"}`} /> : null}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2"><span className="font-medium">{step}</span>{step === item.status ? <Badge className={caseStatusClassName(item.status)}>{item.status}</Badge> : null}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{index === activeIndex ? "当前正在推进该环节" : done ? "节点已完成" : "等待流转"}</div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>基本信息</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div><div className="text-sm text-muted-foreground">案件编号</div><div className="mt-1 font-medium">{item.id}</div></div>
              <div><div className="text-sm text-muted-foreground">客户</div><div className="mt-1 font-medium">{getCustomerName(item.client)}</div></div>
              <div><div className="text-sm text-muted-foreground">案件类型</div><div className="mt-1 font-medium">{item.type}</div></div>
              <div><div className="text-sm text-muted-foreground">负责人</div><div className="mt-1 font-medium">{item.manager}</div></div>
              <div><div className="text-sm text-muted-foreground">提交日期</div><div className="mt-1 font-medium">{item.submitDate ?? "--"}</div></div>
              <div><div className="text-sm text-muted-foreground">受理日期</div><div className="mt-1 font-medium">{item.acceptDate ?? "--"}</div></div>
              <div><div className="text-sm text-muted-foreground">登记号</div><div className="mt-1 font-medium">{item.regNo ?? "--"}</div></div>
              <div><div className="text-sm text-muted-foreground">服务费用</div><div className="mt-1 font-medium">{currency(item.fee)}</div></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>材料清单</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {item.materials.map((material) => (
                <label key={material.id} className="flex items-center gap-3 rounded-xl border border-border bg-muted p-3">
                  <Checkbox checked={material.checked} disabled />
                  <span className="text-sm">{material.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
