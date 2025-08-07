import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function simpleSeed() {
  console.log('🌱 Creating sample mentor data...\n');
  
  try {
    // Directly insert sample data using SQL
    await db.execute(sql`
      -- Create a sample mentor user if not exists
      INSERT INTO users (email, name, password_hash)
      VALUES ('mentor1@example.com', 'Sarah Chen', '$2a$10$K7L1GaOaSjXrxzjXcJJsRuGqvczLN4gVOYFdJZE2NfLbAn7Qzjqqu')
      ON CONFLICT (email) DO NOTHING
    `);
    
    // Get the user ID
    const result = await db.execute(sql`
      SELECT id FROM users WHERE email = 'mentor1@example.com'
    `);
    
    if (result && result.length > 0) {
      const userId = (result[0] as any).id;
      console.log(`Found/created user with ID: ${userId}`);
      
      // Create user membership if not exists
      await db.execute(sql`
        INSERT INTO user_memberships (user_id, tier)
        VALUES (${userId}, 'free')
        ON CONFLICT (user_id) DO NOTHING
      `);
      
      // Create mentor role if not exists
      await db.execute(sql`
        INSERT INTO user_roles (user_id, role_type, is_active, activation_step)
        VALUES (${userId}, 'mentor', true, 3)
        ON CONFLICT (user_id, role_type) DO NOTHING
      `);
      
      // Create mentor profile if not exists
      await db.execute(sql`
        INSERT INTO mentor_profiles (
          user_id, 
          expertise_areas, 
          years_experience, 
          current_role, 
          company, 
          bio,
          availability_hours_per_month,
          preferred_meeting_types,
          languages_spoken,
          max_mentees,
          is_accepting_mentees,
          profile_completed_at
        ) VALUES (
          ${userId},
          ARRAY['Web Development', 'React', 'TypeScript'],
          8,
          'Senior Software Engineer',
          'Tech Corp',
          'Passionate about mentoring junior developers.',
          6,
          ARRAY['Video Call', 'Chat/Messaging'],
          ARRAY['English', 'Mandarin'],
          3,
          true,
          NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          bio = EXCLUDED.bio,
          is_accepting_mentees = true
      `);
      
      console.log('✅ Sample mentor created successfully!');
      console.log('Email: mentor1@example.com');
      console.log('Password: password123');
    }
    
    // Create a sample mentee
    await db.execute(sql`
      INSERT INTO users (email, name, password_hash)
      VALUES ('mentee1@example.com', 'Emily Johnson', '$2a$10$K7L1GaOaSjXrxzjXcJJsRuGqvczLN4gVOYFdJZE2NfLbAn7Qzjqqu')
      ON CONFLICT (email) DO NOTHING
    `);
    
    const menteeResult = await db.execute(sql`
      SELECT id FROM users WHERE email = 'mentee1@example.com'
    `);
    
    if (menteeResult && menteeResult.length > 0) {
      const menteeId = (menteeResult[0] as any).id;
      
      await db.execute(sql`
        INSERT INTO user_memberships (user_id, tier)
        VALUES (${menteeId}, 'free')
        ON CONFLICT (user_id) DO NOTHING
      `);
      
      await db.execute(sql`
        INSERT INTO user_roles (user_id, role_type, is_active, activation_step)
        VALUES (${menteeId}, 'mentee', true, 3)
        ON CONFLICT (user_id, role_type) DO NOTHING
      `);
      
      await db.execute(sql`
        INSERT INTO mentee_profiles (
          user_id,
          learning_goals,
          areas_of_interest,
          current_level,
          preferred_mentor_expertise,
          preferred_meeting_frequency,
          bio,
          profile_completed_at
        ) VALUES (
          ${menteeId},
          ARRAY['Learn React', 'Get first tech job'],
          ARRAY['Frontend Development', 'UI/UX'],
          'Junior',
          ARRAY['Web Development', 'React'],
          'Bi-weekly',
          'Eager to learn and grow in tech.',
          NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          bio = EXCLUDED.bio
      `);
      
      console.log('\n✅ Sample mentee created successfully!');
      console.log('Email: mentee1@example.com');
      console.log('Password: password123');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

simpleSeed();