import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  size = 'md',
  className = '',
}: TabsProps) {
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-xs py-2 px-3.5',
  };

  return (
    <div
      role="tablist"
      className={`flex items-center gap-1 border-b border-border-subtle overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-2 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              sizeStyles[size]
            } ${
              isActive
                ? 'border-accent-primary text-text-primary bg-canvas-panel/60'
                : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border-muted'
            }`}
          >
            {tab.icon && <span className="opacity-80">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'bg-canvas-card text-text-muted'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
