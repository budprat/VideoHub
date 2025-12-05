import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Clock, Award, Play, Eye, MessageSquare,
  CheckCircle, Calendar, DollarSign, Users, ArrowLeft,
  ExternalLink, Download, Share, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTalentById } from '../data/mockTalents';
import { TalentProfile as TalentProfileType } from '../types';
import { Button } from '../components/common/Button';
import { Card, CardContent, CardHeader } from '../components/common/Card';
import { Badge, AvailabilityBadge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Skeleton } from '../components/common/Skeleton';

const TalentProfilePage: React.FC = () => {
  const { userType, isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [talent, setTalent] = useState<TalentProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTalent = () => {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      setTimeout(() => {
        if (!id) {
          setError('No talent ID provided');
          setLoading(false);
          return;
        }

        const foundTalent = getTalentById(id);
        if (foundTalent) {
          setTalent(foundTalent);
        } else {
          setError('Talent not found');
        }
        setLoading(false);
      }, 500);
    };

    loadTalent();
  }, [id]);

  const tabs = talent ? [
    { id: 'portfolio', name: 'Portfolio', count: talent.portfolio.length },
    { id: 'reviews', name: 'Reviews', count: talent.testimonials.length },
    { id: 'certifications', name: 'Certifications', count: talent.certifications.length },
    { id: 'about', name: 'About', count: null }
  ] : [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
        <div className="relative">
          <Skeleton className="h-48 w-full" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-20 bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                <Skeleton className="w-32 h-32 rounded-2xl" />
                <div className="flex-1 mt-6 lg:mt-0 space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-6 w-48" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error/Not found state
  if (error || !talent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error === 'Talent not found' ? 'Talent Not Found' : 'Error Loading Profile'}
            </h2>
            <p className="text-gray-600 mb-6">
              {error === 'Talent not found'
                ? "The talent profile you're looking for doesn't exist or has been removed."
                : error || 'Something went wrong while loading this profile.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/discover')}>
                Browse All Talent
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default values for optional fields
  const coverImage = talent.coverImage || 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop';
  const totalEarnings = talent.totalEarnings || 'N/A';
  const joinDate = talent.joinDate || 'Member';
  const languages = talent.languages || ['English'];
  const stats = talent.stats || {
    onTimeDelivery: '95%',
    repeatClients: '80%',
    averageRating: talent.rating,
    budgetAccuracy: '90%'
  };

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
            src={coverImage}
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
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-4 border-white rounded-full ${
                    talent.availability === 'available' ? 'bg-green-500' :
                    talent.availability === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                </div>
              </div>

              <div className="flex-1 mt-6 lg:mt-0">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{talent.name}</h1>
                      <AvailabilityBadge availability={talent.availability} />
                    </div>
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
                        <span>Member since {joinDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{talent.rating}</span>
                        <span className="text-gray-500">({talent.completedProjects} projects)</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{talent.hourlyRate}/hr</div>
                      {totalEarnings !== 'N/A' && (
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{totalEarnings}</span> earned
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 mt-6 lg:mt-0">
                    <Button className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact {talent.name.split(' ')[0]}</span>
                    </Button>
                    <Button variant="outline">
                      Invite to Project
                    </Button>
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
                <div className="text-2xl font-bold text-gray-900">{stats.onTimeDelivery}</div>
                <div className="text-sm text-gray-600">On-time delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.repeatClients}</div>
                <div className="text-sm text-gray-600">Repeat clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.averageRating}</div>
                <div className="text-sm text-gray-600">Average rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.budgetAccuracy}</div>
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
                      {tab.count !== null && (
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
                    {talent.portfolio.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Play className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No portfolio items yet</p>
                      </div>
                    ) : (
                      talent.portfolio.map((item) => (
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
                              {item.completionDate && (
                                <div className="text-sm text-gray-500">{item.completionDate}</div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" size="sm">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-sm text-gray-500">
                                Client: <span className="font-medium">{item.client}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {talent.testimonials.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No reviews yet</p>
                      </div>
                    ) : (
                      talent.testimonials.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar
                              src={review.clientAvatar}
                              alt={review.clientName}
                              fallback={review.clientName}
                              size="md"
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
                                          i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <div className="text-sm text-gray-500">{review.date}</div>
                                </div>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                              <div className="mt-3">
                                <Badge variant="secondary">
                                  {review.projectType}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Certifications Tab */}
                {activeTab === 'certifications' && (
                  <div className="space-y-4">
                    {talent.certifications.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No certifications yet</p>
                      </div>
                    ) : (
                      talent.certifications.map((cert) => (
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
                      ))
                    )}
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">About {talent.name.split(' ')[0]}</h3>
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
                        {languages.map((language) => (
                          <Badge key={language} variant="secondary">
                            {language}
                          </Badge>
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
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Core Skills</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {talent.skills.map((skill, index) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-gray-700">{skill}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${95 - index * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Tools */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">AI Tools Mastery</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {talent.aiTools.map((tool) => (
                      <div key={tool} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700 font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfilePage;
