# ── Stage 1: Build ──────────────────────────────────────────────
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency manifests first (layer cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/docs/package.json packages/docs/
COPY packages/ui/package.json packages/ui/

RUN pnpm install --frozen-lockfile

# Copy source needed at build time
COPY packages/docs/ packages/docs/
COPY packages/ui/src/templates/ packages/ui/src/templates/

RUN pnpm --filter @saasak/kollagen-docs build

# ── Stage 2: Serve ──────────────────────────────────────────────
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY packages/docs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/docs/build /usr/share/nginx/html

EXPOSE 80
