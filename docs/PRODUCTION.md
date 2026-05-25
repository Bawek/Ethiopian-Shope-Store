# Production Deployment Guide

Enterprise-grade production deployment checklist and best practices.

## Pre-Deployment Checklist

### Security

- [ ] All secrets are stored in secure vault (not in code)
- [ ] SSL/TLS certificates are valid and not self-signed
- [ ] CORS is properly configured for your domain
- [ ] Rate limiting is enabled
- [ ] Input validation is in place
- [ ] CSRF protection is enabled
- [ ] Security headers are configured
- [ ] Database credentials are strong (min 32 chars)
- [ ] JWT secrets are strong (min 32 chars)
- [ ] No hardcoded secrets in environment files
- [ ] Dependency vulnerabilities checked (`npm audit`)

### Infrastructure

- [ ] Kubernetes cluster is configured and accessible
- [ ] Storage classes are available
- [ ] Load balancer is configured
- [ ] DNS records are pointing to load balancer
- [ ] SSL certificate is installed
- [ ] Backup strategy is in place
- [ ] Monitoring is configured
- [ ] Logging is centralized
- [ ] Resource limits are set
- [ ] Auto-scaling is configured

### Database

- [ ] Database backups are automated
- [ ] Database replication is configured (if needed)
- [ ] Connection pooling is enabled
- [ ] Indexes are optimized
- [ ] Migrations are tested
- [ ] Rollback plan is documented
- [ ] Database user has minimal required permissions

### Application

- [ ] All tests pass
- [ ] Code review completed
- [ ] Linting passes
- [ ] No console errors or warnings
- [ ] Performance is acceptable
- [ ] Error handling is comprehensive
- [ ] Logging is structured
- [ ] Health endpoints are working
- [ ] Graceful shutdown is implemented

### Deployment

- [ ] Deployment script is tested
- [ ] Rollback procedure is tested
- [ ] Health checks are configured
- [ ] Readiness probes are working
- [ ] Liveness probes are working
- [ ] Resource requests/limits are set
- [ ] Pod disruption budgets are configured
- [ ] Network policies are configured

## Deployment Steps

### 1. Pre-Deployment Validation

```bash
# Run validation script
bash scripts/validate-deployment.sh

# Check all prerequisites
bash scripts/check-prerequisites.sh

# Verify environment
bash scripts/verify-environment.sh
```

### 2. Database Preparation

```bash
# Backup current database
bash scripts/backup-database.sh

# Run migrations
cd backend
npx prisma migrate deploy

# Verify migrations
npx prisma migrate status
```

### 3. Build and Push Images

```bash
# Build images
docker build -t ethiopian-shop-backend:1.0.0 ./backend
docker build -t ethiopian-shop-frontend:1.0.0 ./frontend

# Push to registry
docker push your-registry/ethiopian-shop-backend:1.0.0
docker push your-registry/ethiopian-shop-frontend:1.0.0
```

### 4. Deploy to Kubernetes

```bash
# Deploy
bash scripts/deploy.sh

# Monitor deployment
kubectl rollout status deployment/backend -n ethiopian-shop
kubectl rollout status deployment/frontend -n ethiopian-shop

# Verify
bash scripts/health-check.sh
```

### 5. Post-Deployment Verification

```bash
# Run smoke tests
bash scripts/smoke-tests.sh

# Check logs
kubectl logs -n ethiopian-shop -l app=backend --tail=100
kubectl logs -n ethiopian-shop -l app=frontend --tail=100

# Verify endpoints
curl https://api.yourdomain.com/health
curl https://yourdomain.com
```

## Monitoring & Alerting

### Key Metrics to Monitor

- **CPU Usage**: Alert if > 80%
- **Memory Usage**: Alert if > 85%
- **Disk Usage**: Alert if > 90%
- **Request Latency**: Alert if p95 > 1000ms
- **Error Rate**: Alert if > 1%
- **Database Connections**: Alert if > 80% of pool
- **Pod Restarts**: Alert if > 0 in 1 hour

### Logging

```bash
# View structured logs
kubectl logs -n ethiopian-shop -l app=backend -f --timestamps=true

# Search logs
kubectl logs -n ethiopian-shop -l app=backend | grep ERROR

# Export logs
kubectl logs -n ethiopian-shop -l app=backend > backend-logs.txt
```

### Health Checks

```bash
# Backend health
curl https://api.yourdomain.com/health

# Database health
kubectl exec -n ethiopian-shop postgres-0 -- pg_isready

# Redis health
kubectl exec -n ethiopian-shop redis-0 -- redis-cli ping
```

