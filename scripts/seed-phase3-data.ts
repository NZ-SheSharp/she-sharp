import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sql = postgres(process.env.DATABASE_URL!);

async function seedPhase3Data() {
  console.log('🌱 Seeding Phase 3 data...\n');
  
  try {
    // Get a user to be the creator
    const [user] = await sql`
      SELECT id FROM users WHERE id = 6 LIMIT 1
    `;
    
    if (!user) {
      console.error('No user found to create content');
      return;
    }

    console.log('1. Creating sample events...');
    
    // Create events
    const events = [
      {
        title: 'Introduction to Cloud Computing',
        description: 'Learn the basics of cloud computing with hands-on AWS exercises',
        event_type: 'workshop',
        start_time: new Date('2025-08-15T18:00:00'),
        end_time: new Date('2025-08-15T20:00:00'),
        timezone: 'America/Los_Angeles',
        location_type: 'virtual',
        location_details: JSON.stringify({
          meetingLink: 'https://zoom.us/j/123456789',
          instructions: 'Zoom link will be sent 1 hour before the event'
        }),
        capacity: 50,
        current_registrations: 0,
        registration_deadline: new Date('2025-08-14T23:59:59'),
        waitlist_enabled: true,
        is_members_only: false,
        required_membership_tier: null,
        agenda: JSON.stringify([
          { time: '6:00 PM', topic: 'Introduction to Cloud Concepts' },
          { time: '6:30 PM', topic: 'AWS Services Overview' },
          { time: '7:00 PM', topic: 'Hands-on Lab: Deploy Your First App' },
          { time: '7:45 PM', topic: 'Q&A Session' }
        ]),
        speakers: JSON.stringify([
          { name: 'Sarah Chen', title: 'Cloud Architect', bio: '10 years experience in cloud infrastructure' }
        ]),
        created_by: user.id
      },
      {
        title: 'Women in Tech Networking Night',
        description: 'Connect with fellow women in technology over drinks and appetizers',
        event_type: 'networking',
        start_time: new Date('2025-08-20T17:30:00'),
        end_time: new Date('2025-08-20T20:00:00'),
        timezone: 'America/Los_Angeles',
        location_type: 'physical',
        location_details: JSON.stringify({
          address: '123 Tech Street, San Francisco, CA 94102',
          venue: 'TechHub SF',
          room: 'Main Hall',
          instructions: 'Free parking available in the building'
        }),
        capacity: 100,
        current_registrations: 45,
        registration_deadline: new Date('2025-08-19T23:59:59'),
        waitlist_enabled: false,
        is_members_only: false,
        required_membership_tier: null,
        agenda: null,
        speakers: null,
        created_by: user.id
      },
      {
        title: 'AI/ML Career Panel',
        description: 'Hear from women leaders in AI and machine learning about their career journeys',
        event_type: 'conference',
        start_time: new Date('2025-08-25T18:00:00'),
        end_time: new Date('2025-08-25T19:30:00'),
        timezone: 'America/Los_Angeles',
        location_type: 'hybrid',
        location_details: JSON.stringify({
          address: '456 Innovation Blvd, Palo Alto, CA 94301',
          venue: 'Stanford Campus',
          meetingLink: 'https://youtube.com/live/abc123',
          instructions: 'In-person seats limited, streaming available'
        }),
        capacity: 200,
        current_registrations: 150,
        registration_deadline: new Date('2025-08-24T23:59:59'),
        waitlist_enabled: false,
        is_members_only: true,
        required_membership_tier: 'basic',
        agenda: null,
        speakers: JSON.stringify([
          { name: 'Dr. Emily Wang', title: 'ML Research Lead', bio: 'PhD in Computer Science, Stanford' },
          { name: 'Maria Rodriguez', title: 'AI Product Manager', bio: 'Former Google AI team lead' },
          { name: 'Priya Patel', title: 'Data Science Director', bio: '15 years in data science' }
        ]),
        created_by: user.id
      }
    ];

    for (const event of events) {
      await sql`
        INSERT INTO events (
          title, description, event_type, start_time, end_time, timezone,
          location_type, location_details, capacity, current_registrations,
          registration_deadline, waitlist_enabled, is_members_only,
          required_membership_tier, agenda, speakers, created_by
        ) VALUES (
          ${event.title}, ${event.description}, ${event.event_type},
          ${event.start_time}, ${event.end_time}, ${event.timezone},
          ${event.location_type}, ${event.location_details}::jsonb,
          ${event.capacity}, ${event.current_registrations},
          ${event.registration_deadline || null}, ${event.waitlist_enabled},
          ${event.is_members_only}, ${event.required_membership_tier || null},
          ${event.agenda ? event.agenda : null}::jsonb, 
          ${event.speakers ? event.speakers : null}::jsonb,
          ${event.created_by}
        )
      `;
    }
    console.log(`   ✅ Created ${events.length} sample events`);

    console.log('\n2. Creating sample resources...');
    
    // Create resources
    const resources = [
      {
        title: 'Getting Started with Python',
        description: 'A comprehensive guide to Python programming for beginners',
        category: 'programming',
        resource_type: 'document',
        file_url: '/resources/python-guide.pdf',
        file_size: 2457600, // 2.4 MB
        mime_type: 'application/pdf',
        is_public: true,
        is_members_only: false,
        tags: JSON.stringify(['python', 'programming', 'beginner']),
        metadata: JSON.stringify({ pages: 45, language: 'English' }),
        view_count: 156,
        download_count: 89,
        uploaded_by: user.id
      },
      {
        title: 'React Best Practices 2025',
        description: 'Learn modern React patterns and best practices',
        category: 'web-development',
        resource_type: 'document',
        file_url: '/resources/react-best-practices.pdf',
        file_size: 1843200, // 1.8 MB
        mime_type: 'application/pdf',
        is_public: true,
        is_members_only: false,
        tags: JSON.stringify(['react', 'javascript', 'web']),
        view_count: 234,
        download_count: 112,
        uploaded_by: user.id
      },
      {
        title: 'Interview Preparation Toolkit',
        description: 'Complete guide to technical interview preparation',
        category: 'career',
        resource_type: 'document',
        file_url: '/resources/interview-prep.pdf',
        file_size: 3145728, // 3 MB
        mime_type: 'application/pdf',
        is_public: false,
        is_members_only: true,
        required_membership_tier: 'basic',
        tags: JSON.stringify(['interview', 'career', 'preparation']),
        view_count: 567,
        download_count: 234,
        uploaded_by: user.id
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Video course on ML basics',
        category: 'ai-ml',
        resource_type: 'video',
        file_url: '/resources/ml-fundamentals.mp4',
        file_size: 52428800, // 50 MB
        mime_type: 'video/mp4',
        is_public: false,
        is_members_only: true,
        required_membership_tier: 'premium',
        tags: JSON.stringify(['machine-learning', 'ai', 'video']),
        view_count: 789,
        download_count: 345,
        uploaded_by: user.id
      }
    ];

    for (const resource of resources) {
      await sql`
        INSERT INTO resources (
          title, description, category, resource_type, file_url,
          file_size, mime_type, is_public, is_members_only,
          required_membership_tier, tags, metadata, view_count,
          download_count, uploaded_by
        ) VALUES (
          ${resource.title}, ${resource.description}, ${resource.category},
          ${resource.resource_type}, ${resource.file_url}, ${resource.file_size},
          ${resource.mime_type}, ${resource.is_public}, ${resource.is_members_only},
          ${resource.required_membership_tier || null}, ${resource.tags}::jsonb,
          ${resource.metadata || null}::jsonb, ${resource.view_count},
          ${resource.download_count}, ${resource.uploaded_by}
        )
      `;
    }
    console.log(`   ✅ Created ${resources.length} sample resources`);

    console.log('\n✅ Phase 3 data seeding completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Error seeding data:', error.message);
  } finally {
    await sql.end();
  }
}

seedPhase3Data();