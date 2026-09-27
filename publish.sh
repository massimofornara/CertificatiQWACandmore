#!/bin/bash

# ============================================
# CertTrust - Multi-Platform Publishing Script
# ============================================
# Usage: ./publish.sh [platform]
# Platforms: all, github, npm, docker, vercel, netlify, cloudflare, aws, azure, gcp, heroku, flyio, railway, render
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Build the project
build() {
    print_header "🔨 Building Project"
    npm run build
    print_success "Build completed successfully"
}

# ============================================
# GITHUB PAGES
# ============================================
publish_github() {
    print_header "🌐 Publishing to GitHub Pages"
    
    if ! command_exists gh; then
        print_error "GitHub CLI not installed. Install from: https://cli.github.com/"
        return 1
    fi
    
    # Install gh-pages package if not present
    if ! npm list -g gh-pages >/dev/null 2>&1; then
        print_warning "Installing gh-pages package..."
        npm install -g gh-pages
    fi
    
    # Deploy to gh-pages branch
    gh-pages -d dist
    print_success "Published to GitHub Pages!"
    print_warning "Visit: https://<username>.github.io/<repository>"
}

# ============================================
# NPM REGISTRY
# ============================================
publish_npm() {
    print_header "📦 Publishing to npm"
    
    if ! command_exists npm; then
        print_error "npm not found"
        return 1
    fi
    
    # Check if logged in
    if ! npm whoami >/dev/null 2>&1; then
        print_error "Not logged in to npm. Run: npm login"
        return 1
    fi
    
    # Publish
    npm publish --access public
    print_success "Published to npm!"
    print_warning "Install with: npm install certtrust"
}

# ============================================
# DOCKER HUB
# ============================================
publish_docker() {
    print_header "🐳 Publishing to Docker Hub"
    
    if ! command_exists docker; then
        print_error "Docker not installed"
        return 1
    fi
    
    # Check if logged in
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker not running or not logged in"
        return 1
    fi
    
    # Get Docker Hub username
    DOCKER_USER=$(docker info 2>/dev/null | grep "Username:" | awk '{print $2}')
    
    if [ -z "$DOCKER_USER" ]; then
        print_error "Not logged in to Docker Hub. Run: docker login"
        return 1
    fi
    
    # Build image
    docker build -t certtrust:latest -t certtrust:1.0.0 .
    
    # Tag for Docker Hub
    docker tag certtrust:latest ${DOCKER_USER}/certtrust:latest
    docker tag certtrust:1.0.0 ${DOCKER_USER}/certtrust:1.0.0
    
    # Push to Docker Hub
    docker push ${DOCKER_USER}/certtrust:latest
    docker push ${DOCKER_USER}/certtrust:1.0.0
    
    print_success "Published to Docker Hub!"
    print_warning "Pull with: docker pull ${DOCKER_USER}/certtrust:latest"
}

# ============================================
# VERCEL
# ============================================
publish_vercel() {
    print_header "▲ Publishing to Vercel"
    
    if ! command_exists vercel; then
        print_warning "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    vercel --prod
    print_success "Published to Vercel!"
}

# ============================================
# NETLIFY
# ============================================
publish_netlify() {
    print_header "🌐 Publishing to Netlify"
    
    if ! command_exists netlify; then
        print_warning "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=dist
    print_success "Published to Netlify!"
}

# ============================================
# CLOUDFLARE PAGES
# ============================================
publish_cloudflare() {
    print_header "☁️ Publishing to Cloudflare Pages"
    
    if ! command_exists wrangler; then
        print_warning "Installing Wrangler CLI..."
        npm install -g wrangler
    fi
    
    wrangler pages deploy dist --project-name=certtrust
    print_success "Published to Cloudflare Pages!"
}

# ============================================
# AWS S3 + CLOUDFRONT
# ============================================
publish_aws() {
    print_header "🪣 Publishing to AWS S3"
    
    if ! command_exists aws; then
        print_error "AWS CLI not installed. Install from: https://aws.amazon.com/cli/"
        return 1
    fi
    
    # Check if configured
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS not configured. Run: aws configure"
        return 1
    fi
    
    read -p "Enter S3 bucket name: " BUCKET_NAME
    read -p "Enter CloudFront distribution ID (optional, press Enter to skip): " CF_ID
    
    # Sync to S3
    aws s3 sync dist/ s3://${BUCKET_NAME} --delete
    print_success "Uploaded to S3 bucket: ${BUCKET_NAME}"
    
    # Invalidate CloudFront if provided
    if [ ! -z "$CF_ID" ]; then
        aws cloudfront create-invalidation --distribution-id ${CF_ID} --paths "/*"
        print_success "CloudFront cache invalidated"
    fi
}

# ============================================
# AZURE STATIC WEB APPS
# ============================================
publish_azure() {
    print_header "☁️ Publishing to Azure Static Web Apps"
    
    if ! command_exists az; then
        print_error "Azure CLI not installed. Install from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        return 1
    fi
    
    # Check if logged in
    if ! az account show >/dev/null 2>&1; then
        print_error "Not logged in to Azure. Run: az login"
        return 1
    fi
    
    read -p "Enter resource group name: " RG_NAME
    read -p "Enter Static Web App name: " APP_NAME
    
    az staticwebapp deploy \
        --name ${APP_NAME} \
        --resource-group ${RG_NAME} \
        --source dist/
    
    print_success "Published to Azure Static Web Apps!"
}

