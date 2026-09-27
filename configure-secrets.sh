#!/bin/bash

# ============================================
# CertTrust - Configurazione Automatica Secret
# ============================================
# Questo script configura automaticamente i secret
# su GitHub per il deploy automatico
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_banner() {
    clear
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║     🔐 Configurazione Automatica Secret GitHub 🔐         ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_step() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📍 $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# ============================================
# CHECK GITHUB CLI
# ============================================
check_github_cli() {
    print_step "Verifica GitHub CLI"
    
    if ! command_exists gh; then
        print_error "GitHub CLI non installato"
        print_info "Installazione in corso..."
        
        # Detect OS
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
            sudo apt update
            sudo apt install gh
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            brew install gh
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            # Windows
            print_error "Installa GitHub CLI manualmente da: https://cli.github.com/"
            exit 1
        fi
        
        print_success "GitHub CLI installato!"
    else
        GH_VERSION=$(gh --version | head -n 1)
        print_success "GitHub CLI installato: $GH_VERSION"
    fi
    
    # Check authentication
    if ! gh auth status &> /dev/null; then
        print_info "Login a GitHub..."
        gh auth login
    else
        print_success "GitHub CLI autenticato!"
    fi
}

# ============================================
# CONFIGURA SECRET
# ============================================
configure_secret() {
    local SECRET_NAME=$1
    local SECRET_DESC=$2
    local SECRET_URL=$3
    
    echo ""
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}$SECRET_DESC${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Ottieni il token da: ${YELLOW}$SECRET_URL${NC}"
    echo ""
    
    read -p "Vuoi configurare questo secret? (s/n): " CONFIGURE
    
    if [ "$CONFIGURE" = "s" ]; then
        read -sp "Incolla il token (non sarà visibile): " SECRET_VALUE
        echo ""
        
        if [ -n "$SECRET_VALUE" ]; then
            echo "$SECRET_VALUE" | gh secret set "$SECRET_NAME"
            print_success "Secret $SECRET_NAME configurato!"
        else
            print_warning "Token vuoto, skipped"
        fi
    else
        print_info "Skipped"
    fi
}

# ============================================
# CONFIGURA VERCEL
# ============================================
configure_vercel() {
    print_step "Configurazione Vercel"
    
    configure_secret "VERCEL_TOKEN" "Vercel Token" "https://vercel.com/account/tokens"
    configure_secret "VERCEL_ORG_ID" "Vercel Organization ID" "https://vercel.com/account/tokens"
    configure_secret "VERCEL_PROJECT_ID" "Vercel Project ID" "https://vercel.com/account/tokens"
}

# ============================================
# CONFIGURA NETLIFY
# ============================================
configure_netlify() {
    print_step "Configurazione Netlify"
    
    configure_secret "NETLIFY_AUTH_TOKEN" "Netlify Auth Token" "https://app.netlify.com/user/applications#personal-access-tokens"
    configure_secret "NETLIFY_SITE_ID" "Netlify Site ID" "https://app.netlify.com/sites"
}

# ============================================
# CONFIGURA CLOUDFLARE
# ============================================
configure_cloudflare() {
    print_step "Configurazione Cloudflare"
    
    configure_secret "CLOUDFLARE_API_TOKEN" "Cloudflare API Token" "https://dash.cloudflare.com/profile/api-tokens"
    configure_secret "CLOUDFLARE_ACCOUNT_ID" "Cloudflare Account ID" "https://dash.cloudflare.com"
}

# ============================================
# CONFIGURA DOCKER
# ============================================
configure_docker() {
    print_step "Configurazione Docker Hub"
    
    configure_secret "DOCKERHUB_USERNAME" "Docker Hub Username" "https://hub.docker.com/settings/account"
    configure_secret "DOCKERHUB_TOKEN" "Docker Hub Access Token" "https://hub.docker.com/settings/security"
}

# ============================================
# CONFIGURA NPM
# ============================================
configure_npm() {
    print_step "Configurazione npm"
    
    configure_secret "NPM_TOKEN" "npm Access Token" "https://www.npmjs.com/settings/tokens"
}

# ============================================
# CONFIGURA AWS
# ============================================
configure_aws() {
    print_step "Configurazione AWS"
    
    configure_secret "AWS_ACCESS_KEY_ID" "AWS Access Key ID" "https://console.aws.amazon.com/iam/home#/security_credentials"
    configure_secret "AWS_SECRET_ACCESS_KEY" "AWS Secret Access Key" "https://console.aws.amazon.com/iam/home#/security_credentials"
    configure_secret "AWS_REGION" "AWS Region" "https://console.aws.amazon.com"
    configure_secret "AWS_S3_BUCKET" "AWS S3 Bucket Name" "https://s3.console.aws.amazon.com"
    configure_secret "CLOUDFRONT_DISTRIBUTION_ID" "CloudFront Distribution ID" "https://console.aws.amazon.com/cloudfront"
}

# ============================================
# CONFIGURA AZURE
# ============================================
configure_azure() {
    print_step "Configurazione Azure"
    
    configure_secret "AZURE_STATIC_WEB_APPS_API_TOKEN" "Azure Static Web Apps Token" "https://portal.azure.com"
}

# ============================================
# CONFIGURA GCP
# ============================================
configure_gcp() {
    print_step "Configurazione Google Cloud"
    
    configure_secret "GCP_WORKLOAD_IDENTITY_PROVIDER" "GCP Workload Identity Provider" "https://console.cloud.google.com"
    configure_secret "GCP_SERVICE_ACCOUNT" "GCP Service Account" "https://console.cloud.google.com"
    configure_secret "GCP_REGION" "GCP Region" "https://console.cloud.google.com"
}

# ============================================
# CONFIGURA HEROKU
# ============================================
configure_heroku() {
    print_step "Configurazione Heroku"
    
    configure_secret "HEROKU_API_KEY" "Heroku API Key" "https://dashboard.heroku.com/account"
    configure_secret "HEROKU_APP_NAME" "Heroku App Name" "https://dashboard.heroku.com"
    configure_secret "HEROKU_EMAIL" "Heroku Email" "https://dashboard.heroku.com/account"
}

# ============================================
# CONFIGURA FLY.IO
# ============================================
configure_flyio() {
    print_step "Configurazione Fly.io"
    
    configure_secret "FLY_API_TOKEN" "Fly.io API Token" "https://fly.io/user/personal_access_tokens"
}

# ============================================
# CONFIGURA RAILWAY
# ============================================
configure_railway() {
    print_step "Configurazione Railway"
    
    configure_secret "RAILWAY_TOKEN" "Railway Token" "https://railway.app/account/tokens"
}

# ============================================
# CONFIGURA RENDER
# ============================================
configure_render() {
    print_step "Configurazione Render"
    
    configure_secret "RENDER_DEPLOY_HOOK" "Render Deploy Hook URL" "https://dashboard.render.com"
}

# ============================================
# SCEGLI PIATTAFORME
# ============================================
choose_platforms() {
    print_step "Scegli le Piattaforme da Configurare"
    
    echo -e "${CYAN}Seleziona le piattaforme che vuoi configurare:${NC}"
    echo ""
    echo "  1) Vercel"
    echo "  2) Netlify"
    echo "  3) Cloudflare Pages"
    echo "  4) Docker Hub"
    echo "  5) npm"
    echo "  6) AWS"
    echo "  7) Azure"
    echo "  8) Google Cloud"
    echo "  9) Heroku"
    echo "  10) Fly.io"
    echo "  11) Railway"
    echo "  12) Render"
    echo ""
    echo -e "${CYAN}Inserisci i numeri separati da virgola (es: 1,2,3) o 'all' per tutte:${NC}"
    read -p "> " CHOICE
    
    if [ "$CHOICE" = "all" ]; then
        PLATFORMS=(1 2 3 4 5 6 7 8 9 10 11 12)
    else
        IFS=',' read -ra PLATFORMS <<< "$CHOICE"
    fi
}

# ============================================
# MAIN
# ============================================
main() {
    print_banner
    
    echo -e "${CYAN}Questo script configurerà automaticamente i secret su GitHub${NC}"
    echo -e "${CYAN}per il deploy automatico su tutte le piattaforme selezionate.${NC}"
    echo ""
    
    # Check GitHub CLI
    check_github_cli
    
    # Choose platforms
    choose_platforms
    
    # Configure each platform
    for PLATFORM in "${PLATFORMS[@]}"; do
        case $PLATFORM in
            1) configure_vercel ;;
            2) configure_netlify ;;
            3) configure_cloudflare ;;
            4) configure_docker ;;
            5) configure_npm ;;
            6) configure_aws ;;
            7) configure_azure ;;
            8) configure_gcp ;;
            9) configure_heroku ;;
            10) configure_flyio ;;
            11) configure_railway ;;
            12) configure_render ;;
        esac
    done
    
    # Final message
    print_banner
    
    echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}║          🎉 CONFIGURAZIONE COMPLETATA! 🎉                 ║${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Ora puoi pubblicare il tuo sito con un solo comando:${NC}"
    echo ""
    echo -e "${YELLOW}./publish.sh all${NC}"
    echo ""
    echo -e "${CYAN}Oppure fai un push su GitHub e il deploy sarà automatico!${NC}"
    echo ""
}

# Run main
main "$@"
