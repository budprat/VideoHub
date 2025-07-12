import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Star, Clock, DollarSign, Users, 
  Briefcase, Eye, MessageSquare, Calendar, Award, TrendingUp
} from 'lucide-react';
import { UserType } from '../types';

interface DashboardProps {
  userType: UserType;
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const [activeTab, setActiveTab] = useState('active');

  // Mock data
  const agencyStats = {
    activeProjects: 8,
    totalSpent: '$125,000',
    talentHired: 24,
    avgRating: 4.8
  };

  const talentStats = {
    activeProjects: 3,
    totalEarned: '$45,000',
    clientsWorked: 15,
    avgRating: 4.9
  };

  const mockProjects = [
    {
      id: '1',
      title: 'AI Brand Commercial for Tech Startup',
      description: 'Create a 60-second commercial showcasing our AI-powered analytics platform...',
      budget: '$8,000 - $12,000',
      timeline: '2 weeks',
      proposals: 12,
      status: 'active',
      postedDate: '2024-01-15',
      category: 'Commercial',
      skills: ['Creative Direction', 'Runway ML', 'Motion Graphics'],
      client: 'TechFlow Inc',
      freelancer: userType === 'agency' ? 'Sarah Chen' : null
    },
    {
      id: '2',
      title: 'Product Demo Video Series',
      description: 'Series of 5 product demo videos using AI-generated backgrounds...',
      budget: '$15,000 - $20,000',
      timeline: '1 month',
      proposals: 8,
      status: 'in-progress',
      postedDate: '2024-01-10',
      category: 'Product Demo',
      skills: ['Product Videos', 'Midjourney Video', 'Animation'],
      client: 'InnovateCorp',
      freelancer: userType === 'agency' ? 'Marcus Rodriguez' : null
    },
    {
      id: '3',
      title: 'Educational Content for AI Course',
      description: 'Create engaging educational videos explaining AI concepts...',
      budget: '$5,000 - $8,000',
      timeline: '3 weeks',
      proposals: 0,
      status: 'completed',
      postedDate: '2023-12-20',
      category: 'Educational',
      skills: ['Educational Content', 'Synthesia', 'Storytelling'],
      client: 'LearnTech Academy',
      freelancer: userType === 'agency' ? 'Elena Vasquez' : null
    }
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    draft: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    active: 'Active',
    'in-progress': 'In Progress',
    completed: 'Completed',
    draft: 'Draft'
  };

  const tabs = userType === 'agency' 
    ? [
        { id: 'active', name: 'Active Projects', count: 8 },
        { id: 'in-progress', name: 'In Progress', count: 5 },
        { id: 'completed', name: 'Completed', count: 12 },
        { id: 'drafts', name: 'Drafts', count: 2 }
      ]
    : [
        { id: 'active', name: 'Available', count: 24 },
        { id: 'proposals', name: 'My Proposals', count: 6 },
        { id: 'in-progress', name: 'Active Work', count: 3 },
        { id: 'completed', name: 'Completed', count: 28 }
      ];

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
            <Link
              to="/post-project"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Post New Project</span>
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userType === 'agency' ? (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{agencyStats.activeProjects}</p>
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
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900">{agencyStats.totalSpent}</p>
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
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Talent Hired</p>
                    <p className="text-3xl font-bold text-gray-900">{agencyStats.talentHired}</p>
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
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-3xl font-bold text-gray-900">{agencyStats.avgRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-gray-600">Based on 156 reviews</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{talentStats.activeProjects}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-gray-600">2 due this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earned</p>
                    <p className="text-3xl font-bold text-gray-900">{talentStats.totalEarned}</p>
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
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clients Worked</p>
                    <p className="text-3xl font-bold text-gray-900">{talentStats.clientsWorked}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Award className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-gray-600">85% repeat rate</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">My Rating</p>
                    <p className="text-3xl font-bold text-gray-900">{talentStats.avgRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-gray-600">Based on 127 reviews</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userType === 'agency' ? 'Your Projects' : 'Available Projects'}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
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
                      {tab.count && (
                        <span className="ml-2 bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects List */}
              <div className="divide-y divide-gray-200">
                {mockProjects.map((project) => (
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
                          {project.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                          {project.skills.length > 3 && (
                            <span className="text-blue-600 text-xs">+{project.skills.length - 3}</span>
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
                          {project.freelancer && (
                            <div className="flex items-center space-x-1">
                              <Award className="h-4 w-4" />
                              <span>with {project.freelancer}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2 ml-6">
                        <div className="text-sm text-gray-500">{project.postedDate}</div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {userType === 'agency' ? (
                    <>
                      <Link
                        to="/post-project"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Post Project</span>
                      </Link>
                      <Link
                        to="/discover"
                        className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <Search className="h-4 w-4" />
                        <span>Find Talent</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/discover"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Search className="h-4 w-4" />
                        <span>Browse Projects</span>
                      </Link>
                      <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Update Calendar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
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
              </div>

              {/* Top Performers */}
              {userType === 'agency' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Top Performers</h3>
                  <div className="space-y-3">
                    {['Sarah Chen', 'Marcus Rodriguez', 'Elena Vasquez'].map((name, index) => (
                      <div key={name} className="flex items-center space-x-3">
                        <img
                          src={`https://images.pexels.com/photos/${index === 0 ? '774909' : index === 1 ? '220453' : '415829'}/pexels-photo-${index === 0 ? '774909' : index === 1 ? '220453' : '415829'}.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face`}
                          alt={name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{name}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">4.9</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;