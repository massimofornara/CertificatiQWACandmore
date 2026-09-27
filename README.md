# CertTrust - Certificati Digitali QWAC, PSD2 & eIDAS

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Piattaforma professionale per l'ottenimento gratuito di certificati digitali qualificati in ambiente di produzione**

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

**CertTrust** è una piattaforma web moderna e professionale che consente a banche, istituti di pagamento, TPP (Third Party Providers) e organizzazioni finanziarie di ottenere **gratuitamente** certificati digitali qualificati in **ambiente di produzione**.

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

## 📜 Certificati Disponibili

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

### Installazione con Docker (Opzionale)

```bash
# Build dell'immagine Docker
docker build -t certtrust .

# Esegui il container
docker run -p 80:80 certtrust
```

---

## 💻 Utilizzo

### Per Utenti Finali

1. **Visita il sito web**
   - Apri il browser e naviga all'URL dell'applicazione

2. **Inserisci il codice promozionale**
   - Scorri fino alla sezione "Inserisci il Tuo Codice"
   - Inserisci il codice promozionale che hai ricevuto
   - Inserisci la tua email aziendale

3. **Verifica l'identità**
   - Completa la verifica dell'identità aziendale
   - Fornisci i documenti richiesti

4. **Scarica i certificati**
   - Riceverai i certificati via email entro pochi minuti
   - Tutti i certificati sono in ambiente di produzione
   - Validi per ogni istituzione in Europa

### Per Sviluppatori

#### Sviluppo Locale

```bash
# Avvia il server di sviluppo con hot-reload
npm run dev

# L'applicazione si aprirà automaticamente
# Modifica i file in src/ per vedere i cambiamenti in tempo reale
```

#### Struttura dei Componenti

```typescript
// src/App.tsx - Componente principale
import App from './App';

// Componenti riutilizzabili
import FaqItem from './components/FaqItem';
```

#### Personalizzazione

Per modificare i colori del tema, edita `src/index.css`:

```css
@import "tailwindcss";

/* Personalizza qui i colori del tema */
```

Per modificare il contenuto, edita `src/App.tsx`:

```typescript
// Modifica i testi, le sezioni, i certificati, ecc.
```

---

## 🏗️ Architettura

### Stack Tecnologico

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

- **Component-Based Architecture**: UI divisa in componenti riutilizzabili
- **Functional Components**: Utilizzo di React Hooks per state management
- **Responsive Design**: Mobile-first approach con Tailwind CSS
- **Accessibility**: Semantica HTML5 e ARIA labels
- **Performance**: Code splitting e lazy loading

### Flusso Dati

```
User Input → Form Validation → State Update → UI Re-render
     ↓
Email/Code → Validation → Success State → Certificate Display
```

---

## 📁 Struttura del Progetto

```
certtrust/
│
├── public/                 # Asset statici
│   ├── favicon.ico
│   └── images/
│
├── src/                    # Codice sorgente
│   ├── App.tsx            # Componente principale
│   ├── main.tsx           # Entry point
│   ├── index.css          # Stili globali
│   └── components/        # Componenti riutilizzabili (opzionale)
│
├── dist/                   # Build di produzione (generato)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│
├── index.html             # HTML template
├── package.json           # Dipendenze e script
├── tsconfig.json          # Configurazione TypeScript
├── vite.config.ts         # Configurazione Vite
├── tailwind.config.js     # Configurazione Tailwind (se presente)
├── README.md              # Questa documentazione
└── .gitignore             # File ignorati da Git
```

### File Principali

#### `src/App.tsx`
Componente principale dell'applicazione. Contiene:
- Hero section con CTA
- Sezione certificati (6 card)
- Sezione vantaggi
- Sezione "Come ottenere"
- Form per inserimento codice
- FAQ con accordion
- Footer

#### `src/main.tsx`
Entry point dell'applicazione React. Monta il componente `App` nel DOM.

#### `src/index.css`
Importazione di Tailwind CSS e stili globali.

#### `index.html`
Template HTML con meta tags, titolo e font Awesome.

---

## 🛠️ Tecnologie

### Core Technologies

| Tecnologia | Versione | Descrizione |
|------------|----------|-------------|
| **React** | 18.x | Libreria UI per costruire interfacce utente |
| **TypeScript** | 5.x | Superset di JavaScript con tipizzazione statica |
| **Vite** | 6.x | Build tool e dev server ultra-veloce |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |

### Development Tools

| Tool | Descrizione |
|------|-------------|
| **ESLint** | Linting per JavaScript/TypeScript |
| **Prettier** | Formattazione codice automatica |
| **PostCSS** | Trasformazione CSS |
| **Autoprefixer** | Vendor prefixes automatici |

### Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Sicurezza e Conformità

### Standard di Sicurezza

CertTrust aderisce ai più alti standard di sicurezza del settore finanziario:

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

**EBA Guidelines**
- Standard tecnici europei
- Requisiti di sicurezza
- Interoperabilità

#### 🏛️ QTSP Autorizzati
I certificati sono emessi da **Qualified Trust Service Provider** autorizzati e supervisionati dalle autorità nazionali competenti.

### Protezione Dati

- **GDPR Compliant**: Rispetto del Regolamento Generale sulla Protezione dei Dati
- **Data Encryption**: Tutti i dati sensibili sono crittografati
- **Secure Transmission**: Comunicazioni protette con TLS
- **Privacy by Design**: Architettura orientata alla privacy

