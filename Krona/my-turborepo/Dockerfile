FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /krona

FROM base AS pruner
COPY . .
RUN pnpm dlx turbo prune --scope=@krona/backend --docker

FROM base AS builder
COPY --from=pruner /krona/out/json/ .
COPY --from=pruner /krona/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /krona/out/full/ .
RUN pnpm turbo build --filter=@krona/backend
RUN pnpm --filter=@krona/backend exec prisma generate

FROM base AS runner
COPY --from=pruner /krona/out/json/ .
COPY --from=pruner /krona/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /krona/apps/backend/dist ./apps/backend/dist
COPY --from=builder /krona/apps/backend/src/generated ./apps/backend/src/generated

WORKDIR /krona/apps/backend
EXPOSE 3000
CMD ["node", "dist/main.js"]