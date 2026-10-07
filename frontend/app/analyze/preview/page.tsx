'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { DEMO_PREVIEW_ROWS, DEMO_COLUMNS } from '@/data/demoData';
import {
  Database,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  Hash,
  Type,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function DatasetPreviewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'preview' | 'columns' | 'missing' | 'types' | 'stats'
  >('preview');
  const [page, setPage] = useState(1);

  const steps = [
    { id: 1, label: 'Upload Dataset', sublabel: 'CSV, Parquet, JSON' },
    { id: 2, label: 'Schema Preview', sublabel: 'Column profiling' },
    { id: 3, label: 'Scope Config', sublabel: 'Select detectors' },
    { id: 4, label: 'Analyze', sublabel: 'Pipeline execution' },
  ];

  const tabs = [
    { id: 'preview', label: 'Preview Table' },
    { id: 'columns', label: 'Column Information' },
    { id: 'missing', label: 'Missing Values' },
    { id: 'types', label: 'Data Types' },
    { id: 'stats', label: 'Numerical Statistics' },
  ];

  const analysisModules = [
    {
      id: 'structural',
      title: 'Structural Analysis',
      desc: 'Schema consistency, encoding validation, key uniqueness constraints',
    },
    {
      id: 'statistical',
      title: 'Statistical Analysis',
      desc: 'Marginal distributions, moments, quantiles, and empirical tails',
    },
    {
      id: 'anomaly',
      title: 'Anomaly Detection',
      desc: 'Isolation scoring, high-density subspace clustering, centroid mode collapse',
    },
    {
      id: 'synthetic',
      title: 'Synthetic-Data Indicators',
      desc: 'Multivariate copula decorrelation, Benford invariants, precision truncation',
    },
    {
      id: 'manipulation',
      title: 'Manipulation Indicators',
      desc: 'Localized density discontinuities, arbitrary boundary cutoffs, post-hoc filtering',
    },
    {
      id: 'temporal',
      title: 'Temporal Drift Analysis',
      desc: 'Diurnal periodicity, timestamp sequencing, sequential variance',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* 4-Step Progress Indicator */}
      <div className="p-4 bg-canvas-panel border border-border-subtle rounded-md">
        <StepIndicator steps={steps} currentStep={2} />
      </div>

      {/* Dataset Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-md bg-canvas-panel border border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-canvas-card border border-border-subtle flex items-center justify-center text-accent-primary">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-text-primary font-mono">
                customer_transactions.csv
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 font-mono">
                Ingested
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5 font-mono">
              82,341 rows • 17 columns • 12.4 MB • Comma-Separated Values (UTF-8)
            </p>
          </div>
        </div>

        {/* Dataset Summary Chips */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-text-secondary flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-sky-400" />
            9 numerical
          </span>
          <span className="px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-text-secondary flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-purple-400" />
            6 categorical
          </span>
          <span className="px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-text-secondary flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            2 datetime
          </span>
        </div>
      </div>

      {/* Tabbed Ingestion Viewer */}
      <Card variant="base" padding="none" className="overflow-hidden">
        <div className="px-4 bg-canvas-subtle/50 border-b border-border-subtle">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(t) =>
              setActiveTab(t as 'preview' | 'columns' | 'missing' | 'types' | 'stats')
            }
            size="md"
          />
        </div>

        {/* Tab 1: Preview Table */}
        {activeTab === 'preview' && (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-canvas-subtle/80 text-text-muted sticky top-0">
                    <th className="p-3 font-semibold">
                      <div className="flex items-center gap-1">
                        <span>#</span>
                        <span className="text-[10px] text-text-muted">ID</span>
                      </div>
                      <span className="text-text-primary block mt-0.5">customer_id</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-sky-400 block font-mono">int64</span>
                      <span className="text-text-primary block mt-0.5">age</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-sky-400 block font-mono">float64</span>
                      <span className="text-text-primary block mt-0.5">income</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-purple-400 block font-mono">string</span>
                      <span className="text-text-primary block mt-0.5">city</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-amber-400 block font-mono">datetime</span>
                      <span className="text-text-primary block mt-0.5">transaction_date</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-sky-400 block font-mono">float64</span>
                      <span className="text-text-primary block mt-0.5">amount</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-sky-400 block font-mono">int64</span>
                      <span className="text-text-primary block mt-0.5">credit_score</span>
                    </th>
                    <th className="p-3 font-semibold">
                      <span className="text-[10px] text-purple-400 block font-mono">string</span>
                      <span className="text-text-primary block mt-0.5">merchant_category</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60 text-text-secondary">
                  {DEMO_PREVIEW_ROWS.map((row) => (
                    <tr
                      key={row.customer_id}
                      className="hover:bg-canvas-card transition-colors"
                    >
                      <td className="p-3 font-medium text-text-primary">
                        {row.customer_id}
                      </td>
                      <td className="p-3">{row.age}</td>
                      <td className="p-3">${row.income.toLocaleString()}</td>
                      <td className="p-3 text-text-muted">{row.city}</td>
                      <td className="p-3 text-text-muted">{row.transaction_date}</td>
                      <td className="p-3 font-semibold text-text-primary">
                        ${row.amount.toFixed(2)}
                      </td>
                      <td className="p-3">{row.credit_score}</td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 rounded bg-canvas-card border border-border-subtle text-[11px]">
                          {row.merchant_category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-3 border-t border-border-subtle bg-canvas-subtle/50 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>Showing rows 1–8 of 82,341</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>
                <span className="px-2 py-1 text-text-secondary">Page {page} of 10,293</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Column Information */}
        {activeTab === 'columns' && (
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border-subtle text-text-muted">
                  <th className="p-2.5">Column Name</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Missing %</th>
                  <th className="p-2.5">Unique Values</th>
                  <th className="p-2.5">Key Signals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/60 text-text-secondary">
                {DEMO_COLUMNS.map((col) => (
                  <tr key={col.name} className="hover:bg-canvas-card">
                    <td className="p-2.5 font-semibold text-text-primary">{col.name}</td>
                    <td className="p-2.5 capitalize">{col.type}</td>
                    <td className="p-2.5">{col.missingPercent}%</td>
                    <td className="p-2.5">{col.uniqueCount.toLocaleString()}</td>
                    <td className="p-2.5">
                      <div className="flex flex-wrap gap-1">
                        {col.keySignals.map((sig, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-canvas-card border border-border-subtle text-[10px]"
                          >
                            {sig}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Missing Values */}
        {activeTab === 'missing' && (
          <div className="p-4 space-y-3">
            <div className="text-xs text-text-muted">
              Missing rate by column across 82,341 records:
            </div>
            <div className="space-y-2 font-mono text-xs max-w-xl">
              {DEMO_COLUMNS.map((col) => (
                <div key={col.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-text-primary">{col.name}</span>
                    <span className="text-text-muted">
                      {col.missingCount} ({col.missingPercent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-canvas-card rounded border border-border-subtle overflow-hidden">
                    <div
                      className={`h-full ${
                        col.missingPercent > 1
                          ? 'bg-amber-400'
                          : col.missingPercent > 0
                          ? 'bg-sky-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.max(2, col.missingPercent * 10)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Data Types */}
        {activeTab === 'types' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-canvas-card rounded border border-border-subtle text-xs space-y-2">
              <span className="font-semibold text-text-primary block font-mono">
                Type Inference Confidence
              </span>
              <p className="text-text-muted text-[11px]">
                Type heuristics tested with 100% agreement on 82,341 records. No mixed-type columns detected.
              </p>
            </div>
            <div className="p-3 bg-canvas-card rounded border border-border-subtle text-xs space-y-2">
              <span className="font-semibold text-text-primary block font-mono">
                Primary Identifier Candidate
              </span>
              <p className="text-text-muted text-[11px]">
                <span className="font-mono text-sky-400">customer_id</span> satisfies 100% uniqueness criteria with 0 nulls.
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Statistics */}
        {activeTab === 'stats' && (
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border-subtle text-text-muted">
                  <th className="p-2.5">Metric</th>
                  <th className="p-2.5">Mean</th>
                  <th className="p-2.5">Median</th>
                  <th className="p-2.5">Std Dev</th>
                  <th className="p-2.5">Min</th>
                  <th className="p-2.5">Max</th>
                  <th className="p-2.5">Skewness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/60 text-text-secondary">
                {DEMO_COLUMNS.filter((c) => c.stats).map((col) => (
                  <tr key={col.name} className="hover:bg-canvas-card">
                    <td className="p-2.5 font-semibold text-text-primary">{col.name}</td>
                    <td className="p-2.5">{col.stats?.mean?.toLocaleString()}</td>
                    <td className="p-2.5">{col.stats?.median?.toLocaleString()}</td>
                    <td className="p-2.5">{col.stats?.stdDev?.toLocaleString()}</td>
                    <td className="p-2.5">{col.stats?.min?.toLocaleString()}</td>
                    <td className="p-2.5">{col.stats?.max?.toLocaleString()}</td>
                    <td className="p-2.5">{col.stats?.skewness?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Analysis Scope Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">
              Configured Analysis Scope
            </h2>
          </div>
          <span className="text-[11px] font-mono text-text-muted">
            All 6 modules active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {analysisModules.map((mod) => (
            <div
              key={mod.id}
              className="p-3 rounded bg-canvas-panel border border-border-subtle flex items-start gap-2.5"
            >
              <CheckSquare className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-text-primary block font-mono">
                  {mod.title}
                </span>
                <span className="text-[11px] text-text-muted block leading-relaxed">
                  {mod.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link href="/analyze">
          <Button
            variant="outline"
            size="md"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Upload
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-text-muted font-mono flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> Ready for pipeline execution
          </span>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push('/analyze/progress')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue to Analysis Pipeline
          </Button>
        </div>
      </div>
    </div>
  );
}
