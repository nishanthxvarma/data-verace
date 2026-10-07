'use client';

import React, { useState } from 'react';

interface Bin {
  range: string;
  observedDensity: number;
  expectedDensity: number;
  isDiscontinuity?: boolean;
}

const BINS: Bin[] = [
  { range: '$0-$1k', observedDensity: 42, expectedDensity: 40 },
  { range: '$1k-$2k', observedDensity: 28, expectedDensity: 27 },
  { range: '$2k-$3k', observedDensity: 16, expectedDensity: 17 },
  { range: '$3k-$4k', observedDensity: 11, expectedDensity: 12 },
  { range: '$4k-$5k', observedDensity: 10, expectedDensity: 8 },
  { range: '$5k-$6k', observedDensity: 1.2, expectedDensity: 5.5, isDiscontinuity: true },
  { range: '$6k-$7k', observedDensity: 0.9, expectedDensity: 3.8 },
  { range: '$7k-$8k', observedDensity: 0.7, expectedDensity: 2.6 },
  { range: '$8k-$9k', observedDensity: 0.5, expectedDensity: 1.8 },
  { range: '$9k-$10k', observedDensity: 0.8, expectedDensity: 1.2 },
  { range: '$10k+', observedDensity: 0.05, expectedDensity: 0.8, isDiscontinuity: true },
];

export function DistributionPlot() {
  const [hoveredBin, setHoveredBin] = useState<Bin | null>(null);

  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 30, bottom: 45, left: 50 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const barWidth = plotWidth / BINS.length - 8;
  const maxDensity = 50;

  const scaleY = (val: number) =>
    padding.top + plotHeight - (val / maxDensity) * plotHeight;

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none overflow-visible max-h-[320px]"
        aria-label="Distribution density chart with threshold discontinuity"
      >
        {/* Horizontal grid lines */}
        {[10, 20, 30, 40].map((val) => (
          <g key={val}>
            <line
              x1={padding.left}
              y1={scaleY(val)}
              x2={width - padding.right}
              y2={scaleY(val)}
              stroke="#1C2633"
              strokeDasharray="2 2"
            />
            <text
              x={padding.left - 6}
              y={scaleY(val) + 3}
              textAnchor="end"
              className="text-[10px] fill-slate-500 font-mono"
            >
              {val}%
            </text>
          </g>
        ))}

        {/* Expected reference curve path */}
        {(() => {
          const pathD = BINS.reduce((acc, bin, i) => {
            const x = padding.left + i * (plotWidth / BINS.length) + barWidth / 2 + 4;
            const y = scaleY(bin.expectedDensity);
            return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }, '');
          return (
            <path
              d={pathD}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="4 3"
              className="opacity-80"
            />
          );
        })()}

        {/* Bars for Observed Density */}
        {BINS.map((bin, i) => {
          const x = padding.left + i * (plotWidth / BINS.length) + 4;
          const y = scaleY(bin.observedDensity);
          const barH = plotHeight - (y - padding.top);
          const isSelected = hoveredBin?.range === bin.range;

          return (
            <g
              key={bin.range}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredBin(bin)}
              onMouseLeave={() => setHoveredBin(null)}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill={bin.isDiscontinuity ? '#F59E0B' : '#334155'}
                fillOpacity={isSelected ? 1 : 0.8}
                stroke={isSelected ? '#F8FAFC' : bin.isDiscontinuity ? '#D97706' : 'none'}
                strokeWidth={isSelected ? 1.5 : 0}
                rx={2}
                className="transition-all duration-150"
              />

              {/* Threshold flag marker on discontinuity */}
              {bin.isDiscontinuity && (
                <g transform={`translate(${x + barWidth / 2}, ${y - 8})`}>
                  <line x1={0} y1={-8} x2={0} y2={6} stroke="#F59E0B" strokeWidth={1} />
                  <circle cx={0} cy={-8} r={2.5} fill="#F59E0B" />
                </g>
              )}

              {/* X Axis Label */}
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 14}
                textAnchor="middle"
                className="text-[9px] fill-slate-400 font-mono"
              >
                {bin.range}
              </text>
            </g>
          );
        })}

        {/* Axis Labels */}
        <text
          x={width / 2}
          y={height - 8}
          textAnchor="middle"
          className="text-[11px] fill-slate-400 font-mono uppercase tracking-wider"
        >
          Transaction Amount Tier (USD)
        </text>

        <text
          x={-(height / 2)}
          y={14}
          textAnchor="middle"
          transform="rotate(-90)"
          className="text-[11px] fill-slate-400 font-mono uppercase tracking-wider"
        >
          Density Percentage
        </text>
      </svg>

      {/* Tooltip */}
      {hoveredBin && (
        <div className="absolute top-2 right-4 bg-canvas-elevated border border-border-muted rounded p-2 text-xs font-mono shadow-lg pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-text-primary font-semibold">{hoveredBin.range}</span>
            {hoveredBin.isDiscontinuity && (
              <span className="text-[10px] px-1 py-0.2 bg-amber-950/40 text-amber-300 border border-amber-800/40 rounded">
                Cliff Discontinuity (-84%)
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 text-[11px]">
            <span className="text-text-muted">Observed Density:</span>
            <span className="text-text-primary">{hoveredBin.observedDensity}%</span>
            <span className="text-text-muted">Expected Density:</span>
            <span className="text-sky-400">{hoveredBin.expectedDensity}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
