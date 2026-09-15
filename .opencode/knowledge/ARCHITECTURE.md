````markdown
# Enelle Beauty Bar

## System Architecture & Technical Design Document

**Document Status:** Technical Architecture  
**Application:** Enelle Beauty Bar  
**Architecture Style:** Component-driven, modular, server-first Next.js application  
**Primary Framework:** Next.js 15+ App Router  
**React:** React 19  
**Styling:** Tailwind CSS  
**Animation:** Motion for React (formerly Framer Motion)  
**Icons:** Lucide React  
**Primary Runtime:** Node.js  
**Deployment Target:** Vercel or equivalent Next.js-compatible platform

---

# 1. Architecture Overview

Enelle Beauty Bar should be implemented as a **server-first, component-driven editorial web application**.

The architecture must optimize for:

- Visual fidelity
- High-end editorial presentation
- Excellent Core Web Vitals
- Minimal client-side JavaScript
- Strong component isolation
- Progressive enhancement
- Smooth Motion animations
- Responsive image delivery
- Easy content replacement
- Future CMS integration
- Future commerce/booking expansion

The application should **not** be structured as a traditional SPA.

Next.js Server Components should be the default. Client Components should be introduced only where browser interactivity, animation, local state, or event handling requires them.

---

# 2. Architectural Principles

## 2.1 Server-First by Default

Every component should begin as a Server Component unless it explicitly requires:

- `useState`
- `useEffect`
- Browser APIs
- Event handlers
- Motion animation primitives
- Interactive gesture handling
- Client-only third-party libraries

Avoid adding `"use client"` to high-level page components.

---

## 2.2 Composition Over Global State

The website is primarily a content and presentation experience.

Global application state should be avoided unless a genuine cross-page requirement exists.

Prefer:

```text
Props
↓
Local Component State
↓
URL State
↓
Server Data
```
````

over:

```text
Global Store
↓
Everything
```

---

## 2.3 Data Drives Presentation

Services, pricing, gallery items, navigation, and other repeatable content should be represented as typed data.

Components should render that data rather than contain large amounts of hardcoded content.

Example:

```ts
const services = [
  {
    id: "luxury-wig-installation",
    category: "wigs",
    name: "Luxury Wig Installation",
    price: 500,
    currency: "GHS",
    duration: "2 hours",
  },
];
```

The UI should consume the data through props.

---

## 2.4 Animation Is a Presentation Concern

Business logic must never depend on animation state.

Bad:

```text
Animation completes
↓
Update global booking state
↓
Render booking UI
```

Good:

```text
Business state
↓
UI renders
↓
Motion enhances presentation
```

Animations should never become a dependency for application correctness.

---

# 3. Tech Stack

## 3.1 Core Framework

### Next.js 15+

Use:

- App Router
- React Server Components
- Server-side rendering
- Static generation where appropriate
- Dynamic rendering only where required
- Metadata API
- `next/image`
- `next/font`
- Route handlers when backend endpoints are required

---

# 4. React

## React 19

React 19 is the application UI runtime.

Use:

- Server Components
- Server Actions where appropriate
- Suspense
- `useTransition`
- Modern React composition patterns

Avoid unnecessary client-side state.

---

# 5. Tailwind CSS

Tailwind CSS is the primary styling system.

Use Tailwind for:

- Layout
- Spacing
- Typography
- Responsive behavior
- Borders
- Colors
- Sizing
- Visibility
- Interaction states

Avoid creating one-off CSS files for individual components unless a visual requirement cannot reasonably be expressed through Tailwind.

---

# 6. Motion

Use the unified modern Motion package:

```bash
npm install motion
```

Import from:

```ts
import { motion, useScroll, useTransform } from "motion/react";
```

Do **not** introduce the legacy package API unnecessarily.

The animation layer should be centralized around reusable motion primitives and conventions.

---

# 7. Lucide React

Use Lucide React for interface icons.

```bash
npm install lucide-react
```

Example:

