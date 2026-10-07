import React from 'react';
import { HealthStatus } from '@/types';

export interface StatusBadgeProps {
  label: string;
  status: HealthStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({
  label,
  status,
  size = 'md',
  className = '',
}: StatusBadgeProps) {
  const statusConfig: Record<
    HealthStatus,
    { dot: string; text: string; bg: string; border: string; label: string }
  > = {
    healthy: {
      dot: 'bg-emerald-400',
      text: 'text-emerald-300',
      bg: 'bg-emerald-950/20',
      border: 'border-emerald-800/30',
      label: 'Healthy',
    },
    moderate: {
      dot: 'bg-amber-400',
      text: 'text-amber-300',
      bg: 'bg-amber-950/20',
      border: 'border-amber-800/30',
      label: 'Caution',
    },
    elevated: {
      dot: 'bg-orange-400',
      text: 'text-orange-300',
      bg: 'bg-orange-950/20',
      border: 'border-orange-800/30',
      label: 'Elevated',
    },
    critical: {
      dot: 'bg-rose-400',
      text: 'text-rose-300',
      bg: 'bg-rose-950/20',
      border: 'border-rose-800/30',
      label: 'Critical',
    },
  };

  const current = statusConfig[status];
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5';

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded border font-mono ${sizeClass} ${current.bg} ${current.border} ${className}`}
    >
      <span className="text-text-muted">{label}:</span>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span className={`font-medium ${current.text}`}>{current.label}</span>
    </div>
  );
}
