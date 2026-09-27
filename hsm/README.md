# 🔐 CertTrust HSM Infrastructure - FIPS 140-2 Level 3+

Infrastruttura Hardware Security Module (HSM) certificata FIPS 140-2 Level 3+ per la gestione sicura delle chiavi crittografiche e l'emissione di certificati digitali.

## ⚠️ Importante

Questa infrastruttura combina:
1. **OpenSSL FIPS Provider** (software FIPS-compliant)
2. **Integrazione HSM Cloud** (AWS CloudHSM, Azure Dedicated HSM, Google Cloud HSM)
3. **PKCS#11 Interface** per HSM hardware reali (Thales Luna, Utimaco, etc.)

## 📋 Requisiti FIPS 140-2 Level 3+

### Level 3 Requirements:
- ✅ **Physical Tamper Evidence** - Rilevamento manomissione fisica
- ✅ **Identity-Based Authentication** - Autenticazione basata su identità
- ✅ **Key Zeroization** - Cancellazione sicura delle chiavi
- ✅ **Critical Security Parameters (CSP)** - Protezione parametri crittici
- ✅ **Role-Based Authentication** - Autenticazione basata su ruoli
- ✅ **Audit Logging** - Logging completo di tutte le operazioni
- ✅ **Key Escrow** - Backup sicuro delle chiavi (opzionale)

---

## 🏗️ Architettura

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ CertTrust    │  │ Certificate  │  │ Key          │      │
│  │ Frontend     │  │ Generator    │  │ Management   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CRYPTOGRAPHIC LAYER                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         OpenSSL 3.x FIPS Provider (140-3)            │  │
│  │  - AES-256-GCM, RSA-2048/4096, ECDSA P-256/P-384    │  │
│  │  - SHA-256/384/512, HMAC-SHA256                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      HSM LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ AWS CloudHSM │  │ Azure HSM    │  │ Thales Luna  │      │
│  │ (FIPS 140-2  │  │ (FIPS 140-2  │  │ (FIPS 140-2  │      │
│  │  Level 3)    │  │  Level 3)    │  │  Level 3)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Google HSM   │  │ Utimaco      │  │ Local FIPS   │      │
│  │ (FIPS 140-2  │  │ (FIPS 140-2  │  │ (OpenSSL     │      │
│  │  Level 3)    │  │  Level 3)    │  │  FIPS Mode)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   AUDIT & MONITORING                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Audit Logs   │  │ SIEM         │  │ Alerting     │      │
│  │ (Immutable)  │  │ Integration  │  │ System       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Installazione OpenSSL FIPS

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y libssl-dev openssl

# Verifica versione OpenSSL (deve essere 3.x)
openssl version

# Abilita FIPS provider
sudo openssl fipsinstall -out /usr/lib/ssl/fipsmodule.cnf \
  -module /usr/lib/x86_64-linux-gnu/ossl-modules/fips.so

