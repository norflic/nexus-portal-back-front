FROM node:alpine AS init

WORKDIR /app/

COPY ./src /app/src/
COPY ./index.html /app/
COPY ./package.json /app/
COPY ./*config*.json /app/
COPY ./*config*.ts /app/

RUN npm i

FROM init AS build

# Build-time arg for Vite environment variables (used to create .env before building)
ARG VITE_API_URL=http://localhost:3001

# Create .env consumed by Vite so import.meta.env.VITE_API_URL is baked into the bundle
RUN echo "VITE_API_URL=${VITE_API_URL}" > /app/.env

RUN npm run build

FROM node:alpine AS start

WORKDIR /app

# Install a lightweight HTTP server
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/dist /app/dist

# Serve dist folder on port 5173
ENTRYPOINT ["serve", "-s", "dist", "-l", "5173"]
