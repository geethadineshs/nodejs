# Use the specific Node.js version as the base image
FROM node:20.16.0

# Set the working directory
WORKDIR /app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Make entry.sh executable
RUN chmod +x /app/entry.sh

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["sh", "/app/entry.sh"]