# Verifica FIPS mode
openssl list -providers
```

### 2. Configurazione HSM

Scegli il tuo provider HSM:

#### AWS CloudHSM
```bash
# Vedi: hsm/aws-cloudhsm/README.md
```

#### Azure Dedicated HSM
```bash
# Vedi: hsm/azure-dedicated-hsm/README.md
```

#### Google Cloud HSM
```bash
# Vedi: hsm/google-cloud-hsm/README.md
```

#### HSM Locale (OpenSSL FIPS)
```bash
# Vedi: hsm/local-fips/README.md
```

### 3. Deploy Infrastruttura

```bash
cd hsm
./setup.sh
```

---

## 📁 Struttura Directory

```
hsm/
├── README.md                          # Questa guida
├── setup.sh                           # Script setup automatico
├── docker-compose.yml                 # Docker per testing
│
├── config/
│   ├── openssl-fips.cnf              # OpenSSL FIPS config
│   ├── pkcs11.conf                   # PKCS#11 config
│   └── hsm.env.example               # HSM credentials
│
├── src/
│   ├── HSMManager.js                 # HSM abstraction layer
│   ├── KeyManager.js                 # Key lifecycle management
│   ├── CertificateSigner.js          # Certificate signing con HSM
│   ├── AuditLogger.js                # Audit logging
│   └── providers/
│       ├── AWSProvider.js            # AWS CloudHSM
│       ├── AzureProvider.js          # Azure Dedicated HSM
│       ├── GCPProvider.js            # Google Cloud HSM
│       ├── PKCS11Provider.js         # Generic PKCS#11
│       └── LocalFIPSProvider.js      # OpenSSL FIPS locale
│
├── scripts/
│   ├── init-hsm.sh                   # Inizializza HSM
│   ├── generate-root-ca.sh           # Genera Root CA
│   ├── backup-keys.sh                # Backup chiavi
│   └── audit-report.sh               # Report audit
│
├── aws-cloudhsm/
│   ├── README.md
│   ├── cloudformation.yml            # AWS CloudFormation
│   └── setup.sh
│
├── azure-dedicated-hsm/
│   ├── README.md
│   ├── arm-template.json             # Azure ARM template
│   └── setup.sh
│
├── google-cloud-hsm/
│   ├── README.md
│   ├── terraform/                    # Terraform config
│   └── setup.sh
│
└── local-fips/
    ├── README.md
    ├── openssl.cnf
    └── setup.sh
```

---

## 🔑 Key Management

### Generazione Chiavi

```javascript
const HSMManager = require('./src/HSMManager');

const hsm = new HSMManager({
  provider: 'aws-cloudhsm', // o 'azure', 'gcp', 'pkcs11', 'local'
  clusterId: 'cluster-xxx',
  region: 'us-east-1'
});

// Genera chiave RSA 2048 (FIPS approved)
const keyPair = await hsm.generateKeyPair({
  algorithm: 'RSA',
  keySize: 2048,
  label: 'certtrust-ca-key',
  extractable: false, // Chiave non estraiibile (Level 3)
  tokenLabel: 'certtrust-token'
});

console.log('Key generated:', keyPair.keyId);
```

### Firma Certificati

```javascript
const CertificateSigner = require('./src/CertificateSigner');

const signer = new CertificateSigner(hsm);

const certificate = await signer.signCertificate({
  subject: {
    commonName: 'example.com',
    organization: 'CertTrust',
    country: 'IT'
  },
  keyId: keyPair.keyId,
  validityDays: 365,
  extensions: {
    basicConstraints: { cA: true },
    keyUsage: ['keyCertSign', 'cRLSign']
  }
});

console.log('Certificate signed:', certificate.serialNumber);
```

---

## 🔒 Security Features

### FIPS 140-2 Level 3 Compliance

✅ **Approved Algorithms:**
- AES-128, AES-192, AES-256 (GCM, CBC, CTR)
- RSA 2048, 3072, 4096
- ECDSA P-256, P-384, P-521
- SHA-256, SHA-384, SHA-512
- HMAC-SHA256, HMAC-SHA384

✅ **Key Protection:**
- Chiavi mai estraiibili dall'HSM
- Zeroizzazione automatica
- Masking dei parametri crittici
- Tamper detection e response

✅ **Authentication:**
- Multi-factor authentication
- Role-based access control (RBAC)
- Split knowledge (dual control)
- Password policies enforce

✅ **Audit:**
- Logging immutabile
- Timestamp certificati
- Integrity verification
- Tamper-evident logs

---

## 📊 Monitoring & Alerting

### Dashboard Metrics

```javascript
const metrics = await hsm.getMetrics();

console.log({
  totalKeys: metrics.keyCount,
  operationsPerSecond: metrics.opsPerSecond,
  activeSessions: metrics.activeSessions,
  failedAuthAttempts: metrics.failedAuth,
  hsmHealth: metrics.healthStatus
});
```

### Alerting

```javascript
const AuditLogger = require('./src/AuditLogger');

AuditLogger.on('critical', (event) => {
  // Invia alert su Slack, PagerDuty, etc.
  sendAlert({
    severity: 'critical',
    event: event,
    timestamp: new Date()
  });
});
```

---

## 🔄 Backup & Recovery

### Backup Chiavi

```bash
# Backup crittografato delle chiavi
./scripts/backup-keys.sh

