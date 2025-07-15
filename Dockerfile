# Use a Node.js base image
FROM node:20-alpine AS base

# Install pnpm (or npm/yarn if you prefer)
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS build

# Copy all source code
COPY . .

# Build the Next.js application
# `output: "standalone"` is crucial for Cloud Run
ENV NEXT_OUTPUT="standalone"
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Ensure we're not running as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the built application from the build stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
# If you have custom server.js, copy it here
# COPY --from=build /app/server.js ./server.js

# Expose the port Next.js listens on (default is 3000)
ENV PORT 8080 # Cloud Run requires listening on PORT 8080
EXPOSE 8080

# Start the Next.js application
CMD ["node", "server.js"]