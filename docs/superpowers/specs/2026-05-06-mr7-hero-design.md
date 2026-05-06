# MR7 Fitness — Hero Section Design Spec
**Date:** 2026-05-06  
**Status:** Approved

---

## 1. Scope

Build the complete hero page (Navbar + HeroSection) for the MR7 Fitness site to exactly match the reference screenshot at `Reference/screenshot.png`. The page is a single viewport (`100vh`), dark athletic aesthetic, with a massive overlapping "FITNESS" typographic effect behind a grayscale athlete image.

---

## 2. Tech Stack (confirmed)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14.2 App Router | Already installed |
| Styling | Tailwind CSS v3.4 | Already installed; extend config with tokens |
| Animation | Framer Motion 11 | Already installed |
| Icons | Lucide React | Already installed |
| UI Components | shadcn/ui | Install: Button + NavigationMenu only |
| Fonts | Barlow Condensed 900, Rajdhani 400/600 | Via `next/font/google` |

---

## 3. Color Tokens

Add to `tailwind.config.js` under `theme.extend.colors`:

```js
mr7Orange: '#FF5500',
mr7Bg:     '#0a0a0a',
mr7Muted:  '#555555',
```

Add to `globals.css` `:root`:
```css
--color-bg:     #0a0a0a;
--color-orange: #FF5500;
--color-white:  #FFFFFF;
--color-muted:  #555555;
--color-circle: rgba(120, 40, 10, 0.55);
```

---

## 4. Font Setup (`app/layout.tsx`)

```ts
import { Barlow_Condensed, Rajdhani } from 'next/font/google'

const barlowCondensed = Barlow_Condensed({
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-display',
})

const rajdhani = Rajdhani({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-body',
})
```

Apply both variables to `<body>`. Add `overflow-x-hidden` to prevent horizontal scroll.

---

## 5. File Structure

```
app/
  layout.tsx          ← fonts, globals.css, overflow-x-hidden
  page.tsx            ← renders <Navbar /> + <HeroSection />
  globals.css         ← CSS vars + Tailwind directives
components/
  Navbar.tsx
  HeroSection.tsx
public/
  athlete.png         ← already present
Reference/
  screenshot.png      ← design reference
docs/
  superpowers/specs/
    2026-05-06-mr7-hero-design.md
```

---

## 6. Navbar (`components/Navbar.tsx`)

**Container:** `position: fixed`, `top-0 left-0 right-0`, `z-50`, transparent background, no backdrop blur.

**Left — Logo:**  
- Text "MR7"
- Font: `var(--font-display)`, weight 900, ~1.4rem (`text-[1.4rem]`)
- Color: `#FF5500`
- Letter-spacing: `tracking-[0.15em]`
- Uppercase

**Center-right — Nav Links (desktop only, `hidden md:flex`):**  
- Links: HOME · ABOUT · INSTRUCTORS · COURSES · PRICING · GALLERY · BLOG · CONTACT
- Rendered via shadcn `NavigationMenu`
- Font: `var(--font-body)`, weight 600, `text-xs`, `tracking-[0.12em]`, `uppercase`, white
- `gap-8` between links
- Hover: orange underline animated via Framer Motion `layoutId="nav-underline"` (shared underline slides between active links)
- Active (HOME): white text, no extra style

**Far Right — Hamburger Button:**  
- shadcn `Button`, `rounded-none`, `bg-[#FF5500]`, `w-10 h-10`, `p-0`
- Icon: `Menu` from lucide-react, `size={18}`, white
- No hover background change

**Fixed Right Edge — Social Icons:**  
- `position: fixed`, `right-4`, `top-1/2 -translate-y-1/2`, `z-50`
- Three icons stacked: `Facebook`, `Twitter`, `Linkedin` from lucide-react
- `size={18}`, `text-white`, `opacity-70 hover:opacity-100`
- `flex flex-col gap-5`

**Entrance Animation:**  
- Navbar container: `y: -60 → 0`, `opacity: 0→1`, duration 0.6s, `ease: [0.25,0.1,0.25,1]`
- Each nav link: stagger `delay: 0.3 + index * 0.05s`, `opacity: 0→1`

---

## 7. Hero Section (`components/HeroSection.tsx`)

**Container:** `min-h-screen` (100vh), `position: relative`, `overflow: hidden`, `bg-[#0a0a0a]`.

### Z-Index Stack

| z-index | Element |
|---|---|
| z-[1] | "FITNESS" massive text |
| z-[2] | Orange ring circle |
| z-[10] | Athlete image |
| z-[20] | "MR7" label + orange line |
| z-[30] | Dots + subtitle + Explore button |

