# Ethiopian Shope Store

A scalable e-commerce platform for merchants and customers. This monorepo contains a Node/Express backend and a Next.js frontend using the App Router.

**Contents**
- backend — Express API, Prisma, payments (Chapa), email sending
- frontend — Next.js (App Router) site and merchant/admin UI

**Project structure (high level)**
- [backend](backend)
- [frontend](frontend)

**Quick overview**
This repository provides:
- Merchant dashboard and templates
- Customer-facing storefront (Next.js App Router)
- Payment integration via Chapa
- Email notifications via SMTP (nodemailer)
- Real-time features via socket.io

**Requirements**
- Node.js 18+ (recommended)
- npm 9+ (or yarn/pnpm)
- PostgreSQL-compatible database (Neon or Postgres)
- (Optional) Render / Vercel accounts for deployment

**Environment variables**
Create environment files for backend and frontend (do NOT commit secrets). Example keys required by the backend (see `backend/.env`):

- `PORT` (default 8000)
- `DATABASE_URL` (Postgres/Neon connection string)
- `BASE_URL` (frontend base URL, e.g. http://localhost:3000)
- `CHAPA_SECRET_KEY`, `CHAPA_PUBLIC_KEY`, `CHAPA_ENCRYPTION_KEY`
- `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`
- `SIGNING_SECRET`
- `GEMINI_API_KEY` (optional)
- `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_SENDER_NAME`, `ADMIN_EMAIL`

Frontend may require public API base URL variables (set on hosting platform):
- `NEXT_PUBLIC_API_URL` (e.g. https://api.example.com or http://localhost:8000)

**Local development**
1. Clone the repo and install dependencies for each workspace:

```bash
# from repo root
cd backend
npm install

# in a new terminal
cd frontend
npm install
```

2. Configure the environment variables:
- Copy `backend/.env.example` (if present) or create `backend/.env` and set the variables above.
- Configure frontend environment variables if needed.

3. Run services locally:

```bash
# Start backend
cd backend
npm run dev   # or `node index.js` for production-like start

# Start frontend
cd frontend
npm run dev
```

Visit http://localhost:3000 for the frontend and http://localhost:8000 for the API.

**Build & Deploy**
- Frontend (Next.js App Router):
  - Build: `npm run build` (from `frontend`)
  - Start: `npm run start` (production)
  - On Vercel, ensure Node version and env vars are configured.

- Backend:
  - Build not required; deploy Node process
  - On Render or similar, set environment variables in the dashboard, and run `npm start`.

**Common deployment issues & fixes**
- ChunkLoadError (loading app/layout chunk)
  - Cause: importing client-only modules (like `react-toastify`) directly in a server component such as `app/layout.js`.
  - Fix: Move client-only imports into client components, or wrap them behind a `'use client'` client component. See [frontend/app/layout.js](frontend/app/layout.js).

- Module not found during Vercel build (e.g. Can't resolve `../../contexts/ShopContext`)
  - Cause: incorrect import path or missing file (case-sensitive on Linux builds).
  - Fix: Ensure imports use the correct relative paths or create the missing module. Example: this repo adds `frontend/app/contexts/ShopContext.js` and `frontend/app/components/ProductCard.js` to resolve such errors.

- SMTP `ETIMEDOUT` when sending email in deployment
  - Cause: outbound SMTP blocked by host or incorrect connection settings / credentials.
  - Fixes:
    - Verify `EMAIL_SERVER_HOST` and `EMAIL_SERVER_PORT` (Gmail: `smtp.gmail.com` port 465 for `secure: true` or 587 for `STARTTLS`).
    - Use App Passwords if Gmail account has 2FA.
    - Check hosting provider docs for blocked SMTP ports; if blocked, use a transactional email provider (SendGrid, Mailgun, Postmark) and prefer API-based sending.
    - Store secrets in the hosting dashboard (Render / Vercel) rather than repository `.env`.

**Troubleshooting tips**
- Clear Next.js cache if you see stale chunks:

```bash
cd frontend
rm -rf .next
npm run dev
```

- Run a local SMTP verify script (nodemailer) to confirm connectivity (useful before deploying):

```js
// tools/smtp-verify.js
const nodemailer = require('nodemailer');
(async () => {
  const t = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_PORT === '465',
    auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD },
    requireTLS: true,
    logger: true,
    debug: true
  });

  try {
    await t.verify();
    console.log('SMTP OK');
  } catch (err) {
    console.error('SMTP verify failed', err);
  }
})();
```

Run with:

```bash
cd backend
node tools/smtp-verify.js
```

**Code style & linting**
- Frontend uses ESLint with `eslint-config-next` and Tailwind. Run `npm run lint` in `frontend`.

**Useful links**
- Next.js App Router docs: https://nextjs.org/docs/app
- Vercel deployment docs: https://vercel.com/docs
- Render docs (if using Render): https://render.com/docs

**Contributing**
- Fork the repo and open PRs against `main`.
- Run linters and tests before opening PR.

**License**
- Add your preferred license file (LICENSE).

---

If you want, I can:
- Add a `backend/.env.example` and `frontend/.env.example` file with placeholder keys.
- Replace the placeholder `ShopContext` with a full provider connected to the store.

Created: [README.md](README.md)
