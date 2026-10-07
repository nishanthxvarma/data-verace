'use client';

import React, { useState } from 'react';

interface Point {
  id: string;
  age: number;
  income: number;
  isAnomaly?: boolean;
}

// Generate deterministic points representing decorrelated demographic data
const SAMPLE_POINTS: Point[] = [
  { id: '1', age: 22, income: 145000, isAnomaly: true },
  { id: '2', age: 24, income: 132000, isAnomaly: true },
  { id: '3', age: 25, income: 42000 },
  { id: '4', age: 28, income: 51000 },
  { id: '5', age: 29, income: 168000, isAnomaly: true },
  { id: '6', age: 31, income: 45000 },
  { id: '7', age: 33, income: 68000 },
  { id: '8', age: 35, income: 84000 },
  { id: '9', age: 37, income: 42000 },
  { id: '10', age: 39, income: 152000 },
  { id: '11', age: 42, income: 28000, isAnomaly: true },
  { id: '12', age: 44, income: 94000 },
  { id: '13', age: 46, income: 112000 },
  { id: '14', age: 48, income: 32000, isAnomaly: true },
  { id: '15', age: 50, income: 125000 },
  { id: '16', age: 52, income: 48000, isAnomaly: true },
  { id: '17', age: 55, income: 141000 },
  { id: '18', age: 58, income: 38000, isAnomaly: true },
  { id: '19', age: 60, income: 158000 },
  { id: '20', age: 62, income: 72000 },
  { id: '21', age: 65, income: 45000 },
  { id: '22', age: 68, income: 162000 },
  { id: '23', age: 71, income: 35000 },
  { id: '24', age: 26, income: 89000 },
  { id: '25', age: 34, income: 105000 },
  { id: '26', age: 40, income: 76000 },
  { id: '27', age: 49, income: 89000 },
  { id: '28', age: 57, income: 102000 },
  { id: '29', age: 63, income: 91000 },
  { id: '30', age: 30, income: 135000 },
];

export function ScatterDependencyPlot() {
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const minAge = 18;
  const maxAge = 75;
  const minIncome = 20000;
  const maxIncome = 180000;

  const width = 600;
  const height = 300;
  const padding = { top: 20, right: 30, bottom: 45, left: 65 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const scaleX = (age: number) =>
    padding.left + ((age - minAge) / (maxAge - minAge)) * plotWidth;

  const scaleY = (income: number) =>
    padding.top + plotHeight - ((income - minIncome) / (maxIncome - minIncome)) * plotHeight;

  // Expected reference curve points: income = 35k + 2.5k*(age-20) with saturation
  const referenceCurve = [
    { age: 20, income: 35000 },
    { age: 30, income: 65000 },
    { age: 40, income: 98000 },
    { age: 50, income: 122000 },
    { age: 60, income: 130000 },
    { age: 70, income: 110000 },
  ];

  const pathD = referenceCurve.reduce(
    (acc, pt, i) =>
      `${acc} ${i === 0 ? 'M' : 'L'} ${scaleX(pt.age)} ${scaleY(pt.income)}`,
    ''
  );

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none overflow-visible max-h-[340px]"
        aria-label="Scatter plot of Age versus Income"
      >
        {/* Grid lines */}
        {[40000, 80000, 120000, 160000].map((val) => (
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
              x={padding.left - 8}
              y={scaleY(val) + 3}
              textAnchor="end"
              className="text-[10px] fill-slate-500 font-mono"
            >
              ${val / 1000}k
            </text>
          </g>
        ))}

        {[20, 30, 40, 50, 60, 70].map((val) => (
          <g key={val}>
            <line
              x1={scaleX(val)}
              y1={padding.top}
              x2={scaleX(val)}
              y2={height - padding.bottom}
              stroke="#1C2633"
              strokeDasharray="2 2"
            />
            <text
              x={scaleX(val)}
              y={height - padding.bottom + 15}
              textAnchor="middle"
              className="text-[10px] fill-slate-500 font-mono"
            >
              {val}
            </text>
          </g>
        ))}

        {/* Expected reference trajectory (Normal copula expectation) */}
        <path
          d={pathD}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="opacity-70"
        />

        {/* Scatter points */}
        {SAMPLE_POINTS.map((pt) => {
          const cx = scaleX(pt.age);
          const cy = scaleY(pt.income);
          const isSelected = hoveredPoint?.id === pt.id;

          return (
            <circle
              key={pt.id}
              cx={cx}
              cy={cy}
              r={isSelected ? 6 : pt.isAnomaly ? 4.5 : 3.5}
              fill={pt.isAnomaly ? '#F59E0B' : '#94A3B8'}
              fillOpacity={isSelected ? 1 : 0.8}
              stroke={isSelected ? '#F8FAFC' : pt.isAnomaly ? '#B45309' : '#334155'}
              strokeWidth={isSelected ? 2 : 1}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}

        {/* Axis Labels */}
        <text
          x={width / 2}
          y={height - 8}
          textAnchor="middle"
          className="text-[11px] fill-slate-400 font-mono uppercase tracking-wider"
        >
          Customer Age (Years)
        </text>

        <text
          x={-(height / 2)}
          y={16}
          textAnchor="middle"
          transform="rotate(-90)"
          className="text-[11px] fill-slate-400 font-mono uppercase tracking-wider"
        >
          Annual Income (USD)
        </text>
      </svg>

      {/* Floating tooltip */}
      {hoveredPoint && (
        <div className="absolute top-4 right-4 bg-canvas-elevated border border-border-muted rounded p-2 text-xs font-mono shadow-lg pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-text-muted">Sample Record #{hoveredPoint.id}</span>
            {hoveredPoint.isAnomaly && (
              <span className="text-[10px] px-1 py-0.2 bg-amber-950/40 text-amber-300 border border-amber-800/40 rounded">
                Copula Residual
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px]">
            <span className="text-text-muted">Age:</span>
            <span className="text-text-primary">{hoveredPoint.age} yrs</span>
            <span className="text-text-muted">Income:</span>
            <span className="text-text-primary">
              ${hoveredPoint.income.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
