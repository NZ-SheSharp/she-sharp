# Database Migration Quick Start

## 常用命令速查

### 日常开发流程

```bash
# 1. 修改 schema.ts 后生成迁移
pnpm db:generate

# 2. 检查迁移状态
pnpm db:status

# 3. 应用迁移（带自动备份）
pnpm db:migrate:safe

# 4. 创建稳定版本检查点
pnpm db:version checkpoint "feature-xyz-complete"
```

### 部署前检查

```bash
# 查看待执行的迁移
pnpm db:status

# 创建部署前快照
pnpm db:snapshot "pre-deploy-$(date +%Y%m%d)"

# 查看迁移历史
pnpm db:history
```

### 紧急回滚

```bash
# 1. 查看可用快照
pnpm db:version list-snapshots

# 2. 生成回滚 SQL
pnpm db:version rollback-sql <migration-tag>

# 3. 手动执行回滚（需要数据库访问权限）
```

## 关键文件位置

- **Schema 定义**: `/lib/db/schema.ts`
- **迁移文件**: `/lib/db/migrations/`
- **快照存储**: `/lib/db/snapshots/`
- **版本控制工具**: `/scripts/db-version.ts`

## 注意事项

1. **永远不要**直接修改已应用的迁移文件
2. **总是**在生产环境迁移前创建快照
3. **定期**清理旧快照以节省存储空间
4. **测试**回滚流程在非生产环境

## 获取帮助

```bash
# 查看所有可用命令
pnpm db:version

# 查看详细文档
cat docs/database/DATABASE_VERSION_CONTROL.md
```