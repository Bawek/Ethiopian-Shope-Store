# Ethiopian Shop Store - Production-Ready Enterprise Platform

A complete, production-grade e-commerce platform with enterprise-level security, scalability, monitoring, and deployment automation.

## 🎯 Overview

This is a **fully production-ready** application that can be deployed immediately to:
- **Docker Compose** (single server)
- **Kubernetes** (cloud-native, scalable)
- **AWS EKS, GCP GKE, Azure AKS** (managed Kubernetes)

## ✅ Enterprise Features

### Security
- ✅ HTTPS/TLS encryption
- ✅ JWT authentication with refresh tokens
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation & sanitization
- ✅ Security headers (HSTS, X-Frame-Options, etc.)
- ✅ CSRF protection
- ✅ Secure cookie handling
- ✅ Secret management (environment-based)

### Scalability
- ✅ Horizontal pod autoscaling (HPA)
- ✅ Load balancing
- ✅ Connection pooling
- ✅ Redis caching
- ✅ Database replication ready
- ✅ Multi-replica deployments

### Reliability
- ✅ Health checks (liveness & readiness probes)
- ✅ Graceful shutdown
- ✅ Automatic restart on failure
- ✅ Rolling updates (zero downtime)
- ✅ Database migrations with rollback
- ✅ Backup & recovery procedures

### Monitoring & Logging
- ✅ Structured JSON logging
- ✅ Request tracing
- ✅ Error tracking
- ✅ Prometheus metrics ready
- ✅ Centralized logging support
- ✅ Health endpoints

### DevOps
- ✅ Docker multi-stage builds
- ✅ Kubernetes manifests
- ✅ CI/CD pipelines (GitHub Actions)
- ✅ Automated testing
- ✅ Security scanning
- ✅ Deployment automation

## 📁 Project Structure

```
ethiopian-shop-store/
├── backend/                    # Node.js/Express API
│   ├── config/                # Configuration files
│   │   ├── environment.js      # Environment validation
│   │   ├── logger.js           # Structured logging
│   │   ├── db.js               # Database config
│   │   ├── email.config.js     # Email config
│   │   └── multer.config.js    # File upload config
│   ├── controllers/            # Business logic
│   ├── routes/                 # API routes
│   ├── middlewares/            # Express middlewares
│   ├── prisma/                 # Database schema & migrations
│   ├── Dockerfile              # Production image
│   ├── Dockerfile.dev          # Development image
│   ├── package.json            # Dependencies
│   └── index.js                # Application entry point
│
├── frontend/                   # Next.js application
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── Dockerfile              # Production image
│   ├── Dockerfile.dev          # Development image
│   └── package.json            # Dependencies
│
├── k8s/                        # Kubernetes manifests
│   ├── namespace.yaml          # Namespace
│   ├── configmap.yaml          # Configuration
│   ├── secret.yaml             # Secrets
│   ├── postgres-deployment.yaml # Database
│   ├── redis-deployment.yaml   # Cache
│   ├── backend-deployment.yaml # API
│   ├── frontend-deployment.yaml # Frontend
│   └── ingress.yaml            # Ingress & HPA
│
├── scripts/                    # Deployment scripts
│   ├── deploy.sh               # Kubernetes deployment
│   ├── health-check.sh         # Health verification
│   └── backup-database.sh      # Database backup
│
├── .github/workflows/          # CI/CD pipelines
│   └── ci-cd.yml               # GitHub Actions
│
├── docs/                       # Documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── PRODUCTION.md           # Production checklist
│   ├── TROUBLESHOOTING.md      # Troubleshooting
│   └── ARCHITECTURE.md         # Architecture docs
│
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Development compose
├── .env.example                # Environment template
└── README.md                   # This file
```

## 🚀 Quick Start

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/yourusername/ethiopian-shop-store.git
cd ethiopian-shop-store

# 2. Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start services
docker-compose -f docker-compose.dev.yml up -d

# 4. Access services
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# MailHog: http://localhost:8025
# pgAdmin: http://localhost:5050
```

### Docker Deployment

```bash
# 1. Build images
docker build -t ethiopian-shop-backend:1.0.0 ./backend
docker build -t ethiopian-shop-frontend:1.0.0 ./frontend

# 2. Start services
docker-compose -f docker-compose.yml up -d

# 3. Verify
docker-compose ps
curl http://localhost:8000/health
```

### Kubernetes Deployment

```bash
# 1. Create namespace
kubectl apply -f k8s/namespace.yaml

# 2. Create secrets & config
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# 3. Deploy services
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

# 4. Verify
bash scripts/health-check.sh
```

## 📋 Environment Variables

### Required Backend Variables

```bash
# Server
NODE_ENV=production
PORT=8000

# Database
DATABASE_URL=postgresql://user:password@host:5432/db

