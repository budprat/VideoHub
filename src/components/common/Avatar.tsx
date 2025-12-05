import React from 'react';
import { User } from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  status?: 'available' | 'busy' | 'unavailable' | 'offline';
  className?: string;
  fallback?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; status: string; icon: string }> = {
  xs: { container: 'w-6 h-6', status: 'w-2 h-2', icon: 'w-3 h-3' },
  sm: { container: 'w-8 h-8', status: 'w-2.5 h-2.5', icon: 'w-4 h-4' },
  md: { container: 'w-12 h-12', status: 'w-3 h-3', icon: 'w-6 h-6' },
  lg: { container: 'w-16 h-16', status: 'w-4 h-4', icon: 'w-8 h-8' },
  xl: { container: 'w-24 h-24', status: 'w-5 h-5', icon: 'w-12 h-12' },
};

const statusColors: Record<string, string> = {
  available: 'bg-green-500',
  busy: 'bg-yellow-500',
  unavailable: 'bg-red-500',
  offline: 'bg-gray-400',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  status,
  className = '',
  fallback,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const styles = sizeStyles[size];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className={`${styles.container} rounded-xl object-cover`}
        />
      ) : fallback ? (
        <div
          className={`${styles.container} rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}
        >
          {getInitials(fallback)}
        </div>
      ) : (
        <div
          className={`${styles.container} rounded-xl bg-gray-100 flex items-center justify-center text-gray-400`}
        >
          <User className={styles.icon} />
        </div>
      )}
      {status && (
        <div
          className={`absolute -bottom-0.5 -right-0.5 ${styles.status} rounded-full border-2 border-white ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

interface AvatarGroupProps {
  avatars: { src?: string; alt?: string; fallback?: string }[];
  max?: number;
  size?: AvatarSize;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'sm',
}) => {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const styles = sizeStyles[size];

  return (
    <div className="flex -space-x-2">
      {visible.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remaining > 0 && (
        <div
          className={`${styles.container} rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium ring-2 ring-white`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;
