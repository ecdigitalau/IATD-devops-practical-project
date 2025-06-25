# Use lightweight Node image
FROM node:20-alpine3.19

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all other project files
COPY . .

# Copy entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the entrypoint script to decide command
ENTRYPOINT ["/entrypoint.sh"]

# Default command is to start the app
CMD ["start"]
