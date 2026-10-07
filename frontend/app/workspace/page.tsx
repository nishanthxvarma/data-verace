'use client';

import React, { useState } from 'react';
import { DEMO_FINDINGS } from '@/data/demoData';
import { Finding } from '@/types';
import { FindingList } from '@/components/findings/FindingList';
import { WorkspaceCenterAnalysis } from '@/components/workspace/WorkspaceCenterAnalysis';
import { EvidenceDetailPane } from '@/components/evidence/EvidenceDetailPane';
import { Drawer } from '@/components/ui/Drawer';
import { FileText, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

export default function WorkspacePage() {
  const [selectedFinding, setSelectedFinding] = useState<Finding>(DEMO_FINDINGS[0]);
  const [mobileActiveView, setMobileActiveView] = useState<'findings' | 'center' | 'evidence'>('center');
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-canvas-base">
      {/* Workspace Header Toolbar */}
      <div className="h-10 px-4 bg-canvas-subtle border-b border-border-subtle flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-text-muted">EVIDENCE WORKSPACE</span>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
          <span className="font-mono font-medium text-text-primary">
            customer_transactions.csv
          </span>
          <span className="text-text-muted">|</span>
          <span className="font-mono text-text-secondary">82,341 rows</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/reports"
            className="flex items-center gap-1.5 text-text-muted hover:text-text-primary font-mono text-[11px] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Full Report</span>
          </Link>

          {/* Mobile/Tablet view switcher button */}
          <button
            onClick={() => setEvidenceDrawerOpen(true)}
            className="xl:hidden flex items-center gap-1.5 px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-[11px] text-text-primary hover:border-border-muted"
          >
            <Eye className="w-3.5 h-3.5 text-accent-primary" />
            <span>Inspect Evidence</span>
          </button>
        </div>
      </div>

      {/* Mobile/Small Tablet Tab Switcher (Visible on small screens only) */}
      <div className="md:hidden flex border-b border-border-subtle bg-canvas-card">
        <button
          onClick={() => setMobileActiveView('findings')}
          className={`flex-1 py-2 text-xs font-mono font-medium text-center border-b-2 ${
            mobileActiveView === 'findings'
              ? 'border-accent-primary text-text-primary'
              : 'border-transparent text-text-muted'
          }`}
        >
          Findings ({DEMO_FINDINGS.length})
        </button>
        <button
          onClick={() => setMobileActiveView('center')}
          className={`flex-1 py-2 text-xs font-mono font-medium text-center border-b-2 ${
            mobileActiveView === 'center'
              ? 'border-accent-primary text-text-primary'
              : 'border-transparent text-text-muted'
          }`}
        >
          Analysis
        </button>
        <button
          onClick={() => setMobileActiveView('evidence')}
          className={`flex-1 py-2 text-xs font-mono font-medium text-center border-b-2 ${
            mobileActiveView === 'evidence'
              ? 'border-accent-primary text-text-primary'
              : 'border-transparent text-text-muted'
          }`}
        >
          Evidence
        </button>
      </div>

      {/* Primary Three-Pane Evidence Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: Findings (width: 310px) */}
        <div
          className={`w-full md:w-80 shrink-0 border-r border-border-subtle bg-canvas-subtle flex flex-col h-full ${
            mobileActiveView === 'findings' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <div className="px-3 py-2 border-b border-border-subtle bg-canvas-panel/50 flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Detected Signals ({DEMO_FINDINGS.length})
            </span>
            <span className="text-[10px] font-mono text-text-muted">6 Indicators</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <FindingList
              findings={DEMO_FINDINGS}
              selectedFinding={selectedFinding}
              onSelectFinding={(f) => {
                setSelectedFinding(f);
                if (window.innerWidth < 768) {
                  setMobileActiveView('center');
                }
              }}
            />
          </div>
        </div>

        {/* CENTER PANEL: Analysis / Visualization (flex-1) */}
        <div
          className={`flex-1 flex flex-col h-full overflow-hidden bg-canvas-base ${
            mobileActiveView === 'center' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <WorkspaceCenterAnalysis finding={selectedFinding} />
        </div>

        {/* RIGHT PANEL: Evidence Details (width: 380px) */}
        <div
          className={`hidden xl:flex w-96 shrink-0 border-l border-border-subtle bg-canvas-subtle flex-col h-full overflow-hidden ${
            mobileActiveView === 'evidence' ? '!flex w-full' : ''
          }`}
        >
          <div className="px-4 py-2.5 border-b border-border-subtle bg-canvas-panel/50 flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-secondary">
              Evidence & Interpretation
            </span>
            <span className="text-[10px] font-mono text-text-muted">
              {selectedFinding.id}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <EvidenceDetailPane finding={selectedFinding} />
          </div>
        </div>
      </div>

      {/* Responsive Drawer for Evidence on Tablet/Desktop < 1280px */}
      <Drawer
        isOpen={evidenceDrawerOpen}
        onClose={() => setEvidenceDrawerOpen(false)}
        title={
          <div className="flex items-center gap-2 font-mono">
            <span>{selectedFinding.id}</span>
            <span className="text-text-muted">|</span>
            <span className="text-text-secondary">{selectedFinding.title}</span>
          </div>
        }
        subtitle="Detailed Observation, Interpretation & Limitations"
        width="md"
      >
        <EvidenceDetailPane finding={selectedFinding} />
      </Drawer>
    </div>
  );
}
