# Use Node.js 20 as the base image
FROM node:20

# Set environment variables
ENV SNYK_VERSION=latest

# Update the package index and install necessary tools
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Snyk CLI
RUN npm install -g snyk@$SNYK_VERSION

# Verify installations
RUN node --version && \
    snyk --version

# Set the working directory
WORKDIR /app

# Add a default entrypoint for Snyk
ENTRYPOINT ["snyk"]
