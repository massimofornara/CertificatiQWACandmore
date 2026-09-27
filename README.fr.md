# CertTrust - Certificats Numériques QWAC, PSD2 & eIDAS

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Licence](https://img.shields.io/badge/licence-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Plateforme professionnelle pour l'obtention gratuite de certificats numériques qualifiés en environnement de production**

[🇬🇧 English](README.md) • [🇮🇹 Italiano](README.it.md) • [🇩🇪 Deutsch](README.de.md) • [🇪🇸 Español](README.es.md) • [🇫🇷 Français](#certtrust---certificats-numériques-qwac-psd2--eidas) • [🇵🇹 Português](README.pt.md) • [🇨🇳 中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇸🇦 العربية](README.ar.md) • [🇷🇺 Русский](README.ru.md)

[Commencer](#installation) • [Documentation](#documentation) • [Démo](#démo) • [Contribuer](#contribuer)

</div>

---

## 📋 Sommaire

- [Aperçu](#aperçu)
- [Caractéristiques Principales](#caractéristiques-principales)
- [Certificats Disponibles](#certificats-disponibles)
- [Pour Qui](#pour-qui)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Structure du Projet](#structure-du-projet)
- [Technologies](#technologies)
- [Sécurité et Conformité](#sécurité-et-conformité)
- [FAQ](#faq)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Support](#support)

---

## 🎯 Aperçu

**CertTrust** est une plateforme web moderne et professionnelle qui permet aux banques, institutions de paiement, TPP (Third Party Providers) et organisations financières d'obtenir **gratuitement** des certificats numériques qualifiés en **environnement de production**.

Contrairement à d'autres solutions qui ne fournissent que des certificats de test ou sandbox, CertTrust émet des certificats réels, prêts à l'emploi immédiat avec toute institution bancaire et financière en Europe, conformes aux règlements **PSD2** et **eIDAS**.

### Pourquoi CertTrust ?

| Caractéristique | CertTrust | Autres Services |
|-----------------|-----------|-----------------|
| Environnement | ✅ **Production** | ❌ Test/Sandbox |
| Validité | ✅ **Toute institution UE** | ⚠️ Limitée |
| Coût | ✅ **Gratuit** | ❌ Payant |
| Conformité | ✅ **PSD2 + eIDAS** | ⚠️ Partielle |
| Émission | ✅ **Immédiate** | ❌ Jours/semaines |

---

## ✨ Caractéristiques Principales

### 🏭 Environnement de Production Réel
- Certificats émis en production, pas en environnement de test
- Prêts pour une utilisation immédiate avec les API bancaires réelles
- Valeur juridique complète dans toute l'Union Européenne

### 🏦 Validité Universelle
- Acceptés par **toutes les institutions financières** en Europe
- Banques commerciales, institutions de paiement, ASPSP, AISP, PISP
- Fintech, néobanques, assurances, administration publique

### ⚡ Émission Immédiate
- Recevez les certificats en quelques minutes
- Pas de long processus d'approbation
- Téléchargement immédiat après validation du code

### 🔒 Sécurité Maximale
- Clés cryptographiques de 2048/4096 bits
- Algorithmes SHA-256 et supérieurs
- Émis par des QTSP (Qualified Trust Service Provider) autorisés

### 🇪🇺 Conformité Européenne
- 100% conforme au règlement eIDAS (UE) n° 910/2014
- Conformité totale avec PSD2 (Payment Services Directive 2)
- Respect des normes EBA (European Banking Authority)

### 💰 100% Gratuit
- Pas de coûts cachés
- Pas d'abonnement
- Entrez le code et obtenez tous les certificats

---

## 📜 Certificats Disponibles

### 1. QWAC - Qualified Website Authentication Certificate
**Authentification sécurisée du site web**

Le QWAC est un certificat numérique qualifié qui authentifie l'identité d'un site web et garantit des communications sécurisées TLS/SSL. Selon PSD2, toutes les institutions de paiement doivent utiliser QWAC pour les communications avec les API bancaires.

### 2. Certificats PSD2
**Certificats pour Third Party Providers**

Certificats spécifiques pour les TPP opérant dans le cadre de la Payment Services Directive 2. Ils incluent les rôles PSP_AS, PSP_IC et PSP_PI nécessaires pour accéder aux API Open Banking.

### 3. Certificats eIDAS
**Identification Électronique et Services de Confiance**

Certificats conformes au règlement européen eIDAS pour l'identification électronique et les services de confiance qualifiés. Reconnus automatiquement dans tous les États membres de l'UE.

### 4. QSealC - Qualified Electronic Seal Certificate
**Sceau électronique pour personnes morales**

Le QSealC est un sceau électronique qualifié pour les personnes morales. Il garantit l'origine et l'intégrité des documents électroniques avec valeur juridique dans toute l'UE.

### 5. QWAC pour TPP
**QWAC spécifique pour Third Party Providers**

Certificat QWAC avec extensions PSD2 dans les champs de privilèges. Requis pour l'accès aux API Open Banking avec authentification mTLS.

### 6. QSealC pour TPP
**Sceau électronique pour Third Party Providers**

Sceau électronique qualifié pour les TPP avec extensions PSD2. Utilisé pour signer les requêtes aux API bancaires et garantir l'authenticité et le non-repudiation.

---

## 👥 Pour Qui

CertTrust est conçu pour :

### 🏦 Institutions Financières
- **Banques Commerciales** - Authentification sécurisée et conformité PSD2
- **Institutions de Paiement (IP)** - Accès API et services de paiement
- **Institutions de Monnaie Électronique (IME)** - Émission de monnaie électronique
- **Néobanques** - Services numériques innovants

### 🔄 Third Party Providers (TPP)
- **AISP** (Account Information Service Providers) - Agrégation de comptes
- **PISP** (Payment Initiation Service Providers) - Initiation de paiements
- **ASPSP** (Account Servicing PSP) - Gestion de comptes
- **Agrégateurs** - Services d'agrégation financière

### 💼 Entreprises et Organisations
- **Fintech** - Startups et scale-ups du secteur financier
- **Corporate** - Grandes entreprises avec besoins financiers
- **Administration Publique** - Entités publiques européennes
- **Assurances** - Compagnies d'assurance

---

## 🚀 Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (ou yarn >= 1.22.0)
- **Git** (optionnel, pour cloner le dépôt)

### Installation Rapide

```bash
# Cloner le dépôt
git clone https://github.com/yourusername/certtrust.git

# Entrer dans le répertoire du projet
cd certtrust

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:5173`

### Build pour Production

```bash
# Build de production
npm run build

# Aperçu du build
npm run preview
```

---

## 💻 Utilisation

### Pour les Utilisateurs Finaux

1. **Visitez le site web** - Ouvrez le navigateur et naviguez vers l'URL de l'application
2. **Entrez le code promotionnel** - Défilez jusqu'à la section "Entrez Votre Code"
3. **Vérifiez l'identité** - Complétez la vérification d'identité de l'entreprise
4. **Téléchargez les certificats** - Vous recevrez les certificats par email en quelques minutes

### Pour les Développeurs

```bash
# Démarrer le serveur de développement avec hot-reload
npm run dev
```

---

## 🏗️ Architecture

### Stack Technologique

```
┌─────────────────────────────────────────┐
│         Application Frontend            │
├─────────────────────────────────────────┤
│  React 18 + TypeScript                  │
│  Tailwind CSS 4                         │
│  Vite 6                                 │
└─────────────────────────────────────────┘
```

---

## 📁 Structure du Projet

```
certtrust/
├── public/                 # Assets statiques
├── src/                    # Code source
│   ├── App.tsx            # Composant principal
│   ├── main.tsx           # Point d'entrée
│   └── index.css          # Styles globaux
├── dist/                   # Build de production
├── index.html             # Template HTML
├── package.json           # Dépendances et scripts
├── tsconfig.json          # Configuration TypeScript
├── vite.config.ts         # Configuration Vite
└── README.md              # Documentation
```

---

## 🛠️ Technologies

| Technologie | Version | Description |
|-------------|---------|-------------|
| **React** | 18.x | Bibliothèque UI pour interfaces utilisateur |
| **TypeScript** | 5.x | JavaScript avec typage statique |
| **Vite** | 6.x | Build tool ultra-rapide |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |

---

## 🔐 Sécurité et Conformité

### Standards de Sécurité

#### 🔒 Cryptographie
- **Algorithmes** : RSA 2048/4096 bits, ECDSA
- **Hash** : SHA-256, SHA-384, SHA-512
- **Protocoles** : TLS 1.2, TLS 1.3
- **Certificats** : X.509 v3

#### 📋 Conformité Réglementaire

**eIDAS (Règlement UE n° 910/2014)**
- Identification électronique
- Services de confiance qualifiés
- Reconnaissance transfrontalière

**PSD2 (Payment Services Directive 2)**
- Strong Customer Authentication (SCA)
- Common and Secure Communication (CSC)
- RTS on SCA and CSC (EBA/RTS/2017)

#### 🏛️ QTSP Autorisés
Les certificats sont émis par des **Qualified Trust Service Providers** autorisés et supervisés par les autorités nationales compétentes.

### Protection des Données

- **RGPD Conforme** : Respect du Règlement Général sur la Protection des Données
- **Cryptage des Données** : Toutes les données sensibles sont cryptées
- **Transmission Sécurisée** : Communications protégées par TLS
- **Privacy by Design** : Architecture orientée vers la confidentialité

---

## ❓ FAQ

**Q : Les certificats sont-ils vraiment gratuits ?**
R : Oui, les certificats sont 100% gratuits. Entrez le code promotionnel et recevez tous les certificats sans aucun coût.

**Q : Les certificats sont-ils en production ou en test ?**
R : Les certificats sont en **environnement de production réel**. Ce ne sont pas des certificats sandbox ou de test.

**Q : Pour quelles institutions les certificats sont-ils valables ?**
R : Les certificats sont valables pour **toute institution financière** en Europe : banques, institutions de paiement, ASPSP, AISP, PISP, fintech, néobanques, assurances, administration publique.

**Q : Les certificats sont-ils reconnus dans toute l'Europe ?**
R : Oui, les certificats eIDAS sont automatiquement reconnus dans les 27 États membres de l'Union Européenne.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Suivez ces étapes :

1. **Forkez le dépôt**
2. **Créez une branche pour votre feature** : `git checkout -b feature/nom-feature`
3. **Effectuez les modifications** et commit : `git commit -m "Ajouté nouvelle feature"`
4. **Push vers la branche** : `git push origin feature/nom-feature`
5. **Ouvrez une Pull Request**

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**.

---

## 📞 Support

- 📧 **Email** : support@certtrust.com
- 💬 **Chat** : Disponible sur le site web
- 📚 **Documentation** : [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker** : [GitHub Issues](https://github.com/yourusername/certtrust/issues)

---

<div align="center">

**Fait avec ❤️ pour le secteur financier européen**

[Website](https://certtrust.com) • [Documentation](https://docs.certtrust.com) • [Support](mailto:support@certtrust.com)

© 2024 CertTrust. Tous droits réservés.

</div>
