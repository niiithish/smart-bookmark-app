# Agent Guidelines for Smart Bookmark App

## Commands

### Development
- `bun run dev` - Start development server (http://localhost:3000)
- `bun run build` - Build for production
- `bun start` - Start production server

### Code Quality
- `bun run lint` - Run ESLint
- **No test framework configured** - This project does not have test setup

### Database
- `bun drizzle-kit generate` - Generate migration from schema changes
- `bun drizzle-kit migrate` - Apply pending migrations to database

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v4
- **UI Components:** @base-ui/react primitives with shadcn/ui patterns
- **Icons:** Hugeicons (@hugeicons/react, @hugeicons/core-free-icons)
- **Utilities:** clsx, tailwind-merge, class-variance-authority

## Code Style Guidelines

### Imports
- Use alias imports from root: `import { X } from "@/components/ui/x"` or `import { X } from "@/lib/utils"`
- Third-party imports first, then internal imports (separated by blank line)
- Use `import * as React from "react"` for React
- Use type imports explicitly: `import { type ClassValue } from "clsx"`

### Component Structure
- Add `"use client"` directive at the very top of client components
- Export component with PascalCase: `function ComponentName() { ... }`
- For shadcn-style components, export both the component and its primitives
- Use `data-slot` attributes for component identification: `<Button data-slot="button" />`

### Props & Types
- Use TypeScript for all props with explicit types
- Destructure props on function parameters
- Use `React.ComponentProps<"element">` to extend native HTML element props
- Default values in destructuring: `function Button({ variant = "default", ...props }: Props)`
- Use `Pick` utility for partial props composition

### Styling
- Always use `cn()` utility for conditional class merging (from `@/lib/utils`)
- Use class-variance-authority (cva) for component variants
- Tailwind classes follow the design system (compact sizing, specific color palette)
- Dark mode support with `dark:` prefix
- Use `data-` attributes for state-based styling: `data-hover`, `data-open`, etc.

### Formatting
- **2 spaces** indentation (no tabs)
- Double quotes for strings and JSX attributes
- Multi-line JSX with proper indentation
- Blank line between imports and component code
- No semicolons (consistent with codebase)

### Naming Conventions
- Components: PascalCase (`Button`, `CardHeader`)
- Utilities: camelCase (`cn`, `useComboboxAnchor`)
- Props: camelCase (`className`, `defaultValue`, `showTrigger`)
- Constants: PascalCase for exported primitives (`const Button = ButtonPrimitive.Root`)
- Events: camelCase with `on` prefix (`onValueChange`, `onCheckedChange`)

### Error Handling
- No explicit error handling patterns observed
- Use TypeScript for type safety and prevent runtime errors
- Component props are validated through TypeScript types

### Files
- Client components: `"use client"` at line 1
- UI components in `components/ui/` directory
- Utilities in `lib/utils.ts`
- Pages in `app/` directory with `page.tsx` convention
- Layouts in `app/layout.tsx`

### Component Patterns (shadcn/ui style)
```typescript
"use client"

import * as React from "react"
import { Primitive } from "@base-ui/react/primitive"
import { cn } from "@/lib/utils"

function Component({ className, ...props }: Props) {
  return (
    <Primitive
      data-slot="component"
      className={cn("base-classes", className)}
      {...props}
    />
  )
}

export { Component }
```

## Path Aliases
- `@/*` maps to the root directory (configured in tsconfig.json)
