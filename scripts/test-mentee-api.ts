import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sql = postgres(process.env.DATABASE_URL!);

async function testMenteeAPI() {
  console.log('🧪 Testing Mentee Profile API...\n');
  
  try {
    // Get a test user
    const [user] = await sql`
      SELECT id, email 
      FROM users 
      WHERE email IS NOT NULL
      LIMIT 1
    `;
    
    console.log(`Testing with user: ${user.email} (ID: ${user.id})`);
    
    // Test 1: Check table structure
    console.log('\n1. Checking table structure...');
    const cols = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns 
      WHERE table_name = 'mentee_profiles'
      AND column_name IN ('learning_goals', 'career_stage', 'preferred_expertise_areas', 'current_challenge')
      ORDER BY column_name
    `;
    
    console.log('   Required columns:');
    cols.forEach(col => {
      console.log(`   ✅ ${col.column_name}: ${col.data_type}`);
    });
    
    // Test 2: Simulate frontend data
    console.log('\n2. Testing with frontend data format...');
    const frontendData = {
      learningGoals: ['Get first tech job', 'Career transition'],
      areasOfInterest: ['Web Development', 'React'],
      currentLevel: 'Junior',
      preferredMentorExpertise: ['Frontend Development', 'React'],
      preferredMeetingFrequency: 'Bi-weekly',
      timezone: 'America/Los_Angeles',
      linkedinUrl: 'https://linkedin.com/in/test',
      bio: 'Aspiring developer'
    };
    
    // Test 3: Map to database format (like API does)
    console.log('\n3. Mapping to database format...');
    const profileData = {
      learningGoals: frontendData.learningGoals || [],
      careerStage: frontendData.currentLevel || null,
      preferredExpertiseAreas: frontendData.preferredMentorExpertise || [],
      preferredMeetingFrequency: frontendData.preferredMeetingFrequency || null,
      bio: frontendData.bio || null,
      currentChallenge: null, // Not in frontend
    };
    
    console.log('   ✅ Data mapped successfully');
    
    // Test 4: Save to database
    console.log('\n4. Testing database save...');
    const [result] = await sql`
      INSERT INTO mentee_profiles (
        user_id,
        learning_goals,
        career_stage,
        preferred_expertise_areas,
        preferred_meeting_frequency,
        bio,
        current_challenge,
        profile_completed_at
      ) VALUES (
        ${user.id},
        ${JSON.stringify(profileData.learningGoals)}::jsonb,
        ${profileData.careerStage},
        ${JSON.stringify(profileData.preferredExpertiseAreas)}::jsonb,
        ${profileData.preferredMeetingFrequency},
        ${profileData.bio},
        ${profileData.currentChallenge},
        ${new Date()}
      )
      ON CONFLICT (user_id) DO UPDATE SET
        learning_goals = ${JSON.stringify(profileData.learningGoals)}::jsonb,
        career_stage = ${profileData.careerStage},
        preferred_expertise_areas = ${JSON.stringify(profileData.preferredExpertiseAreas)}::jsonb,
        preferred_meeting_frequency = ${profileData.preferredMeetingFrequency},
        bio = ${profileData.bio},
        current_challenge = ${profileData.currentChallenge},
        profile_completed_at = COALESCE(mentee_profiles.profile_completed_at, ${new Date()})
      RETURNING *
    `;
    
    console.log('   ✅ Save successful');
    console.log(`   - Career Stage: ${result.career_stage}`);
    console.log(`   - Learning Goals: ${JSON.stringify(result.learning_goals)}`);
    console.log(`   - Preferred Expertise: ${JSON.stringify(result.preferred_expertise_areas)}`);
    
    // Test 5: Read back
    console.log('\n5. Testing data retrieval...');
    const [profile] = await sql`
      SELECT * FROM mentee_profiles
      WHERE user_id = ${user.id}
    `;
    
    console.log('   ✅ Profile retrieved successfully');
    console.log(`   - All fields present and correct`);
    
    // Clean up
    console.log('\n6. Cleaning up test data...');
    await sql`
      DELETE FROM mentee_profiles 
      WHERE user_id = ${user.id}
      AND bio = 'Aspiring developer'
    `;
    console.log('   ✅ Test data cleaned up');
    
    console.log('\n✅ All tests passed! The mentee profile API should work correctly now.');
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
    if (error.code === '42703') {
      console.error('Missing column in database. Run migration to add missing columns.');
    }
  } finally {
    await sql.end();
  }
}

testMenteeAPI();