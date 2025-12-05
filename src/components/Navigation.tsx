import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, Briefcase, Search, Plus, Bell, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './common/Avatar';
import { Button } from './common/Button';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userType, setUserType, user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">VideoHub</span>
              <span className="text-sm text-gray-500 ml-2 hidden lg:inline">AI Video Talent Marketplace</span>
            </div>
          </Link>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              userType === 'agency' ? (
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
              )
            ) : (
              <>
                <Link
                  to="/discover"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/discover') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Browse Talent
                </Link>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* User Type Toggle */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
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
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2"
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      fallback={user?.name}
                      size="sm"
                    />
                  </button>

                  {showProfileMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowProfileMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <Briefcase className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-50 w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && isAuthenticated && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {userType === 'agency' ? (
                <>
                  <Link
                    to="/discover"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Search className="h-4 w-4" />
                    <span>Discover Talent</span>
                  </Link>
                  <Link
                    to="/post-project"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Post Project</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/discover"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Search className="h-4 w-4" />
                  <span>Browse Projects</span>
                </Link>
              )}
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                <Briefcase className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              {/* Mobile User Type Toggle */}
              <div className="flex items-center space-x-2 px-3 py-2">
                <span className="text-sm text-gray-600">View as:</span>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUserType('agency')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      userType === 'agency'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Agency
                  </button>
                  <button
                    onClick={() => setUserType('talent')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      userType === 'talent'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Talent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
