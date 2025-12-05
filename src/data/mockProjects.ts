import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI Brand Commercial for Tech Startup',
    description: 'We need a compelling 60-second commercial showcasing our AI-powered analytics platform. The video should demonstrate how our technology transforms complex data into actionable insights for enterprise clients. Looking for a creative approach that combines AI-generated visuals with motion graphics to create a premium, tech-forward aesthetic.',
    budget: '$8,000 - $12,000',
    timeline: '2 weeks',
    requiredSkills: ['Creative Direction', 'Motion Graphics', 'Commercial Production', 'Storytelling'],
    requiredTools: ['Runway ML', 'Midjourney Video', 'After Effects'],
    complexity: 'moderate',
    category: 'Commercial & Advertising',
    postedDate: '2024-01-15',
    proposals: 12,
    status: 'open',
    clientName: 'TechFlow Inc',
    clientRating: 4.8
  },
  {
    id: '2',
    title: 'Product Demo Video Series',
    description: 'Create a series of 5 product demo videos (2-3 minutes each) for our SaaS platform. Each video should focus on a specific feature set and target different user personas. We want to use AI-generated backgrounds and environments that feel modern and professional, with clean motion graphics overlays explaining the interface.',
    budget: '$15,000 - $20,000',
    timeline: '1 month',
    requiredSkills: ['Product Videos', 'Animation', 'UI/UX Visualization', 'Technical Communication'],
    requiredTools: ['Stable Video Diffusion', 'Runway ML', 'Luma AI'],
    complexity: 'complex',
    category: 'Product Demos',
    postedDate: '2024-01-12',
    proposals: 8,
    status: 'open',
    clientName: 'InnovateCorp',
    clientRating: 4.9
  },
  {
    id: '3',
    title: 'Educational Content for AI Course',
    description: 'Develop engaging educational videos explaining AI and machine learning concepts to business professionals. The content should be accessible to non-technical audiences while maintaining accuracy. Looking for creative visual metaphors and AI-generated illustrations to make complex topics understandable.',
    budget: '$5,000 - $8,000',
    timeline: '3 weeks',
    requiredSkills: ['Educational Content', 'Storytelling', 'Visual Metaphors', 'Technical Communication'],
    requiredTools: ['Synthesia', 'D-ID', 'Midjourney Video'],
    complexity: 'simple',
    category: 'Educational Content',
    postedDate: '2024-01-10',
    proposals: 15,
    status: 'open',
    clientName: 'LearnTech Academy',
    clientRating: 4.7
  },
  {
    id: '4',
    title: 'Social Media Campaign - Fashion Brand',
    description: 'Create a series of 15-30 second social media videos for Instagram and TikTok promoting our new sustainable fashion line. The videos should feel fresh, trendy, and authentic while showcasing the products in AI-generated environments that emphasize sustainability and style.',
    budget: '$3,000 - $5,000',
    timeline: '10 days',
    requiredSkills: ['Social Media Content', 'Fashion Photography', 'Trend Awareness', 'Brand Strategy'],
    requiredTools: ['Pika Labs', 'Runway ML', 'Midjourney Video'],
    complexity: 'simple',
    category: 'Social Media Content',
    postedDate: '2024-01-08',
    proposals: 22,
    status: 'open',
    clientName: 'EcoStyle Fashion',
    clientRating: 4.6
  },
  {
    id: '5',
    title: 'Corporate Training Video Series',
    description: 'Develop a comprehensive training video series for our global workforce covering new company policies, procedures, and culture initiatives. The videos should be professional yet engaging, using AI avatars and generated environments to create consistent, high-quality content across multiple languages.',
    budget: '$12,000 - $18,000',
    timeline: '6 weeks',
    requiredSkills: ['Corporate Communications', 'Training Content', 'Multi-language Production', 'Professional Presentation'],
    requiredTools: ['Synthesia', 'D-ID', 'Runway ML'],
    complexity: 'complex',
    category: 'Corporate Communications',
    postedDate: '2024-01-05',
    proposals: 6,
    status: 'open',
    clientName: 'GlobalTech Solutions',
    clientRating: 4.9
  },
  {
    id: '6',
    title: 'Explainer Video for Fintech App',
    description: "Create an engaging 90-second explainer video for our new cryptocurrency trading app. The video should simplify complex financial concepts and demonstrate the app's key features. Looking for a modern, trustworthy aesthetic with AI-generated financial visualizations and smooth motion graphics.",
    budget: '$6,000 - $9,000',
    timeline: '2.5 weeks',
    requiredSkills: ['Explainer Videos', 'Financial Visualization', 'App Demos', 'Trust Building'],
    requiredTools: ['Runway ML', 'Stable Video Diffusion', 'After Effects'],
    complexity: 'moderate',
    category: 'Explainer Videos',
    postedDate: '2024-01-03',
    proposals: 18,
    status: 'open',
    clientName: 'CryptoFlow',
    clientRating: 4.5
  },
  {
    id: '7',
    title: 'Music Video with AI Visuals',
    description: 'Looking for a creative video producer to create an innovative music video using AI-generated visuals. The song is an indie electronic track with themes of technology and human connection. We want surreal, dreamlike visuals that evolve throughout the song.',
    budget: '$4,000 - $7,000',
    timeline: '3 weeks',
    requiredSkills: ['Music Video Production', 'Visual Storytelling', 'Creative Direction', 'Color Grading'],
    requiredTools: ['Runway ML', 'LumaAI', 'Stable Video Diffusion'],
    complexity: 'moderate',
    category: 'Entertainment',
    postedDate: '2024-01-01',
    proposals: 28,
    status: 'open',
    clientName: 'Neon Waves Records',
    clientRating: 4.7
  },
  {
    id: '8',
    title: 'Real Estate Property Showcase',
    description: 'Create immersive property showcase videos for our luxury real estate listings. We need videos that use AI to enhance property footage and create virtual staging in empty rooms. Each video should be 1-2 minutes highlighting the property features and neighborhood.',
    budget: '$2,500 - $4,000',
    timeline: '1 week',
    requiredSkills: ['Real Estate Video', 'Virtual Staging', 'Architectural Visualization', 'Drone Footage Integration'],
    requiredTools: ['Runway ML', 'Midjourney Video', 'LumaAI'],
    complexity: 'simple',
    category: 'Real Estate',
    postedDate: '2024-01-02',
    proposals: 14,
    status: 'open',
    clientName: 'Prestige Properties',
    clientRating: 4.8
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const filterProjects = (
  projects: Project[],
  filters: {
    search?: string;
    categories?: string[];
    complexity?: string[];
    budgetRange?: string;
    timeline?: string[];
    status?: string;
  }
): Project[] => {
  return projects.filter(project => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        project.requiredTools.some(tool => tool.toLowerCase().includes(searchLower)) ||
        project.category.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(project.category)) return false;
    }

    // Complexity filter
    if (filters.complexity && filters.complexity.length > 0) {
      if (!filters.complexity.includes(project.complexity)) return false;
    }

    // Budget range filter
    if (filters.budgetRange) {
      const budgetNum = parseInt(project.budget.replace(/\D/g, ''));
      switch (filters.budgetRange) {
        case '$1K-5K':
          if (budgetNum > 5000) return false;
          break;
        case '$5K-10K':
          if (budgetNum < 5000 || budgetNum > 10000) return false;
          break;
        case '$10K-20K':
          if (budgetNum < 10000 || budgetNum > 20000) return false;
          break;
        case '$20K-50K':
          if (budgetNum < 20000 || budgetNum > 50000) return false;
          break;
        case '$50K+':
          if (budgetNum < 50000) return false;
          break;
      }
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (project.status !== filters.status) return false;
    }

    return true;
  });
};

