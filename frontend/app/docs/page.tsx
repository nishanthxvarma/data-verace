'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const concepts = [
    {
      step: '01',
      title: 'Observation',
      desc: 'Rigorous empirical measurement of statistical divergence, joint probability densities, or formatting non-conformities.',
      example: 'Joint distribution of (income, age) yields Wasserstein distance W1 = 0.42 against baseline demographic copulas.',
    },
    {
      step: '02',
      title: 'Evidence',
      desc: 'Formal statistical testing providing significance values, effect sizes, residual matrices, and confidence bounds.',
      example: 'Chi-Square test on leading digits rejects logarithmic distribution (χ² = 38.64, p < 0.001).',
    },
    {
      step: '03',
      title: 'Interpretation',
      desc: 'Plausible technical and generative mechanisms that could account for the observed evidence without rushing to conclusions.',
      example: 'Independent marginal generator sampling, mode collapse, manual post-hoc filtering, or targeted cohort selection.',
    },
    {
      step: '04',
      title: 'Confidence',
      desc: 'Calibrated score reflecting data completeness, test power, sample size, and variance stability.',
      example: 'Confidence 0.78 with 95% bootstrap confidence interval [0.72 - 0.84].',
    },
    {
      step: '05',
      title: 'Limitations',
      desc: 'Explicit scientific boundaries establishing that statistical anomalies do not equate to proof of synthetic or fraudulent origin.',
      example: 'This finding alone does not establish that the dataset is synthetic. Natural selection bias can produce similar signatures.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-border-subtle pb-4 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-accent-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            Scientific Methodology & Philosophy
          </h1>
        </div>
        <p className="text-xs text-text-muted">
          The theoretical framework underpinning Data Verace evidence-driven dataset analysis.
        </p>
      </div>

      {/* Core Philosophy Banner */}
      <div className="p-6 rounded-md bg-canvas-panel border border-border-subtle space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">
            Rejecting the Binary &quot;Real vs Fake&quot; Fallacy
          </h2>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Tabular dataset analysis frequently errs by attempting to reduce complex
          multivariate systems to a single classification score (e.g. &quot;87% Fake&quot;).
          Real datasets undergo ETL transformations, privacy fuzzing, sensor dropouts,
          and domain-specific cohort sampling that generate statistical anomalies.
          Data Verace replaces simplistic labeling with an evidence chain:
        </p>
      </div>

      {/* 5-Step Continuum */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">
          The Five Analytical Layers
        </h2>

        <div className="space-y-3">
          {concepts.map((c) => (
            <Card key={c.step} variant="base" className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-accent-primary px-2 py-0.5 rounded bg-canvas-card border border-border-subtle">
                  {c.step}
                </span>
                <h3 className="text-sm font-semibold text-text-primary font-mono">
                  {c.title}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {c.desc}
              </p>
              <div className="p-2.5 rounded bg-canvas-subtle border border-border-subtle text-[11px] font-mono text-text-muted">
                <span className="text-text-secondary font-medium">Applied Example:</span>{' '}
                {c.example}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistical Engines Overview */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">
          Detection Engines & Invariants
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="base" className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text-primary">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Copula & Dependency Divergence</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Compares 2D empirical copulas against demographic benchmarks using 2D Wasserstein-1 metrics to detect independent feature generation artifacts.
            </p>
          </Card>

          <Card variant="base" className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text-primary">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Benford Invariant Screening</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Applies Chi-Square goodness-of-fit testing against logarithmic expectations for unconstrained financial numbers across multi-order magnitudes.
            </p>
          </Card>
        </div>
      </section>

      {/* Bottom Link */}
      <div className="pt-4 border-t border-border-subtle flex justify-between items-center text-xs font-mono">
        <span className="text-text-muted">Ready to investigate findings?</span>
        <Link
          href="/workspace"
          className="text-accent-primary hover:text-accent-hover flex items-center gap-1.5"
        >
          <span>Open Evidence Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
