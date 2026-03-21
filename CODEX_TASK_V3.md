# V3 - 完全重写，修复乱码 + 全量 shadcn

## 核心问题
所有 components/ 和 app/ 文件的中文内容都是乱码（GBK编码）。需要完全删除并重写。

## 第一步：删除所有旧组件和页面

```bash
# 删除所有自定义组件
Remove-Item components/breadcrumbs.tsx -Force
Remove-Item components/case-detail-page.tsx -Force
Remove-Item components/cases-page.tsx -Force
Remove-Item components/customer-detail-page.tsx -Force
Remove-Item components/customers-page.tsx -Force
Remove-Item components/dashboard-page.tsx -Force
Remove-Item components/erp-shell.tsx -Force
Remove-Item components/finance-page.tsx -Force
Remove-Item components/forms.tsx -Force
Remove-Item components/reports-page.tsx -Force
Remove-Item components/simple-list-page.tsx -Force
Remove-Item components/ui-helpers.tsx -Force

# 删除所有页面（保留 app/layout.tsx 和 app/globals.css 等基础文件）
Remove-Item app/page.tsx -Force
Remove-Item app/dashboard -Recurse -Force
Remove-Item app/customers -Recurse -Force
Remove-Item app/cases -Recurse -Force
Remove-Item app/contracts -Recurse -Force
Remove-Item app/finance -Recurse -Force
Remove-Item app/services -Recurse -Force
Remove-Item app/reports -Recurse -Force
Remove-Item app/system -Recurse -Force
```

## 第二步：确认 shadcn 组件存在

components/ui/ 里应该已有：button.tsx, badge.tsx, card.tsx, table.tsx, tabs.tsx, input.tsx, select.tsx, dialog.tsx, separator.tsx, sheet.tsx, skeleton.tsx, avatar.tsx, dropdown-menu.tsx, label.tsx

如果缺少，运行：
```bash
npx shadcn@latest add button badge card table tabs input select dialog separator sheet skeleton avatar dropdown-menu label --overwrite
```

## 第三步：重写 lib/mock-data.ts

**重要：所有字符串必须是 UTF-8，直接写中文，不要转义**

