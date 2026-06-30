# ReSell Hub — Client (Frontend)

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## Live URL

| App | URL |
|-----|-----|
| **Frontend (Vercel)** | `https://your-app-name.vercel.app` |
| **Backend API** | `https://your-api-name.onrender.com` |

> Update these URLs after deployment and before submission.

---

## Project Purpose

**ReSell Hub** is a second-hand marketplace platform where users in Bangladesh can safely buy and sell pre-owned products. The platform reduces waste, promotes sustainable consumption, and helps users earn money from unused items — similar to Bikroy, OLX, and Facebook Marketplace.

---

## Key Features

### Public
- Home page with hero, featured products, categories, stats, success stories, sustainability section
- Browse all products with **search, category filter, sort, and pagination**
- Product details with reviews, wishlist, and buy-now checkout
- Categories page, About Us, Contact, FAQ, Terms, Privacy
- Custom 404 page and skeleton loading states
- **Dark / Light theme** toggle (persists after reload)

### Authentication
- Register with email, password, and role (buyer / seller)
- Login with email and password
- **Google Sign-In** (Better Auth + Express JWT bridge)
- JWT-protected private routes and dashboards

### Buyer Dashboard
- Overview cards (orders, wishlist, payments)
- My Orders with **cancel order** (before shipment)
- Wishlist management
- Payment history
- Profile settings

### Seller Dashboard
- Business overview (products, sales, revenue, pending orders)
- **Add Product** with image URL, category, condition, price, stock
- **Edit & Delete** products
- Manage incoming orders and update status
- Sales analytics charts

### Admin Dashboard
- Platform overview (users, products, orders, revenue)
- Manage users (search, block/unblock, delete)
- Moderate products (approve, reject, view reported)
- Manage all orders
- Platform analytics charts

### Payment
- Stripe secure checkout (card payment)
- Payment success page with transaction details
- Payment history for buyers and admin monitoring

### Optional Features
1. Dark / Light theme toggle
2. Recently viewed products
3. Sustainability impact section
4. Trusted sellers showcase

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Lucide Icons |
| Auth | JWT (Express API) + Better Auth (Google OAuth) |
| Payments | Stripe Elements |
| Animation | Framer Motion |
| HTTP Client | Axios |

---

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `react`, `react-dom` | UI library |
| `axios` | API requests to Express backend |
| `better-auth` | Google OAuth handler |
| `mongodb` | Database adapter for Better Auth |
| `@stripe/react-stripe-js`, `@stripe/stripe-js` | Stripe payment UI |
| `framer-motion` | Page and card animations |
| `next-themes` | Dark / light mode |
| `lucide-react` | Icons |
| `tailwindcss`, `clsx`, `tailwind-merge` | Styling utilities |

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Backend API running (see server README)
- Google OAuth credentials
- Stripe test keys (optional for checkout testing)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/resell-hub-client.git
cd resell-hub-client

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Fill in .env.local (see table below)

# 5. Start the backend first (in apiB10 folder)
# npm run dev   → runs on http://localhost:5000

# 6. Start the frontend
npm run dev
```

Open **http://localhost:3000**

---

## Environment Variables

Create `.env.local` in the project root:

| Variable | Example | Required | Description |
|----------|---------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Yes | Express backend API base URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Yes | Stripe publishable key |
| `GOOGLE_CLIENT_ID` | `xxx.apps.googleusercontent.com` | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` | Yes | Google OAuth client secret |
| `BETTER_AUTH_SECRET` | random 32+ char string | Yes | Better Auth session secret |
| `BETTER_AUTH_URL` | `http://localhost:3000` | Yes | This app's public URL |
| `Database` | `mongodb+srv://<db_username>:<db_password>@...` | Yes | MongoDB URI for Better Auth |
| `Databaseuser` | `b10` | Yes | MongoDB username (replaces placeholder) |
| `DatabasePass` | `yourpassword` | Yes | MongoDB password (replaces placeholder) |

> Variables starting with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets there except Stripe's publishable key.

---

## Admin Login (Testing)

Run `npm run seed:admin` on the **backend** first, then log in on the frontend:

| Field | Value |
|-------|-------|
| Email | `admin@resellhub.com` |
| Password | `admin123` |

---

## Google OAuth Setup

In [Google Cloud Console](https://console.cloud.google.com/) → Credentials → OAuth 2.0 Client:

**Authorized JavaScript origins:**
```
http://localhost:3000
https://your-app-name.vercel.app
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://your-app-name.vercel.app/api/auth/callback/google
```

---

## Deploy to Vercel (Frontend)

> **Note:** Only this Next.js frontend goes on Vercel. The Express backend must be deployed separately on **Render** (free). See the server README for backend deployment.

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: ReSell Hub frontend ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resell-hub-client.git
git push -u origin main
```

### Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `resell-hub-client` repository
4. Vercel auto-detects **Next.js** — keep default settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (auto)
   - **Install Command:** `npm install`

### Step 3 — Add Environment Variables

In Vercel → Project → **Settings → Environment Variables**, add every variable from `.env.example`:

| Variable | Production Value |
|----------|-----------------|
| `NEXT_PUBLIC_API_URL` | `https://your-api-name.onrender.com/api` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe `pk_test_...` key |
| `GOOGLE_CLIENT_ID` | Same as local |
| `GOOGLE_CLIENT_SECRET` | Same as local |
| `BETTER_AUTH_SECRET` | Same random secret as local |
| `BETTER_AUTH_URL` | `https://your-app-name.vercel.app` |
| `Database` | Your MongoDB Atlas URI with placeholders |
| `Databaseuser` | MongoDB username |
| `DatabasePass` | MongoDB password |

### Step 4 — Deploy

Click **Deploy**. Vercel builds and gives you a URL like `https://resell-hub.vercel.app`.

### Step 5 — Post-Deploy Checklist

- [ ] Update `BETTER_AUTH_URL` to your exact Vercel URL (no trailing slash)
- [ ] Update Google OAuth origins and redirect URIs with Vercel URL
- [ ] Update backend `FRONTEND_URL` on Render to your Vercel URL
- [ ] Test login, Google sign-in, browse products, and dashboard
- [ ] Update this README Live URL section

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.js           # Home
│   ├── products/         # All products + details
│   ├── about/            # About Us
│   ├── categories/       # Categories page
│   ├── login/ register/  # Auth pages
│   ├── checkout/         # Stripe checkout
│   ├── dashboard/        # Buyer, Seller, Admin dashboards
│   └── api/auth/         # Better Auth API routes
├── components/           # Reusable UI components
├── context/              # AuthContext (JWT state)
└── lib/                  # api.js, auth-client.js, config.js
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| API calls fail on live site | Check `NEXT_PUBLIC_API_URL` points to Render API with `/api` suffix |
| Google sign-in fails | Verify redirect URI matches Vercel URL exactly |
| Dashboard redirects to login | Clear cookies, log in again; check backend is awake on Render |
| Stripe checkout error | Add real `STRIPE_SECRET_KEY` on backend and publishable key here |
| 404 on page reload | Vercel handles this automatically for Next.js — no extra config needed |

---

## Author

ReSell Hub — Programming Hero Assignment Project
