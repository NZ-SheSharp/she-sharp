# She Sharp 组件开发检查清单

## 🏗️ 开始新页面前的检查清单

### 1. 组件需求分析
- [ ] 列出页面所有 UI 元素
- [ ] 标记交互功能（点击、悬停、展开等）
- [ ] 确定响应式断点需求
- [ ] 明确可访问性要求

### 2. shadcn/ui 组件映射
- [ ] 对照 shadcn/ui 组件列表
- [ ] 标记已安装的组件 ✅
- [ ] 列出需要安装的组件 ⚡
- [ ] 确认没有遗漏的组件

### 3. 安装所需组件
```bash
# 示例：为首页安装组件
npx shadcn@latest add navigation-menu sheet tabs badge carousel skeleton
```

### 4. 创建页面结构
- [ ] 使用 shadcn/ui 组件构建
- [ ] 应用 She Sharp 颜色系统
- [ ] 确保移动端优先
- [ ] 测试键盘导航

## 📝 各页面组件清单

### 🏠 首页 (Home Page)
```
必需组件：
□ Navigation Menu - 主导航
□ Sheet - 移动菜单
□ Button - CTA按钮 ✅
□ Card - 统计卡片 ✅
□ Tabs - 承诺切换
□ Badge - 标签
□ Carousel - 赞助商轮播
□ Skeleton - 加载状态
□ Toggle - 视频控制

可选组件：
□ Alert - 活动通知
□ Separator - 分隔线
```

### 👥 关于我们 (About Us)
```
必需组件：
□ Card - 团队卡片 ✅
□ Avatar - 成员头像 ✅
□ Badge - 角色标签
□ Dialog - 成员详情
□ Tabs - 内容切换

可选组件：
□ Hover Card - 快速预览
□ Collapsible - 内容折叠
□ Scroll Area - 长内容滚动
```

### 📅 活动页面 (Events)
```
必需组件：
□ Card - 活动卡片 ✅
□ Badge - 活动状态
□ Calendar - 日期筛选
□ Select - 类别筛选
□ Pagination - 分页
□ Dialog - 活动详情

可选组件：
□ Command - 搜索功能
□ Date Picker - 日期选择
□ Skeleton - 加载状态
```

### 👩‍🏫 导师计划 (Mentorship)
```
必需组件：
□ Card - 导师卡片 ✅
□ Avatar - 导师头像 ✅
□ Badge - 专业标签
□ Tabs - 分类展示
□ Form - 申请表单
□ Accordion - FAQ

可选组件：
□ Progress - 申请进度
□ Alert - 提示信息
□ Dialog - 导师详情
```

### 📰 媒体中心 (Media)
```
必需组件：
□ Tabs - 内容分类
□ Card - 媒体卡片 ✅
□ Aspect Ratio - 图片容器
□ Dialog - 图片放大
□ Table - 新闻列表

可选组件：
□ Carousel - 图片轮播
□ Scroll Area - 列表滚动
□ Skeleton - 加载状态
□ Progress - 播放进度
```

### 📧 联系我们 (Contact)
```
必需组件：
□ Form - 表单容器
□ Input - 输入框 ✅
□ Textarea - 留言框
□ Select - 主题选择
□ Button - 提交按钮 ✅
□ Toast/Sonner - 反馈提示

可选组件：
□ Checkbox - 条款同意
□ Alert - 提示信息
□ Label - 表单标签 ✅
```

### 💝 捐赠页面 (Donate)
```
必需组件：
□ Card - 捐赠选项 ✅
□ Radio Group - 金额选择 ✅
□ Button - 捐赠按钮 ✅
□ Badge - 特别标记
□ Alert - 说明信息

可选组件：
□ Tabs - 捐赠方式
□ Progress - 募捐进度
□ Dialog - 感谢弹窗
```

## 🛠️ 组件组合模板

### 标准页面布局
```tsx
<div className="min-h-screen">
  <NavigationMenu /> {/* 或 Header 组件 */}
  <main>
    <Section>
      {/* 页面内容 */}
    </Section>
  </main>
  <Footer />
</div>
```

### 卡片网格布局
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      {/* 卡片内容 */}
    </Card>
  ))}
</div>
```

### 响应式容器
```tsx
<div className="container px-4 md:px-6 max-w-7xl mx-auto">
  {/* 内容 */}
</div>
```

## ⚡ 快速安装命令

### 安装所有常用组件
```bash
# 基础组件包
npx shadcn@latest add button card avatar badge input label

# 导航组件包
npx shadcn@latest add navigation-menu sheet breadcrumb tabs

# 表单组件包
npx shadcn@latest add form textarea select checkbox radio-group toast

# 展示组件包
npx shadcn@latest add dialog carousel skeleton aspect-ratio separator

# 高级组件包
npx shadcn@latest add accordion table pagination progress alert
```

## 🎯 记住：优先使用 shadcn/ui！

1. 总是先检查 shadcn/ui 是否有合适的组件
2. 尽量通过组合现有组件解决问题
3. 只在绝对必要时创建自定义组件
4. 保持设计系统的一致性