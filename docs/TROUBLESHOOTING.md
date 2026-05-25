# Troubleshooting Guide

Common issues and solutions for Ethiopian Shop Store deployment.

## Table of Contents

1. [Docker Issues](#docker-issues)
2. [Kubernetes Issues](#kubernetes-issues)
3. [Database Issues](#database-issues)
4. [Application Issues](#application-issues)
5. [Network Issues](#network-issues)
6. [Performance Issues](#performance-issues)

## Docker Issues

### Issue: Docker Build Fails

**Symptoms**: Build process fails with error messages

**Solutions**:

```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t ethiopian-shop-backend:latest ./backend

# Check Docker daemon
docker ps

# Increase Docker memory
# Docker Desktop: Preferences > Resources > Memory: 4GB+
```

### Issue: Container Exits Immediately

**Symptoms**: Container starts then stops

**Solutions**:

```bash
# Check logs
docker logs <container-id>

# Run with interactive terminal
docker run -it ethiopian-shop-backend:latest sh

# Check environment variables
docker inspect <container-id> | grep -A 20 Env

# Verify entrypoint
docker inspect <container-id> | grep -A 5 Entrypoint
```

### Issue: Port Already in Use

**Symptoms**: "Address already in use" error

**Solutions**:

```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>

# Use different port
docker run -p 8001:8000 ethiopian-shop-backend:latest

# Check Docker port mappings
docker ps --format "table {{.Names}}\t{{.Ports}}"
```

### Issue: Out of Disk Space

**Symptoms**: "No space left on device" error

**Solutions**:

```bash
# Check disk usage
docker system df

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Clean everything
docker system prune -a --volumes
```

## Kubernetes Issues

### Issue: Pod Stuck in Pending

**Symptoms**: Pod status shows "Pending"

**Solutions**:

```bash
# Check pod events
kubectl describe pod <pod-name> -n ethiopian-shop

# Check node resources
kubectl top nodes

# Check resource requests
kubectl get pod <pod-name> -n ethiopian-shop -o yaml | grep -A 10 resources

# Check PVC status
kubectl get pvc -n ethiopian-shop

# Increase node resources or reduce pod requests
```

### Issue: Pod Crash Loop

**Symptoms**: Pod restarts repeatedly

**Solutions**:

```bash
# Check logs
kubectl logs <pod-name> -n ethiopian-shop --previous

# Check events
kubectl describe pod <pod-name> -n ethiopian-shop

# Check resource limits
kubectl top pod <pod-name> -n ethiopian-shop

# Check environment variables
kubectl exec <pod-name> -n ethiopian-shop -- env

# Check health probes
kubectl get pod <pod-name> -n ethiopian-shop -o yaml | grep -A 10 livenessProbe
```

### Issue: Service Not Accessible

**Symptoms**: Cannot connect to service

**Solutions**:

```bash
# Check service exists
kubectl get svc -n ethiopian-shop

# Check endpoints
kubectl get endpoints -n ethiopian-shop

# Check service selector
kubectl get svc <service-name> -n ethiopian-shop -o yaml | grep selector

# Check pod labels
kubectl get pods -n ethiopian-shop --show-labels

# Port forward for testing
kubectl port-forward svc/<service-name> 8000:8000 -n ethiopian-shop

# Test connectivity
curl localhost:8000
```

### Issue: Ingress Not Working

**Symptoms**: Cannot access application via domain

**Solutions**:

```bash
# Check ingress
kubectl get ingress -n ethiopian-shop

# Check ingress details
kubectl describe ingress app-ingress -n ethiopian-shop

# Check ingress controller
kubectl get pods -n ingress-nginx

# Check DNS
nslookup yourdomain.com

# Check SSL certificate
kubectl get certificate -n ethiopian-shop

# Test ingress
curl -H "Host: yourdomain.com" http://<ingress-ip>
```

### Issue: Persistent Volume Not Mounting

**Symptoms**: Pod fails to mount volume

**Solutions**:

```bash
# Check PVC status
kubectl get pvc -n ethiopian-shop

# Check PV status
kubectl get pv

# Check PVC events
kubectl describe pvc <pvc-name> -n ethiopian-shop

# Check storage class
kubectl get storageclass

# Check pod volume mounts
kubectl get pod <pod-name> -n ethiopian-shop -o yaml | grep -A 10 volumeMounts

# Recreate PVC if needed
kubectl delete pvc <pvc-name> -n ethiopian-shop
kubectl apply -f k8s/postgres-deployment.yaml
```

## Database Issues

### Issue: Database Connection Failed

**Symptoms**: "Connection refused" or "Connection timeout"

**Solutions**:

```bash
# Check database pod
kubectl get pods -n ethiopian-shop -l app=postgres

# Check database logs
kubectl logs -n ethiopian-shop postgres-0

# Test connection
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c "SELECT 1"

# Check connection string
echo $DATABASE_URL

# Check network connectivity
kubectl exec -n ethiopian-shop backend-0 -- \
  curl -v telnet://postgres:5432

# Restart database
kubectl delete pod postgres-0 -n ethiopian-shop
```

### Issue: Database Migrations Failed

**Symptoms**: Migration errors during deployment

**Solutions**:

```bash
# Check migration status
cd backend
npx prisma migrate status

# Check migration files
ls prisma/migrations/

# Rollback migration
npx prisma migrate resolve --rolled-back <migration-name>

# Reset database (development only)
npx prisma migrate reset

# Manually run migration
npx prisma migrate deploy

# Check database schema
npx prisma db push
```

### Issue: Database Disk Full

**Symptoms**: "No space left on device" error

**Solutions**:

```bash
# Check disk usage
kubectl exec -n ethiopian-shop postgres-0 -- \
  df -h /var/lib/postgresql/data

# Check table sizes
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c \
  "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"

# Vacuum database
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c "VACUUM ANALYZE;"

# Increase PVC size
kubectl patch pvc postgres-pvc -n ethiopian-shop -p '{"spec":{"resources":{"requests":{"storage":"50Gi"}}}}'
```

### Issue: Slow Queries

**Symptoms**: Application is slow, high database CPU

**Solutions**:

```bash
# Check slow queries
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c \
  "SELECT query, calls, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"

# Check missing indexes
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c \
  "SELECT schemaname, tablename, indexname FROM pg_indexes WHERE schemaname NOT IN ('pg_catalog', 'information_schema');"

# Analyze query plan
kubectl exec -n ethiopian-shop postgres-0 -- \
  psql -U shopuser -d ethiopian_shop -c \
  "EXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;"

# Create missing indexes
# Add to Prisma schema and run migration
```

## Application Issues

### Issue: Application Crashes on Startup

**Symptoms**: Application exits immediately after starting

**Solutions**:

```bash
# Check logs
kubectl logs -n ethiopian-shop <pod-name>

# Check environment variables
kubectl exec -n ethiopian-shop <pod-name> -- env | grep -E "DATABASE|TOKEN|SECRET"

# Check configuration
kubectl get configmap app-config -n ethiopian-shop -o yaml

# Check secrets
kubectl get secret app-secrets -n ethiopian-shop -o yaml

# Verify all required variables are set
bash scripts/validate-environment.sh
```

### Issue: High Memory Usage

**Symptoms**: Pod memory usage exceeds limits

**Solutions**:

```bash
# Check memory usage
kubectl top pod -n ethiopian-shop

# Check memory limits
kubectl get pod <pod-name> -n ethiopian-shop -o yaml | grep -A 5 resources

# Check for memory leaks
kubectl logs -n ethiopian-shop <pod-name> | grep -i "memory\|heap"

# Increase memory limit
kubectl set resources deployment backend -n ethiopian-shop --limits=memory=1Gi

# Restart pod
kubectl delete pod <pod-name> -n ethiopian-shop
```

### Issue: High CPU Usage

**Symptoms**: Pod CPU usage exceeds limits

**Solutions**:

```bash
# Check CPU usage
kubectl top pod -n ethiopian-shop

# Check CPU limits
kubectl get pod <pod-name> -n ethiopian-shop -o yaml | grep -A 5 resources

# Check for infinite loops
kubectl logs -n ethiopian-shop <pod-name> | tail -100

# Profile application
# Add profiling middleware to application

# Increase CPU limit
kubectl set resources deployment backend -n ethiopian-shop --limits=cpu=1000m

# Optimize code
# Review slow endpoints
# Add caching
# Optimize database queries
```

### Issue: Health Check Failing

**Symptoms**: Readiness/liveness probe failing

**Solutions**:

```bash
# Check health endpoint
kubectl exec -n ethiopian-shop <pod-name> -- curl -v http://localhost:8000/health

# Check probe configuration
kubectl get pod <pod-name> -n ethiopian-shop -o yaml | grep -A 10 livenessProbe

# Check application logs
kubectl logs -n ethiopian-shop <pod-name>

# Increase probe timeout
# Edit deployment manifest and increase timeoutSeconds

# Implement health endpoint
# Add /health endpoint to application
```

## Network Issues

### Issue: DNS Resolution Failed

**Symptoms**: "Cannot resolve hostname" error

**Solutions**:

```bash
# Check DNS
kubectl exec -n ethiopian-shop <pod-name> -- nslookup postgres

# Check CoreDNS
kubectl get pods -n kube-system -l k8s-app=kube-dns

# Check DNS logs
kubectl logs -n kube-system -l k8s-app=kube-dns

# Test DNS from pod
kubectl exec -n ethiopian-shop <pod-name> -- \
  nslookup kubernetes.default.svc.cluster.local

# Restart CoreDNS
kubectl rollout restart deployment coredns -n kube-system
```

### Issue: Network Policy Blocking Traffic

**Symptoms**: Connection refused between pods

**Solutions**:

```bash
# Check network policies
kubectl get networkpolicies -n ethiopian-shop

# Check policy rules
kubectl describe networkpolicy <policy-name> -n ethiopian-shop

# Test connectivity
kubectl exec -n ethiopian-shop <pod-name> -- \
  curl -v http://backend:8000

# Temporarily disable policy for testing
kubectl delete networkpolicy <policy-name> -n ethiopian-shop

# Review and fix policy
# Edit k8s/network-policies.yaml
```

### Issue: CORS Errors

**Symptoms**: Browser CORS errors

**Solutions**:

```bash
# Check CORS configuration
kubectl get configmap nginx-config -n ethiopian-shop -o yaml

# Check backend CORS headers
curl -H "Origin: http://localhost:3000" -v http://localhost:8000/api/users

# Update CORS configuration
# Edit k8s/configmap.yaml
# Update CORS_ORIGIN environment variable

# Restart services
kubectl rollout restart deployment backend -n ethiopian-shop
```

## Performance Issues

### Issue: Slow API Response

**Symptoms**: API endpoints respond slowly

**Solutions**:

```bash
# Check response times
kubectl logs -n ethiopian-shop backend | grep "duration"

# Check database queries
# Enable query logging in Prisma

# Check Redis cache
kubectl exec -n ethiopian-shop redis-0 -- redis-cli INFO stats

# Profile application
# Add APM (Application Performance Monitoring)

# Optimize queries
# Add indexes
# Use pagination
# Implement caching

# Scale horizontally
kubectl scale deployment backend -n ethiopian-shop --replicas=5
```

### Issue: High Latency

**Symptoms**: Network latency is high

**Solutions**:

```bash
# Check network latency
kubectl exec -n ethiopian-shop <pod-name> -- ping postgres

# Check pod placement
kubectl get pods -n ethiopian-shop -o wide

# Check node resources
kubectl top nodes

# Enable pod affinity
# Edit deployment manifests
# Add affinity rules to keep pods on same node

# Use local storage
# Configure local storage class
```

## Getting Help

### Debug Information to Collect

```bash
# Cluster info
kubectl cluster-info dump > cluster-info.txt

# Pod logs
kubectl logs -n ethiopian-shop <pod-name> > pod-logs.txt

# Pod description
kubectl describe pod -n ethiopian-shop <pod-name> > pod-description.txt

# Events
kubectl get events -n ethiopian-shop > events.txt

# Resource usage
kubectl top pods -n ethiopian-shop > resource-usage.txt

# Configuration
kubectl get all -n ethiopian-shop -o yaml > configuration.yaml
```

### Support Channels

- GitHub Issues: [repository-url]/issues
- Email: support@ethiopianshop.com
- Slack: #ethiopian-shop-support
- Documentation: [docs-url]
