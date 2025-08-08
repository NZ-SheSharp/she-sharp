#!/bin/bash

echo "🔄 Starting database schema sync..."

# Function to handle drizzle-kit generate prompts
generate_migration() {
    echo "📝 Generating migration..."
    # Use expect or python to handle interactive prompts
    python3 << EOF
import subprocess
import sys

try:
    # Run drizzle-kit generate with automatic responses
    proc = subprocess.Popen(
        ['npx', 'drizzle-kit', 'generate'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Send newline to select default option
    output, error = proc.communicate(input='\n')
    
    print(output)
    if error:
        print(error, file=sys.stderr)
    
    sys.exit(proc.returncode)
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
EOF
}

# Step 1: Apply existing migrations
echo "📋 Applying existing migrations..."
pnpm db:migrate

# Step 2: Check if new changes need to be generated
echo "🔍 Checking for schema changes..."
generate_migration

# Step 3: Apply any new migrations
if [ -f "lib/db/migrations/meta/_journal.json" ]; then
    echo "✅ Applying new migrations if any..."
    pnpm db:migrate
fi

# Step 4: Push schema to ensure sync
echo "🚀 Pushing schema to database..."
python3 << EOF
import subprocess
import sys
import time

def push_schema():
    proc = subprocess.Popen(
        ['npx', 'drizzle-kit', 'push'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait for prompt and send response
    time.sleep(2)
    output, error = proc.communicate(input='\n\n\n')
    
    print(output)
    if error and 'No changes detected' not in error:
        print(error, file=sys.stderr)
    
    return proc.returncode

# Try push with retries
for i in range(3):
    if push_schema() == 0:
        break
    time.sleep(2)
EOF

echo "✅ Database schema sync completed!"