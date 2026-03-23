# CODEX TASK V8 - 全站 UI 主题统一修复

## 背景
项目已应用 shadcn preset b6ZQy7MAq（Lyra style, Mauve base, Lime primary）。
CSS 变量已正确：`--primary: oklch(0.532 0.157 131.589)`, `--background: oklch(1 0 0)`, `--border: oklch(0.922 0.005 325.62)`。

## 问题：页面内存在大量硬编码颜色，未走 CSS 变量，视觉上与 shadcn 主题不符。

## 修复任务

### 1. components/app-shell.tsx

找到最外层 div 的 className，有类似这样的渐变背景：
```
bg-[radial-gradient(...)] 或 bg-[linear-gradient(...)]
```
改为：`bg-background`

找到 `aside` 元素，有类似 `bg-white/80` 的背景：
改为：`bg-sidebar`

找到 `aside` 上的 `border-r border-border/70`：
改为：`border-r border-border`

找到 `header` 上的 `bg-white/85`：
改为：`bg-background/95`

找到左下角用户区域的 `border border-border/70 bg-background/70`：
改为：`border border-border bg-muted`

找到 `Separator` 组件（侧边栏里的分隔线），如果有 className 覆盖颜色，删掉该 className，用默认样式。

### 2. app/page.tsx - 月度收入柱状图

找到柱状图 bar 的 div，有类似：
```tsx
style={{ height: `${bar.height}%` }} className="... bg-green-... 或 bg-emerald-..."
```
或 inline style 带颜色。

统一改为（只保留高度，颜色用 bg-primary）：
```tsx
<div style={{ height: `${bar.height}%` }} className="w-full bg-primary rounded-sm" />
```
容器背景改为 `bg-muted`。

### 3. app/reports/page.tsx - 柱状图和进度条

同 page.tsx，找到所有柱状图 bar：
- 容器：`bg-muted`
- bar：`bg-primary`

找到进度条（`<Progress>` 组件或自定义 div），确保颜色走主题色。

### 4. components/ui/progress.tsx

打开文件，找到 indicator div 的颜色。如果是 `bg-primary` 则正确，不用动。
如果是 `bg-green-*` 或其他硬编码色，改为 `bg-primary`。

### 5. 全局扫描硬编码颜色

在 app/ 和 components/ 目录下，搜索以下 hardcoded 颜色类名并替换：
- `bg-white` → `bg-background` 或 `bg-card`（根据上下文）
- `bg-gray-50` / `bg-slate-50` / `bg-blue-50` → `bg-muted`
- `border-gray-*` / `border-slate-*` → `border-border`
- `text-gray-*` / `text-slate-*`（非状态相关）→ `text-muted-foreground`

注意：`getStatusClass()` 和 `caseStatusClassName()` 函数里的状态颜色（如 `bg-blue-100 text-blue-700`）不要改，这些是有意为之的状态色。

## 执行后
运行 `npm run build`，必须通过。
