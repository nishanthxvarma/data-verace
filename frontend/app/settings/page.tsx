'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Settings,
  Sliders,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const [alphaThreshold, setAlphaThreshold] = useState('0.01');
  const [wassersteinSensitivity, setWassersteinSensitivity] = useState('0.15');
  const [clusterMinSamples, setClusterMinSamples] = useState('10');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-border-subtle pb-4 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-accent-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            Settings & Detection Thresholds
          </h1>
        </div>
        <p className="text-xs text-text-muted">
          Configure calibration benchmarks, statistical test sensitivity, and workspace display parameters.
        </p>
      </div>

      {/* Statistical Thresholds */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
          <Sliders className="w-4 h-4 text-accent-primary" />
          <span>Statistical Test Parameters</span>
        </div>

        <Card variant="base" className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="alpha" className="text-text-primary font-medium">
                Significance Level Alpha (α)
              </label>
              <span className="text-accent-primary font-semibold">{alphaThreshold}</span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              P-value cutoff threshold for rejecting null hypothesis in Benford Chi-Square tests and marginal Kolmogorov-Smirnov tests.
            </p>
            <select
              id="alpha"
              value={alphaThreshold}
              onChange={(e) => setAlphaThreshold(e.target.value)}
              className="w-full bg-canvas-card border border-border-subtle rounded text-xs text-text-primary p-2 focus:outline-none focus:border-accent-primary font-mono cursor-pointer"
            >
              <option value="0.05">0.05 (Standard statistical threshold)</option>
              <option value="0.01">0.01 (Conservative / High confidence)</option>
              <option value="0.001">0.001 (Very strict / Critical only)</option>
            </select>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-border-subtle/80">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="wasserstein" className="text-text-primary font-medium">
                Wasserstein-1 Divergence Sensitivity
              </label>
              <span className="text-accent-primary font-semibold">{wassersteinSensitivity}</span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Minimum 2D copula Wasserstein distance required to trigger Finding E-014 (Pairwise Dependency Deviation).
            </p>
            <select
              id="wasserstein"
              value={wassersteinSensitivity}
              onChange={(e) => setWassersteinSensitivity(e.target.value)}
              className="w-full bg-canvas-card border border-border-subtle rounded text-xs text-text-primary p-2 focus:outline-none focus:border-accent-primary font-mono cursor-pointer"
            >
              <option value="0.10">0.10 (High sensitivity)</option>
              <option value="0.15">0.15 (Default recommended benchmark)</option>
              <option value="0.25">0.25 (Low sensitivity / Severe divergence only)</option>
            </select>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-border-subtle/80">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="cluster" className="text-text-primary font-medium">
                DBSCAN Min-Samples (Mode Collapse Cluster)
              </label>
              <span className="text-accent-primary font-semibold">{clusterMinSamples}</span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Minimum population of near-duplicate records in normalized space to register a hyper-density cluster anomaly.
            </p>
            <input
              id="cluster"
              type="number"
              value={clusterMinSamples}
              onChange={(e) => setClusterMinSamples(e.target.value)}
              min="5"
              max="500"
              className="w-full bg-canvas-card border border-border-subtle rounded text-xs text-text-primary p-2 focus:outline-none focus:border-accent-primary font-mono"
            />
          </div>
        </Card>
      </section>

      {/* Workspace Display Preferences */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
          <SlidersHorizontal className="w-4 h-4 text-accent-primary" />
          <span>Workspace Environment</span>
        </div>

        <Card variant="base" className="divide-y divide-border-subtle/80">
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="text-xs font-medium text-text-primary block font-mono">
                Tabular Numbers
              </span>
              <span className="text-[11px] text-text-muted block">
                Use fixed-width figures for aligned numerical metrics and statistical tables.
              </span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded bg-canvas-card border-border-subtle text-accent-primary"
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <div>
              <span className="text-xs font-medium text-text-primary block font-mono">
                Accessible Focus Rings
              </span>
              <span className="text-[11px] text-text-muted block">
                Show high-visibility 2px focus indicators during keyboard tab navigation.
              </span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded bg-canvas-card border-border-subtle text-accent-primary"
            />
          </div>
        </Card>
      </section>

      {/* Save Action */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
        {saved && (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" /> Preferences applied
          </span>
        )}
        <Button variant="primary" size="md" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
