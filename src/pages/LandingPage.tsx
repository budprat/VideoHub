import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Star, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserType, isAuthenticated } = useAuth();

  const handleGetStarted = (type: 'agency' | 'talent') => {
    setUserType(type);
    if (isAuthenticated) {
      navigate('/discover');
    } else {
      navigate('/register');
    }
  };

  const stats = [
    { label: 'Verified AI Video Creators', value: '2,500+', icon: Users },
    { label: 'Projects Completed', value: '15,000+', icon: CheckCircle },
    { label: 'Average Rating', value: '4.9/5', icon: Star },
    { label: 'Industry Partners', value: '500+', icon: Award }
  ];

  const aiTools = [
    'Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'Pika Labs',
    'LumaAI', 'Synthesia', 'D-ID', 'Pictory', 'Luma Dream Machine'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Elite AI Video
                  <span className="text-blue-400"> Creator</span>
                  <br />Talent Hub
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Connect with certified AI video specialists who master the latest tools and techniques.
                  From concept to completion, find the perfect creative partner for your next breakthrough project.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleGetStarted('agency')}
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  <span>Find AI Video Talent</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleGetStarted('talent')}
                  className="group border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Join as Creator</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="AI Video Creation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-300 transform hover:scale-110">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Latest AI Tools Mastery</span>
                    <span className="text-blue-400 font-semibold">100% Verified</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiTools.slice(0, 4).map((tool) => (
                      <span key={tool} className="bg-white/10 text-white px-3 py-1 rounded-full text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose VideoHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The only platform specifically designed for AI video creation professionals.
              Every feature is built to accelerate your creative workflow and ensure exceptional results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certified Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Every creator is verified for proficiency with cutting-edge AI tools including Runway,
                Midjourney Video, and Stable Video Diffusion. Technical skills meet creative vision.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive portfolio verification, client testimonials, and multi-dimensional
                rating systems ensure you work with only the highest caliber professionals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered algorithms consider creative style, technical expertise, and project
                requirements to connect you with the perfect talent for every unique vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mastery Across All Leading AI Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our creators are certified and continuously trained on the latest AI video generation platforms
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {aiTools.map((tool) => (
              <div key={tool} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-blue-50 transition-colors group">
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {tool}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your AI Video Projects?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of agencies and creators who are already transforming their workflows
            with AI-powered video creation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleGetStarted('agency')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Hiring Talent</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleGetStarted('talent')}
              className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Apply as Creator</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">VideoHub</h3>
              <p className="text-sm">
                The premier marketplace for AI video creation talent.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">For Agencies</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/discover" className="hover:text-white">Find Talent</Link></li>
                <li><Link to="/post-project" className="hover:text-white">Post a Project</Link></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">For Creators</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/register" className="hover:text-white">Join as Talent</Link></li>
                <li><Link to="/discover" className="hover:text-white">Browse Projects</Link></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} VideoHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
