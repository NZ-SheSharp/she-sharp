# Vercel 环境变量更新指南

## ✅ 已更新的本地配置

以下凭据已在本地 `.env` 和 `.env.local` 文件中更新：

### 新的 OAuth 凭据
- **Google Client ID**: `805677253031-d5vboo06na716qq34edbvfbfb71rb7ht.apps.googleusercontent.com` (未变)
- **Google Client Secret**: `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` ✅ (已更新)
- **GitHub Client ID**: `Ov23liX6wkCcjLXsHNvR` (未变)
- **GitHub Client Secret**: `89f8abf477356321c189c97fd43ded87c6560600` ✅ (已更新)

### 新的认证密钥
- **AUTH_SECRET**: `/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=` ✅ (已更新)
- **NEXTAUTH_SECRET**: `/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=` ✅ (已更新)

## 🚀 Vercel 部署更新步骤

### 1. 登录 Vercel Dashboard
访问: https://vercel.com/dashboard

### 2. 进入项目设置
选择 `she-sharp` 项目 → Settings → Environment Variables

### 3. 更新以下环境变量

请更新这些变量的值（点击每个变量旁边的编辑按钮）：

```bash
# OAuth 凭据 - 必须更新
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_SECRET=89f8abf477356321c189c97fd43ded87c6560600

# 认证密钥 - 必须更新
AUTH_SECRET=/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=
NEXTAUTH_SECRET=/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=

# URL 配置 - 确认存在
NEXTAUTH_URL=https://she-sharp.vercel.app
AUTH_URL=https://she-sharp.vercel.app

# Client IDs - 保持不变
GOOGLE_CLIENT_ID=805677253031-d5vboo06na716qq34edbvfbfb71rb7ht.apps.googleusercontent.com
GITHUB_CLIENT_ID=Ov23liX6wkCcjLXsHNvR
```

### 4. 重新部署

更新环境变量后：
1. 点击项目主页的 **Redeploy** 按钮
2. 选择最新的 commit
3. 等待部署完成

## 📋 验证清单

部署完成后，验证以下功能：

- [ ] 访问 https://she-sharp.vercel.app/sign-in
- [ ] 测试 Google OAuth 登录
- [ ] 测试 GitHub OAuth 登录
- [ ] 确认登录后重定向到 /dashboard
- [ ] 检查用户会话是否正常保持

## ⚠️ 重要提醒

1. **Stripe 密钥**: 您仍需要轮换 Stripe LIVE 密钥（当前仍是旧的）
2. **数据库密码**: 建议更改数据库密码
3. **其他 API 密钥**: 考虑轮换 Google AI 和 Resend API 密钥

## 🔒 安全状态

- ✅ OAuth 凭据已轮换
- ✅ NextAuth Secret 已更新
- ✅ 本地环境已配置
- ⏳ 等待 Vercel 生产环境更新
- ⚠️ Stripe 密钥待轮换

---

更新时间: 2025-01-23
操作人: Claude Assistant