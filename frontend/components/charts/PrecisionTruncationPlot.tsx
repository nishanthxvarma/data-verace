'use client';

import React from 'react';

export function PrecisionTruncationPlot() {
  const decimalDist = [
    { places: '0 decimals', pct: 0, count: '0' },
    { places: '1 decimal', pct: 0, count: '0' },
    { places: '2 decimals', pct: 100, count: '82,341 (100%)', isSpike: true },
    { places: '3 decimals', pct: 0, count: '0' },
    { places: '4 decimals', pct: 0, count: '0' },
    { places: '5 decimals (GPS sensor)', pct: 0, count: '0' },
    { places: '6+ decimals (Sub-meter)', pct: 0, count: '0' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md w-full mx-auto">
      <div className="text-xs text-text-secondary leading-relaxed">
        Distribution of floating-point fractional digits across{' '}
        <span className="font-mono text-text-primary">merchant_lat</span> and{' '}
        <span className="font-mono text-text-primary">merchant_lon</span>:
      </div>

      <div className="space-y-2.5 font-mono text-xs">
        {decimalDist.map((d) => (
          <div key={d.places} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className={d.isSpike ? 'text-amber-300 font-semibold' : 'text-text-muted'}>
                {d.places}
              </span>
              <span className={d.isSpike ? 'text-amber-300 font-semibold' : 'text-text-muted'}>
                {d.count}
              </span>
            </div>
            <div className="h-3 w-full bg-canvas-card rounded border border-border-subtle overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  d.isSpike ? 'bg-amber-400' : 'bg-slate-700'
                }`}
                style={{ width: `${d.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-canvas-card rounded border border-border-subtle text-[11px] text-text-muted font-mono">
        <div className="text-text-secondary font-medium mb-1">Spatial Implication:</div>
        <div>Latitude 0.01° ≈ 1,110 meters (~1.1 km precision)</div>
        <div>Raw smartphone sensor GPS typically records 5–7 decimal places (~1.1m).</div>
      </div>
    </div>
  );
}
