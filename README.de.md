# CertTrust - Digitale Zertifikate QWAC, PSD2 & eIDAS

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Lizenz](https://img.shields.io/badge/lizenz-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Professionelle Plattform für den kostenlosen Erhalt qualifizierter digitaler Zertifikate in der Produktionsumgebung**

[🇬🇧 English](README.md) • [🇮🇹 Italiano](README.it.md) • [🇩🇪 Deutsch](#certtrust---digitale-zertifikate-qwac-psd2--eidas) • [🇪🇸 Español](README.es.md) • [🇫🇷 Français](README.fr.md) • [🇵🇹 Português](README.pt.md) • [🇨🇳 中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇸🇦 العربية](README.ar.md) • [🇷🇺 Русский](README.ru.md) • [🇵🇰 اردو](README.ur.md) • [🇮🇳 हिन्दी](README.hi.md) • [🇮🇪 Gaeilge](README.ga.md) • [🇰🇷 한국어](README.ko.md)

[Jetzt Starten](#installation) • [Dokumentation](#dokumentation) • [Demo](#demo) • [Mitwirken](#mitwirken)

</div>

---

## 📋 Inhaltsverzeichnis

- [Überblick](#überblick)
- [Hauptfunktionen](#hauptfunktionen)
- [Verfügbare Zertifikate](#verfügbare-zertifikate)
- [Für Wen](#für-wen)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Architektur](#architektur)
- [Projektstruktur](#projektstruktur)
- [Technologien](#technologien)
- [Sicherheit & Konformität](#sicherheit--konformität)
- [FAQ](#faq)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)
- [Support](#support)

---

## 🎯 Überblick

**CertTrust** ist eine moderne, professionelle Webplattform, die es Banken, Zahlungsinstituten, TPPs (Third Party Providern) und Finanzorganisationen ermöglicht, **kostenlos** qualifizierte digitale Zertifikate in einer **Produktionsumgebung** zu erhalten.

Im Gegensatz zu anderen Lösungen, die nur Test- oder Sandbox-Zertifikate bereitstellen, stellt CertTrust echte Zertifikate aus, die sofort mit jeder Bank- und Finanzinstitution in Europa verwendet werden können und den Vorschriften **PSD2** und **eIDAS** entsprechen.

### Warum CertTrust?

| Funktion | CertTrust | Andere Dienste |
|----------|-----------|----------------|
| Umgebung | ✅ **Produktion** | ❌ Test/Sandbox |
| Gültigkeit | ✅ **Jede EU-Institution** | ⚠️ Eingeschränkt |
| Kosten | ✅ **Kostenlos** | ❌ Kostenpflichtig |
| Konformität | ✅ **PSD2 + eIDAS** | ⚠️ Teilweise |
| Ausstellung | ✅ **Sofort** | ❌ Tage/Wochen |

---

## ✨ Hauptfunktionen

### 🏭 Echte Produktionsumgebung
- Zertifikate in der Produktion ausgestellt, nicht in der Testumgebung
- Sofort einsatzbereit mit echten Banking-APIs
- Voller rechtlicher Wert in der gesamten Europäischen Union

### 🏦 Universelle Gültigkeit
- Akzeptiert von **allen Finanzinstitutionen** in Europa
- Geschäftsbanken, Zahlungsinstitute, ASPSP, AISP, PISP
- Fintech, Neobanken, Versicherungen, öffentliche Verwaltung

### ⚡ Sofortige Ausstellung
- Erhalten Sie Zertifikate in wenigen Minuten
- Kein langwieriger Genehmigungsprozess
- Sofortiger Download nach Code-Validierung

### 🔒 Maximale Sicherheit
- Kryptografische Schlüssel mit 2048/4096 Bit
- SHA-256 Algorithmen und höher
- Ausgestellt von autorisierten QTSP (Qualified Trust Service Provider)

### 🇪🇺 Europäische Konformität
- 100% konform mit der eIDAS-Verordnung (EU) Nr. 910/2014
- Volle Konformität mit PSD2 (Payment Services Directive 2)
- Einhaltung der EBA-Standards (European Banking Authority)

### 💰 100% Kostenlos
- Keine versteckten Kosten
- Kein Abonnement
- Geben Sie den Code ein und erhalten Sie alle Zertifikate

---

## 📜 Verfügbare Zertifikate

### 1. QWAC - Qualified Website Authentication Certificate
**Sichere Website-Authentifizierung**

Das QWAC ist ein qualifiziertes digitales Zertifikat, das die Identität einer Website authentifiziert und sichere TLS/SSL-Kommunikation garantiert. Gemäß PSD2 müssen alle Zahlungsinstitute QWAC für die Kommunikation mit Banking-APIs verwenden.

### 2. PSD2-Zertifikate
**Zertifikate für Third Party Provider**

Spezifische Zertifikate für TPPs, die unter der Payment Services Directive 2 arbeiten. Sie enthalten die Rollen PSP_AS, PSP_IC und PSP_PI, die für den Zugriff auf Open-Banking-APIs erforderlich sind.

### 3. eIDAS-Zertifikate
**Elektronische Identifizierung und Vertrauensdienste**

Zertifikate gemäß der europäischen eIDAS-Verordnung für elektronische Identifizierung und qualifizierte Vertrauensdienste. Automatisch in allen EU-Mitgliedstaaten anerkannt.

### 4. QSealC - Qualified Electronic Seal Certificate
**Elektronisches Siegel für juristische Personen**

Das QSealC ist ein qualifiziertes elektronisches Siegel für juristische Personen. Es garantiert die Herkunft und Integrität elektronischer Dokumente mit rechtlicher Wertigkeit in der gesamten EU.

### 5. QWAC für TPP
**QWAC speziell für Third Party Provider**

QWAC-Zertifikat mit PSD2-Erweiterungen in den Berechtigungsfeldern. Erforderlich für den Open-Banking-API-Zugriff mit mTLS-Authentifizierung.

### 6. QSealC für TPP
**Elektronisches Siegel für Third Party Provider**

Qualifiziertes elektronisches Siegel für TPPs mit PSD2-Erweiterungen. Wird verwendet, um Anfragen an Banking-APIs zu signieren und Authentizität und Nicht-Abstreitbarkeit zu garantieren.

---

## 👥 Für Wen

CertTrust ist konzipiert für:

### 🏦 Finanzinstitutionen
- **Geschäftsbanken** - Sichere Authentifizierung und PSD2-Konformität
- **Zahlungsinstitute (PI)** - API-Zugang und Zahlungsdienste
- **E-Geld-Institute (EMI)** - Ausgabe von elektronischem Geld
- **Neobanken** - Innovative digitale Dienste

### 🔄 Third Party Provider (TPP)
- **AISP** (Account Information Service Providers) - Kontoaggregation
- **PISP** (Payment Initiation Service Providers) - Zahlungsauslösung
- **ASPSP** (Account Servicing PSP) - Kontoverwaltung
- **Aggregatoren** - Finanzaggregationsdienste

### 💼 Unternehmen und Organisationen
- **Fintech** - Startups und Scale-ups im Finanzsektor
- **Corporate** - Große Unternehmen mit finanziellem Bedarf
- **Öffentliche Verwaltung** - Europäische öffentliche Einrichtungen
- **Versicherungen** - Versicherungsunternehmen

---

## 🚀 Installation

### Voraussetzungen

Stellen Sie sicher, dass Sie installiert haben:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (oder yarn >= 1.22.0)
- **Git** (optional, zum Klonen des Repositorys)

### Schnellinstallation

```bash
# Repository klonen
git clone https://github.com/yourusername/certtrust.git

# In das Projektverzeichnis wechseln
cd certtrust

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist unter `http://localhost:5173` verfügbar.

### Produktions-Build

```bash
# Produktions-Build
npm run build

# Build-Vorschau
npm run preview
```

---

## 💻 Verwendung

### Für Endbenutzer

1. **Website besuchen** - Öffnen Sie den Browser und navigieren Sie zur Anwendungs-URL
2. **Promo-Code eingeben** - Scrollen Sie zum Abschnitt "Code eingeben"
3. **Identität verifizieren** - Schließen Sie die Unternehmensidentitätsprüfung ab
4. **Zertifikate herunterladen** - Sie erhalten die Zertifikate innerhalb weniger Minuten per E-Mail

### Für Entwickler

```bash
# Entwicklungsserver mit Hot-Reload starten
npm run dev
```

---

## 🏗️ Architektur

### Technologie-Stack

```
┌─────────────────────────────────────────┐
│         Frontend-Anwendung              │
├─────────────────────────────────────────┤
│  React 18 + TypeScript                  │
│  Tailwind CSS 4                         │
│  Vite 6                                 │
└─────────────────────────────────────────┘
```

---

## 📁 Projektstruktur

```
certtrust/
├── public/                 # Statische Assets
├── src/                    # Quellcode
│   ├── App.tsx            # Hauptkomponente
│   ├── main.tsx           # Einstiegspunkt
│   └── index.css          # Globale Stile
├── dist/                   # Produktions-Build
├── index.html             # HTML-Vorlage
├── package.json           # Abhängigkeiten und Skripte
├── tsconfig.json          # TypeScript-Konfiguration
├── vite.config.ts         # Vite-Konfiguration
└── README.md              # Dokumentation
```

---

## 🛠️ Technologien

| Technologie | Version | Beschreibung |
|-------------|---------|--------------|
| **React** | 18.x | UI-Bibliothek für Benutzeroberflächen |
| **TypeScript** | 5.x | JavaScript mit statischer Typisierung |
| **Vite** | 6.x | Ultra-schnelles Build-Tool |
| **Tailwind CSS** | 4.x | Utility-First CSS-Framework |

---

## 🔐 Sicherheit & Konformität

### Sicherheitsstandards

#### 🔒 Verschlüsselung
- **Algorithmen**: RSA 2048/4096 Bit, ECDSA
- **Hash**: SHA-256, SHA-384, SHA-512
- **Protokolle**: TLS 1.2, TLS 1.3
- **Zertifikate**: X.509 v3

#### 📋 Regulatorische Konformität

**eIDAS (EU-Verordnung Nr. 910/2014)**
- Elektronische Identifizierung
- Qualifizierte Vertrauensdienste
- Grenzüberschreitende Anerkennung

**PSD2 (Payment Services Directive 2)**
- Strong Customer Authentication (SCA)
- Common and Secure Communication (CSC)
- RTS on SCA and CSC (EBA/RTS/2017)

#### 🏛️ Autorisierte QTSP
Die Zertifikate werden von **Qualified Trust Service Providern** ausgestellt, die von den zuständigen nationalen Behörden autorisiert und beaufsichtigt werden.

### Datenschutz

- **DSGVO-konform**: Einhaltung der Datenschutz-Grundverordnung
- **Datenverschlüsselung**: Alle sensiblen Daten sind verschlüsselt
- **Sichere Übertragung**: Kommunikation mit TLS geschützt
- **Privacy by Design**: Datenschutzorientierte Architektur

---

## ❓ FAQ

**F: Sind die Zertifikate wirklich kostenlos?**
A: Ja, die Zertifikate sind 100% kostenlos. Geben Sie den Promo-Code ein und erhalten Sie alle Zertifikate ohne Kosten.

**F: Sind die Zertifikate in der Produktion oder im Test?**
A: Die Zertifikate befinden sich in einer **echten Produktionsumgebung**. Es sind keine Sandbox- oder Testzertifikate.

**F: Für welche Institutionen sind die Zertifikate gültig?**
A: Die Zertifikate sind für **jede Finanzinstitution** in Europa gültig: Banken, Zahlungsinstitute, ASPSP, AISP, PISP, Fintech, Neobanken, Versicherungen, öffentliche Verwaltung.

**F: Sind die Zertifikate in ganz Europa anerkannt?**
A: Ja, eIDAS-Zertifikate werden automatisch in allen 27 Mitgliedstaaten der Europäischen Union anerkannt.

---

## 🤝 Mitwirken

Beiträge sind willkommen! Folgen Sie diesen Schritten:

1. **Repository forken**
2. **Branch erstellen**: `git checkout -b feature/feature-name`
3. **Änderungen vornehmen** und committen: `git commit -m "Neue Funktion hinzugefügt"`
4. **Zum Branch pushen**: `git push origin feature/feature-name`
5. **Pull Request öffnen**

---

## 📄 Lizenz

Dieses Projekt wird unter der **MIT**-Lizenz vertrieben.

---

## 📞 Support

- 📧 **E-Mail**: support@certtrust.com
- 💬 **Chat**: Auf der Website verfügbar
- 📚 **Dokumentation**: [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/certtrust/issues)

---

<div align="center">

**Mit ❤️ für den europäischen Finanzsektor entwickelt**

[Website](https://certtrust.com) • [Dokumentation](https://docs.certtrust.com) • [Support](mailto:support@certtrust.com)

© 2024 CertTrust. Alle Rechte vorbehalten.

</div>
