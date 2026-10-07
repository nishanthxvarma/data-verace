'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  UploadCloud,
  Database,
  ArrowRight,
  Sliders,
  Lock,
} from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [compareReference, setCompareReference] = useState(true);
  const [enableTemporal, setEnableTemporal] = useState(false);

  const steps = [
    { id: 1, label: 'Upload Dataset', sublabel: 'CSV, Parquet, JSON' },
    { id: 2, label: 'Schema Preview', sublabel: 'Column profiling' },
    { id: 3, label: 'Scope Config', sublabel: 'Select detectors' },
    { id: 4, label: 'Analyze', sublabel: 'Pipeline execution' },
  ];

  const handleSelectSample = () => {
    setSelectedFile('customer_transactions.csv (12.4 MB • 82,341 rows)');
  };

  const handleContinue = () => {
    router.push('/analyze/preview');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* 4-Step Progress Indicator */}
      <div className="p-4 bg-canvas-panel border border-border-subtle rounded-md">
        <StepIndicator steps={steps} currentStep={1} />
      </div>

      {/* Main Upload Dropzone */}
      <section className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">
            Upload Dataset
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Provide a tabular data file to begin structural profiling and statistical audit.
          </p>
        </div>

        {/* Dropzone Area */}
        <div
          onClick={handleSelectSample}
          className="border-2 border-dashed border-border-muted hover:border-accent-primary/60 bg-canvas-panel/50 hover:bg-canvas-card/60 rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group select-none"
        >
          <div className="w-14 h-14 rounded-full bg-canvas-elevated border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary/40 transition-colors mb-4">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-sm font-semibold text-text-primary mb-1">
            Drop your dataset here, or click to browse
          </h3>
          <p className="text-xs text-text-muted max-w-sm mb-4">
            Supports <span className="font-mono text-text-secondary">.csv</span>,{' '}
            <span className="font-mono text-text-secondary">.parquet</span>, and{' '}
            <span className="font-mono text-text-secondary">.json</span> files up to 100 MB.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSample();
              }}
            >
              Browse Files
            </Button>

            {/* Kaggle Integration Placeholder (Strictly disabled as requested) */}
            <div className="relative group/tooltip">
              <Button
                variant="outline"
                size="md"
                disabled
                leftIcon={<Lock className="w-3.5 h-3.5 text-text-muted" />}
              >
                Import from Kaggle
              </Button>
              <div className="hidden group-hover/tooltip:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-canvas-elevated border border-border-muted text-[10px] text-text-muted rounded whitespace-nowrap z-20 shadow-md">
                Kaggle OAuth API integration scheduled for subsequent milestone
              </div>
            </div>
          </div>

          {selectedFile ? (
            <div className="mt-6 p-3 rounded bg-canvas-elevated border border-accent-primary/40 text-xs font-mono flex items-center gap-2 text-accent-primary animate-in fade-in-50">
              <Database className="w-4 h-4" />
              <span>Loaded: {selectedFile}</span>
            </div>
          ) : (
            <div className="mt-6 text-[11px] font-mono text-text-muted">
              Tip: Click to load demo dataset{' '}
              <span className="text-accent-primary underline">customer_transactions.csv</span>
            </div>
          )}
        </div>
      </section>

      {/* Analysis Settings (UI Controls Only) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-text-secondary" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">
            Optional Analysis Settings
          </h2>
        </div>

        <Card variant="base" className="divide-y divide-border-subtle/80">
          <label className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-canvas-card transition-colors select-none">
            <div className="space-y-0.5 pr-4">
              <span className="text-xs font-medium text-text-primary block">
                Analyze automatically upon upload
              </span>
              <span className="text-[11px] text-text-muted block">
                Immediately trigger schema profiling and anomaly screen without intermediate confirmation.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoAnalyze}
              onChange={(e) => setAutoAnalyze(e.target.checked)}
              className="w-4 h-4 rounded bg-canvas-card border-border-subtle text-accent-primary focus:ring-accent-primary"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-canvas-card transition-colors select-none">
            <div className="space-y-0.5 pr-4">
              <span className="text-xs font-medium text-text-primary block">
                Compare against reference baseline distribution
              </span>
              <span className="text-[11px] text-text-muted block">
                Evaluate empirical copula divergence and Benford invariants against calibrated domain cohorts.
              </span>
            </div>
            <input
              type="checkbox"
              checked={compareReference}
              onChange={(e) => setCompareReference(e.target.checked)}
              className="w-4 h-4 rounded bg-canvas-card border-border-subtle text-accent-primary focus:ring-accent-primary"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-canvas-card transition-colors select-none">
            <div className="space-y-0.5 pr-4">
              <span className="text-xs font-medium text-text-primary block">
                Enable temporal drift profiling
              </span>
              <span className="text-[11px] text-text-muted block">
                Track sequential variance shifts across datetime timestamps if present in schema.
              </span>
            </div>
            <input
              type="checkbox"
              checked={enableTemporal}
              onChange={(e) => setEnableTemporal(e.target.checked)}
              className="w-4 h-4 rounded bg-canvas-card border-border-subtle text-accent-primary focus:ring-accent-primary"
            />
          </label>
        </Card>
      </section>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link href="/">
          <Button variant="ghost" size="md">
            Cancel
          </Button>
        </Link>

        <Button
          variant="primary"
          size="md"
          onClick={handleContinue}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Preview
        </Button>
      </div>
    </div>
  );
}
