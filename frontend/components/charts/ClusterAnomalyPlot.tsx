'use client';

import React, { useState } from 'react';

interface ClusterPoint {
  id: string;
  x: number;
  y: number;
  isCluster: boolean;
}

// Generate organic background points and ultra-tight cluster
const GENERATED_POINTS: ClusterPoint[] = [
  // Tight cluster (143 records represented by condensed points)
  { id: 'c1', x: 0.65, y: 0.42, isCluster: true },
  { id: 'c2', x: 0.655, y: 0.425, isCluster: true },
  { id: 'c3', x: 0.648, y: 0.418, isCluster: true },
  { id: 'c4', x: 0.652, y: 0.422, isCluster: true },
  { id: 'c5', x: 0.658, y: 0.419, isCluster: true },
  { id: 'c6', x: 0.645, y: 0.424, isCluster: true },
  { id: 'c7', x: 0.651, y: 0.415, isCluster: true },
  { id: 'c8', x: 0.656, y: 0.428, isCluster: true },
  // Normal background demographic dispersion
  { id: 'b1', x: 0.22, y: 0.65, isCluster: false },
  { id: 'b2', x: 0.35, y: 0.72, isCluster: false },
  { id: 'b3', x: 0.18, y: 0.48, isCluster: false },
  { id: 'b4', x: 0.42, y: 0.55, isCluster: false },
  { id: 'b5', x: 0.29, y: 0.38, isCluster: false },
  { id: 'b6', x: 0.51, y: 0.78, isCluster: false },
  { id: 'b7', x: 0.78, y: 0.82, isCluster: false },
  { id: 'b8', x: 0.82, y: 0.62, isCluster: false },
  { id: 'b9', x: 0.74, y: 0.31, isCluster: false },
  { id: 'b10', x: 0.88, y: 0.25, isCluster: false },
  { id: 'b11', x: 0.48, y: 0.22, isCluster: false },
  { id: 'b12', x: 0.32, y: 0.18, isCluster: false },
  { id: 'b13', x: 0.15, y: 0.28, isCluster: false },
  { id: 'b14', x: 0.58, y: 0.61, isCluster: false },
  { id: 'b15', x: 0.41, y: 0.85, isCluster: false },
  { id: 'b16', x: 0.68, y: 0.71, isCluster: false },
  { id: 'b17', x: 0.25, y: 0.81, isCluster: false },
  { id: 'b18', x: 0.85, y: 0.45, isCluster: false },
];

export function ClusterAnomalyPlot() {
  const [hovered, setHovered] = useState<ClusterPoint | null>(null);

  const width = 600;
  const height = 280;
  const padding = { top: 25, right: 30, bottom: 45, left: 50 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const toPxX = (val: number) => padding.left + val * plotWidth;
  const toPxY = (val: number) => padding.top + (1 - val) * plotHeight;

  // Center of the anomaly cluster
  const clusterCenterX = toPxX(0.652);
  const clusterCenterY = toPxY(0.422);

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none overflow-visible max-h-[320px]"
        aria-label="High-dimensional subspace projection showing cluster anomaly"
      >
        {/* Subtle grid */}
        {[0.25, 0.5, 0.75].map((val) => (
          <g key={val}>
            <line
              x1={padding.left}
              y1={toPxY(val)}
              x2={width - padding.right}
              y2={toPxY(val)}
              stroke="#1C2633"
              strokeDasharray="2 2"
            />
            <line
              x1={toPxX(val)}
              y1={padding.top}
              x2={toPxX(val)}
              y2={height - padding.bottom}
              stroke="#1C2633"
              strokeDasharray="2 2"
            />
          </g>
        ))}

        {/* Boundary ring around the 143-record cluster */}
        <circle
          cx={clusterCenterX}
          cy={clusterCenterY}
          r={28}
          fill="rgba(245, 158, 11, 0.08)"
          stroke="#F59E0B"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />

        {/* Callout line and label */}
        <line
          x1={clusterCenterX + 20}
          y1={clusterCenterY - 20}
          x2={clusterCenterX + 65}
          y2={clusterCenterY - 45}
          stroke="#F59E0B"
          strokeWidth={1}
        />
        <text
          x={clusterCenterX + 70}
          y={clusterCenterY - 48}
          className="text-[10px] fill-amber-300 font-mono font-medium"
        >
          Hyper-dense Cluster (143 records)
        </text>
        <text
          x={clusterCenterX + 70}
          y={clusterCenterY - 36}
          className="text-[9px] fill-slate-400 font-mono"
        >
          Density: 42.8x background
        </text>

        {/* Points */}
        {GENERATED_POINTS.map((pt) => {
          const cx = toPxX(pt.x);
          const cy = toPxY(pt.y);
          const isSelected = hovered?.id === pt.id;

          return (
            <circle
              key={pt.id}
              cx={cx}
              cy={cy}
              r={pt.isCluster ? 4 : 3}
              fill={pt.isCluster ? '#F59E0B' : '#64748B'}
              fillOpacity={pt.isCluster ? 0.95 : 0.6}
              stroke={isSelected ? '#F8FAFC' : pt.isCluster ? '#B45309' : '#1E293B'}
              strokeWidth={isSelected ? 2 : 1}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHovered(pt)}
              onMouseLeave={() => setHovered(null)}
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
          Latent Dimension 1 (Scaled PCA)
        </text>

        <text
          x={-(height / 2)}
          y={14}
          textAnchor="middle"
          transform="rotate(-90)"
          className="text-[11px] fill-slate-400 font-mono uppercase tracking-wider"
        >
          Latent Dimension 2 (Scaled PCA)
        </text>
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute top-2 left-4 bg-canvas-elevated border border-border-muted rounded p-2 text-xs font-mono shadow-lg pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-text-primary font-semibold">
              {hovered.isCluster ? 'Cluster Member' : 'Background Record'}
            </span>
            <span
              className={`text-[10px] px-1 py-0.2 rounded ${
                hovered.isCluster
                  ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                  : 'bg-canvas-card text-text-muted'
              }`}
            >
              {hovered.isCluster ? 'Anomaly Flagged' : 'Organic'}
            </span>
          </div>
          <div className="text-[11px] text-text-muted">
            Distance to centroid:{' '}
            <span className="text-text-primary font-mono">
              {hovered.isCluster ? '0.012 (Near-duplicate)' : '0.418 (Dispersed)'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
