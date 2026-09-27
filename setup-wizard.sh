#!/bin/bash

# ============================================
# CertTrust - Setup Wizard Interattivo
# ============================================
# Questo script guida l'utente attraverso la configurazione
# completa per pubblicare su tutte le piattaforme
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

# Banner
print_banner() {
    clear
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║     ██████╗███████╗████████╗██████╗ ██╗███████╗████████╗  ║"
    echo "║    ██╔════╝██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝╚══██╔══╝  ║"
    echo "║    ██║     █████╗     ██║   ██████╔╝██║█████╗     ██║      ║"
    echo "║    ██║     ██╔══╝     ██║   ██╔══██╗██║██╔══╝     ██║      ║"
    echo "║    ╚██████╗███████╗   ██║   ██║  ██║██║██║        ██║      ║"
    echo "║     ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝        ╚═╝      ║"
    echo "║                                                            ║"
    echo "║         🚀 Setup Wizard - Pubblicazione Globale 🌍        ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Functions
print_step() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📍 STEP $1: $2${NC}"
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

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# ============================================
# CHECK PREREQUISITI
# ============================================
check_prerequisites() {
    print_step "1" "Verifica Prerequisiti"
    
    local all_good=true
    
    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js installato: $NODE_VERSION"
    else
        print_error "Node.js NON installato"
        print_info "Scarica da: https://nodejs.org/"
        all_good=false
    fi
    
    # Check npm
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm installato: v$NPM_VERSION"
    else
        print_error "npm NON installato"
        all_good=false
    fi
    
    # Check Git
    if command_exists git; then
        GIT_VERSION=$(git --version)
        print_success "Git installato: $GIT_VERSION"
    else
        print_error "Git NON installato"
        print_info "Scarica da: https://git-scm.com/"
        all_good=false
    fi
    
    # Check internet connection
    if ping -c 1 github.com &> /dev/null; then
        print_success "Connessione internet attiva"
    else
        print_error "Nessuna connessione internet"
        all_good=false
    fi
    
    if [ "$all_good" = false ]; then
        echo ""
        print_warning "Alcuni prerequisiti mancano. Installali prima di continuare."
        read -p "Vuoi continuare comunque? (s/n): " CONTINUE
        if [ "$CONTINUE" != "s" ]; then
            exit 1
        fi
    else
        echo ""
        print_success "Tutti i prerequisiti sono soddisfatti!"
    fi
    
    sleep 2
}

# ============================================
# INSTALLA DIPENDENZE
# ============================================
install_dependencies() {
    print_step "2" "Installazione Dipendenze"
    
    print_info "Installazione delle dipendenze del progetto..."
    npm install
    
    print_info "Build del progetto..."
    npm run build
    
    print_success "Dipendenze installate e progetto compilato!"
    sleep 2
}

# ============================================
# CONFIGURA GITHUB
# ============================================
configure_github() {
    print_step "3" "Configurazione GitHub"
    
    echo -e "${CYAN}GitHub è necessario per:${NC}"
    echo "  • Hosting gratuito (GitHub Pages)"
    echo "  • CI/CD automatico (GitHub Actions)"
    echo "  • Versioning del codice"
    echo ""
    
    read -p "Hai già un account GitHub? (s/n): " HAS_GITHUB
    
    if [ "$HAS_GITHUB" != "s" ]; then
        print_info "Apri questo link per creare un account:"
        echo -e "${YELLOW}https://github.com/signup${NC}"
        echo ""
        read -p "Premi INVIO quando hai creato l'account..."
    fi
    
    # Check if git is configured
    if ! git config user.name &> /dev/null; then
        print_info "Configura il tuo nome GitHub:"
        read -p "Nome: " GIT_NAME
        git config --global user.name "$GIT_NAME"
    fi
    
    if ! git config user.email &> /dev/null; then
        print_info "Configura la tua email GitHub:"
        read -p "Email: " GIT_EMAIL
        git config --global user.email "$GIT_EMAIL"
    fi
    
    print_success "GitHub configurato!"
    
    # Initialize git repository if not exists
    if [ ! -d .git ]; then
        print_info "Inizializzazione repository Git..."
        git init
        git add .
        git commit -m "Initial commit - CertTrust"
    fi
    
    print_success "Repository Git inizializzato!"
    sleep 2
}

# ============================================
# SCEGLI PIATTAFORME
# ============================================
choose_platforms() {
    print_step "4" "Scegli le Piattaforme"
    
    echo -e "${CYAN}Seleziona le piattaforme dove vuoi pubblicare:${NC}"
    echo ""
    echo -e "${YELLOW}GRATIS:${NC}"
    echo "  1) GitHub Pages        - Hosting gratuito, perfetto per open source"
    echo "  2) Vercel              - Hosting gratuito, deploy automatico"
    echo "  3) Netlify             - Hosting gratuito, form e funzioni serverless"
    echo "  4) Cloudflare Pages    - Hosting gratuito, CDN globale"
    echo "  5) Render              - Hosting gratuito, deploy da Git"
    echo ""
    echo -e "${YELLOW}A PAGAMENTO:${NC}"
    echo "  6) AWS S3 + CloudFront - Scalabilità enterprise"
    echo "  7) Azure Static Web Apps - Integrazione Microsoft"
    echo "  8) Google Cloud Run    - Serverless, pay-per-use"
    echo "  9) Heroku              - PaaS, deploy rapido"
    echo "  10) Fly.io             - Edge computing"
    echo ""
    echo -e "${YELLOW}CONTAINER:${NC}"
    echo "  11) Docker Hub         - Container registry"
    echo ""
    echo -e "${YELLOW}PACKAGE:${NC}"
    echo "  12) npm                - Package registry"
    echo ""
    echo -e "${CYAN}Inserisci i numeri separati da virgola (es: 1,2,3) o 'all' per tutte:${NC}"
    read -p "> " PLATFORMS_CHOICE
    
    if [ "$PLATFORMS_CHOICE" = "all" ]; then
        PLATFORMS=(1 2 3 4 5 6 7 8 9 10 11 12)
    else
        IFS=',' read -ra PLATFORMS <<< "$PLATFORMS_CHOICE"
    fi
    
    print_success "Piattaforme selezionate: ${#PLATFORMS[@]}"
    sleep 2
}

# ============================================
# CONFIGURA PIATTAFORME
# ============================================
configure_platforms() {
    print_step "5" "Configurazione Piattaforme"
    
    for PLATFORM in "${PLATFORMS[@]}"; do
        case $PLATFORM in
            1) configure_github_pages ;;
            2) configure_vercel ;;
            3) configure_netlify ;;
            4) configure_cloudflare ;;
            5) configure_render ;;
            6) configure_aws ;;
            7) configure_azure ;;
            8) configure_gcp ;;
            9) configure_heroku ;;
            10) configure_flyio ;;
            11) configure_docker ;;
            12) configure_npm ;;
        esac
    done
}

