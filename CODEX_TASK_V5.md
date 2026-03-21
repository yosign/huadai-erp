# V5 - shadcn 最佳实践第二轮修复

审查发现仍有3类非 shadcn 模式，全部修复。

---

## 问题 1：柱状图用 div + inline style 模拟

`app/page.tsx`（仪表盘）和 `app/reports/page.tsx`（数据看板）的柱状图用了：
```tsx
// ❌ 自定义 div + bg-gradient + style={{ height }}
<div className="flex h-40 items-end rounded-xl bg-slate-50 p-2">
  <div className="w-full rounded-xl bg-gradient-to-t from-cyan-500 to-teal-500" style={{ height: `${percent}%` }} />
</div>
```

**修复**：柱状图高度是动态值，无法用纯 Tailwind 表达，保留 `style={{ height }}` 可以接受。但要做以下改进：
1. 背景色从 `bg-slate-50` 改为 shadcn 语义色 `bg-muted`
2. 柱体颜色从 `bg-gradient-to-t from-cyan-500 to-teal-500` 改为 `bg-primary`（使用主题色）
3. 圆角从 `rounded-xl` 改为 `rounded-md`（与 shadcn 组件一致）
4. 整个柱状图区域用 `Card` 包裹（如果还没有的话）

```tsx
// ✅ 修复后
<div className="flex h-40 items-end rounded-md bg-muted p-2">
  <div className="w-full rounded-md bg-primary" style={{ height: `${percent}%` }} />
</div>
```

---

## 问题 2：案件列表看板/表格切换用 useState + Button 而非 Tabs

`app/cases/page.tsx` 用了自定义的 `useState + Button variant` 做看板/表格切换：
```tsx
// ❌ 自定义切换
const [view, setView] = useState<"board" | "table">("board")
<Button variant={view === "board" ? "default" : "outline"} onClick={() => setView("board")}>看板视图</Button>
<Button variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>表格视图</Button>
{view === "board" ? (...) : (...)}
```

**修复**：用 shadcn `Tabs` 组件替换：
```tsx
// ✅ shadcn Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="board">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-semibold">案件列表</h1>
    <div className="flex items-center gap-3">
      <TabsList>
        <TabsTrigger value="board">看板视图</TabsTrigger>
        <TabsTrigger value="table">表格视图</TabsTrigger>
      </TabsList>
      <Button asChild><Link href="/cases/new">新建案件</Link></Button>
    </div>
  </div>
  <TabsContent value="board">
    {/* 看板内容 */}
  </TabsContent>
  <TabsContent value="table">
    {/* 表格内容 */}
  </TabsContent>
</Tabs>
```

---

## 问题 3：分割线/分隔区域用 border-t / border-b 而非 Separator

多处用了 `border-t border-border/70` 或 `border-b` 做分隔线。

**修复**：用 shadcn `Separator` 组件替代：
```tsx
import { Separator } from "@/components/ui/separator"

// ❌ 旧写法
<div className="border-t border-border/70 pt-4">...</div>

// ✅ 新写法
<Separator className="my-4" />
<div>...</div>
```

在以下文件中搜索并替换：
- `app/customers/page.tsx` 的分页区域分割线
- `app/page.tsx` 仪表盘中的分隔
- 其他页面中出现的 `border-t` 分隔线（不包括 Card/Table 等 shadcn 组件内部的 border）

**注意**：只替换用作**视觉分隔线**的 `border-t`/`border-b`，不要改 Card、Table、Badge 等 shadcn 组件自带的 border。

---

## 问题 4：Progress 组件的自定义样式过重

`app/reports/page.tsx` 中 Progress 用了过长的 className 覆盖：
```tsx
// ❌ 样式覆盖过多
<Progress
  value={item.value}
  className="[&_[data-slot='progress-indicator']]:bg-gradient-to-r [&_[data-slot='progress-indicator']]:from-emerald-500 [&_[data-slot='progress-indicator']]:to-teal-500 [&_[data-slot='progress-track']]:h-3 [&_[data-slot='progress-track']]:bg-slate-100"
/>
```

**修复**：简化样式，用主题色：
```tsx
// ✅ 简化
<Progress value={item.value} className="h-3" />
```
Progress 组件默认就会用 `bg-primary`，不需要额外覆盖。如果默认颜色不对，在 `app/globals.css` 里调整 `--primary` 变量即可。

---

## 问题 5：看板卡片样式不统一

案件看板（`app/cases/page.tsx`）的卡片和仪表盘（`app/page.tsx`）的待办提醒、收入区块，部分用了自定义的 `rounded-2xl border border-border/70 bg-background/80` 等非标准样式。

**修复**：统一用 shadcn Card：
```tsx
// ❌ 自定义容器
<div className="rounded-2xl border border-border/70 bg-background/80 p-4">

// ✅ shadcn Card
<Card>
  <CardContent className="p-4">
    ...
  </CardContent>
</Card>
```

---

## 执行顺序

1. 修复柱状图样式（page.tsx + reports/page.tsx）
2. 案件列表改用 Tabs（cases/page.tsx）
3. 分割线改用 Separator（多文件）
4. 简化 Progress 样式（reports/page.tsx）
5. 看板卡片统一用 Card（cases/page.tsx + page.tsx）
6. `npm run build` 验证

## 验收

```bash
# 无 bg-slate-50
Select-String -Pattern "bg-slate-50" -Recurse -Include "*.tsx" app

# 无 useState view/setView 做 tab 切换
Select-String -Pattern "setView" -Recurse -Include "*.tsx" app

# build 通过
npm run build
```
