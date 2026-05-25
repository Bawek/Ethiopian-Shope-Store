# Deployment Checklist

Complete checklist for deploying Ethiopian Shop Store to production.

## Pre-Deployment (1-2 Days Before)

### Security Review
- [ ] All secrets are in environment variables (not in code)
- [ ] SSL/TLS certificates are valid
- [ ] CORS is configured for your domain
- [ ] Rate limiting is enabled
- [ ] Database credentials are strong (min 32 chars)
- [ ] JWT secrets are strong (min 32 chars)
- [ ] No hardcoded secrets in any files
- [ ] Dependency vulnerabilities checked (`npm audit`)

### Infrastructure Preparation
- [ ] Kubernetes cluster is accessible
- [ ] Storage classes are available
- [ ] Load balancer is configured
- [ ] DNS records are ready
- [ ] SSL certificate is obtained
- [ ] Backup strategy is documented
- [ ] Monitoring is configured
- [ ] Logging is centralized

### Application Testing
- [ ] All tests pass locally
- [ ] Code review completed
- [ ] Linting passes
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Error handling is comprehensive
- [ ] Health endpoints are working

### Documentation Review
- [ ] Deployment guide reviewed
- [ ] Troubleshooting guide reviewed
- [ ] Rollback procedure documented
- [ ] Team is trained

## Day Before Deployment

### Final Validation
- [ ] Run validation script: `bash scripts/validate-deployment.sh`
- [ ] All environment variables are set
- [ ] Database backups are current
- [ ] Kubernetes cluster is healthy
- [ ] All services are accessible

### Backup & Recovery
- [ ] Database backup completed
- [ ] Kubernetes backup completed
- [ ] Rollback procedure tested
- [ ] Recovery time verified

### Communication
- [ ] Team notified of deployment
- [ ] Maintenance window scheduled
- [ ] Stakeholders informed
- [ ] Support team briefed

## Deployment Day

### Pre-Deployment (1 Hour Before)

```bash
# 1. Validate everything
bash scripts/validate-deployment.sh

# 2. Check cluster health
kubectl cluster-info
kubectl get nodes

# 3. Verify database
kubectl exec -n ethiopian-shop postgres-0 -- pg_isready

# 4. Check current status
kubectl get all -n ethiopian-shop
```

### Deployment (Start)

```bash
# 1. Create namespace
kubectl apply -f k8s/namespace.yaml

# 2. Create configuration
kubectl apply -f k8s/configmap.yaml

# 3. Create secrets (IMPORTANT: Update with production values first!)
kubectl apply -f k8s/secret.yaml

# 4. Deploy database
kubectl apply -f k8s/postgres-deployment.yaml
kubectl rollout status statefulset/postgres -n ethiopian-shop

# 5. Deploy cache
kubectl apply -f k8s/redis-deployment.yaml
kubectl rollout status deployment/redis -n ethiopian-shop

# 6. Deploy backend
kubectl apply -f k8s/backend-deployment.yaml
kubectl rollout status deployment/backend -n ethiopian-shop

# 7. Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml
kubectl rollout status deployment/frontend -n ethiopian-shop

# 8. Deploy ingress
kubectl apply -f k8s/ingress.yaml
```

### Post-Deployment Verification (Immediately After)

```bash
# 1. Run health checks
bash scripts/health-check.sh

# 2. Check pod status
kubectl get pods -n ethiopian-shop

# 3. Check services
kubectl get svc -n ethiopian-shop

# 4. Check ingress
kubectl get ingress -n ethiopian-shop

# 5. View logs
kubectl logs -n ethiopian-shop -l app=backend --tail=50
kubectl logs -n ethiopian-shop -l app=frontend --tail=50

# 6. Test endpoints
curl https://api.yourdomain.com/health
curl https://yourdomain.com
```

### Smoke Tests (15 Minutes After)

```bash
# 1. Test API endpoints
curl -X GET https://api.yourdomain.com/api/shops
curl -X GET https://api.yourdomain.com/api/products

# 2. Test frontend
curl -I https://yourdomain.com

# 3. Test database connectivity
kubectl exec -n ethiopian-shop backend-0 -- \
  curl -f http://localhost:8000/ready

# 4. Check error logs
kubectl logs -n ethiopian-shop -l app=backend | grep ERROR
kubectl logs -n ethiopian-shop -l app=frontend | grep ERROR
```