## Scaling

### Horizontal Scaling

```bash
# Scale backend
kubectl scale deployment backend -n ethiopian-shop --replicas=5

# Scale frontend
kubectl scale deployment frontend -n ethiopian-shop --replicas=3

# Check HPA status
kubectl get hpa -n ethiopian-shop
```

### Vertical Scaling

Edit resource requests/limits in deployment manifests:

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

## Backup & Recovery

### Automated Backups

```bash
# Database backup
bash scripts/backup-database.sh

# Kubernetes backup
bash scripts/backup-kubernetes.sh

# Verify backups
ls -lh backups/
```

### Restore from Backup

```bash
# Restore database
bash scripts/restore-database.sh backup-file.sql

# Restore Kubernetes
bash scripts/restore-kubernetes.sh backup-file.tar.gz
```

## Rollback Procedure

### Automatic Rollback

```bash
# If deployment fails, automatic rollback occurs
kubectl rollout undo deployment/backend -n ethiopian-shop
kubectl rollout undo deployment/frontend -n ethiopian-shop
```

### Manual Rollback

```bash
# Check rollout history
kubectl rollout history deployment/backend -n ethiopian-shop

# Rollback to previous version
kubectl rollout undo deployment/backend -n ethiopian-shop --to-revision=1

# Verify rollback
kubectl rollout status deployment/backend -n ethiopian-shop
```

## Disaster Recovery

### RTO/RPO Targets

- **RTO (Recovery Time Objective)**: 1 hour
- **RPO (Recovery Point Objective)**: 15 minutes

### Disaster Recovery Plan

1. **Database Failure**
   - Restore from latest backup
   - Verify data integrity
   - Run migrations if needed
   - Restart application

2. **Application Failure**
   - Check logs for errors
   - Rollback to previous version
   - Verify health checks
   - Monitor for issues

3. **Infrastructure Failure**
   - Failover to backup cluster
   - Restore from backups
   - Update DNS records
   - Verify all services

## Performance Optimization

### Caching

```bash
# Redis is configured for caching
# Configure cache TTL in application
CACHE_TTL=3600  # 1 hour
```

### Database Optimization

```bash
# Check slow queries
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c \
  "SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

### CDN Configuration

- Configure CloudFront/Cloudflare for static assets
- Set cache headers appropriately
- Enable compression

## Security Hardening

### Network Security

```bash
# Apply network policies
kubectl apply -f k8s/network-policies.yaml

# Verify policies
kubectl get networkpolicies -n ethiopian-shop
```

### Pod Security

```bash
# Apply pod security policies
kubectl apply -f k8s/pod-security-policies.yaml

# Verify
kubectl get psp
```

### RBAC

```bash
# Apply RBAC policies
kubectl apply -f k8s/rbac.yaml

# Verify
kubectl get roles -n ethiopian-shop
kubectl get rolebindings -n ethiopian-shop
```

## Maintenance Windows

### Scheduled Maintenance

```bash
# Drain node for maintenance
kubectl drain node-name --ignore-daemonsets

# Perform maintenance
# ...

# Uncordon node
kubectl uncordon node-name
```

### Zero-Downtime Deployment

```bash
# Rolling update is configured in deployment
# Verify rolling update strategy
kubectl get deployment backend -n ethiopian-shop -o yaml | grep -A 5 strategy

# Monitor rolling update
kubectl rollout status deployment/backend -n ethiopian-shop
```

## Compliance & Auditing

### Audit Logging

```bash
# Enable audit logging
kubectl logs -n kube-system -l component=kube-apiserver | grep audit

# Review audit logs
tail -f /var/log/kubernetes/audit.log
```

### Compliance Checks

- [ ] GDPR compliance verified
- [ ] Data encryption enabled
- [ ] Access logs maintained
- [ ] Security patches applied
- [ ] Vulnerability scans completed

## Support & Escalation

### Support Contacts

- **On-Call Engineer**: [contact info]
- **Database Team**: [contact info]
- **Infrastructure Team**: [contact info]
- **Security Team**: [contact info]

### Escalation Procedure

1. **Severity 1 (Critical)**: Immediate escalation to on-call engineer
2. **Severity 2 (High)**: Escalate within 30 minutes
3. **Severity 3 (Medium)**: Escalate within 2 hours
4. **Severity 4 (Low)**: Escalate within 24 hours

## Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
