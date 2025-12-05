import { TalentProfile } from '../types';

export const mockTalents: TalentProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'AI Video Director & Motion Designer',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.9,
    completedProjects: 127,
    hourlyRate: '$85-120',
    totalEarnings: '$340K',
    skills: ['Creative Direction', 'Motion Graphics', 'Storytelling', 'Commercial Production', 'Brand Strategy', 'Visual Effects'],
    aiTools: ['Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'LumaAI', 'Pika Labs', 'D-ID'],
    portfolio: [
      {
        id: '1',
        title: 'AI Brand Commercial - TechFlow',
        description: 'A 60-second commercial showcasing innovative AI solutions for enterprise clients. Created using Runway ML with custom prompts and professional post-production.',
        thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        videoUrl: '',
        tags: ['Commercial', 'Runway ML', 'Brand', 'Enterprise'],
        client: 'TechFlow Inc',
        duration: '1:00',
        views: 1200,
        completionDate: '2024-01-15',
        budget: '$15,000'
      },
      {
        id: '2',
        title: 'Product Launch Animation',
        description: 'Dynamic product reveal animation combining AI-generated backgrounds with motion graphics for a luxury watch brand.',
        thumbnail: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        videoUrl: '',
        tags: ['Product', 'Animation', 'Luxury', 'Midjourney Video'],
        client: 'Chronos Watches',
        duration: '0:45',
        views: 980,
        completionDate: '2024-01-08',
        budget: '$12,000'
      },
      {
        id: '3',
        title: 'Educational Series - AI Basics',
        description: 'Multi-part educational series explaining AI concepts to general audiences using engaging visual metaphors and AI-generated content.',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        videoUrl: '',
        tags: ['Educational', 'Series', 'AI', 'Explainer'],
        client: 'LearnTech Academy',
        duration: '3:30',
        views: 2100,
        completionDate: '2023-12-20',
        budget: '$25,000'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Runway ML Advanced Certification',
        issuer: 'Runway',
        date: '2024-01-10',
        verified: true
      },
      {
        id: '2',
        name: 'Creative Director Certification',
        issuer: 'Adobe',
        date: '2023-11-15',
        verified: true
      },
      {
        id: '3',
        name: 'AI Video Production Specialist',
        issuer: 'AI Creator Institute',
        date: '2023-10-20',
        verified: true
      }
    ],
    testimonials: [
      {
        id: '1',
        clientName: 'David Martinez',
        clientCompany: 'TechFlow Inc',
        clientAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment: 'Sarah delivered exceptional work on our brand commercial. Her understanding of AI tools combined with creative vision resulted in a video that exceeded our expectations and drove significant engagement.',
        projectType: 'Brand Commercial',
        date: '2024-01-20'
      },
      {
        id: '2',
        clientName: 'Jennifer Park',
        clientCompany: 'Chronos Watches',
        clientAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment: 'Working with Sarah was a game-changer for our product launch. She brought our luxury watch to life with stunning AI-generated visuals that perfectly captured our brand essence.',
        projectType: 'Product Animation',
        date: '2024-01-12'
      },
      {
        id: '3',
        clientName: 'Alex Thompson',
        clientCompany: 'LearnTech Academy',
        clientAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment: 'Sarah\'s educational video series transformed how our students understand AI concepts. Her ability to make complex topics accessible through visual storytelling is remarkable.',
        projectType: 'Educational Content',
        date: '2023-12-25'
      }
    ],
    availability: 'available',
    responseTime: '< 2 hours',
    joinDate: 'March 2023',
    languages: ['English (Native)', 'Mandarin (Fluent)', 'Spanish (Conversational)'],
    bio: 'Award-winning AI video specialist with 8+ years in creative direction and motion design. I specialize in creating compelling, brand-focused video content using cutting-edge AI tools. My work has been featured in campaigns for Fortune 500 companies and emerging tech startups.\n\nI combine traditional storytelling principles with innovative AI video generation techniques to deliver content that not only looks stunning but drives real business results. Every project is approached with strategic thinking, creative excellence, and technical precision.',
    stats: {
      onTimeDelivery: '98%',
      repeatClients: '85%',
      averageRating: 4.9,
      budgetAccuracy: '95%'
    }
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'AI Video Specialist & Creative Technologist',
    location: 'Austin, TX',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.8,
    completedProjects: 89,
    hourlyRate: '$70-95',
    totalEarnings: '$185K',
    skills: ['Technical Implementation', 'Creative Coding', 'Animation', 'Post-Production'],
    aiTools: ['Pika Labs', 'D-ID', 'Synthesia', 'Runway ML'],
    portfolio: [
      {
        id: '1',
        title: 'Corporate Training Series',
        description: 'AI-powered educational content series',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Educational', 'Corporate', 'Synthesia'],
        client: 'LearnTech Solutions',
        duration: '5:45',
        views: 850,
        completionDate: '2024-01-05',
        budget: '$8,000'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Synthesia Certified Creator',
        issuer: 'Synthesia',
        date: '2023-09',
        verified: true
      }
    ],
    testimonials: [
      {
        id: '1',
        clientName: 'Lisa Park',
        clientCompany: 'LearnTech Solutions',
        clientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment: 'Marcus created an amazing training series that our team loves. His technical skills are top-notch.',
        projectType: 'Training Videos',
        date: '2024-01-05'
      }
    ],
    availability: 'busy',
    responseTime: '< 4 hours',
    joinDate: 'June 2023',
    languages: ['English (Native)', 'Spanish (Fluent)'],
    bio: 'Expert in technical AI video implementation with focus on educational and corporate content. I bridge the gap between cutting-edge AI technology and practical business applications.',
    stats: {
      onTimeDelivery: '96%',
      repeatClients: '78%',
      averageRating: 4.8,
      budgetAccuracy: '92%'
    }
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    title: 'Creative AI Video Producer',
    location: 'Los Angeles, CA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.9,
    completedProjects: 156,
    hourlyRate: '$90-130',
    totalEarnings: '$420K',
    skills: ['Creative Production', 'Visual Effects', 'Brand Strategy', 'Content Strategy'],
    aiTools: ['Midjourney Video', 'Runway ML', 'LumaAI', 'Stable Video Diffusion'],
    portfolio: [
      {
        id: '1',
        title: 'Fashion Brand Campaign',
        description: 'Luxury fashion campaign with AI-generated visuals',
        thumbnail: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Fashion', 'Luxury', 'Campaign'],
        client: 'Luxe Apparel',
        duration: '1:45',
        views: 2100,
        completionDate: '2024-01-08',
        budget: '$18,000'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Advanced AI Video Production',
        issuer: 'VideoHub Academy',
        date: '2023-10',
        verified: true
      }
    ],
    testimonials: [
      {
        id: '1',
        clientName: 'Sophie Laurent',
        clientCompany: 'Luxe Apparel',
        clientAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment: 'Elena brought our brand vision to life with stunning AI-generated visuals. Simply amazing work!',
        projectType: 'Fashion Campaign',
        date: '2024-01-08'
      }
    ],
    availability: 'available',
    responseTime: '< 1 hour',
    joinDate: 'January 2023',
    languages: ['English (Fluent)', 'Spanish (Native)', 'Portuguese (Conversational)'],
    bio: 'Award-winning creative producer specializing in luxury brand campaigns and visual storytelling. I combine artistic vision with AI technology to create unforgettable visual experiences.',
    stats: {
      onTimeDelivery: '99%',
      repeatClients: '90%',
      averageRating: 4.9,
      budgetAccuracy: '97%'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'AI Animation Specialist',
    location: 'Seattle, WA',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.7,
    completedProjects: 73,
    hourlyRate: '$65-85',
    totalEarnings: '$125K',
    skills: ['2D Animation', '3D Animation', 'Character Design', 'Storyboarding'],
    aiTools: ['Runway ML', 'Pika Labs', 'Luma Dream Machine', 'Stable Video Diffusion'],
    portfolio: [
      {
        id: '1',
        title: 'Animated Explainer Series',
        description: 'AI-enhanced animated explainer videos for SaaS',
        thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Animation', 'Explainer', 'SaaS'],
        client: 'CloudBase',
        duration: '2:15',
        views: 670,
        completionDate: '2024-01-02',
        budget: '$5,500'
      }
    ],
    certifications: [],
    testimonials: [],
    availability: 'available',
    responseTime: '< 3 hours',
    joinDate: 'August 2023',
    languages: ['English (Native)', 'Korean (Native)'],
    bio: 'Passionate animator leveraging AI tools to create engaging animated content faster without sacrificing quality.',
    stats: {
      onTimeDelivery: '94%',
      repeatClients: '72%',
      averageRating: 4.7,
      budgetAccuracy: '90%'
    }
  },
  {
    id: '5',
    name: 'Priya Sharma',
    title: 'Social Media Video Creator',
    location: 'New York, NY',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.8,
    completedProjects: 203,
    hourlyRate: '$55-75',
    totalEarnings: '$285K',
    skills: ['Short-form Content', 'Trend Analysis', 'Viral Content', 'Platform Optimization'],
    aiTools: ['Pika Labs', 'Runway ML', 'D-ID', 'Pictory'],
    portfolio: [
      {
        id: '1',
        title: 'Viral TikTok Campaign',
        description: 'AI-powered short-form content that went viral',
        thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['TikTok', 'Viral', 'Short-form'],
        client: 'TrendSetters Inc',
        duration: '0:30',
        views: 5200,
        completionDate: '2023-12-15',
        budget: '$3,500'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Social Media Video Expert',
        issuer: 'HubSpot',
        date: '2023-07',
        verified: true
      }
    ],
    testimonials: [],
    availability: 'busy',
    responseTime: '< 6 hours',
    joinDate: 'April 2023',
    languages: ['English (Fluent)', 'Hindi (Native)'],
    bio: 'Social media video expert specializing in creating viral AI-generated content for TikTok, Instagram Reels, and YouTube Shorts.',
    stats: {
      onTimeDelivery: '95%',
      repeatClients: '80%',
      averageRating: 4.8,
      budgetAccuracy: '93%'
    }
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'Documentary & Editorial Video Producer',
    location: 'Chicago, IL',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.9,
    completedProjects: 45,
    hourlyRate: '$100-150',
    totalEarnings: '$180K',
    skills: ['Documentary Production', 'Narrative Storytelling', 'Interview Content', 'Editorial'],
    aiTools: ['Runway ML', 'Midjourney Video', 'LumaAI', 'Stable Video Diffusion'],
    portfolio: [
      {
        id: '1',
        title: 'Tech Pioneer Documentary',
        description: 'AI-enhanced documentary about tech innovation',
        thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Documentary', 'Tech', 'Editorial'],
        client: 'Innovation Magazine',
        duration: '15:00',
        views: 3400,
        completionDate: '2023-11-30',
        budget: '$35,000'
      }
    ],
    certifications: [],
    testimonials: [],
    availability: 'available',
    responseTime: '< 4 hours',
    joinDate: 'September 2023',
    languages: ['English (Native)'],
    bio: 'Emmy-nominated documentary producer now exploring the intersection of traditional filmmaking and AI video generation.',
    stats: {
      onTimeDelivery: '100%',
      repeatClients: '88%',
      averageRating: 4.9,
      budgetAccuracy: '96%'
    }
  }
];

