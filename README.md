# 🚀 Axiom Trade Token Intelligence Dashboard

A pixel-perfect replica of [Axiom Trade's](https://axiom.trade/pulse) token discovery table built with Next.js 14, featuring real-time token discovery, advanced analytics, and enterprise-grade performance.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.10-764abc?style=for-the-badge&logo=redux)

## 🌐 Live Demo

🔗 **[View Live Deployment](https://axiom-trade-token-discovery.vercel.app)** *(Update after Vercel deployment)*

---

## ✨ Features

### 🎯 Core Functionality
- **Three Token Columns**: New Pairs, Final Stretch, and Migrated ecosystems
- **Sortable Discovery Table**: 7-column table with Market Cap, Liquidity, Volume, and TXNS sorting
- **Sticky Columns**: Pair Info (left) and Action (right) remain visible during scroll
- **Real-time Updates**: WebSocket mock with live price deltas and smooth color transitions
- **Advanced Interactions**: Modals, Popovers, Tooltips with Radix UI

### 🎨 UI/UX
- **Pixel-Perfect Design**: Matching Axiom Trade's visual design
- **Fully Responsive**: Optimized for 320px to 2560px viewports
- **Smooth Animations**: Framer Motion transitions and staggered loading
- **Loading States**: Skeleton loaders with shimmer effects
- **Error Handling**: Comprehensive error boundaries with retry functionality

### ⚡ Performance
- **Memoization**: React.memo, useMemo, useCallback throughout
- **Image Optimization**: Next.js Image with WebP/AVIF support
- **Code Splitting**: Automatic route-based splitting
- **Lighthouse Score**: ≥90 in Accessibility, Best Practices, and SEO

---

## 🛠 Tech Stack

### Core Framework
- **Next.js 14** (App Router) - React framework with SSR/SSG
- **TypeScript** (Strict Mode) - Type-safe development
- **React 19** - Latest React features

### State Management & Data Fetching
- **Redux Toolkit** - Global state management
- **React Query** - Server state and caching
- **Custom WebSocket Hook** - Real-time price updates

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animation library

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Lighthouse CI** - Performance auditing

---

## 📦 Installation

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/watchout401/axiom-trade-token-discovery.git
cd axiom-trade-token-discovery

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically on every push

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 📊 Performance Metrics

### Lighthouse Scores
- **Performance**: 70 (localhost) / Target: ≥90 (production)
- **Accessibility**: 96 ✅
- **Best Practices**: 100 ✅
- **SEO**: 100 ✅

*Note: Performance scores improve significantly on Vercel's edge network*

### Key Metrics
- **Time to Interactive**: < 3s
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 639px (Card layout, tab navigation)
- **Tablet**: 640px - 1023px (Scrollable table, 2-column grid)
- **Desktop**: 1024px+ (Full table, 3-column grid)
- **Wide**: 2560px+ (Centered container, max-width)

### Mobile Features
- Single-column card layout on Discover page
- Tab-based navigation on Pulse page
- Touch-optimized buttons (≥40px)
- Horizontal scrolling for metrics

---

## 🏗 Project Structure

```
axiomsuite/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (app)/          # App routes (Pulse, Discover)
│   │   ├── layout.tsx      # Root layout
│   │   └── providers.tsx  # Redux, React Query providers
│   ├── components/         # React components
│   │   ├── discover/      # Discover page components
│   │   ├── pulse/         # Pulse page components
│   │   ├── tokens/         # Token display components
│   │   ├── modals/         # Modal components
│   │   ├── popovers/       # Popover components
│   │   └── ui/             # shadcn/ui components
│   ├── features/           # Feature modules
│   │   └── tokens/         # Token-related features
│   ├── store/              # Redux store
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript types
│   └── data/               # Mock data
├── public/                 # Static assets
└── package.json
```

---

## 🎯 Key Features Implementation

### Real-time Updates
- Mock WebSocket updates every 2-5 seconds
- Green/red flash animations on price changes
- Updates 2-3 random tokens per tick
- Redux state management for deltas

### Sorting & Filtering
- URL-synced sorting (persists on reload)
- Sortable columns: Market Cap, Liquidity, Volume, TXNS
- Filter by market cap, platform, status
- Visual sort indicators (↑ ↓)

### Interactive Components
- **QuickBuyModal**: Token purchase confirmation
- **TokenDetailsModal**: Full token information with tabs
- **TokenInfoPopover**: Detailed metrics on hover
- **FilterPopover**: Advanced filtering options

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Quality
npm run lint         # Run ESLint

# Performance
npm run lighthouse           # Run Lighthouse audit
npm run lighthouse:mobile    # Mobile preset
npm run lighthouse:desktop   # Desktop preset
```

---

## 📚 Documentation

- [Implementation Report](./IMPLEMENTATION_REPORT.md) - Complete feature breakdown
- [Lighthouse Guide](./LIGHTHOUSE_GUIDE.md) - Performance auditing guide
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md) - Deployment instructions
- [GitHub Setup Guide](./GITHUB_SETUP_GUIDE.md) - Repository setup

---

## 🎬 Demo Video

📹 **[YouTube Demo Video](https://youtube.com/...)** *(Add link after creating)*

---

## 📄 License

This project is built as a demonstration/portfolio piece. All design elements are inspired by [Axiom Trade](https://axiom.trade).

---

## 🙏 Acknowledgments

- Design inspiration: [Axiom Trade](https://axiom.trade)
- UI Components: [shadcn/ui](https://ui.shadcn.com)
- Icons: [Lucide React](https://lucide.dev)

---

## 📧 Contact

- **GitHub**: [@watchout401](https://github.com/watchout401)
- **Repository**: [axiom-trade-token-discovery](https://github.com/watchout401/axiom-trade-token-discovery)

---

**Built with ❤️ using Next.js 14, TypeScript, and modern web technologies**
