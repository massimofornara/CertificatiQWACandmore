# CertTrust Backend API

Backend Node.js/Express per il sistema di gestione dei certificati digitali CertTrust.

## ⚠️ Avviso Importante

Questo sistema genera certificati X.509 **per scopi di TEST/DEMO**. I certificati generati NON sono qualificati legalmente secondo eIDAS.

Per certificati legalmente validi, è necessario integrare con QTSP autorizzati (InfoCert, Aruba, Namirial, ecc.).

## 🚀 Quick Start

### Prerequisiti

- Node.js >= 18.x
- MongoDB >= 6.x
- npm >= 9.x

### Installazione

```bash
# Installa le dipendenze
npm install

# Copia il file .env e modificalo
cp .env.example .env

# Avvia MongoDB (se locale)
# Oppure usa MongoDB Atlas (cloud)

# Seed del database con dati iniziali
npm run seed

# Avvia il server in development
npm run dev

# Avvia il server in production
npm start
```

### Variabili d'Ambiente

Crea un file `.env` nella root del backend:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/certtrust
JWT_SECRET=your-super-secret-jwt-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@certtrust.com
ADMIN_EMAIL=admin@certtrust.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

## 📚 API Endpoints

### Autenticazione

```
POST /api/auth/register      - Registrazione utente
POST /api/auth/login         - Login utente
POST /api/auth/forgot-password - Richiesta reset password
POST /api/auth/reset-password  - Reset password
GET  /api/auth/me            - Ottieni utente corrente
```

### Certificati

```
POST /api/certificates/generate      - Genera certificato con promo code
GET  /api/certificates               - Lista certificati utente
GET  /api/certificates/:id           - Dettaglio certificato
GET  /api/certificates/:id/download/:type - Download file certificato
POST /api/certificates/:id/revoke    - Revoca certificato
POST /api/certificates/validate-code - Valida promo code
```

### Utenti

```
GET  /api/users/profile              - Profilo utente
PUT  /api/users/profile              - Aggiorna profilo
PUT  /api/users/change-password      - Cambia password
DELETE /api/users/account            - Elimina account
```

### Admin (richiede ruolo admin)

```
GET  /api/admin/stats                - Statistiche dashboard
GET  /api/admin/users                - Lista utenti
PUT  /api/admin/users/:id/role       - Cambia ruolo utente
PUT  /api/admin/users/:id/status     - Attiva/disattiva utente
GET  /api/admin/certificates         - Lista certificati
POST /api/admin/promo-codes          - Crea promo code
GET  /api/admin/promo-codes          - Lista promo codes
PUT  /api/admin/promo-codes/:id      - Aggiorna promo code
DELETE /api/admin/promo-codes/:id    - Elimina promo code
```

## 🎫 Codici Promozionali Iniziali

Dopo aver eseguito il seed, questi codici sono disponibili:

| Codice | Descrizione | Tipi Certificati |
|--------|-------------|------------------|
| `CERTTRUST2024` | Tutti i certificati | ALL (illimitato) |
| `QWAC-FREE` | QWAC gratuito | QWAC |
| `PSD2-TRIAL` | PSD2 trial | PSD2, QWAC_TPP, QSealC_TPP |
| `EIDAS-DEMO` | eIDAS demo | eIDAS |
| `QSEAL-FREE` | QSealC gratuito | QSealC |
| `SAN-MULTI` | QWAC SAN multi-domain | QWAC_SAN |
| `ALL-CERTS` | Tutti i tipi (premium) | ALL |

## 🔐 Tipi di Certificati

### QWAC (Qualified Website Authentication Certificate)
Autenticazione sicura del sito web con TLS/SSL.

### PSD2 Certificates
Certificati per Third Party Providers con ruoli PSP_AS, PSP_IC, PSP_PI.

### eIDAS Certificates
Certificati conformi al regolamento europeo eIDAS.

### QSealC (Qualified Electronic Seal Certificate)
Sigillo elettronico per persone giuridiche.

### QWAC_TPP
QWAC specifico per Third Party Providers.

### QSealC_TPP
QSealC specifico per Third Party Providers.

### QWAC_SAN
QWAC con supporto multi-dominio (Subject Alternative Name).

## 📧 Configurazione Email

Il sistema invia email con i certificati allegati. Configura SMTP nel file `.env`:

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

Per Gmail, usa una "App Password": https://myaccount.google.com/apppasswords

### Altri Provider
- **SendGrid**: `SMTP_HOST=smtp.sendgrid.net`, `SMTP_PORT=587`
- **Mailgun**: `SMTP_HOST=smtp.mailgun.org`, `SMTP_PORT=587`
- **AWS SES**: `SMTP_HOST=email-smtp.us-east-1.amazonaws.com`, `SMTP_PORT=587`

## 🗄️ Database

### MongoDB Locale

```bash
# Installa MongoDB
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb
# Windows: Scarica da https://www.mongodb.com/try/download/community

# Avvia MongoDB
mongod
```

### MongoDB Atlas (Cloud)

1. Crea un account su https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. Ottieni la connection string
4. Aggiorna `MONGODB_URI` nel file `.env`

## 🛡️ Sicurezza

### Best Practices

1. **Cambia JWT_SECRET** in produzione con una stringa lunga e casuale
2. **Usa HTTPS** in produzione
3. **Configura CORS** correttamente
4. **Rate limiting** già configurato
5. **Helmet** per security headers
6. **Validazione input** con express-validator

### Production Checklist

- [ ] Cambia tutte le password di default
- [ ] Usa variabili d'ambiente sicure
- [ ] Abilita HTTPS
- [ ] Configura backup database
- [ ] Monitora i log
- [ ] Configura firewall
- [ ] Usa MongoDB Atlas o replica set

## 🧪 Testing

```bash
# Esegui i test
npm test

# Esegui i test con coverage
npm run test:coverage
```

## 📦 Deployment

### Docker

```bash
# Build dell'immagine
docker build -t certtrust-backend .

# Esegui il container
docker run -p 5000:5000 --env-file .env certtrust-backend
```

### Heroku

```bash
# Login
heroku login

# Crea app
heroku create certtrust-backend

# Configura variabili d'ambiente
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

### Railway

```bash
# Installa Railway CLI
npm install -g @railway/cli

# Login
railway login

# Init
railway init

# Deploy
railway up
```

## 🔄 Integrazione con QTSP Reali

Per emettere certificati legalmente validi, integra con QTSP autorizzati:

### InfoCert
- API: https://www.infocert.it/it/sviluppatori
- Documentazione: Richiedi accesso partner

### Aruba PEC
- API: https://www.aruba.it/it/api
- Documentazione: Richiedi accesso partner

### Namirial
- API: https://www.namirial.com/it/sviluppatori
- Documentazione: Richiedi accesso partner

### Integrazione

Modifica `services/CertificateService.js` per chiamare le API dei QTSP invece di generare certificati autofirmati.

## 📄 Licenza

MIT

## 📞 Supporto

- Email: support@certtrust.com
- Documentazione: https://docs.certtrust.com
