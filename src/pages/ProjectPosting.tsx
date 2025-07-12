import React, { useState } from 'react';
import { ArrowLeft, Plus, X, Upload, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectPosting: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [] as string[],
    aiTools: [] as string[],
    budget: '',
    budgetType: 'fixed',
    timeline: '',
    complexity: '',
    deliverables: [] as string[],
    requirements: '',
    attachments: [] as File[]
  });

  const categories = [
    'Commercial & Advertising',
    'Brand Content',
    'Educational Content',
    'Product Demos',
    'Social Media Content',
    'Explainer Videos',
    'Corporate Communications',
    'Entertainment'
  ];

  const skillOptions = [
    'Creative Direction', 'Motion Graphics', 'Storytelling', 'Animation',
    'Video Editing', 'Visual Effects', 'Brand Strategy', 'Content Strategy'
  ];

  const aiToolOptions = [
    'Runway ML', 'Midjourney Video', 'Stable Video Diffusion', 'Pika Labs',
    'LumaAI', 'Synthesia', 'D-ID', 'Pictory', 'Luma Dream Machine'
  ];

  const complexityLevels = [
    { value: 'simple', label: 'Simple', description: 'Basic AI video generation with minimal customization' },
    { value: 'moderate', label: 'Moderate', description: 'Custom prompts, multiple scenes, basic post-production' },
    { value: 'complex', label: 'Complex', description: 'Advanced techniques, multiple tools, extensive post-production' }
  ];

  const handleSkillToggle = (skill: string) => {
    setProjectData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleToolToggle = (tool: string) => {
    setProjectData(prev => ({
      ...prev,
      aiTools: prev.aiTools.includes(tool)
        ? prev.aiTools.filter(t => t !== tool)
        : [...prev.aiTools, tool]
    }));
  };

  const handleDeliverableAdd = () => {
    setProjectData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, '']
    }));
  };

  const handleDeliverableChange = (index: number, value: string) => {
    setProjectData(prev => ({
      ...prev,
      deliverables: prev.deliverables.map((item, i) => i === index ? value : item)
    }));
  };

  const handleDeliverableRemove = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  const steps = [
    { number: 1, title: 'Project Details', description: 'Basic information about your project' },
    { number: 2, title: 'Requirements', description: 'Skills, tools, and complexity level' },
    { number: 3, title: 'Budget & Timeline', description: 'Project scope and timeline' },
    { number: 4, title: 'Review & Post', description: 'Review and publish your project' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Post a Project</h1>
                <p className="text-gray-600">Find the perfect AI video creator for your project</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 text-sm">
                  <div className={`font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-8 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., AI Brand Commercial for Tech Startup"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Category *
                </label>
                <select
                  value={projectData.category}
                  onChange={(e) => setProjectData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project vision, goals, and any specific requirements..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deliverables
                </label>
                <div className="space-y-3">
                  {projectData.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={deliverable}
                        onChange={(e) => handleDeliverableChange(index, e.target.value)}
                        placeholder="e.g., 60-second commercial video"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => handleDeliverableRemove(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleDeliverableAdd}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add deliverable</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Requirements</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Required Skills
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                        projectData.skills.includes(skill)
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred AI Tools
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {aiToolOptions.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => handleToolToggle(tool)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                        projectData.aiTools.includes(tool)
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Project Complexity
                </label>
                <div className="space-y-3">
                  {complexityLevels.map((level) => (
                    <div
                      key={level.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        projectData.complexity === level.value
                          ? 'bg-blue-50 border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setProjectData(prev => ({ ...prev, complexity: level.value }))}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={projectData.complexity === level.value}
                          onChange={() => {}}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{level.label}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  value={projectData.requirements}
                  onChange={(e) => setProjectData(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Any specific technical requirements, style preferences, or constraints..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget & Timeline */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget & Timeline</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Budget Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      projectData.budgetType === 'fixed'
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setProjectData(prev => ({ ...prev, budgetType: 'fixed' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={projectData.budgetType === 'fixed'}
                        onChange={() => {}}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Fixed Price</div>
                        <div className="text-sm text-gray-600">One-time payment for the entire project</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      projectData.budgetType === 'hourly'
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setProjectData(prev => ({ ...prev, budgetType: 'hourly' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={projectData.budgetType === 'hourly'}
                        onChange={() => {}}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Hourly Rate</div>
                        <div className="text-sm text-gray-600">Pay based on hours worked</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {projectData.budgetType === 'fixed' ? 'Project Budget' : 'Hourly Budget Range'}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={projectData.budget}
                    onChange={(e) => setProjectData(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder={projectData.budgetType === 'fixed' ? '5,000 - 10,000' : '75 - 120'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Timeline
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={projectData.timeline}
                    onChange={(e) => setProjectData(prev => ({ ...prev, timeline: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-week">1 week</option>
                    <option value="2-weeks">2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="2-months">2 months</option>
                    <option value="3-months">3+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Files & References
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                      Click to upload
                    </span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Brand guidelines, reference videos, assets (Max 50MB each)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Post */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Project</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">{projectData.title}</h3>
                  <p className="text-sm text-gray-600">{projectData.category}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{projectData.description}</p>
                </div>

                {projectData.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {projectData.skills.map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {projectData.aiTools.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {projectData.aiTools.map((tool) => (
                        <span key={tool} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Budget</h4>
                    <p className="text-gray-700">${projectData.budget} ({projectData.budgetType})</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Timeline</h4>
                    <p className="text-gray-700">{projectData.timeline}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Ready to post?</strong> Your project will be visible to verified AI video creators immediately. 
                  You'll start receiving proposals within hours.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                Post Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPosting;