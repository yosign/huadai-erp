# CODEX TASK V9 - 月度收入图表重写（AreaChart）

## 目标
将 `app/page.tsx` 中的月度收入区块，从"6个独立卡片"改为一个 shadcn ChartContainer + Recharts AreaChart。
同时将 `app/reports/page.tsx` 的柱状图也改为 BarChart。

---

## Task 1: app/page.tsx - 月度收入趋势

### 当前代码（找到这段，替换）
在 `app/page.tsx` 中找到包含 `月度收入趋势` 的 Card，里面有6个子Card排成一排的柱状图。

### 替换为

在文件顶部已有 import 区域，添加：
```tsx
"use client"
```
放在文件最顶部（第一行）。

在 import 区域添加：
```tsx
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
```

将月度收入 Card 整体替换为：
```tsx
<Card>
  <CardHeader>
    <CardTitle>月度收入趋势</CardTitle>
    <CardDescription>近6个月回款金额走势</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={{ amount: { label: "回款金额", color: "var(--primary)" } }} className="h-48 w-full">
      <AreaChart data={incomeTrend} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `¥${(v/1000).toFixed(0)}k`} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`¥${Number(value).toLocaleString()}`, "回款金额"]} />} />
        <Area type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={2} fill="url(#fillAmount)" dot={{ fill: "var(--primary)", r: 3 }} activeDot={{ r: 5 }} />
      </AreaChart>
    </ChartContainer>
  </CardContent>
</Card>
```

---

## Task 2: app/reports/page.tsx - 收入柱状图

在文件顶部添加 `"use client"`（第一行）。

在 import 区域添加：
```tsx
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
```

找到 reports 页面中包含6个子Card排成一排的柱状图区块（在"月度收入"Card 的 CardContent 里），替换 CardContent 内容为：
```tsx
<CardContent>
  <ChartContainer config={{ amount: { label: "回款金额", color: "var(--primary)" } }} className="h-56 w-full">
    <BarChart data={incomeTrend} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="var(--border)" />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
      <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `¥${(v/1000).toFixed(0)}k`} />
      <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`¥${Number(value).toLocaleString()}`, "回款金额"]} />} />
      <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ChartContainer>
</CardContent>
```

---

## 注意事项
- `incomeTrend` 数据已在 mock-data 中，结构是 `{ month: string, amount: number }[]`
- `"use client"` 必须加，因为 Recharts 是客户端组件
- 完成后运行 `npm run build` 确认通过

## 完成后
`npm run build` 必须通过。
