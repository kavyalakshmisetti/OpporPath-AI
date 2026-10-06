export type OpportunityCategory = 'Internships' | 'Jobs' | 'Hackathons' | 'Meetups';

export type WorkType = 'Remote' | 'Hybrid' | 'On-site';

export type ApplicationStatus = 'Saved' | 'Applying' | 'Applied' | 'Interview' | 'Selected' | 'Rejected';

export type SkillPriority = 'High' | 'Medium' | 'Low';

export interface ResumeData {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  summary: string;
  extractedSkills: string[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  degree: string;
  institution: string;
  currentYear: string;
  graduationYear: string;
  technicalSkills: string[];
  softSkills: string[];
  interests: string[];
  careerGoals: string;
  preferredOpportunityTypes: OpportunityCategory[];
  preferredWorkType: WorkType[];
  preferredLocations: string[];
  resume: ResumeData | null;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  location: string;
  workType: WorkType;
  deadline: string;
  daysLeft: number;
  matchPercentage: number;
  whyThisFitsYou: string;
  description: string;
  eligibility: string;
  requiredSkills: string[];
  preferredSkills: string[];
  benefits: string[];
  externalUrl?: string;
  source: string;
  postedDate: string;
  experienceLevel: 'Entry Level' | 'Student / Intern' | 'Junior' | 'All Levels';
  stipendOrSalary?: string;
}

export interface ApplicationItem {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  category: OpportunityCategory;
  location: string;
  workType: WorkType;
  status: ApplicationStatus;
  appliedDate: string;
  deadline: string;
  notes: string;
  updatedAt: string;
}

export interface LearningPathStep {
  id: string;
  stepNumber: number;
  skill: string;
  title: string;
  priority: SkillPriority;
  recommendedLearning: string;
  estimatedTime: string;
  progress: number;
  completed: boolean;
  resourceTitle: string;
  resourceType: 'Interactive Lab' | 'Video Course' | 'Documentation' | 'Hands-on Project';
  resourceSummary: string;
  resourceLink?: string;
}

export interface SkillGapTarget {
  id: string;
  name: string;
  type: 'opportunity' | 'career';
  requiredSkills: string[];
  recommendedProjects: {
    title: string;
    description: string;
    tech: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  learningPath: LearningPathStep[];
}

export interface UserSettings {
  account: {
    name: string;
    email: string;
    notificationEmail: string;
  };
  notifications: {
    newOpportunityAlerts: boolean;
    deadlineReminders: boolean;
    applicationUpdates: boolean;
    aiRecommendations: boolean;
  };
  preferences: {
    opportunityTypes: OpportunityCategory[];
    workTypes: WorkType[];
    preferredLocations: string[];
    minDesiredMatch: number;
  };
}

export type AppPage =
  | 'dashboard'
  | 'my-profile'
  | 'find-opportunities'
  | 'opportunities'
  | 'opportunity-details'
  | 'skill-gap'
  | 'application-tracker'
  | 'saved-opportunities'
  | 'settings';
