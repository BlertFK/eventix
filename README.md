# Eventix - Discover. Book. Experience.

A full-stack event ticket management and sales platform built with Next.js, Tailwind CSS, and Framer Motion.

## Live Demo

> **URL:** [https://eventix.vercel.app](https://eventix.vercel.app)

## Screenshots

| Home Page | Events Page | Event Details |
|-----------|-------------|---------------|
| ![Home](screenshots/home.png) | ![Events](screenshots/events.png) | ![Details](screenshots/details.png) |

| Dashboard | Admin Panel | Cart |
|-----------|-------------|------|
| ![Dashboard](screenshots/dashboard.png) | ![Admin](screenshots/admin.png) | ![Cart](screenshots/cart.png) |

## Features

- 14+ fully functional pages with responsive design
- Authentication with NextAuth (Credentials + Google OAuth)
- Role-based access control (User / Admin)
- Full CRUD operations for Events and Reviews
- Real-time cart with localStorage persistence
- Server-side rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR)
- Form validation with react-hook-form
- Animated UI with Framer Motion
- MongoDB database with 4 models
- Search with debounced input
- Admin panel for event management

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js (JWT)
- **Forms:** react-hook-form
- **Icons:** Lucide React
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, featured events, testimonials |
| About | `/about` | About the platform |
| Contact | `/contact` | Contact form with validation |
| Login | `/login` | User authentication |
| Register | `/register` | Account creation with password strength |
| Dashboard | `/dashboard` | User overview (protected) |
| Admin | `/admin` | Event CRUD management (admin only) |
| Events | `/events` | Browse all events with filters |
| Event Details | `/events/[id]` | Dynamic event page with tickets |
| Cart | `/cart` | Shopping cart with checkout |
| Favorites | `/favorites` | Saved events (protected) |
| Profile | `/profile` | User settings and tickets |
| Search | `/search` | Instant event search |
| FAQ | `/faq` | Accordion FAQ by category |
| Terms | `/terms` | Terms & Conditions |
| 404 | Not found | Custom animated 404 page |

## Data Fetching Strategies

- **SSR (Server-Side Rendering):** `/events` page uses `dynamic = "force-dynamic"` for always-fresh data
- **SSG (Static Site Generation):** `/events/[id]` uses `generateStaticParams` to pre-render event pages at build time
- **ISR (Incremental Static Regeneration):** `/events/[id]` uses `revalidate = 60` to refresh static pages every 60 seconds

## Database Models

1. **User** - name, email, password, role, avatar, phone, bio, location, favorites
2. **Event** - name, description, date, venue, city, category, price, tickets, image, ticketTypes
3. **Order** - userId, eventId, eventName, ticketType, quantity, totalPrice, status
4. **Review** - userId, userName, eventId, rating, comment

## API Routes

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth authentication |
| `/api/auth/register` | POST | User registration |
| `/api/events` | GET, POST | List/create events |
| `/api/events/[id]` | GET, PUT, DELETE | Single event CRUD |
| `/api/orders` | GET, POST | User orders |
| `/api/reviews` | GET, POST | Event reviews |
| `/api/favorites` | GET, POST | Toggle favorites |
| `/api/users` | GET, PUT | User profile |

## Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/BlertFK/eventix.git
cd eventix
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventix?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Seed admin user (optional):
```bash
node scripts/seed-admin.mjs
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
npm test
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for JWT encryption |
| `NEXTAUTH_URL` | Application URL |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (optional) |

## Deployment (Vercel)

1. Push code to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

## License

This project is built for educational purposes as part of the Web Development course at UBT.
