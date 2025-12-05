import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Award, Play, Eye } from 'lucide-react';
import { TalentProfile } from '../../types';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { Badge, AvailabilityBadge } from '../common/Badge';
import { Button } from '../common/Button';

interface TalentCardProps {
  talent: TalentProfile;
  onMessage?: (id: string) => void;
  onSave?: (id: string) => void;
  saved?: boolean;
}

export const TalentCard: React.FC<TalentCardProps> = ({
  talent,
  onMessage,
  onSave,
  saved = false,
}) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-start space-x-4">
        <Avatar
          src={talent.avatar}
          alt={talent.name}
          size="lg"
          status={talent.availability}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <Link
                to={`/talent/${talent.id}`}
                className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
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
              <div className="text-lg font-semibold text-gray-900">
                {talent.hourlyRate}/hr
              </div>
              <div className="mt-2">
                <AvailabilityBadge availability={talent.availability} />
              </div>
            </div>
          </div>

          <p className="text-gray-600 mt-4 line-clamp-2">{talent.bio}</p>

          {/* Skills */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {talent.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
              {talent.skills.length > 4 && (
                <span className="text-gray-500 text-sm">
                  +{talent.skills.length - 4} more
                </span>
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
                  <Badge key={tool} variant="primary" size="sm">
                    {tool}
                  </Badge>
                ))}
                {talent.aiTools.length > 3 && (
                  <span className="text-blue-600 text-xs">
                    +{talent.aiTools.length - 3}
                  </span>
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
              <p className="text-sm text-gray-600 mt-2">
                {talent.portfolio[0].title}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-3 mt-6">
            <Link to={`/talent/${talent.id}`}>
              <Button>View Profile</Button>
            </Link>
            <Button variant="outline" onClick={() => onMessage?.(talent.id)}>
              Message
            </Button>
            <button
              onClick={() => onSave?.(talent.id)}
              className={`p-2 rounded-lg transition-colors ${
                saved
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="h-5 w-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TalentCard;
