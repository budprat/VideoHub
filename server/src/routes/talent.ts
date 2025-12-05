import { Router } from 'express';
import { z } from 'zod';
import { optionalAuth, AuthenticatedRequest } from '../middleware/auth';

// Mock talent data (replace with Prisma queries)
const mockTalents = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'AI Video Director & Motion Designer',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    completedProjects: 127,
    hourlyRateMin: 85,
    hourlyRateMax: 120,
    skills: ['Creative Direction', 'Motion Graphics', 'Storytelling', 'Commercial Production'],
    aiTools: ['Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'LumaAI'],
    availability: 'available',
    responseTime: '< 2 hours',
    bio: 'Specialized in creating compelling AI-generated video content for tech brands.',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'AI Video Specialist & Creative Technologist',
    location: 'Austin, TX',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    completedProjects: 89,
    hourlyRateMin: 70,
    hourlyRateMax: 95,
    skills: ['Technical Implementation', 'Creative Coding', 'Animation', 'Post-Production'],
    aiTools: ['Pika Labs', 'D-ID', 'Synthesia', 'Runway ML'],
    availability: 'busy',
    responseTime: '< 4 hours',
    bio: 'Expert in technical AI video implementation with focus on educational content.',
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    title: 'Creative AI Video Producer',
    location: 'Los Angeles, CA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    completedProjects: 156,
    hourlyRateMin: 90,
    hourlyRateMax: 130,
    skills: ['Creative Production', 'Visual Effects', 'Brand Strategy', 'Content Strategy'],
    aiTools: ['Midjourney Video', 'Runway ML', 'LumaAI', 'Stable Video Diffusion'],
    availability: 'available',
    responseTime: '< 1 hour',
    bio: 'Award-winning creative producer specializing in luxury brand campaigns.',
  },
];

const router = Router();

// Query schema
const querySchema = z.object({
  page: z.string().optional().transform(v => parseInt(v || '1')),
  pageSize: z.string().optional().transform(v => parseInt(v || '10')),
  search: z.string().optional(),
  skills: z.string().optional().transform(v => v?.split(',').filter(Boolean)),
  tools: z.string().optional().transform(v => v?.split(',').filter(Boolean)),
  availability: z.string().optional(),
  minRating: z.string().optional().transform(v => v ? parseFloat(v) : undefined),
  sortBy: z.enum(['rating', 'projects', 'rate-low', 'rate-high', 'name']).optional(),
});

// Get all talents
router.get('/', optionalAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const query = querySchema.parse(req.query);
    let filtered = [...mockTalents];

    // Apply search
    if (query.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(search) ||
        t.title.toLowerCase().includes(search) ||
        t.bio.toLowerCase().includes(search) ||
        t.skills.some(s => s.toLowerCase().includes(search)) ||
        t.aiTools.some(tool => tool.toLowerCase().includes(search))
      );
    }

    // Apply filters
    if (query.skills && query.skills.length > 0) {
      filtered = filtered.filter(t =>
        query.skills!.some(skill =>
          t.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        )
      );
    }

    if (query.tools && query.tools.length > 0) {
      filtered = filtered.filter(t =>
        query.tools!.some(tool =>
          t.aiTools.map(at => at.toLowerCase()).includes(tool.toLowerCase())
        )
      );
    }

    if (query.availability) {
      filtered = filtered.filter(t => t.availability === query.availability);
    }

    if (query.minRating) {
      filtered = filtered.filter(t => t.rating >= query.minRating!);
    }

    // Apply sorting
    if (query.sortBy) {
      switch (query.sortBy) {
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'projects':
          filtered.sort((a, b) => b.completedProjects - a.completedProjects);
          break;
        case 'rate-low':
          filtered.sort((a, b) => a.hourlyRateMin - b.hourlyRateMin);
          break;
        case 'rate-high':
          filtered.sort((a, b) => b.hourlyRateMax - a.hourlyRateMax);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / query.pageSize);
    const startIndex = (query.page - 1) * query.pageSize;
    const data = filtered.slice(startIndex, startIndex + query.pageSize);

    res.json({
      success: true,
      data: {
        data: data.map(t => ({
          ...t,
          hourlyRate: `$${t.hourlyRateMin}-${t.hourlyRateMax}`,
        })),
        total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get talent by ID
router.get('/:id', optionalAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const talent = mockTalents.find(t => t.id === req.params.id);

    if (!talent) {
      return res.status(404).json({
        success: false,
        error: 'Talent not found',
      });
    }

    res.json({
      success: true,
      data: {
        ...talent,
        hourlyRate: `$${talent.hourlyRateMin}-${talent.hourlyRateMax}`,
        portfolio: [],
        certifications: [],
        testimonials: [],
      },
    });
  } catch (error) {
    next(error);
  }
});

export { router as talentRouter };
