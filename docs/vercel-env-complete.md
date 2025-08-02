# Vercel 环境变量完整配置

## 必须在 Vercel 设置的所有环境变量

请确保在 Vercel Dashboard 中设置了**所有**这些环境变量：

### 1. OAuth 凭据
```
GOOGLE_CLIENT_ID=805677253031-d5vboo06na716qq34edbvfbfb71rb7ht.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23liX6wkCcjLXsHNvR
GITHUB_CLIENT_SECRET=12cca699acfaba84dc8c03f72c2a352d34f5b0bc
```

### 2. NextAuth 配置（所有这些都需要）
```
NEXTAUTH_URL=https://she-sharp.vercel.app
AUTH_URL=https://she-sharp.vercel.app
NEXTAUTH_SECRET=crdNTV2N4rkgvJjaA+tmlGMkAaXGhcvLBpGt2dHOElE=
AUTH_SECRET=crdNTV2N4rkgvJjaA+tmlGMkAaXGhcvLBpGt2dHOElE=
```

### 3. 额外的 URL 变量（重要）
```
VERCEL_URL=she-sharp.vercel.app
```

## 设置步骤

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择 `she-sharp` 项目
3. 点击 **Settings** → **Environment Variables**
4. 添加每个变量，选择 **Production** 环境
5. **重要**：确保 URL 没有尾部斜杠 `/`
6. 点击 **Save** 保存每个变量
7. 触发重新部署

## 验证设置

部署后，访问以下 URL 验证配置：
```
https://she-sharp.vercel.app/api/debug/oauth
```

应该返回类似：
```json
{
  "environment": "production",
  "origin": "https://she-sharp.vercel.app",
  "nextAuthUrl": "https://she-sharp.vercel.app",
  "authUrl": "https://she-sharp.vercel.app",
  "callbackUrls": {
    "google": "https://she-sharp.vercel.app/api/auth/callback/google",
    "github": "https://she-sharp.vercel.app/api/auth/callback/github"
  }
}
```

## Google Cloud Console 设置确认

您的 Google OAuth 设置看起来是正确的。确保：

1. **Authorized redirect URIs** 包含：
   - `https://she-sharp.vercel.app/api/auth/callback/google`（生产）
   - `http://localhost:3000/api/auth/callback/google`（本地）

2. **注意**：Google 可能需要 5 分钟到几小时才能生效

## 故障排除

如果仍然出现 `redirect_uri_mismatch`：

1. **清除浏览器缓存和 cookies**
2. **等待 Google 更新**（可能需要几小时）
3. **检查 URL 格式**：
   - 没有尾部斜杠
   - 使用 HTTPS（生产环境）
   - 精确匹配大小写

4. **尝试重新创建 OAuth 客户端**：
   - 在 Google Cloud Console 创建新的 OAuth 2.0 客户端
   - 使用新的 Client ID 和 Secret
   - 更新 Vercel 环境变量

## 临时解决方案

如果 Google OAuth 仍有问题：
- GitHub OAuth 已经可以正常工作
- 用户可以使用 GitHub 登录
- 或使用邮箱/密码注册