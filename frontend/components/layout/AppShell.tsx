'use client';

import React, { useState } from 'react';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { AppHeader } from './AppHeader';
import { Menu, X } from 'lucide-react';

export interface AppShellProps {
  children: React.ReactNode;
  currentDatasetId?: string;
  onSelectDataset?: (id: string) => void;
}

export function AppShell({
  children,
  currentDatasetId,
  onSelectDataset,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas-base text-text-primary">
      {/* Desktop Slim Sidebar */}
      <div className="hidden md:flex">
        <SidebarNav />
      </div>

      {/* Mobile Nav Overlay & Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-canvas-base/80 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative z-10 w-64 bg-canvas-subtle h-full flex flex-col shadow-2xl">
            <div className="p-3 flex justify-end border-b border-border-subtle">
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-1 rounded text-text-muted hover:text-text-primary"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarNav />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile top trigger */}
        <div className="md:hidden h-12 bg-canvas-subtle border-b border-border-subtle px-3 flex items-center justify-between">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-canvas-card"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
            DATA VERACE
          </span>
          <div className="w-5" />
        </div>

        {/* Global Header */}
        <AppHeader
          currentDatasetId={currentDatasetId}
          onSelectDataset={onSelectDataset}
        />

        {/* Dynamic Page Workspace */}
        <main className="flex-1 overflow-auto bg-canvas-base">{children}</main>
      </div>
    </div>
  );
}