export const sortProjects = (
  projects: Project[],
  sortBy: 'recent' | 'budget-high' | 'budget-low' | 'timeline' | 'proposals'
): Project[] => {
  const sorted = [...projects];

  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    case 'budget-high':
      return sorted.sort((a, b) => {
        const aBudget = parseInt(a.budget.replace(/\D/g, ''));
        const bBudget = parseInt(b.budget.replace(/\D/g, ''));
        return bBudget - aBudget;
      });
    case 'budget-low':
      return sorted.sort((a, b) => {
        const aBudget = parseInt(a.budget.replace(/\D/g, ''));
        const bBudget = parseInt(b.budget.replace(/\D/g, ''));
        return aBudget - bBudget;
      });
    case 'timeline':
      return sorted.sort((a, b) => {
        const aWeeks = parseTimeline(a.timeline);
        const bWeeks = parseTimeline(b.timeline);
        return aWeeks - bWeeks;
      });
    case 'proposals':
      return sorted.sort((a, b) => a.proposals - b.proposals);
    default:
      return sorted;
  }
};

const parseTimeline = (timeline: string): number => {
  const num = parseInt(timeline);
  if (timeline.includes('day')) return num / 7;
  if (timeline.includes('week')) return num;
  if (timeline.includes('month')) return num * 4;
  return num;
};

export const projectCategories = [
  'Commercial & Advertising',
  'Brand Content',
  'Educational Content',
  'Product Demos',
  'Social Media Content',
  'Explainer Videos',
  'Corporate Communications',
  'Entertainment',
  'Real Estate',
  'Music Videos',
];

export const aiTools = [
  'Runway ML',
  'Midjourney Video',
  'Stable Video Diffusion',
  'Pika Labs',
  'LumaAI',
  'Synthesia',
  'D-ID',
  'Pictory',
  'Luma Dream Machine',
  'After Effects',
];
