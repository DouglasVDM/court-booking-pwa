# 🎾 Tennis Club Court Booking App

A mobile-first **Progressive Web App (PWA)** that allows verified members of a tennis club to book courts with ease. Built for speed, security, and future scalability — including guest access and payments.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue.svg)](https://court-booking-pwa.onrender.com)  
[![GitHub](https://img.shields.io/badge/Repo-DouglasVDM/court--booking--pwa-000?logo=github)](https://github.com/DouglasVDM/court-booking-pwa)

![Build](https://github.com/DouglasVDM/court-booking-pwa/actions/workflows/main.yml/badge.svg)
![Coverage](https://codecov.io/gh/DouglasVDM/court-booking-pwa/branch/main/graph/badge.svg)
![License](https://img.shields.io/github/license/DouglasVDM/court-booking-pwa)
![Last Commit](https://img.shields.io/github/last-commit/DouglasVDM/court-booking-pwa)
![Render](https://img.shields.io/badge/Render-Deployed-blue)


## 📚 Table of Contents

- [🎾 Tennis Club Court Booking App](#-tennis-club-court-booking-app)
  - [📚 Table of Contents](#-table-of-contents)
  - [📌 Overview](#-overview)
  - [🚀 Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configure environment variables](#configure-environment-variables)
    - [client/.env](#clientenv)
    - [server/.env](#serverenv)
    - [Run development servers](#run-development-servers)
  - [🧩 Application Diagram](#-application-diagram)
    - [🧠 Flowcharts (Mermaid)](#-flowcharts-mermaid)
  - [⚙️ PWA Capabilities](#️-pwa-capabilities)
  - [🧭 Future Enhancements](#-future-enhancements)
  - [🗂 Project Structure](#-project-structure)
  - [📄 License](#-license)
  - [👤 Author](#-author)
    - [Douglas van der Merwe](#douglas-van-der-merwe)

## 📌 Overview

The app enables:
- 🧑‍🤝‍🧑 **Club members** to log in, view availability, and book courts.
- 🛡️ **Admins** to manage bookings and control member access.
- 👤 **Future visitors** to book and pay securely — built with this in mind.

## 🚀 Features

- 🔐 Secure login using **Auth0**, restricted to verified members
- 📅 Conflict-aware booking system
- ⏳ Member booking frequency rules (e.g. 1 per 2 weeks)
- ♻️ Real-time UI updates after changes
- ⚙️ Clean separation of concerns: routes, controllers, services
- 📱 Installable, offline-ready **PWA**
- 🛠 Built with scalability for visitor payments and admin dashboards

---

## 🛠 Tech Stack

| Frontend         | Backend      | DB                  | Auth  | Deployment |
| ---------------- | ------------ | ------------------- | ----- | ---------- |
| React (Vite, TS) | Express (TS) | PostgreSQL (Docker) | Auth0 | Render     |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- Docker Desktop (for DB)

### Installation

```bash
git clone https://github.com/DouglasVDM/court-booking-pwa.git
cd court-booking-pwa
cd frontend && npm install
cd ../backend && npm install
```
### Configure environment variables

### client/.env

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
```
### server/.env

```env
DATABASE_URL=postgres://user:pass@localhost:5432/db
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-api-audience
PORT=5000
```

### Run development servers

```bash
# in two separate terminals

cd frontend && npm run dev --trace-warnings
cd backend && npm run dev --trace-warnings

```
## 🧩 Application Diagram

### 🧠 Flowcharts (Mermaid)

<details> <summary>🔐 Member Login Flow</summary>

```mermaid
graph TD
  A[Login via Auth0] --> B{Authenticated?}
  B -- Yes --> C[Check Email in DB]
  C -- Exists --> D[Grant Access]
  C -- Missing --> E[Deny Access or Create Visitor]
  D --> F[Dashboard]
```
</details> 

<details> <summary>👤 Future Visitor Flow</summary>

```mermaid
graph TD
  A[Visitor Login] --> B[Check Visitor Table]
  B --> C[Allow Booking with Payment]
```
</details> 

<details> <summary>📅 Booking Flow</summary>

```mermaid
graph TD
  A[Submit Booking] --> B[Check Conflicts]
  B -- No Conflict --> C[Create Booking]
  C --> D[Send Confirmation]
  ```
</details> 

<details> <summary>💳 Payment Flow (Future)</summary>

```mermaid
graph TD
  A[Start Booking] --> B[Enter Details]
  B --> C[Stripe Checkout]
  C --> D[On Success → Confirm Booking]
```
</details>

## ⚙️ PWA Capabilities

✅ Installable on mobile

✅ Offline fallback via service worker

✅ Responsive design

✅ Fast load times with Vite

## 🧭 Future Enhancements

- Guest booking + payments
- Admin dashboard with stats and override controls
- Booking reminders and notifications
- Recurring bookings

## 🗂 Project Structure

```bash
/frontend       # React frontend (Vite, PWA)
  ├── components/
  ├── customHooks/
  ├── pages/
  └── authentication/, assets/, styles/

/backend       # Express backend
  ├── controllers/
  ├── routes/
  ├── services/
  ├── models/
  └── db/, middlewares/, utils/
```

## 📄 License
MIT License — feel free to use and build upon this.

## 👤 Author
### Douglas van der Merwe
📍 South Africa  
🔗 GitHub: @DouglasVDM

---