# ============================================
# GOOGLE CLOUD RUN
# ============================================
publish_gcp() {
    print_header "🌩️ Publishing to Google Cloud Run"
    
    if ! command_exists gcloud; then
        print_error "Google Cloud SDK not installed. Install from: https://cloud.google.com/sdk/docs/install"
        return 1
    fi
    
    # Check if authenticated
    if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
        print_error "Not authenticated to GCP. Run: gcloud auth login"
        return 1
    fi
    
    read -p "Enter GCP project ID: " PROJECT_ID
    read -p "Enter region (default: us-central1): " REGION
    REGION=${REGION:-us-central1}
    
    # Set project
    gcloud config set project ${PROJECT_ID}
    
    # Deploy to Cloud Run
    gcloud run deploy certtrust \
        --source . \
        --region ${REGION} \
        --allow-unauthenticated \
        --platform managed
    
    print_success "Published to Google Cloud Run!"
}

# ============================================
# HEROKU
# ============================================
publish_heroku() {
    print_header "🎈 Publishing to Heroku"
    
    if ! command_exists heroku; then
        print_error "Heroku CLI not installed. Install from: https://devcenter.heroku.com/articles/heroku-cli"
        return 1
    fi
    
    # Check if logged in
    if ! heroku auth:whoami >/dev/null 2>&1; then
        print_error "Not logged in to Heroku. Run: heroku login"
        return 1
    fi
    
    read -p "Enter Heroku app name: " APP_NAME
    
    # Add Heroku remote if not exists
    if ! git remote | grep -q heroku; then
        heroku git:remote -a ${APP_NAME}
    fi
    
    # Deploy
    git push heroku main
    print_success "Published to Heroku!"
}

# ============================================
# FLY.IO
# ============================================
publish_flyio() {
    print_header "🪁 Publishing to Fly.io"
    
    if ! command_exists flyctl; then
        print_warning "Installing Fly.io CLI..."
        curl -L https://fly.io/install.sh | sh
        export PATH="$HOME/.fly/bin:$PATH"
    fi
    
    # Check if authenticated
    if ! flyctl auth whoami >/dev/null 2>&1; then
        print_error "Not logged in to Fly.io. Run: flyctl auth login"
        return 1
    fi
    
    # Deploy
    flyctl deploy
    print_success "Published to Fly.io!"
}

# ============================================
# RAILWAY
# ============================================
publish_railway() {
    print_header "🚂 Publishing to Railway"
    
    if ! command_exists railway; then
        print_warning "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Deploy
    railway up
    print_success "Published to Railway!"
}

# ============================================
# RENDER
# ============================================
publish_render() {
    print_header "🎨 Publishing to Render"
    
    print_warning "Render uses Git-based deployment."
    print_warning "Connect your GitHub repository at: https://dashboard.render.com"
    print_warning "Render will automatically deploy on every push to main branch."
    
    read -p "Do you want to push to GitHub now? (y/n): " PUSH
    if [ "$PUSH" = "y" ]; then
        git push origin main
        print_success "Pushed to GitHub. Render will deploy automatically!"
    fi
}

# ============================================
# PUBLISH ALL
# ============================================
publish_all() {
    print_header "🚀 Publishing to ALL Platforms"
    
    build
    
    echo "This will attempt to publish to all platforms."
    echo "Make sure you have credentials configured for each platform."
    read -p "Continue? (y/n): " CONTINUE
    
    if [ "$CONTINUE" != "y" ]; then
        print_warning "Aborted"
        return 0
    fi
    
    # Array of platforms
    PLATFORMS=(
        "github"
        "npm"
        "docker"
        "vercel"
        "netlify"
        "cloudflare"
        "aws"
        "azure"
        "gcp"
        "heroku"
        "flyio"
        "railway"
        "render"
    )
    
    SUCCESS=()
    FAILED=()
    
    for platform in "${PLATFORMS[@]}"; do
        echo ""
        if publish_$platform; then
            SUCCESS+=("$platform")
        else
            FAILED+=("$platform")
        fi
    done
    
    # Summary
    print_header "📊 Publishing Summary"
    
    if [ ${#SUCCESS[@]} -gt 0 ]; then
        echo -e "${GREEN}Successfully published to:${NC}"
        for p in "${SUCCESS[@]}"; do
            echo -e "  ${GREEN}✓${NC} $p"
        done
    fi
    
    if [ ${#FAILED[@]} -gt 0 ]; then
        echo -e "\n${RED}Failed to publish to:${NC}"
        for p in "${FAILED[@]}"; do
            echo -e "  ${RED}✗${NC} $p"
        done
    fi
}

# ============================================
# MAIN
# ============================================
main() {
    print_header "CertTrust - Multi-Platform Publishing"
    
    if [ $# -eq 0 ]; then
        echo "Usage: ./publish.sh [platform]"
        echo ""
        echo "Available platforms:"
        echo "  all         - Publish to all platforms"
        echo "  github      - GitHub Pages"
        echo "  npm         - npm Registry"
        echo "  docker      - Docker Hub"
        echo "  vercel      - Vercel"
        echo "  netlify     - Netlify"
        echo "  cloudflare  - Cloudflare Pages"
        echo "  aws         - AWS S3 + CloudFront"
        echo "  azure       - Azure Static Web Apps"
        echo "  gcp         - Google Cloud Run"
        echo "  heroku      - Heroku"
        echo "  flyio       - Fly.io"
        echo "  railway     - Railway"
        echo "  render      - Render"
        echo ""
        echo "Examples:"
        echo "  ./publish.sh all"
        echo "  ./publish.sh vercel"
        echo "  ./publish.sh docker"
        exit 1
    fi
    
    PLATFORM=$1
    
    case $PLATFORM in
        all)
            publish_all
            ;;
        github|npm|docker|vercel|netlify|cloudflare|aws|azure|gcp|heroku|flyio|railway|render)
            build
            publish_$PLATFORM
            ;;
        *)
            print_error "Unknown platform: $PLATFORM"
            echo "Run ./publish.sh for available platforms"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
