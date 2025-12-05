import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animate = true,
}) => {
  const baseStyles = 'bg-gray-200';
  const animationStyles = animate ? 'animate-pulse' : '';

  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'text' ? '1rem' : undefined),
  };

  return (
    <div
      className={`${baseStyles} ${animationStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    />
  );
};

// Preset skeleton components for common use cases
export const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-start space-x-4">
      <Skeleton variant="rectangular" width={64} height={64} />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" height={24} width="60%" />
        <Skeleton variant="text" height={16} width="40%" />
        <div className="flex space-x-2">
          <Skeleton variant="rectangular" height={24} width={80} />
          <Skeleton variant="rectangular" height={24} width={80} />
          <Skeleton variant="rectangular" height={24} width={80} />
        </div>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <Skeleton variant="text" height={16} />
      <Skeleton variant="text" height={16} width="80%" />
    </div>
    <div className="mt-4 flex space-x-3">
      <Skeleton variant="rectangular" height={40} width={120} />
      <Skeleton variant="rectangular" height={40} width={100} />
    </div>
  </div>
);

export const SkeletonTalentCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-start space-x-4">
      <Skeleton variant="rectangular" width={64} height={64} className="rounded-xl" />
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton variant="text" height={24} width={150} />
            <Skeleton variant="text" height={16} width={200} />
            <div className="flex space-x-4">
              <Skeleton variant="text" height={14} width={100} />
              <Skeleton variant="text" height={14} width={120} />
            </div>
          </div>
          <div className="text-right space-y-2">
            <Skeleton variant="text" height={16} width={60} />
            <Skeleton variant="text" height={20} width={80} />
            <Skeleton variant="rectangular" height={24} width={70} />
          </div>
        </div>
        <Skeleton variant="text" height={16} className="mt-4" />
        <Skeleton variant="text" height={16} width="90%" className="mt-1" />
        <div className="flex space-x-2 mt-4">
          <Skeleton variant="rectangular" height={28} width={100} className="rounded-full" />
          <Skeleton variant="rectangular" height={28} width={100} className="rounded-full" />
          <Skeleton variant="rectangular" height={28} width={100} className="rounded-full" />
        </div>
        <Skeleton variant="rectangular" height={128} className="mt-4 rounded-lg" />
        <div className="flex space-x-3 mt-6">
          <Skeleton variant="rectangular" height={40} width={120} />
          <Skeleton variant="rectangular" height={40} width={100} />
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonProjectCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <Skeleton variant="text" height={28} width="60%" />
          <Skeleton variant="rectangular" height={24} width={60} className="rounded-full" />
          <Skeleton variant="rectangular" height={24} width={80} className="rounded-full" />
        </div>
        <Skeleton variant="text" height={16} className="mb-1" />
        <Skeleton variant="text" height={16} width="95%" className="mb-1" />
        <Skeleton variant="text" height={16} width="80%" className="mb-4" />
        <div className="flex space-x-2 mb-4">
          <Skeleton variant="rectangular" height={24} width={90} />
          <Skeleton variant="rectangular" height={24} width={80} />
          <Skeleton variant="rectangular" height={24} width={100} />
        </div>
        <div className="flex space-x-6">
          <Skeleton variant="text" height={14} width={100} />
          <Skeleton variant="text" height={14} width={80} />
          <Skeleton variant="text" height={14} width={100} />
        </div>
      </div>
      <div className="flex flex-col space-y-3 ml-6">
        <Skeleton variant="rectangular" height={40} width={140} />
        <Skeleton variant="rectangular" height={40} width={140} />
      </div>
    </div>
  </div>
);

export const SkeletonDashboardStats: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton variant="text" height={14} width={80} />
            <Skeleton variant="text" height={32} width={60} />
          </div>
          <Skeleton variant="rectangular" width={48} height={48} className="rounded-lg" />
        </div>
        <Skeleton variant="text" height={12} width={100} className="mt-4" />
      </div>
    ))}
  </div>
);

export default Skeleton;
