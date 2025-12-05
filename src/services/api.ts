import { TalentProfile, Project, UserType } from '../types';
import { mockTalents, filterTalents, sortTalents as sortTalentsData } from '../data/mockTalents';
import { mockProjects, filterProjects, sortProjects as sortProjectsData } from '../data/mockProjects';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API response types
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Talent API
export const talentApi = {
  async getAll(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    skills?: string[];
    tools?: string[];
    availability?: string;
    minRating?: number;
    sortBy?: 'rating' | 'projects' | 'rate-low' | 'rate-high' | 'name';
  }): Promise<ApiResponse<PaginatedResponse<TalentProfile>>> {
    await delay(500);

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;

    let talents = [...mockTalents];

    // Apply filters
    talents = filterTalents(talents, {
      search: params?.search,
      skills: params?.skills,
      tools: params?.tools,
      availability: params?.availability,
      minRating: params?.minRating,
    });

    // Apply sorting
    if (params?.sortBy) {
      talents = sortTalentsData(talents, params.sortBy);
    }

    const total = talents.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedData = talents.slice(startIndex, startIndex + pageSize);

    return {
      success: true,
      data: {
        data: paginatedData,
        total,
        page,
        pageSize,
        totalPages,
      },
    };
  },

  async getById(id: string): Promise<ApiResponse<TalentProfile | null>> {
    await delay(300);

    const talent = mockTalents.find(t => t.id === id);

    if (!talent) {
      return {
        success: false,
        data: null,
        error: 'Talent not found',
      };
    }

    return {
      success: true,
      data: talent,
    };
  },

  async message(talentId: string, message: string): Promise<ApiResponse<{ messageId: string }>> {
    await delay(500);

    return {
      success: true,
      data: {
        messageId: Math.random().toString(36).substring(2, 9),
      },
    };
  },
};

// Projects API
export const projectApi = {
  async getAll(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    categories?: string[];
    complexity?: string[];
    budgetRange?: string;
    status?: string;
    sortBy?: 'recent' | 'budget-high' | 'budget-low' | 'timeline' | 'proposals';
  }): Promise<ApiResponse<PaginatedResponse<Project>>> {
    await delay(500);

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;

    let projects = [...mockProjects];

    // Apply filters
    projects = filterProjects(projects, {
      search: params?.search,
      categories: params?.categories,
      complexity: params?.complexity,
      budgetRange: params?.budgetRange,
      status: params?.status,
    });

    // Apply sorting
    if (params?.sortBy) {
      projects = sortProjectsData(projects, params.sortBy);
    }

    const total = projects.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedData = projects.slice(startIndex, startIndex + pageSize);

    return {
      success: true,
      data: {
        data: paginatedData,
        total,
        page,
        pageSize,
        totalPages,
      },
    };
  },

  async getById(id: string): Promise<ApiResponse<Project | null>> {
    await delay(300);

    const project = mockProjects.find(p => p.id === id);

    if (!project) {
      return {
        success: false,
        data: null,
        error: 'Project not found',
      };
    }

    return {
      success: true,
      data: project,
    };
  },

  async create(data: Partial<Project>): Promise<ApiResponse<Project>> {
    await delay(800);

    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 9),
      title: data.title || '',
      description: data.description || '',
      budget: data.budget || '',
      timeline: data.timeline || '',
      requiredSkills: data.requiredSkills || [],
      requiredTools: data.requiredTools || [],
      complexity: data.complexity || 'moderate',
      category: data.category || '',
      postedDate: new Date().toISOString().split('T')[0],
      proposals: 0,
      status: 'open',
      clientName: 'Your Company',
      clientRating: 5.0,
    };

    return {
      success: true,
      data: newProject,
    };
  },

  async submitProposal(projectId: string, proposal: {
    coverLetter: string;
    proposedBudget: string;
    proposedTimeline: string;
  }): Promise<ApiResponse<{ proposalId: string }>> {
    await delay(600);

    return {
      success: true,
      data: {
        proposalId: Math.random().toString(36).substring(2, 9),
      },
    };
  },
};

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<ApiResponse<{
    user: {
      id: string;
      email: string;
      name: string;
      userType: UserType;
      avatar?: string;
    };
    token: string;
  }>> {
    await delay(1000);

    if (!email || !password) {
      return {
        success: false,
        data: null as any,
        error: 'Email and password are required',
      };
    }

    // Mock validation
    if (password.length < 6) {
      return {
        success: false,
        data: null as any,
        error: 'Invalid credentials',
      };
    }

    return {
      success: true,
      data: {
        user: {
          id: '1',
          email,
          name: email.split('@')[0],
          userType: 'agency',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        token: `mock_token_${Date.now()}`,
      },
    };
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
    userType: UserType;
  }): Promise<ApiResponse<{
    user: {
      id: string;
      email: string;
      name: string;
      userType: UserType;
    };
    token: string;
  }>> {
    await delay(1000);

    if (!data.email || !data.password || !data.name) {
      return {
        success: false,
        data: null as any,
        error: 'All fields are required',
      };
    }

    return {
      success: true,
      data: {
        user: {
          id: Math.random().toString(36).substring(2, 9),
          email: data.email,
          name: data.name,
          userType: data.userType,
        },
        token: `mock_token_${Date.now()}`,
      },
    };
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(300);
    return { success: true, data: null };
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    await delay(200);
    return {
      success: true,
      data: { token: `mock_token_${Date.now()}` },
    };
  },
};

// Dashboard API
export const dashboardApi = {
  async getAgencyStats(): Promise<ApiResponse<{
    activeProjects: number;
    totalSpent: string;
    talentHired: number;
    avgRating: number;
  }>> {
    await delay(400);

    return {
      success: true,
      data: {
        activeProjects: 5,
        totalSpent: '$45,280',
        talentHired: 12,
        avgRating: 4.8,
      },
    };
  },

  async getTalentStats(): Promise<ApiResponse<{
    activeProjects: number;
    totalEarned: string;
    clientsWorked: number;
    rating: number;
  }>> {
    await delay(400);

    return {
      success: true,
      data: {
        activeProjects: 3,
        totalEarned: '$28,450',
        clientsWorked: 15,
        rating: 4.9,
      },
    };
  },

  async getRecentActivity(): Promise<ApiResponse<Array<{
    id: string;
    type: 'project' | 'proposal' | 'message' | 'payment';
    title: string;
    timestamp: string;
  }>>> {
    await delay(300);

    return {
      success: true,
      data: [
        { id: '1', type: 'project', title: 'New project posted: AI Commercial', timestamp: '2 hours ago' },
        { id: '2', type: 'proposal', title: 'Proposal received from Sarah Chen', timestamp: '5 hours ago' },
        { id: '3', type: 'message', title: 'New message from TechFlow Inc', timestamp: '1 day ago' },
        { id: '4', type: 'payment', title: 'Payment received: $2,500', timestamp: '2 days ago' },
      ],
    };
  },
};
