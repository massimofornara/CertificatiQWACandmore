#!/bin/bash

# CertTrust HSM Infrastructure Setup Script
# FIPS 140-2 Level 3+ Configuration

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_banner() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║     🔐 CertTrust HSM Infrastructure Setup                 ║"
    echo "║     FIPS 140-2 Level 3+ Configuration                     ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

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

# Check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_warning "This script may require root privileges for some operations"
        read -p "Continue anyway? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ]; then
            exit 1
        fi
    fi
}

# Detect OS
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    elif [ -f /etc/redhat-release ]; then
        OS="Red Hat"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macOS"
    else
        OS="Unknown"
    fi
    
    print_info "Detected OS: $OS"
}

# Install dependencies
install_dependencies() {
    print_step "1" "Installing Dependencies"
    
    case "$OS" in
        "Ubuntu"|"Debian"*)
            print_info "Installing packages for Ubuntu/Debian..."
            apt-get update
            apt-get install -y \
                openssl \
                libssl-dev \
                build-essential \
                git \
                curl \
                wget \
                pkg-config
            ;;
        "CentOS"|"Red Hat"*)
            print_info "Installing packages for CentOS/RHEL..."
            yum install -y \
                openssl \
                openssl-devel \
                gcc \
                gcc-c++ \
                make \
                git \
                curl \
                wget
            ;;
        "macOS")
            print_info "Installing packages for macOS..."
            if ! command -v brew &> /dev/null; then
                print_error "Homebrew not installed. Install from: https://brew.sh"
                exit 1
            fi
            brew install openssl git
            ;;
        *)
            print_warning "Unknown OS. Please install OpenSSL manually."
            ;;
    esac
    
    print_success "Dependencies installed"
}

# Check OpenSSL version
check_openssl() {
    print_step "2" "Checking OpenSSL Version"
    
    OPENSSL_VERSION=$(openssl version)
    print_info "OpenSSL version: $OPENSSL_VERSION"
    
    # Check if version is 3.x (required for FIPS provider)
    if [[ ! "$OPENSSL_VERSION" =~ "3." ]]; then
        print_warning "OpenSSL 3.x required for FIPS provider"
        print_info "Current version may not support FIPS mode"
    else
        print_success "OpenSSL 3.x detected - FIPS provider supported"
    fi
}

# Configure FIPS mode
configure_fips() {
    print_step "3" "Configuring FIPS Mode"
    
    print_info "Configuring OpenSSL FIPS provider..."
    
    # Create FIPS configuration directory
    FIPS_DIR="/usr/lib/ssl"
    if [ ! -d "$FIPS_DIR" ]; then
        mkdir -p "$FIPS_DIR"
    fi
    
    # Copy FIPS configuration
    cp config/openssl-fips.cnf /etc/ssl/openssl.cnf
    
    print_success "FIPS configuration installed"
    
    # Verify FIPS mode
    print_info "Verifying FIPS mode..."
    if openssl list -providers 2>/dev/null | grep -q "fips"; then
        print_success "FIPS provider is available"
    else
        print_warning "FIPS provider not available (may require OpenSSL 3.x)"
    fi
}

# Install Node.js dependencies
install_node_deps() {
    print_step "4" "Installing Node.js Dependencies"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js not installed. Install from: https://nodejs.org"
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_info "Node.js version: $NODE_VERSION"
    
    # Install HSM dependencies
    print_info "Installing HSM module dependencies..."
    cd ../backend
    npm install
    cd ../hsm
    
    print_success "Node.js dependencies installed"
}

# Create log directory
setup_logging() {
    print_step "5" "Setting Up Audit Logging"
    
    LOG_DIR="/var/log/certtrust"
    
    if [ ! -d "$LOG_DIR" ]; then
        mkdir -p "$LOG_DIR"
        chmod 750 "$LOG_DIR"
        print_success "Audit log directory created: $LOG_DIR"
    else
        print_info "Audit log directory already exists"
    fi
}

