# BloomNote - 3D Valentine Card Maker

Create beautiful personalized 3D pop-up Valentine cards with animated flower bouquets. No signup required, free forever.

## Features

- 🎨 **Easy Creation**: Pick flowers → Arrange in 3D → Write message → Publish
- ✨ **Stunning 3D Animation**: Pop-up cards with procedural flower geometry
- 🔗 **Instant Sharing**: Share cards via short links
- 📱 **Mobile Optimized**: Works perfectly on all devices
- 💝 **Always Free**: No ads, no signup, unlimited cards

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **3D**: three.js, @react-three/fiber, @react-three/drei
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase Postgres
- **Hosting**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier)
- A Vercel account (optional, for deployment)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd bloom-note
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and keys from Settings → API
3. Go to SQL Editor and run the migration:
   - Copy contents from `supabase/migrations/001_initial_schema.sql`
   - Paste and execute in SQL Editor

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

1. Click "Create Your Card"
2. Pick 3-4 flowers
3. Arrange them in 3D (or use Auto-Arrange)
4. Write a message and choose a theme
5. Publish to get a shareable link
6. Open the link to see your card

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (same as `.env.local`)
5. Deploy!

Your app will be live at `https://your-app.vercel.app`

## Project Structure

```
bloom-note/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── create/            # Card creation wizard
│   ├── c/[slug]/          # Card viewer
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── three/            # 3D components
│   ├── wizard/           # Wizard steps
│   └── ui/               # Shared UI components
├── lib/                  # Utilities
│   ├── supabase/        # Database clients
│   └── cards/           # Card logic
├── types/               # TypeScript types
└── supabase/           # Database migrations
```

## Database Schema

The app uses a single `cards` table:

- **id**: UUID primary key
- **slug**: Unique 10-character URL-safe slug
- **config**: JSONB containing flowers, theme, and message
- **message**: Denormalized message text
- **views**: View counter
- **created_at**: Timestamp
- **deleted_at**: Soft delete timestamp

## API Endpoints

- `POST /api/cards` - Create new card
- `GET /api/cards/[slug]` - Fetch card by slug
- `POST /api/cards/[slug]/view` - Increment view counter

## Performance

- Initial JS bundle: <500KB
- 3D scene: ~600 triangles per card
- Target: 60fps animations on iPhone 12+
- Lighthouse score: 80+ on mobile

## Roadmap

MVP features are complete! Future enhancements:

- [ ] Edit capability with edit tokens
- [ ] More flower types (8 total)
- [ ] Custom flower colors
- [ ] Background music
- [ ] GLB model support
- [ ] Animation presets
- [ ] QR code generation

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions, please open a GitHub issue.

---

Made with 💐 by BloomNote
