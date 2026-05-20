# Nexus Portal | Backend (Project entry point)

This repository is the official entry point to run the full Nexus Portal project (backend + database + frontend via
Docker Compose).

You can get more details on the frontend by reading the readme in the nexus-backend folder

## 1. Overview

- Backend API: Express + TypeScript
- Database: PostgreSQL
- Frontend: started from this repository via `docker-compose.yaml`

## 2. Prerequisites

- Linux or Windows with WSL2
- Docker and Docker Compose installed

## 3. Necessary repository structure

The `docker-compose.yaml` in this repository references the frontend using a relative path. Both repositories must be at
the same level.

```bash
nexus-portal-project/ # Or whatever name you've passed to git clone
├── nexus-portal-backend # this name must not be changed
└── nexus-portal-frontend # same thing
```

## 4. Environment setup

### 4.1 Backend

From this repository:

1. Copy `.env.example` to `.env`
2. Update the variables

Main variables:

- `SERVER_PORT`: API listening port
- `BUILD_TARGET`: Docker build target (`start` or `watch`)
- `POSTGRES_*`: database configuration
- `WORKING_DIRECTORY_PATH`: storage folder for user files

### 4.2 Frontend

In the `nexus-portal-frontend` repository:

1. Copy `.env.example` to `.env`
2. Check `VITE_API_URL`

`VITE_API_URL` must point to the same port as backend `SERVER_PORT`.

Example:

- backend: `SERVER_PORT=3001`
- frontend: `VITE_API_URL='http://localhost:3001'`

## 5. Run the full project

From `nexus-portal-backend`:

```bash
docker compose up --build
```

Then the project will be aces:

- frontend: http://localhost:5173
- backend: http://localhost:<SERVER_PORT>

For next runs:

```bash
docker compose up
```

## 6. Stop and reset

Stop containers:

```bash
docker compose down
```

Full reset (also removes PostgreSQL volumes):

```bash
docker compose down --volumes
```

Warning: this operation deletes persistent database data.

## 7. Useful backend scripts (outside Docker)

From this repository:

```bash
npm install
npm run build
npm run start
npm run watch
npm run test
```

## 8. Backend structure

```text
src/
├── controllers/
├── database/
├── endpoints/
├── exceptions/
├── interfaces/
├── model/
├── repository/
├── services/
├── types/
├── utils/
├── seed.ts
└── index.ts
```
