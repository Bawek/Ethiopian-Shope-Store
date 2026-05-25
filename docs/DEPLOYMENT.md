# Deployment Guide

Complete guide for deploying Ethiopian Shop Store to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Docker Deployment](#docker-deployment)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Database Migrations](#database-migrations)
7. [Monitoring & Logging](#monitoring--logging)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

- **Node.js**: 20.11.0 LTS or higher
- **Docker**: 24.0 or higher
- **Docker Compose**: 2.20 or higher
- **kubectl**: 1.27 or higher (for Kubernetes)
- **PostgreSQL**: 16.1 or higher (for local development)
- **Redis**: 7.2 or higher (optional but recommended)

### System Requirements

- **CPU**: Minimum 2 cores (4+ recommended for production)
- **Memory**: Minimum 4GB (8GB+ recommended for production)
- **Disk**: Minimum 20GB free space
- **Network**: Stable internet connection

### Accounts & Services

- GitHub account (for CI/CD)
- Docker Hub or GitHub Container Registry account
- Kubernetes cluster (AWS EKS, GCP GKE, Azure AKS, or local minikube)
- Email service (Gmail, SendGrid, Mailgun, etc.)
- Payment gateway (Chapa)

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/ethiopian-shop-store.git
cd ethiopian-shop-store
```

### 2. Setup Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

Edit `.env` files with your local configuration:

```bash
# backend/.env
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://shopuser:shoppassword@localhost:5432/ethiopian_shop_dev
REDIS_URL=redis://localhost:6379
ACCESS_TOKEN_SECRET=dev-secret-key-min-32-chars-long-for-testing
REFRESH_TOKEN_SECRET=dev-refresh-secret-key-min-32-chars-long-for-testing
# ... other variables
```

### 3. Start Services with Docker Compose

```bash
# Development environment with hot-reload
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to be ready
docker-compose -f docker-compose.dev.yml logs -f

# Access services:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# MailHog (email testing): http://localhost:8025
# pgAdmin (database): http://localhost:5050
# Redis Commander: http://localhost:8081
```

### 4. Run Database Migrations

```bash
cd backend
npx prisma migrate dev
npx prisma db seed  # Optional: seed with sample data
```

### 5. Verify Setup

```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000

# View logs
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
```

### 6. Stop Services

```bash
docker-compose -f docker-compose.dev.yml down

# Remove volumes (careful - deletes data)
docker-compose -f docker-compose.dev.yml down -v
```

## Docker Deployment

### 1. Build Images

```bash
# Build backend
docker build -t ethiopian-shop-backend:1.0.0 ./backend

# Build frontend
docker build -t ethiopian-shop-frontend:1.0.0 ./frontend

# Tag for registry
docker tag ethiopian-shop-backend:1.0.0 your-registry/ethiopian-shop-backend:1.0.0
docker tag ethiopian-shop-frontend:1.0.0 your-registry/ethiopian-shop-frontend:1.0.0
```

### 2. Push to Registry

```bash
# Login to registry
docker login your-registry

# Push images
docker push your-registry/ethiopian-shop-backend:1.0.0
docker push your-registry/ethiopian-shop-frontend:1.0.0
```

### 3. Deploy with Docker Compose

```bash
# Create production environment file
cp .env.example .env.production
# Edit .env.production with production values

# Start services
docker-compose -f docker-compose.yml up -d

# Verify services
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Health Checks

```bash
# Check all services
docker-compose ps

# Check backend
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000

# View service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

## Kubernetes Deployment

### 1. Prerequisites

```bash
# Verify kubectl is configured
kubectl cluster-info

# Verify cluster access
kubectl get nodes

# Verify storage classes
kubectl get storageclass
```

### 2. Create Namespace

```bash
kubectl apply -f k8s/namespace.yaml

# Verify
kubectl get namespace ethiopian-shop
```

### 3. Create Secrets

```bash
# Edit k8s/secret.yaml with production values
# IMPORTANT: Use external secret management in production (Sealed Secrets, Vault)

kubectl apply -f k8s/secret.yaml

# Verify
kubectl get secrets -n ethiopian-shop
```

### 4. Create ConfigMaps

```bash
kubectl apply -f k8s/configmap.yaml

# Verify
kubectl get configmaps -n ethiopian-shop
```

### 5. Deploy Database

```bash
kubectl apply -f k8s/postgres-deployment.yaml

# Wait for database to be ready
kubectl rollout status statefulset/postgres -n ethiopian-shop

# Verify
kubectl get pods -n ethiopian-shop -l app=postgres
```

### 6. Deploy Redis

```bash
kubectl apply -f k8s/redis-deployment.yaml

# Wait for Redis to be ready
kubectl rollout status deployment/redis -n ethiopian-shop

# Verify
kubectl get pods -n ethiopian-shop -l app=redis
```

### 7. Deploy Backend

```bash
kubectl apply -f k8s/backend-deployment.yaml

# Wait for deployment
kubectl rollout status deployment/backend -n ethiopian-shop

# Verify
kubectl get pods -n ethiopian-shop -l app=backend
```

### 8. Deploy Frontend

```bash
kubectl apply -f k8s/frontend-deployment.yaml

# Wait for deployment
kubectl rollout status deployment/frontend -n ethiopian-shop

# Verify
kubectl get pods -n ethiopian-shop -l app=frontend
```

### 9. Deploy Ingress

```bash
kubectl apply -f k8s/ingress.yaml

# Verify
kubectl get ingress -n ethiopian-shop

# Get ingress IP
kubectl get ingress app-ingress -n ethiopian-shop -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

### 10. Verify Deployment

```bash
# Run health check script
bash scripts/health-check.sh

# Or manually check
kubectl get all -n ethiopian-shop
kubectl logs -n ethiopian-shop -l app=backend --tail=50
kubectl logs -n ethiopian-shop -l app=frontend --tail=50
```

## Environment Configuration

### Backend Environment Variables

```bash
# Server
NODE_ENV=production
PORT=8000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@host:5432/db
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# JWT
ACCESS_TOKEN_SECRET=min-32-chars-long-secret-key
REFRESH_TOKEN_SECRET=min-32-chars-long-secret-key

# Payment
CHAPA_SECRET_KEY=your-key
CHAPA_PUBLIC_KEY=your-key
CHAPA_ENCRYPTION_KEY=your-key

# Email
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Security
SIGNING_SECRET=min-32-chars-long-secret-key
CORS_ORIGIN=https://yourdomain.com

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

### Frontend Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Database Migrations

### Create Migration

```bash
cd backend
npx prisma migrate dev --name migration_name
```

### Apply Migrations

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### Rollback Migration

```bash
# Reset database (development only)
npx prisma migrate reset

# Rollback specific migration
npx prisma migrate resolve --rolled-back migration_name
```

## Monitoring & Logging

### View Logs

```bash
# Docker Compose
docker-compose logs -f backend
docker-compose logs -f frontend

# Kubernetes
kubectl logs -n ethiopian-shop -l app=backend -f
kubectl logs -n ethiopian-shop -l app=frontend -f
```

### Health Endpoints

```bash
# Backend health
curl http://localhost:8000/health

# Frontend
curl http://localhost:3000
```

### Metrics

```bash
# Prometheus metrics (if configured)
curl http://localhost:9090/metrics
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

```bash
# Check database is running
docker-compose ps postgres

# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

#### 2. Port Already in Use

```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>

# Or use different port
PORT=8001 docker-compose up
```

#### 3. Docker Image Build Failed

```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker build --no-cache -t ethiopian-shop-backend:latest ./backend
```

#### 4. Kubernetes Pod Crash Loop

```bash
# Check pod logs
kubectl logs -n ethiopian-shop <pod-name>

# Describe pod for events
kubectl describe pod -n ethiopian-shop <pod-name>

# Check resource limits
kubectl top pods -n ethiopian-shop
```

#### 5. Environment Variables Not Set

```bash
# Verify secrets
kubectl get secrets -n ethiopian-shop app-secrets -o yaml

# Verify configmaps
kubectl get configmaps -n ethiopian-shop app-config -o yaml

# Check pod environment
kubectl exec -n ethiopian-shop <pod-name> -- env | grep DATABASE_URL
```

### Debug Commands

```bash
# Docker Compose
docker-compose exec backend sh
docker-compose exec postgres psql -U shopuser -d ethiopian_shop

# Kubernetes
kubectl exec -it -n ethiopian-shop <pod-name> -- sh
kubectl port-forward -n ethiopian-shop svc/backend 8000:8000
kubectl port-forward -n ethiopian-shop svc/postgres 5432:5432
```

## Support

For issues and questions:
- Check logs: `docker-compose logs` or `kubectl logs`
- Review environment variables
- Verify database connectivity
- Check network connectivity
- Review application documentation
