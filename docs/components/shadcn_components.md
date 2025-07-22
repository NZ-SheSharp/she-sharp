# components.json

[Previous](https://ui.shadcn.com/docs/installation)[Next](https://ui.shadcn.com/docs/theming)

Configuration for your project.

The `components.json` file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

Note: The `components.json` file is optional

It is **only required if you're using the CLI** to add components to your project. If you're using the copy and paste method, you don't need this file.

You can create a `components.json` file in your project by running the following command:



pnpmnpmyarnbun

```
pnpm dlx shadcn@latest init
```

Copy

See the [CLI section](https://ui.shadcn.com/docs/cli) for more information.

## $schema

You can see the JSON Schema for `components.json` [here](https://ui.shadcn.com/schema.json).

components.json

```
Copy{  "$schema": "https://ui.shadcn.com/schema.json"}
```

## style

The style for your components. **This cannot be changed after initialization.**

components.json

```
Copy{  "style": "new-york"}
```

The `default` style has been deprecated. Use the `new-york` style instead.

## tailwind

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

See the [installation section](https://ui.shadcn.com/docs/installation) for how to set up Tailwind CSS.

### tailwind.config

Path to where your `tailwind.config.js` file is located. **For Tailwind CSS v4, leave this blank.**

components.json

```
Copy{  "tailwind": {    "config": "tailwind.config.js" | "tailwind.config.ts"  }}
```

### tailwind.css

Path to the CSS file that imports Tailwind CSS into your project.

components.json

```
Copy{  "tailwind": {    "css": "styles/global.css"  }}
```

### tailwind.baseColor

This is used to generate the default color palette for your components. **This cannot be changed after initialization.**

components.json

```
Copy{  "tailwind": {    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"  }}
```

### tailwind.cssVariables

You can choose between using CSS variables or Tailwind CSS utility classes for theming.

To use utility classes for theming set `tailwind.cssVariables` to `false`. For CSS variables, set `tailwind.cssVariables` to `true`.

components.json

```
Copy{  "tailwind": {    "cssVariables": `true` | `false`  }}
```

For more information, see the [theming docs](https://ui.shadcn.com/docs/theming).

**This cannot be changed after initialization.** To switch between CSS variables and utility classes, you'll have to delete and re-install your components.

### tailwind.prefix

The prefix to use for your Tailwind CSS utility classes. Components will be added with this prefix.

components.json

```
Copy{  "tailwind": {    "prefix": "tw-"  }}
```

## rsc

Whether or not to enable support for React Server Components.

The CLI automatically adds a `use client` directive to client components when set to `true`.

components.json

```
Copy{  "rsc": `true` | `false`}
```

## tsx

Choose between TypeScript or JavaScript components.

Setting this option to `false` allows components to be added as JavaScript with the `.jsx` file extension.

components.json

```
Copy{  "tsx": `true` | `false`}
```

## aliases

The CLI uses these values and the `paths` config from your `tsconfig.json` or `jsconfig.json` file to place generated components in the correct location.

Path aliases have to be set up in your `tsconfig.json` or `jsconfig.json` file.

**Important:** If you're using the `src` directory, make sure it is included under `paths` in your `tsconfig.json` or `jsconfig.json` file.

### aliases.utils

Import alias for your utility functions.

components.json

```
Copy{  "aliases": {    "utils": "@/lib/utils"  }}
```

### aliases.components

Import alias for your components.

components.json

```
Copy{  "aliases": {    "components": "@/components"  }}
```

### aliases.ui

Import alias for `ui` components.

The CLI will use the `aliases.ui` value to determine where to place your `ui` components. Use this config if you want to customize the installation directory for your `ui` components.

components.json

```
Copy{  "aliases": {    "ui": "@/app/ui"  }}
```

### aliases.lib

Import alias for `lib` functions such as `format-date` or `generate-id`.

components.json

```
Copy{  "aliases": {    "lib": "@/lib"  }}
```

### aliases.hooks

Import alias for `hooks` such as `use-media-query` or `use-toast`.

components.json

```
Copy{  "aliases": {    "hooks": "@/hooks"  }}
```

[Installation](https://ui.shadcn.com/docs/installation)[Theming](https://ui.shadcn.com/docs/theming)



# Components

[Previous](https://ui.shadcn.com/docs/legacy)[Next](https://ui.shadcn.com/docs/components/accordion)

Here you can find all the components available in the library. We are working on adding more components.

[Accordion](https://ui.shadcn.com/docs/components/accordion)[Alert](https://ui.shadcn.com/docs/components/alert)[Alert Dialog](https://ui.shadcn.com/docs/components/alert-dialog)[Aspect Ratio](https://ui.shadcn.com/docs/components/aspect-ratio)[Avatar](https://ui.shadcn.com/docs/components/avatar)[Badge](https://ui.shadcn.com/docs/components/badge)[Breadcrumb](https://ui.shadcn.com/docs/components/breadcrumb)[Button](https://ui.shadcn.com/docs/components/button)[Calendar](https://ui.shadcn.com/docs/components/calendar)[Card](https://ui.shadcn.com/docs/components/card)[Carousel](https://ui.shadcn.com/docs/components/carousel)[Chart](https://ui.shadcn.com/docs/components/chart)[Checkbox](https://ui.shadcn.com/docs/components/checkbox)[Collapsible](https://ui.shadcn.com/docs/components/collapsible)[Combobox](https://ui.shadcn.com/docs/components/combobox)[Command](https://ui.shadcn.com/docs/components/command)[Context Menu](https://ui.shadcn.com/docs/components/context-menu)[Data Table](https://ui.shadcn.com/docs/components/data-table)[Date Picker](https://ui.shadcn.com/docs/components/date-picker)[Dialog](https://ui.shadcn.com/docs/components/dialog)[Drawer](https://ui.shadcn.com/docs/components/drawer)[Dropdown Menu](https://ui.shadcn.com/docs/components/dropdown-menu)[React Hook Form](https://ui.shadcn.com/docs/components/form)[Hover Card](https://ui.shadcn.com/docs/components/hover-card)[Input](https://ui.shadcn.com/docs/components/input)[Input OTP](https://ui.shadcn.com/docs/components/input-otp)[Label](https://ui.shadcn.com/docs/components/label)[Menubar](https://ui.shadcn.com/docs/components/menubar)[Navigation Menu](https://ui.shadcn.com/docs/components/navigation-menu)[Pagination](https://ui.shadcn.com/docs/components/pagination)[Popover](https://ui.shadcn.com/docs/components/popover)[Progress](https://ui.shadcn.com/docs/components/progress)[Radio Group](https://ui.shadcn.com/docs/components/radio-group)[Resizable](https://ui.shadcn.com/docs/components/resizable)[Scroll-area](https://ui.shadcn.com/docs/components/scroll-area)[Select](https://ui.shadcn.com/docs/components/select)[Separator](https://ui.shadcn.com/docs/components/separator)[Sheet](https://ui.shadcn.com/docs/components/sheet)[Sidebar](https://ui.shadcn.com/docs/components/sidebar)[Skeleton](https://ui.shadcn.com/docs/components/skeleton)[Slider](https://ui.shadcn.com/docs/components/slider)[Sonner](https://ui.shadcn.com/docs/components/sonner)[Switch](https://ui.shadcn.com/docs/components/switch)[Table](https://ui.shadcn.com/docs/components/table)[Tabs](https://ui.shadcn.com/docs/components/tabs)[Textarea](https://ui.shadcn.com/docs/components/textarea)[Toast](https://ui.shadcn.com/docs/components/toast)[Toggle](https://ui.shadcn.com/docs/components/toggle)[Toggle Group](https://ui.shadcn.com/docs/components/toggle-group)[Tooltip](https://ui.shadcn.com/docs/components/tooltip)[Typography](https://ui.shadcn.com/docs/components/typography)



Components

- [Accordion](https://ui.shadcn.com/docs/components/accordion)
- [Alert](https://ui.shadcn.com/docs/components/alert)
- [Alert Dialog](https://ui.shadcn.com/docs/components/alert-dialog)
- [Aspect Ratio](https://ui.shadcn.com/docs/components/aspect-ratio)
- [Avatar](https://ui.shadcn.com/docs/components/avatar)
- [Badge](https://ui.shadcn.com/docs/components/badge)
- [Breadcrumb](https://ui.shadcn.com/docs/components/breadcrumb)
- [Button](https://ui.shadcn.com/docs/components/button)
- [Calendar](https://ui.shadcn.com/docs/components/calendar)
- [Card](https://ui.shadcn.com/docs/components/card)
- [Carousel](https://ui.shadcn.com/docs/components/carousel)
- [Chart](https://ui.shadcn.com/docs/components/chart)
- [Checkbox](https://ui.shadcn.com/docs/components/checkbox)
- [Collapsible](https://ui.shadcn.com/docs/components/collapsible)
- [Combobox](https://ui.shadcn.com/docs/components/combobox)
- [Command](https://ui.shadcn.com/docs/components/command)
- [Context Menu](https://ui.shadcn.com/docs/components/context-menu)
- [Data Table](https://ui.shadcn.com/docs/components/data-table)
- [Date Picker](https://ui.shadcn.com/docs/components/date-picker)
- [Dialog](https://ui.shadcn.com/docs/components/dialog)
- [Drawer](https://ui.shadcn.com/docs/components/drawer)
- [Dropdown Menu](https://ui.shadcn.com/docs/components/dropdown-menu)
- [React Hook Form](https://ui.shadcn.com/docs/components/form)
- [Hover Card](https://ui.shadcn.com/docs/components/hover-card)
- [Input](https://ui.shadcn.com/docs/components/input)
- [Input OTP](https://ui.shadcn.com/docs/components/input-otp)
- [Label](https://ui.shadcn.com/docs/components/label)
- [Menubar](https://ui.shadcn.com/docs/components/menubar)
- [Navigation Menu](https://ui.shadcn.com/docs/components/navigation-menu)
- [Pagination](https://ui.shadcn.com/docs/components/pagination)
- [Popover](https://ui.shadcn.com/docs/components/popover)
- [Progress](https://ui.shadcn.com/docs/components/progress)
- [Radio Group](https://ui.shadcn.com/docs/components/radio-group)
- [Resizable](https://ui.shadcn.com/docs/components/resizable)
- [Scroll-area](https://ui.shadcn.com/docs/components/scroll-area)
- [Select](https://ui.shadcn.com/docs/components/select)
- [Separator](https://ui.shadcn.com/docs/components/separator)
- [Sheet](https://ui.shadcn.com/docs/components/sheet)
- [Sidebar](https://ui.shadcn.com/docs/components/sidebar)
- [Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- [Slider](https://ui.shadcn.com/docs/components/slider)
- [Sonner](https://ui.shadcn.com/docs/components/sonner)
- [Switch](https://ui.shadcn.com/docs/components/switch)
- [Table](https://ui.shadcn.com/docs/components/table)
- [Tabs](https://ui.shadcn.com/docs/components/tabs)
- [Textarea](https://ui.shadcn.com/docs/components/textarea)
- [Toast](https://ui.shadcn.com/docs/components/toast)
- [Toggle](https://ui.shadcn.com/docs/components/toggle)
- [Toggle Group](https://ui.shadcn.com/docs/components/toggle-group)
- [Tooltip](https://ui.shadcn.com/docs/components/tooltip)
- [Typography](https://ui.shadcn.com/docs/components/typography)