# Dockerfile for auth-service

FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# 👇 Compile TypeScript to JavaScript
RUN npm run build

# Start service
CMD ["node", "dist/index.js"]
