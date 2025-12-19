# Copilot Instructions for Gautham Anne's Portfolio

## Project Overview

Astro-based personal website with blog posts and hierarchical notes sections. Built on AstroPaper theme with custom educational/academic features: animated derivations, TikZ diagrams, and KaTeX math rendering.

## Architecture

### Content Collections

Two main collections defined in [src/content/config.ts](src/content/config.ts):

- **blog**: Individual posts with frontmatter (pubDatetime, tags, featured, draft, description)
- **notes**: Hierarchical by folder structure (e.g., `notes/ashcroft_mermin/chapter1.md`). Each note has optional `order`, `tags`, and subject-level `color` theme

**Subject Organization**: Notes auto-group by folder via [src/utils/getNotesStructure.ts](src/utils/getNotesStructure.ts). First part of slug before `/` becomes the subject. Subject colors come from first note with `color` frontmatter field.

### Custom Components & Features

**Animated Derivations**: Use `<AnimatedDerivation>` ([src/components/AnimatedDerivation.astro](src/components/AnimatedDerivation.astro)) with step-by-step math reveals. Helper functions in [src/utils/derivationHelpers.ts](src/utils/derivationHelpers.ts) like `createSimpleDerivation()` format equations with optional explanations.

**TikZ Diagrams**: Markdown code blocks with ` ```tikz ` automatically render client-side via [src/utils/remark-tikz.mjs](src/utils/remark-tikz.mjs) plugin. Auto-wraps in `\begin{tikzpicture}` if needed. Uses TikZJax CDN.

**Math Rendering**: KaTeX via `remark-math` + `rehype-katex` plugins. Inline math with `$...$`, display math with `$$...$$`.

### Theming System

**Skin-based Tailwind Tokens**: Custom color scheme using CSS variables (`--color-fill`, `--color-text-base`, `--color-accent`, etc.) in [src/styles/base.css](src/styles/base.css). Tailwind utilities like `bg-skin-fill`, `text-skin-base`, `border-skin-line` reference these. Supports light/dark modes via `data-theme` attribute.

**Typography**: Comic Neue font family used throughout (defined in [src/styles/base.css](src/styles/base.css) as `--font-sans` and `--font-mono`).

### Layouts

- `Layout.astro`: Base layout with SEO, OpenGraph, theme scripts
- `PostDetails.astro`: Blog post template with Datetime, ShareLinks, reading time
- `NoteLayout.astro`: Hierarchical notes with fixed sidebar navigation, breadcrumbs
- `Main.astro`: Wrapper for list pages with pagination

All Astro components export `Props` interface with TypeScript.

## Development Workflow

**Local Dev**: Run `npm run dev` (starts Astro dev server on port 4321). Hot reload works for content and components.

**Build**: `npm run build` → static site in `dist/`. Optimized build: `npm run build:optimized` (uses jampack).

**Preview**: `npm run preview` serves production build locally.

## Key Conventions

1. **Import Aliases**: Use `@config`, `@components`, `@layouts`, `@utils`, `@assets` (defined in [tsconfig.json](tsconfig.json))

2. **Component Props**: Always export typed `Props` interface in frontmatter for Astro components. React components use standard TypeScript interfaces.

3. **Frontmatter Requirements**:
   - Blog: `author`, `pubDatetime` (Date), `title`, `description`, `tags[]`, optional `featured`, `draft`, `modDatetime`
   - Notes: `title`, optional `order` (number for sidebar sorting), `description`, `draft`, `color` (enum: red/blue/green/purple/orange/teal/pink/indigo)

4. **Remark Plugins Chain**: [astro.config.ts](astro.config.ts) loads `remarkToc` → `remarkMath` → `remarkReadingTime` → `remarkCollapse`. Custom plugins in `src/utils/remark-*.mjs`.

5. **Utility Patterns**:
   - Content queries: Use Astro's `getCollection()` from `astro:content`
   - Sorting: [src/utils/getSortedPosts.ts](src/utils/getSortedPosts.ts) handles draft filtering and datetime sorting
   - Slugification: [src/utils/slugify.ts](src/utils/slugify.ts) for URL-safe strings

6. **Client Scripts**: Public scripts like [public/toggle-theme.js](public/toggle-theme.js), [public/switchPfp.js](public/switchPfp.js) handle theme switching and profile picture changes. Load with `<script type="module" src="/...">` in pages.

## Special Notes

- **Static Files**: Academic project files in `public/files/{project-name}/` referenced in blog posts
- **Images**: Per-post image folders in `src/assets/images/{post-slug}/` for optimized Astro image handling
- **RSS Feed**: Generated at [src/pages/rss.xml.ts](src/pages/rss.xml.ts) using `@astrojs/rss`
- **OG Images**: Dynamic generation in [src/pages/og.png.ts](src/pages/og.png.ts) using Satori and Resvg
- **Search**: Client-side Fuse.js search in [src/components/Search.tsx](src/components/Search.tsx)

## Common Tasks

**Add Blog Post**: Create `.md` file in `src/content/blog/` with required frontmatter. Add images to `src/assets/images/{slug}/`.

**Add Note**: Create file in `src/content/notes/{subject}/{note-name}.md`. Subject folder name becomes URL slug. Set `order` field for sidebar position.

**New Custom Component**: Create in `src/components/`, export `Props` interface, use skin tokens for theming consistency.

**Modify Site Config**: Edit [src/config.ts](src/config.ts) for SITE object (title, author, website), SOCIALS array, LOGO_IMAGE settings.

**Hide Note Subjects**: Add folder names to `HIDDEN_NOTE_SUBJECTS` array in [src/config.ts](src/config.ts) to hide all notes in that subject from the site.
