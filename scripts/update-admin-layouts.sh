#!/bin/bash

# Update all admin dashboard pages to have consistent layout with proper padding
# Pattern: Replace <div className="space-y-6"> or <div className="space-y-8"> 
# with <div className="container mx-auto px-4 py-8 space-y-8">

echo "Updating admin dashboard layouts..."

# List of admin pages to update
admin_pages=(
  "app/(dashboard)/dashboard/admin/page.tsx"
  "app/(dashboard)/dashboard/admin/users/page.tsx"
  "app/(dashboard)/dashboard/admin/users/activity/page.tsx"
  "app/(dashboard)/dashboard/admin/users/roles/page.tsx"
  "app/(dashboard)/dashboard/admin/users/permissions/page.tsx"
  "app/(dashboard)/dashboard/admin/mentors/verified/page.tsx"
  "app/(dashboard)/dashboard/admin/mentors/relationships/page.tsx"
  "app/(dashboard)/dashboard/admin/mentors/meetings/page.tsx"
  "app/(dashboard)/dashboard/admin/mentors/applications/page.tsx"
  "app/(dashboard)/dashboard/admin/events/upcoming/page.tsx"
  "app/(dashboard)/dashboard/admin/events/registrations/page.tsx"
  "app/(dashboard)/dashboard/admin/events/new/page.tsx"
  "app/(dashboard)/dashboard/admin/events/archive/page.tsx"
  "app/(dashboard)/dashboard/admin/content/resources/page.tsx"
  "app/(dashboard)/dashboard/admin/content/media/page.tsx"
  "app/(dashboard)/dashboard/admin/content/newsletters/page.tsx"
  "app/(dashboard)/dashboard/admin/content/blog/page.tsx"
  "app/(dashboard)/dashboard/admin/settings/system/page.tsx"
  "app/(dashboard)/dashboard/admin/settings/emails/page.tsx"
  "app/(dashboard)/dashboard/admin/settings/membership/page.tsx"
  "app/(dashboard)/dashboard/admin/settings/audit/page.tsx"
  "app/(dashboard)/dashboard/admin/analytics/page.tsx"
)

for page in "${admin_pages[@]}"; do
  if [ -f "$page" ]; then
    echo "Processing: $page"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Replace the outermost div with proper container classes
    # This sed command looks for the return statement and updates the first div after it
    sed -E '
      /return \(/,/^[[:space:]]*<div/ {
        s|<div className="space-y-[68]">|<div className="container mx-auto px-4 py-8 space-y-8">|
      }
    ' "$page" > "$temp_file"
    
    # Check if changes were made
    if ! diff -q "$page" "$temp_file" > /dev/null; then
      mv "$temp_file" "$page"
      echo "  ✓ Updated layout"
    else
      rm "$temp_file"
      echo "  - No changes needed or already updated"
    fi
  else
    echo "File not found: $page"
  fi
done

echo "Layout updates complete!"