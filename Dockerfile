# Railway Dockerfile for ClawIntel
FROM node:20-alpine

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++ sqlite-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p data

# Expose port
EXPOSE 8767

# Set environment
ENV NODE_ENV=production
ENV DIGEST_PORT=8767

# Start the server
CMD ["node", "src/server.mjs"]
