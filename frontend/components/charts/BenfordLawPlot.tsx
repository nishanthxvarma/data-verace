'use client';

import React, { useState } from 'react';

interface DigitData {
  digit: number;
  expectedPct: number;
  observedPct: number;
  residual: number;
}

const DIGITS: DigitData[] = [
  { digit: 1, expectedPct: 30.1, observedPct: 15.9, residual: -14.2 },
  { digit: 2, expectedPct: 17.6, observedPct: 12.8, residual: -4.8 },
  { digit: 3, expectedPct: 12.5, observedPct: 11.9, residual: -0.6 },
  { digit: 4, expectedPct: 9.7, observedPct: 12.2, residual: 2.5 },
  { digit: 5, expectedPct: 7.9, observedPct: 11.4, residual: 3.5 },
  { digit: 6, expectedPct: 6.7, observedPct: 10.8, residual: 4.1 },
  { digit: 7, expectedPct: 5.8, observedPct: 11.1, residual: 5.3 },
  { digit: 8, expectedPct: 5.1, observedPct: 12.0, residual: 6.9 },
  { digit: 9, expectedPct: 4.6, observedPct: 11.9, residual: 7.3 },
];

export function BenfordLawPlot() {
  const [hoveredDigit, setHoveredDigit] = useState<DigitData | null>(null);

  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 30, bottom: 45, left: 50 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const barWidth = plotWidth / DIGITS.length - 12;
  const maxPct = 35;

  const scaleY = (val: number) =>
    padding.top + plotHeight - (val / maxPct) * plotHeight;

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none overflow-visible max-h-[320px]"
        aria-label="Benford's Law First Digit Distribution Comparison"
      >
        {/* Horizontal grid lines */}
        {[10, 20, 30].map((val) => (
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

        {/* Expected Benford Curve (Logarithmic reference) */}
        {(() => {
          const pathD = DIGITS.reduce((acc, d, i) => {
            const x = padding.left + i * (plotWidth / DIGITS.length) + barWidth / 2 + 6;
            const y = scaleY(d.expectedPct);
            return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }, '');
          return (
            <path
              d={pathD}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="3 3"
              className="opacity-90"
            />
          );
        })()}

        {/* Observed Bars */}
        {DIGITS.map((d, i) => {
          const x = padding.left + i * (plotWidth / DIGITS.length) + 6;
          const y = scaleY(d.observedPct);
          const barH = plotHeight - (y - padding.top);
          const isSelected = hoveredDigit?.digit === d.digit;
          const hasBigDeviation = Math.abs(d.residual) > 5;

          return (
            <g
              key={d.digit}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredDigit(d)}
              onMouseLeave={() => setHoveredDigit(null)}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill={hasBigDeviation ? '#F59E0B' : '#334155'}
                fillOpacity={isSelected ? 1 : 0.8}
                stroke={isSelected ? '#F8FAFC' : hasBigDeviation ? '#D97706' : 'none'}
                strokeWidth={isSelected ? 1.5 : 0}
                rx={2}
                className="transition-all duration-150"
              />

              {/* Digit Label on X-axis */}
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 15}
                textAnchor="middle"
                className="text-xs fill-slate-400 font-mono font-medium"
              >
                {d.digit}
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
          Leading Digit (1 through 9)
        </text>

        <text
          x={-(height / 2)}
          y={14}
          textAnchor="middle"
          transform="rotate(-90)"
          className="text-[11px] fill-slate-400 font-mono uppercase tracking-wider"
        >
          Observed Frequency (%)
        </text>
      </svg>

      {/* Tooltip */}
      {hoveredDigit && (
        <div className="absolute top-2 right-4 bg-canvas-elevated border border-border-muted rounded p-2 text-xs font-mono shadow-lg pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-text-primary font-semibold">Digit {hoveredDigit.digit}</span>
            <span
              className={`text-[10px] px-1 py-0.2 rounded ${
                Math.abs(hoveredDigit.residual) > 5
                  ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                  : 'bg-canvas-card text-text-muted'
              }`}
            >
              Residual: {hoveredDigit.residual > 0 ? '+' : ''}
              {hoveredDigit.residual.toFixed(1)}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 text-[11px]">
            <span className="text-text-muted">Observed:</span>
            <span className="text-text-primary">{hoveredDigit.observedPct.toFixed(1)}%</span>
            <span className="text-text-muted">Benford Expected:</span>
            <span className="text-sky-400">{hoveredDigit.expectedPct.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
