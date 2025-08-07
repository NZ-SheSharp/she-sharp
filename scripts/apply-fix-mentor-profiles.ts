import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

async function applyFix() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  const sql = postgres(databaseUrl);

  try {
    console.log('Reading fix script...');
    const fixScript = fs.readFileSync(
      path.join(__dirname, 'fix-mentor-profiles-table.sql'),
      'utf-8'
    );

    console.log('Applying database fix for mentor_profiles table...');
    await sql.unsafe(fixScript);
    
    console.log('✅ Database fix applied successfully!');
    console.log('The mentor_profiles table now has the correct structure:');
    console.log('  - job_title column (instead of current_role)');
    console.log('  - expertise_areas column');
    console.log('  - Removed non-schema columns (timezone, languages_spoken, etc.)');

    // Verify the table structure
    const result = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'mentor_profiles' 
      ORDER BY ordinal_position
    `;
    
    console.log('\nCurrent mentor_profiles table structure:');
    result.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });

  } catch (error) {
    console.error('❌ Error applying fix:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

applyFix().catch(console.error);