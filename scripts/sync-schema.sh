#!/bin/bash
echo "Syncing database schema..."
# Use yes to auto-confirm any prompts
yes | pnpm drizzle-kit push