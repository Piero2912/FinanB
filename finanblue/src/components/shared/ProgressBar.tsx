import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant,
  size = 'md',
  showLabel = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Auto-determine variant based on percentage
  const autoVariant =
    percentage >= 90 ? 'danger' : percentage >= 75 ? 'warning' : 'success';
  const finalVariant = variant || autoVariant;

  const variantClasses = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div>
      <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full ${variantClasses[finalVariant]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-neutral-600 mt-1">
          {percentage.toFixed(0)}%
        </p>
      )}
    </div>
  );
};
