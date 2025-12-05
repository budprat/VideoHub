import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Video, Mail, Lock, Eye, EyeOff, User, Building2, Palette } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../utils/validation';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: undefined,
      agreeToTerms: false,
    },
  });

  const selectedUserType = watch('userType');

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        userType: data.userType,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setAuthError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Video className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">VideoHub</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Join the AI video creator marketplace
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {authError && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {authError}
              </div>
            )}

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    selectedUserType === 'agency'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    value="agency"
                    className="sr-only"
                    {...register('userType')}
                  />
                  <Building2 className={`h-8 w-8 mb-2 ${
                    selectedUserType === 'agency' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    selectedUserType === 'agency' ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    Hire Talent
                  </span>
                  <span className="text-xs text-gray-500 mt-1">For agencies & brands</span>
                </label>
                <label
                  className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    selectedUserType === 'talent'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    value="talent"
                    className="sr-only"
                    {...register('userType')}
                  />
                  <Palette className={`h-8 w-8 mb-2 ${
                    selectedUserType === 'talent' ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    selectedUserType === 'talent' ? 'text-purple-900' : 'text-gray-700'
                  }`}>
                    Find Work
                  </span>
                  <span className="text-xs text-gray-500 mt-1">For creators</span>
                </label>
              </div>
              {errors.userType && (
                <p className="mt-2 text-sm text-red-600">{errors.userType.message}</p>
              )}
            </div>

            <div>
              <Input
                label="Full name"
                type="text"
                placeholder="John Doe"
                icon={<User className="h-5 w-5" />}
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <div>
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  icon={<Lock className="h-5 w-5" />}
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <div className="relative">
                <Input
                  label="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  icon={<Lock className="h-5 w-5" />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  {...register('agreeToTerms')}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
            >
              Create account
            </Button>
          </form>
        </div>

        {/* Sign in link */}
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
