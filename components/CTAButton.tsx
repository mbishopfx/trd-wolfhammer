'use client';

import React from 'react';

interface CTAButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all transform hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-emergency text-white hover:bg-emergency-dark',
    secondary: 'bg-trust text-white hover:bg-trust-dark',
    outline: 'border-2 border-emergency text-emergency hover:bg-emergency hover:text-white',
    white: 'bg-white text-black border-2 border-gray-200 hover:bg-gray-50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <a href={href} className={classes}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </a>
  );
};

