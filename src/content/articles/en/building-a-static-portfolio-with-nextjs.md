---
lang: en
title: Building a Static Portfolio with Next.js
excerpt: Notes on structuring bilingual content, static rendering, and a focused single-page route.
category: Architecture
readTime: 6 min read
---

## Keep portfolio content typed and local

A small portfolio does not need a runtime content service. Typed TypeScript data makes project, article, and navigation contracts visible to the components that render them and catches missing localized fields during the build.

## Separate static routes from client preferences

Next.js can pre-render the route and article slugs while a small client provider remembers the visitor language. The content stays static and cacheable; only the presentation language changes after hydration.

## Use the production build as the contract

The build should validate every generated slug, client boundary, and localized data shape. Follow it with browser checks for navigation, language switching, article links, and the contact workflow.

- Generate route params from the English and Thai shared slugs.
- Keep user-facing copy synchronized across both locales.
- Verify that every visible action reaches a real destination.
