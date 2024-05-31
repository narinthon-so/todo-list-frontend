# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Set the command to run the web server
CMD ["serve", "-s", "build", "-l", "3001"]

# Expose the port the app runs on
EXPOSE 3001
