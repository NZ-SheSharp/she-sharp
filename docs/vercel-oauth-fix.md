# Vercel OAuth 配置修复指南

## 重要：需要在 Vercel 添加的环境变量

请确保在 Vercel Dashboard 中添加以下**所有**环境变量：

```bash
# OAuth 提供商凭据
GOOGLE_CLIENT_ID=805677253031-d5vboo06na716qq34edbvfbfb71rb7ht.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23liX6wkCcjLXsHNvR
GITHUB_CLIENT_SECRET=12cca699acfaba84dc8c03f72c2a352d34f5b0bc

# NextAuth 配置（两个都需要添加）
NEXTAUTH_URL=https://she-sharp.vercel.app
AUTH_URL=https://she-sharp.vercel.app
NEXTAUTH_SECRET=crdNTV2N4rkgvJjaA+tmlGMkAaXGhcvLBpGt2dHOElE=
AUTH_SECRET=crdNTV2N4rkgvJjaA+tmlGMkAaXGhcvLBpGt2dHOElE=
```

## 添加步骤

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择 `she-sharp` 项目
3. 点击 **Settings** → **Environment Variables**
4. 添加每个变量（选择 **Production** 环境）
5. 重要：确保 URL 变量**没有**尾部斜杠

## 更新 OAuth 提供商回调 URL

### Google OAuth
1. 访问 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. 确保已添加以下授权重定向 URI：
   - `https://she-sharp.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`（用于本地测试）

### GitHub OAuth
1. 访问 [GitHub OAuth Apps](https://github.com/settings/developers)
2. 确保授权回调 URL 设置为：
   - 生产环境：`https://she-sharp.vercel.app/api/auth/callback/github`
   - 或创建两个独立的应用（一个用于生产，一个用于开发）

## 验证部署

部署后，检查以下内容：

1. 访问 https://she-sharp.vercel.app/api/auth/providers
   - 应该返回 `{"providers":{"google":true,"github":true}}`

2. 访问 https://she-sharp.vercel.app/sign-in
   - 应该显示 Google 和 GitHub 登录按钮

3. 点击任一按钮应该重定向到相应的 OAuth 提供商

## 故障排除

如果仍然无法登录：

1. **检查 Vercel Functions 日志**
   - Vercel Dashboard → Functions → 查看错误日志

2. **常见错误**：
   - "Configuration error"：环境变量未正确设置
   - "Callback URL mismatch"：OAuth 提供商的回调 URL 不匹配
   - "email_verified column not found"：数据库需要迁移

3. **清除浏览器缓存和 cookies**
   - 有时旧的会话会干扰新的登录尝试

## 本地测试

```bash
# 确保环境变量设置正确
pnpm dev

# 访问 http://localhost:3000/sign-in
# 测试 OAuth 登录
```