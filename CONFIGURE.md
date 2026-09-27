# 🔐 Guida Completa alla Configurazione dei Secret

Questa guida ti aiuta a configurare i secret per pubblicare automaticamente su tutte le piattaforme.

## 📋 Indice

- [Cosa Sono i Secret?](#cosa-sono-i-secret)
- [Come Ottenere i Token](#come-ottenere-i-token)
- [Configurazione GitHub](#configurazione-github)
- [Configurazione per Piattaforma](#configurazione-per-piattaforma)
- [Verifica](#verifica)

---

## 🔑 Cosa Sono i Secret?

I **secret** sono token di autenticazione che permettono a GitHub Actions di accedere alle piattaforme esterne per pubblicare il tuo sito automaticamente.

**Importante:**
- ✅ I secret sono **privati** e sicuri
- ✅ Nessuno può vederli (nemmeno tu dopo averli salvati)
- ✅ GitHub li usa solo durante il deploy
- ✅ Puoi revocarli in qualsiasi momento

---

## 🎯 Come Ottenere i Token

### 1. Vercel

**Passaggi:**
1. Vai su https://vercel.com
2. Accedi con GitHub/Email
3. Vai su **Settings → Tokens**
4. Clicca **Create Token**
5. Copia il token

**Secret necessari:**
```
VERCEL_TOKEN=xxxxxxxxxxxxx
VERCEL_ORG_ID=xxxxxxxxxxxxx
VERCEL_PROJECT_ID=xxxxxxxxxxxxx
```

**Come ottenere ORG_ID e PROJECT_ID:**
```bash
# Dopo il primo deploy manuale con "vercel --prod"
# Vercel crea un file .vercel/project.json
cat .vercel/project.json
```

---

### 2. Netlify

**Passaggi:**
1. Vai su https://app.netlify.com
2. Accedi con GitHub/Email
3. Vai su **User Settings → Applications → Personal access tokens**
4. Clicca **New access token**
5. Copia il token

**Secret necessari:**
```
NETLIFY_AUTH_TOKEN=xxxxxxxxxxxxx
NETLIFY_SITE_ID=xxxxxxxxxxxxx
```

**Come ottenere SITE_ID:**
```bash
# Dopo il primo deploy manuale con "netlify deploy"
# Netlify mostra il Site ID nel terminale
# Oppure vai su Site settings → General → Site details
```

---

### 3. Cloudflare Pages

**Passaggi:**
1. Vai su https://dash.cloudflare.com
2. Accedi o crea un account
3. Vai su **My Profile → API Tokens**
4. Clicca **Create Token**
5. Usa il template **Edit Cloudflare Workers**
6. Copia il token

**Secret necessari:**
```
CLOUDFLARE_API_TOKEN=xxxxxxxxxxxxx
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxx
```

**Come ottenere ACCOUNT_ID:**
```bash
# Vai su Cloudflare Dashboard
# L'Account ID è visibile nella homepage destra
```

---

### 4. Docker Hub

**Passaggi:**
1. Vai su https://hub.docker.com
2. Accedi o crea un account
3. Vai su **Account Settings → Security**
4. Clicca **New Access Token**
5. Copia il token

**Secret necessari:**
```
DOCKERHUB_USERNAME=tuo-username
DOCKERHUB_TOKEN=xxxxxxxxxxxxx
```

---

### 5. npm

**Passaggi:**
1. Vai su https://www.npmjs.com
2. Accedi o crea un account
3. Vai su **Access Tokens**
4. Clicca **Generate New Token → Publish**
5. Copia il token

**Secret necessario:**
```
NPM_TOKEN=xxxxxxxxxxxxx
```

---

### 6. AWS

**Passaggi:**
1. Vai su https://console.aws.amazon.com
2. Vai su **IAM → Users → Security credentials**
3. Clicca **Create access key**
4. Copia Access Key ID e Secret Access Key

**Secret necessari:**
```
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=nome-del-tuo-bucket
CLOUDFRONT_DISTRIBUTION_ID=EXXXXXXXXXX
```

---

### 7. Azure

**Passaggi:**
1. Vai su https://portal.azure.com
2. Crea una **Static Web App**
3. Vai su **Settings → Secrets**
4. Copia il deployment token

**Secret necessario:**
```
AZURE_STATIC_WEB_APPS_API_TOKEN=xxxxxxxxxxxxx
```

---

### 8. Google Cloud

**Passaggi:**
1. Vai su https://console.cloud.google.com
2. Crea un progetto
3. Vai su **IAM & Admin → Service Accounts**
4. Crea un service account
5. Scarica il JSON delle credenziali

**Secret necessari:**
```
GCP_WORKLOAD_IDENTITY_PROVIDER=projects/xxx/locations/global/workloadIdentityPools/xxx/providers/xxx
GCP_SERVICE_ACCOUNT=xxx@xxx.iam.gserviceaccount.com
GCP_REGION=us-central1
```

---

### 9. Heroku

**Passaggi:**
1. Vai su https://dashboard.heroku.com
2. Vai su **Account Settings → API Key**
3. Clicca **Reveal**
4. Copia l'API Key

**Secret necessari:**
```
HEROKU_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HEROKU_APP_NAME=nome-della-tua-app
HEROKU_EMAIL=tua@email.com
```

---

### 10. Fly.io

**Passaggi:**
```bash
# Installa flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Crea un token
flyctl auth token
```

**Secret necessario:**
```
FLY_API_TOKEN=xxxxxxxxxxxxx
```

---

### 11. Railway

**Passaggi:**
1. Vai su https://railway.app
2. Vai su **Account Settings → Tokens**
3. Clicca **Create Token**
4. Copia il token

**Secret necessario:**
```
RAILWAY_TOKEN=xxxxxxxxxxxxx
```

---

### 12. Render

**Passaggi:**
1. Vai su https://dashboard.render.com
2. Crea un nuovo **Static Site**
3. Vai su **Settings → Deploy Hooks**
4. Copia l'URL del deploy hook

**Secret necessario:**
```
RENDER_DEPLOY_HOOK=https://api.render.com/deploy/srv-xxx?key=xxx
```

---

## 🔧 Configurazione GitHub

### 1. Vai su GitHub

```
https://github.com/tuo-username/certtrust/settings/secrets/actions
```

### 2. Clicca "New repository secret"

### 3. Aggiungi ogni secret

Per ogni piattaforma che vuoi usare:
- **Name**: Nome del secret (es. `VERCEL_TOKEN`)
- **Secret**: Valore del token
- Clicca **Add secret**

### 4. Ripeti per tutti i secret necessari

---

## 🚀 Configurazione per Piattaforma

### Metodo 1: Script Automatico

```bash
# Esegui lo script di configurazione
chmod +x configure-secrets.sh
./configure-secrets.sh
```

Lo script ti guiderà attraverso la configurazione di tutti i secret.

### Metodo 2: Configurazione Manuale

Segui le istruzioni sopra per ogni piattaforma che vuoi usare.

### Metodo 3: GitHub CLI (Avanzato)

```bash
# Installa GitHub CLI
# https://cli.github.com/

# Login
gh auth login

# Aggiungi secret
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID
# ... ecc
```

---

## ✅ Verifica

### 1. Fai un push su GitHub

```bash
git add .
git commit -m "Configura secret per deploy"
git push origin main
```

### 2. Controlla GitHub Actions

```
https://github.com/tuo-username/certtrust/actions
```

### 3. Verifica i deploy

Ogni piattaforma dovrebbe avere un job in esecuzione.

### 4. Controlla i log

Se un deploy fallisce, controlla i log per capire cosa manca.

---

## 🆘 Troubleshooting

### "Secret not found"
- Verifica di aver scritto il nome correttamente
- I nomi sono case-sensitive

### "Authentication failed"
- Il token potrebbe essere scaduto
- Rigenera il token sulla piattaforma

### "Permission denied"
- Il token non ha i permessi necessari
- Ricrea il token con i permessi corretti

### "Repository not found"
- Verifica che il repository esista
- Controlla l'URL del repository

---

## 📊 Riepilogo Secret per Piattaforma

| Piattaforma | Secret Necessari |
|-------------|------------------|
| **Vercel** | VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID |
| **Netlify** | NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID |
| **Cloudflare** | CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID |
| **Docker Hub** | DOCKERHUB_USERNAME, DOCKERHUB_TOKEN |
| **npm** | NPM_TOKEN |
| **AWS** | AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, CLOUDFRONT_DISTRIBUTION_ID |
| **Azure** | AZURE_STATIC_WEB_APPS_API_TOKEN |
| **Google Cloud** | GCP_WORKLOAD_IDENTITY_PROVIDER, GCP_SERVICE_ACCOUNT, GCP_REGION |
| **Heroku** | HEROKU_API_KEY, HEROKU_APP_NAME, HEROKU_EMAIL |
| **Fly.io** | FLY_API_TOKEN |
| **Railway** | RAILWAY_TOKEN |
| **Render** | RENDER_DEPLOY_HOOK |

---

## 💡 Suggerimenti

1. **Inizia con una piattaforma** - Configura prima Vercel o Netlify (più semplici)
2. **Testa il deploy** - Fai un push e verifica che funzioni
3. **Aggiungi altre piattaforme** - Una volta che una funziona, aggiungi le altre
4. **Salva i token** - Tieni una copia dei token in un posto sicuro (password manager)
5. **Revoca se necessario** - Puoi sempre revocare un token se compromesso

---

<div align="center">

**🔐 Secret configurati = Deploy automatico! 🚀**

© 2024 CertTrust. Tutti i diritti riservati.

</div>
