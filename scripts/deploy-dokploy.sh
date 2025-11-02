#!/bin/bash

# Dignity Dialogue - Dokploy Deployment Script
# This script builds and pushes the Docker image to Docker Hub for Dokploy deployment

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration (update these values)
DOCKER_USERNAME="${DOCKER_USERNAME:-yourusername}"
IMAGE_NAME="dignitydialogue"
IMAGE_TAG="${IMAGE_TAG:-latest}"
DOCKER_REGISTRY="${DOCKER_REGISTRY:-docker.io}"

echo -e "${GREEN}🚀 Dignity Dialogue - Dokploy Deployment${NC}\n"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if user is logged into Docker Hub (if using docker.io)
if [ "$DOCKER_REGISTRY" = "docker.io" ]; then
    if ! docker info | grep -q "Username"; then
        echo -e "${YELLOW}⚠️  You may not be logged into Docker Hub.${NC}"
        echo -e "   Run: ${GREEN}docker login${NC}"
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

# Build the Docker image
echo -e "${GREEN}📦 Building Docker image...${NC}"
docker build --no-cache -t ${IMAGE_NAME}:${IMAGE_TAG} .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}\n"

# Tag the image
FULL_IMAGE_NAME="${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
echo -e "${GREEN}🏷️  Tagging image as ${FULL_IMAGE_NAME}...${NC}"
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}

# Push the image
echo -e "${GREEN}📤 Pushing image to ${DOCKER_REGISTRY}...${NC}"
docker push ${FULL_IMAGE_NAME}

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker push failed!${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ Deployment image ready!${NC}\n"

# Print deployment instructions
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo -e "1. Log in to Dokploy dashboard"
echo -e "2. Create a new application"
echo -e "3. Select 'Docker Image' as the source"
echo -e "4. Enter image name: ${GREEN}${FULL_IMAGE_NAME}${NC}"
echo -e "5. Set port: ${GREEN}3000${NC}"
echo -e "6. Configure domain: ${GREEN}dignitydialogue.com${NC}"
echo -e "\n${YELLOW}🔐 Environment Variables (Set as Dokploy Secrets):${NC}"
echo -e "   ${GREEN}NEXT_PUBLIC_SUPABASE_URL${NC}=https://your-project.supabase.co"
echo -e "   ${GREEN}NEXT_PUBLIC_SUPABASE_ANON_KEY${NC}=your_anon_key"
echo -e "   ${GREEN}SUPABASE_SERVICE_ROLE_KEY${NC}=your_service_role_key"
echo -e "   ${GREEN}NEXT_PUBLIC_RECAPTCHA_SITE_KEY${NC}=your_recaptcha_site_key"
echo -e "   ${GREEN}RECAPTCHA_SECRET_KEY${NC}=your_recaptcha_secret_key"
echo -e "   ${GREEN}TWILIO_ACCOUNT_SID${NC}=your_twilio_account_sid (optional)"
echo -e "   ${GREEN}TWILIO_AUTH_TOKEN${NC}=your_twilio_auth_token (optional)"
echo -e "   ${GREEN}TWILIO_PHONE_NUMBER${NC}=+1234567890 (optional)"
echo -e "   ${GREEN}NEXT_PUBLIC_APP_URL${NC}=https://dignitydialogue.com"
echo -e "\n${YELLOW}⚠️  Important:${NC}"
echo -e "   - Do NOT commit secrets to the repository"
echo -e "   - Use Dokploy's secrets management for all sensitive values"
echo -e "   - The worker script should be run separately (cron job or separate container)"
echo -e "\n${GREEN}🎉 Done! Your image is ready for deployment.${NC}\n"

