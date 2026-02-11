# BloomNote - Project Overview

## 📋 Table of Contents

- [Quick Links](#quick-links)
- [Project Stats](#project-stats)
- [What is BloomNote?](#what-is-bloomnote)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Technology Decisions](#technology-decisions)
- [File Organization](#file-organization)
- [Getting Started](#getting-started)

## 🔗 Quick Links

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes
- **[README.md](./README.md)** - Full documentation
- **[TESTING.md](./TESTING.md)** - Testing guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical details

## 📊 Project Stats

- **Total Files**: 66 TypeScript files
- **Test Coverage**: 94.33% (44 tests)
- **Bundle Size**: 347KB (landing), 392KB (card viewer)
- **Build Time**: ~7 seconds
- **Test Time**: ~0.7 seconds
- **Lines of Code**: ~3,500 (excluding tests)

## 🎯 What is BloomNote?

BloomNote is a consumer-grade web application that lets anyone create beautiful 3D pop-up Valentine cards with animated flower bouquets. The core value proposition:

- **Simple**: Create a card in under 3 minutes
- **Beautiful**: Stunning 3D animations
- **Shareable**: Get a short link to share anywhere
- **Free**: No signup, no ads, no limits

### Target Audience
- Non-technical users
- People who want to send digital Valentine cards
- Anyone looking for a unique way to express love

### Use Cases
1. Valentine's Day cards
2. Anniversary messages
3. Just-because romantic gestures
4. Long-distance relationships
5. Social media sharing

## 🏗️ Architecture

### Tech Stack

```
┌─────────────────────────────────────────┐
│           Frontend (Next.js)             │
│  ┌────────────┬─────────────┬─────────┐ │
│  │   React    │  three.js   │ Tailwind│ │
│  │   19.2.4   │  via R3F    │   CSS   │ │
│  └────────────┴─────────────┴─────────┘ │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│        API Routes (Serverless)           │
│  ┌────────────┬─────────────┬─────────┐ │
│  │   Create   │    Fetch    │  Views  │ │
│  │  POST /api │  GET /api   │ POST    │ │
│  └────────────┴─────────────┴─────────┘ │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│        Database (Supabase)               │
│  ┌────────────────────────────────────┐ │
│  │  Postgres + RLS + Functions        │ │
│  │  - cards table                     │ │
│  │  - increment_card_views()          │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Data Flow

**Card Creation:**
```
User → Wizard → API Route → Supabase → Slug Generated → Redirect to Card
```

**Card Viewing:**
```
User Opens URL → Server Fetches Card → Client Renders 3D → Animation Plays → View Counted
```

## ✨ Key Features

### 1. Wizard-Based Creation
- **Step 1**: Pick flowers (Rose, Tulip, Daisy, Sunflower)
- **Step 2**: Arrange in 3D with live preview
- **Step 3**: Write message and choose theme

### 2. 3D Rendering
- Procedural flower geometry (~150 triangles each)
- Real-time OrbitControls for manipulation
- Smooth animations (60fps target)
- Mobile-optimized performance

### 3. Animation Sequence
1. Closed card (initial state)
2. Card unfolds (1.5s)
3. Bouquet pops up (2s)
4. Flowers sway (continuous)
5. Message reveals

### 4. Sharing System
- 10-character unique slugs (nanoid)
- Web Share API support
- Clipboard fallback
- View counter with auto-increment

## 🔧 Technology Decisions

### Why Next.js 15?
- ✅ App Router for modern architecture
- ✅ Server Components for better SEO
- ✅ API Routes for serverless backend
- ✅ Built-in optimization (images, fonts, code splitting)
- ✅ Vercel deployment integration

### Why three.js / R3F?
- ✅ Powerful 3D rendering
- ✅ React integration via @react-three/fiber
- ✅ Great mobile performance
- ✅ Rich ecosystem (@react-three/drei)
- ✅ No need for complex 3D software

### Why Supabase?
- ✅ Generous free tier (500MB DB)
- ✅ Built-in authentication (if needed later)
- ✅ Row Level Security (RLS)
- ✅ Real-time capabilities (future feature)
- ✅ PostgreSQL (powerful SQL features)

### Why TypeScript?
- ✅ Catch errors at compile time
- ✅ Better IDE support
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Team scalability

### Why Tailwind CSS?
- ✅ Rapid development
- ✅ Consistent design system
- ✅ Small bundle size (unused CSS purged)
- ✅ Mobile-first approach
- ✅ No CSS file management

## 📂 File Organization

### Core Directories

```
app/                    # Next.js App Router
├── api/               # API endpoints
├── c/[slug]/          # Card viewer (dynamic route)
├── create/            # Card creation wizard
├── layout.tsx         # Root layout
└── page.tsx           # Landing page

components/            # React components
├── card-viewer/      # Card display components
├── landing/          # Landing page sections
├── three/            # 3D components
├── ui/               # Shared UI components
└── wizard/           # Wizard step components

lib/                   # Business logic
├── cards/            # Card CRUD operations
├── supabase/         # Database clients
└── utils/            # Utility functions

types/                # TypeScript definitions
├── card.ts           # Card types
├── flower.ts         # Flower types
└── database.ts       # Supabase types

__tests__/            # Test suites
├── components/       # Component tests
├── lib/              # Unit tests
└── integration/      # Integration tests
```

### Important Files

| File | Purpose |
|------|---------|
| `app/api/cards/route.ts` | Create new card |
| `app/c/[slug]/page.tsx` | Card viewer page |
| `components/wizard/wizard-container.tsx` | Main wizard logic |
| `components/three/scene-viewer.tsx` | 3D scene renderer |
| `lib/cards/queries.ts` | Database operations |
| `lib/cards/validation.ts` | Input validation |
| `supabase/migrations/001_initial_schema.sql` | Database schema |

## 🚀 Getting Started

### Quick Start (5 minutes)
```bash
npm install
cp .env.example .env.local
# Edit .env.local with Supabase credentials
npm run dev
```

See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

### Development Workflow

1. **Local Development**
   ```bash
   npm run dev          # Start dev server
   npm test             # Run tests
   npm run build        # Test production build
   ```

2. **Making Changes**
   - Edit components in `components/`
   - Update business logic in `lib/`
   - Add tests in `__tests__/`
   - Run tests to verify

3. **Database Changes**
   - Create new migration in `supabase/migrations/`
   - Run in Supabase SQL Editor
   - Update types in `types/database.ts`

4. **Deployment**
   ```bash
   git push origin main  # Vercel auto-deploys
   ```

## 🎨 Design Philosophy

### User Experience
- **Progressive Enhancement**: Works without JS, enhanced with 3D
- **Mobile First**: Designed for phones, scales to desktop
- **Fast Interactions**: <100ms response time goal
- **Clear Feedback**: Loading states, success messages, errors

### Code Quality
- **Type Safety**: TypeScript everywhere
- **Test Coverage**: >90% for critical paths
- **Code Reuse**: Shared components, utilities
- **Documentation**: JSDoc comments, README files

### Performance
- **Code Splitting**: Route-based chunks
- **Lazy Loading**: 3D components on-demand
- **Optimized Assets**: Next.js Image optimization
- **Caching**: Static pages, API responses

## 📈 Scalability

### Current Capacity
- **Database**: 500MB free (Supabase)
- **Bandwidth**: 100GB/month (Vercel)
- **Estimated Capacity**: ~100,000 cards
- **Cost**: $0 (free tiers)

### Growth Path
1. **0-10K cards**: Free tier sufficient
2. **10K-100K**: Upgrade Supabase ($25/mo)
3. **100K+**: Upgrade Vercel ($20/mo)

### Performance Optimization
- [ ] Add Redis caching (if needed)
- [ ] CDN for card previews
- [ ] Database read replicas
- [ ] Image optimization service

## 🔒 Security

### Current Measures
- ✅ Row Level Security (RLS) in Supabase
- ✅ Input validation with Zod
- ✅ Service role key in API routes only
- ✅ HTTPS enforced (Vercel)
- ✅ No user authentication (privacy-first)

### Future Enhancements
- [ ] Rate limiting on API routes
- [ ] Content moderation (message filtering)
- [ ] CAPTCHA for spam prevention
- [ ] CSP headers

## 🚧 Roadmap

### MVP (✅ Complete)
- [x] Card creation wizard
- [x] 3D flower rendering
- [x] Card animation system
- [x] Shareable links
- [x] View counter
- [x] Mobile responsive
- [x] Test suite

### v1.1 (Next)
- [ ] Edit capability with tokens
- [ ] More flower types (8 total)
- [ ] Custom flower colors
- [ ] Background music (opt-in)

### v2.0 (Future)
- [ ] User accounts (optional)
- [ ] Card templates
- [ ] Animation presets
- [ ] QR code generation
- [ ] Analytics dashboard

## 📚 Documentation

- **[README.md](./README.md)** - Project overview and setup
- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide
- **[TESTING.md](./TESTING.md)** - Test documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical deep dive

## 🤝 Contributing

### Setup for Development
1. Fork the repository
2. Follow [QUICKSTART.md](./QUICKSTART.md)
3. Create a feature branch
4. Make changes and add tests
5. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier formatting
- Test coverage >80%
- Meaningful commit messages

## 📄 License

MIT License - Free to use for personal or commercial projects.

## 🙏 Acknowledgments

- **Next.js** team for amazing framework
- **three.js** community for 3D tools
- **Supabase** for backend infrastructure
- **Vercel** for hosting platform

---

**Made with 💐 for Valentine's Day 2026**

For questions or issues, see [README.md](./README.md) or open a GitHub issue.
