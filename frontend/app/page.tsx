'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_DATASETS } from '@/data/demoData';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Plus,
  ArrowRight,
  Database,
  FileCode,
  Calendar,
  Layers,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';

export default function DashboardPage() {
  const [datasets] = useState(DEMO_DATASETS);
  const [showEmptyState, setShowEmptyState] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Calm Header Section */}
      <section className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-xs font-mono text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            <span>DATA VERACE PLATFORM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Understand your data. <br />
            <span className="text-text-secondary">Find the evidence behind it.</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Data Verace profiles dataset integrity, multivariate anomalies,
            synthetic generation artifacts, and potential manipulation footprints
            through calibrated statistical observations and rigorous limitations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/analyze">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Analyze Dataset
            </Button>
          </Link>
          <Link href="/workspace">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Layers className="w-4 h-4 text-accent-primary" />}
            >
              Open Evidence Workspace
            </Button>
          </Link>

          {/* Toggle to inspect empty state */}
          <button
            onClick={() => setShowEmptyState(!showEmptyState)}
            className="text-[11px] font-mono text-text-muted hover:text-text-secondary px-2 py-1 rounded border border-dashed border-border-subtle cursor-pointer ml-auto"
            title="Preview zero datasets state"
          >
            {showEmptyState ? 'Show Populated View' : 'Preview Empty State'}
          </button>
        </div>
      </section>

      {/* Main Section: Recent Analyses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary font-mono">
              Recent Analyses
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Inspected datasets and current evidence status
            </p>
          </div>
          <Link
            href="/datasets"
            className="text-xs text-accent-primary hover:text-accent-hover font-mono flex items-center gap-1 transition-colors"
          >
            <span>View All Datasets</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {showEmptyState ? (
          <EmptyState
            title="No datasets analyzed yet"
            description="Upload a CSV, Parquet, or JSON dataset to evaluate copula dependencies, statistical moments, and integrity signals."
            actionLabel="Analyze First Dataset"
            onAction={() => setShowEmptyState(false)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {datasets.map((dataset) => (
              <Card
                key={dataset.id}
                variant="base"
                hoverable
                className="flex flex-col justify-between p-4 group"
              >
                <div className="space-y-3">
                  {/* Card Title & Format */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded bg-canvas-card border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
                        {dataset.format === 'parquet' ? (
                          <FileCode className="w-4 h-4 text-sky-400" />
                        ) : (
                          <Database className="w-4 h-4 text-text-secondary" />
                        )}
                      </div>
                      <div className="truncate">
                        <h3 className="text-xs font-semibold text-text-primary truncate font-mono">
                          {dataset.name}
                        </h3>
                        <span className="text-[11px] text-text-muted font-mono">
                          {dataset.fileSize} • {dataset.format.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dimensions & Date */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2 border-y border-border-subtle/60 text-text-muted">
                    <div>
                      <span className="text-text-secondary">Rows:</span>{' '}
                      <span className="text-text-primary font-medium">
                        {dataset.rowCount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Cols:</span>{' '}
                      <span className="text-text-primary font-medium">
                        {dataset.columnCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2 text-[11px]">
                      <Calendar className="w-3 h-3 text-text-muted" />
                      <span>Analyzed: {dataset.lastAnalyzed}</span>
                    </div>
                  </div>

                  {/* Status Indicators (Semantic only, no fake percentages) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
                      Signal Status
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <StatusBadge
                        label="Integrity"
                        status={dataset.status.integrity}
                        size="sm"
                      />
                      <StatusBadge
                        label="Anomalies"
                        status={dataset.status.anomalies}
                        size="sm"
                      />
                      <StatusBadge
                        label="Synthetic"
                        status={dataset.status.syntheticIndicators}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                  <Link
                    href="/workspace"
                    className="text-xs font-mono text-accent-primary hover:text-accent-hover flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Open Evidence</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/reports"
                    className="text-xs text-text-muted hover:text-text-secondary"
                  >
                    Report
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Analytical Methodology Callout (Analytical context, non-marketing) */}
      <section className="p-4 rounded-md bg-canvas-panel border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-text-primary font-mono uppercase tracking-wider">
              Evidence-First Principles
            </h4>
            <p className="text-xs text-text-muted max-w-2xl leading-relaxed">
              Data Verace avoids binary classification. Every detection outlines the
              exact observation, statistical significance, plausible generative or
              processing causes, and critical analytical limitations.
            </p>
          </div>
        </div>
        <Link href="/docs">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<HelpCircle className="w-3.5 h-3.5 text-text-muted" />}
          >
            Review Methodology
          </Button>
        </Link>
      </section>
    </div>
  );
}
