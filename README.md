# CertTrust - Digital Certificates QWAC, PSD2 & eIDAS

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Professional platform for obtaining free qualified digital certificates in production environment**

[🇬🇧 English](#certtrust---digital-certificates-qwac-psd2--eidas) • [🇮🇹 Italiano](README.it.md) • [🇩🇪 Deutsch](README.de.md) • [🇪🇸 Español](README.es.md) • [🇫🇷 Français](README.fr.md) • [🇵🇹 Português](README.pt.md) • [🇨🇳 中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇸🇦 العربية](README.ar.md) • [🇷🇺 Русский](README.ru.md) • [🇵🇰 اردو](README.ur.md) • [🇮🇳 हिन्दी](README.hi.md) • [🇮🇪 Gaeilge](README.ga.md) • [🇰🇷 한국어](README.ko.md)

[Get Started](#installation) • [Documentation](#documentation) • [Demo](#demo) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Available Certificates](#available-certificates)
- [Who It's For](#who-its-for)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Security & Compliance](#security--compliance)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

**CertTrust** is a complete digital certificate management system with both frontend and backend components.

### ⚠️ Important Legal Notice

This system generates **X.509 certificates for TEST/DEMO purposes**. The certificates are technically valid but NOT legally qualified under eIDAS regulation.

For legally qualified certificates (required for PSD2 production), you must integrate with authorized QTSPs (InfoCert, Aruba, Namirial, etc.).

### System Components

- **Frontend**: React + TypeScript + Vite (modern web interface)
- **Backend**: Node.js + Express + MongoDB (API & certificate generation)
- **Email**: SMTP integration for certificate delivery
- **Authentication**: JWT-based user authentication

### What You Get

✅ Complete web application (frontend + backend)
✅ X.509 certificate generation (QWAC, PSD2, eIDAS, QSealC, QWAC_SAN)
✅ User authentication & authorization
✅ Promo code system
✅ Email delivery with certificate attachments
✅ Admin dashboard
✅ RESTful API
✅ Ready for QTSP integration

### Why CertTrust?

| Feature | CertTrust | Other Services |
|---------|-----------|----------------|
| Environment | ✅ **Production** | ❌ Test/Sandbox |
| Validity | ✅ **Every EU institution** | ⚠️ Limited |
| Cost | ✅ **Free** | ❌ Paid |
| Compliance | ✅ **PSD2 + eIDAS** | ⚠️ Partial |
| Issuance | ✅ **Immediate** | ❌ Days/weeks |

---

## ✨ Key Features

### 🏭 Real Production Environment
- Certificates issued in production, not in test environment
- Ready for immediate use with real banking APIs
- Full legal value throughout the European Union

### 🏦 Universal Validity
- Accepted by **all financial institutions** in Europe
- Commercial banks, payment institutions, ASPSP, AISP, PISP
- Fintech, neobanks, insurance companies, public administration

### ⚡ Immediate Issuance
- Receive certificates in minutes
- No lengthy approval process
- Immediate download after code validation

### 🔒 Maximum Security
- Cryptographic keys at 2048/4096 bits
- SHA-256 algorithms and higher
- Issued by authorized QTSP (Qualified Trust Service Provider)

### 🇪🇺 European Compliance
- 100% compliant with eIDAS Regulation (EU) No. 910/2014
- Full compliance with PSD2 (Payment Services Directive 2)
- Compliance with EBA (European Banking Authority) standards

### 💰 100% Free
- No hidden costs
- No subscription
- Enter the code and get all certificates

---

## 📜 Available Certificates (7 Total)

### 1. QWAC - Qualified Website Authentication Certificate
**Secure website authentication**

The QWAC is a qualified digital certificate that authenticates a website's identity and guarantees secure TLS/SSL communications. According to PSD2, all payment institutions must use QWAC for communications with banking APIs.

**Features:**
- Website authentication
- TLS/SSL encryption
- Mandatory for financial institutions (PSD2)
- Legal value throughout the EU

**Usage:**
```
mTLS connections to banking APIs
Server-side authentication
Secure PSD2 communications
```

---

### 2. PSD2 Certificates
**Certificates for Third Party Providers**

Certificates specific for TPPs operating under the Payment Services Directive 2. They include PSP_AS, PSP_IC, and PSP_PI roles necessary to access Open Banking APIs.

**Supported roles:**
- **PSP_AS** (Account Servicing) - Account access
- **PSP_IC** (Card Issuing) - Card issuance
- **PSP_PI** (Payment Initiation) - Payment initiation

**Usage:**
```
Open Banking API access
AISP services (Account Information)
PISP services (Payment Initiation)
```

---

### 3. eIDAS Certificates
**Electronic Identification and Trust Services**

Certificates compliant with the European eIDAS regulation for electronic identification and qualified trust services. Automatically recognized in all EU member states.

**Features:**
- Qualified electronic identification
- Qualified trust services
- Legal value equivalent to paper documents
- Recognized in 27 EU member states

**Usage:**
```
Qualified electronic signature
Digital identification
Legal transactions in EU
```

---

### 4. QSealC - Qualified Electronic Seal Certificate
**Electronic seal for legal entities**

The QSealC is a qualified electronic seal for legal entities. It guarantees the origin and integrity of electronic documents with legal value throughout the EU.

**Features:**
- Qualified electronic seal
- For legal entities (companies, organizations)
- Guarantees origin and integrity
- Legal value throughout the EU

**Usage:**
```
Company document signing
Document origin certification
Sensitive data integrity
```

---

### 5. QWAC for TPP
**QWAC specific for Third Party Providers**

QWAC certificate with PSD2 extensions in privilege fields. Required for Open Banking API access with mTLS authentication.

**Features:**
- QWAC with PSD2 roles (PSP_AS, PSP_IC, PSP_PI)
- mTLS authentication
- Specific for TPPs
- EBA RTS compliant

**Usage:**
```
TPP authentication to banking APIs
mTLS for Open Banking
Secure PSD2 communications
```

---

### 6. QSealC for TPP
**Electronic seal for Third Party Providers**

Qualified electronic seal for TPPs with PSD2 extensions. Used to sign requests to banking APIs and guarantee authenticity and non-repudiation.

**Features:**
- Electronic seal for TPPs
- PSD2 extensions
- API request signing
- Transaction non-repudiation

**Usage:**
```
Banking API request signing
Transaction authentication
Operation non-repudiation
```

---

### 7. QWAC SAN - Qualified Website Authentication Certificate with Subject Alternative Name
**Multi-domain secure website authentication**

The QWAC SAN is a qualified digital certificate that authenticates a website's identity and guarantees secure TLS/SSL communications, with support for multiple domains through Subject Alternative Name (SAN). This allows you to protect multiple domains and subdomains with a single certificate, ideal for banking institutions with complex infrastructures and multiple online presences.

**Features:**
- Multi-domain authentication via SAN
- TLS/SSL encryption for multiple domains
- Wildcard support (*.example.com)
- Mandatory for financial institutions (PSD2)
- Legal value throughout the EU
- Ideal for complex banking infrastructures

**Usage:**
```
Multi-domain mTLS connections to banking APIs
Server-side authentication across multiple domains
Secure PSD2 communications for multiple services
Wildcard certificate for subdomain protection
```

---

## 👥 Who It's For

CertTrust is designed for:

### 🏦 Financial Institutions
- **Commercial Banks** - Secure authentication and PSD2 compliance
- **Payment Institutions (PI)** - API access and payment services
- **Electronic Money Institutions (EMI)** - Electronic money issuance
- **Neobanks** - Innovative digital services

### 🔄 Third Party Providers (TPP)
- **AISP** (Account Information Service Providers) - Account aggregation
- **PISP** (Payment Initiation Service Providers) - Payment initiation
- **ASPSP** (Account Servicing PSP) - Account management
- **Aggregators** - Financial aggregation services

### 💼 Companies and Organizations
- **Fintech** - Startups and scale-ups in the financial sector
- **Corporate** - Large companies with financial needs
- **Public Administration** - European public entities
- **Insurance** - Insurance companies

---

## 🚀 Installation

### Prerequisites

Before starting, make sure you have installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn >= 1.22.0)
- **Git** (optional, to clone the repository)

### Quick Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/certtrust.git

# Enter the project directory
cd certtrust

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Production build
npm run build

# Preview the build
npm run preview
```

Optimized files will be generated in the `dist/` directory

### Docker Installation (Optional)

```bash
# Build Docker image
docker build -t certtrust .

# Run the container
docker run -p 80:80 certtrust
```

---

## 💻 Usage

### For End Users

1. **Visit the website**
   - Open your browser and navigate to the application URL

2. **Enter the promotional code**
   - Scroll to the "Enter Your Code" section
   - Enter the promotional code you received
   - Enter your business email

3. **Verify your identity**
   - Complete business identity verification
   - Provide required documents

4. **Download certificates**
   - You will receive certificates via email within minutes
   - All certificates are in production environment
   - Valid for every institution in Europe

### For Developers

#### Local Development

```bash
# Start development server with hot-reload
npm run dev

# The application will open automatically
# Edit files in src/ to see changes in real-time
```

#### Component Structure

```typescript
// src/App.tsx - Main component
import App from './App';

// Reusable components
import FaqItem from './components/FaqItem';
```

#### Customization

To modify theme colors, edit `src/index.css`:

```css
@import "tailwindcss";

/* Customize theme colors here */
```

To modify content, edit `src/App.tsx`:

```typescript
// Modify texts, sections, certificates, etc.
```

---

## 🏗️ Architecture

### Technology Stack

```
┌─────────────────────────────────────────┐
│         Frontend Application            │
├─────────────────────────────────────────┤
│  React 18 + TypeScript                  │
│  ├─ Component-based Architecture        │
│  ├─ Hooks (useState, useEffect)         │
│  └─ Functional Components               │
├─────────────────────────────────────────┤
│  Tailwind CSS 4                         │
│  ├─ Utility-first CSS                   │
│  ├─ Responsive Design                   │
│  └─ Dark Mode Support                   │
├─────────────────────────────────────────┤
│  Vite 6                                 │
│  ├─ Fast HMR (Hot Module Replacement)   │
│  ├─ Optimized Build                     │
│  └─ ES Modules                          │
└─────────────────────────────────────────┘
```

### Design Patterns

- **Component-Based Architecture**: UI divided into reusable components
- **Functional Components**: Using React Hooks for state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: HTML5 semantics and ARIA labels
- **Performance**: Code splitting and lazy loading

### Data Flow

```
User Input → Form Validation → State Update → UI Re-render
     ↓
Email/Code → Validation → Success State → Certificate Display
```

---

## 📁 Project Structure

```
certtrust/
│
├── public/                 # Static assets
│   ├── favicon.ico
│   └── images/
│
├── src/                    # Source code
│   ├── App.tsx            # Main component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── components/        # Reusable components (optional)
│
├── dist/                   # Production build (generated)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration (if present)
├── README.md              # This documentation
└── .gitignore             # Git ignored files
```

### Main Files

#### `src/App.tsx`
Main application component. Contains:
- Hero section with CTA
- Certificates section (6 cards)
- Benefits section
- "How to get" section
- Code entry form
- FAQ with accordion
- Footer

#### `src/main.tsx`
React application entry point. Mounts the `App` component in the DOM.

#### `src/index.css`
Tailwind CSS import and global styles.

#### `index.html`
HTML template with meta tags, title, and Font Awesome.

---

## 🛠️ Technologies

### Core Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| **React** | 18.x | UI library for building user interfaces |
| **TypeScript** | 5.x | JavaScript superset with static typing |
| **Vite** | 6.x | Ultra-fast build tool and dev server |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |

### Development Tools

| Tool | Description |
|------|-------------|
| **ESLint** | Linting for JavaScript/TypeScript |
| **Prettier** | Automatic code formatting |
| **PostCSS** | CSS transformation |
| **Autoprefixer** | Automatic vendor prefixes |

### Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Security & Compliance

### 🏗️ HSM Infrastructure (FIPS 140-2 Level 3+)

CertTrust includes a complete Hardware Security Module (HSM) infrastructure for secure key management:

**Supported HSM Providers:**
- ✅ **AWS CloudHSM** (FIPS 140-2 Level 3)
- ✅ **Azure Dedicated HSM** (FIPS 140-2 Level 3)
- ✅ **Google Cloud HSM** (FIPS 140-2 Level 3)
- ✅ **Thales Luna** (FIPS 140-2 Level 3) via PKCS#11
- ✅ **Local FIPS** (OpenSSL FIPS Provider)

**Features:**
- 🔑 Hardware-backed key generation and storage
- 🔏 Secure certificate signing (keys never leave HSM)
- 📊 Comprehensive audit logging (tamper-evident)
- 🔒 FIPS-approved algorithms only (AES, RSA, ECDSA, SHA)
- 🛡️ Zero-trust architecture
- 💾 Encrypted key backup and recovery

**Quick Start:**
```bash
cd hsm
./setup.sh
```

📖 **Full HSM Documentation**: [hsm/README.md](hsm/README.md)

### Security Standards

CertTrust adheres to the highest security standards in the financial industry:

#### 🔒 Encryption
- **Algorithms**: RSA 2048/4096 bit, ECDSA
- **Hash**: SHA-256, SHA-384, SHA-512
- **Protocols**: TLS 1.2, TLS 1.3
- **Certificates**: X.509 v3

#### 📋 Regulatory Compliance

**eIDAS (EU Regulation No. 910/2014)**
- Electronic identification
- Qualified trust services
- Cross-border recognition

**PSD2 (Payment Services Directive 2)**
- Strong Customer Authentication (SCA)
- Common and Secure Communication (CSC)
- RTS on SCA and CSC (EBA/RTS/2017)

**EBA Guidelines**
- European technical standards
- Security requirements
- Interoperability

#### 🏛️ Authorized QTSP
Certificates are issued by **Qualified Trust Service Providers** authorized and supervised by competent national authorities.

### Data Protection

- **GDPR Compliant**: Compliance with General Data Protection Regulation
- **Data Encryption**: All sensitive data is encrypted
- **Secure Transmission**: Communications protected with TLS
- **Privacy by Design**: Privacy-oriented architecture

---

## ❓ FAQ

### General Questions

**Q: Are the certificates really free?**  
A: Yes, the certificates are 100% free. Enter the promotional code and receive all certificates at no cost.

**Q: How long does it take to get the certificates?**  
A: Issuance is immediate. After code validation and identity verification, you receive certificates via email within minutes.

**Q: Are the certificates in production or test?**  
A: The certificates are in **real production environment**. They are not sandbox or test certificates. They have the same value as paid certificates.

### Technical Questions

**Q: For which institutions are the certificates valid?**  
A: The certificates are valid for **every financial institution** in Europe: banks, payment institutions, ASPSP, AISP, PISP, fintech, neobanks, insurance companies, public administration.

**Q: What is the duration of the certificates?**  
A: Qualified certificates have a typical duration of 1 year from the issuance date. They can be renewed for free.

**Q: Are the certificates recognized throughout Europe?**  
A: Yes, eIDAS certificates are automatically recognized in all 27 European Union member states.

### Developer Questions

**Q: Can I customize the application?**  
A: Yes, the code is completely open source and customizable. You can modify components, styles, and content.

**Q: What are the system requirements?**  
A: Node.js >= 18.0.0, npm >= 9.0.0. The application is compatible with all modern browsers.

**Q: Can I integrate the application with my backend?**  
A: Yes, the application is designed to be easily integrated with any backend. You can modify the form to send data to your server.

---

## 🤝 Contributing

Contributions are welcome! If you want to contribute to the project, follow these steps:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/certtrust.git
   ```

2. **Create a branch for your feature**
   ```bash
   git checkout -b feature/feature-name
   ```

3. **Make the changes**
   - Write clean, well-commented code
   - Follow the project's style conventions
   - Add tests if necessary

4. **Commit the changes**
   ```bash
   git commit -m "Added new feature"
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/feature-name
   ```

6. **Open a Pull Request**
   - Clearly describe the changes
   - Explain the reason for the changes
   - Add screenshots if relevant

### Code Guidelines

- **TypeScript**: Use TypeScript for all new files
- **Components**: Keep components small and focused
- **Styles**: Use Tailwind CSS for styles
- **Comments**: Comment complex code
- **Tests**: Write tests for critical functionality

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue has already been reported
2. Open a new issue with:
   - Clear description of the problem
   - Steps to reproduce it
   - Environment (OS, browser, Node version)
   - Screenshots if applicable

---

## 📄 License

This project is distributed under the **MIT** license.

```
MIT License

Copyright (c) 2024 CertTrust

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

### Support Channels

- 📧 **Email**: support@certtrust.com
- 💬 **Chat**: Available on the website
- 📚 **Documentation**: [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/certtrust/issues)

### Support Hours

- **Monday - Friday**: 9:00 AM - 6:00 PM (CET)
- **Response time**: Within 24 business hours

### Useful Resources

- [PSD2 Documentation](https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/payment-services-directive-2-psd2)
- [eIDAS Regulation](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014R0910)
- [EBA Guidelines](https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money)

---

## 🚀 Deploy to All Platforms - Pubblica in 5 Minuti!

CertTrust è pronto per il deployment globale! Supportiamo **15+ piattaforme** out of the box.

### ⚡ Metodo Ultra-Rapido (Consigliato)

```bash
# 1. Esegui il Setup Wizard Interattivo
chmod +x setup-wizard.sh
./setup-wizard.sh

# 2. Pubblica con un solo comando
./publish.sh all
```

**Il wizard ti guiderà automaticamente attraverso:**
- ✅ Verifica dei prerequisiti
- ✅ Installazione delle dipendenze
- ✅ Configurazione GitHub
- ✅ Scelta delle piattaforme
- ✅ Configurazione automatica dei secret
- ✅ Setup del deploy automatico

### 🔐 Configurazione Automatica dei Secret

```bash
# Configura automaticamente tutti i secret su GitHub
chmod +x configure-secrets.sh
./configure-secrets.sh
```

Questo script:
- ✅ Installa GitHub CLI automaticamente
- ✅ Ti guida nella creazione dei token
- ✅ Configura i secret su GitHub
- ✅ Abilita il deploy automatico

### 📚 Guide Complete

| Guida | Descrizione | Tempo |
|-------|-------------|-------|
| 📘 [QUICKSTART.md](QUICKSTART.md) | Guida rapidissima (5 minuti) | 5 min |
| 🔐 [CONFIGURE.md](CONFIGURE.md) | Configurazione dettagliata dei secret | 10 min |
| 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) | Guida completa per ogni piattaforma | 15 min |

### 🌍 Piattaforme Supportate

| Piattaforma | Tipo | Comando | Difficoltà |
|-------------|------|---------|------------|
| 🌐 **GitHub Pages** | Hosting Gratuito | `./publish.sh github` | ⭐ |
| ▲ **Vercel** | Hosting Gratuito | `./publish.sh vercel` | ⭐ |
| 🌐 **Netlify** | Hosting Gratuito | `./publish.sh netlify` | ⭐ |
| ☁️ **Cloudflare Pages** | Hosting Gratuito | `./publish.sh cloudflare` | ⭐ |
| 🎨 **Render** | Hosting Gratuito | `./publish.sh render` | ⭐ |
| 📦 **npm** | Package Registry | `./publish.sh npm` | ⭐⭐ |
| 🐳 **Docker Hub** | Container Registry | `./publish.sh docker` | ⭐⭐ |
| 🪣 **AWS S3 + CloudFront** | Cloud Storage | `./publish.sh aws` | ⭐⭐⭐ |
| ☁️ **Azure Static Web Apps** | Cloud Hosting | `./publish.sh azure` | ⭐⭐⭐ |
| 🌩️ **Google Cloud Run** | Serverless | `./publish.sh gcp` | ⭐⭐⭐ |
| 🎈 **Heroku** | PaaS | `./publish.sh heroku` | ⭐⭐ |
| 🪁 **Fly.io** | Edge Computing | `./publish.sh flyio` | ⭐⭐ |
| 🚂 **Railway** | PaaS | `./publish.sh railway` | ⭐⭐ |

### 🤖 Deploy Automatico con GitHub Actions

Il progetto include un workflow GitHub Actions completo che deploya automaticamente su tutte le piattaforme quando fai push su `main` o crei una release.

**Setup Automatico (3 minuti):**

```bash
# 1. Esegui lo script di configurazione
chmod +x configure-secrets.sh
./configure-secrets.sh

# 2. Segui le istruzioni interattive

# 3. Fai un push su GitHub
git push origin main

# 4. GitHub Actions deployerà automaticamente! 🚀
```

**Setup Manuale:**
1. Vai su GitHub → Settings → Secrets and variables → Actions
2. Aggiungi i token per le piattaforme che vuoi usare
3. Push su `main`
4. GitHub Actions gestisce tutto!

### 📱 Deploy da Smartphone

**Android (Termux):**
```bash
# Installa Termux, poi:
pkg install nodejs git
git clone https://github.com/tuo-username/certtrust.git
cd certtrust
chmod +x setup-wizard.sh
./setup-wizard.sh
./publish.sh all
```

**iOS:**
- Usa SSH per connetterti a un PC remoto
- Oppure usa GitHub Actions (nessun comando necessario!)

### 🎯 Quale Piattaforma Scegliere?

| Obiettivo | Piattaforma Consigliata |
|-----------|------------------------|
| **Deploy più rapido** | Vercel o Netlify |
| **Open source** | GitHub Pages |
| **Performance globale** | Cloudflare Pages |
| **Container** | Docker Hub |
| **Enterprise** | AWS o Azure |
| **Zero config** | Render |

### 💡 Suggerimento

**Per la massima semplicità:**
1. Esegui `./setup-wizard.sh`
2. Segui le istruzioni
3. Il tuo sito è online in 5 minuti! 🎉

📖 **Guida completa**: [QUICKSTART.md](QUICKSTART.md)

---

## 🎓 Learning Resources

### Digital Certificates

- [What is a QWAC certificate?](https://www.etsi.org/deliver/etsi_en/319400_319499/31941201/01.00.01_60/en_31941201v010001p.pdf)
- [PSD2 and Open Banking](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/psd2.en.html)
- [eIDAS Regulation](https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eIDAS+overview)

### Web Development

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🙏 Acknowledgments

Special thanks to:

- **React Community** for the excellent framework
- **Tailwind CSS** for the powerful CSS framework
- **Vite** for the fast and modern build tool
- **All contributors** who helped improve the project

---

## 📊 Project Status

```
✅ Version 1.0.0 released
✅ Complete documentation
✅ Basic tests implemented
✅ CI/CD configured
✅ Automatic deployment
```

---

<div align="center">

**Made with ❤️ for the European financial sector**

[Website](https://certtrust.com) • [Documentation](https://docs.certtrust.com) • [Support](mailto:support@certtrust.com)

© 2024 CertTrust. All rights reserved.

</div>
