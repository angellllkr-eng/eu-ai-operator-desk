FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# Frontend build stage
FROM base AS frontend-builder
COPY package.json pnpm-lock.yaml ./
COPY client ./client
COPY shared ./shared
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy lockfiles
COPY pnpm-lock.yaml package.json ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built frontend
COPY --from=frontend-builder /app/dist/client ./public

# Copy server code
COPY server ./server
COPY shared ./shared

# Build backend
RUN pnpm build

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "dist/index.js"]
