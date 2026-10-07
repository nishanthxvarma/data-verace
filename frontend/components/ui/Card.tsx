import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'elevated' | 'subtle';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'base',
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const variantStyles = {
    base: 'bg-canvas-panel border border-border-subtle',
    elevated: 'bg-canvas-elevated border border-border-muted shadow-sm',
    subtle: 'bg-canvas-subtle border border-border-subtle/80',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverStyles = hoverable
    ? 'hover:border-border-muted hover:bg-canvas-hover transition-colors cursor-pointer'
    : '';

  return (
    <div
      className={`rounded-md ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
