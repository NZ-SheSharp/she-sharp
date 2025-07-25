export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  description: string;
  expertise: string[];
  industry: string;
  yearsOfExperience: number;
  languages: string[];
  linkedIn?: string;
  email?: string;
  bio?: string;
  achievements?: string[];
  menteeCount?: number;
  rating?: number;
  availability?: 'available' | 'busy' | 'unavailable';
}

export interface MentorCategory {
  id: string;
  name: string;
  icon?: string;
  mentorCount: number;
}

export const mentorCategories: MentorCategory[] = [
  { id: 'all', name: 'All Mentors', mentorCount: 18 },
  { id: 'technology', name: 'Technology', icon: '💻', mentorCount: 8 },
  { id: 'business', name: 'Business & Management', icon: '💼', mentorCount: 5 },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', mentorCount: 2 },
  { id: 'education', name: 'Education', icon: '📚', mentorCount: 2 },
  { id: 'consulting', name: 'Consulting', icon: '🤝', mentorCount: 3 },
];

export const mentorshipIndustries = [
  'Technology',
  'Business & Management',
  'Healthcare',
  'Education',
  'Consulting',
  'Finance',
  'Engineering',
  'Research & Development',
];

export const expertiseAreas = [
  'Cloud Computing',
  'Product Management',
  'Human Resources',
  'Software Development',
  'Data Science',
  'Cybersecurity',
  'Digital Transformation',
  'Leadership',
  'Strategy',
  'Innovation',
  'Risk Management',
  'Project Management',
];