export const getTalentById = (id: string): TalentProfile | undefined => {
  return mockTalents.find(talent => talent.id === id);
};

export const filterTalents = (
  talents: TalentProfile[],
  filters: {
    search?: string;
    skills?: string[];
    tools?: string[];
    availability?: string;
    minRating?: number;
    maxRate?: number;
  }
): TalentProfile[] => {
  return talents.filter(talent => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        talent.name.toLowerCase().includes(searchLower) ||
        talent.title.toLowerCase().includes(searchLower) ||
        talent.bio.toLowerCase().includes(searchLower) ||
        talent.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        talent.aiTools.some(tool => tool.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const hasSkills = filters.skills.some(skill =>
        talent.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );
      if (!hasSkills) return false;
    }

    // Tools filter
    if (filters.tools && filters.tools.length > 0) {
      const hasTools = filters.tools.some(tool =>
        talent.aiTools.map(t => t.toLowerCase()).includes(tool.toLowerCase())
      );
      if (!hasTools) return false;
    }

    // Availability filter
    if (filters.availability && filters.availability !== 'all') {
      if (talent.availability !== filters.availability) return false;
    }

    // Rating filter
    if (filters.minRating) {
      if (talent.rating < filters.minRating) return false;
    }

    return true;
  });
};

export const sortTalents = (
  talents: TalentProfile[],
  sortBy: 'rating' | 'projects' | 'rate-low' | 'rate-high' | 'name'
): TalentProfile[] => {
  const sorted = [...talents];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'projects':
      return sorted.sort((a, b) => b.completedProjects - a.completedProjects);
    case 'rate-low':
      return sorted.sort((a, b) => {
        const aRate = parseInt(a.hourlyRate.replace(/\D/g, ''));
        const bRate = parseInt(b.hourlyRate.replace(/\D/g, ''));
        return aRate - bRate;
      });
    case 'rate-high':
      return sorted.sort((a, b) => {
        const aRate = parseInt(a.hourlyRate.replace(/\D/g, ''));
        const bRate = parseInt(b.hourlyRate.replace(/\D/g, ''));
        return bRate - aRate;
      });
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};
