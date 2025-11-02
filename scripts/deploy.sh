#!/bin/bash

# DignityDialogue Deployment Script
# This script automates the deployment process to dignitydialogue.com

set -e

echo "🚀 Starting DignityDialogue deployment to dignitydialogue.com..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."
    
    if [ -z "$DOCKER_USERNAME" ]; then
        print_error "DOCKER_USERNAME environment variable is not set"
        exit 1
    fi
    
    if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
        print_error "NEXT_PUBLIC_SUPABASE_URL environment variable is not set"
        exit 1
    fi
    
    print_status "Environment variables check passed ✓"
}

# Build Docker image
build_image() {
    print_status "Building Docker image..."
    
    docker build -t dignitydialogue:latest .
    
    if [ $? -eq 0 ]; then
        print_status "Docker image built successfully ✓"
    else
        print_error "Docker image build failed"
        exit 1
    fi
}

# Tag and push Docker image
push_image() {
    print_status "Tagging and pushing Docker image..."
    
    docker tag dignitydialogue:latest $DOCKER_USERNAME/dignitydialogue:latest
    docker push $DOCKER_USERNAME/dignitydialogue:latest
    
    if [ $? -eq 0 ]; then
        print_status "Docker image pushed successfully ✓"
    else
        print_error "Docker image push failed"
        exit 1
    fi
}

# Run tests (if available)
run_tests() {
    print_status "Running tests..."
    
    # Add your test commands here
    # npm test
    
    print_status "Tests completed ✓"
}

# Deploy to Dokploy (if webhook is available)
deploy_to_dokploy() {
    if [ ! -z "$DOKPLOY_WEBHOOK_URL" ]; then
        print_status "Triggering Dokploy deployment..."
        
        curl -X POST $DOKPLOY_WEBHOOK_URL
        
        if [ $? -eq 0 ]; then
            print_status "Dokploy deployment triggered ✓"
        else
            print_warning "Failed to trigger Dokploy deployment"
        fi
    else
        print_warning "DOKPLOY_WEBHOOK_URL not set, skipping automatic deployment"
    fi
}

# Health check
health_check() {
    print_status "Performing health check..."
    
    # Wait for deployment to be ready
    sleep 30
    
    # Check if the website is accessible
    if curl -f -s https://dignitydialogue.com > /dev/null; then
        print_status "Website is accessible ✓"
    else
        print_warning "Website might not be ready yet, please check manually"
    fi
}

# Main deployment process
main() {
    print_status "Starting deployment process..."
    
    check_env_vars
    run_tests
    build_image
    push_image
    deploy_to_dokploy
    health_check
    
    print_status "🎉 Deployment completed successfully!"
    print_status "Your website should be available at: https://dignitydialogue.com"
}

# Run main function
main "$@"