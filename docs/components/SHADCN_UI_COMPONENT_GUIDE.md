# shadcn/ui 组件使用指南

## 开发原则
**优先使用 shadcn/ui 现成组件，只在绝对必要时才创建自定义组件。**

## 已安装的组件

### ✅ 当前项目中已有的组件
1. **Button** - 按钮
2. **Card** - 卡片容器
3. **Input** - 输入框
4. **Label** - 标签
5. **Avatar** - 头像
6. **Dropdown Menu** - 下拉菜单
7. **Radio Group** - 单选组

## 可安装的 shadcn/ui 组件清单

### 布局和容器类
- **Accordion** - 手风琴/折叠面板（FAQ、内容展开）
- **Alert** - 警告提示（通知、提示信息）
- **Aspect Ratio** - 宽高比容器（图片、视频）
- **Collapsible** - 可折叠容器
- **Dialog** - 对话框/模态框
- **Drawer** - 抽屉（移动端菜单）
- **Popover** - 弹出框
- **ScrollArea** - 滚动区域
- **Separator** - 分隔线
- **Sheet** - 侧边栏/面板
- **Skeleton** - 加载骨架屏
- **Tabs** - 标签页
- **Tooltip** - 工具提示

### 导航类
- **Breadcrumb** - 面包屑导航
- **Command** - 命令面板/搜索
- **Context Menu** - 右键菜单
- **Menubar** - 菜单栏
- **Navigation Menu** - 导航菜单（主导航）
- **Pagination** - 分页

### 表单类
- **Checkbox** - 复选框
- **Form** - 表单（配合 react-hook-form）
- **Select** - 下拉选择
- **Slider** - 滑块
- **Switch** - 开关
- **Textarea** - 多行文本框
- **Toggle** - 切换按钮
- **Toggle Group** - 切换组

### 数据展示类
- **Badge** - 徽章（标签、状态）
- **Calendar** - 日历
- **Chart** - 图表
- **Data Table** - 数据表格
- **Progress** - 进度条
- **Table** - 基础表格

### 反馈类
- **Alert Dialog** - 确认对话框
- **Sonner** - Toast 通知（已集成）
- **Toast** - 吐司提示

### 特殊功能
- **Carousel** - 轮播图（图片展示）
- **Resizable** - 可调整大小

## She Sharp 项目组件映射建议

### 首页需求 → shadcn/ui 组件
```typescript
// Hero Section
- Button (CTA按钮) ✅ 已安装
- Card (统计数据卡片) ✅ 已安装

// 导航
- Navigation Menu (主导航栏) ⚡ 需安装
- Sheet (移动端菜单) ⚡ 需安装

// 内容展示
- Carousel (赞助商Logo轮播) ⚡ 需安装
- Tabs (内容切换) ⚡ 需安装
- Badge (标签展示) ⚡ 需安装
```

### 关于我们页面
```typescript
// 团队展示
- Card (成员卡片) ✅ 已安装
- Avatar (成员头像) ✅ 已安装
- Dialog (成员详情弹窗) ⚡ 需安装
- Badge (角色标签) ⚡ 需安装
```

### 活动页面
```typescript
// 活动列表
- Card (活动卡片) ✅ 已安装
- Badge (活动标签) ⚡ 需安装
- Calendar (日期选择) ⚡ 需安装
- Select (筛选器) ⚡ 需安装
- Pagination (分页) ⚡ 需安装
```

### 导师计划
```typescript
// 导师展示
- Card (导师卡片) ✅ 已安装
- Avatar (导师头像) ✅ 已安装
- Badge (专业领域标签) ⚡ 需安装
- Tabs (分类展示) ⚡ 需安装
```

### 联系页面
```typescript
// 联系表单
- Form (表单容器) ⚡ 需安装
- Input (输入框) ✅ 已安装
- Textarea (留言框) ⚡ 需安装
- Select (主题选择) ⚡ 需安装
- Button (提交按钮) ✅ 已安装
- Toast (提交反馈) ⚡ 需安装
```

### 媒体中心
```typescript
// 图片画廊
- Aspect Ratio (图片容器) ⚡ 需安装
- Dialog (图片放大) ⚡ 需安装
- Carousel (图片轮播) ⚡ 需安装

// 播客/视频
- Card (媒体卡片) ✅ 已安装
- Skeleton (加载状态) ⚡ 需安装
```

## 安装命令示例

```bash
# 安装单个组件
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet
npx shadcn@latest add badge
npx shadcn@latest add tabs

# 安装多个组件
npx shadcn@latest add form select textarea toast

# 为特定功能安装组件集
# 导航相关
npx shadcn@latest add navigation-menu sheet breadcrumb

# 表单相关
npx shadcn@latest add form select textarea checkbox switch toast

# 内容展示
npx shadcn@latest add tabs carousel badge skeleton aspect-ratio
```

## 自定义组件决策树

在创建自定义组件前，请按以下步骤检查：

1. **是否有 shadcn/ui 组件可以满足需求？**
   - ✅ 是 → 使用 shadcn/ui 组件
   - ❌ 否 → 继续步骤2

2. **能否组合多个 shadcn/ui 组件实现？**
   - ✅ 是 → 创建组合组件
   - ❌ 否 → 继续步骤3

3. **能否扩展现有 shadcn/ui 组件？**
   - ✅ 是 → 基于 shadcn/ui 组件扩展
   - ❌ 否 → 继续步骤4

4. **是否是项目特定的业务组件？**
   - ✅ 是 → 创建自定义组件
   - ❌ 否 → 重新评估需求

## 组件样式定制

使用 She Sharp 的配色系统定制 shadcn/ui 组件：

```tsx
// 使用品牌色的按钮
<Button className="bg-purple-dark hover:bg-purple-mid">
  加入我们
</Button>

// 使用品牌色的徽章
<Badge className="bg-periwinkle-dark text-white">
  新活动
</Badge>

// 自定义卡片
<Card className="border-periwinkle-light bg-purple-light/10">
  <CardContent>内容</CardContent>
</Card>
```

## 推荐安装优先级

### 🚀 高优先级（立即需要）
1. `navigation-menu` - 主导航
2. `sheet` - 移动端菜单
3. `badge` - 标签展示
4. `tabs` - 内容切换
5. `form` + `textarea` - 表单功能

### 📋 中优先级（近期需要）
1. `carousel` - 图片/Logo轮播
2. `dialog` - 弹窗交互
3. `select` - 下拉选择
4. `toast` - 操作反馈
5. `skeleton` - 加载状态

### 📦 低优先级（后期考虑）
1. `calendar` - 活动日期
2. `pagination` - 列表分页
3. `aspect-ratio` - 媒体容器
4. `breadcrumb` - 路径导航
5. `progress` - 进度展示