```tsx
import { ArrowUpRight, Menu, X } from "lucide-react";
```

Do not use manually drawn SVG icons for standard interface actions unless a brand-specific icon is required.

---

# 8. Supporting Dependencies

Recommended:

```text
Next.js
React
Tailwind CSS
Motion
Lucide React
TypeScript
```

Optional future dependencies:

```text
Zod
CMS SDK
Sentry
Analytics SDK
clsx
tailwind-merge
```

Dependencies should only be introduced when they solve a concrete requirement.

---

# 9. Strict Directory Structure

The application should follow this structure:

```text
enelle-beauty-bar/
│
├── public/
│   │
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── lookbook/
│   │   ├── transformations/
│   │   └── brand/
│   │
│   ├── fonts/
│   │
│   ├── icons/
│   │
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   │
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── lookbook/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/
│   │       └── health/
│   │           └── route.ts
│   │
│   ├── components/
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── IconButton.tsx
│   │   │   └── VisuallyHidden.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── FloatingBookingButton.tsx
│   │   │
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroContent.tsx
│   │   │   ├── HeroMedia.tsx
│   │   │   └── HeroReveal.tsx
│   │   │
│   │   ├── brand/
│   │   │   ├── BrandIntro.tsx
│   │   │   └── LuxuryExperience.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ServiceCategoryNav.tsx
│   │   │   ├── ServiceList.tsx
│   │   │   ├── ServiceItem.tsx
│   │   │   └── ServiceBookingButton.tsx
│   │   │
│   │   ├── lookbook/
│   │   │   ├── LookbookSection.tsx
│   │   │   ├── LookbookGrid.tsx
│   │   │   ├── LookbookItem.tsx
│   │   │   ├── LookbookLightbox.tsx
│   │   │   └── LookbookNavigation.tsx
│   │   │
│   │   ├── transformation/
│   │   │   ├── TransformationSection.tsx
│   │   │   └── TransformationImage.tsx
│   │   │
│   │   └── booking/
│   │       ├── BookingCTA.tsx
│   │       └── WhatsAppButton.tsx
│   │
│   ├── animations/
│   │   ├── variants.ts
│   │   ├── transitions.ts
│   │   ├── reveal.ts
│   │   ├── parallax.ts
│   │   └── constants.ts
│   │
│   ├── data/
│   │   ├── services.ts
│   │   ├── lookbook.ts
│   │   ├── navigation.ts
│   │   └── site.ts
│   │
│   ├── lib/
│   │   ├── whatsapp.ts
│   │   ├── utils.ts
│   │   ├── analytics.ts
│   │   └── seo.ts
│   │
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts
│   │   └── useScrollDirection.ts
│   │
│   ├── types/
│   │   ├── service.ts
│   │   ├── lookbook.ts
│   │   └── site.ts
│   │
│   └── config/
│       ├── site.ts
│       └── navigation.ts
│
├── .env.local
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

# 10. Directory Responsibilities

## `src/app`

Responsible exclusively for:

- Routing
- Layouts
- Pages
- Route metadata
- Loading states
- Error/not-found states
- API route handlers

Pages should compose components rather than implement complex UI directly.

---

## `src/components`

Contains reusable UI and feature components.

Components are organized by **feature/domain**, not by technical implementation alone.

---

## `src/components/ui`

Contains generic primitives.

Examples:

```text
Button
Container
Section
Divider
IconButton
```

These components must have zero knowledge of Enelle-specific business logic.

---

## `src/animations`

Contains shared Motion configuration.

No component should independently invent competing animation systems for the same interaction pattern.

---

## `src/data`

Contains static or CMS-adapter-ready content.

Examples:

```text
services.ts
lookbook.ts
navigation.ts
```

This allows the UI to be replaced by a CMS later without redesigning the component architecture.

---

## `src/lib`

Contains framework-independent application utilities.

Examples:

- WhatsApp URL generation
- Analytics event helpers
- SEO utilities
- Class-name utilities

---

## `src/hooks`

Contains genuinely reusable client-side hooks.

Hooks should be narrowly scoped.

---

## `src/types`

Contains shared TypeScript domain contracts.

---

# 11. App Router Architecture

The root layout:

```tsx
src / app / layout.tsx;
```

should own:

- HTML shell
- Metadata defaults
- Font loading
- Global providers, if absolutely required
- Global CSS

Example conceptual structure:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Avoid turning `layout.tsx` into a large client component.

---

# 12. Marketing Layout

The marketing route group should provide shared public-site structure:

```text
(marketing)/
├── layout.tsx
├── page.tsx
├── services/
└── lookbook/
```

The layout can compose:

```text
Header
↓
Page Content
↓
Floating Booking CTA
↓
Footer
```

---

# 13. Homepage Composition

`src/app/(marketing)/page.tsx` should remain intentionally small.

Conceptually:

```tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <ServicesSection />
      <LookbookSection />
      <TransformationSection />
      <LuxuryExperience />
      <BookingCTA />
    </>
  );
}
```

The page should describe **what exists**, not how every section works.

---

# 14. Component Dependency Direction

Dependencies must flow downward.

```text
Page
 ↓
