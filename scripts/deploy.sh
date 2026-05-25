#!/bin/bash

# ============================================================================
# PRODUCTION DEPLOYMENT SCRIPT
# Validates environment, performs pre-deployment checks, and deploys
# ============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOYMENT_ENV="${DEPLOYMENT_ENV:-production}"
NAMESPACE="ethiopian-shop"
TIMEOUT=300

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ============================================================================
# PRE-DEPLOYMENT CHECKS
# ============================================================================

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check kubectl
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl not found. Please install kubectl."
        exit 1
    fi
    
    # Check docker
    if ! command -v docker &> /dev/null; then
        log_error "docker not found. Please install docker."
        exit 1
    fi
    
    # Check kubeconfig
    if [ ! -f "$HOME/.kube/config" ]; then
        log_error "kubeconfig not found at $HOME/.kube/config"
        exit 1
    fi
    
    log_info "✓ All prerequisites met"
}

check_cluster_connectivity() {
    log_info "Checking Kubernetes cluster connectivity..."
    
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Cannot connect to Kubernetes cluster"
        exit 1
    fi
    
    log_info "✓ Connected to cluster"
}

check_namespace() {
    log_info "Checking namespace..."
    
    if ! kubectl get namespace "$NAMESPACE" &> /dev/null; then
        log_info "Creating namespace $NAMESPACE..."
        kubectl create namespace "$NAMESPACE"
    fi
    
    log_info "✓ Namespace ready"
}

check_environment_variables() {
    log_info "Checking environment variables..."
    
    local required_vars=(
        "DATABASE_URL"
        "ACCESS_TOKEN_SECRET"
        "REFRESH_TOKEN_SECRET"
        "CHAPA_SECRET_KEY"
        "CHAPA_PUBLIC_KEY"
        "CHAPA_ENCRYPTION_KEY"
        "EMAIL_SERVER_HOST"
        "EMAIL_SERVER_PORT"
        "EMAIL_SERVER_USER"
        "EMAIL_SERVER_PASSWORD"
        "ADMIN_EMAIL"
        "SIGNING_SECRET"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var:-}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        log_error "Missing environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        exit 1
    fi
    
    log_info "✓ All required environment variables set"
}

check_database_connectivity() {
    log_info "Checking database connectivity..."
    
    # Extract database host from DATABASE_URL
    local db_host=$(echo "$DATABASE_URL" | sed -n 's/.*@\([^:]*\).*/\1/p')
    local db_port=$(echo "$DATABASE_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    
    if ! timeout 10 bash -c "echo >/dev/tcp/$db_host/$db_port" 2>/dev/null; then
        log_warn "Cannot connect to database at $db_host:$db_port"
        log_warn "Database may not be accessible from this network"
    else
        log_info "✓ Database connectivity verified"
    fi
}

# ============================================================================
# DEPLOYMENT FUNCTIONS
# ============================================================================

build_docker_images() {
    log_info "Building Docker images..."
    
    # Build backend
    log_info "Building backend image..."
    docker build -t ethiopian-shop-backend:latest ./backend
    
    # Build frontend
    log_info "Building frontend image..."
    docker build -t ethiopian-shop-frontend:latest ./frontend
    
    log_info "✓ Docker images built successfully"
}

apply_kubernetes_manifests() {
    log_info "Applying Kubernetes manifests..."
    
    # Apply in order
    kubectl apply -f k8s/namespace.yaml
    kubectl apply -f k8s/configmap.yaml
    kubectl apply -f k8s/secret.yaml
    kubectl apply -f k8s/postgres-deployment.yaml
    kubectl apply -f k8s/redis-deployment.yaml
    kubectl apply -f k8s/backend-deployment.yaml
    kubectl apply -f k8s/frontend-deployment.yaml
    kubectl apply -f k8s/ingress.yaml
    
    log_info "✓ Kubernetes manifests applied"
}

wait_for_deployment() {
    local deployment=$1
    local timeout=$2
    
    log_info "Waiting for deployment $deployment to be ready (timeout: ${timeout}s)..."
    
    if kubectl rollout status deployment/"$deployment" \
        -n "$NAMESPACE" \
        --timeout="${timeout}s"; then
        log_info "✓ Deployment $deployment is ready"
        return 0
    else
        log_error "Deployment $deployment failed to become ready"
        return 1
    fi
}

verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check pod status
    log_info "Checking pod status..."
    kubectl get pods -n "$NAMESPACE"
    
    # Check services
    log_info "Checking services..."
    kubectl get svc -n "$NAMESPACE"
    
    # Check ingress
    log_info "Checking ingress..."
    kubectl get ingress -n "$NAMESPACE"
    
    # Wait for deployments
    wait_for_deployment "backend" "$TIMEOUT"
    wait_for_deployment "frontend" "$TIMEOUT"
    
    log_info "✓ Deployment verified"
}

# ============================================================================
# POST-DEPLOYMENT CHECKS
# ============================================================================

health_check() {
    log_info "Performing health checks..."
    
    # Get backend service IP
    local backend_ip=$(kubectl get svc backend -n "$NAMESPACE" -o jsonpath='{.spec.clusterIP}')
    
    # Check backend health
    log_info "Checking backend health..."
    if kubectl run health-check --image=curlimages/curl:latest --rm -it \
        --restart=Never -- curl -f "http://$backend_ip:8000/health" &> /dev/null; then
        log_info "✓ Backend health check passed"
    else
        log_warn "Backend health check failed"
    fi
    
    log_info "✓ Health checks completed"
}

# ============================================================================
# ROLLBACK FUNCTION
# ============================================================================

rollback() {
    log_warn "Rolling back deployment..."
    
    kubectl rollout undo deployment/backend -n "$NAMESPACE"
    kubectl rollout undo deployment/frontend -n "$NAMESPACE"
    
    log_info "✓ Rollback completed"
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

main() {
    log_info "Starting deployment to $DEPLOYMENT_ENV environment..."
    
    # Pre-deployment checks
    check_prerequisites
    check_cluster_connectivity
    check_namespace
    check_environment_variables
    check_database_connectivity
    
    # Deployment
    build_docker_images
    apply_kubernetes_manifests
    verify_deployment
    
    # Post-deployment checks
    health_check
    
    log_info "✓ Deployment completed successfully!"
}

# Error handling
trap 'log_error "Deployment failed"; rollback; exit 1' ERR

# Run main
main "$@"
