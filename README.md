# Talentis — HR Document Management Platform

Plataforma web de gestión documental para recursos humanos, orientada a la digitalización del proceso de vinculación de empleados, en cumplimiento de la normativa colombiana de cero papel.

---

## Tech stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Frontend | Angular + PrimeNG             |
| Backend  | Node.js                       |
| Database | PostgreSQL                    |
| Architecture | Hexagonal (Ports & Adapters) |

---

## Features

- Authentication system with 4 roles: **Admin**, **Employee**, **Candidate**, **Manager**
- Digital document upload and management for new hire onboarding
- Role-based access control (RBAC)
- Paperless HR process aligned with Colombian regulations

---

## Roles

| Role      | Description                                      |
|-----------|--------------------------------------------------|
| Admin     | Full system access, user and document management |
| Manager   | Department-level access and approvals            |
| Employee  | Upload and manage personal documentation         |
| Candidate | Access to onboarding document submission         |

---

## Roadmap

- [ ] Full hiring lifecycle management (interview phases, medical exams, onboarding)
- [ ] Notifications and automated email workflows
- [ ] Multi-company support
- [ ] Digital signature integration

---

## Project structure

```
PROYECTO_TALENTIS_UNI/
├── backend/       # Node.js — hexagonal architecture
├── frontend/      # Angular + PrimeNG
└── README.md
```

---

## Getting started

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Angular CLI

### Installation

```bash
# Clone the repo
git clone https://github.com/liangonzzz/PROYECTO_TALENTIS_UNI

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
ng serve
```

---

## Status

Active development — core document management module complete. Hiring lifecycle module in progress.

---

*Personal project — actively developed and maintained.*