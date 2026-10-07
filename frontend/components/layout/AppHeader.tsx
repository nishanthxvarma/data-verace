'use client';

import React from 'react';
import Link from 'next/link';
import { Database, Plus, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DEMO_DATASETS } from '@/data/demoData';

export interface AppHeaderProps {
  currentDatasetId?: string;
  onSelectDataset?: (id: string) => void;
}

export function AppHeader({
  currentDatasetId = 'ds-01',
  onSelectDataset,
}: AppHeaderProps) {
  const currentDataset =
    DEMO_DATASETS.find((d) => d.id === currentDatasetId) || DEMO_DATASETS[0];

  return (
    <header className="h-14 bg-canvas-subtle/80 backdrop-blur-xs border-b border-border-subtle px-4 flex items-center justify-between shrink-0 select-none">
      {/* Current Dataset Context */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          onClick={() => onSelectDataset && onSelectDataset(currentDataset.id)}
          className="flex items-center gap-2 px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-xs cursor-pointer hover:border-border-muted transition-colors"
          title="Active dataset context"
        >
          <Database className="w-3.5 h-3.5 text-accent-primary" />
          <span className="font-mono font-medium text-text-primary">
            {currentDataset.name}
          </span>
          <span className="text-text-muted">|</span>
          <span className="text-[11px] font-mono text-text-secondary">
            {currentDataset.rowCount.toLocaleString()} rows
          </span>
          <span className="hidden sm:inline text-text-muted">•</span>
          <span className="hidden sm:inline text-[11px] text-text-muted font-mono">
            {currentDataset.columnCount} cols
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-canvas-panel text-text-secondary border border-border-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Integrity: Verified
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-canvas-panel text-text-secondary border border-border-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Indicators: 6 Flagged
          </span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2.5">
        <Link href="/workspace">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Activity className="w-3.5 h-3.5 text-accent-primary" />}
          >
            Evidence Workspace
          </Button>
        </Link>
        <Link href="/analyze">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Analyze Dataset
          </Button>
        </Link>
      </div>
    </header>
  );
}
