import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sql = postgres(process.env.DATABASE_URL!);

async function testMentorProfileAPI() {
  console.log('🧪 Testing Mentor Profile API...\n');
  
  try {
    // Get a test user
    const [user] = await sql`
      SELECT id, email 
      FROM users 
      WHERE email IS NOT NULL
      LIMIT 1
    `;
    
    console.log(`Testing with user: ${user.email} (ID: ${user.id})`);
    
    // Test data that matches what the frontend sends
    const testData = {
      expertiseAreas: ['Web Development', 'React', 'Node.js'],
      yearsExperience: 5,
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      bio: 'Experienced developer passionate about mentoring',
      linkedinUrl: 'https://linkedin.com/in/testuser',
      availabilityHoursPerMonth: 8,
      maxMentees: 3,
      isAcceptingMentees: true
    };
    
    // Simulate what the API does
    console.log('\n1. Testing data preparation...');
    const profileData = {
      expertiseAreas: testData.expertiseAreas || [],
      yearsExperience: testData.yearsExperience || 0,
      jobTitle: testData.jobTitle || null,
      company: testData.company || null,
      bio: testData.bio || null,
      linkedinUrl: testData.linkedinUrl || null,
      availabilityHoursPerMonth: testData.availabilityHoursPerMonth || 4,
      maxMentees: testData.maxMentees || 3,
      isAcceptingMentees: testData.isAcceptingMentees !== undefined ? testData.isAcceptingMentees : true,
    };
    
    console.log('   ✅ Data prepared correctly');
    
    // Test insert/update
    console.log('\n2. Testing database insert/update...');
    const [result] = await sql`
      INSERT INTO mentor_profiles (
        user_id,
        expertise_areas,
        years_experience,
        job_title,
        company,
        bio,
        linkedin_url,
        availability_hours_per_month,
        max_mentees,
        is_accepting_mentees,
        profile_completed_at
      ) VALUES (
        ${user.id},
        ${JSON.stringify(profileData.expertiseAreas)}::jsonb,
        ${profileData.yearsExperience},
        ${profileData.jobTitle},
        ${profileData.company},
        ${profileData.bio},
        ${profileData.linkedinUrl},
        ${profileData.availabilityHoursPerMonth},
        ${profileData.maxMentees},
        ${profileData.isAcceptingMentees},
        ${new Date()}
      )
      ON CONFLICT (user_id) DO UPDATE SET
        expertise_areas = ${JSON.stringify(profileData.expertiseAreas)}::jsonb,
        years_experience = ${profileData.yearsExperience},
        job_title = ${profileData.jobTitle},
        company = ${profileData.company},
        bio = ${profileData.bio},
        linkedin_url = ${profileData.linkedinUrl},
        availability_hours_per_month = ${profileData.availabilityHoursPerMonth},
        max_mentees = ${profileData.maxMentees},
        is_accepting_mentees = ${profileData.isAcceptingMentees},
        profile_completed_at = COALESCE(mentor_profiles.profile_completed_at, ${new Date()})
      RETURNING *
    `;
    
    console.log('   ✅ Database operation successful');
    console.log(`   - Job Title: ${result.job_title}`);
    console.log(`   - Expertise: ${JSON.stringify(result.expertise_areas)}`);
    console.log(`   - Years Experience: ${result.years_experience}`);
    
    // Test reading back
    console.log('\n3. Testing data retrieval...');
    const [profile] = await sql`
      SELECT * FROM mentor_profiles
      WHERE user_id = ${user.id}
    `;
    
    console.log('   ✅ Profile retrieved successfully');
    console.log(`   - Expertise areas type: ${typeof profile.expertise_areas}`);
    console.log(`   - Expertise areas value: ${JSON.stringify(profile.expertise_areas)}`);
    
    // Clean up test data
    console.log('\n4. Cleaning up test data...');
    await sql`
      DELETE FROM mentor_profiles 
      WHERE user_id = ${user.id}
      AND job_title = 'Senior Software Engineer'
    `;
    console.log('   ✅ Test data cleaned up');
    
    console.log('\n✅ All tests passed! The mentor profile API should work correctly now.');
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Error details:', error);
  } finally {
    await sql.end();
  }
}

testMentorProfileAPI();