```typescript
// lib/mock-data.ts
export const customers = [
  {
    id: "CU-2024-001",
    name: "北京智云科技有限公司",
    creditCode: "91110108MA01XXXX01",
    contact: "张伟",
    phone: "13800138001",
    email: "zhangwei@zhiyun.com",
    address: "北京市海淀区中关村大街1号",
    industry: "软件与信息技术",
    size: "中型",
    softwareType: "自研",
    signStatus: "签约中",
    serviceLevel: "VIP",
    activeCases: 3,
    manager: "李明",
    signDate: "2024-01-15",
    expireDate: "2025-01-14",
    source: "转介绍",
    tags: ["加急客户", "高频复购"],
    notes: "重点客户，每季度有软著需求"
  },
  {
    id: "CU-2024-002",
    name: "上海数联网络技术股份有限公司",
    creditCode: "91310115MA01YYYY02",
    contact: "王芳",
    phone: "13900139002",
    email: "wangfang@shulian.com",
    address: "上海市浦东新区张江高科技园区",
    industry: "互联网",
    size: "大型",
    softwareType: "委托",
    signStatus: "已续签",
    serviceLevel: "重点",
    activeCases: 5,
    manager: "陈静",
    signDate: "2023-06-01",
    expireDate: "2025-05-31",
    source: "主动开发",
    tags: ["批量申请"],
    notes: ""
  },
  {
    id: "CU-2024-003",
    name: "广州慧信软件开发有限公司",
    creditCode: "91440101MA01ZZZZ03",
    contact: "刘洋",
    phone: "13700137003",
    email: "liuyang@huixin.com",
    address: "广州市天河区科韵路16号",
    industry: "企业软件",
    size: "小型",
    softwareType: "加急",
    signStatus: "签约中",
    serviceLevel: "普通",
    activeCases: 1,
    manager: "李明",
    signDate: "2024-03-10",
    expireDate: "2025-03-09",
    source: "网络推广",
    tags: [],
    notes: ""
  },
  {
    id: "CU-2024-004",
    name: "深圳市腾飞信息科技有限公司",
    creditCode: "91440300MA01AAAA04",
    contact: "赵雷",
    phone: "13600136004",
    email: "zhaolei@tengfei.com",
    address: "深圳市南山区科技园南区",
    industry: "人工智能",
    size: "中型",
    softwareType: "自研",
    signStatus: "已到期",
    serviceLevel: "重点",
    activeCases: 0,
    manager: "王鹏",
    signDate: "2023-01-20",
    expireDate: "2024-01-19",
    source: "展会",
    tags: ["待续费"],
    notes: "到期未续，需跟进"
  },
  {
    id: "CU-2024-005",
    name: "成都云尚教育科技有限公司",
    creditCode: "91510100MA01BBBB05",
    contact: "孙丽",
    phone: "13500135005",
    email: "sunli@yunshang.com",
    address: "成都市高新区天府大道北段",
    industry: "教育科技",
    size: "小型",
    softwareType: "委托",
    signStatus: "签约中",
    serviceLevel: "普通",
    activeCases: 2,
    manager: "陈静",
    signDate: "2024-02-28",
    expireDate: "2025-02-27",
    source: "老客户推荐",
    tags: [],
    notes: ""
  },
  {
    id: "CU-2024-006",
    name: "杭州数字创新科技有限公司",
    creditCode: "91330100MA01CCCC06",
    contact: "周建国",
    phone: "13400134006",
    email: "zhoujg@szcx.com",
    address: "杭州市余杭区未来科技城",
    industry: "大数据",
    size: "中型",
    softwareType: "自研",
    signStatus: "签约中",
    serviceLevel: "VIP",
    activeCases: 4,
    manager: "李明",
    signDate: "2024-01-05",
    expireDate: "2025-01-04",
    source: "转介绍",
    tags: ["高价值", "加急客户"],
    notes: "季度结算，优先处理"
  },
  {
    id: "CU-2024-007",
    name: "武汉智慧物流科技股份有限公司",
    creditCode: "91420100MA01DDDD07",
    contact: "吴敏",
    phone: "13300133007",
    email: "wumin@zhwl.com",
    address: "武汉市东湖高新区光谷大道",
    industry: "物流科技",
    size: "大型",
    softwareType: "加急",
    signStatus: "已续签",
    serviceLevel: "重点",
    activeCases: 6,
    manager: "王鹏",
    signDate: "2022-08-15",
    expireDate: "2025-08-14",
    source: "主动开发",
    tags: ["长期客户"],
    notes: ""
  },
  {
    id: "CU-2024-008",
    name: "南京博远信息技术有限公司",
    creditCode: "91320100MA01EEEE08",
    contact: "郑涛",
    phone: "13200132008",
    email: "zhengtao@boyuan.com",
    address: "南京市江宁区秣周东路8号",
    industry: "工业软件",
    size: "小型",
    softwareType: "自研",
    signStatus: "流失",
    serviceLevel: "普通",
    activeCases: 0,
    manager: "陈静",
    signDate: "2023-05-01",
    expireDate: "2024-04-30",
    source: "网络推广",
    tags: ["已流失"],
    notes: "价格敏感，转到竞品"
  },
  {
    id: "CU-2024-009",
    name: "西安瑞博软件科技有限公司",
    creditCode: "91610100MA01FFFF09",
    contact: "高云",
    phone: "13100131009",
    email: "gaoyun@ruibo.com",
    address: "西安市高新区科技路",
    industry: "软件外包",
    size: "小型",
    softwareType: "委托",
    signStatus: "签约中",
    serviceLevel: "普通",
    activeCases: 1,
    manager: "李明",
    signDate: "2024-04-01",
    expireDate: "2025-03-31",
    source: "网络推广",
    tags: [],
    notes: ""
  },
  {
    id: "CU-2024-010",
    name: "重庆蓝图数字科技有限公司",
    creditCode: "91500100MA01GGGG10",
    contact: "林晓燕",
    phone: "13000130010",
    email: "linxy@lantoo.com",
    address: "重庆市渝北区互联网产业园",
    industry: "数字营销",
    size: "中型",
    softwareType: "自研",
    signStatus: "签约中",
    serviceLevel: "重点",
    activeCases: 2,
    manager: "王鹏",
    signDate: "2024-02-01",
    expireDate: "2025-01-31",
    source: "展会",
    tags: ["新客户"],
    notes: ""
  },
  {
    id: "CU-2024-011",
    name: "天津海河科技发展有限公司",
    creditCode: "91120100MA01HHHH11",
    contact: "马强",
    phone: "15900159011",
    email: "maqiang@haihe.com",
    address: "天津市滨海新区核心商务区",
    industry: "智慧城市",
    size: "大型",
    softwareType: "加急",
    signStatus: "签约中",
    serviceLevel: "VIP",
    activeCases: 3,
    manager: "李明",
    signDate: "2023-11-01",
    expireDate: "2025-10-31",
    source: "转介绍",
    tags: ["高价值", "批量申请"],
    notes: "政府项目背景，要求快"
  },
  {
    id: "CU-2024-012",
    name: "长沙领航电子信息技术有限公司",
    creditCode: "91430100MA01IIII12",
    contact: "谢婷",
    phone: "15800158012",
    email: "xieting@linghang.com",
    address: "长沙市岳麓区麓谷高新技术产业园",
    industry: "电子信息",
    size: "中型",
    softwareType: "自研",
    signStatus: "已续签",
    serviceLevel: "重点",
    activeCases: 2,
    manager: "陈静",
    signDate: "2022-12-01",
    expireDate: "2025-11-30",
    source: "老客户推荐",
    tags: ["长期客户"],
    notes: ""
  },
  {
    id: "CU-2024-013",
    name: "合肥睿思人工智能有限公司",
    creditCode: "91340100MA01JJJJ13",
    contact: "钱磊",
    phone: "15700157013",
    email: "qianlei@ruisi.ai",
    address: "合肥市高新区创新产业园",
    industry: "人工智能",
    size: "小型",
    softwareType: "委托",
    signStatus: "签约中",
    serviceLevel: "普通",
    activeCases: 1,
    manager: "王鹏",
    signDate: "2024-05-01",
    expireDate: "2025-04-30",
    source: "网络推广",
    tags: [],
    notes: ""
  },
  {
    id: "CU-2024-014",
    name: "福州闽达软件服务有限公司",
    creditCode: "91350100MA01KKKK14",
    contact: "陈晨",
    phone: "15600156014",
    email: "chenchen@minda.com",
    address: "福州市鼓楼区五四路软件园",
    industry: "软件服务",
    size: "小型",
    softwareType: "自研",
    signStatus: "签约中",
    serviceLevel: "普通",
    activeCases: 1,
    manager: "李明",
    signDate: "2024-03-15",
    expireDate: "2025-03-14",
    source: "网络推广",
    tags: [],
    notes: ""
  },
  {
    id: "CU-2024-015",
    name: "青岛海创数字科技有限公司",
    creditCode: "91370200MA01LLLL15",
    contact: "姜海洋",
    phone: "15500155015",
    email: "jianghy@haichuang.com",
    address: "青岛市崂山区株洲路数字产业园",
    industry: "海洋科技",
    size: "中型",
    softwareType: "加急",
    signStatus: "签约中",
    serviceLevel: "重点",
    activeCases: 2,
    manager: "陈静",
    signDate: "2024-01-20",
    expireDate: "2025-01-19",
    source: "主动开发",
    tags: ["加急客户"],
    notes: ""
  }
];

export const cases = [
  { id: "CA-2024-001", name: "智云科技ERP管理系统V2.0", client: "CU-2024-001", type: "普通", status: "已完成", submitDate: "2024-01-20", acceptDate: "2024-02-01", certDate: "2024-04-15", fee: 1200, manager: "李明", regNo: "2024SR001234" },
  { id: "CA-2024-002", name: "数联网络大数据分析平台", client: "CU-2024-002", type: "加急", status: "下证中", submitDate: "2024-05-10", acceptDate: "2024-05-20", certDate: null, fee: 2000, manager: "陈静", regNo: "2024SR005678" },
  { id: "CA-2024-003", name: "慧信软件项目管理工具V1.0", client: "CU-2024-003", type: "普通", status: "审查中", submitDate: "2024-06-01", acceptDate: "2024-06-12", certDate: null, fee: 1200, manager: "李明", regNo: "2024SR009012" },
  { id: "CA-2024-004", name: "腾飞信息AI客服系统", client: "CU-2024-004", type: "普通", status: "已完成", submitDate: "2023-03-15", acceptDate: "2023-03-28", certDate: "2023-06-10", fee: 1200, manager: "王鹏", regNo: "2023SR003456" },
  { id: "CA-2024-005", name: "云尚教育在线学习平台", client: "CU-2024-005", type: "普通", status: "受理中", submitDate: "2024-03-05", acceptDate: "2024-03-18", certDate: null, fee: 1200, manager: "陈静", regNo: "2024SR002345" },
  { id: "CA-2024-006", name: "数字创新大数据治理平台V3.0", client: "CU-2024-006", type: "加急", status: "审查中", submitDate: "2024-02-20", acceptDate: "2024-03-01", certDate: null, fee: 2000, manager: "李明", regNo: "2024SR007890" },
  { id: "CA-2024-007", name: "智慧物流智能调度系统", client: "CU-2024-007", type: "加急", status: "下证中", submitDate: "2024-04-01", acceptDate: "2024-04-12", certDate: null, fee: 2000, manager: "王鹏", regNo: "2024SR011234" },
  { id: "CA-2024-008", name: "博远信息工业控制软件V2.1", client: "CU-2024-008", type: "普通", status: "已完成", submitDate: "2023-06-01", acceptDate: "2023-06-15", certDate: "2023-09-20", fee: 1200, manager: "陈静", regNo: "2023SR006789" },
  { id: "CA-2024-009", name: "瑞博软件代码生成工具", client: "CU-2024-009", type: "普通", status: "待提交", submitDate: null, acceptDate: null, certDate: null, fee: 1200, manager: "李明", regNo: null },
  { id: "CA-2024-010", name: "蓝图数字营销分析系统", client: "CU-2024-010", type: "普通", status: "受理中", submitDate: "2024-02-15", acceptDate: "2024-02-28", certDate: null, fee: 1200, manager: "王鹏", regNo: "2024SR004567" },
  { id: "CA-2024-011", name: "海河科技智慧园区管理平台V1.0", client: "CU-2024-011", type: "加急", status: "审查中", submitDate: "2024-03-20", acceptDate: "2024-04-01", certDate: null, fee: 2000, manager: "李明", regNo: "2024SR008901" },
  { id: "CA-2024-012", name: "领航电子设备管理系统", client: "CU-2024-012", type: "普通", status: "已完成", submitDate: "2023-01-10", acceptDate: "2023-01-25", certDate: "2023-04-30", fee: 1200, manager: "陈静", regNo: "2023SR001234" },
  { id: "CA-2024-013", name: "睿思AI图像识别引擎", client: "CU-2024-013", type: "普通", status: "待提交", submitDate: null, acceptDate: null, certDate: null, fee: 1200, manager: "王鹏", regNo: null },
  { id: "CA-2024-014", name: "闽达软件财务管理系统V1.5", client: "CU-2024-014", type: "普通", status: "受理中", submitDate: "2024-04-10", acceptDate: "2024-04-22", certDate: null, fee: 1200, manager: "李明", regNo: "2024SR010123" },
  { id: "CA-2024-015", name: "智云科技移动办公APP", client: "CU-2024-001", type: "加急", status: "已完成", submitDate: "2023-08-01", acceptDate: "2023-08-15", certDate: "2023-10-28", fee: 2000, manager: "李明", regNo: "2023SR008888" },
  { id: "CA-2024-016", name: "数联网络用户行为分析系统", client: "CU-2024-002", type: "普通", status: "待提交", submitDate: null, acceptDate: null, certDate: null, fee: 1200, manager: "陈静", regNo: null },
  { id: "CA-2024-017", name: "数字创新智能运维平台", client: "CU-2024-006", type: "普通", status: "受理中", submitDate: "2024-05-01", acceptDate: "2024-05-14", certDate: null, fee: 1200, manager: "李明", regNo: "2024SR012345" },
  { id: "CA-2024-018", name: "智慧物流仓储管理系统V2.0", client: "CU-2024-007", type: "加急", status: "审查中", submitDate: "2024-05-20", acceptDate: "2024-06-01", certDate: null, fee: 2000, manager: "王鹏", regNo: "2024SR013456" },
  { id: "CA-2024-019", name: "海河科技智能停车系统", client: "CU-2024-011", type: "普通", status: "待提交", submitDate: null, acceptDate: null, certDate: null, fee: 1200, manager: "李明", regNo: null },
  { id: "CA-2024-020", name: "海创数字海洋监测平台V1.0", client: "CU-2024-015", type: "加急", status: "下证中", submitDate: "2024-03-01", acceptDate: "2024-03-15", certDate: null, fee: 2000, manager: "陈静", regNo: "2024SR006543" }
];

export const paymentRecords = [
  { id: "PAY-001", client: "CU-2024-001", case: "CA-2024-001", amount: 1200, received: 1200, pending: 0, method: "银行转账", dueDate: "2024-02-01", status: "已收款" },
  { id: "PAY-002", client: "CU-2024-002", case: "CA-2024-002", amount: 2000, received: 1000, pending: 1000, method: "支付宝", dueDate: "2024-05-20", status: "部分收款" },
  { id: "PAY-003", client: "CU-2024-003", case: "CA-2024-003", amount: 1200, received: 0, pending: 1200, method: "银行转账", dueDate: "2024-04-01", status: "逾期未收" },
  { id: "PAY-004", client: "CU-2024-006", case: "CA-2024-006", amount: 2000, received: 2000, pending: 0, method: "银行转账", dueDate: "2024-03-01", status: "已收款" },
  { id: "PAY-005", client: "CU-2024-007", case: "CA-2024-007", amount: 2000, received: 0, pending: 2000, method: "银行转账", dueDate: "2024-04-12", status: "逾期未收" },
];

export const tickets = [
  { id: "TK-001", client: "CU-2024-001", case: "CA-2024-001", type: "进度查询", content: "请问软著什么时候能下证", status: "已处理", handler: "李明", createdAt: "2024-04-01" },
  { id: "TK-002", client: "CU-2024-002", case: "CA-2024-002", type: "材料补正", content: "需要补充源代码第30-50页截图", status: "待处理", handler: "陈静", createdAt: "2024-06-01" },
  { id: "TK-003", client: "CU-2024-003", case: "CA-2024-003", type: "加急申请", content: "客户要求加急处理，愿意加付费用", status: "处理中", handler: "李明", createdAt: "2024-06-05" },
];

export const incomeTrend = [
  { month: "1月", amount: 18000 },
  { month: "2月", amount: 22000 },
  { month: "3月", amount: 15000 },
  { month: "4月", amount: 28000 },
  { month: "5月", amount: 32000 },
  { month: "6月", amount: 25000 },
];
```

