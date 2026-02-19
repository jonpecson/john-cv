# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site built with Next.js 15 (App Router), React 19, TypeScript, and Sanity CMS. Uses pnpm as the package manager.

## Commands

```bash
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint

# Sanity Studio (separate app)
cd studio && pnpm dev      # Studio on localhost:3333
cd studio && pnpm deploy   # Deploy studio to Sanity hosting
```

## Architecture

- **`app/`** — Next.js App Router pages. Homepage (`page.tsx`), blog listing (`blog/page.tsx`), dynamic blog posts (`blog/[slug]/page.tsx`).
- **`components/`** — Section components (hero, experience, projects, skills, contact, blog-section, profile-card, navigation) plus `portable-text.tsx` for Sanity rich text rendering with syntax highlighting.
- **`components/ui/`** — shadcn/ui component library (do not edit manually; managed by shadcn CLI).
- **`lib/sanity.ts`** — Sanity client setup and GROQ queries for fetching posts.
- **`lib/blog.ts`** — Blog data fetching with mock data fallback for offline development.
- **`types/blog.ts`** — BlogPost TypeScript interface.
- **`studio/`** — Standalone Sanity Studio app with schemas in `studio/schemaTypes/` (blogPost, blockContent, codeBlock, table, author, category).

## Key Patterns

- Most components use `"use client"` with framer-motion animations.
- Sanity content rendered via `@portabletext/react` with custom serializers in `components/portable-text.tsx` (code blocks use `react-syntax-highlighter`).
- Path alias: `@/*` maps to project root.
- Build config ignores ESLint and TypeScript errors (`next.config.mjs`).
- Images are unoptimized in Next.js config (external optimization via ImageKit).

## Design System

- **Dark theme** with custom Tailwind colors: `cv-orange` (#FF5C28), `cv-neon` (#C1FF3F), `cv-dark` (#121212), `cv-gray`, `cv-light-gray`.
- Glass morphism utilities defined in `globals.css` (`.glass`, `.glass-card`, `.glass-dark`).
- shadcn/ui uses HSL CSS variables for theming (configured in `components.json`).

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
