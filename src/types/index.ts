export type UserType = 'agency' | 'talent';

export interface TalentProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  coverImage?: string;
  rating: number;
  completedProjects: number;
  hourlyRate: string;
  totalEarnings?: string;
  skills: string[];
  aiTools: string[];
  portfolio: PortfolioItem[];
  certifications: Certification[];
  testimonials: Testimonial[];
  availability: 'available' | 'busy' | 'unavailable';
  responseTime: string;
  joinDate?: string;
  languages?: string[];
  bio: string;
  stats?: TalentStats;
}

export interface TalentStats {
  onTimeDelivery: string;
  repeatClients: string;
  averageRating: number;
  budgetAccuracy: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  tags: string[];
  client: string;
  duration: string;
  views: number;
  completionDate?: string;
  budget?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  projectType: string;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  timeline: string;
  requiredSkills: string[];
  requiredTools: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  category: string;
  postedDate: string;
  proposals: number;
  status: 'open' | 'in-progress' | 'completed';
  clientName: string;
  clientRating: number;
}