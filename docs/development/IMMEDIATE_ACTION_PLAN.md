# She Sharp 立即行动计划

## 今日开始的具体步骤

### 1. 准备前端开发环境（第一步）
- [ ] 保留所有现有后端功能（认证、数据库、支付）
- [ ] 创建新的页面路由结构（不影响现有功能）
- [ ] 整理可复用的 UI 组件（Button, Card等）
- [ ] 在 app 目录下创建 (site) 文件夹用于公共页面
- [ ] 保持现有 (dashboard) 功能完整

### 2. 设置 She Sharp 品牌（第二步）✅
- [x] 创建颜色主题
  ```css
  - 主色：#9b2e83 (Purple Dark)
  - 次色：#8982ff (Periwinkle Dark)
  - 强调色：#b1f6e9 (Mint Dark)
  - 文本：#1f1e44 (Navy Dark)
  ```
- [x] 配置 Tailwind 颜色系统
- [x] 创建颜色使用指南
- [ ] 配置字体
- [ ] 更新 favicon 和 metadata

### 3. 创建基础布局组件（第三步）
```
/components/layout/
  - Header.tsx (导航栏)
  - Footer.tsx (页脚)
  - MobileMenu.tsx (移动端菜单)
```

### 4. 实现首页（第四步）
基于 home-page.md 内容创建以下部分：
- [ ] HeroSection (带视频背景)
- [ ] StatsSection (会员数、赞助商数、活动数)
- [ ] CommitmentsSection (连接、启发、赋能)
- [ ] SponsorsSection
- [ ] CTASection (捐赠和参加活动)

### 5. 设置路由结构（第五步）
```
/app/
  ├── (dashboard)/    # 保留现有的后台功能
  │   └── ...现有文件
  ├── (login)/        # 保留现有的登录功能
  │   └── ...现有文件
  └── (site)/         # 新增公共网站页面
      ├── page.tsx (首页)
      ├── about/page.tsx
      ├── events/page.tsx
      ├── mentorship/
      │   ├── page.tsx
      │   ├── mentors/page.tsx
      │   └── mentee/page.tsx
      ├── media/
      │   ├── podcasts/page.tsx
      │   ├── newsletters/page.tsx
      │   ├── press/page.tsx
      │   └── gallery/page.tsx
      ├── contact/page.tsx
      ├── donate/page.tsx
      └── join/page.tsx
```

## 组件优先级列表

### 立即需要的 shadcn/ui 组件：
1. **Button** ✅ - 已安装
2. **Card** ✅ - 已安装
3. **NavigationMenu** ⚡ - 需安装 `npx shadcn@latest add navigation-menu`
4. **Sheet** ⚡ - 需安装（移动端菜单）`npx shadcn@latest add sheet`
5. **Badge** ⚡ - 需安装（标签）`npx shadcn@latest add badge`

### 自定义组件（仅在需要时创建）：
1. **Section** - 页面区块容器（shadcn/ui 无此组件）
2. **Container** - 内容宽度限制（shadcn/ui 无此组件）

### 第二批 shadcn/ui 组件：
1. **Tabs** ⚡ - 内容切换 `npx shadcn@latest add tabs`
2. **Dialog** ⚡ - 弹窗详情 `npx shadcn@latest add dialog`
3. **Carousel** ⚡ - 轮播图 `npx shadcn@latest add carousel`
4. **Skeleton** ⚡ - 加载状态 `npx shadcn@latest add skeleton`
5. **Form** ⚡ - 表单容器 `npx shadcn@latest add form`

### 组合组件（基于 shadcn/ui）：
1. **TeamMemberCard** - 基于 Card + Avatar + Badge
2. **EventCard** - 基于 Card + Badge + Button
3. **SponsorLogo** - 基于 Card + 图片
4. **StatCounter** - 自定义（shadcn/ui 无此组件）
5. **VideoPlayer** - 自定义（shadcn/ui 无此组件）

### 样式指南快速参考（已更新）：
```tsx
// 颜色 - 使用 Tailwind 类名
const colors = {
  primary: 'purple-dark',      // #9b2e83
  secondary: 'periwinkle-dark', // #8982ff
  accent: 'mint-dark',         // #b1f6e9
  text: 'navy-dark',           // #1f1e44
  background: 'white',         // #ffffff
  muted: 'gray'               // #9b9b9b
}

// 常用样式组合
const styles = {
  // 按钮
  primaryButton: 'bg-purple-dark text-white hover:bg-purple-mid',
  secondaryButton: 'bg-periwinkle-dark text-white hover:opacity-90',
  outlineButton: 'border-2 border-purple-dark text-purple-dark hover:bg-purple-light',
  
  // 文本
  heading: 'text-navy-dark',
  bodyText: 'text-navy-dark',
  mutedText: 'text-gray',
  link: 'text-blue hover:text-purple-dark',
  
  // 背景
  sectionBg: 'bg-white',
  cardBg: 'bg-navy-light',
  accentBg: 'bg-mint-light'
}

// 间距
const spacing = {
  section: 'py-16 md:py-24',
  container: 'px-4 md:px-6 max-w-7xl mx-auto',
  card: 'p-6 md:p-8'
}

// 字体大小
const typography = {
  h1: 'text-4xl md:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl font-semibold',
  h3: 'text-2xl md:text-3xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm md:text-base'
}
```

## 今日目标（可实现）

1. **上午**：
   - 清理模板代码
   - 设置品牌颜色和基础样式

2. **下午**：
   - 创建 Header 和 Footer 组件
   - 实现首页的 Hero Section

3. **晚上**：
   - 添加统计数据部分
   - 创建基础的响应式布局

## 开发原则

1. **优先使用 shadcn/ui**: 充分利用现成组件，避免重复造轮子
2. **移动优先**: 先为移动设备设计，再扩展到桌面
3. **渐进增强**: 基础功能先行，动画效果后加
4. **可访问性**: 每个组件都考虑键盘导航和屏幕阅读器
5. **性能优先**: 使用 next/image，懒加载，代码分割
6. **组件复用**: 优先使用和组合 shadcn/ui 组件

### 组件开发流程
1. 检查 shadcn/ui 是否有合适组件
2. 如果没有，尝试组合现有 shadcn/ui 组件
3. 只在必要时创建自定义组件
4. 自定义组件也应基于 shadcn/ui 的设计系统

## 参考资源

- She Sharp 现有网站：https://www.shesharp.org.nz
- 品牌颜色提取自现有视觉元素
- 内容来源：/she-sharp-pages-md/ 目录下的 markdown 文件

准备好开始了吗？让我们从清理模板代码开始！