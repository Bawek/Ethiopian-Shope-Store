#!/bin/bash

# ============================================================================
# HEALTH CHECK SCRIPT
# Validates all services are running and healthy
# ============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

NAMESPACE="ethiopian-shop"
FAILED=0

log_info() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
    FAILED=$((FAILED + 1))
}

log_warn() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# ============================================================================
# HEALTH CHECKS
# ============================================================================

check_pods() {
    echo "Checking pod status..."
    
    local pods=$(kubectl get pods -n "$NAMESPACE" -o jsonpath='{.items[*].metadata.name}')
    
    for pod in $pods; do
        local status=$(kubectl get pod "$pod" -n "$NAMESPACE" -o jsonpath='{.status.phase}')
        
        if [ "$status" = "Running" ]; then
            log_info "Pod $pod is running"
        else
            log_error "Pod $pod is not running (status: $status)"
        fi
    done
}

check_services() {
    echo -e "\nChecking services..."
    
    local services=("backend" "frontend" "postgres" "redis")
    
    for svc in "${services[@]}"; do
        if kubectl get svc "$svc" -n "$NAMESPACE" &> /dev/null; then
            log_info "Service $svc exists"
        else
            log_error "Service $svc not found"
        fi
    done
}

check_database() {
    echo -e "\nChecking database..."
    
    local db_pod=$(kubectl get pod -n "$NAMESPACE" -l app=postgres -o jsonpath='{.items[0].metadata.name}')
    
    if [ -z "$db_pod" ]; then
        log_error "Database pod not found"
        return
    fi
    
    if kubectl exec -n "$NAMESPACE" "$db_pod" -- pg_isready -U shopuser &> /dev/null; then
        log_info "Database is ready"
    else
        log_error "Database is not ready"
    fi
}

check_redis() {
    echo -e "\nChecking Redis..."
    
    local redis_pod=$(kubectl get pod -n "$NAMESPACE" -l app=redis -o jsonpath='{.items[0].metadata.name}')
    
    if [ -z "$redis_pod" ]; then
        log_error "Redis pod not found"
        return
    fi
    
    if kubectl exec -n "$NAMESPACE" "$redis_pod" -- redis-cli ping &> /dev/null; then
        log_info "Redis is ready"
    else
        log_error "Redis is not ready"
    fi
}

check_backend_health() {
    echo -e "\nChecking backend health..."
    
    local backend_pod=$(kubectl get pod -n "$NAMESPACE" -l app=backend -o jsonpath='{.items[0].metadata.name}')
    
    if [ -z "$backend_pod" ]; then
        log_error "Backend pod not found"
        return
    fi
    
    if kubectl exec -n "$NAMESPACE" "$backend_pod" -- curl -f http://localhost:8000/health &> /dev/null; then
        log_info "Backend health endpoint is responding"
    else
        log_error "Backend health endpoint is not responding"
    fi
}

check_frontend_health() {
    echo -e "\nChecking frontend health..."
    
    local frontend_pod=$(kubectl get pod -n "$NAMESPACE" -l app=frontend -o jsonpath='{.items[0].metadata.name}')
    
    if [ -z "$frontend_pod" ]; then
        log_error "Frontend pod not found"
        return
    fi
    
    if kubectl exec -n "$NAMESPACE" "$frontend_pod" -- curl -f http://localhost:3000 &> /dev/null; then
        log_info "Frontend is responding"
    else
        log_error "Frontend is not responding"
    fi
}

check_ingress() {
    echo -e "\nChecking ingress..."
    
    if kubectl get ingress -n "$NAMESPACE" &> /dev/null; then
        log_info "Ingress is configured"
    else
        log_error "Ingress not found"
    fi
}

# ============================================================================
# MAIN
# ============================================================================

main() {
    echo "=========================================="
    echo "Health Check Report"
    echo "=========================================="
    
    check_pods
    check_services
    check_database
    check_redis
    check_backend_health
    check_frontend_health
    check_ingress
    
    echo -e "\n=========================================="
    
    if [ $FAILED -eq 0 ]; then
        log_info "All health checks passed!"
        exit 0
    else
        log_error "$FAILED health check(s) failed"
        exit 1
    fi
}

main "$@"
