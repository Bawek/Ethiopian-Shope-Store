#!/bin/bash

# ============================================================================
# DEPLOYMENT VALIDATION SCRIPT
# Validates all components before deployment
# ============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FAILED=0
WARNINGS=0

log_pass() {
    echo -e "${GREEN}✓${NC} $1"
}

log_fail() {
    echo -e "${RED}✗${NC} $1"
    FAILED=$((FAILED + 1))
}

log_warn() {
    echo -e "${YELLOW}!${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

# ============================================================================
# VALIDATION CHECKS
# ============================================================================

echo "=========================================="
echo "Deployment Validation"
echo "=========================================="

# Check Node.js
echo -e "\n${YELLOW}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    log_pass "Node.js installed: $NODE_VERSION"
else
    log_fail "Node.js not found"
fi

# Check Docker
echo -e "\n${YELLOW}Checking Docker...${NC}"
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    log_pass "Docker installed: $DOCKER_VERSION"
else
    log_fail "Docker not found"
fi

# Check Docker Compose
echo -e "\n${YELLOW}Checking Docker Compose...${NC}"
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    log_pass "Docker Compose installed: $COMPOSE_VERSION"
else
    log_fail "Docker Compose not found"
fi

# Check kubectl
echo -e "\n${YELLOW}Checking kubectl...${NC}"
if command -v kubectl &> /dev/null; then
    KUBECTL_VERSION=$(kubectl version --client --short 2>/dev/null || echo "unknown")
    log_pass "kubectl installed: $KUBECTL_VERSION"
else
    log_warn "kubectl not found (required for Kubernetes deployment)"
fi

# Check environment files
echo -e "\n${YELLOW}Checking environment files...${NC}"
if [ -f "backend/.env" ]; then
    log_pass "backend/.env exists"
else
    log_fail "backend/.env not found (copy from .env.example)"
fi

if [ -f "frontend/.env" ]; then
    log_pass "frontend/.env exists"
else
    log_warn "frontend/.env not found (may not be required)"
fi

# Check required environment variables
echo -e "\n${YELLOW}Checking environment variables...${NC}"
if [ -f "backend/.env" ]; then
    source backend/.env
    
    REQUIRED_VARS=(
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
    
    for var in "${REQUIRED_VARS[@]}"; do
        if [ -z "${!var:-}" ]; then
            log_fail "Missing environment variable: $var"
        else
            log_pass "Environment variable set: $var"
        fi
    done
fi

# Check Dockerfile
echo -e "\n${YELLOW}Checking Dockerfiles...${NC}"
if [ -f "backend/Dockerfile" ]; then
    log_pass "backend/Dockerfile exists"
else
    log_fail "backend/Dockerfile not found"
fi

if [ -f "frontend/Dockerfile" ]; then
    log_pass "frontend/Dockerfile exists"
else
    log_fail "frontend/Dockerfile not found"
fi

# Check Kubernetes manifests
echo -e "\n${YELLOW}Checking Kubernetes manifests...${NC}"
K8S_FILES=(
    "k8s/namespace.yaml"
    "k8s/configmap.yaml"
    "k8s/secret.yaml"
    "k8s/postgres-deployment.yaml"
    "k8s/redis-deployment.yaml"
    "k8s/backend-deployment.yaml"
    "k8s/frontend-deployment.yaml"
    "k8s/ingress.yaml"
)

for file in "${K8S_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_pass "$file exists"
    else
        log_warn "$file not found"
    fi
done

# Check Docker Compose files
echo -e "\n${YELLOW}Checking Docker Compose files...${NC}"
if [ -f "docker-compose.yml" ]; then
    log_pass "docker-compose.yml exists"
else
    log_fail "docker-compose.yml not found"
fi

if [ -f "docker-compose.dev.yml" ]; then
    log_pass "docker-compose.dev.yml exists"
else
    log_warn "docker-compose.dev.yml not found"
fi

# Check package.json
echo -e "\n${YELLOW}Checking package.json files...${NC}"
if [ -f "backend/package.json" ]; then
    log_pass "backend/package.json exists"
else
    log_fail "backend/package.json not found"
fi

if [ -f "frontend/package.json" ]; then
    log_pass "frontend/package.json exists"
else
    log_fail "frontend/package.json not found"
fi

# Check documentation
echo -e "\n${YELLOW}Checking documentation...${NC}"
DOC_FILES=(
    "docs/DEPLOYMENT.md"
    "docs/PRODUCTION.md"
    "docs/TROUBLESHOOTING.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_pass "$file exists"
    else
        log_warn "$file not found"
    fi
done

# Check scripts
echo -e "\n${YELLOW}Checking deployment scripts...${NC}"
SCRIPT_FILES=(
    "scripts/deploy.sh"
    "scripts/health-check.sh"
)

for file in "${SCRIPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_pass "$file exists"
    else
        log_warn "$file not found"
    fi
done

# Check CI/CD
echo -e "\n${YELLOW}Checking CI/CD configuration...${NC}"
if [ -f ".github/workflows/ci-cd.yml" ]; then
    log_pass ".github/workflows/ci-cd.yml exists"
else
    log_warn ".github/workflows/ci-cd.yml not found"
fi

# ============================================================================
# SUMMARY
# ============================================================================

echo -e "\n=========================================="
echo "Validation Summary"
echo "=========================================="

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
else
    echo -e "${RED}✗ $FAILED critical check(s) failed${NC}"
fi

if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}! $WARNINGS warning(s)${NC}"
fi

echo "=========================================="

if [ $FAILED -gt 0 ]; then
    exit 1
else
    exit 0
fi
