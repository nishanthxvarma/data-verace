'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { DEMO_PIPELINE_STAGES } from '@/data/demoData';
import { PipelineStage } from '@/types';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Layers,
  StopCircle,
} from 'lucide-react';

export default function AnalysisProgressPage() {
  const router = useRouter();
  const [stages, setStages] = useState<PipelineStage[]>(DEMO_PIPELINE_STAGES);
  const [currentStageIndex, setCurrentStageIndex] = useState(3); // Stage 4 active
  const [isPaused, setIsPaused] = useState(false);

  const steps = [
    { id: 1, label: 'Upload Dataset', sublabel: 'CSV, Parquet, JSON' },
    { id: 2, label: 'Schema Preview', sublabel: 'Column profiling' },
    { id: 3, label: 'Scope Config', sublabel: 'Select detectors' },
    { id: 4, label: 'Analyze', sublabel: 'Pipeline execution' },
  ];

  // Realistic pipeline stepping simulation
  useEffect(() => {
    if (isPaused) return;

    if (currentStageIndex < stages.length) {
      const timer = setTimeout(() => {
        setStages((prev) =>
          prev.map((s, idx) => {
            if (idx < currentStageIndex) {
              return { ...s, status: 'completed' };
            } else if (idx === currentStageIndex) {
              return { ...s, status: 'completed' };
            } else if (idx === currentStageIndex + 1) {
              return { ...s, status: 'in-progress' };
            }
            return s;
          })
        );
        setCurrentStageIndex((prev) => prev + 1);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [currentStageIndex, isPaused, stages.length]);

  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);
  const isFinished = completedCount === stages.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 4-Step Progress Indicator */}
      <div className="p-4 bg-canvas-panel border border-border-subtle rounded-md">
        <StepIndicator steps={steps} currentStep={4} />
      </div>

      {/* Pipeline Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-md bg-canvas-panel border border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-canvas-card border border-border-subtle flex items-center justify-center text-accent-primary shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-text-primary font-mono">
                customer_transactions.csv
              </h1>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isFinished
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                    : 'bg-sky-950/40 text-sky-400 border border-sky-800/40 animate-pulse'
                }`}
              >
                {isFinished ? 'Analysis Complete' : 'Pipeline Executing'}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5 font-mono">
              82,341 records • 17 features • Baseline Reference: Banking-v2.4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isFinished && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
              leftIcon={<StopCircle className="w-3.5 h-3.5 text-text-muted" />}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/workspace')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {isFinished ? 'Enter Evidence Workspace' : 'Jump to Workspace'}
          </Button>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="p-4 bg-canvas-panel border border-border-subtle rounded-md space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-text-secondary font-medium">Pipeline Completion</span>
          <span className="text-text-primary font-semibold">
            {completedCount} of {stages.length} Stages ({progressPercent}%)
          </span>
        </div>
        <Progress value={progressPercent} size="md" />
      </div>

      {/* Stages List (Non-theatrical, restrained, scientific) */}
      <Card variant="base" padding="none" className="overflow-hidden">
        <div className="px-4 py-3 bg-canvas-subtle/50 border-b border-border-subtle flex justify-between items-center">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-accent-primary" />
            <span>Analytical Pipeline Stages</span>
          </h2>
          <span className="text-[11px] font-mono text-text-muted">
            Non-Parametric Statistical Testing
          </span>
        </div>

        <div className="divide-y divide-border-subtle/70">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isInProgress = stage.status === 'in-progress';

            return (
              <div
                key={stage.id}
                className={`p-3.5 flex items-start gap-3 transition-colors ${
                  isInProgress
                    ? 'bg-canvas-card/60'
                    : isCompleted
                    ? 'bg-transparent'
                    : 'opacity-60'
                }`}
              >
                {/* Stage Indicator Icon */}
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isInProgress ? (
                    <div className="w-4 h-4 rounded-full border-2 border-accent-primary border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border-muted flex items-center justify-center text-[10px] text-text-muted font-mono">
                      {idx + 1}
                    </div>
                  )}
                </div>

                {/* Stage Name & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-medium font-mono ${
                        isInProgress
                          ? 'text-accent-primary font-semibold'
                          : isCompleted
                          ? 'text-text-primary'
                          : 'text-text-muted'
                      }`}
                    >
                      {stage.name}
                    </span>
                    {stage.durationMs && isCompleted && (
                      <span className="text-[10px] font-mono text-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stage.durationMs}ms
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Stage Execution Result Snippet */}
                  {stage.details && (isCompleted || isInProgress) && (
                    <div className="mt-2 px-2.5 py-1.5 rounded bg-canvas-card border border-border-subtle text-[11px] font-mono text-text-secondary">
                      <span className="text-text-muted mr-1.5">Result:</span>
                      {stage.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
