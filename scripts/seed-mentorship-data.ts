import { db } from '@/lib/db/drizzle';
import { users, userRoles, mentorProfiles, menteeProfiles, userMemberships } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';

async function seedMentorshipData() {
  console.log('🌱 Seeding mentorship data...\n');

  try {
    // Create sample mentors
    const mentors = [
      {
        email: 'sarah.chen@example.com',
        name: 'Sarah Chen',
        password: await bcrypt.hash('password123', 10),
        profile: {
          expertiseAreas: ['Web Development', 'React', 'TypeScript', 'Node.js'],
          yearsExperience: 8,
          currentRole: 'Senior Software Engineer',
          company: 'Tech Corp',
          bio: 'Passionate about mentoring junior developers and helping them grow their careers in tech.',
          availabilityHoursPerMonth: 6,
          preferredMeetingTypes: ['Video Call', 'Chat/Messaging'],
          languagesSpoken: ['English', 'Mandarin'],
          maxMentees: 3,
          isAcceptingMentees: true,
        }
      },
      {
        email: 'maria.garcia@example.com',
        name: 'Maria Garcia',
        password: await bcrypt.hash('password123', 10),
        profile: {
          expertiseAreas: ['Data Science', 'Machine Learning', 'Python', 'AI'],
          yearsExperience: 10,
          currentRole: 'Lead Data Scientist',
          company: 'AI Innovations',
          bio: 'Helping women break into data science and AI. Specialized in career transitions.',
          availabilityHoursPerMonth: 4,
          preferredMeetingTypes: ['Video Call', 'Email Mentoring'],
          languagesSpoken: ['English', 'Spanish'],
          maxMentees: 2,
          isAcceptingMentees: true,
        }
      },
      {
        email: 'priya.patel@example.com',
        name: 'Priya Patel',
        password: await bcrypt.hash('password123', 10),
        profile: {
          expertiseAreas: ['Cloud Computing', 'DevOps', 'AWS', 'Kubernetes'],
          yearsExperience: 6,
          currentRole: 'DevOps Engineer',
          company: 'Cloud Solutions Inc',
          bio: 'Guiding the next generation of cloud engineers. Focus on practical skills and certifications.',
          availabilityHoursPerMonth: 5,
          preferredMeetingTypes: ['Video Call', 'In-Person'],
          languagesSpoken: ['English', 'Hindi'],
          maxMentees: 4,
          isAcceptingMentees: true,
        }
      }
    ];

    // Create sample mentees
    const mentees = [
      {
        email: 'emily.johnson@example.com',
        name: 'Emily Johnson',
        password: await bcrypt.hash('password123', 10),
        profile: {
          learningGoals: ['Learn React', 'Get first tech job', 'Build portfolio'],
          areasOfInterest: ['Frontend Development', 'UI/UX'],
          currentLevel: 'Junior',
          preferredMentorExpertise: ['Web Development', 'React'],
          preferredMeetingFrequency: 'Bi-weekly',
        }
      },
      {
        email: 'lisa.wong@example.com',
        name: 'Lisa Wong',
        password: await bcrypt.hash('password123', 10),
        profile: {
          learningGoals: ['Transition to data science', 'Learn Python', 'Build ML projects'],
          areasOfInterest: ['Data Science', 'Machine Learning'],
          currentLevel: 'Career Changer',
          preferredMentorExpertise: ['Data Science', 'Python'],
          preferredMeetingFrequency: 'Weekly',
        }
      }
    ];

    // Insert mentors
    console.log('Creating mentors...');
    for (const mentor of mentors) {
      // Check if user already exists
      const existingUser = await db.select().from(users)
        .where(eq(users.email, mentor.email))
        .limit(1);
      
      if (existingUser.length > 0) {
        console.log(`✓ Mentor ${mentor.name} already exists`);
        continue;
      }

      // Create user
      const [newUser] = await db.insert(users).values({
        email: mentor.email,
        name: mentor.name,
        passwordHash: mentor.password,
      }).returning();

      // Create membership
      await db.insert(userMemberships).values({
        userId: newUser.id,
        tier: 'free',
      });

      // Create mentor role
      await db.insert(userRoles).values({
        userId: newUser.id,
        roleType: 'mentor',
        isActive: true,
        activationStep: 3,
      });

      // Create mentor profile
      await db.insert(mentorProfiles).values({
        userId: newUser.id,
        ...mentor.profile,
        profileCompletedAt: new Date(),
      });

      console.log(`✓ Created mentor: ${mentor.name}`);
    }

    // Insert mentees
    console.log('\nCreating mentees...');
    for (const mentee of mentees) {
      // Check if user already exists
      const existingUser = await db.select().from(users)
        .where(eq(users.email, mentee.email))
        .limit(1);
      
      if (existingUser.length > 0) {
        console.log(`✓ Mentee ${mentee.name} already exists`);
        continue;
      }

      // Create user
      const [newUser] = await db.insert(users).values({
        email: mentee.email,
        name: mentee.name,
        passwordHash: mentee.password,
      }).returning();

      // Create membership
      await db.insert(userMemberships).values({
        userId: newUser.id,
        tier: 'free',
      });

      // Create mentee role
      await db.insert(userRoles).values({
        userId: newUser.id,
        roleType: 'mentee',
        isActive: true,
        activationStep: 3,
      });

      // Create mentee profile
      await db.insert(menteeProfiles).values({
        userId: newUser.id,
        ...mentee.profile,
        profileCompletedAt: new Date(),
      });

      console.log(`✓ Created mentee: ${mentee.name}`);
    }

    console.log('\n✅ Mentorship data seeding completed!');
    console.log('\nTest accounts created:');
    console.log('Mentors:');
    mentors.forEach(m => console.log(`  - ${m.email} / password123`));
    console.log('\nMentees:');
    mentees.forEach(m => console.log(`  - ${m.email} / password123`));

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit(0);
  }
}

// Add missing import
import { eq } from 'drizzle-orm';

seedMentorshipData();