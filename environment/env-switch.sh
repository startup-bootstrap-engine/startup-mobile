#!/bin/bash

case $1 in

"dev")
  echo "Generating Development environment .env files"
  yarn atlas:copy
  cp -fr ./environment/dev.env .env
  cp -fr ./environment/Dockerfile.dev ./Dockerfile
  cp -fr ./environment/docker-compose.dev.yml ./docker-compose.yml
  cp -fr ./environment/capacitor.config.dev.ts ./capacitor.config.ts
  ;;
"prod")
  echo "Generating Production environment .env files"
  yarn atlas:copy
  cp -fr ./environment/prod.env .env
  cp -fr ./environment/Dockerfile.prod ./Dockerfile
  cp -fr ./environment/docker-compose.prod.yml ./docker-compose.yml
  cp -fr ./environment/capacitor.config.prod.ts ./capacitor.config.ts

  ;;
esac

echo "✅ Done! Client configuration ready!'"