### "FITNESS" Text
- `position: absolute`, `left-0`, top ~38% of viewport (`top-[38%]`)
- Font: `var(--font-display)`, 900, `text-[clamp(120px,18vw,260px)]`
- Color: white
- `tracking-[-0.01em]`
- `pl-12` (left padding ~3rem)
- `z-[1]` — behind athlete

### "MR7" Label
- `position: absolute`, `left-14` (~3.5rem), `top-[35%]`
- Font: `var(--font-display)`, 900, `text-[4.5rem]`
- Color: `#FF5500`
- `tracking-[0.05em]`, uppercase
- `z-[20]`
- Below it: `<motion.div>` orange line, `h-[3px] bg-[#FF5500]`, `w-[80px]`
  - Animates width `0 → 80px`, delay 0.3s, duration 0.5s

### Athlete Image
- Next.js `<Image>` from `/athlete.png`
- `position: absolute`, `left-[50%]` (centered ~50–55%), `bottom-0`
- `h-[90vh] w-auto`
- `grayscale` filter class
- `z-[10]`
- `object-contain`

### Orange Ring Circle
- `position: absolute`, `right-[-5%]`, `top-[30%]`
- `w-[500px] h-[500px]`, `rounded-full`
- `border-2 border-[#FF5500]/40`
- Inner radial-gradient glow: via Tailwind `bg-[radial-gradient(circle,rgba(180,60,10,0.3),transparent)]`
- `z-[2]`
- Entrance: `opacity: 0→1`, delay 0.5s, duration 0.8s
- Infinite pulse: `scale: 1→1.04→1`, duration 3s, repeat Infinity, easeInOut

### Left Dot Indicators
- `position: absolute`, `left-5`, `top-1/2 -translate-y-1/2`
- `flex flex-col gap-[10px]`
- Dot 1: `w-2 h-2 rounded-full bg-[#FF5500]` (8px, active)
- Dot 2 + 3: `w-1.5 h-1.5 rounded-full bg-white/30` (6px, inactive)
- Stagger entrance: each dot `opacity: 0→1`, delay 0.1s apart, starting 0.6s
- `z-[30]`

### Bottom-Left Content
- `position: absolute`, `bottom-[8%]`, `left-14`
- `z-[30]`

**Paragraph:**  
- "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim."
- Font: `var(--font-body)`, 400, `text-sm`, `text-[#555555]`
- `max-w-[260px]`, `leading-relaxed`
- Entrance: `opacity: 0→1, y: 20→0`, delay 0.7s, duration 0.6s

**Explore Button:**  
- shadcn `Button variant="ghost"` 
- Text: "EXPLORE" + `ChevronRight` icon
- Font: `var(--font-body)`, 600, `text-sm`, `tracking-[0.15em]`, `uppercase`
- Color: white
- `flex items-center gap-2`
- Hover: text color shifts to `#FF5500`; ChevronRight animates `x: 0→4px`
- Entrance: `opacity: 0→1, y: 10→0`, delay 0.85s, duration 0.5s

---

## 8. Entrance Animation Summary

| Element | Transform | Delay | Duration |
|---|---|---|---|
| Navbar | y: -60→0, opacity 0→1 | 0s | 0.6s |
| Nav links | opacity 0→1 (stagger) | 0.3s + i×0.05s | 0.4s |
| "MR7" label | x: -60→0, opacity 0→1 | 0s | 0.7s |
| Orange line | width 0→80px | 0.3s | 0.5s |
| "FITNESS" | x: -80→0, opacity 0→1 | 0.15s | 0.8s |
| Athlete image | opacity 0→1, scale 1.04→1 | 0.4s | 0.9s |
| Orange circle | opacity 0→1 | 0.5s | 0.8s |
| Dot 1 | opacity 0→1 | 0.6s | 0.4s |
| Dot 2 | opacity 0→1 | 0.7s | 0.4s |
| Dot 3 | opacity 0→1 | 0.8s | 0.4s |
| Subtitle | opacity 0→1, y 20→0 | 0.7s | 0.6s |
| Explore btn | opacity 0→1, y 10→0 | 0.85s | 0.5s |

All use easing `[0.25, 0.1, 0.25, 1]`.

---

## 9. Important Constraints

- Athlete image MUST visually overlap and cover the right portion of "FITNESS" text
- Orange circle is a ring outline only — NOT a filled blob
- Social icons are `position: fixed` (not inside hero container)
- No inline `style={{}}` — dynamic values handled via Tailwind arbitrary values or Framer Motion `animate` props
- No horizontal scroll (`overflow-x: hidden` on body)
- Mobile: nav links hidden, hamburger visible; hero layout adapts with `md:` breakpoints
- `"use client"` required on both Navbar and HeroSection (Framer Motion)
