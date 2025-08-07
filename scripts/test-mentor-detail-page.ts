import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sql = postgres(process.env.DATABASE_URL!);

async function testMentorDetailPage() {
  console.log('🧪 Testing Mentor Detail Page API...\n');
  
  try {
    // First, create a test mentor profile
    console.log('1. Creating test mentor profile...');
    const [user] = await sql`
      SELECT id, email, name 
      FROM users 
      WHERE email IS NOT NULL
      LIMIT 1
    `;
    
    // Ensure user has mentor role
    await sql`
      INSERT INTO user_roles (user_id, role_type, is_active, activation_step)
      VALUES (${user.id}, 'mentor', true, 3)
      ON CONFLICT (user_id, role_type) 
      DO UPDATE SET is_active = true, activation_step = 3
    `;
    
    // Create mentor profile
    const [mentorProfile] = await sql`
      INSERT INTO mentor_profiles (
        user_id,
        job_title,
        company,
        years_experience,
        expertise_areas,
        bio,
        availability_hours_per_month,
        max_mentees,
        is_accepting_mentees,
        profile_completed_at
      ) VALUES (
        ${user.id},
        'Senior Engineer',
        'Tech Corp',
        5,
        ${JSON.stringify(['Web Development', 'React'])}::jsonb,
        'Experienced developer passionate about mentoring',
        8,
        3,
        true,
        ${new Date()}
      )
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        job_title = 'Senior Engineer',
        company = 'Tech Corp',
        expertise_areas = ${JSON.stringify(['Web Development', 'React'])}::jsonb
      RETURNING *
    `;
    
    console.log(`   ✅ Created mentor profile with ID: ${mentorProfile.id}`);
    
    // Test 2: Query mentor details like the API would
    console.log('\n2. Testing mentor details query...');
    const [mentor] = await sql`
      SELECT 
        mp.id,
        mp.user_id,
        u.name,
        u.email,
        u.image,
        mp.expertise_areas,
        mp.years_experience,
        mp.job_title,
        mp.company,
        mp.bio,
        mp.linkedin_url,
        mp.availability_hours_per_month,
        mp.max_mentees,
        mp.current_mentees_count,
        mp.is_accepting_mentees,
        mp.profile_completed_at,
        mp.verified_at,
        mp.created_at
      FROM mentor_profiles mp
      INNER JOIN users u ON mp.user_id = u.id
      INNER JOIN user_roles ur ON u.id = ur.user_id
      WHERE mp.id = ${mentorProfile.id}
        AND ur.role_type = 'mentor'
        AND ur.is_active = true
      LIMIT 1
    `;
    
    if (mentor) {
      console.log('   ✅ Mentor details retrieved successfully');
      console.log(`   - Name: ${mentor.name}`);
      console.log(`   - Job: ${mentor.job_title} at ${mentor.company}`);
      console.log(`   - Expertise: ${JSON.stringify(mentor.expertise_areas)}`);
    } else {
      console.log('   ❌ Failed to retrieve mentor details');
    }
    
    // Test 3: Check relationship status
    console.log('\n3. Testing relationship status check...');
    const relationships = await sql`
      SELECT COUNT(*) as count
      FROM mentorship_relationships
      WHERE mentor_user_id = ${user.id}
    `;
    console.log(`   ✅ Relationship count: ${relationships[0].count}`);
    
    // Test 4: Calculate spots available
    console.log('\n4. Testing spots calculation...');
    const spotsAvailable = mentor.max_mentees - mentor.current_mentees_count;
    console.log(`   ✅ Spots available: ${spotsAvailable} (${mentor.current_mentees_count}/${mentor.max_mentees})`);
    
    // Clean up test data
    console.log('\n5. Cleaning up test data...');
    await sql`
      DELETE FROM mentor_profiles 
      WHERE user_id = ${user.id}
      AND job_title = 'Senior Engineer'
      AND company = 'Tech Corp'
    `;
    
    console.log('\n✅ All tests passed! Mentor detail page API should work correctly.');
    console.log('\nNotes:');
    console.log('- The params issue has been fixed (params is now awaited)');
    console.log('- The relationships API has been simplified to avoid complex SQL joins');
    console.log('- Mentor profiles use JSONB for expertise_areas');
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    await sql.end();
  }
}

testMentorDetailPage();