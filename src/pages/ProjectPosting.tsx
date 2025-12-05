import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Plus, X, Upload, Calendar, DollarSign, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input, Textarea, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { projectApi } from '../services/api';

// Validation schema
const projectSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title must be less than 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000, 'Description must be less than 2000 characters'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  aiTools: z.array(z.string()).min(1, 'Select at least one AI tool'),
  complexity: z.enum(['simple', 'moderate', 'complex'], { required_error: 'Please select complexity level' }),
  budgetType: z.enum(['fixed', 'hourly']),
  budgetMin: z.number().min(100, 'Minimum budget is $100'),
  budgetMax: z.number().min(100, 'Maximum budget is $100'),
  timeline: z.string().min(1, 'Please select a timeline'),
  requirements: z.string().optional(),
  deliverables: z.array(z.string()).optional(),
}).refine(data => data.budgetMax >= data.budgetMin, {
  message: 'Maximum budget must be greater than minimum',
  path: ['budgetMax'],
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectPosting: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error: showError } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliverables, setDeliverables] = useState<string[]>(['']);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      skills: [],
      aiTools: [],
      complexity: undefined,
      budgetType: 'fixed',
      budgetMin: 0,
      budgetMax: 0,
      timeline: '',
      requirements: '',
      deliverables: [],
    },
  });

  const formData = watch();

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
    { value: 'simple' as const, label: 'Simple', description: 'Basic AI video generation with minimal customization' },
    { value: 'moderate' as const, label: 'Moderate', description: 'Custom prompts, multiple scenes, basic post-production' },
    { value: 'complex' as const, label: 'Complex', description: 'Advanced techniques, multiple tools, extensive post-production' }
  ];

  const timelineOptions = [
    { value: '1-week', label: '1 week' },
    { value: '2-weeks', label: '2 weeks' },
    { value: '1-month', label: '1 month' },
    { value: '2-months', label: '2 months' },
    { value: '3-months', label: '3+ months' },
  ];

  const steps = [
    { number: 1, title: 'Project Details', fields: ['title', 'category', 'description'] },
    { number: 2, title: 'Requirements', fields: ['skills', 'aiTools', 'complexity'] },
    { number: 3, title: 'Budget & Timeline', fields: ['budgetMin', 'budgetMax', 'timeline'] },
    { number: 4, title: 'Review & Post', fields: [] }
  ];

  const handleSkillToggle = (skill: string) => {
    const current = formData.skills || [];
    const updated = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    setValue('skills', updated, { shouldValidate: true });
  };

  const handleToolToggle = (tool: string) => {
    const current = formData.aiTools || [];
    const updated = current.includes(tool)
      ? current.filter(t => t !== tool)
      : [...current, tool];
    setValue('aiTools', updated, { shouldValidate: true });
  };

  const handleDeliverableAdd = () => {
    setDeliverables([...deliverables, '']);
  };

  const handleDeliverableChange = (index: number, value: string) => {
    const updated = deliverables.map((item, i) => i === index ? value : item);
    setDeliverables(updated);
    setValue('deliverables', updated.filter(d => d.trim() !== ''));
  };

  const handleDeliverableRemove = (index: number) => {
    const updated = deliverables.filter((_, i) => i !== index);
    setDeliverables(updated);
    setValue('deliverables', updated.filter(d => d.trim() !== ''));
  };

  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate = steps[step - 1].fields as (keyof ProjectFormData)[];
    if (fieldsToValidate.length === 0) return true;
    const result = await trigger(fieldsToValidate);
    return result;
  };

  const handleNextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(Math.min(steps.length, currentStep + 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const result = await projectApi.create({
        title: data.title,
        description: data.description,
        category: data.category,
        budget: `$${data.budgetMin.toLocaleString()} - $${data.budgetMax.toLocaleString()}`,
        timeline: timelineOptions.find(t => t.value === data.timeline)?.label || data.timeline,
        requiredSkills: data.skills,
        requiredTools: data.aiTools,
        complexity: data.complexity,
      });

      if (result.success) {
        success('Project Posted!', 'Your project is now live and visible to creators.');
        navigate('/dashboard');
      } else {
        showError('Failed to post project', result.error || 'Please try again.');
      }
    } catch (err) {
      showError('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Badge variant="primary">Step {currentStep} of {steps.length}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep > step.number
                      ? 'bg-green-600 border-green-600 text-white'
                      : currentStep === step.number
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card padding="lg">
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>

                <Input
                  label="Project Title *"
                  placeholder="e.g., AI Brand Commercial for Tech Startup"
                  error={errors.title?.message}
                  {...register('title')}
                />

                <Select
                  label="Project Category *"
                  placeholder="Select a category"
                  options={categories.map(c => ({ value: c, label: c }))}
                  error={errors.category?.message}
                  {...register('category')}
                />

                <Textarea
                  label="Project Description *"
                  placeholder="Describe your project vision, goals, and any specific requirements..."
                  rows={6}
                  error={errors.description?.message}
                  helperText={`${formData.description?.length || 0}/2000 characters (minimum 50)`}
                  {...register('description')}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deliverables
                  </label>
                  <div className="space-y-3">
                    {deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={deliverable}
                          onChange={(e) => handleDeliverableChange(index, e.target.value)}
                          placeholder="e.g., 60-second commercial video"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {deliverables.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeliverableRemove(index)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
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
                <h2 className="text-xl font-semibold text-gray-900">Project Requirements</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Required Skills *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                          formData.skills?.includes(skill)
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="mt-2 text-sm text-red-600">{errors.skills.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred AI Tools *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {aiToolOptions.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => handleToolToggle(tool)}
                        className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                          formData.aiTools?.includes(tool)
                            ? 'bg-purple-50 border-purple-500 text-purple-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                  {errors.aiTools && (
                    <p className="mt-2 text-sm text-red-600">{errors.aiTools.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Project Complexity *
                  </label>
                  <div className="space-y-3">
                    {complexityLevels.map((level) => (
                      <div
                        key={level.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.complexity === level.value
                            ? 'bg-blue-50 border-blue-500'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setValue('complexity', level.value, { shouldValidate: true })}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.complexity === level.value}
                            readOnly
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
                  {errors.complexity && (
                    <p className="mt-2 text-sm text-red-600">{errors.complexity.message}</p>
                  )}
                </div>

                <Textarea
                  label="Additional Requirements"
                  placeholder="Any specific technical requirements, style preferences, or constraints..."
                  rows={4}
                  {...register('requirements')}
                />
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Budget & Timeline</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Budget Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {(['fixed', 'hourly'] as const).map((type) => (
                      <div
                        key={type}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.budgetType === type
                            ? 'bg-blue-50 border-blue-500'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setValue('budgetType', type)}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.budgetType === type}
                            readOnly
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">
                              {type === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {type === 'fixed' ? 'One-time payment for the entire project' : 'Pay based on hours worked'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Budget ($) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder={formData.budgetType === 'fixed' ? '5000' : '75'}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        {...register('budgetMin', { valueAsNumber: true })}
                      />
                    </div>
                    {errors.budgetMin && (
                      <p className="mt-1 text-sm text-red-600">{errors.budgetMin.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Budget ($) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder={formData.budgetType === 'fixed' ? '10000' : '120'}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        {...register('budgetMax', { valueAsNumber: true })}
                      />
                    </div>
                    {errors.budgetMax && (
                      <p className="mt-1 text-sm text-red-600">{errors.budgetMax.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Timeline *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <select
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      {...register('timeline')}
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.timeline && (
                    <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Files & References
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
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
                <h2 className="text-xl font-semibold text-gray-900">Review Your Project</h2>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{formData.title || 'Untitled Project'}</h3>
                    <p className="text-sm text-gray-600">{formData.category || 'No category selected'}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{formData.description || 'No description provided'}</p>
                  </div>

                  {formData.skills && formData.skills.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <Badge key={skill} variant="primary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.aiTools && formData.aiTools.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">AI Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.aiTools.map((tool) => (
                          <Badge key={tool} variant="secondary">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Budget</h4>
                      <p className="text-lg font-semibold text-gray-900">
                        ${formData.budgetMin?.toLocaleString() || 0} - ${formData.budgetMax?.toLocaleString() || 0}
                      </p>
                      <p className="text-sm text-gray-500">{formData.budgetType === 'fixed' ? 'Fixed Price' : 'Hourly'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
                      <p className="text-lg font-semibold text-gray-900">
                        {timelineOptions.find(t => t.value === formData.timeline)?.label || '-'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Complexity</h4>
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {formData.complexity || '-'}
                      </p>
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
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button type="button" onClick={handleNextStep}>
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Post Project
                </Button>
              )}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ProjectPosting;