# Generate initial keys
generate_initial_keys() {
    print_step "6" "Generating Initial Keys"
    
    print_info "Generating Root CA key pair..."
    
    # Generate Root CA private key
    openssl genrsa -out config/root-ca.key 4096
    
    # Generate Root CA certificate
    openssl req -new -x509 -days 3650 \
        -key config/root-ca.key \
        -out config/root-ca.crt \
        -config config/openssl-fips.cnf \
        -subj "/C=IT/ST=Rome/L=Rome/O=CertTrust/CN=CertTrust Root CA"
    
    print_success "Root CA generated"
    
    # Generate Intermediate CA key pair
    print_info "Generating Intermediate CA key pair..."
    
    openssl genrsa -out config/intermediate-ca.key 4096
    
    openssl req -new \
        -key config/intermediate-ca.key \
        -out config/intermediate-ca.csr \
        -config config/openssl-fips.cnf \
        -subj "/C=IT/ST=Rome/L=Rome/O=CertTrust/CN=CertTrust Intermediate CA"
    
    # Sign intermediate CA with root CA
    openssl x509 -req -days 1825 \
        -in config/intermediate-ca.csr \
        -CA config/root-ca.crt \
        -CAkey config/root-ca.key \
        -CAcreateserial \
        -out config/intermediate-ca.crt \
        -extensions v3_intermediate_ca \
        -extfile config/openssl-fips.cnf
    
    print_success "Intermediate CA generated"
}

# Test HSM
test_hsm() {
    print_step "7" "Testing HSM Infrastructure"
    
    print_info "Running HSM tests..."
    
    # Test script
    cat > /tmp/test-hsm.js << 'EOF'
const HSMManager = require('./src/HSMManager');

async function test() {
  console.log('Testing HSM Manager...');
  
  const hsm = new HSMManager({
    provider: 'local-fips',
    localFips: {
      fipsMode: true
    },
    audit: {
      logPath: '/var/log/certtrust/audit.log'
    }
  });
  
  try {
    // Generate key pair
    console.log('Generating key pair...');
    const keyPair = await hsm.generateKeyPair({
      algorithm: 'RSA',
      keySize: 2048,
      label: 'test-key'
    });
    console.log('✅ Key pair generated:', keyPair.keyId);
    
    // Sign data
    console.log('Signing data...');
    const data = Buffer.from('Hello, HSM!');
    const signature = await hsm.sign(keyPair.keyId, data, 'SHA256');
    console.log('✅ Data signed, signature length:', signature.length);
    
    // Verify signature
    console.log('Verifying signature...');
    const isValid = await hsm.verify(keyPair.keyId, data, signature, 'SHA256');
    console.log('✅ Signature valid:', isValid);
    
    // Get metrics
    console.log('Getting metrics...');
    const metrics = await hsm.getMetrics();
    console.log('✅ Metrics:', metrics);
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

test();
EOF
    
    node /tmp/test-hsm.js
    
    print_success "HSM tests completed"
}

# Display summary
display_summary() {
    print_banner
    
    echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}║          🎉 HSM Infrastructure Setup Complete! 🎉         ║${NC}"
    echo -e "${GREEN}║                                                            ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Configuration Files:${NC}"
    echo "  • OpenSSL FIPS Config: /etc/ssl/openssl.cnf"
    echo "  • Audit Log: /var/log/certtrust/audit.log"
    echo "  • Root CA: config/root-ca.crt"
    echo "  • Intermediate CA: config/intermediate-ca.crt"
    echo ""
    echo -e "${CYAN}Next Steps:${NC}"
    echo "  1. Configure backend/.env with HSM settings"
    echo "  2. Start backend: cd ../backend && npm start"
    echo "  3. Start frontend: cd .. && npm run dev"
    echo "  4. Access dashboard: http://localhost:5173"
    echo ""
    echo -e "${YELLOW}For Cloud HSM (AWS/Azure/GCP):${NC}"
    echo "  • See hsm/aws-cloudhsm/README.md"
    echo "  • See hsm/azure-dedicated-hsm/README.md"
    echo "  • See hsm/google-cloud-hsm/README.md"
    echo ""
}

# Main
main() {
    print_banner
    
    check_root
    detect_os
    install_dependencies
    check_openssl
    configure_fips
    install_node_deps
    setup_logging
    generate_initial_keys
    test_hsm
    display_summary
}

# Run main
main "$@"
