import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center rounded-full font-medium transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm',
    primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 shadow-sm',
    warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 shadow-sm',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 shadow-sm',
    secondary: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm'
  };
  
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};
