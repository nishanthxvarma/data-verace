import React, { useState } from 'react';
import { Finding } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ConfidenceMeter } from '@/components/ui/ConfidenceMeter';
import { EvidenceLimitationsBox } from './EvidenceLimitationsBox';
import { ChevronDown, ChevronRight, Hash, Columns, AlertTriangle } from 'lucide-react';

export interface EvidenceDetailPaneProps {
  finding: Finding;
  className?: string;
}

export function EvidenceDetailPane({
  finding,
  className = '',
}: EvidenceDetailPaneProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className={`flex flex-col h-full overflow-y-auto p-4 space-y-5 ${className}`}>
      {/* Header Info */}
      <div className="space-y-2 border-b border-border-subtle pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-text-primary px-1.5 py-0.5 rounded bg-canvas-card border border-border-subtle">
              {finding.id}
            </span>
            <Badge category={finding.category}>{finding.category}</Badge>
          </div>
          <Badge severity={finding.severity}>{finding.severity}</Badge>
        </div>

        <h3 className="text-sm font-semibold text-text-primary leading-snug">
          {finding.title}
        </h3>
      </div>

      {/* Confidence Meter Section */}
      <div className="p-3 bg-canvas-subtle/80 rounded border border-border-subtle">
        <ConfidenceMeter
          score={finding.confidence}
          confidenceInterval={finding.confidenceInterval}
        />
      </div>

      {/* Section 1: Observation */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted">
          <AlertTriangle className="w-3.5 h-3.5 text-accent-primary" />
          <span>Observation</span>
        </div>
        <div className="p-3 rounded bg-canvas-card border border-border-subtle text-xs text-text-primary leading-relaxed font-mono">
          {finding.observation}
        </div>
      </div>

      {/* Section 2: Affected Features & Scope */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-text-muted">
          <span className="flex items-center gap-1.5 font-semibold">
            <Columns className="w-3.5 h-3.5 text-text-muted" />
            Affected Features
          </span>
          {finding.affectedRecordsCount && (
            <span className="text-text-secondary">
              {finding.affectedRecordsCount.toLocaleString()} records flagged
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {finding.affectedColumns.map((col) => (
            <span
              key={col}
              className="px-2 py-1 rounded bg-canvas-card border border-border-subtle font-mono text-xs text-text-primary"
            >
              {col}
            </span>
          ))}
        </div>
      </div>

      {/* Section 3: Why It Matters */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted">
          Why It Matters
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          {finding.whyItMatters}
        </p>
      </div>

      {/* Section 4: Interpretation (Plausible Causes) */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted">
          Interpretation & Possible Causes
        </div>
        <ul className="space-y-2">
          {finding.interpretation.map((reason, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed p-2 rounded bg-canvas-subtle/50 border border-border-subtle/60"
            >
              <span className="font-mono text-accent-primary font-semibold shrink-0">
                0{idx + 1}.
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 5: Scientific Limitations Disclaimer */}
      <EvidenceLimitationsBox limitations={finding.limitations} />

      {/* Technical Parameters Disclosure (Level 4 Progressive Disclosure) */}
      {finding.technicalParameters && (
        <div className="border border-border-subtle rounded overflow-hidden">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full flex items-center justify-between p-2.5 bg-canvas-subtle hover:bg-canvas-card text-xs font-mono text-text-muted transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-text-muted" />
              Technical Parameters & Methodology
            </span>
            {showTechnicalDetails ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
          {showTechnicalDetails && (
            <div className="p-3 bg-canvas-panel border-t border-border-subtle space-y-1.5 text-[11px] font-mono">
              {Object.entries(finding.technicalParameters).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-0.5 border-b border-border-subtle/40 last:border-b-0">
                  <span className="text-text-muted">{k}:</span>
                  <span className="text-text-primary font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
