import React from 'react';

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md';
  variant?: 'accent' | 'emerald' | 'amber';
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  sublabel,
  size = 'md',
  variant = 'accent',
  className = '',
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
  };

  const variantStyles = {
    accent: 'bg-accent-primary',
    emerald: 'bg-semantic-healthy',
    amber: 'bg-semantic-moderate',
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {(label || sublabel) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-medium text-text-primary">{label}</span>}
          {sublabel && (
            <span className="font-mono text-text-muted text-[11px]">{sublabel}</span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-canvas-card rounded-full overflow-hidden border border-border-subtle ${sizeStyles[size]}`}
      >
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`h-full rounded-full transition-all duration-300 ${variantStyles[variant]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
