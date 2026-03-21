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

const customerFormSchema = z.object({
  name: z.string().min(2, "客户名称至少 2 个字符"),
  contact: z.string().min(1, "请输入联系人"),
  phone: z.string().min(1, "请输入联系电话"),
  industry: z.string().min(1, "请输入所属行业"),
  size: z.enum(["小型", "中型", "大型"]),
  softwareType: z.enum(["自研", "委托", "加急"]),
  signStatus: z.enum(["签约中", "已续签", "已到期", "流失"]),
  serviceLevel: z.enum(["普通", "重点", "VIP"]),
  manager: z.string().min(1, "请输入客户经理"),
})

type CustomerFormValues = z.infer<typeof customerFormSchema>

export default function NewCustomerPage() {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      phone: "",
      industry: "",
      size: "中型",
      softwareType: "自研",
      signStatus: "签约中",
      serviceLevel: "普通",
      manager: "",
    },
  })

  function onSubmit(values: CustomerFormValues) {
    console.log(values)
    form.reset()
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>新建客户</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-5 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>客户名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入客户名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>联系人</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入联系人" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>联系电话</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入联系电话" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所属行业</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入所属行业" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>企业规模</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择企业规模" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="小型">小型</SelectItem>
                      <SelectItem value="中型">中型</SelectItem>
                      <SelectItem value="大型">大型</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="softwareType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>软件类型</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择软件类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="自研">自研</SelectItem>
                      <SelectItem value="委托">委托</SelectItem>
                      <SelectItem value="加急">加急</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>签约状态</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择签约状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="签约中">签约中</SelectItem>
                      <SelectItem value="已续签">已续签</SelectItem>
                      <SelectItem value="已到期">已到期</SelectItem>
                      <SelectItem value="流失">流失</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>服务等级</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择服务等级" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="普通">普通</SelectItem>
                      <SelectItem value="重点">重点</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
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
                  <FormLabel>客户经理</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入客户经理" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 md:col-span-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                重置
              </Button>
              <Button type="submit">提交客户</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
