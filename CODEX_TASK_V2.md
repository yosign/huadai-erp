# 华代优服 ERP - shadcn 重构 V2

## 背景
V1 已完成，但用了自定义轻量 UI 组件。V2 目标：全部替换成 shadcn/ui 官方组件。

## 第一步：初始化 shadcn

```bash
npx shadcn@latest init -d
npx shadcn@latest add button input label select badge card table tabs dialog sheet separator skeleton avatar dropdown-menu
```

如果提示组件已存在，选择 overwrite。

## 第二步：逐页替换组件

### 替换规则（重要）
- 所有自定义 `<Button>` → `import { Button } from "@/components/ui/button"`
- 所有自定义 `<Badge>` → `import { Badge } from "@/components/ui/badge"`
- 所有自定义 `<Card>` 容器 → `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"`
- 所有自定义表格 → `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`
- 所有自定义 Tab → `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`
- 所有自定义 `<Input>` → `import { Input } from "@/components/ui/input"`
- 所有自定义 `<Select>` → `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`
- 所有 modal/弹窗 → `import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"`
- 所有下拉菜单 → `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"`

### 需要替换的文件清单
1. `app/layout.tsx` - 侧边栏中的按钮、菜单项
2. `app/page.tsx` / `app/dashboard/page.tsx` - KPI卡片用 Card，待办列表
3. `app/customers/page.tsx` - 表格用 Table，搜索用 Input，筛选用 Select，状态用 Badge
4. `app/customers/[id]/page.tsx` - Tab 切换用 Tabs，信息展示用 Card
5. `app/cases/page.tsx` - 看板卡片用 Card，筛选用 Select/Input，Badge 状态
6. `app/cases/[id]/page.tsx` - 流程时间线中的 Badge，材料清单
7. `app/contracts/page.tsx` - 表格用 Table，Badge
8. `app/finance/page.tsx` - 汇总用 Card，表格用 Table
9. `app/finance/invoices/page.tsx` - 表格用 Table
10. `app/services/page.tsx` - 表格用 Table，Badge
11. `app/reports/page.tsx` - 统计卡片用 Card
12. `app/system/page.tsx` - 权限表格用 Table，Badge
13. `app/customers/new/page.tsx` - 表单用 Input/Select/Button
14. `app/cases/new/page.tsx` - 表单用 Input/Select/Button

## 第三步：Badge variant 规范

shadcn Badge 有 variant：
- `default`（蓝色）→ 进行中、部分收款
- `secondary`（灰色）→ 待处理、草稿
- `destructive`（红色）→ 逾期、紧急、流失
- `outline`（边框）→ 一般状态

对于自定义颜色（绿色=已完成、橙色=即将到期），用 `className` 覆盖：
```tsx
<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">已完成</Badge>
<Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">即将到期</Badge>
```

## 第四步：Card 规范

```tsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>
    内容
  </CardContent>
</Card>
```

KPI 卡片示例：
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">本月新签客户</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">12</div>
    <p className="text-xs text-muted-foreground">较上月 +20%</p>
  </CardContent>
</Card>
```

## 验收标准
1. `npm run build` 无报错
2. 所有页面的 Button/Badge/Card/Table/Tabs/Input/Select 全部来自 `@/components/ui/`
3. 不能有自定义的 `<button className="...">`（除非 shadcn Button 内部）
4. 样式一致，视觉质量不退步

## 完成后
输出：「V2 完成」+ 替换了哪些关键组件
