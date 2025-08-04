# 🚨 紧急：凭据轮换清单

## ⚠️ 发现的安全问题

您的 `.env` 和 `.env.local` 文件包含真实的生产凭据。虽然这些文件没有被提交到 Git（已被 .gitignore 正确忽略），但文档文件中曾包含这些凭据并已被推送到 GitHub。

## 🔴 必须立即轮换的凭据

### 1. **Stripe API 密钥** (✅ 已轮换 - 2025-08-04)
- **当前泄露的密钥**: [REDACTED - API KEY REMOVED FOR SECURITY]
- **行动**:
  1. 立即登录 [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
  2. 点击 "Roll key" 生成新密钥
  3. 更新所有使用此密钥的地方
  4. 检查是否有未授权的交易

### 2. **Google OAuth 凭据**
- **Client ID**: `805677253031-d5vboo06na716qq34edbvfbfb71rb7ht`
- **Client Secret**: [REDACTED]
- **行动**:
  1. 访问 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  2. 找到对应的 OAuth 2.0 客户端
  3. 点击 "RESET SECRET"
  4. 保存新的 secret

### 3. **GitHub OAuth 凭据**
- **Client ID**: `Ov23liX6wkCcjLXsHNvR`
- **Client Secret**: [REDACTED]
- **行动**:
  1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
  2. 找到 "She Sharp" OAuth App
  3. 点击 "Generate a new client secret"
  4. 保存新的 secret

### 4. **数据库密码**
- **当前密码**: [REDACTED]
- **行动**:
  1. 在数据库管理面板中更改密码
  2. 更新所有连接字符串

### 5. **API 密钥**
- **Google AI API**: [REDACTED]
- **Resend API**: [REDACTED]
- **行动**: 在各自的平台重新生成密钥

### 6. **Auth Secrets**
- **新的 NextAuth Secret** (已生成): [REDACTED]
- **行动**: 使用这个新生成的 secret 替换旧的

## 📋 轮换步骤

### 第一步：本地更新
1. 复制 `.env.local.template` 到 `.env.local`
   ```bash
   cp .env.local.template .env.local
   ```

2. 在 `.env.local` 中填入新的凭据

### 第二步：Vercel 更新
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入项目设置 → Environment Variables
3. 更新所有凭据：
   - [ ] GOOGLE_CLIENT_SECRET (新的)
   - [ ] GITHUB_CLIENT_SECRET (新的)
   - [ ] NEXTAUTH_SECRET = `/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=`
   - [ ] AUTH_SECRET = `/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=`
   - [ ] STRIPE_SECRET_KEY (新的)
   - [ ] 其他所有 API 密钥

### 第三步：验证
1. 在本地测试：
   ```bash
   pnpm dev
   ```

2. 触发 Vercel 重新部署

3. 测试所有功能：
   - [ ] OAuth 登录 (Google & GitHub)
   - [ ] 数据库连接
   - [ ] Stripe 支付
   - [ ] 其他 API 功能

## 🛡️ 预防措施已实施

✅ **已完成的安全措施**:
1. 清理了所有文档中的敏感信息
2. 创建了安全配置模板 (`.env.local.template`)
3. 安装了 pre-commit hook 防止意外提交密钥
4. 创建了安全配置指南 (`docs/SECURITY_CONFIG_GUIDE.md`)
5. 备份了当前配置文件

## ⏰ 时间线

- **立即**: 轮换 Stripe LIVE 密钥
- **1小时内**: 轮换所有 OAuth 凭据
- **今天内**: 更新所有其他密钥
- **本周内**: 审查访问日志，检查是否有未授权访问

## 📞 需要帮助？

如果在轮换过程中遇到问题：
1. 查看 `docs/SECURITY_CONFIG_GUIDE.md`
2. 联系平台支持团队
3. 记录所有更改以便回滚

---

**记住**: 安全是首要任务。宁可暂时中断服务，也不要让泄露的凭据继续存在风险。