# Use official Node.js image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only dependency files first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy app source
COPY . .

# Generate Prisma Client
RUN pnpm dlx prisma generate

# Build the Next.js app
RUN pnpm build

# Set environment to production
ENV NODE_ENV=production

# Expose Next.js default port
EXPOSE 3000

# Start app in production
CMD ["pnpm", "start"]
