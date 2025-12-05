import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
  outline?: boolean;
}

const variantStyles: Record<BadgeVariant, { solid: string; outline: string }> = {
  default: {
    solid: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 bg-white',
  },
  primary: {
    solid: 'bg-blue-100 text-blue-800',
    outline: 'border border-blue-300 text-blue-700 bg-blue-50',
  },
  secondary: {
    solid: 'bg-purple-100 text-purple-800',
    outline: 'border border-purple-300 text-purple-700 bg-purple-50',
  },
  success: {
    solid: 'bg-green-100 text-green-800',
    outline: 'border border-green-300 text-green-700 bg-green-50',
  },
  warning: {
    solid: 'bg-yellow-100 text-yellow-800',
    outline: 'border border-yellow-300 text-yellow-700 bg-yellow-50',
  },
  danger: {
    solid: 'bg-red-100 text-red-800',
    outline: 'border border-red-300 text-red-700 bg-red-50',
  },
  info: {
    solid: 'bg-cyan-100 text-cyan-800',
    outline: 'border border-cyan-300 text-cyan-700 bg-cyan-50',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-gray-500',
  primary: 'bg-blue-500',
  secondary: 'bg-purple-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-cyan-500',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  dot = false,
  outline = false,
}) => {
  const style = outline ? variantStyles[variant].outline : variantStyles[variant].solid;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${style} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};

// Preset badges for common use cases
export const StatusBadge: React.FC<{ status: 'open' | 'in-progress' | 'completed' | 'draft' }> = ({ status }) => {
  const config: Record<string, { variant: BadgeVariant; label: string }> = {
    open: { variant: 'success', label: 'Open' },
    'in-progress': { variant: 'primary', label: 'In Progress' },
    completed: { variant: 'default', label: 'Completed' },
    draft: { variant: 'warning', label: 'Draft' },
  };

  const { variant, label } = config[status] || config.draft;
  return <Badge variant={variant} dot>{label}</Badge>;
};

export const AvailabilityBadge: React.FC<{ availability: 'available' | 'busy' | 'unavailable' }> = ({ availability }) => {
  const config: Record<string, { variant: BadgeVariant; label: string }> = {
    available: { variant: 'success', label: 'Available' },
    busy: { variant: 'warning', label: 'Busy' },
    unavailable: { variant: 'danger', label: 'Unavailable' },
  };

  const { variant, label } = config[availability];
  return <Badge variant={variant}>{label}</Badge>;
};

export const ComplexityBadge: React.FC<{ complexity: 'simple' | 'moderate' | 'complex' }> = ({ complexity }) => {
  const config: Record<string, { variant: BadgeVariant; label: string }> = {
    simple: { variant: 'success', label: 'Simple' },
    moderate: { variant: 'warning', label: 'Moderate' },
    complex: { variant: 'danger', label: 'Complex' },
  };

  const { variant, label } = config[complexity];
  return <Badge variant={variant} outline>{label}</Badge>;
};

export default Badge;
