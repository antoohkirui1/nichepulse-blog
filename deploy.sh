#!/bin/bash

# 🚀 NichePulse Blog - One-Click Deployment Script
# Run this to deploy your blog to GitHub and Vercel

set -e  # Exit on error

echo "=========================================="
echo "🚀 NichePulse Blog Deployment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username (antoohkirui1): " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-antoohkirui1}

read -p "Enter your GitHub Personal Access Token: " -s GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    print_error "GitHub token is required. Get it from:"
    echo "github.com → Settings → Developer settings → Personal access tokens"
    exit 1
fi

print_warning "Make sure you have:"
echo "  1. Created GitHub repo: $GITHUB_USER/nichepulse-blog"
echo "  2. Generated Personal Access Token with 'repo' permission"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

echo ""
echo "=========================================="
echo "📦 Step 1: Preparing Code"
echo "=========================================="

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    print_success "Git initialized"
else
    print_success "Git already initialized"
fi

# Add all files
git add .
print_success "Files staged"

# Commit
git commit -m "Initial commit: NichePulse blog with 32 posts" || print_warning "Nothing new to commit"
print_success "Changes committed"

# Set branch name
git branch -M main
print_success "Branch set to 'main'"

# Add remote
print_warning "Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/nichepulse-blog.git"
print_success "Remote configured"

echo ""
echo "=========================================="
echo "📤 Step 2: Pushing to GitHub"
echo "=========================================="

if git push -u origin main; then
    print_success "Code pushed to GitHub!"
    echo ""
    echo "🌐 Your repo: https://github.com/$GITHUB_USER/nichepulse-blog"
else
    print_error "Failed to push. Check:"
    echo "  - Is the repo created at github.com/$GITHUB_USER/nichepulse-blog?"
    echo "  - Is your token correct with 'repo' permission?"
    exit 1
fi

echo ""
echo "=========================================="
echo "🌐 Step 3: Vercel Deployment"
echo "=========================================="

print_warning "Next steps (manual):"
echo ""
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub (as $GITHUB_USER)"
echo "3. Click 'Add New Project'"
echo "4. Import 'nichepulse-blog'"
echo "5. Click 'Deploy'"
echo ""

read -p "Have you deployed to Vercel? (y/n): " deployed

if [ "$deployed" = "y" ] || [ "$deployed" = "Y" ]; then
    read -p "Enter your Vercel site URL (e.g., https://nichepulse-blog.vercel.app): " VERCEL_URL
    
    echo ""
    echo "=========================================="
    echo "🗄️  Step 4: Database Setup"
    echo "=========================================="
    
    print_warning "You need to set up a database:"
    echo ""
    echo "Option 1: Neon (Recommended - Free)"
    echo "  1. Go to https://neon.tech"
    echo "  2. Sign up with GitHub"
    echo "  3. Create project → Copy connection string"
    echo "  4. In Vercel: Project → Settings → Environment Variables"
    echo "  5. Add: DATABASE_URL = your_neon_connection_string"
    echo ""
    
    read -p "Have you set up the database? (y/n): " db_setup
    
    if [ "$db_setup" = "y" ] || [ "$db_setup" = "Y" ]; then
        echo ""
        echo "=========================================="
        echo "🌱 Step 5: Seeding Database"
        echo "=========================================="
        
        print_warning "Seeding database with 32 posts..."
        
        curl -X POST "$VERCEL_URL/api/seed" && print_success "Base data seeded"
        curl -X POST "$VERCEL_URL/api/seed-full" && print_success "Full posts seeded"
        curl -X POST "$VERCEL_URL/api/seed-extra" && print_success "Extra posts seeded"
        
        echo ""
        print_success "🎉 DEPLOYMENT COMPLETE!"
        echo ""
        echo "=========================================="
        echo "🌐 Your blog is live at:"
        echo "$VERCEL_URL"
        echo "=========================================="
        echo ""
        echo "Next steps:"
        echo "  1. Visit your site and verify it works"
        echo "  2. Submit to Google Search Console"
        echo "  3. Apply for AdSense when you have 1,000+ visitors/month"
        echo "  4. Start sharing your content!"
        echo ""
        echo "📖 For more info, see DEPLOY.md"
    else
        print_warning "Please set up database and run these commands:"
        echo "curl -X POST $VERCEL_URL/api/seed"
        echo "curl -X POST $VERCEL_URL/api/seed-full"
        echo "curl -X POST $VERCEL_URL/api/seed-extra"
    fi
else
    print_warning "Please deploy to Vercel manually:"
    echo "  1. Go to https://vercel.com"
    echo "  2. Sign in with GitHub"
    echo "  3. Import 'nichepulse-blog' repo"
    echo "  4. Click 'Deploy'"
fi

echo ""
echo "=========================================="
echo "📋 Summary"
echo "=========================================="
echo "GitHub Repo: https://github.com/$GITHUB_USER/nichepulse-blog"
echo "Vercel: https://vercel.com/$GITHUB_USER"
echo ""
echo "Need help? Read DEPLOY.md"
echo "=========================================="
