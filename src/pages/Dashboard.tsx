import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Filter, Star, Clock, DollarSign, Users,
  Briefcase, Eye, MessageSquare, Calendar, Award, TrendingUp,
  FileText, Send, CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockProjects, filterProjects } from '../data/mockProjects';
import { mockTalents } from '../data/mockTalents';
import { Project } from '../types';
import { Button } from '../components/common/Button';
import { Card, CardContent, CardHeader } from '../components/common/Card';
import { Badge, StatusBadge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Input } from '../components/common/Input';
import { Skeleton, SkeletonDashboardStats } from '../components/common/Skeleton';

// Mock data for agency and talent dashboards
const agencyDashboardData = {
  stats: {
    activeProjects: 8,
    totalSpent: '$125,000',
    talentHired: 24,
    avgRating: 4.8
  },
  projects: mockProjects,
  // Simulated proposals for agency view
  proposals: [
    { projectId: '1', talentId: '1', talentName: 'Sarah Chen', rate: '$95/hr', status: 'pending', submittedDate: '2024-01-18' },
    { projectId: '1', talentId: '2', talentName: 'Marcus Rodriguez', rate: '$85/hr', status: 'pending', submittedDate: '2024-01-17' },
    { projectId: '2', talentId: '3', talentName: 'Elena Vasquez', rate: '$110/hr', status: 'accepted', submittedDate: '2024-01-15' },
  ]
};

const talentDashboardData = {
  stats: {
    activeProjects: 3,
    totalEarned: '$45,000',
    clientsWorked: 15,
    avgRating: 4.9
  },
  // Simulated proposals sent by talent
  myProposals: [
    { projectId: '1', projectTitle: 'AI Brand Commercial for Tech Startup', rate: '$95/hr', status: 'pending', submittedDate: '2024-01-18' },
    { projectId: '3', projectTitle: 'Educational Content for AI Course', rate: '$80/hr', status: 'accepted', submittedDate: '2024-01-12' },
    { projectId: '6', projectTitle: 'Social Media Video Package', rate: '$60/hr', status: 'rejected', submittedDate: '2024-01-10' },
  ],
  // Projects talent is working on
  activeWork: mockProjects.filter(p => p.status === 'in-progress').slice(0, 2),
  completedWork: mockProjects.filter(p => p.status === 'completed').slice(0, 3)
};

