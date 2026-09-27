# 🚀 Guida Completa alla Pubblicazione

Questa guida ti aiuta a pubblicare CertTrust su tutte le principali piattaforme di hosting e distribuzione del mondo.

## 📋 Indice

- [Prerequisiti](#prerequisiti)
- [Pubblicazione Automatica (GitHub Actions)](#pubblicazione-automatica)
- [Pubblicazione Manuale](#pubblicazione-manuale)
- [Piattaforme Supportate](#piattaforme-supportate)

---

## 🔧 Prerequisiti

### 1. Build del Progetto

```bash
# Installa le dipendenze
npm install

# Build di produzione
npm run build
```

I file ottimizzati saranno nella directory `dist/`.

### 2. Configurazione Account

Prima di pubblicare, assicurati di avere account e credenziali per le piattaforme che vuoi utilizzare.

---

## 🤖 Pubblicazione Automatica

### GitHub Actions (Consigliato)

Il progetto include un workflow GitHub Actions che pubblica automaticamente su tutte le piattaforme quando fai push su `main` o crei una release.

#### Setup

1. **Forka o crea il repository su GitHub**

2. **Configura i Secrets** (Settings → Secrets and variables → Actions):

```bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id

# Cloudflare
CLOUDFLARE_API_TOKEN=your_cf_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# npm
NPM_TOKEN=your_npm_token

# Docker Hub
DOCKERHUB_USERNAME=your_username
DOCKERHUB_TOKEN=your_token

# AWS
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name
CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id

# Azure
AZURE_STATIC_WEB_APPS_API_TOKEN=your_azure_token

# Google Cloud
GCP_WORKLOAD_IDENTITY_PROVIDER=your_provider
GCP_SERVICE_ACCOUNT=your_service_account
GCP_REGION=us-central1

# Heroku
HEROKU_API_KEY=your_heroku_key
HEROKU_APP_NAME=your_app_name
HEROKU_EMAIL=your_email

# Fly.io
FLY_API_TOKEN=your_fly_token

# Railway
RAILWAY_TOKEN=your_railway_token

# Render
RENDER_DEPLOY_HOOK=your_render_hook
```

3. **Push su main**: Il workflow si attiverà automaticamente!

---

## 🛠️ Pubblicazione Manuale

### Script di Pubblicazione

Usa lo script `publish.sh` per pubblicare su qualsiasi piattaforma:

```bash
# Rendi lo script eseguibile
chmod +x publish.sh

# Pubblica su tutte le piattaforme
./publish.sh all

# Pubblica su una piattaforma specifica
./publish.sh vercel
./publish.sh netlify
./publish.sh docker
./publish.sh npm
# ... ecc
```

---

## 🌐 Piattaforme Supportate

### 1. GitHub Pages

**Gratuito** | **Ideale per**: Progetti open source, documentazione

```bash
# Installa gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

**URL**: `https://<username>.github.io/<repository>`

---

### 2. Vercel

**Gratuito** | **Ideale per**: Next.js, React, Vue, deploy veloce

```bash
# Installa Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Configurazione**:
- Collega il repository GitHub
- Vercel deploya automaticamente ad ogni push

---

### 3. Netlify

**Gratuito** | **Ideale per**: Siti statici, form, funzioni serverless

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Configurazione**:
- Collega il repository GitHub
- Netlify deploya automaticamente ad ogni push

---

### 4. Cloudflare Pages

**Gratuito** | **Ideale per**: Performance globale, CDN integrato

```bash
# Installa Wrangler
npm install -g wrangler

# Deploy
wrangler pages deploy dist --project-name=certtrust
```

---

### 5. npm Registry

**Gratuito** | **Ideale per**: Distribuire come pacchetto npm

```bash
# Login
npm login

# Publish
npm publish --access public
```

**Installazione**: `npm install certtrust`

---

### 6. Docker Hub

**Gratuito** | **Ideale per**: Containerizzazione, deploy ovunque

```bash
# Build
docker build -t certtrust:latest .

# Login
docker login

# Tag e push
docker tag certtrust:latest <username>/certtrust:latest
docker push <username>/certtrust:latest
```

**Esecuzione**:
```bash
docker run -p 80:80 <username>/certtrust:latest
```

---

### 7. AWS S3 + CloudFront

**A pagamento** | **Ideale per**: Scalabilità enterprise, controllo totale

```bash
# Configura AWS CLI
aws configure

# Upload a S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalida cache CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

### 8. Azure Static Web Apps

**Gratuito (tier free)** | **Ideale per**: Integrazione Microsoft, enterprise

```bash
# Installa Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Deploy
az staticwebapp deploy \
  --name your-app-name \
  --resource-group your-resource-group \
  --source dist/
```

---

### 9. Google Cloud Run

**A pagamento (pay-per-use)** | **Ideale per**: Container serverless, scalabilità automatica

```bash
# Installa gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Deploy
gcloud run deploy certtrust \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

---

### 10. Heroku

**A pagamento** | **Ideale per**: Deploy rapido, add-on marketplace

```bash
# Installa Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Crea app
heroku create your-app-name

# Deploy
git push heroku main
```

---

### 11. Fly.io

**Freemium** | **Ideale per**: App globali, edge computing

```bash
# Installa flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Deploy
flyctl deploy
```

---

### 12. Railway

**Freemium** | **Ideale per**: Deploy zero-config, database integrati

```bash
# Installa Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

### 13. Render

**Gratuito (tier free)** | **Ideale per**: Deploy automatico da Git

1. Vai su https://dashboard.render.com
2. Collega il repository GitHub
3. Crea un nuovo "Static Site"
4. Seleziona il repository
5. Render deploya automaticamente ad ogni push

---

### 14. GitHub Container Registry (GHCR)

**Gratuito** | **Ideale per**: Container privati/public, integrazione GitHub

```bash
# Login
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Build
docker build -t ghcr.io/YOUR_USERNAME/certtrust:latest .

# Push
docker push ghcr.io/YOUR_USERNAME/certtrust:latest
```

---

### 15. Firebase Hosting

**Gratuito** | **Ideale per**: Integrazione Google, hosting veloce

```bash
# Installa Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inizializza
firebase init hosting

# Deploy
firebase deploy --only hosting
```

---

## 📊 Confronto Piattaforme

| Piattaforma | Costo | Velocità | CDN | SSL | Custom Domain | Ideale per |
|-------------|-------|----------|-----|-----|---------------|------------|
| **GitHub Pages** | Gratis | ⭐⭐⭐ | ✅ | ✅ | ✅ | Open source |
| **Vercel** | Gratis | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ | React/Next.js |
| **Netlify** | Gratis | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Siti statici |
| **Cloudflare Pages** | Gratis | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Performance |
| **Docker Hub** | Gratis | ⭐⭐⭐ | ❌ | ❌ | ❌ | Container |
| **AWS S3+CF** | $ | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Enterprise |
| **Azure SWA** | Gratis* | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Microsoft |
| **Google Cloud Run** | $ | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Serverless |
| **Heroku** | $ | ⭐⭐⭐ | ❌ | ✅ | ✅ | Quick deploy |
| **Fly.io** | Gratis* | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Edge apps |
| **Railway** | Gratis* | ⭐⭐⭐⭐ | ❌ | ✅ | ✅ | Full-stack |
| **Render** | Gratis* | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ | Git-based |

---

## 🔐 Configurazione SSL/HTTPS

Tutte le piattaforme moderne forniscono SSL gratuito tramite Let's Encrypt. Assicurati di:

1. Abilitare HTTPS nelle impostazioni della piattaforma
2. Configurare il redirect da HTTP a HTTPS
3. Usare HSTS headers (già configurati in nginx.conf)

---

## 🌍 CDN e Performance

Per massimizzare le performance globali:

1. **Usa una piattaforma con CDN integrato** (Vercel, Cloudflare, Netlify)
2. **Abilita la compressione Gzip** (già configurata in nginx.conf)
3. **Imposta cache headers appropriati** (già configurati)
4. **Usa un dominio custom** con DNS veloce (Cloudflare DNS consigliato)

---

## 📈 Monitoraggio e Analytics

### Vercel Analytics
```bash
# Installa
npm install @vercel/analytics

# Aggiungi a main.tsx
import { Analytics } from '@vercel/analytics/react';
```

### Google Analytics
Aggiungi al `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 CI/CD Completo

### Workflow Completo

```yaml
name: Complete CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test  # Se hai test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🆘 Troubleshooting

### Problemi Comuni

**1. Build fallisce**
```bash
# Pulisci la cache
rm -rf node_modules dist
npm install
npm run build
```

**2. Deploy fallisce su Vercel/Netlify**
- Controlla che la directory di output sia `dist`
- Verifica le variabili d'ambiente nei settings

**3. Docker non parte**
```bash
# Testa localmente
docker build -t certtrust:test .
docker run -p 8080:80 certtrust:test
# Visita http://localhost:8080
```

**4. SSL non funziona**
- Verifica che il dominio sia configurato correttamente
- Controlla i record DNS
- Attendi la propagazione (fino a 24 ore)

---

## 📞 Supporto

Se hai problemi con il deployment:

1. 📧 Email: support@certtrust.com
2. 💬 Discord: [discord.gg/certtrust](https://discord.gg/certtrust)
3. 🐛 GitHub Issues: [github.com/yourusername/certtrust/issues](https://github.com/yourusername/certtrust/issues)

---

<div align="center">

**Pronto per il deploy globale! 🚀**

© 2024 CertTrust. Tutti i diritti riservati.

</div>
