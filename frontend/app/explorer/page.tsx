'use client';

import React, { useState, useMemo } from 'react';
import { DEMO_FINDINGS } from '@/data/demoData';
import { Finding, FindingCategory } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { SearchInput } from '@/components/ui/Input';
import { Drawer } from '@/components/ui/Drawer';
import { EvidenceDetailPane } from '@/components/evidence/EvidenceDetailPane';
import { Button } from '@/components/ui/Button';
import {
  SearchCode,
  ArrowRight,
  Database,
} from 'lucide-react';
import Link from 'next/link';

export default function EvidenceExplorerPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FindingCategory | 'all'>('all');
  const [inspectFinding, setInspectFinding] = useState<Finding | null>(null);

  const categories: Array<{ id: FindingCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Categories' },
    { id: 'synthetic', label: 'Synthetic Indicators' },
    { id: 'manipulation', label: 'Manipulation Signals' },
    { id: 'anomaly', label: 'Statistical Anomalies' },
    { id: 'integrity', label: 'Data Integrity' },
  ];

  const filtered = useMemo(() => {
    return DEMO_FINDINGS.filter((f) => {
      const matchCat =
        selectedCategory === 'all' || f.category === selectedCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        f.id.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.affectedColumns.some((c) => c.toLowerCase().includes(q)) ||
        f.observation.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <SearchCode className="w-5 h-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Evidence Explorer
            </h1>
          </div>
          <p className="text-xs text-text-muted">
            Explore the evidence behind the analysis. Search, filter, and inspect verified statistical signals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-canvas-card border border-border-subtle text-xs font-mono text-text-secondary">
            <Database className="w-3.5 h-3.5 text-accent-primary" />
            <span>customer_transactions.csv</span>
          </div>
          <Link href="/workspace">
            <Button variant="outline" size="sm">
              Open in 3-Pane Workspace
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-md bg-canvas-panel border border-border-subtle">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors whitespace-nowrap cursor-pointer border ${
                  active
                    ? 'bg-canvas-card text-text-primary border-border-muted font-medium'
                    : 'bg-transparent text-text-muted border-transparent hover:text-text-secondary hover:bg-canvas-hover'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="w-full md:w-72 shrink-0">
          <SearchInput
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search findings (e.g. E-014, copula)..."
          />
        </div>
      </div>

      {/* Findings Table List */}
      <div className="bg-canvas-panel border border-border-subtle rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-canvas-subtle/80 text-text-muted">
                <th className="p-3 w-20">ID</th>
                <th className="p-3">Finding Description</th>
                <th className="p-3">Target Category</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Affected Features</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60 text-text-secondary">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-text-muted">
                    No findings match the current search or category filter.
                  </td>
                </tr>
              ) : (
                filtered.map((finding) => (
                  <tr
                    key={finding.id}
                    onClick={() => setInspectFinding(finding)}
                    className="hover:bg-canvas-card transition-colors cursor-pointer group"
                  >
                    <td className="p-3 font-semibold text-text-primary">
                      {finding.id}
                    </td>
                    <td className="p-3 font-medium text-text-primary max-w-xs truncate">
                      {finding.title}
                    </td>
                    <td className="p-3">
                      <Badge category={finding.category} size="sm">
                        {finding.category}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge severity={finding.severity} size="sm">
                        {finding.severity}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-text-primary">
                        {finding.confidence.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3 text-text-muted">
                      {finding.affectedColumns.join(', ')}
                    </td>
                    <td className="p-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-accent-primary group-hover:translate-x-0.5 transition-transform">
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-border-subtle bg-canvas-subtle/40 text-[11px] font-mono text-text-muted flex justify-between items-center">
          <span>Showing {filtered.length} of {DEMO_FINDINGS.length} findings</span>
          <span>Click any row to open the complete evidence breakdown</span>
        </div>
      </div>

      {/* Detail Inspector Drawer */}
      <Drawer
        isOpen={!!inspectFinding}
        onClose={() => setInspectFinding(null)}
        title={
          inspectFinding && (
            <div className="flex items-center gap-2 font-mono">
              <span className="text-text-primary font-bold">{inspectFinding.id}</span>
              <span className="text-text-muted">|</span>
              <span className="text-text-secondary">{inspectFinding.title}</span>
            </div>
          )
        }
        subtitle="Statistical Observation, Methodology, and Limitations"
        width="md"
      >
        {inspectFinding && <EvidenceDetailPane finding={inspectFinding} />}
      </Drawer>
    </div>
  );
}
