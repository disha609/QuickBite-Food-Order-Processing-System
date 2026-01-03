# Use official node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app files
COPY . .

# Expose port (jo aapke order-service me use ho raha hai, e.g. 3000)
EXPOSE 3000

# Start the service
CMD ["npm", "start"]
