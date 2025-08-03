# Google OAuth 配置指南

## 重要：您需要在 Google Cloud Console 添加正确的回调 URL

### 生产环境回调 URL
请访问 [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 并添加以下 URL：

**必须添加的授权重定向 URI：**
```
https://she-sharp.vercel.app/api/auth/callback/google
```

### 本地开发回调 URL
```
http://localhost:3000/api/auth/callback/google
```

## 完整配置步骤

1. **访问 Google Cloud Console**
   - 前往 https://console.cloud.google.com/
   - 选择您的项目

2. **导航到 OAuth 2.0 客户端 ID**
   - 左侧菜单选择 "APIs & Services" → "Credentials"
   - 找到您的 OAuth 2.0 客户端 ID

3. **编辑 OAuth 客户端**
   - 点击客户端 ID 进行编辑
   - 在 "Authorized redirect URIs" 部分

4. **添加授权重定向 URI**
   添加以下两个 URI：
   - `https://she-sharp.vercel.app/api/auth/callback/google` (生产环境)
   - `http://localhost:3000/api/auth/callback/google` (本地开发)

5. **保存更改**
   - 点击 "Save" 按钮
   - 等待几分钟让更改生效

## 验证配置

配置正确后，您应该能够：
1. 在 https://she-sharp.vercel.app/sign-in 点击 Google 登录
2. 成功跳转到 Google 授权页面
3. 授权后返回到 /dashboard

## 常见错误

### Error 400: redirect_uri_mismatch
**原因**：回调 URL 未在 Google Cloud Console 中配置
**解决**：按照上述步骤添加正确的回调 URL

### 登录后返回到登录页面
**原因**：会话未正确创建
**解决**：已在代码中修复，确保部署最新版本

## 当前配置信息
- Client ID: `[YOUR_GOOGLE_CLIENT_ID].apps.googleusercontent.com`
- Client Secret: `[YOUR_GOOGLE_CLIENT_SECRET]`
- 生产回调 URL: `https://she-sharp.vercel.app/api/auth/callback/google`
- 本地回调 URL: `http://localhost:3000/api/auth/callback/google`