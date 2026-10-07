'use client';

import React, { useState, useMemo } from 'react';
import { Finding, FindingCategory } from '@/types';
import { FindingCard } from './FindingCard';
import { FindingFilterBar } from './FindingFilterBar';
import { SearchInput } from '@/components/ui/Input';

export interface FindingListProps {
  findings: Finding[];
  selectedFinding: Finding;
  onSelectFinding: (finding: Finding) => void;
  className?: string;
}

export function FindingList({
  findings,
  selectedFinding,
  onSelectFinding,
  className = '',
}: FindingListProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FindingCategory | 'all'>('all');

  const counts = useMemo(() => {
    const c: Record<FindingCategory | 'all', number> = {
      all: findings.length,
      synthetic: 0,
      manipulation: 0,
      anomaly: 0,
      integrity: 0,
    };
    findings.forEach((f) => {
      c[f.category] = (c[f.category] || 0) + 1;
    });
    return c;
  }, [findings]);

  const filteredFindings = useMemo(() => {
    return findings.filter((f) => {
      const matchesCategory =
        activeCategory === 'all' || f.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        f.id.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.affectedColumns.some((col) => col.toLowerCase().includes(q)) ||
        f.observation.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [findings, activeCategory, search]);

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      {/* Top Filter and Search Bar */}
      <div className="p-3 border-b border-border-subtle bg-canvas-subtle/50 space-y-2.5 shrink-0">
        <SearchInput
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
          placeholder="Filter findings (e.g. E-014, copula)..."
        />
        <FindingFilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={counts}
        />
      </div>

      {/* Findings List Items */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {filteredFindings.length === 0 ? (
          <div className="p-6 text-center text-xs text-text-muted">
            No findings match your current filter.
          </div>
        ) : (
          filteredFindings.map((finding) => (
            <FindingCard
              key={finding.id}
              finding={finding}
              isSelected={selectedFinding.id === finding.id}
              onSelect={onSelectFinding}
            />
          ))
        )}
      </div>

      {/* Bottom status bar */}
      <div className="px-3 py-2 border-t border-border-subtle bg-canvas-subtle/40 text-[10px] text-text-muted font-mono flex items-center justify-between shrink-0">
        <span>Showing {filteredFindings.length} of {findings.length} findings</span>
        <span>Keyboard: Enter to select</span>
      </div>
    </div>
  );
}
