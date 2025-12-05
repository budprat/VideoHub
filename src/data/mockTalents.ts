import { TalentProfile } from '../types';

export const mockTalents: TalentProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'AI Video Director & Motion Designer',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    completedProjects: 127,
    hourlyRate: '$85-120',
    skills: ['Creative Direction', 'Motion Graphics', 'Storytelling', 'Commercial Production'],
    aiTools: ['Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'LumaAI'],
    portfolio: [
      {
        id: '1',
        title: 'AI Brand Commercial',
        description: 'Tech startup commercial created with Runway ML',
        thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Commercial', 'Runway ML', 'Brand'],
        client: 'TechFlow Inc',
        duration: '2:30',
        views: 1200
      },
      {
        id: '2',
        title: 'Product Launch Video',
        description: 'AI-generated product showcase for tech company',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Product', 'Launch', 'AI Generated'],
        client: 'InnovateCorp',
        duration: '1:45',
        views: 890
      },
      {
        id: '3',
        title: 'Brand Story Documentary',
        description: 'Company origin story with AI visual effects',
        thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        videoUrl: '',
        tags: ['Documentary', 'Brand Story', 'VFX'],
        client: 'Legacy Brands',
        duration: '5:20',
        views: 2100
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Runway ML Professional',
        issuer: 'Runway',
        date: '2023-06',
        verified: true
      },
      {
        id: '2',
        name: 'AI Video Production Specialist',
        issuer: 'VideoHub Academy',
        date: '2023-08',
        verified: true
      },
      {
        id: '3',
        name: 'Motion Graphics Expert',
        issuer: 'Adobe',
        date: '2022-12',
        verified: true
      }
    ],
    testimonials: [
      {
        id: '1',
        clientName: 'John Mitchell',
        clientCompany: 'TechFlow Inc',
        rating: 5,
        comment: 'Sarah delivered an exceptional commercial that exceeded our expectations. Her understanding of AI tools combined with creative vision made our product shine.',
        projectType: 'Commercial',
        date: '2024-01-10'
      },
      {
        id: '2',
        clientName: 'Emily Rodriguez',
        clientCompany: 'StartupX',
        rating: 5,
        comment: 'Incredible attention to detail and amazing turnaround time. Sarah is our go-to for all AI video projects.',
        projectType: 'Product Demo',
        date: '2023-12-20'
      },
      {
        id: '3',
        clientName: 'Michael Chen',
        clientCompany: 'InnovateCorp',
        rating: 4.8,
        comment: 'Professional, creative, and highly skilled. The final deliverables were outstanding.',
        projectType: 'Brand Video',
        date: '2023-11-15'
      }
    ],
    availability: 'available',
    responseTime: '< 2 hours',
    bio: 'Specialized in creating compelling AI-generated video content for tech brands and startups. With over 5 years of experience in motion design and 2 years focused on AI video production, I bring a unique blend of technical expertise and creative vision to every project.'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'AI Video Specialist & Creative Technologist',
    location: 'Austin, TX',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    completedProjects: 89,
    hourlyRate: '$70-95',
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
        views: 850
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
        rating: 5,
        comment: 'Marcus created an amazing training series that our team loves. His technical skills are top-notch.',
        projectType: 'Training Videos',
        date: '2024-01-05'
      }
    ],
    availability: 'busy',
    responseTime: '< 4 hours',
    bio: 'Expert in technical AI video implementation with focus on educational and corporate content. I bridge the gap between cutting-edge AI technology and practical business applications.'
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    title: 'Creative AI Video Producer',
    location: 'Los Angeles, CA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    completedProjects: 156,
    hourlyRate: '$90-130',
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
        views: 2100
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
        rating: 5,
        comment: 'Elena brought our brand vision to life with stunning AI-generated visuals. Simply amazing work!',
        projectType: 'Fashion Campaign',
        date: '2024-01-08'
      }
    ],
    availability: 'available',
    responseTime: '< 1 hour',
    bio: 'Award-winning creative producer specializing in luxury brand campaigns and visual storytelling. I combine artistic vision with AI technology to create unforgettable visual experiences.'
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'AI Animation Specialist',
    location: 'Seattle, WA',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    completedProjects: 73,
    hourlyRate: '$65-85',
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
        views: 670
      }
    ],
    certifications: [],
    testimonials: [],
    availability: 'available',
    responseTime: '< 3 hours',
    bio: 'Passionate animator leveraging AI tools to create engaging animated content faster without sacrificing quality.'
  },
  {
    id: '5',
    name: 'Priya Sharma',
    title: 'Social Media Video Creator',
    location: 'New York, NY',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    completedProjects: 203,
    hourlyRate: '$55-75',
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
        views: 5200
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
    bio: 'Social media video expert specializing in creating viral AI-generated content for TikTok, Instagram Reels, and YouTube Shorts.'
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'Documentary & Editorial Video Producer',
    location: 'Chicago, IL',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    completedProjects: 45,
    hourlyRate: '$100-150',
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
        views: 3400
      }
    ],
    certifications: [],
    testimonials: [],
    availability: 'available',
    responseTime: '< 4 hours',
    bio: 'Emmy-nominated documentary producer now exploring the intersection of traditional filmmaking and AI video generation.'
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
