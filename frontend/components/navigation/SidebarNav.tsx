'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UploadCloud,
  Layers,
  SearchCode,
  Columns,
  FileText,
  Database,
  BookOpen,
  Settings,
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Analyze', href: '/analyze', icon: UploadCloud },
  { label: 'Evidence Workspace', href: '/workspace', icon: Layers, badge: 'Core' },
  { label: 'Evidence Explorer', href: '/explorer', icon: SearchCode },
  { label: 'Column Analysis', href: '/columns', icon: Columns },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Datasets', href: '/datasets', icon: Database },
];

const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: 'Documentation', href: '/docs', icon: BookOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      aria-label="Application Navigation"
      className="w-56 shrink-0 bg-canvas-subtle border-r border-border-subtle flex flex-col h-screen select-none"
    >
      {/* Brand Header */}
      <div className="h-14 px-4 border-b border-border-subtle flex items-center gap-2.5">
        <div className="w-6 h-6 rounded bg-accent-primary/10 border border-accent-primary/40 flex items-center justify-center text-accent-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-text-primary uppercase font-mono">
            DATA VERACE
          </span>
          <span className="text-[10px] text-text-muted tracking-tight">
            Evidence-Driven Analytics
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        <div className="px-2 pb-1.5 text-[10px] font-mono text-text-muted uppercase tracking-wider">
          Workspace
        </div>
        {PRIMARY_NAV_ITEMS.map((item) => {
          const active = isLinkActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors group ${
                active
                  ? 'bg-canvas-panel text-text-primary font-medium border-l-2 border-accent-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary hover:bg-canvas-card'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-accent-primary' : 'text-text-muted group-hover:text-text-secondary'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1 py-0.2 rounded font-mono bg-accent-primary/15 text-accent-primary border border-accent-primary/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-2 pb-1.5 text-[10px] font-mono text-text-muted uppercase tracking-wider">
          System
        </div>
        {SECONDARY_NAV_ITEMS.map((item) => {
          const active = isLinkActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors group ${
                active
                  ? 'bg-canvas-panel text-text-primary font-medium border-l-2 border-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-canvas-card'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  active ? 'text-accent-primary' : 'text-text-muted group-hover:text-text-secondary'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Compact Methodology / Integrity Badge */}
      <div className="p-3 border-t border-border-subtle bg-canvas-base/50">
        <div className="p-2 rounded bg-canvas-card border border-border-subtle text-[11px] text-text-muted flex flex-col gap-1">
          <div className="flex items-center justify-between font-mono text-[10px] text-text-secondary">
            <span>METHODOLOGY</span>
            <span className="text-emerald-400">v1.0-EXP</span>
          </div>
          <p className="text-[10px] text-text-muted leading-tight">
            Observation → Evidence → Interpretation
          </p>
        </div>
      </div>
    </aside>
  );
}
