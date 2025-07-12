import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, Award, Play, Eye, DollarSign, Calendar, Users, Briefcase } from 'lucide-react';
import { UserType, TalentProfile, Project } from '../types';

interface TalentDiscoveryProps {
  userType: UserType;
}

const TalentDiscovery: React.FC<TalentDiscoveryProps> = ({ userType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [] as string[],
    tools: [] as string[],
    availability: '',
    rateRange: '',
    rating: ''
  });

  const mockTalents: TalentProfile[] = [
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
        }
      ],
      certifications: [],
      testimonials: [],
      availability: 'available',
      responseTime: '< 2 hours',
      bio: 'Specialized in creating compelling AI-generated video content for tech brands and startups.'
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
          id: '2',
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
      certifications: [],
      testimonials: [],
      availability: 'busy',
      responseTime: '< 4 hours',
      bio: 'Expert in technical AI video implementation with focus on educational and corporate content.'
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
          id: '3',
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
      certifications: [],
      testimonials: [],
      availability: 'available',
      responseTime: '< 1 hour',
      bio: 'Award-winning creative producer specializing in luxury brand campaigns and visual storytelling.'
    }
  ];

  const mockProjects: Project[] = [
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
      description: 'Create an engaging 90-second explainer video for our new cryptocurrency trading app. The video should simplify complex financial concepts and demonstrate the app\'s key features. Looking for a modern, trustworthy aesthetic with AI-generated financial visualizations and smooth motion graphics.',
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
    }
  ];

  const availabilityColors = {
    available: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    unavailable: 'bg-red-100 text-red-800'
  };

  const availabilityLabels = {
    available: 'Available',
    busy: 'Busy',
    unavailable: 'Unavailable'
  };

  const statusColors = {
    open: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  const complexityColors = {
    simple: 'bg-green-50 text-green-700 border-green-200',
    moderate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    complex: 'bg-red-50 text-red-700 border-red-200'
  };

  const complexityLabels = {
    simple: 'Simple',
    moderate: 'Moderate',
    complex: 'Complex'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'agency' ? 'Discover AI Video Talent' : 'Browse Available Projects'}
          </h1>
          <p className="text-gray-600">
            {userType === 'agency' 
              ? 'Find certified AI video creators for your next project'
              : 'Explore exciting AI video projects from top agencies and brands'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={userType === 'agency' ? 'Skills, tools, or keywords...' : 'Project type, industry, keywords...'}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {userType === 'talent' ? (
                <>
                  {/* Project Category */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                    <div className="space-y-2">
                      {['Commercial & Advertising', 'Brand Content', 'Educational Content', 'Product Demos', 'Social Media Content', 'Explainer Videos'].map((category) => (
                        <label key={category} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
                    <div className="space-y-2">
                      {['$1K-5K', '$5K-10K', '$10K-20K', '$20K-50K', '$50K+'].map((range) => (
                        <label key={range} className="flex items-center">
                          <input type="radio" name="budget" className="border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Complexity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Complexity</label>
                    <div className="space-y-2">
                      {['Simple', 'Moderate', 'Complex'].map((complexity) => (
                        <label key={complexity} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{complexity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Timeline</label>
                    <div className="space-y-2">
                      {['1 week', '2 weeks', '1 month', '2+ months'].map((timeline) => (
                        <label key={timeline} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{timeline}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* AI Tools */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">AI Tools</label>
                    <div className="space-y-2">
                      {['Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'Pika Labs', 'LumaAI', 'Synthesia'].map((tool) => (
                        <label key={tool} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
                    <div className="space-y-2">
                      {['Available Now', 'Within 1 Week', 'Within 1 Month'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input type="radio" name="availability" className="border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rate Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Hourly Rate</label>
                    <div className="space-y-2">
                      {['$25-50', '$50-75', '$75-100', '$100-150', '$150+'].map((range) => (
                        <label key={range} className="flex items-center">
                          <input type="radio" name="rate" className="border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
                    <div className="space-y-2">
                      {['4.5+', '4.0+', '3.5+', '3.0+'].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input type="radio" name="rating" className="border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{rating} stars</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {userType === 'agency' ? mockTalents.length : mockProjects.length} of {userType === 'agency' ? '234' : '156'} results
              </div>
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {userType === 'agency' ? (
                  <>
                    <option>Best Match</option>
                    <option>Highest Rated</option>
                    <option>Most Reviews</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </>
                ) : (
                  <>
                    <option>Most Recent</option>
                    <option>Highest Budget</option>
                    <option>Shortest Timeline</option>
                    <option>Best Match</option>
                    <option>Fewest Proposals</option>
                  </>
                )}
              </select>
            </div>

            <div className="space-y-6">
              {userType === 'agency' ? (
                // Show talents for agencies
                mockTalents.map((talent) => (
                  <div key={talent.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={talent.avatar}
                          alt={talent.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                          talent.availability === 'available' ? 'bg-green-500' : 
                          talent.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link to={`/talent/${talent.id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                              {talent.name}
                            </Link>
                            <p className="text-gray-600 mt-1">{talent.title}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{talent.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>Responds in {talent.responseTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{talent.rating}</span>
                              <span className="text-gray-500">({talent.completedProjects})</span>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">{talent.hourlyRate}/hr</div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${availabilityColors[talent.availability]}`}>
                              {availabilityLabels[talent.availability]}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mt-4 line-clamp-2">{talent.bio}</p>

                        {/* Skills */}
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {talent.skills.slice(0, 4).map((skill) => (
                              <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                            {talent.skills.length > 4 && (
                              <span className="text-gray-500 text-sm">+{talent.skills.length - 4} more</span>
                            )}
                          </div>
                        </div>

                        {/* AI Tools */}
                        <div className="mt-3">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600">AI Tools:</span>
                            <div className="flex flex-wrap gap-2">
                              {talent.aiTools.slice(0, 3).map((tool) => (
                                <span key={tool} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                  {tool}
                                </span>
                              ))}
                              {talent.aiTools.length > 3 && (
                                <span className="text-blue-600 text-xs">+{talent.aiTools.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Portfolio Preview */}
                        {talent.portfolio.length > 0 && (
                          <div className="mt-4">
                            <div className="relative group">
                              <img
                                src={talent.portfolio[0].thumbnail}
                                alt={talent.portfolio[0].title}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <div className="flex items-center space-x-4 text-white">
                                  <div className="flex items-center space-x-1">
                                    <Play className="h-4 w-4" />
                                    <span className="text-sm">{talent.portfolio[0].duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{talent.portfolio[0].views}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{talent.portfolio[0].title}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-3 mt-6">
                          <Link
                            to={`/talent/${talent.id}`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            View Profile
                          </Link>
                          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Message
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Show projects for talent
                mockProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                            {project.title}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                            {project.status === 'open' ? 'Open' : project.status}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-medium ${complexityColors[project.complexity]}`}>
                            {complexityLabels[project.complexity]}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="text-sm text-gray-600 font-medium">Required Skills:</div>
                          {project.requiredSkills.slice(0, 4).map((skill) => (
                            <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                          {project.requiredSkills.length > 4 && (
                            <span className="text-blue-600 text-xs">+{project.requiredSkills.length - 4}</span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="text-sm text-gray-600 font-medium">AI Tools:</div>
                          {project.requiredTools.map((tool) => (
                            <span key={tool} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium">{project.budget}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{project.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{project.proposals} proposals</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{project.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Client:</span> {project.clientName}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{project.clientRating}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Posted {project.postedDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3 ml-6">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Submit Proposal
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                          Save Project
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Load More Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDiscovery;