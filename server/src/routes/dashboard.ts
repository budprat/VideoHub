import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get dashboard stats
router.get('/stats', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { userType } = req.user!;

    if (userType === 'agency') {
      res.json({
        success: true,
        data: {
          activeProjects: 5,
          totalSpent: '$45,280',
          talentHired: 12,
          avgRating: 4.8,
        },
      });
    } else {
      res.json({
        success: true,
        data: {
          activeProjects: 3,
          totalEarned: '$28,450',
          clientsWorked: 15,
          rating: 4.9,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

// Get recent activity
router.get('/activity', async (req: AuthenticatedRequest, res, next) => {
  try {
    res.json({
      success: true,
      data: [
        {
          id: '1',
          type: 'project',
          title: 'New project posted: AI Commercial',
          timestamp: '2 hours ago',
        },
        {
          id: '2',
          type: 'proposal',
          title: 'Proposal received from Sarah Chen',
          timestamp: '5 hours ago',
        },
        {
          id: '3',
          type: 'message',
          title: 'New message from TechFlow Inc',
          timestamp: '1 day ago',
        },
        {
          id: '4',
          type: 'payment',
          title: 'Payment received: $2,500',
          timestamp: '2 days ago',
        },
      ],
    });
  } catch (error) {
    next(error);
  }
});

// Get user's projects
router.get('/projects', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { userType } = req.user!;

    if (userType === 'agency') {
      // Agency's posted projects
      res.json({
        success: true,
        data: [
          {
            id: '1',
            title: 'AI Brand Commercial',
            status: 'in-progress',
            budget: '$10,000',
            proposals: 8,
            createdAt: '2024-01-10',
          },
          {
            id: '2',
            title: 'Product Demo Series',
            status: 'open',
            budget: '$15,000',
            proposals: 12,
            createdAt: '2024-01-08',
          },
        ],
      });
    } else {
      // Talent's proposals/active projects
      res.json({
        success: true,
        data: [
          {
            id: '1',
            title: 'Tech Startup Commercial',
            clientName: 'TechFlow Inc',
            status: 'active',
            budget: '$8,000',
            deadline: '2024-02-01',
          },
          {
            id: '2',
            title: 'Educational Series',
            clientName: 'LearnTech Academy',
            status: 'proposal-pending',
            budget: '$5,000',
            submittedAt: '2024-01-12',
          },
        ],
      });
    }
  } catch (error) {
    next(error);
  }
});

export { router as dashboardRouter };
