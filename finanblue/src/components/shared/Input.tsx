import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-900 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</div>}
        <input
          className={`w-full px-3 py-2.5 ${icon ? 'pl-10' : ''} border rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed ${
            error ? 'border-danger' : 'border-neutral-200'
          } ${className || ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-neutral-500 mt-1">{helperText}</p>}
    </div>
  );
};