Feature Section
 ↓
Feature Components
 ↓
UI Primitives
 ↓
Utilities
```

Avoid:

```text
UI Primitive
 ↓
Page
 ↓
Global Store
 ↓
Feature
```

Circular dependencies are prohibited.

---

# 15. Service Architecture

Services should use explicit domain types.

Example:

```ts
export type ServiceCategorySlug =
  | "wigs"
  | "braids"
  | "lashes"
  | "k-tips"
  | "tape-ins";

export interface Service {
  id: string;
  category: ServiceCategorySlug;
  name: string;
  description: string;
  price: number;
  currency: "GHS";
  duration?: string;
  image?: string;
}
```

The service UI consumes `Service[]`.

---

# 16. Lookbook Architecture

Lookbook content should use a typed model.

```ts
export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description?: string;
  featured?: boolean;
}
```

The grid should have no knowledge of where the content originates.

This allows:

```text
Local data
     OR
CMS
     OR
API
```

without changing the presentation layer.

---

# 17. WhatsApp Architecture

WhatsApp functionality belongs in:

```text
src/lib/whatsapp.ts
```

Example responsibility:

```ts
export function createWhatsAppUrl(message: string): string {
  // encode message and return WhatsApp click-to-chat URL
}
```

Components should not manually construct WhatsApp URLs.

Instead:

```tsx
<WhatsAppButton message="I'm interested in your K-Tip installation." />
```

This isolates external-link construction from presentation.

---

# 18. Animation Architecture

Motion is treated as a **unified presentation layer**.

The application should support three primary animation categories:

1. Entry reveals
2. Interactive/parallax motion
3. Layout/container transitions

---

# 19. Animation Rules

## Rule 1 — Animate Properties That Do Not Trigger Layout

Prefer:

```text
transform
opacity
filter
```

Avoid animating:

```text
width
height
top
left
margin
padding
```

for high-frequency animations.

---

# 20. Scroll-Driven Entry Reveals

Use Motion's viewport-aware animation system.

Example:

```tsx
import { motion } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

# 21. Reveal Requirements

Entry reveals must:

- Trigger only when appropriate content enters the viewport
- Run once by default
- Avoid continuous scroll listeners
- Avoid modifying document layout
- Use transforms and opacity
- Respect reduced-motion preferences

Default:

```text
opacity: 0 → 1
y: 20–32px → 0
```

Do not make every element animate independently.

Group related elements into meaningful reveal units.

---

# 22. Staggered Editorial Reveals

For hero or grouped typography:

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
```

Use this for:

- Navigation links
- Hero lines
- Service items
- Editorial captions

Avoid excessive staggering.

---

# 23. Cinematic Text Reveal

Hero typography should use clipped containers.

Conceptual structure:

```tsx
<div className="overflow-hidden">
  <motion.span initial={{ y: "100%" }} animate={{ y: 0 }}>
    Luxury
  </motion.span>
