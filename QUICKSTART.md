# 🚀 Quick Start - Pubblica il Tuo Sito in 5 Minuti

## ⚡ Metodo Ultra-Rapido (Consigliato)

### 1️⃣ Esegui il Setup Wizard

```bash
# Rendi lo script eseguibile
chmod +x setup-wizard.sh

# Avvia il wizard interattivo
./setup-wizard.sh
```

**Il wizard ti guiderà automaticamente attraverso:**
- ✅ Verifica dei prerequisiti
- ✅ Installazione delle dipendenze
- ✅ Configurazione GitHub
- ✅ Scelta delle piattaforme
- ✅ Configurazione automatica
- ✅ Setup del deploy automatico

### 2️⃣ Pubblica il Sito

Dopo il wizard, pubblica con un solo comando:

```bash
# Pubblica su tutte le piattaforme
./publish.sh all

# Oppure su una piattaforma specifica
./publish.sh vercel
./publish.sh netlify
./publish.sh github
```

---

## 🎯 Metodo Manuale (Se Preferisci)

### Opzione A: Vercel (Più Semplice - 2 minuti)

```bash
# 1. Installa Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

**Risultato:** Il tuo sito è online in 30 secondi! 🎉

---

### Opzione B: Netlify (2 minuti)

```bash
# 1. Installa Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod --dir=dist
```

**Risultato:** Sito online con form e funzioni serverless! 🎉

---

### Opzione C: GitHub Pages (3 minuti)

```bash
# 1. Installa gh-pages
npm install -g gh-pages

# 2. Deploy
gh-pages -d dist
```

**Risultato:** Sito su `https://tuo-username.github.io/nome-repo` 🎉

---

### Opzione D: Docker (5 minuti)

```bash
# 1. Build
docker build -t certtrust:latest .

# 2. Login a Docker Hub
docker login

# 3. Tag e push
docker tag certtrust:latest tuo-username/certtrust:latest
docker push tuo-username/certtrust:latest

# 4. Esegui localmente (opzionale)
docker run -p 80:80 tuo-username/certtrust:latest
```

**Risultato:** Container pronto per qualsiasi cloud! 🎉

---

## 🌍 Deploy Automatico con GitHub Actions

### 1. Carica il Codice su GitHub

```bash
# Inizializza Git (se non fatto)
git init
git add .
git commit -m "Initial commit"

# Crea repository su GitHub
# Vai su: https://github.com/new
# Crea un nuovo repository

# Collega e push
git remote add origin https://github.com/tuo-username/certtrust.git
git push -u origin main
```

### 2. Configura i Secret su GitHub

Vai su: **GitHub → Settings → Secrets and variables → Actions**

Aggiungi i secret per le piattaforme che vuoi usare:

#### Vercel
```
VERCEL_TOKEN=xxxxxxxxxxxxx
VERCEL_ORG_ID=xxxxxxxxxxxxx
VERCEL_PROJECT_ID=xxxxxxxxxxxxx
```

#### Netlify
```
NETLIFY_AUTH_TOKEN=xxxxxxxxxxxxx
NETLIFY_SITE_ID=xxxxxxxxxxxxx
```

#### Docker Hub
```
DOCKERHUB_USERNAME=tuo-username
DOCKERHUB_TOKEN=xxxxxxxxxxxxx
```

### 3. Deploy Automatico!

Ora ogni push su `main` deployerà automaticamente su tutte le piattaforme configurate! 🚀

---

## 📱 Da Smartphone

### Android (Termux)

```bash
# 1. Installa Termux dal Play Store o F-Droid

# 2. Apri Termux e esegui:
pkg update && pkg upgrade
pkg install nodejs git

# 3. Clona il repository
git clone https://github.com/tuo-username/certtrust.git
cd certtrust

# 4. Esegui il wizard
chmod +x setup-wizard.sh
./setup-wizard.sh

# 5. Pubblica
./publish.sh all
```

### iOS

**Opzione 1: SSH a PC remoto**
```bash
# 1. Installa Termius o Blink Shell dall'App Store

# 2. Connettiti al tuo PC via SSH

# 3. Esegui i comandi sul PC
cd certtrust
./publish.sh all
```

**Opzione 2: GitHub Actions (Nessun comando!)**
```bash
# 1. Carica il codice su GitHub (da browser)

# 2. Configura i secret (da browser)

# 3. GitHub deployerà automaticamente!
```

---

## 🎓 Quale Piattaforma Scegliere?

| Piattaforma | Tempo | Difficoltà | Ideale per |
|-------------|-------|------------|------------|
| **Vercel** | 2 min | ⭐ | Deploy rapido, React |
| **Netlify** | 2 min | ⭐ | Siti statici, form |
| **GitHub Pages** | 3 min | ⭐ | Open source, gratis |
| **Cloudflare** | 3 min | ⭐ | Performance globale |
| **Docker** | 5 min | ⭐⭐ | Container, cloud |
| **AWS** | 10 min | ⭐⭐⭐ | Enterprise |

---

## 🆘 Problemi?

### "Permission denied"
```bash
chmod +x setup-wizard.sh
chmod +x publish.sh
```

### "command not found: npm"
```bash
# Installa Node.js da: https://nodejs.org/
```

### "npm install" fallisce
```bash
rm -rf node_modules package-lock.json
npm install
```

### Serve aiuto?
- 📧 Email: support@certtrust.com
- 💬 Discord: [discord.gg/certtrust](https://discord.gg/certtrust)
- 📚 Docs: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## ✅ Checklist Finale

- [ ] Node.js installato
- [ ] Git installato
- [ ] Account GitHub creato
- [ ] Setup wizard eseguito
- [ ] Piattaforme configurate
- [ ] Sito pubblicato! 🎉

---

<div align="center">

**🎉 Il tuo sito CertTrust è online! 🌍**

© 2024 CertTrust. Tutti i diritti riservati.

</div>
