import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { mockTalents, filterTalents, sortTalents } from '../data/mockTalents';
import { mockProjects, filterProjects, sortProjects } from '../data/mockProjects';
import { TalentCard } from '../components/talent/TalentCard';
import { ProjectCard } from '../components/project/ProjectCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SkeletonTalentCard, SkeletonProjectCard } from '../components/common/Skeleton';

const TalentDiscovery: React.FC = () => {
  const { userType } = useAuth();
  const { success, info } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  // Talent filters (for agencies)
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [minRating, setMinRating] = useState<number | undefined>();
  const [talentSort, setTalentSort] = useState<'rating' | 'projects' | 'rate-low' | 'rate-high' | 'name'>('rating');

  // Project filters (for talent)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>([]);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('');
  const [projectSort, setProjectSort] = useState<'recent' | 'budget-high' | 'budget-low' | 'timeline' | 'proposals'>('recent');

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [userType, searchQuery, selectedTools, selectedAvailability, minRating, selectedCategories, selectedComplexity, selectedBudgetRange]);

  // Filter and sort talents
  const filteredTalents = useMemo(() => {
    let result = filterTalents(mockTalents, {
      search: searchQuery,
      tools: selectedTools,
      availability: selectedAvailability || undefined,
      minRating,
    });
    return sortTalents(result, talentSort);
  }, [searchQuery, selectedTools, selectedAvailability, minRating, talentSort]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = filterProjects(mockProjects, {
      search: searchQuery,
      categories: selectedCategories,
      complexity: selectedComplexity,
      budgetRange: selectedBudgetRange || undefined,
    });
    return sortProjects(result, projectSort);
  }, [searchQuery, selectedCategories, selectedComplexity, selectedBudgetRange, projectSort]);

  const handleSave = (id: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        info('Removed from saved');
      } else {
        newSet.add(id);
        success('Saved successfully');
      }
      return newSet;
    });
  };

  const handleMessage = () => {
    info('Messaging feature coming soon');
  };

  const handleSubmitProposal = () => {
    info('Proposal submission coming soon');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTools([]);
    setSelectedAvailability('');
    setMinRating(undefined);
    setSelectedCategories([]);
    setSelectedComplexity([]);
    setSelectedBudgetRange('');
  };

  const hasActiveFilters = searchQuery || selectedTools.length > 0 || selectedAvailability || minRating ||
    selectedCategories.length > 0 || selectedComplexity.length > 0 || selectedBudgetRange;

  const aiToolOptions = ['Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'Pika Labs', 'LumaAI', 'Synthesia', 'D-ID'];
  const categoryOptions = ['Commercial & Advertising', 'Product Demos', 'Educational Content', 'Social Media Content', 'Corporate Communications', 'Explainer Videos'];
  const complexityOptions = ['simple', 'moderate', 'complex'];

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
            <Card className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all
                  </button>
                )}
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
                    placeholder={userType === 'agency' ? 'Skills, tools, keywords...' : 'Project type, keywords...'}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {userType === 'agency' ? (
                <>
                  {/* AI Tools Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">AI Tools</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {aiToolOptions.map((tool) => (
                        <label key={tool} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTools.includes(tool)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTools([...selectedTools, tool]);
                              } else {
                                setSelectedTools(selectedTools.filter(t => t !== tool));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
                    <div className="space-y-2">
                      {['available', 'busy'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="availability"
                            checked={selectedAvailability === option}
                            onChange={() => setSelectedAvailability(option)}
                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">{option}</span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="availability"
                          checked={selectedAvailability === ''}
                          onChange={() => setSelectedAvailability('')}
                          className="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Any</span>
                      </label>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{rating}+ stars</span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === undefined}
                          onChange={() => setMinRating(undefined)}
                          className="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Any rating</span>
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categoryOptions.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Complexity Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Complexity</label>
                    <div className="space-y-2">
                      {complexityOptions.map((complexity) => (
                        <label key={complexity} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedComplexity.includes(complexity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedComplexity([...selectedComplexity, complexity]);
                              } else {
                                setSelectedComplexity(selectedComplexity.filter(c => c !== complexity));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">{complexity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
                    <div className="space-y-2">
                      {['$1K-5K', '$5K-10K', '$10K-20K', '$20K+'].map((range) => (
                        <label key={range} className="flex items-center">
                          <input
                            type="radio"
                            name="budget"
                            checked={selectedBudgetRange === range}
                            onChange={() => setSelectedBudgetRange(range)}
                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{range}</span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="budget"
                          checked={selectedBudgetRange === ''}
                          onChange={() => setSelectedBudgetRange('')}
                          className="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Any budget</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {userType === 'agency'
                    ? `${filteredTalents.length} creators found`
                    : `${filteredProjects.length} projects found`
                  }
                </span>
                {hasActiveFilters && (
                  <Badge variant="primary" size="sm">Filtered</Badge>
                )}
              </div>
              <select
                value={userType === 'agency' ? talentSort : projectSort}
                onChange={(e) => {
                  if (userType === 'agency') {
                    setTalentSort(e.target.value as typeof talentSort);
                  } else {
                    setProjectSort(e.target.value as typeof projectSort);
                  }
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {userType === 'agency' ? (
                  <>
                    <option value="rating">Highest Rated</option>
                    <option value="projects">Most Projects</option>
                    <option value="rate-low">Rate: Low to High</option>
                    <option value="rate-high">Rate: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </>
                ) : (
                  <>
                    <option value="recent">Most Recent</option>
                    <option value="budget-high">Highest Budget</option>
                    <option value="budget-low">Lowest Budget</option>
                    <option value="proposals">Fewest Proposals</option>
                  </>
                )}
              </select>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <Badge variant="default" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {selectedTools.map(tool => (
                  <Badge key={tool} variant="primary" className="flex items-center gap-1">
                    {tool}
                    <button onClick={() => setSelectedTools(selectedTools.filter(t => t !== tool))}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedCategories.map(cat => (
                  <Badge key={cat} variant="primary" className="flex items-center gap-1">
                    {cat}
                    <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-6">
              {isLoading ? (
                // Skeleton loading
                Array.from({ length: 3 }).map((_, i) => (
                  userType === 'agency' ? <SkeletonTalentCard key={i} /> : <SkeletonProjectCard key={i} />
                ))
              ) : userType === 'agency' ? (
                // Show talents for agencies
                filteredTalents.length > 0 ? (
                  filteredTalents.map((talent) => (
                    <TalentCard
                      key={talent.id}
                      talent={talent}
                      onMessage={handleMessage}
                      onSave={handleSave}
                      saved={savedItems.has(talent.id)}
                    />
                  ))
                ) : (
                  <Card className="text-center py-12">
                    <p className="text-gray-500 mb-4">No creators found matching your criteria</p>
                    <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                  </Card>
                )
              ) : (
                // Show projects for talent
                filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSubmitProposal={handleSubmitProposal}
                      onSave={handleSave}
                      saved={savedItems.has(project.id)}
                    />
                  ))
                ) : (
                  <Card className="text-center py-12">
                    <p className="text-gray-500 mb-4">No projects found matching your criteria</p>
                    <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                  </Card>
                )
              )}
            </div>

            {/* Load More */}
            {!isLoading && (userType === 'agency' ? filteredTalents.length > 0 : filteredProjects.length > 0) && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => info('Load more coming soon')}>
                  Load More Results
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDiscovery;
