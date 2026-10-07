import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-2.5 py-1.5 rounded gap-1.5 h-7',
      md: 'text-xs px-3.5 py-2 rounded gap-2 h-9',
      lg: 'text-sm px-4 py-2.5 rounded-md gap-2.5 h-10',
    };

    const variantStyles = {
      primary:
        'bg-accent-primary text-canvas-base hover:bg-accent-hover font-semibold shadow-sm active:translate-y-px',
      secondary:
        'bg-canvas-card text-text-primary border border-border-subtle hover:bg-canvas-hover hover:border-border-muted',
      outline:
        'bg-transparent text-text-primary border border-border-subtle hover:bg-canvas-panel hover:border-border-muted',
      ghost:
        'bg-transparent text-text-secondary hover:text-text-primary hover:bg-canvas-hover',
      danger:
        'bg-semantic-critical/10 text-semantic-critical border border-semantic-critical/30 hover:bg-semantic-critical/20',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
