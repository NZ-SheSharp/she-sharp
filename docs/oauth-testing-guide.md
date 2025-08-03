# OAuth 测试指南

## 本地测试步骤

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问登录页面**
   - 打开浏览器访问: http://localhost:3000/sign-in

3. **测试 OAuth 登录**
   - 点击 "Google" 或 "GitHub" 按钮
   - 应该直接跳转到相应的 OAuth 提供商页面
   - 授权后应该重定向回 /dashboard

## 生产环境测试

### 必需的 Vercel 环境变量
请确保在 Vercel Dashboard 中添加了所有这些变量：

```bash
# OAuth 凭据
GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
GITHUB_CLIENT_ID=[YOUR_GITHUB_CLIENT_ID]
GITHUB_CLIENT_SECRET=[YOUR_GITHUB_CLIENT_SECRET]

# NextAuth 配置（所有这些都需要）
NEXTAUTH_URL=https://she-sharp.vercel.app
AUTH_URL=https://she-sharp.vercel.app
NEXTAUTH_SECRET=[GENERATE_WITH: openssl rand -base64 32]
AUTH_SECRET=[SAME_AS_NEXTAUTH_SECRET]
```

### OAuth 提供商配置

#### Google OAuth
1. 访问 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. 确保添加了这些授权重定向 URI：
   - `https://she-sharp.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth
1. 访问 [GitHub OAuth Apps](https://github.com/settings/developers)
2. 确保授权回调 URL 正确：
   - 生产: `https://she-sharp.vercel.app/api/auth/callback/github`
   - 本地: `http://localhost:3000/api/auth/callback/github`

## 故障排除

### 常见问题和解决方案

1. **"Configuration" 错误**
   - 原因：环境变量未设置
   - 解决：检查 Vercel 环境变量

2. **重定向循环**
   - 原因：NextAuth 配置问题
   - 解决：已通过服务器动作修复

3. **"UnknownAction" 错误**
   - 原因：使用了错误的 API 端点
   - 解决：已更新为使用正确的服务器动作

4. **无法跳转到 OAuth 提供商**
   - 原因：回调 URL 不匹配
   - 解决：检查 OAuth 提供商设置

### 检查清单

- [ ] 本地环境变量 (.env.local) 已配置
- [ ] Vercel 环境变量已添加
- [ ] Google OAuth 回调 URL 已配置
- [ ] GitHub OAuth 回调 URL 已配置
- [ ] 数据库迁移已运行（`pnpm db:migrate`）

## 成功标志

OAuth 登录成功的标志：
1. 点击 OAuth 按钮后直接跳转到提供商
2. 授权后重定向到 /dashboard
3. 用户信息正确显示在仪表板
4. 没有错误消息或重定向循环

## 技术实现说明

当前实现使用：
- **服务器动作**：通过表单提交触发 OAuth 流程
- **NextAuth signIn**：处理 OAuth 提供商认证
- **自定义适配器**：处理整数 ID 与 NextAuth 的兼容性
- **Session Provider**：提供客户端会话管理