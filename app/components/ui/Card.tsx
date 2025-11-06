import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  ...props
}) => {
  const baseStyles = 'bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm';
  const hoverStyles = hover ? 'hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 ease-out' : '';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseStyles} ${paddings[padding]} ${hoverStyles} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
