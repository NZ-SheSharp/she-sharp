#!/bin/bash

# Generate migration for Phase 3 tables
echo "Generating Phase 3 migrations..."

# Use expect to automatically answer the prompt
expect << EOF
spawn pnpm db:generate
expect "Is entity_type column in activity_logs table created or renamed from another column?"
send "\r"
expect eof
EOF

echo "Migration generation completed"