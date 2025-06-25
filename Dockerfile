# Dockerfile
FROM node:20-alpine3.19

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Default to run start (change CMD when building/running to switch to prod start)
CMD [ "npm", "start" ]

