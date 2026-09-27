# CertTrust - Certificados Digitales QWAC, PSD2 & eIDAS

<div align="center">

![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)
![Licencia](https://img.shields.io/badge/licencia-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)

**Plataforma profesional para la obtención gratuita de certificados digitales cualificados en entorno de producción**

[🇬🇧 English](README.md) • [🇮🇹 Italiano](README.it.md) • [🇩🇪 Deutsch](README.de.md) • [🇪🇸 Español](#certtrust---certificados-digitales-qwac-psd2--eidas) • [🇫🇷 Français](README.fr.md) • [🇵🇹 Português](README.pt.md) • [🇨🇳 中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇸🇦 العربية](README.ar.md) • [🇷🇺 Русский](README.ru.md) • [🇵🇰 اردو](README.ur.md) • [🇮🇳 हिन्दी](README.hi.md) • [🇮🇪 Gaeilge](README.ga.md) • [🇰🇷 한국어](README.ko.md)

[Comenzar](#instalación) • [Documentación](#documentación) • [Demo](#demo) • [Contribuir](#contribuir)

</div>

---

## 📋 Índice

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Certificados Disponibles](#certificados-disponibles)
- [Para Quién es](#para-quién-es)
- [Instalación](#instalación)
- [Uso](#uso)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Seguridad y Cumplimiento](#seguridad-y-cumplimiento)
- [FAQ](#faq)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Soporte](#soporte)

---

## 🎯 Descripción General

**CertTrust** es una plataforma web moderna y profesional que permite a bancos, instituciones de pago, TPP (Third Party Providers) y organizaciones financieras obtener **gratuitamente** certificados digitales cualificados en **entorno de producción**.

A diferencia de otras soluciones que solo proporcionan certificados de prueba o sandbox, CertTrust emite certificados reales, listos para uso inmediato con cualquier institución bancaria y financiera en Europa, conformes a los reglamentos **PSD2** y **eIDAS**.

### ¿Por qué CertTrust?

| Característica | CertTrust | Otros Servicios |
|----------------|-----------|-----------------|
| Entorno | ✅ **Producción** | ❌ Prueba/Sandbox |
| Validez | ✅ **Cada institución UE** | ⚠️ Limitada |
| Costo | ✅ **Gratuito** | ❌ De pago |
| Cumplimiento | ✅ **PSD2 + eIDAS** | ⚠️ Parcial |
| Emisión | ✅ **Inmediata** | ❌ Días/semanas |

---

## ✨ Características Principales

### 🏭 Entorno de Producción Real
- Certificados emitidos en producción, no en entorno de prueba
- Listos para uso inmediato con APIs bancarias reales
- Valor legal completo en toda la Unión Europea

### 🏦 Validez Universal
- Aceptados por **todas las instituciones financieras** en Europa
- Bancos comerciales, instituciones de pago, ASPSP, AISP, PISP
- Fintech, neobancos, seguros, administración pública

### ⚡ Emisión Inmediata
- Recibe los certificados en minutos
- Sin proceso de aprobación largo
- Descarga inmediata tras la validación del código

### 🔒 Máxima Seguridad
- Claves criptográficas de 2048/4096 bits
- Algoritmos SHA-256 y superiores
- Emitidos por QTSP (Qualified Trust Service Provider) autorizados

### 🇪🇺 Cumplimiento Europeo
- 100% conforme al reglamento eIDAS (UE) nº 910/2014
- Cumplimiento total con PSD2 (Payment Services Directive 2)
- Respeto de los estándares EBA (European Banking Authority)

### 💰 100% Gratuito
- Sin costos ocultos
- Sin suscripción
- Ingresa el código y obtén todos los certificados

---

## 📜 Certificados Disponibles

### 1. QWAC - Qualified Website Authentication Certificate
**Autenticación segura del sitio web**

El QWAC es un certificado digital cualificado que autentica la identidad de un sitio web y garantiza comunicaciones seguras TLS/SSL. Según PSD2, todas las instituciones de pago deben usar QWAC para las comunicaciones con las APIs bancarias.

### 2. Certificados PSD2
**Certificados para Third Party Providers**

Certificados específicos para TPP que operan en el ámbito de la Payment Services Directive 2. Incluyen los roles PSP_AS, PSP_IC y PSP_PI necesarios para acceder a las APIs de Open Banking.

### 3. Certificados eIDAS
**Identificación Electrónica y Servicios de Confianza**

Certificados conformes al reglamento europeo eIDAS para la identificación electrónica y los servicios fiduciarios cualificados. Reconocidos automáticamente en todos los estados miembros de la UE.

### 4. QSealC - Qualified Electronic Seal Certificate
**Sello electrónico para personas jurídicas**

El QSealC es un sello electrónico cualificado para personas jurídicas. Garantiza el origen y la integridad de los documentos electrónicos con valor legal en toda la UE.

### 5. QWAC para TPP
**QWAC específico para Third Party Providers**

Certificado QWAC con extensiones PSD2 en los campos de privilegios. Requerido para el acceso a las APIs de Open Banking con autenticación mTLS.

### 6. QSealC para TPP
**Sello electrónico para Third Party Providers**

Sello electrónico cualificado para TPP con extensiones PSD2. Utilizado para firmar las solicitudes a las APIs bancarias y garantizar autenticidad y no repudio.

---

## 👥 Para Quién es

CertTrust está diseñado para:

### 🏦 Instituciones Financieras
- **Bancos Comerciales** - Autenticación segura y cumplimiento PSD2
- **Instituciones de Pago (IP)** - Acceso API y servicios de pago
- **Instituciones de Dinero Electrónico (IME)** - Emisión de dinero electrónico
- **Neobancos** - Servicios digitales innovadores

### 🔄 Third Party Providers (TPP)
- **AISP** (Account Information Service Providers) - Agregación de cuentas
- **PISP** (Payment Initiation Service Providers) - Iniciación de pagos
- **ASPSP** (Account Servicing PSP) - Gestión de cuentas
- **Agregadores** - Servicios de agregación financiera

### 💼 Empresas y Organizaciones
- **Fintech** - Startups y scale-ups del sector financiero
- **Corporate** - Grandes empresas con necesidades financieras
- **Administración Pública** - Entes públicos europeos
- **Seguros** - Compañías aseguradoras

---

## 🚀 Instalación

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (o yarn >= 1.22.0)
- **Git** (opcional, para clonar el repositorio)

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/yourusername/certtrust.git

# Entrar en el directorio del proyecto
cd certtrust

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Build de producción
npm run build

# Vista previa del build
npm run preview
```

---

## 💻 Uso

### Para Usuarios Finales

1. **Visita el sitio web** - Abre el navegador y navega a la URL de la aplicación
2. **Ingresa el código promocional** - Desplázate hasta la sección "Ingresa Tu Código"
3. **Verifica la identidad** - Completa la verificación de identidad empresarial
4. **Descarga los certificados** - Recibirás los certificados por email en pocos minutos

### Para Desarrolladores

```bash
# Iniciar servidor de desarrollo con hot-reload
npm run dev
```

---

## 🏗️ Arquitectura

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│         Aplicación Frontend             │
├─────────────────────────────────────────┤
│  React 18 + TypeScript                  │
│  Tailwind CSS 4                         │
│  Vite 6                                 │
└─────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
certtrust/
├── public/                 # Assets estáticos
├── src/                    # Código fuente
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── dist/                   # Build de producción
├── index.html             # Plantilla HTML
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración Vite
└── README.md              # Documentación
```

---

## 🛠️ Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **React** | 18.x | Librería UI para interfaces de usuario |
| **TypeScript** | 5.x | JavaScript con tipado estático |
| **Vite** | 6.x | Build tool ultra-rápido |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |

---

## 🔐 Seguridad y Cumplimiento

### Estándares de Seguridad

#### 🔒 Cifrado
- **Algoritmos**: RSA 2048/4096 bits, ECDSA
- **Hash**: SHA-256, SHA-384, SHA-512
- **Protocolos**: TLS 1.2, TLS 1.3
- **Certificados**: X.509 v3

#### 📋 Cumplimiento Normativo

**eIDAS (Reglamento UE nº 910/2014)**
- Identificación electrónica
- Servicios fiduciarios cualificados
- Reconocimiento transfronterizo

**PSD2 (Payment Services Directive 2)**
- Strong Customer Authentication (SCA)
- Common and Secure Communication (CSC)
- RTS on SCA and CSC (EBA/RTS/2017)

#### 🏛️ QTSP Autorizados
Los certificados son emitidos por **Qualified Trust Service Providers** autorizados y supervisados por las autoridades nacionales competentes.

### Protección de Datos

- **RGPD Conforme**: Cumplimiento del Reglamento General de Protección de Datos
- **Cifrado de Datos**: Todos los datos sensibles están cifrados
- **Transmisión Segura**: Comunicaciones protegidas con TLS
- **Privacy by Design**: Arquitectura orientada a la privacidad

---

## ❓ FAQ

**P: ¿Los certificados son realmente gratuitos?**
R: Sí, los certificados son 100% gratuitos. Ingresa el código promocional y recibe todos los certificados sin ningún costo.

**P: ¿Los certificados están en producción o en prueba?**
R: Los certificados están en **entorno de producción real**. No son certificados sandbox o de prueba.

**P: ¿Para qué instituciones son válidos los certificados?**
R: Los certificados son válidos para **cada institución financiera** en Europa: bancos, instituciones de pago, ASPSP, AISP, PISP, fintech, neobancos, seguros, administración pública.

**P: ¿Los certificados son reconocidos en toda Europa?**
R: Sí, los certificados eIDAS son reconocidos automáticamente en los 27 estados miembros de la Unión Europea.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork el repositorio**
2. **Crea un branch para tu feature**: `git checkout -b feature/nombre-feature`
3. **Realiza los cambios** y commit: `git commit -m "Añadida nueva feature"`
4. **Push al branch**: `git push origin feature/nombre-feature`
5. **Abre un Pull Request**

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia **MIT**.

---

## 📞 Soporte

- 📧 **Email**: support@certtrust.com
- 💬 **Chat**: Disponible en el sitio web
- 📚 **Documentación**: [docs.certtrust.com](https://docs.certtrust.com)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/certtrust/issues)

---

<div align="center">

**Hecho con ❤️ para el sector financiero europeo**

[Website](https://certtrust.com) • [Documentación](https://docs.certtrust.com) • [Soporte](mailto:support@certtrust.com)

© 2024 CertTrust. Todos los derechos reservados.

</div>
