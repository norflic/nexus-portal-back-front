# Nexus Portal | Frontend

This repository contains the Nexus Portal frontend application.

To run the project (backend + frontend), go see the readme in the nexus-portal-backend folder

## 1. Prerequisites

- Node.js 20+
- npm

For full-stack Docker startup, see the backend README.

## 3. Environment variables

1. Copy `.env.example` to `.env`
2. Fill in the values

Main variables:

- `VITE_API_URL`: backend API URL at the format 'http://url:port'
- `BUILD_TARGET`: target used in the frontend Dockerfile (`start` or `watch` depending on use)

Important: the port in `VITE_API_URL` must match the `SERVER_PORT` configured in the backend.

## 4. Frontend-only startup (local development)

```bash
npm run dev
```

The frontend will be available at http://localhost:5173.

## 5. Useful scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:ui
npm run test:run
npm run coverage
```

## 6. Frontend structure

```text
src/
├── components/
├── img/
├── models/
├── pages/
├── test/
├── utils/
├── App.tsx
├── main.tsx
└── router.ts
```

## 7. Contract with backend

- The frontend consumes the API exposed by the backend.
- Shared schemas/domain models (notably through Zod) must stay aligned across both repositories.
