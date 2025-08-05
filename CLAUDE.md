# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management
- Uses `pnpm` as the primary package manager (see `pnpm-lock.yaml`)
- Install dependencies: `pnpm install`
- Alternative: `npm install` or `yarn install`

### Development Server
- Start dev server: `pnpm dev` (uses Turbopack for faster builds)
- Production build: `pnpm build`
- Start production server: `pnpm start`
- Lint code: `pnpm lint`

### Code Quality
- ESLint configuration: `eslint.config.mjs` (extends Next.js core-web-vitals and TypeScript rules)
- TypeScript configuration: `tsconfig.json` (strict mode enabled)
- Run linting after code changes to ensure quality

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS v4 + Sass for custom styles
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth with Kakao/Google OAuth
- **Payments**: Creem.io integration for Korean market
- **Internationalization**: next-intl (Korean/English support)
- **State Management**: TanStack Query for server state
- **UI Components**: shadcn/ui + custom components
- **Rich Text Editor**: TipTap with custom extensions

### Project Structure

#### App Router Architecture (`app/`)
- `[locale]/` - i18n routing wrapper
  - `(pages)/` - Main public pages (landing, pricing, blog)
  - `(user)/` - Authentication pages (sign-in, sign-up, password reset)
  - `admin/` - Admin dashboard for content management
  - `dashboard/` - User dashboard with subscription management
- `api/` - API routes for webhooks and server actions

#### Core Services (`services/`)
- `user.ts` - User authentication, profile management, subscription handling
- `post.ts` - Blog post CRUD operations
- `creem.ts` - Payment processing integration

#### Database Integration (`lib/supabase/`)
- `client.ts` - Browser Supabase client
- `server.ts` - Server-side Supabase client
- `middleware.ts` - Session management middleware
- `admin.ts` - Admin operations
- `initializer/` - Database schema SQL files (run in order)

#### Component Organization (`components/`)
- `ui/` - shadcn/ui base components
- `landing-page/` - Marketing page components
- `user/` - User-specific components (auth, profile)
- `blog/` - Blog-related components
- `tiptap/` - Rich text editor components and extensions

### Key Features & Implementation

#### Authentication System
- Supabase Auth with Row Level Security (RLS)
- OAuth providers: Kakao (Korean market focus), Google
- User profiles with subscription data
- Role-based access control (admin/user)

#### Subscription & Payments
- Creem.io integration for Korean payment methods
- Membership levels: free, starter, pro, enterprise
- Subscription status tracking in user profiles
- Webhook handling for payment events (`api/webhooks/creem/`)

#### Internationalization
- Uses next-intl with locale-based routing
- Messages stored in `messages/` (ko.json, en.json)
- Middleware handles locale detection and routing

#### Blog System
- TipTap rich text editor with custom extensions
- Image uploads to Supabase storage
- SEO optimization and revalidation
- Admin interface for content management

#### UI/UX
- Responsive design with mobile-first approach
- Dark/light theme support via next-themes
- Animated components using Framer Motion
- Toast notifications with Sonner

### Database Schema
Execute SQL files in order for proper setup:
1. `lib/supabase/initializer/1.회원관리.sql` - User management tables
2. `lib/supabase/initializer/2.블로그관리.sql` - Blog system tables

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CREEM_API_KEY=
NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY=
NEXT_PUBLIC_OAUTH_REDIRECT_URI=
```

### Development Patterns
- Use TypeScript strict mode - all types must be properly defined
- Server components by default, client components only when needed
- Custom hooks for common logic (see `hooks/` directory)
- Service layer pattern for business logic
- Error boundaries and proper error handling
- Responsive design with Tailwind utilities

### Code Conventions
- File naming: kebab-case for components, camelCase for utilities
- Import paths use `@/` alias pointing to project root
- Component props use TypeScript interfaces
- Server actions in separate service files
- Custom UI components extend shadcn/ui base components

### Testing & Quality
- No specific test framework configured - check with user before assuming
- ESLint rules enforce Next.js and TypeScript best practices
- Use `pnpm lint` to check code quality before commits