# Quick Start Guide

Get BloomNote running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free at [supabase.com](https://supabase.com))

## Step 1: Install Dependencies

```bash
cd bloom-note
npm install
```

## Step 2: Set Up Supabase

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project name and password
4. Wait 2 minutes for provisioning

### Run Database Migration
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy/paste contents from `supabase/migrations/001_initial_schema.sql`
4. Click **Run**

### Get Credentials
1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - anon public key
   - service_role key (⚠️ keep secret!)

## Step 3: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Step 5: Test It Out

1. Click **"Create Your Card"**
2. Pick 3-4 flowers
3. Click **"Next"**
4. Click **"Auto-Arrange Flowers"**
5. Click **"Next"**
6. Write a message
7. Click **"Publish Card"**
8. Share the link!

## Common Issues

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

### Supabase Connection Error
- Check `.env.local` has correct credentials
- Verify database migration ran successfully
- Check Supabase project is active (not paused)

### 3D Not Rendering
- Check browser supports WebGL (visit [webglreport.com](https://webglreport.com))
- Try in Chrome/Safari (not all browsers supported)
- Check console for errors

## Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main

# Then:
# 1. Go to vercel.com
# 2. Import repository
# 3. Add environment variables from .env.local
# 4. Deploy!
```

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for technical details
- See [TESTING.md](./TESTING.md) for testing guide

## Need Help?

- Check the [README](./README.md)
- Review database schema in `supabase/migrations/001_initial_schema.sql`
- Verify environment variables in `.env.local`

---

Happy card making! 💐
