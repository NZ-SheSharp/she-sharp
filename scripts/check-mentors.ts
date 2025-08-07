import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sql = postgres(process.env.DATABASE_URL as string);

async function checkMentors() {
  const mentors = await sql`
    SELECT 
      mp.id as profile_id,
      mp.user_id,
      u.name,
      u.email,
      mp.job_title,
      mp.company,
      mp.expertise_areas,
      ur.is_active as mentor_role_active
    FROM mentor_profiles mp
    LEFT JOIN users u ON mp.user_id = u.id
    LEFT JOIN user_roles ur ON u.id = ur.user_id AND ur.role_type = 'mentor'
    ORDER BY mp.id
  `;
  
  console.log('Current mentor profiles:');
  console.table(mentors);
  
  if (mentors.length > 0) {
    console.log('\nTesting API with first mentor ID:', mentors[0].profile_id);
  }
  
  await sql.end();
}

checkMentors();