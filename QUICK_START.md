# Quick Start Guide

Get your Ethiopian Shop Store running in 5 minutes.

## Prerequisites

- Node.js 20.11.0+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

## Option 1: Docker Compose (Recommended)

### 1. Start Services

```bash
cd Ethiopian\ Shope\ Store
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Wait for Services

```bash
# Check status
docker-compose -f docker-compose.dev.yml ps

# Wait for database to be ready (about 30 seconds)
docker-compose -f docker-compose.dev.yml logs postgres
```

### 3. Run Migrations

```bash
cd backend
npx prisma migrate deploy
```

### 4. Access Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MailHog (Email)**: http://localhost:8025
- **pgAdmin (Database)**: http://localhost:5050
- **Redis Commander**: http://localhost:8081

### 5. Test Backend

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-05-25T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development",
  "version": "1.0.0"
}
```

## Option 2: Local Development (Manual)

### 1. Setup Database

```bash
# Create PostgreSQL database
createdb ethiopian_shop_dev

# Or use Docker
docker run -d \
  --name postgres-dev \
  -e POSTGRES_USER=shopuser \
  -e POSTGRES_PASSWORD=shoppassword \
  -e POSTGRES_DB=ethiopian_shop_dev \
  -p 5432:5432 \
  postgres:16.1-alpine
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Start server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

### 4. Access Services

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Troubleshooting

### Database Connection Failed

```bash
# Check if database is running
docker ps | grep postgres

# Check connection string in backend/.env
cat backend/.env | grep DATABASE_URL

# Test connection
psql postgresql://shopuser:shoppassword@localhost:5432/ethiopian_shop_dev
```

### Migrations Failed

```bash
# Check migration status
cd backend
npx prisma migrate status

# Reset database (development only)
npx prisma migrate reset

# Reapply migrations
npx prisma migrate deploy
```

### Port Already in Use

```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>

# Or use different port
PORT=8001 npm run dev
```

### Environment Variables Missing

```bash
# Copy example file
cp backend/.env.example backend/.env

# Edit with your values
nano backend/.env
```

## Next Steps

1. **Read Documentation**: See `docs/DEPLOYMENT.md`
2. **Review Configuration**: Check `backend/.env`
3. **Explore API**: Visit http://localhost:8000/api/shops
4. **Check Logs**: `docker-compose logs -f backend`

## Common Commands

```bash
# View logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop services
docker-compose -f docker-compose.dev.yml down

# Remove volumes (careful - deletes data)
docker-compose -f docker-compose.dev.yml down -v

# Restart services
docker-compose -f docker-compose.dev.yml restart

# Access database
docker-compose -f docker-compose.dev.yml exec postgres psql -U shopuser -d ethiopian_shop_dev

# Access Redis
docker-compose -f docker-compose.dev.yml exec redis redis-cli
```

## Health Check

```bash
# Backend health
curl http://localhost:8000/health

# Backend readiness
curl http://localhost:8000/ready

# Frontend
curl http://localhost:3000
```

## Support

- **Issues**: Check `docs/TROUBLESHOOTING.md`
- **Deployment**: See `docs/DEPLOYMENT.md`
- **Production**: See `docs/PRODUCTION.md`

---

**Status**: ✅ Ready to develop!
