#!/usr/bin/env ts-node

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  console.error('Please check your .env.local file or DATABASE_URL configuration');
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

interface TableInfo {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

interface ForeignKeyInfo {
  constraint_name: string;
  table_name: string;
  column_name: string;
  foreign_table_name: string;
  foreign_column_name: string;
}

interface IndexInfo {
  table_name: string;
  index_name: string;
  column_name: string;
}

async function verifyPhase2Tables() {
  console.log('🔍 Verifying Phase 2 Mentorship Tables and Relationships...\n');

  const phase2Tables = [
    'mentor_profiles',
    'mentee_profiles', 
    'mentorship_relationships',
    'meetings'
  ];

  try {
    // 1. Check if tables exist
    console.log('1. Checking table existence:');
    const existingTables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('mentor_profiles', 'mentee_profiles', 'mentorship_relationships', 'meetings')
      ORDER BY table_name
    `);

    const foundTables = existingTables.map(row => row.table_name as string);
    
    for (const table of phase2Tables) {
      if (foundTables.includes(table)) {
        console.log(`   ✅ ${table} - exists`);
      } else {
        console.log(`   ❌ ${table} - missing`);
      }
    }

    if (foundTables.length !== phase2Tables.length) {
      console.log(`\n❌ Only ${foundTables.length}/${phase2Tables.length} Phase 2 tables found`);
      return;
    }

    // 2. Check table structures
    console.log('\n2. Verifying table structures:');
    
    for (const tableName of foundTables) {
      console.log(`\n   📋 ${tableName}:`);
      
      const columnsResult = await db.execute(sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = ${tableName}
        ORDER BY ordinal_position
      `);
      const columns = columnsResult as unknown as TableInfo[];

      columns.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`      - ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`);
      });

      // Verify key columns for each table
      const columnNames = columns.map(c => c.column_name);
      
      switch (tableName) {
        case 'mentor_profiles':
          const mentorRequiredCols = ['id', 'user_id', 'expertise_areas', 'years_experience', 'max_mentees', 'current_mentees_count', 'is_accepting_mentees'];
          const mentorMissing = mentorRequiredCols.filter(col => !columnNames.includes(col));
          if (mentorMissing.length > 0) {
            console.log(`      ❌ Missing columns: ${mentorMissing.join(', ')}`);
          } else {
            console.log(`      ✅ All key columns present`);
          }
          break;
          
        case 'mentee_profiles':
          const menteeRequiredCols = ['id', 'user_id', 'learning_goals', 'career_stage', 'preferred_expertise_areas'];
          const menteeMissing = menteeRequiredCols.filter(col => !columnNames.includes(col));
          if (menteeMissing.length > 0) {
            console.log(`      ❌ Missing columns: ${menteeMissing.join(', ')}`);
          } else {
            console.log(`      ✅ All key columns present`);
          }
          break;
          
        case 'mentorship_relationships':
          const relationshipRequiredCols = ['id', 'mentor_user_id', 'mentee_user_id', 'status', 'created_at', 'updated_at'];
          const relationshipMissing = relationshipRequiredCols.filter(col => !columnNames.includes(col));
          if (relationshipMissing.length > 0) {
            console.log(`      ❌ Missing columns: ${relationshipMissing.join(', ')}`);
          } else {
            console.log(`      ✅ All key columns present`);
          }
          break;
          
        case 'meetings':
          const meetingRequiredCols = ['id', 'relationship_id', 'scheduled_at', 'meeting_type', 'status', 'created_at', 'updated_at'];
          const meetingMissing = meetingRequiredCols.filter(col => !columnNames.includes(col));
          if (meetingMissing.length > 0) {
            console.log(`      ❌ Missing columns: ${meetingMissing.join(', ')}`);
          } else {
            console.log(`      ✅ All key columns present`);
          }
          break;
      }
    }

    // 3. Check foreign key relationships
    console.log('\n3. Verifying foreign key relationships:');
    
    const foreignKeysResult = await db.execute(sql`
      SELECT 
        tc.constraint_name,
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM 
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
      WHERE 
        tc.constraint_type = 'FOREIGN KEY' 
        AND tc.table_name IN ('mentor_profiles', 'mentee_profiles', 'mentorship_relationships', 'meetings')
      ORDER BY tc.table_name, tc.constraint_name
    `);
    const foreignKeys = foreignKeysResult as unknown as ForeignKeyInfo[];

    const expectedForeignKeys = [
      { table: 'mentor_profiles', column: 'user_id', references: 'users.id' },
      { table: 'mentor_profiles', column: 'verified_by', references: 'users.id' },
      { table: 'mentee_profiles', column: 'user_id', references: 'users.id' },
      { table: 'mentorship_relationships', column: 'mentor_user_id', references: 'users.id' },
      { table: 'mentorship_relationships', column: 'mentee_user_id', references: 'users.id' },
      { table: 'meetings', column: 'relationship_id', references: 'mentorship_relationships.id' },
    ];

    console.log('   Expected foreign keys:');
    for (const expected of expectedForeignKeys) {
      const found = foreignKeys.find(fk => 
        fk.table_name === expected.table && 
        fk.column_name === expected.column &&
        `${fk.foreign_table_name}.${fk.foreign_column_name}` === expected.references
      );
      
      if (found) {
        console.log(`   ✅ ${expected.table}.${expected.column} → ${expected.references}`);
      } else {
        console.log(`   ❌ ${expected.table}.${expected.column} → ${expected.references} - missing`);
      }
    }

    // 4. Check indexes
    console.log('\n4. Verifying indexes:');
    
    const indexesResult = await db.execute(sql`
      SELECT 
        t.relname AS table_name,
        i.relname AS index_name,
        a.attname AS column_name
      FROM 
        pg_class t,
        pg_class i,
        pg_index ix,
        pg_attribute a
      WHERE 
        t.oid = ix.indrelid
        AND i.oid = ix.indexrelid
        AND a.attrelid = t.oid
        AND a.attnum = ANY(ix.indkey)
        AND t.relkind = 'r'
        AND t.relname IN ('mentor_profiles', 'mentee_profiles', 'mentorship_relationships', 'meetings')
        AND i.relname NOT LIKE '%_pkey'
      ORDER BY t.relname, i.relname
    `);
    const indexes = indexesResult as unknown as IndexInfo[];

    const expectedIndexes = [
      { table: 'mentor_profiles', column: 'user_id' },
      { table: 'mentee_profiles', column: 'user_id' },
      { table: 'mentorship_relationships', column: 'mentor_user_id' },
      { table: 'mentorship_relationships', column: 'mentee_user_id' },
      { table: 'mentorship_relationships', column: 'status' },
      { table: 'meetings', column: 'relationship_id' },
      { table: 'meetings', column: 'scheduled_at' },
      { table: 'meetings', column: 'status' },
    ];

    console.log('   Expected indexes:');
    for (const expected of expectedIndexes) {
      const found = indexes.find(idx => 
        idx.table_name === expected.table && 
        idx.column_name === expected.column
      );
      
      if (found) {
        console.log(`   ✅ ${expected.table}.${expected.column} - indexed`);
      } else {
        console.log(`   ❌ ${expected.table}.${expected.column} - index missing`);
      }
    }

    // 5. Check enum types
    console.log('\n5. Verifying enum types:');
    
    const enums = await db.execute(sql`
      SELECT 
        t.typname AS enum_name,
        e.enumlabel AS enum_value
      FROM 
        pg_type t 
        JOIN pg_enum e ON t.oid = e.enumtypid  
      WHERE 
        t.typname IN ('relationship_status', 'meeting_status', 'meeting_type')
      ORDER BY t.typname, e.enumsortorder
    `);

    const enumGroups = enums.reduce((acc: Record<string, string[]>, row: any) => {
      if (!acc[row.enum_name]) {
        acc[row.enum_name] = [];
      }
      acc[row.enum_name].push(row.enum_value);
      return acc;
    }, {});

    const expectedEnums = {
      relationship_status: ['pending', 'active', 'paused', 'completed', 'rejected'],
      meeting_status: ['scheduled', 'completed', 'cancelled', 'no_show'],
      meeting_type: ['intro', 'regular', 'milestone', 'final']
    };

    for (const [enumName, expectedValues] of Object.entries(expectedEnums)) {
      const actualValues = enumGroups[enumName] || [];
      const missing = expectedValues.filter(v => !actualValues.includes(v));
      const extra = actualValues.filter(v => !expectedValues.includes(v));
      
      if (missing.length === 0 && extra.length === 0) {
        console.log(`   ✅ ${enumName}: [${actualValues.join(', ')}]`);
      } else {
        console.log(`   ❌ ${enumName}:`);
        if (missing.length > 0) {
          console.log(`      Missing: [${missing.join(', ')}]`);
        }
        if (extra.length > 0) {
          console.log(`      Extra: [${extra.join(', ')}]`);
        }
        console.log(`      Actual: [${actualValues.join(', ')}]`);
      }
    }

    // 6. Test data integrity with sample queries
    console.log('\n6. Testing data integrity:');
    
    try {
      // Test mentor profiles with user join
      const mentorCount = await db.execute(sql`
        SELECT COUNT(*) as count 
        FROM mentor_profiles mp
        JOIN users u ON mp.user_id = u.id
      `);
      console.log(`   ✅ Mentor profiles with valid users: ${mentorCount[0].count}`);

      // Test mentee profiles with user join  
      const menteeCount = await db.execute(sql`
        SELECT COUNT(*) as count 
        FROM mentee_profiles mp
        JOIN users u ON mp.user_id = u.id
      `);
      console.log(`   ✅ Mentee profiles with valid users: ${menteeCount[0].count}`);

      // Test mentorship relationships with valid users
      const relationshipCount = await db.execute(sql`
        SELECT COUNT(*) as count 
        FROM mentorship_relationships mr
        JOIN users mentor ON mr.mentor_user_id = mentor.id
        JOIN users mentee ON mr.mentee_user_id = mentee.id
      `);
      console.log(`   ✅ Mentorship relationships with valid users: ${relationshipCount[0].count}`);

      // Test meetings with valid relationships
      const meetingCount = await db.execute(sql`
        SELECT COUNT(*) as count 
        FROM meetings m
        JOIN mentorship_relationships mr ON m.relationship_id = mr.id
      `);
      console.log(`   ✅ Meetings with valid relationships: ${meetingCount[0].count}`);

    } catch (error) {
      console.log(`   ❌ Data integrity check failed: ${error}`);
    }

    console.log('\n✅ Phase 2 table verification completed!');

  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the verification
verifyPhase2Tables();