FROM node:20-alpine AS base
WORKDIR /app

# Dependencias
COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
COPY packages ./packages
RUN npm install

# Build
COPY . .
RUN npm run build --workspace=backend

# Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/apps/backend/dist ./dist
COPY --from=base /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]
