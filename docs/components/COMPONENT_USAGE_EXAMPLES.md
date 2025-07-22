# She Sharp 组件使用示例

## 基于 shadcn/ui 的组件组合示例

### 1. 团队成员卡片 (TeamMemberCard)
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

function TeamMemberCard({ member }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-navy-dark">{member.name}</CardTitle>
        <CardDescription>
          <Badge className="bg-purple-dark text-white">
            {member.role}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray text-sm">{member.bio}</p>
      </CardContent>
    </Card>
  )
}
```

### 2. 活动卡片 (EventCard)
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"

function EventCard({ event }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-purple-dark to-periwinkle-dark" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-navy-dark">{event.title}</CardTitle>
          <Badge variant="secondary">{event.category}</Badge>
        </div>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-gray">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-navy-dark">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-dark hover:bg-purple-mid">
          了解更多
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### 3. 导航栏 (使用 NavigationMenu)
```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

function SiteNavigation() {
  return (
    <>
      {/* 桌面导航 */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>关于我们</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <li>
                  <NavigationMenuLink href="/about">
                    组织介绍
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/team">
                    团队成员
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* 移动端导航 */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          {/* 移动端菜单内容 */}
        </SheetContent>
      </Sheet>
    </>
  )
}
```

### 4. 统计数据展示 (使用 Card)
```tsx
import { Card, CardContent } from "@/components/ui/card"

function StatCard({ value, label, icon: Icon }) {
  return (
    <Card className="text-center bg-purple-light/10 border-purple-light">
      <CardContent className="pt-6">
        <Icon className="w-12 h-12 mx-auto mb-4 text-purple-dark" />
        <div className="text-3xl font-bold text-navy-dark mb-2">
          {value}
        </div>
        <p className="text-gray">{label}</p>
      </CardContent>
    </Card>
  )
}
```

### 5. 表单示例 (使用 Form)
```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "姓名至少需要2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  message: z.string().min(10, "留言至少需要10个字符"),
})

function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values) {
    toast.success("消息发送成功！")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input placeholder="您的姓名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>留言</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入您的留言..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-purple-dark hover:bg-purple-mid">
          发送消息
        </Button>
      </form>
    </Form>
  )
}
```

### 6. 内容标签页 (使用 Tabs)
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

function ContentTabs() {
  return (
    <Tabs defaultValue="connection" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="connection">连接</TabsTrigger>
        <TabsTrigger value="inspiration">启发</TabsTrigger>
        <TabsTrigger value="empowerment">赋能</TabsTrigger>
      </TabsList>
      <TabsContent value="connection">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Connection</h3>
            <p className="text-gray">
              我们建立了一个网络，让女性能够与志同道合的同伴见面和联系。
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      {/* 其他标签内容 */}
    </Tabs>
  )
}
```

## 自定义组件示例（仅在必要时）

### Section 组件（布局容器）
```tsx
// components/layout/section.tsx
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  bgColor?: 'white' | 'light' | 'accent'
}

export function Section({ children, className, bgColor = 'white' }: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-navy-light',
    accent: 'bg-purple-light/5'
  }
  
  return (
    <section className={cn(
      "py-16 md:py-24",
      bgClasses[bgColor],
      className
    )}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}
```

### Container 组件（内容容器）
```tsx
// components/layout/container.tsx
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ 
  children, 
  className,
  size = 'lg' 
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[90rem]',
    full: 'max-w-full'
  }
  
  return (
    <div className={cn(
      "mx-auto px-4 md:px-6",
      sizes[size],
      className
    )}>
      {children}
    </div>
  )
}
```

## 使用建议

1. **始终检查 shadcn/ui 文档**：在创建任何组件前，先查看是否有现成的
2. **组合优于创建**：尽量通过组合现有组件实现功能
3. **保持一致性**：使用统一的间距、颜色和样式系统
4. **响应式设计**：所有组件都应该支持移动端
5. **可访问性**：确保组件支持键盘导航和屏幕阅读器