### Monitoring (First Hour)

- [ ] Monitor CPU usage: `kubectl top pods -n ethiopian-shop`
- [ ] Monitor memory usage: `kubectl top pods -n ethiopian-shop`
- [ ] Monitor error rate: Check logs for errors
- [ ] Monitor response time: Check application metrics
- [ ] Monitor database connections: Check connection pool
- [ ] Monitor disk usage: Check storage

### Extended Monitoring (First 24 Hours)

- [ ] Monitor for crashes: `kubectl get events -n ethiopian-shop`
- [ ] Monitor for restarts: `kubectl get pods -n ethiopian-shop`
- [ ] Monitor for errors: Check centralized logs
- [ ] Monitor for performance: Check metrics
- [ ] Monitor for security: Check access logs

## Rollback Procedure (If Needed)

### Immediate Rollback

```bash
# 1. Rollback backend
kubectl rollout undo deployment/backend -n ethiopian-shop

# 2. Rollback frontend
kubectl rollout undo deployment/frontend -n ethiopian-shop

# 3. Verify rollback
kubectl rollout status deployment/backend -n ethiopian-shop
kubectl rollout status deployment/frontend -n ethiopian-shop

# 4. Run health checks
bash scripts/health-check.sh
```

### Database Rollback (If Needed)

```bash
# 1. Restore from backup
bash scripts/restore-database.sh backup-file.sql

# 2. Verify restoration
kubectl exec -n ethiopian-shop postgres-0 -- pg_isready

# 3. Restart backend
kubectl rollout restart deployment/backend -n ethiopian-shop
```

## Post-Deployment (Next 24 Hours)

### Monitoring
- [ ] Monitor logs for errors
- [ ] Monitor metrics for anomalies
- [ ] Monitor user reports
- [ ] Monitor performance

### Verification
- [ ] All services are running
- [ ] All endpoints are responding
- [ ] Database is healthy
- [ ] Cache is working
- [ ] Backups are running

### Documentation
- [ ] Update deployment log
- [ ] Document any issues
- [ ] Update runbooks
- [ ] Notify team of completion

## Post-Deployment (Next Week)

### Analysis
- [ ] Review deployment logs
- [ ] Analyze performance metrics
- [ ] Review error logs
- [ ] Gather team feedback

### Optimization
- [ ] Optimize resource usage
- [ ] Tune autoscaling parameters
- [ ] Optimize database queries
- [ ] Optimize caching

### Planning
- [ ] Plan next deployment
- [ ] Update documentation
- [ ] Schedule training
- [ ] Plan improvements

## Emergency Contacts

- **On-Call Engineer**: [Name] [Phone] [Email]
- **Database Team**: [Name] [Phone] [Email]
- **Infrastructure Team**: [Name] [Phone] [Email]
- **Security Team**: [Name] [Phone] [Email]

## Escalation Procedure

### Severity 1 (Critical - Service Down)
- [ ] Immediate escalation to on-call engineer
- [ ] Initiate rollback
- [ ] Notify all stakeholders
- [ ] Begin incident response

### Severity 2 (High - Degraded Performance)
- [ ] Escalate within 30 minutes
- [ ] Investigate root cause
- [ ] Implement workaround if needed
- [ ] Plan fix

### Severity 3 (Medium - Minor Issues)
- [ ] Escalate within 2 hours
- [ ] Investigate at next opportunity
- [ ] Plan fix

### Severity 4 (Low - Non-Critical)
- [ ] Escalate within 24 hours
- [ ] Plan fix for next deployment

## Sign-Off

- [ ] Deployment Lead: _________________ Date: _______
- [ ] QA Lead: _________________ Date: _______
- [ ] Operations Lead: _________________ Date: _______
- [ ] Security Lead: _________________ Date: _______

## Notes

```
[Space for deployment notes]
```

---

**Deployment Date**: _______________
**Deployment Time**: _______________
**Deployed By**: _______________
**Approved By**: _______________

**Status**: ☐ Successful ☐ Rolled Back ☐ Partial

**Issues Encountered**: 
```
[Space for issues]
```

**Resolution**:
```
[Space for resolution]
```

**Lessons Learned**:
```
[Space for lessons]
```
