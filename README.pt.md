# CertTrust - Certificados Digitais QWAC, PSD2 & eIDAS

<div align="center">

![Versão](https://img.shields.io/badge/versão-1.0.0-blue.svg)
![Licença](https://img.shields.io/badge/licença-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Plataforma profissional para obtenção gratuita de certificados digitais qualificados em ambiente de produção**

[🇬🇧 English](README.md) • [🇮🇹 Italiano](README.it.md) • [🇩🇪 Deutsch](README.de.md) • [🇪🇸 Español](README.es.md) • [🇫🇷 Français](README.fr.md) • [🇵🇹 Português](#certtrust---certificados-digitais-qwac-psd2--eidas) • [🇨🇳 中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇸🇦 العربية](README.ar.md) • [🇷🇺 Русский](README.ru.md) • [🇵🇰 اردو](README.ur.md) • [🇮🇳 हिन्दी](README.hi.md) • [🇮🇪 Gaeilge](README.ga.md) • [🇰🇷 한국어](README.ko.md)

[Começar](#instalação) • [Documentação](#documentação) • [Demo](#demo) • [Contribuir](#contribuir)

</div>

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Características Principais](#características-principais)
- [Certificados Disponíveis](#certificados-disponíveis)
- [Para Quem é](#para-quem-é)
- [Instalação](#instalação)
- [Uso](#uso)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Segurança e Conformidade](#segurança-e-conformidade)
- [FAQ](#faq)
- [Contribuir](#contribuir)
- [Licença](#licença)
- [Suporte](#suporte)

---

## 🎯 Visão Geral

**CertTrust** é uma plataforma web moderna e profissional que permite a bancos, instituições de pagamento, TPP (Third Party Providers) e organizações financeiras obter **gratuitamente** certificados digitais qualificados em **ambiente de produção**.

Ao contrário de outras soluções que fornecem apenas certificados de teste ou sandbox, CertTrust emite certificados reais, prontos para uso imediato com qualquer instituição bancária e financeira na Europa, em conformidade com os regulamentos **PSD2** e **eIDAS**.

### Por que CertTrust?

| Característica | CertTrust | Outros Serviços |
|----------------|-----------|-----------------|
| Ambiente | ✅ **Produção** | ❌ Teste/Sandbox |
| Validade | ✅ **Toda instituição UE** | ⚠️ Limitada |
| Custo | ✅ **Gratuito** | ❌ Pago |
| Conformidade | ✅ **PSD2 + eIDAS** | ⚠️ Parcial |
| Emissão | ✅ **Imediata** | ❌ Dias/semanas |

---

## ✨ Características Principais

### 🏭 Ambiente de Produção Real
- Certificados emitidos em produção, não em ambiente de teste
- Prontos para uso imediato com APIs bancárias reais
- Valor legal completo em toda a União Europeia

### 🏦 Validade Universal
- Aceitos por **todas as instituições financeiras** na Europa
- Bancos comerciais, instituições de pagamento, ASPSP, AISP, PISP
- Fintech, neobancos, seguros, administração pública

### ⚡ Emissão Imediata
- Receba os certificados em minutos
- Sem processo de aprovação longo
- Download imediato após validação do código

### 🔒 Segurança Máxima
- Chaves criptográficas de 2048/4096 bits
- Algoritmos SHA-256 e superiores
- Emitidos por QTSP (Qualified Trust Service Provider) autorizados

### 🇪🇺 Conformidade Europeia
- 100% conforme ao regulamento eIDAS (UE) nº 910/2014
- Conformidade total com PSD2 (Payment Services Directive 2)
- Respeito aos padrões EBA (European Banking Authority)

### 💰 100% Gratuito
- Sem custos ocultos
- Sem assinatura
- Insira o código e obtenha todos os certificados

---

## 📜 Certificados Disponíveis

### 1. QWAC - Qualified Website Authentication Certificate
**Autenticação segura do site**

O QWAC é um certificado digital qualificado que autentica a identidade de um site e garante comunicações seguras TLS/SSL. Segundo PSD2, todas as instituições de pagamento devem usar QWAC para comunicações com APIs bancárias.

### 2. Certificados PSD2
**Certificados para Third Party Providers**

Certificados específicos para TPP que operam no âmbito da Payment Services Directive 2. Incluem os papéis PSP_AS, PSP_IC e PSP_PI necessários para acessar APIs Open Banking.

### 3. Certificados eIDAS
**Identificação Eletrônica e Serviços de Confiança**

Certificados conformes ao regulamento europeu eIDAS para identificação eletrônica e serviços de confiança qualificados. Reconhecidos automaticamente em todos os estados membros da UE.

### 4. QSealC - Qualified Electronic Seal Certificate
**Selo eletrônico para pessoas jurídicas**

O QSealC é um selo eletrônico qualificado para pessoas jurídicas. Garante a origem e integridade de documentos eletrônicos com valor legal em toda a UE.

### 5. QWAC para TPP
**QWAC específico para Third Party Providers**

Certificado QWAC com extensões PSD2 nos campos de privilégios. Necessário para acesso a APIs Open Banking com autenticação mTLS.

### 6. QSealC para TPP
**Selo eletrônico para Third Party Providers**

Selo eletrônico qualificado para TPP com extensões PSD2. Usado para assinar solicitações a APIs bancárias e garantir autenticidade e não-repúdio.

### 7. QWAC SAN - Qualified Website Authentication Certificate com Subject Alternative Name
**Autenticação segura multi-domínio do site**

O QWAC SAN é um certificado digital qualificado que autentica a identidade de um site e garante comunicações seguras TLS/SSL, com suporte para múltiplos domínios através de Subject Alternative Name (SAN). Permite proteger múltiplos domínios e subdomínios com um único certificado, ideal para instituições bancárias com infraestruturas complexas.

---

## 👥 Para Quem é

CertTrust é projetado para:

### 🏦 Instituições Financeiras
- **Bancos Comerciais** - Autenticação segura e conformidade PSD2
- **Instituições de Pagamento (IP)** - Acesso API e serviços de pagamento
- **Instituições de Moeda Eletrônica (IME)** - Emissão de moeda eletrônica
- **Neobancos** - Serviços digitais inovadores

### 🔄 Third Party Providers (TPP)
- **AISP** (Account Information Service Providers) - Agregação de contas
- **PISP** (Payment Initiation Service Providers) - Iniciação de pagamentos
- **ASPSP** (Account Servicing PSP) - Gestão de contas
- **Agregadores** - Serviços de agregação financeira

### 💼 Empresas e Organizações
- **Fintech** - Startups e scale-ups do setor financeiro
- **Corporate** - Grandes empresas com necessidades financeiras
- **Administração Pública** - Entidades públicas europeias
- **Seguros** - Companhias de seguros

---

## 🚀 Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (ou yarn >= 1.22.0)
- **Git** (opcional, para clonar o repositório)

### Instalação Rápida

```bash
# Clonar o repositório
git clone https://github.com/yourusername/certtrust.git

# Entrar no diretório do projeto
cd certtrust

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Build de produção
npm run build

# Prévia do build
npm run preview
```

---

## 💻 Uso

### Para Usuários Finais

1. **Visite o site** - Abra o navegador e navegue até a URL da aplicação
2. **Insira o código promocional** - Role até a seção "Insira Seu Código"
3. **Verifique a identidade** - Complete a verificação de identidade da empresa
4. **Baixe os certificados** - Você receberá os certificados por email em poucos minutos

### Para Desenvolvedores

```bash
# Iniciar servidor de desenvolvimento com hot-reload
npm run dev
```

---

## 🏗️ Arquitetura

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│         Aplicação Frontend              │
├─────────────────────────────────────────┤
│  React 18 + TypeScript                  │
│  Tailwind CSS 4                         │
│  Vite 6                                 │
└─────────────────────────────────────────┘
```

---

## 📁 Estrutura do Projeto

```
certtrust/
├── public/                 # Assets estáticos
├── src/                    # Código fonte
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── dist/                   # Build de produção
├── index.html             # Template HTML
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── vite.config.ts         # Configuração Vite
└── README.md              # Documentação
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-------------|
| **React** | 18.x | Biblioteca UI para interfaces de usuário |
| **TypeScript** | 5.x | JavaScript com tipagem estática |
| **Vite** | 6.x | Build tool ultra-rápido |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |

---

## 🔐 Segurança e Conformidade

### Padrões de Segurança

#### 🔒 Criptografia
- **Algoritmos**: RSA 2048/4096 bits, ECDSA
- **Hash**: SHA-256, SHA-384, SHA-512
- **Protocolos**: TLS 1.2, TLS 1.3
- **Certificados**: X.509 v3

#### 📋 Conformidade Regulatória

**eIDAS (Regulamento UE nº 910/2014)**
- Identificação eletrônica
- Serviços de confiança qualificados
- Reconhecimento transfronteiriço

**PSD2 (Payment Services Directive 2)**
- Strong Customer Authentication (SCA)
- Common and Secure Communication (CSC)
- RTS on SCA and CSC (EBA/RTS/2017)

#### 🏛️ QTSP Autorizados
Os certificados são emitidos por **Qualified Trust Service Providers** autorizados e supervisionados pelas autoridades nacionais competentes.

### Proteção de Dados

- **LGPD/RGPD Conforme**: Respeito ao Regulamento Geral de Proteção de Dados
- **Criptografia de Dados**: Todos os dados sensíveis são criptografados
- **Transmissão Segura**: Comunicações protegidas com TLS
- **Privacy by Design**: Arquitetura orientada à privacidade

---

## ❓ FAQ

**P: Os certificados são realmente gratuitos?**
R: Sim, os certificados são 100% gratuitos. Insira o código promocional e receba todos os certificados sem nenhum custo.

**P: Os certificados estão em produção ou em teste?**
R: Os certificados estão em **ambiente de produção real**. Não são certificados sandbox ou de teste.

**P: Para quais instituições os certificados são válidos?**
R: Os certificados são válidos para **toda instituição financeira** na Europa: bancos, instituições de pagamento, ASPSP, AISP, PISP, fintech, neobancos, seguros, administração pública.

**P: Os certificados são reconhecidos em toda a Europa?**
R: Sim, os certificados eIDAS são reconhecidos automaticamente em todos os 27 estados membros da União Europeia.

---

## 🤝 Contribuir

Contribuições são bem-vindas! Siga estes passos:

1. **Fork o repositório**
2. **Crie um branch para sua feature**: `git checkout -b feature/nome-feature`
3. **Faça as alterações** e commit: `git commit -m "Adicionada nova feature"`
4. **Push para o branch**: `git push origin feature/nome-feature`
5. **Abra um Pull Request**

---

## 📄 Licença

Este projeto é distribuído sob licença **MIT**.

---

## 📞 Suporte

- 📧 **Email**: support@certtrust.com
- 💬 **Chat**: Disponível no site
- 📚 **Documentação**: [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/certtrust/issues)

---

<div align="center">

**Feito com ❤️ para o setor financeiro europeu**

[Website](https://certtrust.com) • [Documentação](https://docs.certtrust.com) • [Suporte](mailto:support@certtrust.com)

© 2024 CertTrust. Todos os direitos reservados.

</div>
