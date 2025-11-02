#!/bin/bash

# Build and push Docker image for deployment
echo "🏗️  Building Docker image..."
docker build -t dignitydialogue:latest .

echo "🏷️  Tagging image for registry..."
docker tag dignitydialogue:latest yourusername/dignitydialogue:latest

echo "📤 Pushing to registry..."
docker push yourusername/dignitydialogue:latest

echo "✅ Build and push complete!"