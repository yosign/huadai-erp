# V6 - 修复两个问题

## 问题 1：todoReminders 数据乱码

`lib/mock-data.ts` 中的 `todoReminders` 数组内容是 GBK 乱码。用以下正确内容替换：

```ts
export const todoReminders: TodoReminder[] = [
  { id: "TD-001", title: "上海数联补充材料图纸", status: "材料补正", level: "amber" },
  { id: "TD-002", title: "武汉智慧物流催款 12 天", status: "财务催收", level: "red" },
  { id: "TD-003", title: "青岛海创加急证书临期", status: "案件跟进", level: "blue" },
  { id: "TD-004", title: "深圳腾飞续签合同待提交", status: "销售推进", level: "emerald" },
]
```

只替换这一段，不要动其他内容。

---

## 问题 2：Separator 颜色太深

`app/page.tsx` 中月度收入模块里有：
```tsx
<Separator className="mb-4" />
```

这个 Separator 出现在 CardContent 内部，默认 `bg-border` 颜色太深，与卡片背景对比太强。

**修复**：改为更浅的颜色，或直接删除这个 Separator（月度收入柱状图区域本身就是 Card 包裹，不需要额外分隔线）：

```tsx
// 删除这行
<Separator className="mb-4" />
```

同时检查其他页面（reports/page.tsx、customers/page.tsx）里的 Separator，如果也在 CardContent 内出现且颜色太深，同样改为 `className="mb-4 bg-border/40"` 使其变淡。

---

## 执行

1. 修改 `lib/mock-data.ts`：替换 todoReminders 为 UTF-8 内容
2. 修改 `app/page.tsx`：删除月度收入 Card 内的 Separator
3. 检查并修复其他 CardContent 内的 Separator 颜色（改为 `bg-border/40`）
4. `npm run build` 验证
