#!/bin/bash

# Set variables
REMOTE_USER="root"
REMOTE_HOST="157.180.39.139"
REMOTE_PATH="/root/only-chat-fe"
BUILD_DIR="dist"

# Step 1: Build the React app
echo "🔨 Building the React app..."
npm run build

# Step 2: Deploy to the server
echo "🚀 Deploying to $REMOTE_HOST..."

rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    $BUILD_DIR/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "✅ Deployment complete!"
