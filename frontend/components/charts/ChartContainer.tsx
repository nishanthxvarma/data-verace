import React from 'react';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  explanatoryText?: string;
  legend?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  subtitle,
  explanatoryText,
  legend,
  actions,
  children,
  className = '',
}: ChartContainerProps) {
  return (
    <div
      className={`flex flex-col bg-canvas-panel border border-border-subtle rounded-md overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 border-b border-border-subtle bg-canvas-subtle/40">
        <div>
          <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {legend && <div className="flex items-center gap-3 text-xs">{legend}</div>}
          {actions && <div className="flex items-center gap-1.5">{actions}</div>}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-4 flex-1 flex flex-col justify-center min-h-[300px] overflow-hidden">
        {children}
      </div>

      {/* Concise Explanatory Footer */}
      {explanatoryText && (
        <div className="px-4 py-2 border-t border-border-subtle bg-canvas-subtle/30 text-[11px] text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-muted uppercase tracking-wider text-[10px] mr-1.5">
            Interpretation Note:
          </span>
          {explanatoryText}
        </div>
      )}
    </div>
  );
}