const Dashboard: React.FC = () => {
  const { userType } = useAuth();
  const [activeTab, setActiveTab] = useState(userType === 'agency' ? 'active' : 'available');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Reset tab when user type changes
  useEffect(() => {
    setActiveTab(userType === 'agency' ? 'active' : 'available');
  }, [userType]);

  const stats = userType === 'agency' ? agencyDashboardData.stats : talentDashboardData.stats;

  // Agency tabs
  const agencyTabs = [
    { id: 'active', name: 'Active', count: mockProjects.filter(p => p.status === 'open').length },
    { id: 'in-progress', name: 'In Progress', count: mockProjects.filter(p => p.status === 'in-progress').length },
    { id: 'completed', name: 'Completed', count: mockProjects.filter(p => p.status === 'completed').length },
    { id: 'drafts', name: 'Drafts', count: 2 }
  ];

  // Talent tabs
  const talentTabs = [
    { id: 'available', name: 'Browse Projects', count: mockProjects.filter(p => p.status === 'open').length },
    { id: 'proposals', name: 'My Proposals', count: talentDashboardData.myProposals.length },
    { id: 'active-work', name: 'Active Work', count: talentDashboardData.activeWork.length },
    { id: 'completed', name: 'Completed', count: talentDashboardData.completedWork.length }
  ];

  const tabs = userType === 'agency' ? agencyTabs : talentTabs;

  // Filter projects based on active tab
  const filteredProjects = useMemo(() => {
    let projects: Project[] = [];

    if (userType === 'agency') {
      switch (activeTab) {
        case 'active':
          projects = mockProjects.filter(p => p.status === 'open');
          break;
        case 'in-progress':
          projects = mockProjects.filter(p => p.status === 'in-progress');
          break;
        case 'completed':
          projects = mockProjects.filter(p => p.status === 'completed');
          break;
        case 'drafts':
          // No drafts in mock data
          projects = [];
          break;
        default:
          projects = mockProjects;
      }
    } else {
      switch (activeTab) {
        case 'available':
          projects = mockProjects.filter(p => p.status === 'open');
          break;
        case 'active-work':
          projects = talentDashboardData.activeWork;
          break;
        case 'completed':
          projects = talentDashboardData.completedWork;
          break;
        default:
          projects = [];
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.requiredSkills.some(s => s.toLowerCase().includes(query)) ||
        p.requiredTools.some(t => t.toLowerCase().includes(query))
      );
    }

    return projects;
  }, [userType, activeTab, searchQuery]);

  const statusColors: Record<string, string> = {
    open: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    draft: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels: Record<string, string> = {
    open: 'Open',
    'in-progress': 'In Progress',
    completed: 'Completed',
    draft: 'Draft'
  };

  const proposalStatusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-72" />
            </div>
          </div>
          <SkeletonDashboardStats />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userType === 'agency' ? 'Project Dashboard' : 'My Workspace'}
            </h1>
            <p className="text-gray-600 mt-1">
              {userType === 'agency'
                ? 'Manage your AI video projects and talent relationships'
                : 'Find projects and manage your AI video creation work'
              }
            </p>
          </div>
          {userType === 'agency' && (
            <Link to="/post-project">
              <Button className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Post New Project</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userType === 'agency' ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Projects</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalSpent}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+8%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Talent Hired</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.talentHired}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+15%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-gray-600">Based on 156 reviews</span>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Projects</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-gray-600">2 due this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Earned</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalEarned}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+$3,200</span>
                    <span className="text-gray-500 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Clients Worked</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.clientsWorked}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <Award className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-gray-600">85% repeat rate</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">My Rating</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-gray-600">Based on 127 reviews</span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-3">
            <Card>
              {/* Header */}
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userType === 'agency' ? 'Your Projects' : 'Projects'}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.name}
                      <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                        activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </CardHeader>

              {/* Content based on tab */}
              <CardContent className="p-0">
                {/* Proposals tab for talent */}
                {userType === 'talent' && activeTab === 'proposals' ? (
                  <div className="divide-y divide-gray-200">
                    {talentDashboardData.myProposals.length === 0 ? (
                      <div className="p-12 text-center">
                        <Send className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
                        <p className="text-gray-500 mb-4">Start browsing projects to submit proposals</p>
                        <Link to="/discover">
                          <Button>Browse Projects</Button>
                        </Link>
                      </div>
                    ) : (
                      talentDashboardData.myProposals.map((proposal, index) => (
                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                                  {proposal.projectTitle}
                                </h3>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${proposalStatusColors[proposal.status]}`}>
                                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>Your Rate: {proposal.rate}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Submitted: {proposal.submittedDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {proposal.status === 'pending' && (
                                <Button variant="outline" size="sm">Withdraw</Button>
                              )}
                              {proposal.status === 'accepted' && (
                                <Button size="sm">View Project</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  /* Projects List */
                  <div className="divide-y divide-gray-200">
                    {filteredProjects.length === 0 ? (
                      <div className="p-12 text-center">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {searchQuery ? 'No projects found' : 'No projects here'}
                        </h3>
                        <p className="text-gray-500 mb-4">
                          {searchQuery
                            ? 'Try adjusting your search terms'
                            : userType === 'agency'
                              ? 'Get started by posting your first project'
                              : 'Browse available projects to get started'
                          }
                        </p>
                        {userType === 'agency' && activeTab === 'drafts' && (
                          <Link to="/post-project">
                            <Button>Create Project</Button>
                          </Link>
                        )}
                      </div>
                    ) : (
                      filteredProjects.map((project) => (
                        <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                                  {project.title}
                                </h3>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                                  {statusLabels[project.status]}
                                </span>
                              </div>

                              <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.requiredSkills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="secondary" size="sm">
                                    {skill}
                                  </Badge>
                                ))}
                                {project.requiredSkills.length > 3 && (
                                  <span className="text-blue-600 text-xs self-center">
                                    +{project.requiredSkills.length - 3} more
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{project.budget}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{project.timeline}</span>
                                </div>
                                {userType === 'agency' && project.proposals > 0 && (
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{project.proposals} proposals</span>
                                  </div>
                                )}
                                {userType === 'talent' && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span>{project.clientRating} client rating</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end space-y-2 ml-6">
                              <div className="text-sm text-gray-500">{project.postedDate}</div>
                              <div className="flex space-x-2">
                                {userType === 'talent' && project.status === 'open' && (
                                  <Button size="sm">Submit Proposal</Button>
                                )}
                                {userType === 'agency' && (
                                  <>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                      <Eye className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                      <MessageSquare className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userType === 'agency' ? (
                      <>
                        <Link to="/post-project" className="block">
                          <Button className="w-full flex items-center justify-center space-x-2">
                            <Plus className="h-4 w-4" />
                            <span>Post Project</span>
                          </Button>
                        </Link>
                        <Link to="/discover" className="block">
                          <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                            <Search className="h-4 w-4" />
                            <span>Find Talent</span>
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/discover" className="block">
                          <Button className="w-full flex items-center justify-center space-x-2">
                            <Search className="h-4 w-4" />
                            <span>Browse Projects</span>
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Update Availability</span>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <p className="text-gray-900">New proposal received</p>
                        <p className="text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <p className="text-gray-900">Project milestone completed</p>
                        <p className="text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <p className="text-gray-900">Payment processed</p>
                        <p className="text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers (Agency) / Saved Projects (Talent) */}
              {userType === 'agency' ? (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Top Performers</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTalents.slice(0, 3).map((talent) => (
                        <Link
                          key={talent.id}
                          to={`/talent/${talent.id}`}
                          className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2"
                        >
                          <Avatar
                            src={talent.avatar}
                            alt={talent.name}
                            fallback={talent.name}
                            size="sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{talent.name}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500">{talent.rating}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Profile Completion</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Profile</span>
                        <span className="text-gray-900 font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Portfolio uploaded</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Skills verified</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>Add certifications</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
