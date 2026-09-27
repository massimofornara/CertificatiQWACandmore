# 🚀 CertTrust - Sistema Completo di Gestione Certificati

Sistema completo per la generazione e gestione di certificati digitali X.509 (QWAC, PSD2, eIDAS, QSealC, QWAC_SAN).

## ⚠️ Avviso Legale Importante

**Questo sistema genera certificati X.509 per scopi di TEST/DEMO.**

I certificati generati:
- ✅ Sono tecnicamente validi (X.509 standard)
- ✅ Possono essere usati per test e sviluppo
- ❌ **NON sono qualificati legalmente** secondo eIDAS
- ❌ **NON sono accettati** da banche per PSD2 produzione
- ❌ **NON hanno valore legale** nell'UE

### Per Certificati Legalmente Validi

Per ottenere certificati qualificati legalmente, devi:
1. Contattare QTSP autorizzati (InfoCert, Aruba, Namirial, Actalis)
2. Completare il processo KYC (Know Your Customer)
3. Pagare le tariffe dei QTSP (€50-500/anno per certificato)
4. Attendere la verifica dell'identità aziendale

**QTSP Autorizzati in Italia:**
- InfoCert: https://www.infocert.it
- Aruba PEC: https://www.aruba.it
- Namirial: https://www.namirial.com
- Actalis: https://www.actalis.it
- Infocamere: https://www.infocamere.it

---

## 📦 Componenti del Sistema

### 1. Frontend (React + TypeScript + Vite)
- Interfaccia utente moderna e responsive
- Dashboard per gestire certificati
- Form per generare certificati con promo code
- Visualizzazione dettagli certificati

**Directory:** `/` (root)

### 2. Backend (Node.js + Express + MongoDB)
- API REST complete
- Generazione certificati X.509
- Sistema di autenticazione JWT
- Gestione promo code
- Invio email con certificati

**Directory:** `/backend`

---

## 🚀 Quick Start

### 1. Clona il Repository

```bash
git clone https://github.com/yourusername/certtrust.git
cd certtrust
```

### 2. Setup Backend

```bash
# Entra nella directory backend
cd backend

# Installa le dipendenze
npm install

# Copia il file .env
cp .env.example .env

# Modifica .env con le tue configurazioni
nano .env

# Assicurati che MongoDB sia in esecuzione
# Opzione A: MongoDB locale
mongod

# Opzione B: MongoDB Atlas (cloud)
# Aggiorna MONGODB_URI nel file .env

# Seed del database
npm run seed

# Avvia il server
npm run dev
```

Il backend sarà disponibile su `http://localhost:5000`

### 3. Setup Frontend

```bash
# Torna alla root del progetto
cd ..

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Il frontend sarà disponibile su `http://localhost:5173`

### 4. Accedi al Sistema

**Admin:**
- Email: `admin@certtrust.com`
- Password: `admin123`

**Demo User:**
- Email: `demo@certtrust.com`
- Password: `demo123`

---

## 🎫 Codici Promozionali Disponibili

Dopo il seed, questi codici sono disponibili:

| Codice | Descrizione | Certificati |
|--------|-------------|-------------|
| `CERTTRUST2024` | Tutti i certificati | Tutti (illimitato) |
| `QWAC-FREE` | QWAC gratuito | QWAC |
| `PSD2-TRIAL` | PSD2 trial | PSD2, QWAC_TPP, QSealC_TPP |
| `EIDAS-DEMO` | eIDAS demo | eIDAS |
| `QSEAL-FREE` | QSealC gratuito | QSealC |
| `SAN-MULTI` | Multi-domain | QWAC_SAN |
| `ALL-CERTS` | Premium | Tutti (10 max) |

---

## 📋 Come Usare il Sistema

### Per Utenti Finali

1. **Registrati** sul frontend con email e password
2. **Accedi** con le tue credenziali
3. **Inserisci un promo code** nella dashboard
4. **Compila il form** con i dati del certificato
5. **Genera il certificato** - riceverai una email con i file allegati
6. **Scarica i file** dalla dashboard

### Per Amministratori

1. **Accedi** con credenziali admin
2. **Dashboard admin** - visualizza statistiche
3. **Gestisci utenti** - attiva/disattiva, cambia ruoli
4. **Gestisci certificati** - visualizza, revoca
5. **Crea promo code** - genera nuovi codici promozionali

---

## 🔧 Configurazione

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/certtrust

# JWT
JWT_SECRET=change-this-to-a-long-random-string

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@certtrust.com

# Admin
ADMIN_EMAIL=admin@certtrust.com
ADMIN_PASSWORD=admin123

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Frontend

Il frontend si connette automaticamente al backend su `http://localhost:5000`.

Per cambiare l'URL del backend, modifica `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 📚 API Documentation

