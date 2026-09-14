# Backend Deployment Guide

The backend (Express.js with Socket.io, PostgreSQL, Redis, and file uploads) cannot be deployed to Vercel due to its requirements. Use one of the following platforms:

## Recommended Platforms

### 1. Railway (Easiest)
- Supports PostgreSQL, Redis, and Node.js
- Automatic SSL
- Simple deployment from GitHub

**Steps:**
```bash
1. Create Railway account
2. Connect GitHub repository
3. Add PostgreSQL service
4. Add Redis service
5. Add backend service (from backend folder)
6. Set environment variables from backend/.env.example
7. Deploy
```

### 2. Render
- Supports PostgreSQL, Redis, and Node.js
- Free tier available
- Good for production

**Steps:**
```bash
1. Create Render account
2. Connect GitHub repository
3. Create PostgreSQL database
4. Create Redis instance
5. Create web service (backend folder)
6. Set environment variables
7. Deploy
```

### 3. AWS/GCP/Azure
- Full control
- Scalable
- Requires more setup

### 4. VPS (DigitalOcean, Linode, Hetzner)
- Full control
- Cost-effective
- Manual setup required

## Environment Variables Required

Copy all variables from `backend/.env.example` and set them in your deployment platform:

- DATABASE_URL (PostgreSQL connection string)
- REDIS_URL (Redis connection string)
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- CHAPA_SECRET_KEY
- CHAPA_PUBLIC_KEY
- EMAIL_SERVER_* (for email)
- CORS_ORIGIN (your frontend domain)
- And all other variables from .env.example

## File Uploads

The backend uses local file storage (`./uploads`). For production, consider:
- AWS S3
- Cloudflare R2
- DigitalOcean Spaces

Update `STORAGE_TYPE` and related variables in environment config.

## Socket.io

Socket.io requires sticky sessions. Configure your load balancer accordingly:
- Railway: Automatic
- Render: Automatic
- AWS: Configure ALB with sticky sessions
- Nginx: Configure ip_hash

## Health Checks

Backend provides:
- `/health` - Basic health check
- `/ready` - Database connectivity check

Configure your platform to use these for health checks.

## Frontend Configuration

After deploying backend, update frontend environment variables:
- `NEXT_PUBLIC_API_URL=https://your-backend-domain.com`
- `NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com`