# ============================================
# CONFIGURAZIONI SPECIFICHE
# ============================================

configure_github_pages() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🌐 Configurazione GitHub Pages${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Crea un nuovo repository su GitHub:"
    echo -e "${YELLOW}https://github.com/new${NC}"
    echo ""
    read -p "Nome del repository: " REPO_NAME
    read -p "Username GitHub: " GITHUB_USER
    
    # Add remote
    git remote add origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git 2>/dev/null || true
    git remote set-url origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git
    
    print_info "Installo gh-pages..."
    npm install -g gh-pages
    
    print_success "GitHub Pages configurato!"
    print_info "Per pubblicare: ./publish.sh github"
    
    sleep 2
}

configure_vercel() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}▲ Configurazione Vercel${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Installo Vercel CLI..."
    npm install -g vercel
    
    print_info "Login a Vercel..."
    vercel login
    
    print_success "Vercel configurato!"
    print_info "Per pubblicare: ./publish.sh vercel"
    
    sleep 2
}

configure_netlify() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🌐 Configurazione Netlify${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Installo Netlify CLI..."
    npm install -g netlify-cli
    
    print_info "Login a Netlify..."
    netlify login
    
    print_success "Netlify configurato!"
    print_info "Per pubblicare: ./publish.sh netlify"
    
    sleep 2
}