## 第四步：重写所有页面和组件

**编写规则：**
1. 所有文件使用 UTF-8 编码
2. 所有 UI 组件必须从 `@/components/ui/*` 导入（shadcn）
3. 不允许使用任何自定义 `<button>` `<input>` `<select>` 裸标签，必须用 shadcn 组件
4. 侧边栏使用 shadcn `Button` variant="ghost"
5. 状态 Badge 全部用 shadcn `Badge` + className 颜色
6. 所有卡片用 shadcn `Card` + `CardHeader` + `CardContent`
7. 所有表格用 shadcn `Table` 组件族

### app/layout.tsx - 侧边栏布局

```tsx
// 侧边栏用 shadcn Button variant="ghost"，激活态加 bg-accent
// 导航项：仪表盘、客户列表、新建客户、案件列表、新建案件、合同列表、收款管理、开票记录、工单列表、数据看板、权限管理
// 顶部：Logo "华代优服" + "软著代理管理系统"
// 可折叠侧边栏（用 useState 控制 collapsed）
// 面包屑用当前路径自动生成
```

### app/page.tsx - 仪表盘

4个 Card KPI：本月新签客户(8, +18%)、在办案件数(统计)、本月回款(统计)、待处理工单(统计)

案件看板预览表格（shadcn Table，5列：案件名/客户/状态/截止/负责人）

