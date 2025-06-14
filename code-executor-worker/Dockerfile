# ---- Base image ----
FROM node:22-slim AS base
WORKDIR /worker
RUN corepack enable

# ---- Dependencies ----
FROM base AS deps
WORKDIR /worker

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ---- Build code ----
FROM base AS builder
WORKDIR /worker

COPY --from=deps /worker/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- Final Runtime ----
FROM base AS runner
WORKDIR /worker

# Copy only what's needed to run
COPY --from=deps /worker/node_modules ./node_modules
COPY --from=builder /worker/dist ./dist
COPY package.json ./

CMD ["node", "dist/worker.js"]