configure_cloudflare() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}☁️  Configurazione Cloudflare Pages${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Installo Wrangler CLI..."
    npm install -g wrangler
    
    print_info "Login a Cloudflare..."
    wrangler login
    
    print_success "Cloudflare configurato!"
    print_info "Per pubblicare: ./publish.sh cloudflare"
    
    sleep 2
}

configure_render() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🎨 Configurazione Render${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Render usa deploy automatico da GitHub."
    print_info "Vai su: ${YELLOW}https://dashboard.render.com${NC}"
    print_info "Collega il tuo repository GitHub e Render deployerà automaticamente!"
    
    read -p "Premi INVIO quando hai completato la configurazione su Render..."
    
    print_success "Render configurato!"
    
    sleep 2
}

configure_aws() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🪣 Configurazione AWS${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    if ! command_exists aws; then
        print_error "AWS CLI non installato"
        print_info "Scarica da: https://aws.amazon.com/cli/"
        read -p "Premi INVIO dopo aver installato AWS CLI..."
    fi
    
    print_info "Configura le credenziali AWS:"
    aws configure
    
    print_success "AWS configurato!"
    print_info "Per pubblicare: ./publish.sh aws"
    
    sleep 2
}

configure_azure() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}☁️  Configurazione Azure${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    if ! command_exists az; then
        print_error "Azure CLI non installato"
        print_info "Scarica da: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        read -p "Premi INVIO dopo aver installato Azure CLI..."
    fi
    
    print_info "Login ad Azure:"
    az login
    
    print_success "Azure configurato!"
    print_info "Per pubblicare: ./publish.sh azure"
    
    sleep 2
}

configure_gcp() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🌩️  Configurazione Google Cloud${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    if ! command_exists gcloud; then
        print_error "Google Cloud SDK non installato"
        print_info "Scarica da: https://cloud.google.com/sdk/docs/install"
        read -p "Premi INVIO dopo aver installato gcloud..."
    fi
    
    print_info "Login a Google Cloud:"
    gcloud auth login
    
    print_success "Google Cloud configurato!"
    print_info "Per pubblicare: ./publish.sh gcp"
    
    sleep 2
}

configure_heroku() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🎈 Configurazione Heroku${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    if ! command_exists heroku; then
        print_error "Heroku CLI non installato"
        print_info "Scarica da: https://devcenter.heroku.com/articles/heroku-cli"
        read -p "Premi INVIO dopo aver installato Heroku CLI..."
    fi
    
    print_info "Login a Heroku:"
    heroku login
    
    print_success "Heroku configurato!"
    print_info "Per pubblicare: ./publish.sh heroku"
    
    sleep 2
}

configure_flyio() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🪁 Configurazione Fly.io${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    if ! command_exists flyctl; then
        print_info "Installo Fly.io CLI..."
        curl -L https://fly.io/install.sh | sh
        export PATH="$HOME/.fly/bin:$PATH"
    fi
    
    print_info "Login a Fly.io:"
    flyctl auth login
    
    print_success "Fly.io configurato!"
    print_info "Per pubblicare: ./publish.sh flyio"
    
    sleep 2
}

configure_docker() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}🐳 Configurazione Docker${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    if ! command_exists docker; then
        print_error "Docker non installato"
        print_info "Scarica da: https://www.docker.com/products/docker-desktop"
        read -p "Premi INVIO dopo aver installato Docker..."
    fi
    
    print_info "Login a Docker Hub:"
    docker login
    
    print_success "Docker configurato!"
    print_info "Per pubblicare: ./publish.sh docker"
    
    sleep 2
}

configure_npm() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}📦 Configurazione npm${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    print_info "Login a npm:"
    npm login
    
    print_success "npm configurato!"
    print_info "Per pubblicare: ./publish.sh npm"
    
    sleep 2
}

