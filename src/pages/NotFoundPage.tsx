import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardContent } from '../components/common/Card';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full">
        <CardContent className="text-center py-12 px-8">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-200">404</div>
            <div className="text-xl font-semibold text-gray-900 mt-4">Page Not Found</div>
          </div>

          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
            Don't worry, let's get you back on track.
          </p>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <Button className="w-full flex items-center justify-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Go to Homepage</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Or try one of these pages:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/discover" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <Search className="h-4 w-4" />
                <span>Browse Talent</span>
              </Link>
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <HelpCircle className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
