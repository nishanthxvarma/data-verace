import React from 'react';
import { FindingCategory } from '@/types';

export interface FindingFilterBarProps {
  activeCategory: FindingCategory | 'all';
  onSelectCategory: (cat: FindingCategory | 'all') => void;
  counts: Record<FindingCategory | 'all', number>;
}

export function FindingFilterBar({
  activeCategory,
  onSelectCategory,
  counts,
}: FindingFilterBarProps) {
  const categories: Array<{ id: FindingCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'synthetic', label: 'Synthetic' },
    { id: 'manipulation', label: 'Manip.' },
    { id: 'anomaly', label: 'Anomaly' },
    { id: 'integrity', label: 'Integrity' },
  ];

  return (
    <div
      role="group"
      aria-label="Filter findings by category"
      className="flex items-center gap-1 overflow-x-auto pb-1"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-colors shrink-0 flex items-center gap-1 cursor-pointer border ${
              isActive
                ? 'bg-canvas-elevated text-text-primary border-border-muted font-medium'
                : 'bg-transparent text-text-muted border-transparent hover:text-text-secondary hover:bg-canvas-card'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1 rounded ${
                isActive ? 'bg-accent-primary/20 text-accent-primary' : 'bg-canvas-card'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