# ============================================
# CONFIGURA GITHUB ACTIONS
# ============================================
configure_github_actions() {
    print_step "6" "Configurazione GitHub Actions (Deploy Automatico)"
    
    echo -e "${CYAN}GitHub Actions deployerà automaticamente il sito ad ogni push!${NC}"
    echo ""
    
    read -p "Vuoi configurare il deploy automatico? (s/n): " SETUP_ACTIONS
    
    if [ "$SETUP_ACTIONS" = "s" ]; then
        print_info "Push del repository a GitHub..."
        git push -u origin main 2>/dev/null || git push -u origin master
        
        print_success "Repository caricato su GitHub!"
        print_info "Il workflow GitHub Actions è già configurato nel file:"
        echo -e "${YELLOW}.github/workflows/deploy-all.yml${NC}"
        echo ""
        print_info "Per attivare il deploy automatico:"
        echo "  1. Vai su GitHub → Settings → Secrets and variables → Actions"
        echo "  2. Aggiungi i token per le piattaforme che hai configurato"
        echo "  3. Fai un push e GitHub Actions deployerà automaticamente!"
    fi
    
    sleep 2
}

# ============================================
# RIEPILOGO FINALE
# ============================================
final_summary() {
    print_banner
    
    echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}║          🎉 CONFIGURAZIONE COMPLETATA! 🎉                 ║${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    echo -e "${CYAN}Ora puoi pubblicare il tuo sito con un solo comando:${NC}"
    echo ""
    echo -e "${YELLOW}./publish.sh all${NC}  - Pubblica su tutte le piattaforme"
    echo ""
    echo -e "${CYAN}Oppure per piattaforme specifiche:${NC}"
    echo ""
    
    for PLATFORM in "${PLATFORMS[@]}"; do
        case $PLATFORM in
            1) echo -e "  ${GREEN}✓${NC} GitHub Pages:    ${YELLOW}./publish.sh github${NC}" ;;
            2) echo -e "  ${GREEN}✓${NC} Vercel:          ${YELLOW}./publish.sh vercel${NC}" ;;
            3) echo -e "  ${GREEN}✓${NC} Netlify:         ${YELLOW}./publish.sh netlify${NC}" ;;
            4) echo -e "  ${GREEN}✓${NC} Cloudflare:      ${YELLOW}./publish.sh cloudflare${NC}" ;;
            5) echo -e "  ${GREEN}✓${NC} Render:          ${YELLOW}./publish.sh render${NC}" ;;
            6) echo -e "  ${GREEN}✓${NC} AWS:             ${YELLOW}./publish.sh aws${NC}" ;;
            7) echo -e "  ${GREEN}✓${NC} Azure:           ${YELLOW}./publish.sh azure${NC}" ;;
            8) echo -e "  ${GREEN}✓${NC} Google Cloud:    ${YELLOW}./publish.sh gcp${NC}" ;;
            9) echo -e "  ${GREEN}✓${NC} Heroku:          ${YELLOW}./publish.sh heroku${NC}" ;;
            10) echo -e "  ${GREEN}✓${NC} Fly.io:          ${YELLOW}./publish.sh flyio${NC}" ;;
            11) echo -e "  ${GREEN}✓${NC} Docker:          ${YELLOW}./publish.sh docker${NC}" ;;
            12) echo -e "  ${GREEN}✓${NC} npm:             ${YELLOW}./publish.sh npm${NC}" ;;
        esac
    done
    
    echo ""
    echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${GREEN}🚀 Il tuo sito CertTrust è pronto per il mondo!${NC}"
    echo ""
}

# ============================================
# MAIN
# ============================================
main() {
    print_banner
    
    echo -e "${CYAN}Benvenuto nel Setup Wizard di CertTrust!${NC}"
    echo ""
    echo "Questo script ti guiderà attraverso la configurazione completa"
    echo "per pubblicare il tuo sito su tutte le piattaforme globali."
    echo ""
    echo -e "${YELLOW}Tempo stimato: 5-10 minuti${NC}"
    echo ""
    
    read -p "Premi INVIO per iniziare..."
    
    # Esegui tutti i passaggi
    check_prerequisites
    install_dependencies
    configure_github
    choose_platforms
    configure_platforms
    configure_github_actions
    final_summary
}

# Run main
main "$@"