# JWT (min 32 chars)
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-min-32-chars-long
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-min-32-chars-long

# Payment Gateway
CHAPA_SECRET_KEY=your-key
CHAPA_PUBLIC_KEY=your-key
CHAPA_ENCRYPTION_KEY=your-key

# Email
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Security
SIGNING_SECRET=your-webhook-signing-secret-min-32-chars-long
CORS_ORIGIN=https://yourdomain.com
```

See `backend/.env.example` for complete list.

## 🔒 Security

### Built-in Security Features

1. **Authentication**: JWT with refresh tokens
2. **Authorization**: Role-based access control
3. **Encryption**: HTTPS/TLS, encrypted passwords
4. **Validation**: Input validation & sanitization
5. **Rate Limiting**: Prevent brute force attacks
6. **CORS**: Cross-origin protection
7. **Headers**: Security headers (HSTS, CSP, etc.)
8. **Secrets**: Environment-based secret management

### Security Checklist

- [ ] All secrets in environment variables (not code)
- [ ] SSL/TLS certificates valid
- [ ] CORS configured for your domain
- [ ] Rate limiting enabled
- [ ] Database backups automated
- [ ] Logs monitored for suspicious activity
- [ ] Dependencies updated regularly
- [ ] Security patches applied

## 📊 Monitoring

### Health Endpoints

```bash
# Liveness probe (is app running?)
curl http://localhost:8000/health

# Readiness probe (is app ready to serve?)
curl http://localhost:8000/ready
```

### Logs

```bash
# Docker Compose
docker-compose logs -f backend

# Kubernetes
kubectl logs -n ethiopian-shop -l app=backend -f
```

### Metrics

- CPU usage
- Memory usage
- Request latency
- Error rate
- Database connections
- Cache hit rate

## 🔄 Deployment

### CI/CD Pipeline

Automated pipeline on every push:
1. Lint & type check
2. Security scanning
3. Unit tests
4. Build Docker images
5. Push to registry
6. Deploy to staging (develop branch)
7. Deploy to production (main branch)

### Manual Deployment

```bash
# Kubernetes
bash scripts/deploy.sh

# Docker Compose
docker-compose -f docker-compose.yml up -d
```

### Rollback

```bash
# Kubernetes
kubectl rollout undo deployment/backend -n ethiopian-shop

# Docker Compose
docker-compose down
docker-compose -f docker-compose.yml up -d
```

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale backend to 5 replicas
kubectl scale deployment backend -n ethiopian-shop --replicas=5

# Auto-scaling is configured (3-10 replicas based on CPU/memory)
```

### Vertical Scaling

Edit resource requests/limits in `k8s/backend-deployment.yaml`:

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

## 🛠️ Troubleshooting

### Common Issues

**Pod not starting?**
```bash
kubectl logs -n ethiopian-shop <pod-name>
kubectl describe pod -n ethiopian-shop <pod-name>
```

**Database connection failed?**
```bash
kubectl exec -n ethiopian-shop postgres-0 -- pg_isready
```

**High memory usage?**
```bash
kubectl top pods -n ethiopian-shop
```

See `docs/TROUBLESHOOTING.md` for detailed troubleshooting guide.

## 📚 Documentation

- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Complete deployment guide
- **[PRODUCTION.md](./docs/PRODUCTION.md)** - Production checklist & best practices
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Common issues & solutions
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## 📦 Dependencies

### Backend
- **Node.js**: 20.11.0 LTS
- **Express**: 4.21.2
- **Prisma**: 6.3.0
- **PostgreSQL**: 16.1
- **Redis**: 7.2

### Frontend
- **Node.js**: 20.11.0 LTS
- **Next.js**: Latest
- **React**: 18+

## 🔐 Secrets Management

### Development
Secrets stored in `.env` file (not committed)

### Production
Use external secret management:
- **Kubernetes Secrets** (with encryption at rest)
- **AWS Secrets Manager**
- **HashiCorp Vault**
- **Sealed Secrets**

## 📞 Support

- **Documentation**: See `docs/` folder
- **Issues**: GitHub Issues
- **Email**: support@ethiopianshop.com

## 📄 License

[Add your license here]

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## ✨ Features

### Current
- ✅ User authentication & authorization
- ✅ Merchant dashboard
- ✅ Product management
- ✅ Shopping cart
- ✅ Order management
- ✅ Payment integration (Chapa)
- ✅ Email notifications
- ✅ Real-time updates (Socket.io)
- ✅ Analytics & reporting

### Roadmap
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] AI recommendations
- [ ] Multi-currency support
- [ ] Marketplace features

## 🎉 Deployment Status

- ✅ **Development**: Ready
- ✅ **Staging**: Ready
- ✅ **Production**: Ready

This application is **production-ready** and can be deployed immediately without manual fixes.

---

**Last Updated**: May 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
