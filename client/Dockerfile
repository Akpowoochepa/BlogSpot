# Use Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the application for production
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Expose the application's port
EXPOSE 4000

# Start the application
CMD ["serve", "-s", "build", "-l", "4000"]