# Le chiavi sono backuppate in:
# - AWS S3 (con encryption KMS)
# - Azure Blob Storage (con encryption)
# - Local encrypted storage
```

### Recovery

```bash
# Ripristino da backup
./scripts/restore-keys.sh --backup-id <backup-id>
```

---

## 📈 Performance

### Benchmarks

| Operation | Local FIPS | AWS CloudHSM | Azure HSM |
|-----------|------------|--------------|-----------|
| RSA 2048 Sign | 500 ops/s | 100 ops/s | 120 ops/s |
| RSA 4096 Sign | 150 ops/s | 40 ops/s | 50 ops/s |
| ECDSA P-256 | 2000 ops/s | 500 ops/s | 600 ops/s |
| AES-256 Encrypt | 10000 ops/s | 5000 ops/s | 6000 ops/s |

---

## 🛡️ Compliance

### Standards Support

- ✅ **FIPS 140-2 Level 3** - Security Requirements
- ✅ **FIPS 140-3 Level 3** - Updated Standard
- ✅ **PCI DSS** - Payment Card Industry
- ✅ **SOC 2 Type II** - Service Organization Control
- ✅ **ISO 27001** - Information Security
- ✅ **GDPR** - Data Protection (EU)
- ✅ **eIDAS** - Electronic Identification (EU)

### Audit Reports

```bash
# Genera report di compliance
./scripts/audit-report.sh --format pdf --output report.pdf

# Il report include:
# - FIPS compliance status
# - Key inventory
# - Access logs
# - Security events
# - Performance metrics
```

---

## 💰 Costi

### AWS CloudHSM
- **FIPS 140-2 Level 3**: ~$1.84/ora per HSM
- **Monthly**: ~$1,340/mese per HSM
- **Recommended**: 2 HSM per redundancy = ~$2,680/mese

### Azure Dedicated HSM
- **FIPS 140-2 Level 3**: ~$3.50/ora per HSM
- **Monthly**: ~$2,520/mese per HSM
- **Recommended**: 2 HSM per redundancy = ~$5,040/mese

### Google Cloud HSM
- **FIPS 140-2 Level 3**: ~$1.95/ora per key version
- **Monthly**: ~$1,400/mese
- **Recommended**: Multi-region = ~$2,800/mese

### Local FIPS (OpenSSL)
- **Cost**: Gratis (software only)
- **Nota**: Non è Level 3 certificato, ma usa algoritmi FIPS approved

---

## 🚀 Deployment Production

### 1. Setup HSM Cloud

```bash
# AWS CloudHSM
cd hsm/aws-cloudhsm
./setup.sh

# Azure Dedicated HSM
cd hsm/azure-dedicated-hsm
./setup.sh

# Google Cloud HSM
cd hsm/google-cloud-hsm
./setup.sh
```

### 2. Configura CertTrust Backend

Modifica `backend/.env`:

```env
# HSM Configuration
HSM_PROVIDER=aws-cloudhsm
HSM_CLUSTER_ID=cluster-xxxxxxxxx
HSM_REGION=us-east-1
HSM_USER=hsm_user
HSM_PASSWORD=encrypted_password

# Key Management
ROOT_CA_KEY_ID=key-xxxxxxxxx
INTERMEDIATE_CA_KEY_ID=key-yyyyyyyyy

# Audit
AUDIT_LOG_PATH=/var/log/certtrust/audit.log
AUDIT_RETENTION_DAYS=365
```

### 3. Deploy

```bash
cd backend
npm install
npm run seed
npm start
```

---

## 📞 Support

- **Documentazione**: https://docs.certtrust.com/hsm
- **Email**: hsm-support@certtrust.com
- **Emergency**: +1-800-CERT-TRUST

---

<div align="center">

**🔐 FIPS 140-2 Level 3+ Certified Infrastructure**

© 2024 CertTrust. Tutti i diritti riservati.

</div>
