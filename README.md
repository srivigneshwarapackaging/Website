# Sri Vigneshwara Packaging — Corrugated Site

Premium marketing site with MongoDB CMS, Google OAuth admin, and scroll-driven storytelling.

## Project structure

```
frontend/   Next.js app (pages, components, client lib, public assets)
backend/    Database, auth, models, server services
shared/     Types and validation schemas used by both layers
scripts/    Utility scripts
```

## Setup

1. Copy environment variables:

```bash
cp .env.example frontend/.env.local
```

2. Fill in `frontend/.env.local`:

- `MONGODB_URI` — MongoDB Atlas connection string
- `NEXTAUTH_SECRET` — random string (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — `http://localhost:3000` (or production URL)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `ADMIN_EMAIL` — Google account allowed to access `/admin`
- Optional: `RESEND_API_KEY`, `SALES_EMAIL` for inquiry email notifications

3. Install and run from the repo root:

```bash
npm install
npm run dev
```

4. Seed CMS (while logged in as admin):

```
GET /api/admin/seed
```

Or visit admin dashboard after OAuth login and publish content.

## Admin

- Login: `/auth/admin` (Google OAuth)
- Dashboard: `/admin/dashboard`
- Tabs: Hero, About, Process, Products, Sustainability, Contact, Company, Inquiries, Analytics
- **Publish site** saves all content to MongoDB

## Scripts

- `npm run dev` — development server (`frontend/`)
- `npm run build` — production build
- `npm run lint` — ESLint

## Architecture

- **Frontend:** Next.js App Router, design system, Lenis smooth scroll, CMS-driven sections
- **Backend:** MongoDB/Mongoose, NextAuth, admin API routes under `frontend/app/api/`
- **Shared:** Content types (`shared/types/`) and Zod schemas (`shared/validation/`)
