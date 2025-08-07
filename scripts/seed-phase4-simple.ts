import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function seedPhase4Data() {
  console.log('🌱 Seeding Phase 4 test data...\n');

  try {
    // Note: Using existing users from previous seeds
    console.log('Using existing test users...');
    
    // Get existing users
    const adminResult = await db.execute(sql`
      SELECT id FROM users WHERE email = 'admin@shesharp.org' LIMIT 1
    `);
    
    const mentorResult = await db.execute(sql`
      SELECT id FROM users WHERE email = 'mentor1@example.com' LIMIT 1
    `);
    
    const menteeResult = await db.execute(sql`
      SELECT id FROM users WHERE email = 'mentee1@example.com' LIMIT 1
    `);
    
    if (!adminResult.length || !mentorResult.length || !menteeResult.length) {
      console.log('⚠️  Required test users not found. Please run basic seed first.');
      return;
    }
    
    const adminId = (adminResult[0] as any).id;
    const mentorId = (mentorResult[0] as any).id;
    const menteeId = (menteeResult[0] as any).id;
    
    console.log('✅ Found existing users');

    // Grant admin permissions if not exists
    console.log('Setting up admin permissions...');
    
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
        ${adminId},
        true, true, true, true, true, true, true
      )
      ON CONFLICT (user_id) DO NOTHING
    `);
    
    console.log('✅ Admin permissions configured');

    // Get or create mentorship relationship
    console.log('Setting up mentorship relationship...');
    
    const relationshipResult = await db.execute(sql`
      SELECT id FROM mentorship_relationships 
      WHERE mentor_user_id = ${mentorId} AND mentee_user_id = ${menteeId}
      LIMIT 1
    `);
    
    let relationshipId;
    if (relationshipResult.length > 0) {
      relationshipId = (relationshipResult[0] as any).id;
      console.log('✅ Using existing mentorship relationship');
    } else {
      const [newRel] = await db.execute(sql`
        INSERT INTO mentorship_relationships (
          mentor_user_id,
          mentee_user_id,
          status,
          started_at
        )
        VALUES (
          ${mentorId},
          ${menteeId},
          'active',
          NOW() - INTERVAL '30 days'
        )
        RETURNING id
      `);
      relationshipId = (newRel as any).id;
      console.log('✅ Created new mentorship relationship');
    }

    // Create sample meetings
    console.log('Creating sample meetings...');
    
    // Check if meetings already exist
    const meetingsCount = await db.execute(sql`
      SELECT COUNT(*) as count FROM meetings WHERE relationship_id = ${relationshipId}
    `);
    
    if ((meetingsCount[0] as any).count === '0') {
      // Past completed meeting
      await db.execute(sql`
        INSERT INTO meetings (
          relationship_id,
          scheduled_at,
          duration_minutes,
          meeting_type,
          status
        )
        VALUES 
          (${relationshipId}, NOW() - INTERVAL '7 days', 60, 'regular', 'completed'),
          (${relationshipId}, NOW() + INTERVAL '7 days', 60, 'regular', 'scheduled')
      `);
      console.log('✅ Sample meetings created');
    } else {
      console.log('✅ Meetings already exist');
    }

    // Create sample resources
    console.log('Creating sample resources...');
    
    const resourcesCount = await db.execute(sql`
      SELECT COUNT(*) as count FROM resources
    `);
    
    if ((resourcesCount[0] as any).count === '0') {
      const [resource] = await db.execute(sql`
        INSERT INTO resources (
          title,
          description,
          resource_type,
          file_url,
          access_level,
          uploaded_by
        )
        VALUES (
          'Getting Started Guide',
          'A comprehensive guide for new members',
          'document',
          'https://example.com/guide.pdf',
          'member',
          ${adminId}
        )
        RETURNING id
      `);
      
      const resourceId = (resource as any).id;
      
      // Create access logs
      await db.execute(sql`
        INSERT INTO resource_access_logs (resource_id, user_id, action)
        VALUES 
          (${resourceId}, ${menteeId}, 'view'),
          (${resourceId}, ${mentorId}, 'view')
      `);
      
      console.log('✅ Sample resources and access logs created');
    } else {
      console.log('✅ Resources already exist');
    }

    // Create sample activity logs
    console.log('Creating sample activity logs...');
    
    await db.execute(sql`
      INSERT INTO activity_logs (user_id, action, entity_type)
      VALUES 
        (${adminId}, 'SIGN_IN', 'session'),
        (${mentorId}, 'SCHEDULE_MEETING', 'meeting'),
        (${menteeId}, 'ACCESS_RESOURCE', 'resource')
      ON CONFLICT DO NOTHING
    `);
    
    console.log('✅ Sample activity logs created');

    console.log('\n🎉 Phase 4 test data seeded successfully!');
    console.log('\nTest features ready:');
    console.log('  - Meeting management system');
    console.log('  - Resource access tracking');
    console.log('  - Activity logs viewer');
    console.log('  - Admin permissions system');
    
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedPhase4Data();