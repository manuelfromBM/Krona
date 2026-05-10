FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /krona

#____________________________________________________________________________
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo prune --scope=@krona/backend --docker

#____________________________________________________________________________
FROM base AS builder

COPY --from=pruner /krona/out/json/ .
COPY --from=pruner /krona/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /krona/out/full/ .
RUN pnpm turbo build --filter=@krona/backend
RUN pnpm --filter=@krona/backend exec prisma generate

#____________________________________________________________________________

FROM node:22-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /krona
 
COPY --from=builder /krona/apps/backend/package.json .
COPY --from=builder /krona/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /krona/apps/backend/dist ./dist
COPY --from=builder /krona/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=builder /krona/apps/backend/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /krona/node_modules/@prisma ./node_modules/@prisma
RUN pnpm install --prod

EXPOSE 3000
CMD ["node", "dist/main.js"]
#____________________________________________________________________________
