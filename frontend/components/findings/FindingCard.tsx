import React from 'react';
import { Finding } from '@/types';
import { Badge } from '@/components/ui/Badge';

export interface FindingCardProps {
  finding: Finding;
  isSelected: boolean;
  onSelect: (finding: Finding) => void;
}

export function FindingCard({
  finding,
  isSelected,
  onSelect,
}: FindingCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(finding)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(finding);
        }
      }}
      className={`p-3 rounded border text-left transition-all cursor-pointer select-none group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary ${
        isSelected
          ? 'bg-canvas-elevated border-accent-primary/50 shadow-sm border-l-2 border-l-accent-primary'
          : 'bg-canvas-panel border-border-subtle hover:bg-canvas-card hover:border-border-muted'
      }`}
    >
      {/* Top Meta Line: ID, Category Badge, Severity Badge */}
      <div className="flex items-center justify-between gap-1.5 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-mono text-xs font-semibold text-text-primary">
            {finding.id}
          </span>
          <Badge category={finding.category} size="sm">
            {finding.category}
          </Badge>
        </div>
        <Badge severity={finding.severity} size="sm">
          {finding.severity}
        </Badge>
      </div>

      {/* Finding Title */}
      <h4
        className={`text-xs font-medium leading-snug line-clamp-2 transition-colors ${
          isSelected
            ? 'text-text-primary font-semibold'
            : 'text-text-secondary group-hover:text-text-primary'
        }`}
      >
        {finding.title}
      </h4>

      {/* Footer Metrics */}
      <div className="mt-2.5 pt-2 border-t border-border-subtle/80 flex items-center justify-between text-[11px] text-text-muted font-mono">
        <div className="flex items-center gap-1 truncate max-w-[160px]">
          <span>Cols:</span>
          <span className="text-text-secondary truncate">
            {finding.affectedColumns.join(', ')}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span>Conf:</span>
          <span className="text-text-primary font-semibold">
            {finding.confidence.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
