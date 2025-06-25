
# Docker-Based CI/CD Pipeline with GitHub Actions

This guide helps you set up a complete **CI/CD pipeline** using **GitHub Actions** and **Docker Hub** for your Node.js project.

---

## Project Structure

Ensure your project includes:
```
.
├── .github/
│   └── workflows/
│       └── docker-ci-cd.yml   # CI/CD workflow file
├── Dockerfile                 # For building Docker image
├── package.json
└── src/
```

---

## Dockerfile

Create a `Dockerfile` in the root of your project:

```Dockerfile
# Base image
FROM node:20-alpine3.19

# Optional: Reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Default to run tests (override CMD to run app)
CMD [ "npm", "test" ]
```

> 💡 You can override the command when running the container:
> - Run tests: `docker run <image> npm test`
> - Run app: `docker run -it <image> npm start`

---

## 🔐 GitHub Secrets

Go to **GitHub Repository > Settings > Secrets and variables > Actions**, and add:

| Name                | Description                          |
|---------------------|--------------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username             |
| `DOCKERHUB_TOKEN`    | Access token from Docker Hub         |

---

## CI + CD Workflow

Create `.github/workflows/docker-ci-cd.yml`:

```yaml
name: Docker-based CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  ci-test:
    name: Continuous Integration - Build & Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Docker Hub Login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push image (test tag)
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/jest-testing:test

      - name: Run tests in Docker container
        run: docker run --rm ${{ secrets.DOCKERHUB_USERNAME }}/jest-testing:test npm test

  cd-deploy:
    name: Continuous Deployment - Tag & Push :latest
    runs-on: ubuntu-latest
    needs: ci-test

    steps:
      - name: Docker Hub Login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Pull :test image and re-tag
        run: |
          docker pull ${{ secrets.DOCKERHUB_USERNAME }}/jest-testing:test
          docker tag ${{ secrets.DOCKERHUB_USERNAME }}/jest-testing:test ${{ secrets.DOCKERHUB_USERNAME }}/jest-testing:latest

      - name: Push :latest image
        run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/jest-testing:latest
```

---

## What It Does

| Stage     | Description                                |
|-----------|--------------------------------------------|
| **CI**    | Builds a test image and runs `npm test`     |
| **CD**    | If tests pass, tags the image as `:latest` and pushes to Docker Hub |

---

## Test Locally

After pushing to GitHub, your image will be available on Docker Hub.

To run your project interactively from VS Code:

```bash
docker login  # Only if repo is private
docker run -it <your-username>/jest-testing:latest
```

---

## References

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Hub](https://hub.docker.com/)
- [Docker Buildx](https://docs.docker.com/build/buildx/)

---

## Tips

- Keep your Docker images small (use `alpine` variants).
- Never hardcode credentials — use GitHub Secrets.
- You can extend this pipeline to deploy to cloud platforms (e.g., Azure, AWS, Heroku) using similar steps.
