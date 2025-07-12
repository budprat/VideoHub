import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, Clock, Award, Play, Eye, MessageSquare, 
  CheckCircle, Calendar, DollarSign, Users, ArrowLeft,
  ExternalLink, Download, Share
} from 'lucide-react';
import { UserType } from '../types';

interface TalentProfileProps {
  userType: UserType;
}

const TalentProfile: React.FC<TalentProfileProps> = ({ userType }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('portfolio');

  // Mock detailed talent data
  const talent = {
    id: '1',
    name: 'Sarah Chen',
    title: 'AI Video Director & Motion Designer',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    rating: 4.9,
    completedProjects: 127,
    hourlyRate: '$85-120',
    totalEarnings: '$340K',
    skills: ['Creative Direction', 'Motion Graphics', 'Storytelling', 'Commercial Production', 'Brand Strategy', 'Visual Effects'],
    aiTools: ['Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'LumaAI', 'Pika Labs', 'D-ID'],
    availability: 'available',
    responseTime: '< 2 hours',
    joinDate: 'March 2023',
    languages: ['English (Native)', 'Mandarin (Fluent)', 'Spanish (Conversational)'],
    bio: `Award-winning AI video specialist with 8+ years in creative direction and motion design. I specialize in creating compelling, brand-focused video content using cutting-edge AI tools. My work has been featured in campaigns for Fortune 500 companies and emerging tech startups.

I combine traditional storytelling principles with innovative AI video generation techniques to deliver content that not only looks stunning but drives real business results. Every project is approached with strategic thinking, creative excellence, and technical precision.`,
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
    stats: {
      onTimeDelivery: '98%',
      repeatClients: '85%',
      averageRating: 4.9,
      budgetAccuracy: '95%'
    }
  };

  const tabs = [
    { id: 'portfolio', name: 'Portfolio', count: talent.portfolio.length },
    { id: 'reviews', name: 'Reviews', count: talent.testimonials.length },
    { id: 'certifications', name: 'Certifications', count: talent.certifications.length },
    { id: 'about', name: 'About', count: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/discover" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Discovery</span>
          </Link>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600">
          <img
            src={talent.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1 mt-6 lg:mt-0">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{talent.name}</h1>
                    <p className="text-xl text-gray-600 mt-1">{talent.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{talent.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Responds in {talent.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {talent.joinDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{talent.rating}</span>
                        <span className="text-gray-500">({talent.completedProjects} projects)</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{talent.hourlyRate}/hr</div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{talent.totalEarnings}</span> earned
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 mt-6 lg:mt-0">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Sarah</span>
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Invite to Project
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{talent.stats.onTimeDelivery}</div>
                <div className="text-sm text-gray-600">On-time delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{talent.stats.repeatClients}</div>
                <div className="text-sm text-gray-600">Repeat clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{talent.stats.averageRating}</div>
                <div className="text-sm text-gray-600">Average rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{talent.stats.budgetAccuracy}</div>
                <div className="text-sm text-gray-600">Budget accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.name}
                      {tab.count && (
                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    {talent.portfolio.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative group">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                              <Play className="h-8 w-8 text-white ml-1" />
                            </button>
                          </div>
                          <div className="absolute top-4 right-4 flex items-center space-x-2 text-white text-sm">
                            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                              <Clock className="h-3 w-3" />
                              <span>{item.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                              <Eye className="h-3 w-3" />
                              <span>{item.views}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <div className="text-sm text-gray-500">{item.completionDate}</div>
                          </div>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">
                              Client: <span className="font-medium">{item.client}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {talent.testimonials.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.clientAvatar}
                            alt={review.clientName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
                                <p className="text-sm text-gray-600">{review.clientCompany}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 mb-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="text-sm text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            <div className="mt-3">
                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {review.projectType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications Tab */}
                {activeTab === 'certifications' && (
                  <div className="space-y-4">
                    {talent.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Award className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                            <p className="text-sm text-gray-600">Issued by {cert.issuer}</p>
                            <p className="text-sm text-gray-500">{cert.date}</p>
                          </div>
                        </div>
                        {cert.verified && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">About Sarah</h3>
                      <div className="prose prose-gray max-w-none">
                        {talent.bio.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {talent.languages.map((language) => (
                          <span key={language} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Core Skills</h3>
                <div className="space-y-2">
                  {talent.skills.map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Tools */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">AI Tools Mastery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {talent.aiTools.map((tool) => (
                    <div key={tool} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700 font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Send Message</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Invite to Project</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Schedule Call</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;