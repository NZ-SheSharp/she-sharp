import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';
import { 
  users, 
  userRoles, 
  mentorProfiles, 
  menteeProfiles,
  mentorshipRelationships,
  meetings,
  resources,
  resourceAccessLogs,
  activityLogs,
  adminPermissions,
  ActivityType
} from '@/lib/db/schema';
import * as argon2 from '@node-rs/argon2';

async function seedPhase4Data() {
  console.log('🌱 Seeding Phase 4 test data...\n');

  try {
    // 1. Create test users if they don't exist
    console.log('Creating test users...');
    
    const passwordHash = await argon2.hash('testpassword123');
    
    // Create admin user
    const [adminUser] = await db.execute(sql`
      INSERT INTO users (name, email, password_hash, email_verified_at)
      VALUES ('Admin User', 'admin@shesharp.org', ${passwordHash}, NOW())
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, email
    `);
    
    // Create mentor user
    const [mentorUser] = await db.execute(sql`
      INSERT INTO users (name, email, password_hash, email_verified_at)
      VALUES ('Sarah Johnson', 'mentor@example.com', ${passwordHash}, NOW())
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, email
    `);
    
    // Create mentee user
    const [menteeUser] = await db.execute(sql`
      INSERT INTO users (name, email, password_hash, email_verified_at)
      VALUES ('Emily Chen', 'mentee@example.com', ${passwordHash}, NOW())
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, email
    `);
    
    console.log('✅ Users created');

    // 2. Grant admin permissions
    console.log('Granting admin permissions...');
    
    await db.execute(sql`
      INSERT INTO admin_permissions (
        user_id, 
        can_view_all_data, 
        can_edit_users, 
        can_manage_relationships,
        can_access_analytics,
        can_manage_content,
        can_verify_mentors,
        can_manage_events
      )
      VALUES (
        ${(adminUser as any).id},
        true, true, true, true, true, true, true
      )
      ON CONFLICT (user_id) DO NOTHING
    `);
    
    console.log('✅ Admin permissions granted');

    // 3. Create mentor and mentee profiles
    console.log('Creating mentor and mentee profiles...');
    
    await db.execute(sql`
      INSERT INTO mentor_profiles (
        user_id,
        expertise_areas,
        years_experience,
        job_title,
        company,
        bio,
        availability_hours_per_month,
        max_mentees,
        is_accepting_mentees
      )
      VALUES (
        ${(mentorUser as any).id},
        ARRAY['Software Engineering', 'Career Development', 'Leadership'],
        10,
        'Senior Software Engineer',
        'Tech Corp',
        'Passionate about mentoring the next generation of engineers',
        8,
        3,
        true
      )
      ON CONFLICT (user_id) DO NOTHING
    `);
    
    await db.execute(sql`
      INSERT INTO mentee_profiles (
        user_id,
        learning_goals,
        career_stage,
        availability_hours_per_month
      )
      VALUES (
        ${(menteeUser as any).id},
        ARRAY['Learn web development', 'Career transition', 'Build portfolio'],
        'early_career',
        4
      )
      ON CONFLICT (user_id) DO NOTHING
    `);
    
    console.log('✅ Profiles created');

    // 4. Create mentorship relationship
    console.log('Creating mentorship relationship...');
    
    const [relationship] = await db.execute(sql`
      INSERT INTO mentorship_relationships (
        mentor_user_id,
        mentee_user_id,
        status,
        started_at,
        meeting_frequency,
        relationship_goals
      )
      VALUES (
        ${(mentorUser as any).id},
        ${(menteeUser as any).id},
        'active',
        NOW() - INTERVAL '30 days',
        'bi-weekly',
        'Career development and technical skills improvement'
      )
      ON CONFLICT DO NOTHING
      RETURNING id
    `);
    
    console.log('✅ Mentorship relationship created');

    // 5. Create meetings
    console.log('Creating meetings...');
    
    if (relationship) {
      // Past meeting
      await db.execute(sql`
        INSERT INTO meetings (
          relationship_id,
          scheduled_at,
          duration_minutes,
          meeting_type,
          status,
          topics_discussed,
          goals_set,
          actual_start_time,
          actual_end_time,
          rating
        )
        VALUES (
          ${(relationship as any).id},
          NOW() - INTERVAL '14 days',
          60,
          'regular',
          'completed',
          ARRAY['Career goals', 'Technical challenges', 'Learning path'],
          ARRAY['Complete React course', 'Build portfolio project'],
          NOW() - INTERVAL '14 days',
          NOW() - INTERVAL '14 days' + INTERVAL '1 hour',
          5
        )
      `);
      
      // Upcoming meeting
      await db.execute(sql`
        INSERT INTO meetings (
          relationship_id,
          scheduled_at,
          duration_minutes,
          meeting_type,
          status,
          meeting_link
        )
        VALUES (
          ${(relationship as any).id},
          NOW() + INTERVAL '7 days',
          60,
          'regular',
          'scheduled',
          'https://zoom.us/j/123456789'
        )
      `);
      
      console.log('✅ Meetings created');
    }

    // 6. Create resources
    console.log('Creating resources...');
    
    const [resource1] = await db.execute(sql`
      INSERT INTO resources (
        title,
        description,
        resource_type,
        file_url,
        access_level,
        categories,
        tags,
        uploaded_by
      )
      VALUES (
        'Getting Started with React',
        'A comprehensive guide to React fundamentals',
        'document',
        'https://example.com/react-guide.pdf',
        'member',
        ARRAY['Programming', 'Web Development'],
        ARRAY['react', 'javascript', 'frontend'],
        ${(adminUser as any).id}
      )
      RETURNING id
    `);
    
    const [resource2] = await db.execute(sql`
      INSERT INTO resources (
        title,
        description,
        resource_type,
        file_url,
        access_level,
        categories,
        tags,
        uploaded_by
      )
      VALUES (
        'Career Development Workbook',
        'Templates and exercises for career planning',
        'template',
        'https://example.com/career-workbook.xlsx',
        'public',
        ARRAY['Career', 'Professional Development'],
        ARRAY['career', 'planning', 'goals'],
        ${(mentorUser as any).id}
      )
      RETURNING id
    `);
    
    console.log('✅ Resources created');

    // 7. Create resource access logs
    console.log('Creating resource access logs...');
    
    if (resource1 && resource2) {
      await db.execute(sql`
        INSERT INTO resource_access_logs (resource_id, user_id, action)
        VALUES 
          (${(resource1 as any).id}, ${(menteeUser as any).id}, 'view'),
          (${(resource1 as any).id}, ${(menteeUser as any).id}, 'download'),
          (${(resource2 as any).id}, ${(menteeUser as any).id}, 'view')
      `);
      
      console.log('✅ Resource access logs created');
    }

    // 8. Create activity logs
    console.log('Creating activity logs...');
    
    await db.execute(sql`
      INSERT INTO activity_logs (user_id, action, entity_type, metadata)
      VALUES 
        (${(adminUser as any).id}, 'SIGN_IN', 'session', '{"ip": "192.168.1.1"}'::jsonb),
        (${(mentorUser as any).id}, 'UPDATE_MENTOR_PROFILE', 'profile', '{"fields": ["bio", "availability"]}'::jsonb),
        (${(menteeUser as any).id}, 'REQUEST_MENTOR', 'relationship', '{"mentorId": ${(mentorUser as any).id}}'::jsonb),
        (${(mentorUser as any).id}, 'ACCEPT_MENTEE', 'relationship', '{"menteeId": ${(menteeUser as any).id}}'::jsonb),
        (${(menteeUser as any).id}, 'ACCESS_RESOURCE', 'resource', '{"resourceId": ${(resource1 as any)?.id || 1}}'::jsonb)
    `);
    
    console.log('✅ Activity logs created');

    console.log('\n🎉 Phase 4 test data seeded successfully!');
    console.log('\nTest accounts created:');
    console.log('  Admin: admin@shesharp.org / testpassword123');
    console.log('  Mentor: mentor@example.com / testpassword123');
    console.log('  Mentee: mentee@example.com / testpassword123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedPhase4Data();