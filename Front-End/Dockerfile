# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only what's needed for installing dependencies first
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./

# Install dependencies (no need to install npm or tools globally here)
RUN npm install

# If you truly need these, install them normally — not globally unless required
RUN npm install daisyui@latest pikaday js-cookie axios

# Copy rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Default: start in development mode
CMD ["npm", "run", "dev"]
