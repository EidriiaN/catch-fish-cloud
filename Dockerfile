# Use a Node.js base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json* ./

# Install dependencies
# Use npm install instead of npm ci to update lock file with the versions in package.json
RUN npm install --legacy-peer-deps

# Build stage
FROM base AS build

# Copy all source code
COPY . .

# Build the Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

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
COPY --from=build /app/.next/static ./.next/static
# If you have custom server.js, copy it here
# COPY --from=build /app/server.js ./server.js

# Expose the port Next.js listens on (default is 3000)
ENV PORT 8080 # Cloud Run requires listening on PORT 8080
EXPOSE 8080

# Start the Next.js application
CMD ["node", "server.js"]