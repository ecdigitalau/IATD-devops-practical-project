# Use Node.js 20 with Alpine Linux as the base image
FROM node:20-alpine3.19

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

# Set the working directory inside the container
WORKDIR /app

# Copy only the package definition files first to leverage Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install eslint-plugin-node
RUN npm install

# Copy the rest of the project into the container
COPY . .

# No CMD or ENTRYPOINT defined here.
# This image is flexible – it will run commands passed at runtime.
