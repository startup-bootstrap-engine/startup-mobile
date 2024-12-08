#!/bin/bash

# Function to print messages
print_message() {
    echo "=============================="
    echo "$1"
    echo "=============================="
}

# Switch environment to dev
tput setaf 3
echo "⚙️ Switching env to dev..."
tput setaf 2
cp -fr ./environment/dev.env .env
cp -fr ./environment/Dockerfile.dev Dockerfile
cp -fr ./environment/docker-compose.dev.yml docker-compose.yml