待办提醒列表（4条，不同颜色Badge）

月度收入趋势（用div+tailwind宽度模拟柱状图，不用图表库）

### app/customers/page.tsx - 客户列表

顶部：Input搜索 + Select筛选(签约状态/服务等级) + Button新建客户

Table（15列完整数据，Badge显示签约状态和服务等级）+ 分页

### app/customers/[id]/page.tsx - 客户详情

Tabs 4个Tab（shadcn Tabs组件）：基本信息/软著案件/合同财务/服务记录

### app/cases/page.tsx - 案件列表

看板/表格双视图切换（Button组切换）
看板：5列（待提交/受理中/审查中/下证中/已完成），Card显示每个案件
表格：shadcn Table

### app/cases/[id]/page.tsx - 案件详情

流程时间线（竖向div，Badge状态）
基本信息（两列）
材料清单（Checkbox列表，用shadcn Checkbox如果有，否则用input type=checkbox）

### app/contracts/page.tsx - 合同列表
Table + Badge

### app/finance/page.tsx - 收款管理
4个KPI Card + Table（颜色标记逾期=red，即将到期=orange）

### app/finance/invoices/page.tsx - 开票记录
Table

### app/services/page.tsx - 工单列表
Table + Badge

### app/reports/page.tsx - 数据看板
6个KPI Card + Tailwind柱状图 + 进度条排行榜

### app/system/page.tsx - 权限管理
角色权限Table（管理员/销售/案件专员/财务/客服/管理层）

### app/customers/new/page.tsx - 新建客户表单
shadcn Input + Select + Label + Button，react-hook-form + zod

### app/cases/new/page.tsx - 新建案件表单
shadcn Input + Select + Label + Button，react-hook-form + zod

## 验收
1. `npm run build` 无报错
2. 无乱码，所有中文正常显示
3. 无自定义