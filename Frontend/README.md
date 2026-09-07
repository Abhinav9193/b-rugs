# Bunaai Rugs — Manufacturing & Wholesale Landing Website

A production-quality, single-page landing website built for **Bunaai Rugs**, faithfully reproducing the approved luxury editorial visual designs.

---

## 🏛️ Project Overview

This website serves as a dedicated **manufacturing, craftsmanship, and wholesale presentation platform** for Bunaai Rugs, targeting retailers, interior designers, architects, and global commercial buyers.

### Sections (Continuous Scrolling)
1. **Header**: Fixed/sticky navigation transitioning seamlessly to solid background on scroll with direct section navigation and quick enquiry CTA.
2. **01. Our Heritage**: Cinematic split-screen hero featuring continuous multi-video auto-advance, play/pause controls, dynamic slide progress bars, and editorial typography.
3. **02. Manufacturing Process**: Large interactive player showcasing all 5 manufacturing stages (*Design & Development, Yarn Preparation, Weaving, Finishing & Care, Packing & Dispatch*) driven by Embla Carousel.
4. **03. Sustainability**: 5-stage editorial row presentation highlighting mindful practices (*Natural Materials, Responsible Sourcing, Conscious Processes, Reducing Waste, Built to Last*).
5. **04. Wholesale / Contact**: 2-column business enquiry portal with bespoke controlled form handling, input validation, and success notification state.
6. **05. Footer**: Dark charcoal multi-column layout with brand story, site navigation, contact points, social links, and legal mentions.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Motion**: [Motion for React](https://motion.dev/) (`motion/react`)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/) (`embla-carousel-react`)
- **Styling**: Pure CSS Architecture with CSS Variables (No Tailwind, No Heavy UI Frameworks)
- **Typography**: Cormorant Garamond (Serif Display) & Inter (Sans-Serif)

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Architecture & Media Replacement

```
bunaai-rugs/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│       ├── branding/         # Logos & brand icons
│       ├── heritage/         # Hero videos (.mp4) and posters (.jpg)
│       ├── manufacturing/    # 5 process videos (.mp4) and thumbnails (.jpg)
│       ├── sustainability/   # Step images (.jpg)
│       └── wholesale/        # Wholesale presentation imagery
├── src/
│   ├── app/                  # Application root & main entry
│   ├── assets/styles/        # globals.css, variables.css, animations.css
│   ├── components/
│   │   ├── layout/           # Header.jsx, Footer.jsx
│   │   └── ui/               # Button, Input, Select, Textarea
│   ├── features/
│   │   ├── heritage/         # Hero video carousel & indicators
│   │   ├── manufacturing/    # 5-step video player & Embla thumbnail strip
│   │   ├── sustainability/   # Step rows & scroll reveals
│   │   └── wholesale/        # Controlled enquiry form & custom hook
│   ├── pages/Home/           # Single-page container
│   ├── hooks/                # useMediaQuery, useInterval, useScrollPosition
│   └── lib/                  # constants.js, utils.js
```

### Replacing Videos & Imagery
- **Heritage Videos**: Place `.mp4` and poster `.jpg` files in `public/images/heritage/` and configure `src/features/heritage/data/heritageVideos.js`.
- **Manufacturing Process**: Place 5 videos in `public/images/manufacturing/` and configure `src/features/manufacturing/data/processVideos.js`.
- **Sustainability**: Place images in `public/images/sustainability/` and update `src/features/sustainability/data/sustainabilitySteps.js`.
- **Brand Logos**: Replace `logo-icon.png` and `logo-full.png` inside `public/images/branding/`.
