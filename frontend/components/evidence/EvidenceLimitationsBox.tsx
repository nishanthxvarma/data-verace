import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface EvidenceLimitationsBoxProps {
  limitations: string;
  className?: string;
}

export function EvidenceLimitationsBox({
  limitations,
  className = '',
}: EvidenceLimitationsBoxProps) {
  return (
    <div
      className={`p-3 rounded border border-border-muted bg-canvas-card/60 flex items-start gap-2.5 text-xs ${className}`}
    >
      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300">
          Analytical Boundary & Limitations
        </span>
        <p className="text-text-secondary leading-relaxed text-[11px]">
          {limitations}
        </p>
      </div>
    </div>
  );
}
