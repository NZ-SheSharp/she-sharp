# She Sharp 后端功能集成计划

## 现有后端功能清单

### 1. 认证系统 ✅
- **位置**: `/lib/auth/`
- **功能**:
  - JWT 会话管理
  - 密码加密 (argon2)
  - Cookie 管理
  - 中间件保护路由
- **集成时机**: 会员注册功能上线时

### 2. 数据库系统 ✅
- **技术**: PostgreSQL + Drizzle ORM
- **模型** (`/lib/db/schema.ts`):
  - users - 用户表
  - teams - 团队表
  - teamMembers - 团队成员关系
  - activityLogs - 活动日志
  - invitations - 邀请
- **集成时机**: 会员系统开发时

### 3. 支付系统 ✅
- **技术**: Stripe
- **功能** (`/lib/payments/`):
  - 客户创建
  - 订阅管理
  - Webhook 处理
  - 客户门户
- **集成时机**: 捐赠/会员付费功能

### 4. API 路由 ✅
- **位置**: `/app/api/`
- **现有端点**:
  - `/api/auth/*` - 认证相关
  - `/api/team/*` - 团队管理
  - `/api/user` - 用户管理
  - `/api/webhooks/stripe` - 支付回调

## 集成阶段规划

### 第一阶段：纯前端开发（当前）
- 不使用任何后端功能
- 所有数据硬编码或来自 Markdown
- 专注于UI/UX和页面结构

### 第二阶段：会员系统集成
1. **用户注册/登录**
   - 复用现有认证系统
   - 添加"成为会员"流程
   - 个人资料页面

2. **会员专属内容**
   - 活动报名（需登录）
   - 会员资源下载
   - 个人活动历史

### 第三阶段：活动管理系统
1. **活动数据模型**
   ```typescript
   // 扩展 schema.ts
   events: {
     id: string
     title: string
     description: text
     date: timestamp
     location: string
     capacity: number
     imageUrl: string
   }
   
   eventRegistrations: {
     userId: string
     eventId: string
     registeredAt: timestamp
   }
   ```

2. **活动功能**
   - 在线报名
   - 座位管理
   - 报名确认邮件

### 第四阶段：导师计划系统
1. **数据模型扩展**
   ```typescript
   mentorProfiles: {
     userId: string
     expertise: string[]
     bio: text
     availability: string
   }
   
   mentorshipApplications: {
     menteeId: string
     mentorId: string
     status: enum
     message: text
   }
   ```

2. **功能实现**
   - 导师申请流程
   - 学员配对系统
   - 进度跟踪

### 第五阶段：捐赠系统
1. **利用现有 Stripe 集成**
   - 一次性捐赠
   - 定期捐赠（订阅）
   - 捐赠证书生成

2. **数据追踪**
   ```typescript
   donations: {
     userId: string
     amount: number
     type: 'one-time' | 'recurring'
     stripePaymentId: string
   }
   ```

## 技术注意事项

### 保持代码分离
```typescript
// 前端页面组件
/app/(site)/events/page.tsx       // 静态展示

// 后端集成版本
/app/(site)/events/[id]/register/page.tsx  // 需要认证
```

### 环境变量管理
```env
# 前端开发阶段可设为空
NEXT_PUBLIC_ENABLE_AUTH=false
NEXT_PUBLIC_ENABLE_PAYMENTS=false

# 后端集成时启用
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
```

### 渐进式增强
1. 先实现静态版本
2. 添加客户端交互
3. 集成后端API
4. 添加实时功能

## 数据迁移策略

### Markdown 到数据库
1. 保留 Markdown 作为初始数据源
2. 创建导入脚本
3. 逐步迁移到数据库
4. 保持向后兼容

### 示例迁移脚本
```typescript
// scripts/import-content.ts
import { readMdFiles } from './utils'
import { db } from '@/lib/db'

async function importEvents() {
  const events = await readMdFiles('/content/events')
  await db.insert(eventsTable).values(events)
}
```

## 测试策略

### 前端测试（当前阶段）
- 组件单元测试
- 页面集成测试
- 视觉回归测试

### 后端集成测试（未来）
- API 端点测试
- 认证流程测试
- 支付流程测试
- 数据库事务测试

## 部署考虑

### 环境分离
- `preview` - 前端预览（无后端）
- `staging` - 完整功能测试
- `production` - 生产环境

### 功能开关
```typescript
// lib/features.ts
export const features = {
  auth: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
  payments: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true',
  events: process.env.NEXT_PUBLIC_ENABLE_EVENTS === 'true',
}
```

这样可以逐步启用功能，降低风险。