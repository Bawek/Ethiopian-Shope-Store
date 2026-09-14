# 🇪🇹 Ethiopian Shop Store

A full-stack e-commerce platform built for Ethiopian merchants and customers. It enables merchants to create and manage online shops, list products, accept payments via **Chapa**, and build custom storefronts using a drag-and-drop page builder (GrapesJS). Customers can browse shops, add to cart, and place orders — all in one place.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Default Users & Credentials](#-default-users--credentials)
- [API Overview](#-api-overview)
- [Docker Setup](#-docker-setup)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Contributing](#-contributing)

---

## ✨ Features

- **Multi-role system** — Customer, Merchant, and Admin roles
- **Merchant dashboard** — Analytics, shop management, product listings
- **Admin dashboard** — Platform-wide stats, revenue data, user management
- **Custom page builder** — Merchants build storefronts with GrapesJS drag-and-drop
- **Shopping cart & orders** — Full cart, checkout, and order tracking
- **Chapa payment integration** — Ethiopian payment gateway support
- **Real-time notifications** — Socket.io powered live alerts
- **Email notifications** — Nodemailer for order & password reset emails
- **Internationalization** — i18n support via next-i18next
- **JWT authentication** — Access + refresh token strategy with HTTP-only cookies
- **Password reset** — Secure email-based password reset flow
- **Image uploads** — Multer-based local file storage
- **Health & readiness endpoints** — `/health` and `/ready` for production monitoring

---

## 🛠 Tech Stack

| Layer      | Technology                                         |
|------------|---------------------------------------------------|
| Frontend   | Next.js 15, React 18, Tailwind CSS, shadcn/ui, Redux Toolkit |
| Backend    | Node.js, Express.js                               |
| Database   | PostgreSQL (via Prisma ORM)                       |
| Cache      | Redis                                             |
| Auth       | JWT (access + refresh tokens), bcryptjs           |
| Payments   | Chapa                                             |
| Real-time  | Socket.io                                         |
| Email      | Nodemailer (Gmail SMTP)                           |
| Page Builder | GrapesJS                                        |
| Deployment | Docker, Docker Compose, Nginx                     |
| CI/CD      | GitHub Actions                                    |

---

## 📁 Project Structure

```
Ethiopian-Shope-Store/
├── backend/                  # Express.js API
│   ├── config/               # DB, email, multer, logger configs
│   ├── controllers/          # Route handler logic
│   ├── middlewares/          # Auth, validation, error handling
│   ├── prisma/               # Prisma schema & migrations
│   ├── routes/               # API route definitions
│   ├── utils/                # Token generation, socket setup
│   ├── logs/                 # Application logs
│   ├── uploads/              # Uploaded media files
│   └── index.js              # App entry point
├── frontend/                 # Next.js application
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── service/              # API service layer
│   └── styles/               # Global styles
├── scripts/                  # Deployment & health check scripts
├── .github/workflows/        # GitHub Actions CI/CD
├── docker-compose.yml        # Production Docker setup
└── docker-compose.dev.yml    # Development Docker setup
```

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [PostgreSQL](https://www.postgresql.org/) v16+
- [Redis](https://redis.io/) v7+
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) (optional, for containerized setup)
- A [Chapa](https://chapa.co/) account for payment processing
- A Gmail account (or SMTP provider) for email

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Ethiopian-Shope-Store.git
cd Ethiopian-Shope-Store
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Fill in your .env values (see Environment Variables section)
npm install
npx prisma migrate dev --name init
npm run dev
```

The backend starts on `http://localhost:8000`.

### 3. Set up the frontend

```bash
cd frontend
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev
```

The frontend starts on `http://localhost:3000`.

---

## 🔧 Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in the values:

```env
# Server
NODE_ENV=development
PORT=8000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ethiopian_shop

# JWT
ACCESS_TOKEN_SECRET=your-access-token-secret-min-32-chars
REFRESH_TOKEN_SECRET=your-refresh-token-secret-min-32-chars
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Chapa Payment
CHAPA_SECRET_KEY=your-chapa-secret-key
CHAPA_PUBLIC_KEY=your-chapa-public-key

# Email (Gmail SMTP)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
ADMIN_EMAIL=admin@yourstore.com

# CORS
CORS_ORIGIN=http://localhost:3000

# Frontend
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 👤 Default Users & Credentials

The application uses **3 roles**: `CUSTOMER`, `MERCHANT`, and `ADMIN`.

> **Note:** No seed script is included by default. Use the registration endpoint or create users manually via the API or a database seed.

### Register via API

**Endpoint:** `POST /api/accounts/register`

```json
{
  "firestName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

---

### Default Admin Account

To create an admin, register a regular account first, then promote it:

**Step 1 — Register:**
```bash
curl -X POST http://localhost:8000/api/accounts/register \
  -H "Content-Type: application/json" \
  -d '{
    "firestName": "Admin",
    "lastName": "User",
    "email": "admin@ethiopianshop.com",
    "password": "Admin@1234"
  }'
```

**Step 2 — Promote to Admin** (requires an existing admin or direct DB access):
```bash
curl -X PUT http://localhost:8000/api/accounts/{accountId}/role \
  -H "Authorization: Bearer <access_token>"
```

Or directly via Prisma:
```bash
npx prisma studio
# Open http://localhost:5555 → accounts table → change role to ADMIN
```

---

### Suggested Default Credentials (for development)

| Role     | Email                          | Password     |
|----------|-------------------------------|--------------|
| Admin    | admin@ethiopianshop.com        | Admin@1234   |
| Merchant | merchant@ethiopianshop.com     | Merchant@1234 |
| Customer | customer@ethiopianshop.com     | Customer@1234 |

> ⚠️ **Change all default passwords immediately before deploying to production.**

---

### Login

**Endpoint:** `POST /api/accounts/login`

```json
{
  "email": "admin@ethiopianshop.com",
  "password": "Admin@1234"
}
```

**Response:**
```json
{
  "accessToken": "<jwt_token>",
  "email": "admin@ethiopianshop.com",
  "role": "ADMIN",
  "status": "success"
}
```

Use the `accessToken` as a `Bearer` token in the `Authorization` header for protected routes.

---

## 📡 API Overview

| Method | Endpoint                                | Description                   |
|--------|-----------------------------------------|-------------------------------|
| POST   | `/api/accounts/register`                | Register a new account        |
| POST   | `/api/accounts/login`                   | Login                         |
| POST   | `/api/accounts/logout`                  | Logout                        |
| GET    | `/api/refresh-token`                    | Refresh access token          |
| GET    | `/api/accounts/:id`                     | Get account by ID             |
| PUT    | `/api/accounts/:accountId`              | Update account / password     |
| GET    | `/api/accounts/:email/password-reset`   | Send password reset email     |
| GET    | `/api/shops`                            | List all shops                |
| GET    | `/api/products`                         | List all products             |
| POST   | `/api/cart`                             | Add to cart                   |
| GET    | `/api/orders`                           | Get user orders               |
| POST   | `/api/orders`                           | Place an order                |
| GET    | `/api/merchant-dashboard/:accountId`    | Merchant dashboard metrics    |
| GET    | `/api/merchant-analytics/:accountId`    | Merchant analytics            |
| GET    | `/api/admin/dashboard`                  | Admin dashboard stats         |
| GET    | `/health`                               | Health check                  |
| GET    | `/ready`                                | Readiness check               |

---

## 🐳 Docker Setup

### Development

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production

```bash
# Create and fill .env at project root
cp backend/.env.example .env

docker compose up --build -d
```

Services started:
- **PostgreSQL** — port `5432`
- **Redis** — port `6379`
- **Backend API** — port `8000`
- **Frontend** — port `3000`
- **Nginx** (reverse proxy) — ports `80` / `443`

### Health checks

```bash
curl http://localhost:8000/health
curl http://localhost:8000/ready
```

---

## ⚙️ CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on push to `main` or `develop`:

| Job               | What it does                                    |
|-------------------|-------------------------------------------------|
| `lint`            | ESLint for frontend & backend                   |
| `security`        | Trivy vulnerability scan                        |
| `test`            | Unit tests against a PostgreSQL test container  |
| `build`           | Builds & pushes Docker images to GHCR           |
| `deploy-staging`  | Deploys on `develop` branch push                |
| `deploy-production` | Deploys on `main` branch push               |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request against `develop`

---

## 📄 License

This project is licensed under the ISC License.

---

> Built with ❤️ for Ethiopian entrepreneurs and the local e-commerce ecosystem.
