# She Sharp 颜色系统使用指南

## 颜色配置

我们的颜色系统基于 She Sharp 的品牌指南，包含以下主要颜色：

### 主要颜色

#### Purple (紫色系) - 品牌主色
- **Purple Dark** `#9b2e83` - 主要品牌色，用于重要的 CTA 按钮
- **Purple Mid** `#c846ab` - 次要动作，悬停状态
- **Purple Light** `#f7e5f3` - 背景色，卡片背景

#### Periwinkle (长春花蓝) - 强调色
- **Periwinkle Dark** `#8982ff` - 强调元素，装饰性元素
- **Periwinkle Light** `#f4f4fa` - 轻微背景，边框

#### Navy (海军蓝) - 文本颜色
- **Navy Dark** `#1f1e44` - 主要文本，标题
- **Navy Light** `#eaf2ff` - 区块背景

#### Mint (薄荷绿) - 成功/高亮
- **Mint Dark** `#b1f6e9` - 成功状态，特殊高亮
- **Mint Light** `#effefb` - 轻微强调背景

### 功能颜色
- **Gray** `#9b9b9b` - 次要文本，禁用状态
- **Blue** `#1378d1` - 链接，可交互元素
- **Error** `#d72f40` - 错误状态，警告
- **White** `#ffffff` - 主背景，深色背景上的文本

## 使用方式

### 在 Tailwind CSS 中使用

#### 1. 使用语义化类名（推荐）
```jsx
// 主要按钮
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  立即加入
</button>

// 次要按钮
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
  了解更多
</button>

// 强调元素
<div className="bg-accent text-accent-foreground">
  新功能
</div>

// 卡片
<div className="bg-card text-card-foreground border border-border">
  内容
</div>
```

#### 2. 使用具体颜色
```jsx
// 紫色按钮
<button className="bg-purple-dark text-white hover:bg-purple-mid">
  捐赠支持
</button>

// 薄荷色成功提示
<div className="bg-mint-light text-navy-dark border border-mint-dark">
  报名成功！
</div>

// 渐变背景
<div className="bg-gradient-to-r from-purple-dark to-periwinkle-dark">
  渐变标题
</div>
```

### 常见组合

#### 1. 主要 CTA (Call-to-Action)
```jsx
<button className="bg-purple-dark text-white hover:bg-purple-mid transition-colors">
  加入 She Sharp
</button>
```

#### 2. 次要 CTA
```jsx
<button className="bg-periwinkle-dark text-white hover:opacity-90 transition-opacity">
  探索活动
</button>
```

#### 3. 轮廓按钮
```jsx
<button className="border-2 border-purple-dark text-purple-dark hover:bg-purple-light transition-colors">
  了解更多
</button>
```

#### 4. 成功状态
```jsx
<div className="bg-mint-light border border-mint-dark text-navy-dark p-4 rounded-lg">
  <p className="font-semibold">成功！</p>
  <p className="text-gray">您已成功注册活动。</p>
</div>
```

#### 5. 错误状态
```jsx
<div className="bg-error/10 border border-error text-error p-4 rounded-lg">
  <p className="font-semibold">错误</p>
  <p>请检查您的输入信息。</p>
</div>
```

### 文本颜色使用

```jsx
// 主标题
<h1 className="text-navy-dark">欢迎来到 She Sharp</h1>

// 副标题
<h2 className="text-purple-dark">连接科技女性</h2>

// 正文
<p className="text-navy-dark">正文内容...</p>

// 次要文本
<p className="text-gray">补充说明...</p>

// 链接
<a className="text-blue hover:text-purple-dark transition-colors">
  了解更多
</a>
```

### 背景使用建议

1. **主背景**: `bg-white`
2. **区块背景**: `bg-navy-light` 或 `bg-periwinkle-light`
3. **卡片背景**: `bg-card` 或 `bg-white` (带边框)
4. **强调背景**: `bg-purple-light` 或 `bg-mint-light`
5. **深色区块**: `bg-navy-dark text-white`

### 渐变使用

```jsx
// 主渐变
<div className="bg-gradient-to-r from-purple-dark to-periwinkle-dark">

// 柔和渐变
<div className="bg-gradient-to-br from-purple-light to-periwinkle-light">

// 薄荷渐变
<div className="bg-gradient-to-r from-mint-light to-mint-dark">
```

## 可访问性注意事项

1. **对比度**: 确保文本和背景之间有足够的对比度
   - Navy Dark (#1f1e44) 在白色背景上
   - White (#ffffff) 在深色背景上
   - 避免在浅色背景上使用 Gray (#9b9b9b)

2. **颜色不应是唯一的信息传递方式**
   - 成功/错误状态应配合图标或文字说明
   - 链接应有下划线或其他视觉提示

3. **测试**: 使用对比度检查工具确保符合 WCAG AA 标准

## 深色模式

深色模式会自动调整颜色：
- 背景变为 Navy Dark
- 文本变为 White
- Purple Dark 变为 Purple Mid（更亮）
- 其他颜色相应调整以保持可读性

使用 `dark:` 前缀可以为深色模式指定特定样式：
```jsx
<div className="bg-white dark:bg-navy-dark text-navy-dark dark:text-white">
  自适应内容
</div>
```