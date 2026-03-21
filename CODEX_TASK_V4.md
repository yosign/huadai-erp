# V4 - shadcn 最佳实践修复

审查发现4类问题，全部修复。

---

## 问题 1：`Button render=` 非标准用法

`Button render={<Link href="..." />}` 不是 shadcn 的 API。正确做法是 `Button` + `asChild` + `<Link>`。

**受影响文件**：
- `app/cases/page.tsx`（出现2次）
- `app/customers/page.tsx`（出现1次）

**修复方式**：
```tsx
// ❌ 错误
<Button render={<Link href="/cases/new" />}>新建案件</Button>

// ✅ 正确
import Link from "next/link";
import { Button } from "@/components/ui/button";

<Button asChild>
  <Link href="/cases/new">新建案件</Link>
</Button>
```

---

## 问题 2：表单缺少 shadcn `<Form>` 包装器

`app/cases/new/page.tsx` 和 `app/customers/new/page.tsx` 用了裸 `<form>` + `useForm`，没有用 shadcn 的 `Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage` 组件体系。

**修复方式**：

首先确认 shadcn form 组件已安装：
```bash
npx shadcn@latest add form --overwrite
```

然后重写两个表单页面，使用标准 shadcn Form 模式：

```tsx
// ✅ 标准 shadcn Form 写法
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "姓名至少2个字符" }),
  // ...其他字段
});

export function CustomerNewPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        {/* Select 字段示例 */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>签约状态</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => form.reset()}>重置</Button>
          <Button type="submit">提交</Button>
        </div>
      </form>
    </Form>
  );
}
```

### 新建客户表单字段（app/customers/new/page.tsx）

zod schema 字段：
- `name: z.string().min(2)` — 客户名称
- `contact: z.string().min(1)` — 联系人
- `phone: z.string().min(1)` — 联系电话
- `industry: z.string().min(1)` — 所属行业
- `size: z.enum(["小型", "中型", "大型"])` — 企业规模
- `softwareType: z.enum(["自研", "委托", "加急"])` — 软件类型
- `signStatus: z.enum(["签约中", "已续签", "已到期", "流失"])` — 签约状态
- `serviceLevel: z.enum(["普通", "重点", "VIP"])` — 服务等级
- `manager: z.string().min(1)` — 客户经理

### 新建案件表单字段（app/cases/new/page.tsx）

zod schema 字段：
- `name: z.string().min(2)` — 案件名称
- `customerId: z.string().min(1)` — 关联客户（Select，从 customers mock data 取列表）
- `type: z.enum(["普通", "加急"])` — 案件类型
- `status: z.enum(["待提交", "受理中", "审查中", "下证中", "已完成"])` — 当前状态
- `manager: z.string().min(1)` — 负责人
- `fee: z.coerce.number().min(0)` — 代理费用

---

## 问题 3：`style={{ width: "xx%" }}` 内联样式

`app/reports/page.tsx` 中柱状图、进度条用了 `style={{ width: "..." }}`。
shadcn 最佳实践：用 `Progress` 组件或用 Tailwind 任意值 `w-[xx%]`。

**修复方式**（reports 页面柱状图）：
```tsx
// ❌ 内联样式
<div style={{ width: `${percent}%` }} className="h-full rounded bg-teal-500" />

// ✅ 方案1：shadcn Progress 组件
import { Progress } from "@/components/ui/progress";
<Progress value={percent} className="h-3" />

// ✅ 方案2：Tailwind 任意值（适合柱状图高度动态）
// 保留 style 仅用于无法用 Tailwind 表达的动态值，可接受
// 但必须改为 CSS variable 方式：
<div style={{ "--bar-w": `${percent}%` } as React.CSSProperties} className="h-full w-[--bar-w] rounded bg-teal-500" />
```

对于 `app/reports/page.tsx` 的柱状图（高度动态），保留 `style={{ height: "xx%" }}` 可接受，但进度条（宽度动态）统一换成 shadcn `<Progress value={n} />`。

---

## 问题 4：Badge 硬编码颜色

Badge 使用 `className="bg-slate-100 text-slate-700"` 等直接颜色，应改成用 `variant` 或统一的颜色 map 函数。

**修复方式**：在 `lib/utils.ts` 中添加统一的 status color map，所有 Badge 引用它：

```ts
// lib/utils.ts（追加）
export function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    // 案件状态
    "已完成": "bg-green-100 text-green-800 border-green-200",
    "受理中": "bg-blue-100 text-blue-800 border-blue-200",
    "审查中": "bg-orange-100 text-orange-800 border-orange-200",
    "下证中": "bg-purple-100 text-purple-800 border-purple-200",
    "待提交": "bg-gray-100 text-gray-600 border-gray-200",
    // 签约状态
    "签约中": "bg-indigo-100 text-indigo-800 border-indigo-200",
    "已续签": "bg-green-100 text-green-800 border-green-200",
    "已到期": "bg-red-100 text-red-800 border-red-200",
    "流失": "bg-gray-100 text-gray-500 border-gray-200",
    // 服务等级
    "VIP": "bg-amber-100 text-amber-800 border-amber-200",
    "重点": "bg-blue-100 text-blue-800 border-blue-200",
    "普通": "bg-gray-100 text-gray-600 border-gray-200",
    // 工单状态
    "已处理": "bg-green-100 text-green-800 border-green-200",
    "待处理": "bg-orange-100 text-orange-800 border-orange-200",
    "处理中": "bg-blue-100 text-blue-800 border-blue-200",
    // 收款状态
    "已收款": "bg-green-100 text-green-800 border-green-200",
    "部分收款": "bg-orange-100 text-orange-800 border-orange-200",
    "逾期未收": "bg-red-100 text-red-800 border-red-200",
  };
  return map[status] ?? "bg-gray-100 text-gray-600 border-gray-200";
}
```

然后所有页面中的 Badge 改为：
```tsx
import { getStatusClass } from "@/lib/utils";
<Badge className={getStatusClass(status)}>{status}</Badge>
```

---

## 执行顺序

1. 安装缺失 shadcn 组件：`npx shadcn@latest add form progress --overwrite`
2. 修复 `Button render=` → `Button asChild + Link`（3处）
3. 重写 `app/customers/new/page.tsx`（shadcn Form）
4. 重写 `app/cases/new/page.tsx`（shadcn Form）
5. 修复 `app/reports/page.tsx` 进度条 → `Progress` 组件
6. 在 `lib/utils.ts` 添加 `getStatusClass()`
7. 全局搜索替换 Badge 颜色 className → `getStatusClass()`
8. `npm run build` 验证

## 验收标准

```bash
# 无 Button render= 用法
Select-String -Pattern "Button render=" -Recurse -Include "*.tsx" app, components

# 无裸 <form（只允许在 shadcn Form 包裹内）
# 已在 Form 组件内的裸 <form 是允许的

# build 通过
npm run build
```
