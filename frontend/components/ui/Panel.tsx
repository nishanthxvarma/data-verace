import React from 'react';

export interface PanelProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Panel({
  title,
  subtitle,
  actions,
  children,
  footer,
  className = '',
  bodyClassName = '',
}: PanelProps) {
  return (
    <div
      className={`flex flex-col bg-canvas-panel border border-border-subtle rounded-md overflow-hidden ${className}`}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-canvas-subtle/50 select-none">
          <div className="flex flex-col">
            {title && (
              <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                {title}
              </h2>
            )}
            {subtitle && (
              <span className="text-[11px] text-text-muted mt-0.5">{subtitle}</span>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={`flex-1 overflow-auto ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className="px-4 py-2.5 border-t border-border-subtle bg-canvas-subtle/40 text-xs text-text-secondary">
          {footer}
        </div>
      )}
    </div>
  );
}
