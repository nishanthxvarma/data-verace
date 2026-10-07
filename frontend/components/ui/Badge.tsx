import React from 'react';
import { FindingCategory, FindingSeverity } from '@/types';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'category' | 'severity' | 'outline';
  category?: FindingCategory;
  severity?: FindingSeverity;
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  category,
  severity,
  size = 'md',
  className = '',
}: BadgeProps) {
  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 leading-none font-mono',
    md: 'text-xs px-2 py-0.5 leading-tight font-medium',
  };

  let colorStyles = 'bg-canvas-hover text-text-secondary border border-border-subtle';

  if (category) {
    switch (category) {
      case 'synthetic':
        colorStyles = 'bg-sky-950/40 text-sky-400 border border-sky-800/40';
        break;
      case 'manipulation':
        colorStyles = 'bg-purple-950/40 text-purple-400 border border-purple-800/40';
        break;
      case 'anomaly':
        colorStyles = 'bg-amber-950/40 text-amber-400 border border-amber-800/40';
        break;
      case 'integrity':
        colorStyles = 'bg-rose-950/40 text-rose-400 border border-rose-800/40';
        break;
    }
  } else if (severity) {
    switch (severity) {
      case 'low':
        colorStyles = 'bg-slate-900 text-slate-300 border border-slate-700/50';
        break;
      case 'moderate':
        colorStyles = 'bg-amber-950/30 text-amber-300 border border-amber-800/50';
        break;
      case 'elevated':
        colorStyles = 'bg-orange-950/30 text-orange-300 border border-orange-800/50';
        break;
      case 'high':
        colorStyles = 'bg-rose-950/40 text-rose-300 border border-rose-800/60 font-semibold';
        break;
    }
  } else if (variant === 'outline') {
    colorStyles = 'bg-transparent text-text-muted border border-border-subtle';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm uppercase tracking-wider ${sizeStyles[size]} ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
}
