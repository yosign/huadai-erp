# CODEX TASK V7 - 修复新建案件按钮

## 问题
`app/page.tsx` 和 `app/cases/page.tsx` 中的「新建案件」按钮字体颜色不对（显示黑色）。
根本原因：`Button asChild` + `<Link>` 组合导致 className 被 Link 继承覆盖。

## 任务
完全删除现有按钮写法，用原生 `<a>` 标签重写，确保字体颜色正确。

### 修改 app/page.tsx

找到如下代码（可能有细微差异）：
```
<Button asChild>
  <Link href="/cases/new">新建案件</Link>
</Button>
```
或
```
<Link href="/cases/new" className="inline-flex ...">
  新建案件
</Link>
```

**完全替换为：**
```tsx
<a
  href="/cases/new"
  style={{ backgroundColor: 'oklch(0.532 0.157 131.589)', color: 'oklch(0.986 0.031 120.757)' }}
  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
>
  新建案件
</a>
```

### 修改 app/cases/page.tsx

找到如下代码（可能有细微差异）：
```
<Link href="/cases/new" className="inline-flex ...">
  <Plus className="size-4" />新建案件
</Link>
```
或
```
<Button asChild ...>
  <Link href="/cases/new">...</Link>
</Button>
```

**完全替换为：**
```tsx
<a
  href="/cases/new"
  style={{ backgroundColor: 'oklch(0.532 0.157 131.589)', color: 'oklch(0.986 0.031 120.757)' }}
  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
>
  <Plus className="size-4" />新建案件
</a>
```

## 完成后
运行 `npm run build` 确认无报错。
