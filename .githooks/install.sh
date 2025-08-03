#!/bin/bash

# Install Git hooks for the project

echo "📦 Installing Git hooks..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-commit hook
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "The following hooks are now active:"
echo "  - pre-commit: Prevents committing sensitive information"
echo ""
echo "To bypass hooks temporarily (use with caution):"
echo "  git commit --no-verify"