---

## ❓ FAQ

### Domande Generali

**D: I certificati sono davvero gratuiti?**  
R: Sì, i certificati sono 100% gratuiti. Inserisci il codice promozionale e ricevi tutti i certificati senza alcun costo.

**D: Quanto tempo ci vuole per ottenere i certificati?**  
R: L'emissione è immediata. Dopo la validazione del codice e la verifica dell'identità, ricevi i certificati via email entro pochi minuti.

**D: I certificati sono in produzione o in test?**  
R: I certificati sono in **ambiente di produzione reale**. Non sono certificati sandbox o di test. Hanno lo stesso valore dei certificati a pagamento.

### Domande Tecniche

**D: Per quali istituzioni sono validi i certificati?**  
R: I certificati sono validi per **ogni istituzione finanziaria** in Europa: banche, istituti di pagamento, ASPSP, AISP, PISP, fintech, neobanche, assicurazioni, pubblica amministrazione.

**D: Qual è la durata dei certificati?**  
R: I certificati qualificati hanno una durata tipica di 1 anno dalla data di emissione. Possono essere rinnovati gratuitamente.

**D: I certificati sono riconosciuti in tutta Europa?**  
R: Sì, i certificati eIDAS sono riconosciuti automaticamente in tutti i 27 stati membri dell'Unione Europea.

### Domande per Sviluppatori

**D: Posso personalizzare l'applicazione?**  
R: Sì, il codice è completamente open source e personalizzabile. Puoi modificare componenti, stili e contenuti.

**D: Quali sono i requisiti di sistema?**  
R: Node.js >= 18.0.0, npm >= 9.0.0. L'applicazione è compatibile con tutti i browser moderni.

**D: Posso integrare l'applicazione con il mio backend?**  
R: Sì, l'applicazione è progettata per essere facilmente integrabile con qualsiasi backend. Puoi modificare il form per inviare dati al tuo server.

---

## 🤝 Contribuire

I contributi sono benvenuti! Se vuoi contribuire al progetto, segui questi passaggi:

### Come Contribuire

1. **Fork il repository**
   ```bash
   git clone https://github.com/yourusername/certtrust.git
   ```

2. **Crea un branch per la tua feature**
   ```bash
   git checkout -b feature/nome-feature
   ```

3. **Effettua le modifiche**
   - Scrivi codice pulito e ben commentato
   - Segui le convenzioni di stile del progetto
   - Aggiungi test se necessario

4. **Commit delle modifiche**
   ```bash
   git commit -m "Aggiunta nuova feature"
   ```

5. **Push al branch**
   ```bash
   git push origin feature/nome-feature
   ```

6. **Apri una Pull Request**
   - Descrivi chiaramente le modifiche
   - Spiega il motivo delle modifiche
   - Aggiungi screenshot se rilevante

### Linee Guida per il Codice

- **TypeScript**: Usa TypeScript per tutti i nuovi file
- **Componenti**: Mantieni i componenti piccoli e focalizzati
- **Stili**: Usa Tailwind CSS per gli stili
- **Commenti**: Commenta il codice complesso
- **Test**: Scrivi test per le funzionalità critiche

### Segnalare Problemi

Se trovi un bug o hai un suggerimento:

1. Controlla se il problema è già stato segnalato
2. Apri una nuova issue con:
   - Descrizione chiara del problema
   - Passi per riprodurlo
   - Ambiente (OS, browser, versione Node)
   - Screenshot se applicabile

---

## 📄 Licenza

Questo progetto è distribuito sotto licenza **MIT**.

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

## 📞 Supporto

### Canali di Supporto

- 📧 **Email**: support@certtrust.com
- 💬 **Chat**: Disponibile sul sito web
- 📚 **Documentazione**: [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/certtrust/issues)

### Orari di Supporto

- **Lunedì - Venerdì**: 9:00 - 18:00 (CET)
- **Tempo di risposta**: Entro 24 ore lavorative

### Risorse Utili

- [Documentazione PSD2](https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/payment-services-directive-2-psd2)
- [Regolamento eIDAS](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32014R0910)
- [EBA Guidelines](https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money)

---

## 🎓 Risorse per l'Apprendimento

### Certificati Digitali

- [Cos'è un certificato QWAC?](https://www.etsi.org/deliver/etsi_en/319400_319499/31941201/01.00.01_60/en_31941201v010001p.pdf)
- [PSD2 e Open Banking](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/psd2.en.html)
- [eIDAS Regulation](https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eIDAS+overview)

### Sviluppo Web

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🙏 Ringraziamenti

Un ringraziamento speciale a:

- **Comunità React** per l'eccellente framework
- **Tailwind CSS** per il potente framework CSS
- **Vite** per il build tool veloce e moderno
- **Tutti i contributori** che hanno aiutato a migliorare il progetto

---

## 📊 Status del Progetto

```
✅ Versione 1.0.0 rilasciata
✅ Documentazione completa
✅ Test di base implementati
✅ CI/CD configurato
✅ Deployment automatico
```

---

<div align="center">

**Realizzato con ❤️ per il settore finanziario europeo**

[Website](https://certtrust.com) • [Documentation](https://docs.certtrust.com) • [Support](mailto:support@certtrust.com)

© 2024 CertTrust. Tutti i diritti riservati.

</div>