</div>
```

The parent remains dimensionally stable.

Only the child moves.

This prevents layout shifts.

---

# 24. Preventing Layout Shift

Never reveal content by changing its layout dimensions.

Bad:

```text
height: 0 → auto
```

for above-the-fold hero content where it changes document geometry.

Prefer:

```text
overflow: hidden
transform: translateY(...)
opacity: ...
```

The element's layout box should exist before animation begins.

---

# 25. Image Reveal Pattern

For editorial images:

```text
Fixed/reserved aspect-ratio container
        ↓
Image
        ↓
Clip / scale animation
```

Example:

```tsx
<div className="aspect-[4/5] overflow-hidden">
  <motion.div
    initial={{ scale: 1.08 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
  >
    <Image
      ...
    />
  </motion.div>
</div>
```

The outer container determines layout dimensions.

The image animation cannot cause page reflow.

---

# 26. Parallax Architecture

Parallax should be subtle.

Use Motion's scroll APIs:

```tsx
import { motion, useScroll, useTransform } from "motion/react";
```

Conceptual implementation:

```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
```

Then:

```tsx
<motion.div style={{ y }}>...</motion.div>
```

---

# 27. Parallax Rules

Parallax must:

- Be subtle
- Use transforms
- Be scoped to the relevant component
- Not update global state
- Not trigger React re-renders on every scroll event
- Not alter layout dimensions
- Be disabled or reduced for `prefers-reduced-motion`

Recommended range:

```text
10px – 40px
```

Avoid dramatic cinematic movement that causes visual fatigue.

---

# 28. Hover Parallax

Hover effects should be isolated to the hovered component.

Do not update a global cursor position store.

Preferred architecture:

```text
LookbookItem
    ↓
Local pointer state
    ↓
Motion transform
```

Conceptually:

```tsx
<motion.div
  whileHover={{
    scale: 1.02,
  }}
  transition={{
    duration: 0.5,
  }}
>
  ...
</motion.div>
```

For more sophisticated cursor-driven effects, use local Motion values rather than application state.

---

# 29. Hover Image Treatment

Recommended:

```text
Rest:
scale 1

Hover:
scale 1.03
```

Use:

```css
transform-origin: center;
```

Avoid excessive scale that causes neighboring content to appear displaced.

The parent should use:

```text
overflow: hidden
```

when appropriate.

---

# 30. Fluid Container Transitions

Container transitions should use Motion's layout capabilities only where there is a meaningful visual benefit.

Example:

```tsx
<motion.div layout>...</motion.div>
```

For shared layout transitions:

```tsx
<motion.div layoutId="active-service">...</motion.div>
```

This is appropriate for:

- Active service indicators
- Gallery selections
- Expanding editorial elements
- Navigation state indicators

It should not be used indiscriminately.

---

# 31. Service Category Transition

When switching service categories:

```text
User selects category
        ↓
Local selectedCategory state
        ↓
Service list updates
        ↓
Motion handles visual transition
```

The state belongs to the Services feature.

It must not be stored globally.

Example:

```tsx
const [activeCategory, setActiveCategory] =
  useState<ServiceCategorySlug>("wigs");
```

---

# 32. AnimatePresence

Use `AnimatePresence` for elements entering/leaving the React tree.

Example:

```tsx
<AnimatePresence mode="wait">
  {activeCategory && (
    <motion.div
      key={activeCategory}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
    >
      ...
    </motion.div>
  )}
</AnimatePresence>
```

Use `mode="wait"` when sequential editorial transitions are desired.

Avoid stacking many simultaneous presence animations.

---

# 33. Motion Performance Rules

## Do

Use:

```text
opacity
transform
scale
translate
rotate
```

## Avoid

High-frequency animation of:

```text
box-shadow
width
height
margin
padding
border-width
```

unless the effect is minor and infrequent.

---

# 34. `will-change`

Do not globally apply:

```css
will-change: transform;
```

Use it selectively for elements that genuinely require frequent animation.

Excessive `will-change` can increase memory usage.

---

# 35. Scroll Performance

Never implement:

```tsx
window.addEventListener("scroll", ...)
```

for ordinary reveal animations.

Prefer Motion's:

```text
whileInView
useScroll
useTransform
```

This keeps the animation system declarative and minimizes unnecessary React work.

---

# 36. Reduced Motion

The application must respect:

```css
@media (prefers-reduced-motion: reduce);
```

and Motion's reduced-motion facilities.

Motion-heavy experiences should degrade to:

```text
Opacity fade
or
No animation
```

rather than simply removing content.

---

# 37. Animation Configuration

Shared animation constants should live in:

```text
src/animations/constants.ts
```

Example:

```ts
export const luxuryEase = [0.22, 1, 0.36, 1] as const;

export const revealTransition = {
  duration: 0.8,
  ease: luxuryEase,
};
```

This ensures consistency across the application.

---

# 38. Animation Variants

Shared variants should live in:

```text
src/animations/variants.ts
```

Example categories:

```text
fadeUp
fadeIn
imageReveal
textReveal
staggerContainer
scaleIn
```

Components can consume these primitives without duplicating animation definitions.

---

# 39. Component Decoupling Rules

## Rule 1 — Components Own Their Own Presentation

A component should contain:

- Its markup
- Its Tailwind classes
- Its local visual behavior
- Its animation configuration

where appropriate.

---

## Rule 2 — Components Do Not Own Unrelated Business State

A gallery item must not know:

- Which service category is selected
- Whether the mobile menu is open
- Whether a booking modal exists
- Analytics implementation details

unless those concerns are explicitly passed as props.

---

# 40. Props Over Hidden Dependencies

Prefer:

```tsx
<ServiceItem service={service} onBook={handleBook} />
```

over:

```tsx
<ServiceItem />
```

where the component secretly imports a global store to determine everything it needs.

---

# 41. No Global UI Store

Do not create a global store for:

```text
isMenuOpen
activeService
hoveredGalleryItem
isLightboxOpen
currentGalleryIndex
```

These are local UI concerns.

Use:

```text
useState
useReducer
URL search params
```

as appropriate.

---

# 42. Global State Exceptions

Global state should only be introduced if the requirement genuinely spans unrelated component boundaries.

Potential future examples:

- Authenticated client state
- Shopping cart
- Persistent booking draft
- Multi-step checkout

Even then, state should be scoped to the smallest meaningful application boundary.

---

# 43. Feature State Boundaries

Example:

```text
ServicesSection
│
├── activeCategory
│
├── ServiceCategoryNav
│
└── ServiceList
```

`activeCategory` belongs to `ServicesSection`.

It should not be placed in a global store.

---

# 44. Controlled vs Uncontrolled Components

Components should generally be internally autonomous.

Example:

```tsx
<LookbookLightbox items={items} />
```

The lightbox can internally manage:

- Current image
- Open/closed state
- Keyboard navigation

unless the parent genuinely needs control.

For reusable primitives, support controlled state when there is a clear requirement.

---

# 45. UI Primitive Rules

`components/ui` components must never import:

```text
services.ts
lookbook.ts
whatsapp.ts
analytics.ts
```

A `Button` should not know what a booking is.

Bad:

```tsx
<Button booking />
```

Better:

```tsx
<Button>Book Luxury Session</Button>
```

The booking behavior belongs to the feature-level component.

---

# 46. Feature Component Rules

Feature components may depend on:

- Domain types
- Domain data
- UI primitives
- Animation primitives
- Utility functions

They should not depend on unrelated feature modules.

For example:

```text
Services
```

should not import internal implementation details from:

```text
Lookbook
```

---

# 47. Dependency Rule

Allowed:

```text
app
 ↓
components/features
 ↓
components/ui
 ↓
lib
```

Allowed:

```text
components/features
 ↓
animations
```

Disallowed:

```text
ui
 ↓
features
```

and:

```text
feature A
 ↔
feature B
```

unless explicitly mediated through shared domain utilities.

---

# 48. Data Ownership

Data should flow downward.

```text
Page
 ↓
Section
 ↓
Component
```

Example:

```tsx
<ServicesSection services={services} />
```

The section should not independently fetch unrelated data simply because it can.

---

# 49. Server/Client Boundary

The client boundary should be pushed as deep into the component tree as practical.

Bad:

```text
page.tsx
"use client"
↓
Everything becomes client-rendered
```

Good:

```text
page.tsx
(Server)
│
├── Hero
│   └── HeroReveal
│       (Client)
│
├── ServicesSection
│   └── ServiceCategoryNav
│       (Client)
│
└── LookbookSection
    └── LookbookLightbox
        (Client)
```

This preserves Server Component benefits.

---

# 50. Image Architecture

All content imagery should use:

```tsx
next / image;
```

where practical.

Images should have:

- Explicit dimensions or aspect ratio
- Appropriate `sizes`
- Meaningful alt text
- Lazy loading below the fold
- Priority loading only for genuinely critical images

The hero image should receive priority when it is the primary LCP element.

---

# 51. Image Layout Stability

Every image container should reserve its required dimensions.

Preferred:

```text
aspect-ratio
+
Image fill
```

rather than allowing image dimensions to appear after loading.

Example:

```tsx
<div className="relative aspect-[4/5] overflow-hidden">
  <Image src={image} alt={alt} fill sizes="..." className="object-cover" />
</div>
```

This prevents cumulative layout shift.

---

# 52. Responsive Image Strategy

Images should use responsive `sizes`.

Example:

```tsx
sizes="
  (max-width: 768px) 100vw,
  (max-width: 1200px) 50vw,
  33vw
"
```

Exact values should correspond to the actual editorial grid.

Do not send desktop-resolution images to mobile unnecessarily.

---

# 53. Typography Architecture

Use `next/font` for application fonts.

Fonts should be loaded at the root level and exposed through CSS variables.

Conceptually:

```tsx
const serif = ...
const sans = ...

<body className={`${serif.variable} ${sans.variable}`}>
```

This minimizes layout shift caused by font loading.

---

# 54. Global CSS

`src/app/globals.css` should contain only global concerns:

- Tailwind directives
- CSS variables
- Root styles
- Base typography
- Selection styling
- Scroll behavior
- Reduced-motion fallback
- Global utility rules that cannot reasonably live in Tailwind

Do not put feature-specific styling here.

---

# 55. Design Tokens

Define a consistent design-token layer.

Conceptual tokens:

```text
Colors
├── cream
├── linen
├── charcoal
└── gold

Typography
├── display
├── heading
├── body
└── label

Spacing
├── section
├── container
└── gutter

Motion
├── fast
├── standard
└── editorial
```

Tailwind should consume these consistently.

---

# 56. Container Architecture

Create a reusable:

```text
components/ui/Container.tsx
```

Responsible for:

- Maximum content width
- Horizontal gutters
- Responsive spacing

Example conceptual API:

```tsx
<Container size="wide">...</Container>
```

Supported sizes could include:

```text
narrow
default
wide
full
```

The exact implementation should be established once and reused throughout the site.

---

# 57. Section Architecture

Create:

```text
components/ui/Section.tsx
```

Responsible for consistent:

- Vertical spacing
- Optional background treatment
- Section IDs
- Container composition

Example:

```tsx
<Section id="services">...</Section>
```

This prevents individual pages from developing inconsistent spacing systems.

---

# 58. Navigation Architecture

The header should consist of:

```text
Header
├── DesktopNavigation
├── MobileMenuTrigger
└── MobileMenu
```

Mobile menu state belongs to the header/navigation feature.

It should not be globally accessible.

---

# 59. Floating Booking Button

`FloatingBookingButton` is a persistent presentation component.

It should:

- Render on marketing pages
- Use the shared WhatsApp utility
- Remain independent from service state
- Support contextual messages when explicitly provided
- Avoid affecting page layout

Use fixed positioning.

---

# 60. Analytics Architecture

Analytics should be abstracted behind:

```text
src/lib/analytics.ts
```

Components should call semantic events rather than directly depending on an analytics provider.

Example:

```ts
trackEvent("booking_cta_clicked", {
  source: "hero",
});
```

This makes analytics providers replaceable.

---

# 61. Error Isolation

Feature-level failures should not bring down unrelated sections where practical.

Future implementation can introduce React error boundaries around:

```text
Lookbook
Services
CMS-driven sections
```

This is particularly important once external CMS/image sources are introduced.

---

# 62. Accessibility Architecture

Interactive components must have semantic HTML.

Use:

```text
button
a
nav
main
section
article
dialog
```

instead of clickable generic `div`s.

Lucide icons used as standalone controls must have accessible labels.

Example:

```tsx
<button aria-label="Close gallery">
  <X aria-hidden />
</button>
```

---

# 63. Keyboard Interaction

The following must be keyboard accessible:

- Navigation
- Mobile menu
- Service category tabs
- Booking buttons
- Gallery
- Lightbox
- Previous/next controls
- Close controls

The lightbox must support:

```text
Escape → Close
ArrowLeft → Previous
ArrowRight → Next
```

---

# 64. SEO Architecture

Each route should expose appropriate metadata through Next.js metadata APIs.

The architecture should support:

```text
generateMetadata()
```

for dynamic service pages.

Service pages should be structured for future SEO expansion without requiring a component rewrite.

---

# 65. Route Architecture

Current MVP:

```text
/
```

Future:

```text
/services
/services/wigs
/services/braids
/services/lashes
/services/k-tips
/services/tape-ins

/lookbook
```

Potential future:

```text
/book
/shop
/shop/extensions
/shop/wigs
/account
```

The initial architecture should not require these features to exist now.

---

# 66. Performance Budget

The visual experience should be held to a strict performance budget.

Priorities:

1. LCP
2. CLS
3. INP
4. JavaScript bundle size
5. Image payload
6. Font payload

Avoid adding libraries solely for minor UI effects.

---

# 67. JavaScript Budget Philosophy

The site should remain primarily server-rendered.

Client JavaScript should exist primarily for:

```text
Interaction
Animation
Navigation
Gallery
Booking
```

Static content should remain server-rendered.

---

# 68. Testing Architecture

Recommended testing layers:

## Unit Tests

Test:

- WhatsApp URL generation
- Data transformation
- Utility functions

## Component Tests

Test:

- Service category selection
- Booking button behavior
- Gallery controls
- Mobile menu

## E2E Tests

Test:

```text
Homepage
↓
Service selection
↓
Booking CTA
↓
WhatsApp URL
```

and:

```text
Homepage
↓
Lookbook
↓
Open image
↓
Navigate
↓
Close
```

---

# 69. Recommended Testing Tools

Potential stack:

```text
Vitest
React Testing Library
Playwright
```

Testing libraries should be introduced when the project reaches a meaningful interactive state rather than adding unnecessary complexity to the initial scaffold.

---

# 70. Environment Configuration

Use:

```text
.env.local
.env.example
```

Potential variables:

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

Never expose secrets through `NEXT_PUBLIC_*`.

---

# 71. Deployment Architecture

Recommended production flow:

```text
GitHub
   ↓
CI / Build
   ↓
Vercel
   ↓
Next.js Production
```

Images can initially be stored under:

```text
/public
```

but a dedicated image/CDN/CMS provider should be considered as the library grows.

---

# 72. Production Request Flow

Typical homepage:

```text
Browser
   ↓
Next.js
   ↓
Server Component Tree
   ↓
Static/Data Content
   ↓
HTML + RSC Payload
   ↓
Browser
   ↓
Hydrate only interactive Client Components
   ↓
Motion interactions become active
```

The goal is to avoid shipping the entire page as a client-side application.

---

# 73. Booking Request Flow

```text
User
 ↓
Book Luxury Session
 ↓
WhatsAppButton
 ↓
createWhatsAppUrl()
 ↓
window/location navigation
 ↓
WhatsApp
```

No internal booking backend is required for MVP.

---

# 74. Service Interaction Flow

```text
User selects category
        ↓
ServiceCategoryNav
        ↓
Local state
        ↓
ServicesSection
        ↓
ServiceList
        ↓
ServiceItem
        ↓
ServiceBookingButton
        ↓
WhatsApp
```

No global state required.

---

# 75. Lookbook Interaction Flow

```text
User clicks image
        ↓
LookbookGrid
        ↓
LookbookLightbox
        ↓
Local selectedIndex
        ↓
Motion transition
        ↓
Image / metadata
        ↓
Book This Look
        ↓
WhatsApp
```

---

# 76. Architecture Anti-Patterns

The following patterns are explicitly prohibited unless a documented architectural exception exists.

## Anti-Pattern 1

Making `app/page.tsx` a Client Component.

## Anti-Pattern 2

Putting all site state into Zustand/Redux/context.

## Anti-Pattern 3

Creating a single 1,000+ line homepage component.

## Anti-Pattern 4

Hardcoding service information inside UI components.

## Anti-Pattern 5

Creating a global mouse-position store for hover effects.

## Anti-Pattern 6

Animating layout dimensions on every scroll event.

## Anti-Pattern 7

Using JavaScript scroll listeners for simple reveal animations.

## Anti-Pattern 8

Creating feature-specific CSS inside `globals.css`.

## Anti-Pattern 9

Importing feature modules into generic UI primitives.

## Anti-Pattern 10

Making every component `"use client"` simply because Motion exists somewhere in the application.

---

# 77. Definition of Done — Architecture

The implementation is architecturally complete when:

- [ ] Next.js App Router is established.
- [ ] React 19 is configured.
- [ ] Tailwind CSS is the primary styling system.
- [ ] Motion is the unified animation system.
- [ ] Lucide React is used for standard interface icons.
- [ ] Server Components are the default.
- [ ] Client boundaries are isolated.
- [ ] Components follow the defined dependency hierarchy.
- [ ] Services are data-driven.
- [ ] Lookbook content is data-driven.
- [ ] WhatsApp logic is centralized.
- [ ] Animation primitives are centralized.
- [ ] Images reserve layout space.
- [ ] Scroll animation does not cause layout shifts.
- [ ] Reduced-motion behavior exists.
- [ ] Global UI state is avoided.
- [ ] Generic UI primitives contain no business logic.
- [ ] Feature components remain independently testable.
- [ ] The homepage remains composition-focused.
- [ ] Future CMS integration can occur without redesigning the component architecture.

---

# 78. Final Architectural Model

The Enelle Beauty Bar frontend should ultimately resemble:

```text
                         ┌─────────────────────┐
                         │      Next.js 15+    │
                         │      App Router     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Server Components │
                         │   Pages / Layouts   │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                 Hero           Services        Lookbook
                    │               │               │
                    ▼               ▼               ▼
                Feature         Feature         Feature
                Components      Components      Components
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                            UI Primitives
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                 Tailwind         Motion          Lucide
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                              Browser UI
                                    │
                   ┌────────────────┼────────────────┐
                   ▼                ▼                ▼
                Gallery          Services         WhatsApp
```

The defining architectural principle is:

> **Keep the application server-first, the UI modular, state local, animation declarative, and the visual layer completely decoupled from business logic.**

This allows Enelle Beauty Bar to deliver the cinematic, editorial quality expected of a luxury fashion/beauty brand while retaining the performance, maintainability, and extensibility required to evolve into a full booking and commerce platform.

```

```
