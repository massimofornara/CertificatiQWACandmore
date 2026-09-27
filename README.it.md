# CertTrust - Certificati Digitali QWAC, PSD2 & eIDAS

<div align="center">

![Versione](https://img.shields.io/badge/versione-1.0.0-blue.svg)
![Licenza](https://img.shields.io/badge/licenza-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Piattaforma professionale per l'ottenimento gratuito di certificati digitali qualificati in ambiente di produzione**

[🇬🇧 English](README.md) • [🇮🇹 Italiano](#certtrust---certificati-digitali-qwac-psd2--eidas) • [🇩🇪 Deutsch](README.de.md) • [🇪🇸 Español](README.es.md) • [🇫🇷 Français](README.fr.md) • [🇵🇹 Português](README.pt.md) • [🇨🇳 中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇸🇦 العربية](README.ar.md) • [🇷🇺 Русский](README.ru.md) • [🇵🇰 اردو](README.ur.md) • [🇮🇳 हिन्दी](README.hi.md) • [🇮🇪 Gaeilge](README.ga.md) • [🇰🇷 한국어](README.ko.md)

[Inizia Ora](#installazione) • [Documentazione](#documentazione) • [Demo](#demo) • [Contribuire](#contribuire)

</div>

---

## 📋 Indice

- [Panoramica](#panoramica)
- [Caratteristiche Principali](#caratteristiche-principali)
- [Certificati Disponibili](#certificati-disponibili)
- [Per Chi è](#per-chi-è)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Architettura](#architettura)
- [Struttura del Progetto](#struttura-del-progetto)
- [Tecnologie](#tecnologie)
- [Sicurezza e Conformità](#sicurezza-e-conformità)
- [FAQ](#faq)
- [Contribuire](#contribuire)
- [Licenza](#licenza)
- [Supporto](#supporto)

---

## 🎯 Panoramica

**CertTrust** è una piattaforma web moderna e professionale che consente a banche, istituti di pagamento, TPP (Third Party Provider) e organizzazioni finanziarie di ottenere **gratuitamente** certificati digitali qualificati in **ambiente di produzione**.

A differenza di altre soluzioni che forniscono solo certificati di test o sandbox, CertTrust emette certificati reali, pronti per l'uso immediato con qualsiasi istituzione bancaria e finanziaria in Europa, conformi ai regolamenti **PSD2** e **eIDAS**.

### Perché CertTrust?

| Caratteristica | CertTrust | Altri Servizi |
|----------------|-----------|---------------|
| Ambiente | ✅ **Produzione** | ❌ Test/Sandbox |
| Validità | ✅ **Ogni istituzione UE** | ⚠️ Limitata |
| Costo | ✅ **Gratuito** | ❌ A pagamento |
| Conformità | ✅ **PSD2 + eIDAS** | ⚠️ Parziale |
| Emissione | ✅ **Immediata** | ❌ Giorni/settimane |

---

## ✨ Caratteristiche Principali

### 🏭 Ambiente di Produzione Reale
- Certificati emessi in produzione, non in ambiente di test
- Pronti per l'uso immediato con API bancarie reali
- Valore legale completo in tutta l'Unione Europea

### 🏦 Validità Universale
- Accettati da **tutte le istituzioni finanziarie** in Europa
- Banche commerciali, istituti di pagamento, ASPSP, AISP, PISP
- Fintech, neobanche, assicurazioni, pubblica amministrazione

### ⚡ Emissione Immediata
- Ricevi i certificati in pochi minuti
- Nessun processo di approvazione lungo
- Download immediato dopo la validazione del codice

### 🔒 Sicurezza Massima
- Chiavi crittografiche a 2048/4096 bit
- Algoritmi SHA-256 e superiori
- Emessi da QTSP (Qualified Trust Service Provider) autorizzati

### 🇪🇺 Conformità Europea
- 100% conformi al regolamento eIDAS (UE) n. 910/2014
- Compliance completa con PSD2 (Payment Services Directive 2)
- Rispetto degli standard EBA (European Banking Authority)

### 💰 100% Gratuito
- Nessun costo nascosto
- Nessun abbonamento
- Inserisci il codice e ottieni tutti i certificati

---

## 📜 Certificati Disponibili (7 in Totale)

### 1. QWAC - Qualified Website Authentication Certificate
**Autenticazione sicura del sito web**

Il QWAC è un certificato digitale qualificato che autentica l'identità di un sito web e garantisce comunicazioni sicure TLS/SSL. Secondo la PSD2, tutti gli istituti di pagamento devono utilizzare QWAC per le comunicazioni con le API bancarie.

**Caratteristiche:**
- Autenticazione del sito web
- Crittografia TLS/SSL
- Obbligatorio per istituti finanziari (PSD2)
- Valore legale in tutta l'UE

**Utilizzo:**
```
Connessioni mTLS alle API bancarie
Autenticazione server-side
Comunicazioni sicure PSD2
```

---

### 2. PSD2 Certificates
**Certificati per Third Party Providers**

Certificati specifici per TPP che operano nell'ambito della Payment Services Directive 2. Includono i ruoli PSP_AS, PSP_IC e PSP_PI necessari per accedere alle API Open Banking.

**Ruoli supportati:**
- **PSP_AS** (Account Servicing) - Accesso ai conti
- **PSP_IC** (Card Issuing) - Emissione carte
- **PSP_PI** (Payment Initiation) - Iniziazione pagamenti

**Utilizzo:**
```
Accesso API Open Banking
Servizi AISP (Account Information)
Servizi PISP (Payment Initiation)
```

---

### 3. eIDAS Certificates
**Electronic Identification and Trust Services**

Certificati conformi al regolamento europeo eIDAS per l'identificazione elettronica e i servizi fiduciari qualificati. Riconosciuti automaticamente in tutti gli stati membri dell'UE.

**Caratteristiche:**
- Identificazione elettronica qualificata
- Servizi fiduciari qualificati
- Valore legale equivalente ai documenti cartacei
- Riconosciuti in 27 stati membri UE

**Utilizzo:**
```
Firma elettronica qualificata
Identificazione digitale
Transazioni legali in UE
```

---

### 4. QSealC - Qualified Electronic Seal Certificate
**Sigillo elettronico per persone giuridiche**

Il QSealC è un sigillo elettronico qualificato per persone giuridiche. Garantisce l'origine e l'integrità dei documenti elettronici con valore legale in tutta l'UE.

**Caratteristiche:**
- Sigillo elettronico qualificato
- Per persone giuridiche (aziende, enti)
- Garantisce origine e integrità
- Valore legale in tutta l'UE

**Utilizzo:**
```
Firma documenti aziendali
Certificazione origine documenti
Integrità dati sensibili
```

---

### 5. QWAC per TPP
**QWAC specifico per Third Party Providers**

Certificato QWAC con estensioni PSD2 nei campi dei privilegi. Richiesto per l'accesso alle API Open Banking con autenticazione mTLS.

**Caratteristiche:**
- QWAC con ruoli PSD2 (PSP_AS, PSP_IC, PSP_PI)
- Autenticazione mTLS
- Specifico per TPP
- Conforme EBA RTS

**Utilizzo:**
```
Autenticazione TPP alle API bancarie
mTLS per Open Banking
Comunicazioni sicure PSD2
```

---

### 6. QSealC per TPP
**Sigillo elettronico per Third Party Providers**

Sigillo elettronico qualificato per TPP con estensioni PSD2. Utilizzato per firmare le richieste alle API bancarie e garantire autenticità e non ripudio.

**Caratteristiche:**
- Sigillo elettronico per TPP
- Estensioni PSD2
- Firma richieste API
- Non ripudio delle transazioni

**Utilizzo:**
```
Firma richieste API bancarie
Autenticazione transazioni
Non ripudio operazioni
```

---

### 7. QWAC SAN - Qualified Website Authentication Certificate con Subject Alternative Name
**Autenticazione sicura multi-dominio del sito web**

Il QWAC SAN è un certificato digitale qualificato che autentica l'identità di un sito web e garantisce comunicazioni sicure TLS/SSL, con supporto per più domini tramite Subject Alternative Name (SAN). Questo permette di proteggere più domini e sottodomini con un singolo certificato, ideale per istituzioni bancarie con infrastrutture complesse e multiple presence online.

**Caratteristiche:**
- Autenticazione multi-dominio tramite SAN
- Crittografia TLS/SSL per più domini
- Supporto wildcard (*.example.com)
- Obbligatorio per istituti finanziari (PSD2)
- Valore legale in tutta l'UE
- Ideale per infrastrutture bancarie complesse

**Utilizzo:**
```
Connessioni mTLS multi-dominio alle API bancarie
Autenticazione server-side su più domini
Comunicazioni sicure PSD2 per servizi multipli
Certificato wildcard per protezione sottodomini
```

---

## 👥 Per Chi è

CertTrust è progettato per:

### 🏦 Istituti Finanziari
- **Banche Commerciali** - Autenticazione sicura e conformità PSD2
- **Istituti di Pagamento (IP)** - Accesso API e servizi di pagamento
- **Istituti di Moneta Elettronica (IME)** - Emissione moneta elettronica
- **Neobanche** - Servizi digitali innovativi

### 🔄 Third Party Providers (TPP)
- **AISP** (Account Information Service Providers) - Aggregazione conti
- **PISP** (Payment Initiation Service Providers) - Iniziazione pagamenti
- **ASPSP** (Account Servicing PSP) - Gestione conti
- **Aggregatori** - Servizi di aggregazione finanziaria

### 💼 Aziende e Organizzazioni
- **Fintech** - Startup e scale-up del settore finanziario
- **Corporate** - Grandi aziende con esigenze finanziarie
- **Pubblica Amministrazione** - Enti pubblici europei
- **Assicurazioni** - Compagnie assicurative

---

## 🚀 Installazione

### Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (o yarn >= 1.22.0)
- **Git** (opzionale, per clonare il repository)

### Installazione Rapida

```bash
# Clona il repository
git clone https://github.com/yourusername/certtrust.git

# Entra nella directory del progetto
cd certtrust

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile all'indirizzo `http://localhost:5173`

### Build per Produzione

```bash
# Build di produzione
npm run build

# Anteprima della build
npm run preview
```

I file ottimizzati saranno generati nella directory `dist/`

---

## 💻 Utilizzo

### Per Utenti Finali

1. **Visita il sito web** - Apri il browser e naviga all'URL dell'applicazione
2. **Inserisci il codice promozionale** - Scorri fino alla sezione "Inserisci il Tuo Codice"
3. **Verifica l'identità** - Completa la verifica dell'identità aziendale
4. **Scarica i certificati** - Riceverai i certificati via email entro pochi minuti

### Per Sviluppatori

```bash
# Avvia il server di sviluppo con hot-reload
npm run dev
```

---

## 🏗️ Architettura

### Stack Tecnologico

```
┌─────────────────────────────────────────┐
│         Frontend Application            │
├─────────────────────────────────────────┤
│  React 18 + TypeScript                  │
│  Tailwind CSS 4                         │
│  Vite 6                                 │
└─────────────────────────────────────────┘
```

---

## 📁 Struttura del Progetto

```
certtrust/
├── public/                 # Asset statici
├── src/                    # Codice sorgente
│   ├── App.tsx            # Componente principale
│   ├── main.tsx           # Entry point
│   └── index.css          # Stili globali
├── dist/                   # Build di produzione
├── index.html             # Template HTML
├── package.json           # Dipendenze e script
├── tsconfig.json          # Configurazione TypeScript
├── vite.config.ts         # Configurazione Vite
└── README.md              # Documentazione
```

---

## 🛠️ Tecnologie

| Tecnologia | Versione | Descrizione |
|------------|----------|-------------|
| **React** | 18.x | Libreria UI per interfacce utente |
| **TypeScript** | 5.x | JavaScript con tipizzazione statica |
| **Vite** | 6.x | Build tool ultra-veloce |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |

---

## 🔐 Sicurezza e Conformità

### Standard di Sicurezza

#### 🔒 Crittografia
- **Algoritmi**: RSA 2048/4096 bit, ECDSA
- **Hash**: SHA-256, SHA-384, SHA-512
- **Protocolli**: TLS 1.2, TLS 1.3
- **Certificati**: X.509 v3

#### 📋 Conformità Normativa

**eIDAS (Regolamento UE n. 910/2014)**
- Identificazione elettronica
- Servizi fiduciari qualificati
- Riconoscimento transfrontaliero

**PSD2 (Payment Services Directive 2)**
- Strong Customer Authentication (SCA)
- Common and Secure Communication (CSC)
- RTS on SCA and CSC (EBA/RTS/2017)

#### 🏛️ QTSP Autorizzati
I certificati sono emessi da **Qualified Trust Service Provider** autorizzati e supervisionati dalle autorità nazionali competenti.

### Protezione Dati

- **GDPR Compliant**: Rispetto del Regolamento Generale sulla Protezione dei Dati
- **Data Encryption**: Tutti i dati sensibili sono crittografati
- **Secure Transmission**: Comunicazioni protette con TLS
- **Privacy by Design**: Architettura orientata alla privacy

---

## ❓ FAQ

**D: I certificati sono davvero gratuiti?**
R: Sì, i certificati sono 100% gratuiti. Inserisci il codice promozionale e ricevi tutti i certificati senza alcun costo.

**D: I certificati sono in produzione o in test?**
R: I certificati sono in **ambiente di produzione reale**. Non sono certificati sandbox o di test.

**D: Per quali istituzioni sono validi i certificati?**
R: I certificati sono validi per **ogni istituzione finanziaria** in Europa: banche, istituti di pagamento, ASPSP, AISP, PISP, fintech, neobanche, assicurazioni, pubblica amministrazione.

**D: I certificati sono riconosciuti in tutta Europa?**
R: Sì, i certificati eIDAS sono riconosciuti automaticamente in tutti i 27 stati membri dell'Unione Europea.

---

## 🤝 Contribuire

I contributi sono benvenuti! Segui questi passaggi:

1. **Fork il repository**
2. **Crea un branch per la tua feature**: `git checkout -b feature/nome-feature`
3. **Effettua le modifiche** e commit: `git commit -m "Aggiunta nuova feature"`
4. **Push al branch**: `git push origin feature/nome-feature`
5. **Apri una Pull Request**

---

## 📄 Licenza

Questo progetto è distribuito sotto licenza **MIT**.

---

## 📞 Supporto

- 📧 **Email**: support@certtrust.com
- 💬 **Chat**: Disponibile sul sito web
- 📚 **Documentazione**: [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/certtrust/issues)

---

<div align="center">

**Realizzato con ❤️ per il settore finanziario europeo**

[Website](https://certtrust.com) • [Documentation](https://docs.certtrust.com) • [Support](mailto:support@certtrust.com)

© 2024 CertTrust. Tutti i diritti riservati.

</div>
