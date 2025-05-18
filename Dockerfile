FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the port that the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]


