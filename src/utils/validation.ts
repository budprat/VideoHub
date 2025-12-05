import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  userType: z.enum(['agency', 'talent'], {
    required_error: 'Please select your account type',
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Project posting validation schemas
export const projectStep1Schema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  deliverables: z.array(z.string().min(1)).min(1, 'Add at least one deliverable'),
});

export type ProjectStep1Data = z.infer<typeof projectStep1Schema>;

export const projectStep2Schema = z.object({
  requiredSkills: z.array(z.string()).min(1, 'Select at least one skill'),
  requiredTools: z.array(z.string()).min(1, 'Select at least one AI tool'),
  complexity: z.enum(['simple', 'moderate', 'complex'], {
    required_error: 'Please select complexity level',
  }),
  additionalRequirements: z.string().optional(),
});

export type ProjectStep2Data = z.infer<typeof projectStep2Schema>;

export const projectStep3Schema = z.object({
  budgetType: z.enum(['fixed', 'hourly'], {
    required_error: 'Please select a budget type',
  }),
  budgetMin: z.number().min(100, 'Minimum budget is $100'),
  budgetMax: z.number().min(100, 'Maximum budget is $100'),
  timeline: z.string().min(1, 'Please select a timeline'),
}).refine(data => data.budgetMax >= data.budgetMin, {
  message: 'Maximum budget must be greater than minimum',
  path: ['budgetMax'],
});

export type ProjectStep3Data = z.infer<typeof projectStep3Schema>;

export const projectFullSchema = projectStep1Schema
  .merge(projectStep2Schema)
  .merge(projectStep3Schema);

export type ProjectFormData = z.infer<typeof projectFullSchema>;

// Proposal validation schema
export const proposalSchema = z.object({
  coverLetter: z.string()
    .min(100, 'Cover letter must be at least 100 characters')
    .max(2000, 'Cover letter must be less than 2000 characters'),
  proposedBudget: z.string().min(1, 'Please enter your proposed budget'),
  proposedTimeline: z.string().min(1, 'Please select a timeline'),
  attachments: z.array(z.string()).optional(),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;

// Profile update schema
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  bio: z.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must be less than 500 characters'),
  location: z.string().min(2, 'Please enter your location'),
  hourlyRate: z.string().optional(),
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
  aiTools: z.array(z.string()).min(1, 'Add at least one AI tool'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Message schema
export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type MessageFormData = z.infer<typeof messageSchema>;
