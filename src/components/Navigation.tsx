import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Video, User, Briefcase, Search, Plus, Bell, Settings } from 'lucide-react';
import { UserType } from '../types';

interface NavigationProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  userType, 
  setUserType, 
  isAuthenticated, 
  setIsAuthenticated 
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">AI Video Hub</span>
              <span className="text-sm text-gray-500 ml-2">Professional Talent Marketplace</span>
            </div>
          </Link>

          {/* Main Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              {userType === 'agency' ? (
                <>
                  <Link 
                    to="/discover" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/discover') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    <span>Discover Talent</span>
                  </Link>
                  <Link 
                    to="/post-project" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/post-project') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Post Project</span>
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Projects</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/discover" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/discover') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    <span>Browse Projects</span>
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>My Work</span>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                {/* User Type Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUserType('agency')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      userType === 'agency' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Agency
                  </button>
                  <button
                    onClick={() => setUserType('talent')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      userType === 'talent' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Talent
                  </button>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Menu */}
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <button className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsAuthenticated(true)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsAuthenticated(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;