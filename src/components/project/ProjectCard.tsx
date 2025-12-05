import React from 'react';
import { DollarSign, Clock, Users, Briefcase, Star, Bookmark } from 'lucide-react';
import { Project } from '../../types';
import { Card } from '../common/Card';
import { Badge, StatusBadge, ComplexityBadge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectCardProps {
  project: Project;
  onSubmitProposal?: (id: string) => void;
  onSave?: (id: string) => void;
  saved?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSubmitProposal,
  onSave,
  saved = false,
}) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
            <ComplexityBadge complexity={project.complexity} />
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 font-medium">Required Skills:</span>
            {project.requiredSkills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="primary" size="sm">
                {skill}
              </Badge>
            ))}
            {project.requiredSkills.length > 4 && (
              <span className="text-blue-600 text-xs">
                +{project.requiredSkills.length - 4}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 font-medium">AI Tools:</span>
            {project.requiredTools.map((tool) => (
              <Badge key={tool} variant="secondary" size="sm">
                {tool}
              </Badge>
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
              Posted {new Date(project.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 ml-6">
          <Button onClick={() => onSubmitProposal?.(project.id)}>
            Submit Proposal
          </Button>
          <Button
            variant="outline"
            icon={<Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />}
            onClick={() => onSave?.(project.id)}
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
