import { Router } from 'express';
import { z } from 'zod';
import { authenticateToken, optionalAuth, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// Mock project data
const mockProjects = [
  {
    id: '1',
    title: 'AI Brand Commercial for Tech Startup',
    description: 'We need a compelling 60-second commercial showcasing our AI-powered analytics platform.',
    budget: '$8,000 - $12,000',
    budgetMin: 8000,
    budgetMax: 12000,
    timeline: '2 weeks',
    requiredSkills: ['Creative Direction', 'Motion Graphics', 'Commercial Production'],
    requiredTools: ['Runway ML', 'Midjourney Video'],
    complexity: 'moderate',
    category: 'Commercial & Advertising',
    postedDate: '2024-01-15',
    proposals: 12,
    status: 'open',
    clientName: 'TechFlow Inc',
    clientRating: 4.8,
  },
  {
    id: '2',
    title: 'Product Demo Video Series',
    description: 'Create a series of 5 product demo videos for our SaaS platform.',
    budget: '$15,000 - $20,000',
    budgetMin: 15000,
    budgetMax: 20000,
    timeline: '1 month',
    requiredSkills: ['Product Videos', 'Animation', 'UI/UX Visualization'],
    requiredTools: ['Stable Video Diffusion', 'Runway ML', 'Luma AI'],
    complexity: 'complex',
    category: 'Product Demos',
    postedDate: '2024-01-12',
    proposals: 8,
    status: 'open',
    clientName: 'InnovateCorp',
    clientRating: 4.9,
  },
];

const router = Router();

// Query schema
const querySchema = z.object({
  page: z.string().optional().transform(v => parseInt(v || '1')),
  pageSize: z.string().optional().transform(v => parseInt(v || '10')),
  search: z.string().optional(),
  categories: z.string().optional().transform(v => v?.split(',').filter(Boolean)),
  complexity: z.string().optional().transform(v => v?.split(',').filter(Boolean)),
  budgetRange: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.enum(['recent', 'budget-high', 'budget-low', 'timeline', 'proposals']).optional(),
});

// Create project schema
const createProjectSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(2000),
  category: z.string().min(1),
  budgetMin: z.number().min(100),
  budgetMax: z.number().min(100),
  budgetType: z.enum(['fixed', 'hourly']),
  timeline: z.string().min(1),
  complexity: z.enum(['simple', 'moderate', 'complex']),
  requiredSkills: z.array(z.string()).min(1),
  requiredTools: z.array(z.string()).min(1),
  deliverables: z.array(z.string()).optional(),
});

// Get all projects
router.get('/', optionalAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const query = querySchema.parse(req.query);
    let filtered = [...mockProjects];

    // Apply search
    if (query.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.requiredSkills.some(s => s.toLowerCase().includes(search)) ||
        p.category.toLowerCase().includes(search)
      );
    }

    // Apply filters
    if (query.categories && query.categories.length > 0) {
      filtered = filtered.filter(p => query.categories!.includes(p.category));
    }

    if (query.complexity && query.complexity.length > 0) {
      filtered = filtered.filter(p => query.complexity!.includes(p.complexity));
    }

    if (query.status) {
      filtered = filtered.filter(p => p.status === query.status);
    }

    // Apply sorting
    if (query.sortBy) {
      switch (query.sortBy) {
        case 'recent':
          filtered.sort((a, b) =>
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
          break;
        case 'budget-high':
          filtered.sort((a, b) => b.budgetMax - a.budgetMax);
          break;
        case 'budget-low':
          filtered.sort((a, b) => a.budgetMin - b.budgetMin);
          break;
        case 'proposals':
          filtered.sort((a, b) => a.proposals - b.proposals);
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
        data,
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

// Get project by ID
router.get('/:id', optionalAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const project = mockProjects.find(p => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// Create project (agencies only)
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    if (req.user?.userType !== 'agency') {
      throw new AppError('Only agencies can create projects', 403);
    }

    const data = createProjectSchema.parse(req.body);

    const newProject = {
      id: `project_${Date.now()}`,
      ...data,
      budget: `$${data.budgetMin.toLocaleString()} - $${data.budgetMax.toLocaleString()}`,
      postedDate: new Date().toISOString().split('T')[0],
      proposals: 0,
      status: 'open' as const,
      clientName: 'Your Company',
      clientRating: 5.0,
    };

    mockProjects.push(newProject);

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
});

// Submit proposal (talents only)
router.post('/:id/proposals', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    if (req.user?.userType !== 'talent') {
      throw new AppError('Only talent can submit proposals', 403);
    }

    const project = mockProjects.find(p => p.id === req.params.id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    const proposalSchema = z.object({
      coverLetter: z.string().min(100).max(2000),
      proposedBudget: z.number().min(1),
      proposedTimeline: z.string().min(1),
    });

    const data = proposalSchema.parse(req.body);

    // Increment proposal count
    project.proposals++;

    res.status(201).json({
      success: true,
      data: {
        proposalId: `proposal_${Date.now()}`,
        projectId: project.id,
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export { router as projectRouter };
