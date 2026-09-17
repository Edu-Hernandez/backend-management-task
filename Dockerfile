# ===============================
# Stage 1: Base
# ===============================

FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable

# ===============================
# Stage 2: Dependencies
# ===============================
FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ===============================
# Development
# ===============================
FROM dependencies AS development

COPY . .

RUN pnpm prisma contract emit

EXPOSE 3005

CMD ["pnpm", "start:dev"]

# ============================================
# Build
# ============================================
FROM dependencies AS build

COPY . .

RUN pnpm prisma contract emit
RUN pnpm build

# Eliminar dependencias de desarrollo
RUN pnpm prune --prod

# ============================================
# Production
# ============================================
FROM base AS production

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 3005

USER node

CMD ["node", "dist/main.js"]