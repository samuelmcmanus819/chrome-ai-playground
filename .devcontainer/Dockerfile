# Use Node.js 20 as the base image
FROM node:20

# Set environment variables
ENV SNYK_VERSION=latest

# Update the package index and install necessary tools
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg \
    python3 \
    python3-venv \
    python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Install Snyk CLI
RUN npm install -g snyk@$SNYK_VERSION

# Create and activate virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install Pre-Commit
RUN pip install pre-commit

# Install GitLeaks
RUN curl -ssL https://github.com/gitleaks/gitleaks/releases/download/v8.21.2/gitleaks_8.21.2_linux_x64.tar.gz -o gitleaks.tar.gz && \
    tar -xzf gitleaks.tar.gz && \
    mv gitleaks /bin/

# Verify installations
RUN node --version && \
    snyk --version

# Set the working directory
WORKDIR /app

# Add a default entrypoint for Snyk
ENTRYPOINT ["pre-commit install"]
