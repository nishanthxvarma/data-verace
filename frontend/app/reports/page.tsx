'use client';

import React from 'react';
import { DEMO_REPORT, DEMO_FINDINGS } from '@/data/demoData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Layers,
  HelpCircle,
  Hash,
  Database,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function ReportPage() {
  const report = DEMO_REPORT;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Report Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Analysis Report
            </h1>
          </div>
          <p className="text-xs text-text-muted font-mono">
            Report Reference: {report.id} • Generated {report.generatedAt}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Print Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            leftIcon={<Printer className="w-3.5 h-3.5 text-text-muted" />}
          >
            Print
          </Button>

          {/* Download PDF Placeholder (Disabled as requested) */}
          <div className="relative group/tooltip">
            <Button
              variant="secondary"
              size="sm"
              disabled
              leftIcon={<Lock className="w-3 h-3 text-text-muted" />}
              rightIcon={<Download className="w-3.5 h-3.5 text-text-muted" />}
            >
              Download PDF
            </Button>
            <div className="hidden group-hover/tooltip:block absolute bottom-full mb-2 right-0 px-2 py-1 bg-canvas-elevated border border-border-muted text-[10px] text-text-muted rounded whitespace-nowrap z-20 shadow-md">
              PDF compilation engine scheduled for production release
            </div>
          </div>

          {/* Download JSON Placeholder */}
          <Button
            variant="secondary"
            size="sm"
            disabled
            leftIcon={<Lock className="w-3 h-3 text-text-muted" />}
          >
            JSON Graph
          </Button>
        </div>
      </div>

      {/* Main Report Document Surface (Analytical Document Aesthetic) */}
      <article className="p-6 md:p-10 rounded-md bg-canvas-panel border border-border-subtle space-y-8 text-text-primary">
        {/* Document Identification Block */}
        <div className="border-b border-border-subtle pb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-accent-primary font-semibold">
              DATA VERACE STATISTICAL AUDIT REPORT
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Audit Verified
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-text-primary font-mono">
            {report.datasetName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-text-muted pt-2 border-t border-border-subtle/60">
            <div>
              <span className="text-text-secondary">Cryptographic Digest:</span>{' '}
              <span className="text-text-primary break-all">{report.reportHash}</span>
            </div>
            <div>
              <span className="text-text-secondary">Evaluation Baseline:</span>{' '}
              <span className="text-text-primary">Banking Demographic Copula (v2.4)</span>
            </div>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
            1. Executive Summary
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.executiveSummary}
          </p>
        </section>

        {/* 2. Dataset Overview */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-text-muted" />
            2. Dataset Overview
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.datasetOverview}
          </p>
        </section>

        {/* 3. Data Integrity & Schema Consistency */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            3. Data Integrity Findings
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.integrityOverview}
          </p>
        </section>

        {/* 4. Multivariate Anomalies */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            4. Multivariate Anomalies
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.anomaliesOverview}
          </p>
        </section>

        {/* 5. Synthetic-Data Indicators */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            5. Synthetic-Data Indicators
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.syntheticIndicatorsOverview}
          </p>
        </section>

        {/* 6. Potential Manipulation Indicators */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-400" />
            6. Potential Manipulation Indicators
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.manipulationOverview}
          </p>
        </section>

        {/* 7. Detailed Findings Appendix */}
        <section className="space-y-3 pt-4 border-t border-border-subtle">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <Hash className="w-3.5 h-3.5 text-accent-primary" />
            7. Detailed Findings Appendix
          </h3>

          <div className="overflow-x-auto border border-border-subtle rounded">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-canvas-subtle/80 text-text-muted">
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Title</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Severity</th>
                  <th className="p-2.5">Confidence</th>
                  <th className="p-2.5">Affected Columns</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/60 text-text-secondary">
                {DEMO_FINDINGS.map((f) => (
                  <tr key={f.id} className="hover:bg-canvas-card">
                    <td className="p-2.5 font-semibold text-text-primary">{f.id}</td>
                    <td className="p-2.5 text-text-primary">{f.title}</td>
                    <td className="p-2.5">
                      <Badge category={f.category} size="sm">
                        {f.category}
                      </Badge>
                    </td>
                    <td className="p-2.5">
                      <Badge severity={f.severity} size="sm">
                        {f.severity}
                      </Badge>
                    </td>
                    <td className="p-2.5 font-semibold text-text-primary">
                      {f.confidence.toFixed(2)}
                    </td>
                    <td className="p-2.5 text-text-muted">{f.affectedColumns.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Methodology */}
        <section className="space-y-2.5 pt-4 border-t border-border-subtle">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
            8. Methodology & Statistical Assumptions
          </h3>
          <p className="text-xs leading-relaxed text-text-secondary pl-3.5 border-l border-border-subtle">
            {report.methodologyNotes}
          </p>
        </section>

        {/* 9. Limitations & Epistemic Bounds */}
        <section className="space-y-2.5 pt-4 border-t border-border-subtle">
          <div className="p-4 rounded bg-canvas-card border border-border-muted space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 block">
              9. Limitations & Scientific Bounds
            </span>
            <p className="text-xs text-text-secondary leading-relaxed">
              {report.limitationsDisclaimer}
            </p>
          </div>
        </section>

        {/* Document Footer Signoff */}
        <div className="pt-6 border-t border-border-subtle text-[11px] font-mono text-text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>DATA VERACE • Evidence Graph Audit Engine v1.0</span>
          <Link
            href="/workspace"
            className="text-accent-primary hover:text-accent-hover"
          >
            Investigate in Interactive Workspace →
          </Link>
        </div>
      </article>
    </div>
  );
}