### Autenticazione

```bash
# Registrazione
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Corp"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Risposta
{
  "success": true,
  "token": "jwt-token-here",
  "user": { ... }
}
```

### Generazione Certificato

```bash
# Genera certificato
POST /api/certificates/generate
Headers: Authorization: Bearer <token>
{
  "promoCode": "CERTTRUST2024",
  "certificateType": "QWAC",
  "subject": {
    "commonName": "example.com",
    "organization": "Acme Corp",
    "country": "IT"
  },
  "keySize": 2048
}

# Risposta
{
  "success": true,
  "certificate": {
    "id": "...",
    "type": "QWAC",
    "serialNumber": "...",
    "validFrom": "...",
    "validTo": "...",
    "status": "active"
  },
  "downloadLinks": {
    "certificate": "/api/certificates/:id/download/certificate",
    "privateKey": "/api/certificates/:id/download/private-key",
    "publicKey": "/api/certificates/:id/download/public-key"
  }
}
```

### Validazione Promo Code

```bash
POST /api/certificates/validate-code
Headers: Authorization: Bearer <token>
{
  "code": "CERTTRUST2024"
}

# Risposta
{
  "success": true,
  "valid": true,
  "code": "CERTTRUST2024",
  "description": "All certificates - Full access",
  "certificateTypes": ["ALL"],
  "environment": "test"
}
```

---

## 🗄️ Database Schema

### User
```javascript
{
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  companyName: String,
  role: 'user' | 'admin',
  emailVerified: Boolean,
  certificates: [Certificate],
  promoCodesUsed: [{ code, usedAt }]
}
```

### Certificate
```javascript
{
  serialNumber: String,
  certificateType: 'QWAC' | 'PSD2' | 'eIDAS' | 'QSealC' | 'QWAC_TPP' | 'QSealC_TPP' | 'QWAC_SAN',
  subject: { commonName, organization, country, ... },
  issuer: { commonName, organization, country },
  validFrom: Date,
  validTo: Date,
  certificatePem: String,
  privateKeyPem: String,
  publicKeyPem: String,
  status: 'active' | 'revoked' | 'expired',
  user: User,
  promoCodeUsed: String
}
```

### PromoCode
```javascript
{
  code: String,
  description: String,
  certificateTypes: [String],
  maxUses: Number,
  currentUses: Number,
  maxUsesPerUser: Number,
  validFrom: Date,
  validTo: Date,
  isActive: Boolean,
  usedBy: [{ user, usedAt, certificateId }]
}
```

---

## 🛡️ Sicurezza

### Implementato
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation
- ✅ Error handling

### Da Implementare in Produzione
- [ ] HTTPS
- [ ] 2FA (Two-Factor Authentication)
- [ ] Audit logging
- [ ] IP whitelisting per admin
- [ ] Database encryption at rest
- [ ] Regular security audits

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
npm test
```

---

## 📦 Deployment

### Backend

#### Docker
```bash
cd backend
docker build -t certtrust-backend .
docker run -p 5000:5000 --env-file .env certtrust-backend
```

#### Heroku
```bash
cd backend
heroku create certtrust-backend
git push heroku main
```

#### Railway
```bash
cd backend
railway up
```

### Frontend

```bash
npm run build
# Deploy dist/ folder to any static hosting
```

---

## 🔄 Integrazione con QTSP Reali

Per trasformare questo sistema in un servizio che emette certificati legalmente validi:

1. **Diventa partner di un QTSP**
   - Contatta InfoCert, Aruba, Namirial, ecc.
   - Completa il processo di partnership
   - Ottieni accesso alle API

2. **Modifica CertificateService.js**
   ```javascript
   // Invece di generare certificati autofirmati
   // Chiama le API del QTSP
   
   const qtspResponse = await fetch('https://api.qtsp.com/certificates', {
     method: 'POST',
     headers: { 'Authorization': 'Bearer ' + QTSP_API_KEY },
     body: JSON.stringify(certificateData)
   });
   
   const certificate = await qtspResponse.json();
   ```

3. **Implementa KYC**
   - Verifica identità aziendale
   - Documenti legali
   - Approvazione manuale o automatica

4. **Conformità legale**
   - Audit di sicurezza
   - Certificazioni
   - Compliance eIDAS

---

## 📞 Supporto

- **Email**: support@certtrust.com
- **Documentazione**: https://docs.certtrust.com
- **GitHub Issues**: https://github.com/yourusername/certtrust/issues

---

## 📄 Licenza

MIT

---

<div align="center">

**⚠️ Questo è un sistema di TEST/DEMO. Per certificati legalmente validi, contatta QTSP autorizzati.**

© 2024 CertTrust. Tutti i diritti riservati.

</div>
