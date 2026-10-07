'use client';

import React, { useState } from 'react';
import { Finding } from '@/types';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { ScatterDependencyPlot } from '@/components/charts/ScatterDependencyPlot';
import { DistributionPlot } from '@/components/charts/DistributionPlot';
import { BenfordLawPlot } from '@/components/charts/BenfordLawPlot';
import { ClusterAnomalyPlot } from '@/components/charts/ClusterAnomalyPlot';
import { CorrelationResidualHeatmap } from '@/components/charts/CorrelationResidualHeatmap';
import { PrecisionTruncationPlot } from '@/components/charts/PrecisionTruncationPlot';
import { DEMO_PREVIEW_ROWS } from '@/data/demoData';
import { Tabs } from '@/components/ui/Tabs';
import { BarChart3, Table as TableIcon, Layers } from 'lucide-react';

export interface WorkspaceCenterAnalysisProps {
  finding: Finding;
  className?: string;
}

export function WorkspaceCenterAnalysis({
  finding,
  className = '',
}: WorkspaceCenterAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'records' | 'summary'>('chart');

  const tabs = [
    { id: 'chart', label: 'Analysis Chart', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    {
      id: 'records',
      label: 'Flagged Records Sample',
      count: finding.affectedRecordsCount || DEMO_PREVIEW_ROWS.length,
      icon: <TableIcon className="w-3.5 h-3.5" />,
    },
    { id: 'summary', label: 'Feature Metrics', icon: <Layers className="w-3.5 h-3.5" /> },
  ];

  const renderVisualization = () => {
    switch (finding.visualizationType) {
      case 'dependency-scatter':
        return (
          <ChartContainer
            title="Bivariate Demographic Copula Analysis"
            subtitle="Customer Age vs Annual Income joint distribution comparison"
            legend={
              <>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" />
                  <span>Baseline Copula Trend</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  <span>Residual Deviation</span>
                </div>
              </>
            }
            explanatoryText="Empirical scatter points reflect decorrelation across income brackets. In organic populations, higher-earning cohorts cluster past age 35, whereas this sample exhibits uniform vertical dispersion."
          >
            <ScatterDependencyPlot />
          </ChartContainer>
        );

      case 'distribution-shift':
        return (
          <ChartContainer
            title="Continuous Amount Density & Threshold Profile"
            subtitle="Empirical frequency tiers vs continuous Pareto-exponential reference decay"
            legend={
              <>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" />
                  <span>Reference Decay</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-2 h-2 bg-amber-500 inline-block rounded-xs" />
                  <span>Threshold Discontinuity</span>
                </div>
              </>
            }
            explanatoryText="A sharp drop occurs immediately at the $5,000 and $10,000 thresholds (-84.2%). Organic financial flows exhibit continuous decay; vertical cliff-faces typically indicate post-hoc filters or generative clipping."
          >
            <DistributionPlot />
          </ChartContainer>
        );

      case 'benford-law':
        return (
          <ChartContainer
            title="First-Digit Frequency Distribution vs Benford Invariant"
            subtitle="Observed digit proportions compared with logarithmic scale expectation"
            legend={
              <>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" />
                  <span>Benford Law Log-Curve</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-2 h-2 bg-amber-500 inline-block rounded-xs" />
                  <span>Observed Digit Share</span>
                </div>
              </>
            }
            explanatoryText="First digits 2 through 8 appear with near-equal frequency (~11-12%), rejecting Benford expectation (p < 0.0001). This pattern frequently emerges when monetary amounts are synthesized via uniform distributions."
          >
            <BenfordLawPlot />
          </ChartContainer>
        );

      case 'cluster-anomaly':
        return (
          <ChartContainer
            title="High-Dimensional Subspace Density Projection"
            subtitle="2D PCA subspace mapping isolating hyper-dense record clusters"
            legend={
              <>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
                  <span>Demographic Background</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  <span>Centroid Cluster (n=143)</span>
                </div>
              </>
            }
            explanatoryText="143 records share near-identical scaled feature vectors across 7 attributes. This anomalous hyper-density is consistent with mode collapse in neural generative architectures or bulk static imputation."
          >
            <ClusterAnomalyPlot />
          </ChartContainer>
        );

      case 'correlation-residual':
        return (
          <ChartContainer
            title="Pairwise Correlation Residual Matrix (Δ Expected - Observed)"
            subtitle="Pairwise interaction differences against demographic reference cohorts"
            legend={
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <span>Residual Drift:</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-800/40">
                  Amber = Attenuated Covariance
                </span>
              </div>
            }
            explanatoryText="Higher-order cross-feature correlations are systematically dampened while individual marginal distributions remain plausible."
          >
            <CorrelationResidualHeatmap />
          </ChartContainer>
        );

      case 'precision-truncation':
        return (
          <ChartContainer
            title="Floating-Point Decimal Precision Frequency"
            subtitle="Coordinate decimal place count across merchant_lat and merchant_lon"
            explanatoryText="100% of spatial coordinates terminate at exactly 2 decimal places (~1.1 km resolution). This indicates either intentional coordinate coarsening for privacy or schema storage truncation."
          >
            <PrecisionTruncationPlot />
          </ChartContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden ${className}`}>
      {/* Top Workspace Tab Bar */}
      <div className="px-4 bg-canvas-subtle/40 border-b border-border-subtle shrink-0">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(t) => setActiveTab(t as 'chart' | 'records' | 'summary')}
          size="sm"
        />
      </div>

      {/* Main Investigation Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'chart' && renderVisualization()}

        {activeTab === 'records' && (
          <div className="bg-canvas-panel border border-border-subtle rounded-md overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-border-subtle bg-canvas-subtle/50 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">
                  Flagged Record Slice (Sample of {finding.affectedRecordsCount || 1420} records)
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Records contributing significantly to finding {finding.id}
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-canvas-card border border-border-subtle text-text-secondary">
                Columns: {finding.affectedColumns.join(', ')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-canvas-subtle/30 text-text-muted">
                    <th className="p-2.5 font-medium">Record ID</th>
                    <th className="p-2.5 font-medium">Age</th>
                    <th className="p-2.5 font-medium">Income</th>
                    <th className="p-2.5 font-medium">City</th>
                    <th className="p-2.5 font-medium">Amount</th>
                    <th className="p-2.5 font-medium">Credit</th>
                    <th className="p-2.5 font-medium">Residual Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60 text-text-secondary">
                  {DEMO_PREVIEW_ROWS.map((row, idx) => (
                    <tr
                      key={row.customer_id}
                      className="hover:bg-canvas-card transition-colors"
                    >
                      <td className="p-2.5 font-semibold text-text-primary">
                        {row.customer_id}
                      </td>
                      <td className="p-2.5">{row.age}</td>
                      <td className="p-2.5">${row.income.toLocaleString()}</td>
                      <td className="p-2.5 text-text-muted">{row.city}</td>
                      <td className="p-2.5">${row.amount.toFixed(2)}</td>
                      <td className="p-2.5">{row.credit_score}</td>
                      <td className="p-2.5">
                        {idx % 2 === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 rounded bg-amber-950/30 text-amber-300 border border-amber-800/30">
                            Flagged Residual
                          </span>
                        ) : (
                          <span className="text-[10px] text-text-muted">Normal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-border-subtle bg-canvas-subtle/30 text-[10px] text-text-muted font-mono flex justify-between">
              <span>Showing 8 of {finding.affectedRecordsCount || 1420} records</span>
              <span>Dataset: customer_transactions.csv</span>
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-canvas-panel border border-border-subtle space-y-3">
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">
                Statistical Test Metrics
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-border-subtle">
                  <span className="text-text-muted">Evaluation Target:</span>
                  <span className="text-text-primary">{finding.affectedColumns.join(' × ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle">
                  <span className="text-text-muted">Observed Deviation:</span>
                  <span className="text-amber-300 font-semibold">
                    {finding.technicalParameters?.['Calculated Value'] || '0.421'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle">
                  <span className="text-text-muted">Significance Threshold:</span>
                  <span className="text-text-secondary">
                    {finding.technicalParameters?.['Baseline Threshold'] || '0.150'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle">
                  <span className="text-text-muted">Sample Size (n):</span>
                  <span className="text-text-primary">{finding.sampleSize?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md bg-canvas-panel border border-border-subtle space-y-3">
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">
                Baseline Reference Metadata
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Benchmark distributions are calibrated on validated empirical banking cohorts (800k+ non-identifying transactions). Divergence metrics utilize 2D Wasserstein-1 and empirical copula projections.
              </p>
              <div className="p-2.5 rounded bg-canvas-card border border-border-subtle text-[11px] font-mono text-text-muted">
                Reference Model: Gaussian-Clayton demographic mixture copula (v2.4)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
