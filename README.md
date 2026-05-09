# Nexus Vault V2

A clean, stable rebuild of the Nexus Vault platform with Next.js 16, Prisma, and NextAuth.

## Features

- **Clean Architecture**: No legacy middleware issues or conflicting auth systems
- **Stable Authentication**: JWT-based auth with NextAuth v5 (beta)
- **Database Integration**: Prisma ORM with PostgreSQL
- **Error Handling**: Every server page and API route has try/catch blocks
- **Admin Panel**: Protected dashboard for managing orders, customers, games, products, tickets, and refunds
- **Responsive Design**: Mobile-first dark theme with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL + Prisma 7.8
- **Auth**: NextAuth 5.0.0-beta
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/auth/        # Admin login page
│   ├── nexus-control-panel/  # Admin dashboard
│   ├── shop/              # Shop pages
│   ├── leaderboard/       # Leaderboard page
│   ├── reviews/           # Reviews page
│   ├── join/              # Membership signup
│   ├── login/             # User login/register
│   ├── profile/           # User profile
│   └── ...
├── components/            # React components
│   ├── layout/           # Navbar, Footer
│   └── providers/        # SessionProvider
├── lib/                  # Utilities
│   ├── auth.ts          # NextAuth configuration
│   ├── auth-helpers.ts  # Auth helper functions
│   └── prisma.ts        # Prisma client
├── types/               # TypeScript types
└── ...
```

## Environment Variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_vault"

# NextAuth
AUTH_SECRET="your-secret-key-min-32-chars-long"

# Optional: Stripe (for payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npx prisma db push
   ```

3. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Database Schema

The schema includes:
- **User** - Accounts with membership status
- **Game** - Games and services catalog
- **Product** - Individual items/pricing
- **Order** - Customer orders
- **OrderItem** - Line items in orders
- **Subscription** - Membership subscriptions
- **SupportTicket** - Customer support
- **RefundRequest** - Refund management
- **Admin** - Admin accounts
- And more...

## Admin Access

To access the admin panel:

1. Create a user through the regular registration
2. Set `isAdmin = true` in the database:
   ```sql
   UPDATE "User" SET "isAdmin" = true WHERE email = 'your@email.com';
   ```
3. Navigate to `/admin/auth` and sign in
4. You'll be redirected to `/nexus-control-panel`

## Key Improvements Over V1

1. **No middleware.ts** - Auth is handled directly in pages/layouts
2. **Simple auth helpers** - `requireAdmin()`, `requireAuth()` functions
3. **Error boundaries** - Every data fetch has try/catch
4. **Clean session handling** - No complex cookie issues
5. **Stable build** - No conflicting dependencies

## Deployment

### Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Build Command

```bash
npm run build
```

This runs `prisma generate` before building to ensure the client is up to date.

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## License

Private - Nexus Vault
