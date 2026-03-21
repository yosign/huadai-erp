"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { customers } from "@/lib/mock-data"

const caseFormSchema = z.object({
  name: z.string().min(2, "案件名称至少 2 个字符"),
  customerId: z.string().min(1, "请选择关联客户"),
  type: z.enum(["普通", "加急"]),
  status: z.enum(["待提交", "受理中", "审查中", "下证中", "已完成"]),
  manager: z.string().min(1, "请输入负责人"),
  fee: z.coerce.number().min(0, "代理费用不能小于 0"),
})

type CaseFormValues = z.infer<typeof caseFormSchema>
type CaseFormInputValues = z.input<typeof caseFormSchema>

export default function NewCasePage() {
  const form = useForm<CaseFormInputValues, undefined, CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      name: "",
      customerId: "",
      type: "普通",
      status: "待提交",
      manager: "",
      fee: 0,
    },
  })

  function onSubmit(values: CaseFormValues) {
    console.log(values)
    form.reset()
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>新建案件</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-5 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>案件名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入案件名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>关联客户</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择关联客户" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>案件类型</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择案件类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="普通">普通</SelectItem>
                      <SelectItem value="加急">加急</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>当前状态</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择当前状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="待提交">待提交</SelectItem>
                      <SelectItem value="受理中">受理中</SelectItem>
                      <SelectItem value="审查中">审查中</SelectItem>
                      <SelectItem value="下证中">下证中</SelectItem>
                      <SelectItem value="已完成">已完成</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>负责人</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入负责人" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>代理费用</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入代理费用"
                      type="number"
                      min="0"
                      {...field}
                      value={typeof field.value === "number" || typeof field.value === "string" ? field.value : ""}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 md:col-span-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                重置
              </Button>
              <Button type="submit">提交案件</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
