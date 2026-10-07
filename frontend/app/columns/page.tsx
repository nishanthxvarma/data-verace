'use client';

import React, { useState } from 'react';
import { DEMO_COLUMNS } from '@/data/demoData';
import { ColumnProfile } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Columns,
  Hash,
  Type,
  Calendar,
  Layers,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function ColumnAnalysisPage() {
  const [selectedCol, setSelectedCol] = useState<ColumnProfile>(DEMO_COLUMNS[1]); // Default to 'age'

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'numeric':
        return <Hash className="w-3.5 h-3.5 text-sky-400" />;
      case 'categorical':
        return <Type className="w-3.5 h-3.5 text-purple-400" />;
      case 'datetime':
        return <Calendar className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-text-muted" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Columns className="w-5 h-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Column Analysis
            </h1>
          </div>
          <p className="text-xs text-text-muted">
            Deep-dive feature profiles: univariate distributions, missingness, empirical moments, and cross-feature correlations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/workspace">
            <Button variant="outline" size="sm">
              Open Evidence Workspace
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Column Index (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-text-muted px-1">
            <span>COLUMNS ({DEMO_COLUMNS.length})</span>
            <span>Select to inspect</span>
          </div>

          <div className="space-y-2">
            {DEMO_COLUMNS.map((col) => {
              const isSelected = selectedCol.name === col.name;

              return (
                <div
                  key={col.name}
                  onClick={() => setSelectedCol(col)}
                  className={`p-3 rounded border cursor-pointer select-none transition-all ${
                    isSelected
                      ? 'bg-canvas-elevated border-accent-primary/50 shadow-sm border-l-2 border-l-accent-primary'
                      : 'bg-canvas-panel border-border-subtle hover:bg-canvas-card hover:border-border-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(col.type)}
                      <span className="font-mono text-xs font-semibold text-text-primary">
                        {col.name}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-canvas-card border border-border-subtle text-text-muted">
                      {col.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-text-muted">
                    <div>
                      <span>Missing:</span>{' '}
                      <span className={col.missingPercent > 0 ? 'text-amber-400' : 'text-text-secondary'}>
                        {col.missingPercent}%
                      </span>
                    </div>
                    <div>
                      <span>Unique:</span>{' '}
                      <span className="text-text-secondary">
                        {col.uniqueCount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {col.keySignals && col.keySignals.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border-subtle/60 flex flex-wrap gap-1">
                      {col.keySignals.map((sig, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-canvas-card text-text-muted border border-border-subtle/80"
                        >
                          {sig}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Column Deep-Dive Panel (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="base" className="space-y-5">
            {/* Header info for selected column */}
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-text-primary font-mono">
                    {selectedCol.name}
                  </h2>
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-canvas-card border border-border-subtle text-text-secondary">
                    {selectedCol.type}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-1 font-mono">
                  {selectedCol.uniqueCount.toLocaleString()} distinct values • {selectedCol.missingCount} missing ({selectedCol.missingPercent}%)
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-text-muted block">
                  Dataset Context
                </span>
                <span className="text-xs font-mono text-text-secondary">
                  customer_transactions.csv
                </span>
              </div>
            </div>

            {/* Distribution Visualization */}
            {selectedCol.distributionBins && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="font-semibold text-text-primary uppercase tracking-wider">
                    Marginal Distribution Tiers
                  </span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-slate-500 rounded-xs inline-block" />
                      Observed
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-sky-400 rounded-xs inline-block" />
                      Expected Reference
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded bg-canvas-subtle/60 border border-border-subtle space-y-2 font-mono text-xs">
                  {selectedCol.distributionBins.map((bin) => {
                    const maxVal = 36000;
                    const pct = Math.round((bin.value / maxVal) * 100);
                    const refPct = bin.refValue ? Math.round((bin.refValue / maxVal) * 100) : 0;

                    return (
                      <div key={bin.label} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-text-primary">{bin.label}</span>
                          <span className="text-text-muted">
                            {bin.value.toLocaleString()} records
                          </span>
                        </div>
                        <div className="relative h-2.5 w-full bg-canvas-card rounded border border-border-subtle overflow-hidden">
                          <div
                            className="absolute top-0 bottom-0 bg-slate-500 rounded-xs"
                            style={{ width: `${pct}%` }}
                          />
                          {refPct > 0 && (
                            <div
                              className="absolute top-0 bottom-0 w-1 bg-sky-400 z-10"
                              style={{ left: `${refPct}%` }}
                              title={`Reference expectation: ${bin.refValue?.toLocaleString()}`}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary Statistics */}
            {selectedCol.stats && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono block">
                  Statistical Moments & Quantiles
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-canvas-card border border-border-subtle">
                    <span className="text-text-muted text-[10px] uppercase block">Mean</span>
                    <span className="text-text-primary font-semibold text-sm">
                      {selectedCol.stats.mean?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-border-subtle">
                    <span className="text-text-muted text-[10px] uppercase block">Median</span>
                    <span className="text-text-primary font-semibold text-sm">
                      {selectedCol.stats.median?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-border-subtle">
                    <span className="text-text-muted text-[10px] uppercase block">Std Deviation</span>
                    <span className="text-text-primary font-semibold text-sm">
                      {selectedCol.stats.stdDev?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-border-subtle">
                    <span className="text-text-muted text-[10px] uppercase block">Min / Max</span>
                    <span className="text-text-primary font-semibold text-xs">
                      {selectedCol.stats.min} / {selectedCol.stats.max?.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-border-subtle">
                    <span className="text-text-muted text-[10px] uppercase block">Skewness</span>
                    <span className="text-text-primary font-semibold text-sm">
                      {selectedCol.stats.skewness?.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-border-subtle">
                    <span className="text-text-muted text-[10px] uppercase block">Kurtosis</span>
                    <span className="text-text-primary font-semibold text-sm">
                      {selectedCol.stats.kurtosis?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Pairwise Relationships & Covariance Shifts */}
            {selectedCol.correlations && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono block">
                  Cross-Feature Covariances
                </span>
                <div className="space-y-2 font-mono text-xs">
                  {selectedCol.correlations.map((corr) => {
                    const drift =
                      corr.expectedCoefficient !== undefined
                        ? Math.abs(corr.expectedCoefficient - corr.coefficient)
                        : 0;

                    return (
                      <div
                        key={corr.column}
                        className="p-2.5 rounded bg-canvas-card border border-border-subtle flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-accent-primary" />
                          <span className="font-semibold text-text-primary">
                            {selectedCol.name} × {corr.column}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-text-muted">
                            Observed r = {corr.coefficient.toFixed(2)}
                          </span>
                          {corr.expectedCoefficient && (
                            <span className="text-text-muted">
                              Expected r = {corr.expectedCoefficient.toFixed(2)}
                            </span>
                          )}
                          {drift > 0.2 && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-950/40 text-amber-300 border border-amber-800/40 text-[10px]">
                              Decorrelated (Finding E-014)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sample Values Matrix */}
            <div className="space-y-2 pt-2 border-t border-border-subtle">
              <span className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono block">
                Raw Sample Values (First 7 records)
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {selectedCol.sampleValues.map((v, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-text-secondary"
                  >
                    {String(v)}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
