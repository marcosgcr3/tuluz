# --- Stage 1: Build the Vite frontend ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Production runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the server file
COPY server.js ./

# Copy the built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port (can be overridden by PORT env variable)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
