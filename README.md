# MR7 Fitness - Next.js Hero Component

A stunning fitness landing page with Framer Motion animations.

## Features

- Dark theme with orange accent colors
- Grayscale athlete image with z-index layering
- Animated orange glow circle with pulse effect
- Orange ring outline with secondary pulse
- Framer Motion slide-in and fade animations
- Responsive design
- Left side dot indicators
- "Explore" CTA button

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your athlete image as `public/athlete.png`

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── athlete.png
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Animations

- **MR7**: slideInFromLeft + fade, 0s delay
- **FITNESS**: slideInFromLeft + fade, 0.2s delay
- **Athlete**: fade + scale (1.05→1.0), 0.3s delay
- **Glow Circle**: Infinite pulse/breathe animation
- **Ring Outline**: Secondary pulse animation
